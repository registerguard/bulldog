/*global module:false */

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		// http://tanepiper.com/blog/2012/11/25/building-and-testing-javascript-with-gruntjs/
		now: grunt.template.today('yyyymmddhhMMss'), // http://blog.stevenlevithan.com/archives/date-time-format
		
		/*----------------------------------( META )----------------------------------*/
		
		meta: {
			
			banner_long: '/*!\n' +
			             ' * <%= pkg.title || pkg.name %>\n' +
			             '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
			             ' *\n' +
			             '<%= pkg.author.name ? " * @author " + pkg.author.name + "\\n" : "" %>' +
			             '<%= pkg.author.url ? " * @link " + pkg.author.url + "\\n" : "" %>' +
			             '<%= pkg.homepage ? " * @docs " + pkg.homepage + "\\n" : "" %>' +
			             ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
			             '<%= pkg.licenses ? " * @license Released under the " + _.pluck(pkg.licenses, "type").join(", ") + ".\\n" : "" %>' +
			             '<%= pkg.version ? " * @version " + pkg.version + "\\n" : "" %>' +
			             ' * @date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
			             ' */\n\n',
			
			banner_short: '/*! ' +
			              '<%= pkg.title || pkg.name %>' +
			              '<%= pkg.version ? " v" + pkg.version : "" %>' +
			              '<%= pkg.licenses ? " | " + _.pluck(pkg.licenses, "type").join(", ") : "" %>' +
			              '<%= pkg.homepage ? " | " + pkg.homepage : "" %>' +
			              ' */'
			
		},
		
		/*----------------------------------( 01 )----------------------------------*/
		
		clean: {
			
			options: {
				
				force: true // Sketchy!
				
			},
			
			build: {
				
				src: [
					
					'../<%= pkg.name %>/**/*'
					
				]
				
			}
			
		},
		
		/*----------------------------------( 02 )----------------------------------*/
		
		/**
		 * @see http://www.jshint.com/docs/
		 * @see http://www.jshint.com/docs/
		 * @see https://github.com/jshint/jshint/blob/r12/jshint.js#L256
		 */
		
		jshint: {
			
			options: {
				
				jshintrc: '.jshintrc'
				
			},
			
			init: [
				
				'./Gruntfile.js',
				'./src/js/modules/**/*.js'
				
			]
			
		},
		
		/*----------------------------------( 03 )----------------------------------*/
		
		/**
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 */
		
		uglify: {
			
			plugins: {
				
				files: {
					
					'../<%= pkg.name %>/<%= now %>/js/plugins.min.js': [
						'./src/js/plugins/jquery.cookie.js',
						'./src/js/plugins/jquery.ba-dotimeout.js',
						'./src/js/plugins/jquery.megawhale.js',
						'./src/js/plugins/jquery.megakrill.js',
						'./src/js/plugins/jquery.harmonia.js',
						'./src/js/plugins/jquery.jsonp.js',
						'./src/js/plugins/jquery.kerplop.js'
					]
					
				}
				
			},
			
			modules: {
				
				files: {
					
					'../<%= pkg.name %>/<%= now %>/js/modules.min.js': [
						'./src/js/modules/woof.js',
						'./src/js/modules/woof.forecast.js',
						'./src/js/modules/woof.megas.js',
						'./src/js/modules/woof.finder.js',
						'./src/js/modules/woof.harmonia.js',
						'./src/js/modules/woof.kerplop.js',
						'./src/js/modules/woof.init.js'
					]
					
				}
				
			},
			
			other: {
				
				files: {
					
					'../<%= pkg.name %>/<%= now %>/js/headutils.min.js': ['./src/js/plugins/headutils.js'],
					'../<%= pkg.name %>/<%= now %>/js/respond.min.js': ['./src/js/plugins/respond.src.js'],
					'../<%= pkg.name %>/<%= now %>/js/html5shiv.min.js': ['./src/js/plugins/html5shiv.js']
					
				}
				
			}
			
		},
		
		/*----------------------------------( 04 )----------------------------------*/
		
		cssmin: {
			
			/* Need banner option! */
			
			compress: {
				
				files: {
					
					'../<%= pkg.name %>/<%= now %>/css/<%= pkg.name %>.min.css': [
						'./src/css/normalize.css',
						'./src/css/wiffle.css',
						'./src/css/onoff.css',
						'./src/css/lines.css',
						'./src/css/global.css',
						'./src/css/navigation.css',
						'./src/css/base.css',
						'./src/css/utils.css',
						'./src/css/headings.css',
						'./src/css/rgpdf.css',
						'./src/css/images.css',
						'./src/css/lists.css',
						'./src/css/tables.css',
						'./src/css/copy.css',
						'./src/css/media.css',
						'./src/css/finder.css',
						'./src/css/pending.css'
					]
					
				}
				
			}
			
		},
		
		/*----------------------------------( 05 )----------------------------------*/
		
		copy: {
			
			main: {
				
				files: [
					
					{
						
						expand: true,
						cwd: './src/',
						src: ['img/**'],
						dest: '../<%= pkg.name %>/<%= now %>/'
						
					},
					
					{
						
						filter: 'isFile',
						expand: true,
						cwd: './src/',
						src: ['index.html'],
						dest: '../<%= pkg.name %>/<%= now %>/'
						
					}
					
				]
				
			}
			
		}
		
	});
	
	/*----------------------------------( TASKS )----------------------------------*/
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	//----------------------------------
	
	grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'cssmin', 'copy']);
	
};
