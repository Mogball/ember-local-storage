import Ember from 'ember';
import { module, test } from 'qunit';

import AnonymousLikes from 'dummy/models/anonymous-likes';

module('array - likes', {
  afterEach: function() {
    window.localStorage.clear();
  }
});

test('it does not share data', function(assert) {
  var imageLikes,
    postLikes;

  assert.expect(5);

  // ImageLikes
  imageLikes = AnonymousLikes.create({
    storageKey: 'image-likes',
  });

  assert.deepEqual(imageLikes.get('initialContent'), []);

  Ember.run(function() {
    imageLikes.addObject('martin');
  });

  assert.deepEqual(imageLikes.get('content'), ['martin']);


  // PostLikes
  postLikes = AnonymousLikes.create({
    storageKey: 'post-likes',
  });

  assert.deepEqual(postLikes.get('initialContent'), []);

  Ember.run(function() {
    postLikes.addObject('peter');
  });

  assert.deepEqual(postLikes.get('content'), ['peter']);

  // ImageLikes don't change
  assert.deepEqual(imageLikes.get('content'), ['martin']);
});

test('reset method restores initialContent', function(assert) {
  var imageLikes = AnonymousLikes.create({
    storageKey: 'image-likes',
  });

  assert.expect(3);

  //initialContent is set properly
  assert.deepEqual(imageLikes.get('content'), []);

  //add new objects
  Ember.run(function() {
    imageLikes.addObject('martin');
  });

  //we expect them to be present
  assert.deepEqual(imageLikes.get('content'), ['martin']);

  //reset
  imageLikes.reset();

  //data is back to initial values
  assert.deepEqual(imageLikes.get('content'), []);

});