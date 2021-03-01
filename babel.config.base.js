module.exports = {
  presets: ["next/babel", "@babel/preset-typescript"],
  env: {
    production: {
      plugins: ["emotion"],
    },
    development: {
      plugins: [["emotion", { sourceMap: true }]],
    },
  },
};
