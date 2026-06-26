// Used to compress the brand logo: AURESCA.svg -> public/images/auresca-logo.svg
module.exports = {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 1 },
          convertPathData: { floatPrecision: 1 },
        },
      },
    },
    "removeDimensions",
  ],
};
