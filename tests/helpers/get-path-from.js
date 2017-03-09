import Ember from 'ember';

const {
  computed,
  get
} = Ember;

export default function getPathFrom(dependentKey) {
  return computed(dependentKey, function() {
    return get(this, dependentKey);
  }).readOnly();
}
