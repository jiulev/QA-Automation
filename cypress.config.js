const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // Plugin de Cucumber
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  // Tags desde variable de entorno o config
  config.env.tags = process.env.TAGS || config.env.tags || "";

  // ENV por defecto (DEV), permite override con --env ENV=TST
  config.env.ENV = process.env.ENV || config.env.ENV || "DEV";

  // Preprocesador (esbuild)
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  env: {
    tags: "",
    ENV: "DEV", // default; se puede overridear en runtime
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/journeys/**/features/**/*.feature",
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
  },
});
