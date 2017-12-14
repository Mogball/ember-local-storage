/*jshint node:true*/

var stringUtils = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates a storage object.',

  availableOptions: [
    {
      name: 'type',
      type: ['object', 'array'],
      default: 'object',
      aliases:[
        { 'a': 'array'},
        { 'array': 'array'}
      ]
    },
    {
      name: 'storage',
      type: ['local', 'session'],
      default: 'local',
      aliases:[
        { 's': 'session'},
        { 'session': 'session'}
      ]
    }
  ],

  afterInstall: function () {
    return this.addBowerPackageToProject('localforage', '~1.3.1');
    return this.addBowerPackageToProject('localforage-sessionstoragewrapper', '~1.2.0');
  },

  locals: function(options) {
    var storage         = options.storage;
    var type            = options.type;
    var path            = [storage, type].join('/');

    var baseClass       = stringUtils.classify('storage-' + type);
    var initialState    = type === 'object' ? '{}' : '[]';

    var importStatement = [
      'import ' + baseClass,
      ' from ' + '\'ember-local-storage/' + path +'\'',
      ';'
    ].join('');

    return {
      importStatement: importStatement,
      baseClass: baseClass,
      initialState: initialState
    };
  }
};
