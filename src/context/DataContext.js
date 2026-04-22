import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import siteDefaults from '../data/site.json';
import projectsDefaults from '../data/projects.json';
import postsDefaults from '../data/posts.json';
import techDefaults from '../data/tech.json';
import galleryDefaults from '../data/gallery.json';

const STORAGE_KEY = 'portfolio_data_v2';
const LEGACY_KEYS = ['portfolio_data_v1'];

const buildDefaults = () => ({
  site: JSON.parse(JSON.stringify(siteDefaults)),
  projects: JSON.parse(JSON.stringify(projectsDefaults)),
  posts: JSON.parse(JSON.stringify(postsDefaults)),
  tech: JSON.parse(JSON.stringify(techDefaults)),
  gallery: JSON.parse(JSON.stringify(galleryDefaults)),
});

// Fields on `site` that should always reflect the current defaults unless the
// user explicitly customized them. These tend to be paths/URLs that shift as
// the repo evolves — keeping them baked into localStorage breaks downloads.
const SITE_PATH_FIELDS = ['cvUrl', 'cvFileUrl'];

const mergeSite = (defaultSite, storedSite) => {
  if (!storedSite) return defaultSite;
  const merged = { ...defaultSite, ...storedSite };
  // If the user hasn't customized a known-path field (value equals some earlier
  // default or is missing), force the current default. We detect "not customized"
  // by seeing if the stored value differs from the current default AND doesn't
  // look like a real user-edited value (heuristic: custom values usually point
  // at files that actually exist — but we can't check that client-side, so we
  // just trust the current default for these well-known fields).
  for (const key of SITE_PATH_FIELDS) {
    if (!storedSite[key] || storedSite[key] === '/cv.pdf' || storedSite[key] === '/resume') {
      merged[key] = defaultSite[key];
    }
  }
  merged.socials = { ...(defaultSite.socials || {}), ...(storedSite.socials || {}) };
  return merged;
};

const loadInitial = () => {
  const defaults = buildDefaults();
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      for (const key of LEGACY_KEYS) {
        const legacy = localStorage.getItem(key);
        if (legacy) {
          raw = legacy;
          localStorage.removeItem(key);
          break;
        }
      }
    }
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      ...defaults,
      ...parsed,
      site: mergeSite(defaults.site, parsed.site),
    };
  } catch {
    return defaults;
  }
};

const genId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const slugify = (str) =>
  String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full / disabled — ignore
    }
  }, [data]);

  const updateSite = useCallback((patch) => {
    setData((d) => ({ ...d, site: { ...d.site, ...patch } }));
  }, []);

  const createItem = useCallback((collection, item, prefix) => {
    setData((d) => {
      const id = item.id || genId(prefix || collection.slice(0, 2));
      const next = { ...item, id };
      if (collection === 'posts' && !next.slug) next.slug = slugify(next.title);
      return { ...d, [collection]: [next, ...d[collection]] };
    });
  }, []);

  const updateItem = useCallback((collection, id, patch) => {
    setData((d) => ({
      ...d,
      [collection]: d[collection].map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  }, []);

  const removeItem = useCallback((collection, id) => {
    setData((d) => ({
      ...d,
      [collection]: d[collection].filter((item) => item.id !== id),
    }));
  }, []);

  const reorderItem = useCallback((collection, id, direction) => {
    setData((d) => {
      const list = [...d[collection]];
      const idx = list.findIndex((i) => i.id === id);
      if (idx < 0) return d;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= list.length) return d;
      [list[idx], list[newIdx]] = [list[newIdx], list[idx]];
      return { ...d, [collection]: list };
    });
  }, []);

  const createTechItem = useCallback((groupId, item) => {
    setData((d) => ({
      ...d,
      tech: d.tech.map((g) =>
        g.id === groupId
          ? { ...g, data: [...g.data, { ...item, id: item.id || genId('t') }] }
          : g
      ),
    }));
  }, []);

  const updateTechItem = useCallback((groupId, itemId, patch) => {
    setData((d) => ({
      ...d,
      tech: d.tech.map((g) =>
        g.id === groupId
          ? { ...g, data: g.data.map((it) => (it.id === itemId ? { ...it, ...patch } : it)) }
          : g
      ),
    }));
  }, []);

  const removeTechItem = useCallback((groupId, itemId) => {
    setData((d) => ({
      ...d,
      tech: d.tech.map((g) =>
        g.id === groupId
          ? { ...g, data: g.data.filter((it) => it.id !== itemId) }
          : g
      ),
    }));
  }, []);

  const createTechGroup = useCallback((label) => {
    setData((d) => ({
      ...d,
      tech: [...d.tech, { id: genId('g'), label, data: [] }],
    }));
  }, []);

  const updateTechGroup = useCallback((groupId, patch) => {
    setData((d) => ({
      ...d,
      tech: d.tech.map((g) => (g.id === groupId ? { ...g, ...patch } : g)),
    }));
  }, []);

  const removeTechGroup = useCallback((groupId) => {
    setData((d) => ({ ...d, tech: d.tech.filter((g) => g.id !== groupId) }));
  }, []);

  const resetAll = useCallback(() => {
    setData(buildDefaults());
  }, []);

  const resetCollection = useCallback((collection) => {
    const defaults = buildDefaults();
    setData((d) => ({ ...d, [collection]: defaults[collection] }));
  }, []);

  const importData = useCallback((next) => {
    setData((d) => ({ ...buildDefaults(), ...d, ...next }));
  }, []);

  const value = useMemo(
    () => ({
      data,
      updateSite,
      createItem,
      updateItem,
      removeItem,
      reorderItem,
      createTechGroup,
      updateTechGroup,
      removeTechGroup,
      createTechItem,
      updateTechItem,
      removeTechItem,
      resetAll,
      resetCollection,
      importData,
    }),
    [
      data,
      updateSite,
      createItem,
      updateItem,
      removeItem,
      reorderItem,
      createTechGroup,
      updateTechGroup,
      removeTechGroup,
      createTechItem,
      updateTechItem,
      removeTechItem,
      resetAll,
      resetCollection,
      importData,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export default DataContext;
