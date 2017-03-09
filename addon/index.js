import Ember from 'ember';

const {
  assert,
  set,
  getWithDefault,
  typeOf
} = Ember;

/**
 * Check if argument is an object.
 *
 * @private
 * @param {Any} obj
 * @returns {Boolean}
 */
function isObject(obj) {
  return typeOf(obj) === 'object' || typeOf(obj) === 'instance';
}

/**
 * Validate arguments.
 *
 * @private
 * @param {Any} obj
 * @param {Any} key
 * @returns {Void}
 */
function validateArgs(obj, key) {
  assert('[ember-deep-set] non-object passed in', isObject(obj));
  assert('[ember-deep-set] `key` must be a string', typeOf(key) === 'string');
}

/**
 * Deeply set a value on an Ember Object or POJO. Mutates the object.
 *
 * @export
 * @public
 * @param {Object} obj
 * @param {String} key
 * @param {Any} value
 * @returns {Object}
 */
export default function deepSet(obj, key, value) {
  validateArgs(obj, key);
  key.split('.').reduce((acc, currentKey, i, allKeys) => {
    let valueToSet = allKeys[i + 1] ? getWithDefault(acc, currentKey, {}) : value;
    return set(acc, currentKey, valueToSet);
  }, obj);
  return value;
}
