(function () {
  const sp = /^(https?:|mailto:|\/|#)/i;
  const esc = (v) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const url = (value) => (sp.test(value.trim()) ? value.trim() : '#');
  const parseValue = (raw) => raw.replace(/^['"]|['"]$/g, '');
  const pf = (source) => {
    const normalized = source.replace(/\r\n/g, '\n');
    if (!normalized.startsWith('---\n')) return { data: {}, body: source };
    const closing = normalized.indexOf('\n---', 4);
    if (closing === -1) return { data: {}, body: source };
    const lines = normalized.slice(4, closing).split('\n');
    const body = normalized.slice(closing + 4).replace(/^\s+/, '');
    const data = {};
    const stack = [{ indent: -1, obj: data, key: null }];
    lines.forEach((line) => {
      if (!line.trim()) return;
      const indent = line.match(/^ */)[0].length;
      while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
      const ctx = stack[stack.length - 1];
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        if (!ctx.key) return;
        if (!Array.isArray(ctx.obj[ctx.key])) ctx.obj[ctx.key] = [];
        ctx.obj[ctx.key].push(parseValue(trimmed.slice(2)));
        return;
      }
      const match = trimmed.match(/^([^:]+):(.*)$/);
      if (!match) return;
      const key = match[1].trim();
      const value = match[2].trim();
      if (!value) {
        ctx.obj[key] = {};
        stack.push({ indent, obj: ctx.obj[key], key: null });
        ctx.key = key;
        return;
      }
      ctx.obj[key] = parseValue(value);
      ctx.key = key;
    });
    return { data, body };
  };
  const ri = (text) =>
    esc(text)
      .replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')
      .replace(/(\*|_)(.+?)\1/g, '<em>$2</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${url(href)}" class="inline-link">${label}</a>`);
  const rb = (body) => {
    const lines = body.replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let p = [];
    let lt = '';
    let li = [];
    let code = false;
    let lang = '';
    let c = [];
    const flushP = () => { if (!p.length) return; html.push(`<p>${ri(p.join(' '))}</p>`); p = []; };
    const flushL = () => { if (!lt) return; html.push(`<${lt}>${li.join('')}</${lt}>`); lt = ''; li = []; };
    const flushC = () => { if (!code) return; const descriptor = lang ? ` data-lang="${esc(lang)}"` : ''; html.push(`<pre><code${descriptor}>${esc(c.join('\n'))}</code></pre>`); code = false; lang = ''; c = []; };
    const pushList = (type, text, last) => { flushP(); if (lt !== type) { flushL(); lt = type; } li.push(`<li>${ri(text)}</li>`); if (last) flushL(); };
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const last = i === lines.length - 1;
      if (code) {
        if (/^```/.test(line)) flushC();
        else c.push(line);
        continue;
      }
      if (/^```/.test(line)) {
        flushP();
        flushL();
        code = true;
        lang = line.slice(3).trim();
        continue;
      }
      if (!line.trim()) {
        flushP();
        flushL();
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        flushP();
        flushL();
        html.push(`<h${heading[1].length}>${ri(heading[2])}</h${heading[1].length}>`);
        continue;
      }
      const ordered = line.match(/^\d+\.\s+(.*)$/);
      if (ordered) {
        pushList('ol', ordered[1], last);
        continue;
      }
      const bullet = line.match(/^[-*+]\s+(.*)$/);
      if (bullet) {
        pushList('ul', bullet[1], last);
        continue;
      }
      p.push(line.trim());
      if (last) flushP();
    }
    flushC();
    flushP();
    flushL();
    return html.join('');
  };
  const fetchText = (path) =>
    fetch(path).then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      return response.text();
    });
  const useFallback = (id, target) => {
    const template = document.getElementById(id);
    if (!template) return;
    target.innerHTML = '';
    target.append(template.content.cloneNode(true));
  };
  const render = async ({ source, target, fallbackId, onMeta }) => {
    try {
      const text = await fetchText(source);
      const result = pf(text);
      target.innerHTML = rb(result.body);
      if (onMeta) onMeta(result.data || {});
    } catch (error) {
      if (fallbackId) useFallback(fallbackId, target);
    }
  };
  window.MarkdownContent = { parseFrontmatter: pf, renderMarkdownBody: rb, renderMarkdownInto: render };
})();
