import test from 'node:test'
import assert from 'node:assert/strict'

test('frontend test suite is wired', () => {
  assert.equal(typeof document, 'undefined')
})