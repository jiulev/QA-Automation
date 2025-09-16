// cypress.config.js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  config.env.tags = process.env.TAGS || config.env.tags || "";
  config.env.ENV  = process.env.ENV  || config.env.ENV  || "DEV";

  const envKey  = config.env.ENV;
  const current = config.env[envKey] || {};
  if (current.url_automationexercise) config.baseUrl = current.url_automationexercise;

  on("file:preprocessor", createBundler({
    plugins: [createEsbuildPlugin(config)],   // <- sin .default
  }));

  return config;
}

module.exports = defineConfig({
  env: { tags: "", ENV: "DEV" },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/journeys/**/*.feature",
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
  },
});
