# Research Log — Dedicated Contact Page & Sanity CMS Scaffold

## References
- “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf” (project root) — outlines Content Lake access, GROQ query patterns, and CDN usage without frameworks.
- Netlify Docs: [Forms Setup](https://docs.netlify.com/forms/setup/) — confirms `data-netlify="true"`, honeypot fields, and optional success redirects.

## Netlify Form Notes
- Form action is set to `/contact.html?submission=success#contact-success-fallback` so non-JavaScript submissions land on the same page and reveal the fallback confirmation banner (`:target`).
- Spam mitigation uses a honeypot named `bot-field`. Automated submissions that populate the field are dropped by Netlify.
- Manual QA plan (documented in `quickstart.md`) covers: required-field validation, honeypot test, and curl-based submission to verify email notifications.

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
