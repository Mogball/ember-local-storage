import Ember from 'ember';
import BaseAdapter from './base';
import { getStorage } from '../helpers/storage';
import StorageArray from '../indexeddb/array';

const {
  get
} = Ember;

export default BaseAdapter.extend({
  _storage: getStorage('indexeddb'),

  _getIndex(type) {
    const indices = get(this, '_indices');

    if (!indices[type]) {
      indices[type] = StorageArray
        .extend({ _storageKey: 'index-' + type })
        .create();
    }

    return indices[type];
  }
});