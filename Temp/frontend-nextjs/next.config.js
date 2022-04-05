const withReactSvg = require("next-react-svg");
const path = require("path");

(module.exports = withReactSvg({
  include: path.resolve(__dirname, "public/icons/svg"),
  webpack(config, options) {
    return config;
  },
})),
  {
    reactStrictMode: true,
    env: {
      BASE_URL: process.env.BASE_URL,
      REACT_APP_BASE_URL: "http://localhost:3000",
    },
    future: {
      webpack5: true,
    },
  };
