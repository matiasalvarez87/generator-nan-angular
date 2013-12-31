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
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.angularVersion = props.angularVersion;

    cb();
  }.bind(this));
};

NanAngularGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

NanAngularGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
