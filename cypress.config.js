const { defineConfig } = require('cypress')
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");


module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://build-cy717a5fk.now.sh/',
  },
})
