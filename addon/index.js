import { get, set } from '@ember/object';
import { typeOf } from '@ember/utils';
import { runInDebug, assert } from '@ember/debug';

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
  runInDebug(() => validateArgs(obj, key));
  key.split('.').reduce((acc, currentKey, i, allKeys) => {
    let currentValue = get(acc, currentKey) ?? {};
    let valueToSet =
      allKeys[i + 1] && isObject(currentValue)
        ? currentValue
        : allKeys[i + 1] && !isObject(currentValue)
        ? {}
        : value;
    if (valueToSet === undefined) {
      // ember's set method does not handle undefined values correctly in older versions
      // https://github.com/emberjs/ember.js/issues/14270
      if (
        acc.hasOwnProperty(currentKey) ||
        typeof acc.setUnknownProperty !== 'function'
      ) {
        acc[currentKey] = valueToSet;
        if (typeof acc.notifyPropertyChange === 'function') {
          acc.notifyPropertyChange(currentKey);
        }
      } else {
        acc.setUnknownProperty(currentKey, valueToSet);
      }
      return valueToSet;
    } else {
      return set(acc, currentKey, valueToSet);
    }
  }, obj);
  return value;
}
