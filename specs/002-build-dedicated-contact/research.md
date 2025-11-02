# Research Log — Dedicated Contact Page & Sanity CMS Scaffold

## References
- “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf” (project root) — outlines Content Lake access, GROQ query patterns, and CDN usage without frameworks.
- MDN: [`mailto` URL scheme](https://developer.mozilla.org/docs/Web/HTML/Element/a#attr-href) — documents supported parameters and encoding tips for email links.
- MDN: [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API) — covers browser support, permission requirements, and fallbacks for copy helpers.

## Contact CTA Notes
- `mailto:` links support `subject` and `body` query parameters; keep templates short to avoid encoding issues. Example: `mailto:carlos@space.dev?subject=Greetings%20from%20Nyan%20Cat%20Space`.
- Clipboard API requires a secure context (https). Fallback should expose the email as selectable text and describe manual copy instructions.
- Provide `aria-live="polite"` messaging for copy confirmation and ensure focus remains on the triggering button to respect keyboard flow.

## Sanity Integration Notes
- Use project ID + dataset to build the CDN endpoint: `https://<projectId>.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`.
- GROQ template from the PDF:
  ```groq
  *[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "coverImage": mainImage.asset->url
  }
  ```
- For public datasets no token is required; otherwise include the `Authorization: Bearer <token>` header. The upcoming helper will auto-skip drafts by querying only published entries.
