'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NanAngularGenerator = module.exports = function NanAngularGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NanAngularGenerator, yeoman.generators.Base);

NanAngularGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
      name: 'projectName',
      message: 'How would you like to name the new project?'
    }, {
      type: 'list',
      name: 'angularVersion',
      message: 'Which AngularJS version would you like to use?',
      choices: ['1.2.6', '1.2.5', '1.1.5']
    }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Which AngularJS modules would you like to include?',
      choices: [{
        value: 'resourceModule',
        name: 'angular-resource.js',
        checked: true
      }, {
        value: 'cookiesModule',
        name: 'angular-cookies.js',
        checked: true
      }, {
        value: 'sanitizeModule',
        name: 'angular-sanitize.js',
        checked: true
      }, {
        value: 'routeModule',
        name: 'angular-route.js',
        checked: true
      }]
    }, {
      name: 'devPort',
      message: 'What number port would you like to use for the development environment?',
      default: 9000
    }
  ];

  this.prompt(prompts, function (props) {

    // General Options
    this.projectName = props.projectName;
    this.angularVersion = props.angularVersion;
    this.devPort = props.devPort;

    // AngularJS Modules
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.resourceModule = hasMod('resourceModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.routeModule = hasMod('routeModule');

    cb();
  }.bind(this));
};

NanAngularGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/styles');
  this.mkdir('app/styles/less');
  this.mkdir('app/js');
  this.mkdir('app/js/controllers');
  this.mkdir('app/js/services');
  this.mkdir('app/js/models');
  this.mkdir('app/js/directives');
  this.mkdir('app/js/filters');
  this.mkdir('app/views');

  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');

  // Application files
  this.template('index.html', 'app/index.html');
  this.copy('js/main.js', 'app/js/main.js');
  this.copy('views/main.html', 'app/views/main.html');

  // Application styles
  this.copy('styles/less/general.less', 'app/styles/less/general.less');
  this.copy('styles/less/commons.less', 'app/styles/less/commons.less');
  this.copy('styles/less/variables.less', 'app/styles/less/variables.less');
  this.copy('styles/less/main.less', 'app/styles/less/main.less');
};

NanAngularGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
