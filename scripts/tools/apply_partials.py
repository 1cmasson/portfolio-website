#!/usr/bin/env python3
"""
Apply shared header/footer partials and centralized link configuration.

Usage:
  python3 scripts/tools/apply_partials.py

The script replaces HTML between `<!-- HEADER:START -->` / `<!-- HEADER:END -->`
and `<!-- FOOTER:START -->` / `<!-- FOOTER:END -->` markers in each top-level page,
injecting the markup from `partials/header.html` and `partials/footer.html`.
It also substitutes GitHub, LinkedIn, and email values from `config/links.json`
and assigns `aria-current="page"` + highlight classes based on the page slug.
"""

from __future__ import annotations

import json
import pathlib
import re
import sys
from typing import Dict

ROOT = pathlib.Path(__file__).resolve().parents[2]
PARTIALS_DIR = ROOT / "partials"
CONFIG_PATH = ROOT / "config" / "links.json"

HEADER_START = "<!-- HEADER:START -->"
HEADER_END = "<!-- HEADER:END -->"
FOOTER_START = "<!-- FOOTER:START -->"
FOOTER_END = "<!-- FOOTER:END -->"

PAGES = [
    ("index.html", "home"),
    ("about.html", "about"),
    ("projects.html", "projects"),
    ("blog.html", "blog"),
    ("contact.html", "contact"),
]


def load_config() -> Dict[str, str]:
    with CONFIG_PATH.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    required = {"email", "github", "linkedin"}
    missing = required - data.keys()
    if missing:
        raise KeyError(f"Missing keys in {CONFIG_PATH}: {', '.join(sorted(missing))}")
    return {
        "EMAIL": data["email"],
        "MAILTO_EMAIL": f"mailto:{data['email']}",
        "GITHUB_URL": data["github"],
        "LINKEDIN_URL": data["linkedin"],
    }


def read_partial(name: str, replacements: Dict[str, str]) -> str:
    path = PARTIALS_DIR / f"{name}.html"
    if not path.exists():
        raise FileNotFoundError(f"Missing partial: {path}")
    content = path.read_text(encoding="utf-8")
    for key, value in replacements.items():
        content = content.replace(f"{{{{{key}}}}}", value)
    return content.strip()


def replace_section(source: str, start_marker: str, end_marker: str, replacement: str) -> str:
    pattern = re.compile(
        rf"({re.escape(start_marker)})(.*?){re.escape(end_marker)}",
        re.DOTALL,
    )
    if not pattern.search(source):
        raise ValueError(f"Markers {start_marker} / {end_marker} not found.")
    return pattern.sub(lambda match: f"{match.group(1)}\n{replacement}\n{end_marker}", source, count=1)


CLASS_PATTERN = re.compile(r'(class=")([^"]*)(")')


def ensure_class(tag: str, class_name: str) -> str:
    def repl(match: re.Match[str]) -> str:
        classes = match.group(2).split()
        if class_name not in classes:
            classes.append(class_name)
        return f'{match.group(1)}{" ".join(classes)}{match.group(3)}'

    if 'class="' in tag:
        return CLASS_PATTERN.sub(repl, tag, count=1)
    return tag.replace("data-nav", f'class="{class_name}" data-nav', 1)


def highlight_active_nav(section: str, slug: str) -> str:
    # Remove any stale aria-current/data-active/text-neon-amber classes.
    section = re.sub(r'\saria-current="page"', "", section)
    section = re.sub(r'\sdata-active="true"', "", section)

    pattern = re.compile(rf'(<a\s[^>]*data-nav="{slug}"[^>]*)(>)')

    def repl(match: re.Match[str]) -> str:
        start, end = match.groups()
        start = ensure_class(start, "text-neon-amber")
        return f'{start} aria-current="page" data-active="true"{end}'

    if not pattern.search(section):
        raise ValueError(f'data-nav="{slug}" not found in header partial.')
    section = pattern.sub(repl, section, count=1)
    return section


def apply_config_markers(content: str, replacements: Dict[str, str]) -> str:
    email = replacements["EMAIL"]
    github = replacements["GITHUB_URL"]
    linkedin = replacements["LINKEDIN_URL"]

    # Update text nodes containing the email.
    content = re.sub(
        r'(data-config-email[^>]*>)([^<]*)',
        lambda m: f"{m.group(1)}{email}",
        content,
    )

    # Update mailto links (with or without query params).
    content = re.sub(
        r'(data-config-email[^>]*href="mailto:)([^"?"]*)(\?[^"]*)?(")',
        lambda m: f'{m.group(1)}{email}{m.group(3) or ""}{m.group(4)}',
        content,
    )
    content = re.sub(
        r'(data-config-mailto[^>]*href="mailto:)([^"?"]*)(\?[^"]*)?(")',
        lambda m: f'{m.group(1)}{email}{m.group(3) or ""}{m.group(4)}',
        content,
    )

    # Update social links.
    content = re.sub(
        r'(data-config-github[^>]*href=")[^"]*(")',
        lambda m: f'{m.group(1)}{github}{m.group(2)}',
        content,
    )
    content = re.sub(
        r'(data-config-linkedin[^>]*href=")[^"]*(")',
        lambda m: f'{m.group(1)}{linkedin}{m.group(2)}',
        content,
    )

    return content


def apply_partials() -> None:
    replacements = load_config()
    header_html = read_partial("header", replacements)
    footer_html = read_partial("footer", replacements)

    for page_name, slug in PAGES:
        page_path = ROOT / page_name
        content = page_path.read_text(encoding="utf-8")
        content = replace_section(content, HEADER_START, HEADER_END, header_html)
        content = replace_section(content, FOOTER_START, FOOTER_END, footer_html)
        content = re.sub(rf"{re.escape(HEADER_END)}", HEADER_END, content, count=1)  # ensure marker kept

        # Highlight the nav item within the injected header.
        header_pattern = re.compile(
            rf"{re.escape(HEADER_START)}\n(.*?){re.escape(HEADER_END)}",
            re.DOTALL,
        )

        def header_repl(match: re.Match[str]) -> str:
            header_block = match.group(1)
            updated = highlight_active_nav(header_block, slug)
            return f"{HEADER_START}\n{updated}\n{HEADER_END}"

        content = header_pattern.sub(header_repl, content, count=1)

        for key, value in replacements.items():
            content = content.replace(f"{{{{{key}}}}}", value)

        content = apply_config_markers(content, replacements)

        page_path.write_text(content, encoding="utf-8")


def main() -> int:
    try:
        apply_partials()
    except Exception as error:  # pragma: no cover - developer feedback
        print(f"[apply_partials] Error: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
