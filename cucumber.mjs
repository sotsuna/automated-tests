export default {
  formatOptions: {
    "snippetInterface": "async-await"
  },
  format: ['html:bdd-tests/reports/cucumber-report.html'],
  parallel: 1,
  paths: ['bdd-tests/features/**/*.feature'],
  require: ['bdd-tests/step-definition/**/*.ts','bdd-tests/support/**/*.ts'],
  requireModule: ['ts-node/register'],
}