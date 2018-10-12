import { get, computed } from '@ember/object';

export default function getPathFrom(dependentKey) {
  return computed(dependentKey, function() {
    return get(this, dependentKey);
  }).readOnly();
}
