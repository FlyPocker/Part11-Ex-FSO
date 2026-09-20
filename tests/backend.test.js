const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')

test('backend application files are present', () => {
  assert.equal(fs.existsSync('app.js'), true)
  assert.equal(fs.existsSync('controllers/persons.js'), true)
})