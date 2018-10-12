import EmberObject, { get } from '@ember/object';
import deepSet from 'ember-deep-set';
import { module, test } from 'qunit';
import getPathFrom from '../helpers/get-path-from';

const Dummy = EmberObject.extend({
  path: '',
  value: getPathFrom('path')
});

module('Unit | Utility | deep set');

test('it works with non-nested keys', function(assert) {
  let testData = [
    null,
    '123',
    123,
    { foo: 'bar' },
    [123, 456],
    [],
    {}
  ];
  testData.forEach((data) => {
    let expectedResult = { data };
    let obj = {};
    deepSet(obj, 'data', data);
    assert.deepEqual(obj, expectedResult);
  });
});

test('it works with `undefined` as value', function(assert) {
  // plain object
  let obj = {};
  deepSet(obj, 'data', undefined);
  assert.deepEqual(obj, { data: undefined }, 'it works for plain objects');

  // EmberObject
  obj = EmberObject.create();
  deepSet(obj, 'data', undefined);
  assert.deepEqual(obj.getProperties('data'), { data: undefined }, 'it works for EmberObject');

  // setUnknownProperty
  obj = EmberObject.extend({
    setUnknownProperty(key /*, value */) {
      this[key] = 'unknown property';
    }
  }).create({ data: 'foo' });
  deepSet(obj, 'unknown', undefined);
  deepSet(obj, 'data', undefined);
  assert.deepEqual(
    obj.getProperties('data', 'unknown'), { data: undefined, unknown: 'unknown property' },
    'it respects setUnknownProperty'
  );
});

test("when setting on a POJO - it sets deeply nested values where they don't exist", function(assert) {
  let testData = [
    'foo.bar.baz.qux.name',
    'foo.bar.baz.name',
    'foo.bar.name',
    'foo.name'
  ];
  testData.forEach((data) => {
    let obj = {};
    deepSet(obj, data, data);
    assert.equal(get(obj, data), data);
  });
});

test("when setting on an Ember.Object - it sets deeply nested values where they don't exist", function(assert) {
  let testData = [
    'company.region.department.director.name',
    'company.region.department.name',
    'company.region.name',
    'company.name'
  ];
  testData.forEach((data) => {
    let obj = Dummy.create({ path: data });
    deepSet(obj, data, data);
    assert.equal(get(obj, data), data);
    assert.equal(get(obj, 'value'), data, 'computed properties should work');
  });
});

test('it sets deeply nested values where some exist', function(assert) {
  let expectedResult = { foo: { meow: 456, bar: { baz: 123 } } };
  let obj = { foo: { meow: 456 } };
  deepSet(obj, 'foo.bar.baz', 123);
  assert.deepEqual(obj, expectedResult);
});

test('it overrides non-objects in key path', function(assert) {
  let expectedResult = { foo: { bar: { baz: 123 } } };
  let obj = { foo: 4 };
  deepSet(obj, 'foo.bar.baz', 123);
  assert.deepEqual(obj, expectedResult);
});

test('it does not override keys on the same level', function(assert) {
  let expectedResult = { foo: { bar: { baz: 123, qux: 456 } } };
  let obj = { foo: { bar: { qux: 456 } } };
  deepSet(obj, 'foo.bar.baz', 123);
  assert.deepEqual(obj, expectedResult);
});

test('it throws an error if `object` is not an object', function(assert) {
  let testData = [
    undefined,
    null,
    '123',
    123,
    [],
    {}
  ];
  testData.forEach((data) => assert.throws(() => deepSet(data)));
});

test('it throws an error if `key` is not a string', function(assert) {
  let testData = [
    null,
    123,
    [],
    {}
  ];
  testData.forEach((data) => assert.throws(() => deepSet({}, data, 123)));
});
