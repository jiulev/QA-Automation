const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const fs = require("fs");

async function setupNodeEvents(on, config) {
  // Plugin de Cucumber
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  // Tags desde variable de entorno o config
  config.env.tags = process.env.TAGS || config.env.tags || "";

  // ENV por defecto (DEV), permite override con --env ENV=TST
  config.env.ENV = process.env.ENV || config.env.ENV || "DEV";

  // ---- Cargar env.json y setear baseUrl dinámico ----
  try {
    const envFile = JSON.parse(fs.readFileSync("env.json", "utf8"));
    // Mezclo TODO el env.json dentro de Cypress.env()
    config.env = { ...config.env, ...envFile };

    const envKey = config.env.ENV; // "DEV" o "TST"
    const current = envFile[envKey] || {};
    // baseUrl para visitar con cy.visit('/')
    if (current.url_automationexercise) {
      config.baseUrl = current.url_automationexercise;
    }
  } catch (e) {
    // Si no existe env.json, seguimos sin romper (usa config.baseUrl inexistente)
    console.warn("[cypress.config] No se pudo leer env.json:", e.message);
  }
  // ---------------------------------------------------

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
