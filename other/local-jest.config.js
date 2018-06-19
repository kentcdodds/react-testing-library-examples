const path = require('path')

module.exports = {
  roots: [path.resolve(__dirname, '../src')],
  displayName: 'local',
  testMatch: ['**/__local_tests__/**/*.js'],
}
