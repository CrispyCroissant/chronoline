module.exports = {
  cache: {},
  get: (key) => {
    return this.cache[key];
  },
  set: (key, value) => {
    this.cache[key] = value;
  },
};
