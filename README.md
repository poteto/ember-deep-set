# ember-deep-set ![Download count all time](https://img.shields.io/npm/dt/ember-deep-set.svg) [![CircleCI](https://circleci.com/gh/poteto/ember-deep-set.svg?style=shield)](https://circleci.com/gh/poteto/ember-deep-set) [![npm version](https://badge.fury.io/js/ember-deep-set.svg)](https://badge.fury.io/js/ember-deep-set) [![Ember Observer Score](http://emberobserver.com/badges/ember-deep-set.svg)](http://emberobserver.com/addons/ember-deep-set)

This is a simple utility function to deeply set a value on an Ember Object or POJO. Note that this mutates the object.

## Usage

```js
import deepSet from 'ember-deep-set';

let company = {};
deepSet(company, 'region.department.director.name', 'Jim Bob');
deepSet(company, 'region.department.name', 'Accounting');
deepSet(company, 'region.name', 'North America');
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-deep-set`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
