// Public retail prices for Kyrgyzstan. The anonymous key grants no administrative access.
(function () {
  const endpoint = "https://hbvuwnzemdifaapktaol.supabase.co/rest/v1/lens_catalog_localized";
  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidnV3bnplbWRpZmFhcGt0YW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MzM4MDgsImV4cCI6MjA3MDMwOTgwOH0.TtxcJIQXt4Quh96Rbe6U0bGlbsFyvs4mVkAgCS5Zvhg";

  window.loadRefocusLensCatalog = async function (categories) {
    const fallback = { categories, source: "approved-catalog" };
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 2200);
    try {
      const query = new URLSearchParams({
        select: "lens_id,price_from,price_to",
        country_id: "eq.kg",
        is_active: "eq.true",
      });
      const response = await fetch(endpoint + "?" + query, {
        headers: { apikey: anonKey, Authorization: "Bearer " + anonKey },
        cache: "no-store",
        signal: abort.signal,
      });
      if (!response.ok) return fallback;

      const rows = await response.json();
      const items = categories.flatMap(({ items }) => items);
      if (!Array.isArray(rows) || rows.length !== items.length) return fallback;

      const prices = new Map(rows.map(row => [row.lens_id, {
        priceFrom: Number(row.price_from),
        priceTo: Number(row.price_to),
      }]));
      if (prices.size !== items.length || items.some(({ id }) => {
        const value = prices.get(id);
        return !value || !Number.isFinite(value.priceFrom) || !Number.isFinite(value.priceTo)
          || value.priceFrom <= 0 || value.priceTo < value.priceFrom;
      })) return fallback;

      return {
        categories: categories.map(category => ({
          ...category,
          items: category.items.map(item => ({ ...item, ...prices.get(item.id) })),
        })),
        source: "database",
      };
    } catch {
      return fallback;
    } finally {
      clearTimeout(timeout);
    }
  };
})();
