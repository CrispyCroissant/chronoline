module.exports = (function () {
  let cache = {};
  return {
    get: (key) => {
      return cache[key];
    },
    set: (key, value) => {
      cache[key] = value;
    },
  };
})();
