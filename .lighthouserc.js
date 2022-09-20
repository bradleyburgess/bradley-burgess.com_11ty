module.exports = {
  ci: {
    collect: {
      staticDistDir: "dist",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "csp-xss": "off",
        "tap-targets": "warn",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
