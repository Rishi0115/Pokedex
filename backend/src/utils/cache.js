const cache = {};
const TTL = parseInt(process.env.CACHE_TTL) || 300000; // 5 min default

function get(key) {
  const entry = cache[key];
  if (!entry) return null;

  if (Date.now() - entry.timestamp > TTL) {
    delete cache[key];
    return null;
  }

  return entry.data;
}

function set(key, data) {
  cache[key] = { data, timestamp: Date.now() };
}

function clear() {
  Object.keys(cache).forEach((key) => delete cache[key]);
}

module.exports = { get, set, clear };
