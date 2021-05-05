module.exports = (api) => {
  const isTest = api.env("test");

  return {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          // Only add WDYR when babel is executed by storybook
          ...(process.env.STORYBOOK && {
            importSource: "@welldone-software/why-did-you-render",
          }),
        },
      ],
      "@babel/preset-typescript",
      // We need to transpile tests so jest understands them
      [
        "@babel/preset-env",
        {
          bugfixes: true,
          loose: true,
          targets: isTest
            ? {
                node: "current",
              }
            : {
                esmodules: true,
              },
        },
      ],
    ].filter(Boolean),
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          useESModules: true,
          regenerator: false,
          version: require("@babel/helpers/package.json").version,
        },
      ],
    ],
  };
};
