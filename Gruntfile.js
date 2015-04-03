'use strict';
var assetDef = require('./build/assets.json'),
	arrName;

function getFileName(){
	if (!arrName) {
		arrName = {};
		var fileName = require('./build/rev.json');
		for ( var i in fileName ) {
			if (fileName.hasOwnProperty(i)){
				var key = i.match(/\/([^/]*)$/)[1];
				var val = fileName[i];
				val = val.match(/\/([^/]*)$/)[1];
				// tmp[key]= val;
				arrName[key] = val;
			}
		}
	}

	return arrName;
}

function rename(content, srcpath) {
	var arrName = getFileName();

	var	oldName, newName;

	for (oldName in arrName) {
		newName = arrName[oldName];
		content = content.replace(oldName, newName);
	}

	return content;
}

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			tmp: [
				'build/.tmp/**'
			],
			build: [
				'build/public'
			]
		},
		csslint: {
			options: {
				csslintrc: 'build/rules/.csslintrc',
				absoluteFilePathsForFormatters: false,
				formatters: [ {
					id: 'lint-xml',
					dest: 'build/reports/csslint.xml'
				} ]
			},
			src: [ 'app/css/**/*.css' ]
		},
		jshint: {
			client: {
				src: [
					'app/js/**/*.js'
				],
				options: {
					jshintrc: 'build/rules/.jshintrc-client',
					reporter: 'jslint',
					reporterOutput: 'build/reports/jshint-client.xml'
				}
			}
		},
		cssmin: {
			min: {
				files: assetDef.css
			}
		},
		uglify: {
			min: {
				options: {
					sourceMap: false
				},
				files: assetDef.js
			}
		},
		filerev: {
			img: {
				files: [ {
					expand: true,
					cwd: 'app/img/',
					src: [ '**/*' ],
					dest: 'build/public/img/'
				} ]
			},
			js: {
				files: [ {
					expand: true,
					cwd: 'build/.tmp/jsmin',
					src: [ '**/*.js' ],
					dest: 'build/public/js/'
				} ]
			},
			css: {
				files: [ {
					expand: true,
					cwd: 'build/.tmp/cssmin',
					src: [ '**/*.css' ],
					dest: 'build/public/css/'
				} ]
			}
		},
		filerev_assets: {
			rev: {
				options: {
					dest: 'build/rev.json',
					cwd: 'build/public'
				}
			}
		},
		copy: {
			index: {
				src: 'app/index-tmp.html',
				dest: 'build/public/index.html',
				options: {
					processContent: rename
				}
			},
			partials: {
				expand: true,
				dest: 'build/public/partials/',
				cwd: 'app/partials/',
				src: '**/*.html'
			}
		}
	});
	// load all plugins
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('verify', [ 'jshint' ]);
	// grunt.registerTask('build', [ 'clean:build', 'filerev:img', 'csslint', 'cssmin', 'uglify', 'filerev:css', 'filerev:js', 'filerev_assets', 'clean:tmp' ]);
	grunt.registerTask('build', [ 'clean:build', 'csslint', 'cssmin', 'uglify', 'filerev:css', 'filerev:js', 'filerev_assets', 'clean:tmp' ]);
	grunt.registerTask('default', [ 'verify', 'build', 'copy' ]);
};
