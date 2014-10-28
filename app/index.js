'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var ZfisGenerator = yeoman.generators.Base.extend({
	initializing: function() {
		this.pkg = require('../package.json');
	},

	prompting: function() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the doozie Zfis generator!'
		));

		var prompts = [{
			name: 'appName',
			message: 'app name',
			default: 'app'
		}, {
			name: 'version',
			message: 'version',
			default: '0.0.1'
		}, {
			type: "checkbox",
			message: "bower dependencies",
			name: "bower_dependencies",
			choices: [{
				name: "jquery",
				checked: true
			}, {
				name: "bootstrap",
				checked: true
			}, {
				name: "json3",
				checked: true
			}, {
				name: "es5-shim",
				checked: true
			}, {
				name: "angular"
			}, {
				name: "angular-resource"
			}, {
				name: "angular-cookies"
			}, {
				name: "angular-sanitize"
			}, {
				name: "angular-animate"
			}, {
				name: "angular-touch"
			}, {
				name: "angular-route"
			}, {
				name: "angular-ui-router"
			}]
		}, {
			type: "checkbox",
			message: "package dependencies",
			name: "package_dependencies",
			choices: [{
				name: "karma",
				checked: false
			}]
		}];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			this.version = props.version;
			var _bower_dependencies = {};
			props.bower_dependencies.forEach(function(e, i, a) {
				_bower_dependencies[e] = "*";
			});
			var _package_dependencies = {};
			props.package_dependencies.forEach(function(e, i, a) {
				_package_dependencies[e] = "*";
			});

			this.bower_dependencies = JSON.stringify(_bower_dependencies, null, '\r');
			this.package_dependencies = JSON.stringify(_package_dependencies, null, '\r');

			this.bower_dev_dependencies = JSON.stringify({}, null, '\r');
			this.package_dev_dependencies = JSON.stringify({}, null, '\r');

			this.template('_bower.json', 'bower.json');
			this.template('_package.json', 'package.json');
			// this.write('bower.json', JSON.stringify(bower, null, 2));
			done();
		}.bind(this));
	},

	writing: {
		app: function() {
			this.dest.mkdir('app');
			this.dest.mkdir('app/templates');

			this.dest.mkdir('static');
			this.dest.mkdir('static/css');
			this.dest.mkdir('static/images');
			this.dest.mkdir('static/js');
			this.dest.mkdir('src');
			this.dest.mkdir('test');
		},

		projectfiles: function() {
			this.src.copy('editorconfig', '.editorconfig');
			this.src.copy('jshintrc', '.jshintrc');
		}
	},

	end: function() {
		this.installDependencies();
	}
});

module.exports = ZfisGenerator;