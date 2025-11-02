const GROQ_PUBLISHED_POSTS = `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "coverImage": mainImage.asset->url,
  "tags": tags[]->title
}`;

function readMeta(name) {
  if (typeof document === 'undefined') return '';
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta?.content?.trim() || '';
}

function sanitizeConfigValue(value) {
  if (typeof value === 'string') return value.trim();
  return value || '';
}

export function getSanityConfig() {
  const globalConfig = typeof window !== 'undefined' ? window.__SANITY_CONFIG__ : undefined;
  const env = typeof process !== 'undefined' && process.env ? process.env : {};

  const projectId = sanitizeConfigValue(
    globalConfig?.projectId || env.SANITY_PROJECT_ID || readMeta('sanity-project-id') || (typeof window !== 'undefined' ? window.SANITY_PROJECT_ID : ''),
  );
  const dataset = sanitizeConfigValue(
    globalConfig?.dataset || env.SANITY_DATASET || readMeta('sanity-dataset') || (typeof window !== 'undefined' ? window.SANITY_DATASET : ''),
  );
  const apiVersion = sanitizeConfigValue(
    globalConfig?.apiVersion || env.SANITY_API_VERSION || readMeta('sanity-api-version') || (typeof window !== 'undefined' ? window.SANITY_API_VERSION : ''),
  );
  const token = sanitizeConfigValue(
    globalConfig?.token || env.SANITY_READ_TOKEN || readMeta('sanity-read-token') || (typeof window !== 'undefined' ? window.SANITY_READ_TOKEN : ''),
  );

  return { projectId, dataset, apiVersion, token };
}

function buildQueryUrl(config, query) {
  const { projectId, dataset, apiVersion } = config;
  if (!projectId || !dataset || !apiVersion) return '';
  const encodedQuery = encodeURIComponent(query);
  return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`;
}

function normalizePost(raw) {
  return {
    id: raw._id,
    title: raw.title || 'Untitled Post',
    slug: raw.slug?.current || null,
    publishedAt: raw.publishedAt || null,
    excerpt: raw.excerpt || '',
    coverImage: raw.coverImage || null,
    tags: Array.isArray(raw.tags) ? raw.tags.filter(Boolean) : [],
  };
}

export async function fetchSanityPosts() {
  try {
    const config = getSanityConfig();
    const url = buildQueryUrl(config, GROQ_PUBLISHED_POSTS);

    if (!url) {
      console.info('[sanity-client] Missing project configuration; returning empty blog feed.');
      return [];
    }

    const headers = config.token
      ? {
          Authorization: `Bearer ${config.token}`,
        }
      : undefined;

    const response = await fetch(url, {
      headers,
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`Sanity request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (!payload || !Array.isArray(payload.result)) {
      return [];
    }

    return payload.result.map(normalizePost);
  } catch (error) {
    console.error('[sanity-client] Failed to fetch posts', error);
    return [];
  }
}
