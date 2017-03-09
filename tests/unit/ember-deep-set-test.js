import deepSet from 'ember-deep-set';
import { module, test } from 'qunit';

module('Unit | Utility | deep set');

test('it works with non-nested keys', function(assert) {
  let result = deepSet({}, 'foo', 123);
  let expectedResult = { foo: 123 };
  assert.deepEqual(result, expectedResult);
});

test("it sets deeply nested values where they don't exist", function(assert) {
  let result = deepSet({}, 'foo.bar.baz', 123);
  let expectedResult = { foo: { bar: { baz: 123 } } };
  assert.deepEqual(result, expectedResult);
});

test('it sets deeply nested values where some exist', function(assert) {
  let result = deepSet({ foo: { meow: 456 } }, 'foo.bar.baz', 123);
  let expectedResult = { foo: { meow: 456, bar: { baz: 123 } } };
  assert.deepEqual(result, expectedResult);
});

test('it does not override keys on the same level', function(assert) {
  let result = deepSet({ foo: { bar: { qux: 456 } } }, 'foo.bar.baz', 123);
  let expectedResult = { foo: { bar: { baz: 123, qux: 456 } } };
  assert.deepEqual(result, expectedResult);
});

test('it throws an error if `object` is not an object', function(assert) {
  assert.throws(() => deepSet());
  assert.throws(() => deepSet([]));
  assert.throws(() => deepSet(123));
  assert.throws(() => deepSet(null));
  assert.throws(() => deepSet('123'));
});

test('it throws an error if `key` is not a string', function(assert) {
  assert.throws(() => deepSet({}));
  assert.throws(() => deepSet({}, [], 123));
  assert.throws(() => deepSet({}, 123, 123));
  assert.throws(() => deepSet({}, null, 123));
});
