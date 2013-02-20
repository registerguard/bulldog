/*global module:false, console:false, process:false*/

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),
		
		/**
		 * Build date and version.
		 *
		 * @see http://tanepiper.com/blog/2012/11/25/building-and-testing-javascript-with-gruntjs/
		 * @see http://blog.stevenlevithan.com/archives/date-time-format
		 */
		
		now : grunt.template.today('yyyymmdd'), // Alternative: yyyymmddhhMMss
		
		ver : 1,
		
		/*----------------------------------( PREFLIGHT )----------------------------------*/
		
		/**
		 * Validate files with JSHint.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 * @see http://www.jshint.com/docs/
		 */
		
		jshint : {
			
			options : {
				
				jshintrc : '.jshintrc'
				
			},
			
			init : [
				
				'./Gruntfile.js',
				'./src/js/woof.*.js'
				
			]
			
		},
		
		/*----------------------------------( ENVIRONMENT )----------------------------------*/
		
		/**
		 * Grunt task to automate environment configuration for future tasks.
		 *
		 * @see https://github.com/onehealth/grunt-env
		 */
		
		env : {
			
			options : {
				
				/* Shared Options Hash */
				//globalOption : 'foo'
				
			},
			
			dev: {
				
				NODE_ENV : 'DEVELOPMENT'
				
			},
			
			prod : {
				
				NODE_ENV : 'PRODUCTION'
				
			}
			
		},
		
		/*----------------------------------( 01 )----------------------------------*/
		
		/**
		 * Clean files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true // Sketchy!
				
			},
			
			dev : {
				
				src : [
					
					'./dev/**/*'
					
				]
				
			},
			
			prod : {
				
				src : [
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/**/*'
					
				]
				
			}
			
		},
		
		/*----------------------------------( 03 )----------------------------------*/
		
		/**
		 * Minify files with UglifyJS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 * @see http://lisperator.net/uglifyjs/
		 */
		
		uglify : {
			
			prod : {
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/preflight.min.js' : [
						'./src/js/preflight.js'
					],
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/html5shiv-printshiv.min.js' : [
						'./src/js/html5shiv-printshiv.js'
					],
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/<%= pkg.name %>.min.js' : [
						'./src/js/matchMedia.js',
						'./src/js/jquery.cookie.js',
						'./src/js/jquery.ba-dotimeout.js',
						'./src/js/jquery.megawhale.js',
						'./src/js/jquery.megakrill.js',
						'./src/js/jquery.harmonia.js',
						'./src/js/jquery.jsonp.js',
						'./src/js/jquery.kerplop.js',
						'./src/js/woof.js',
						'./src/js/woof.forecast.js',
						'./src/js/woof.megas.js',
						'./src/js/woof.finder.js',
						'./src/js/woof.harmonia.js',
						'./src/js/woof.kerplop.js',
						'./src/js/woof.init.js'
					],
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/respond.min.js' : [
						'./src/js/respond.src.js',
						'./src/js/respond.proxy.js'
					]
					
				}
				
			}
			
		},
		
		/*----------------------------------( 04 )----------------------------------*/
		
		/**
		 * Compress CSS files.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-cssmin
		 * @see https://github.com/GoalSmashers/clean-css
		 */
		
		cssmin : {
			
			prod : {
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/css/<%= pkg.name %>.min.css' : [
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
		
		/**
		 * Copy files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-copy
		 */
		
		copy : {
			
			prod : {
				
				files : [
					
					{
						
						expand : true,
						cwd : './src/',
						src : [
							'img/**',
							'util/**'
						],
						dest : '../<%= pkg.version %>/<%= now %>/<%= ver %>/'
						
					}//,
					
					/*
					{
						
						filter : 'isFile',
						expand : true,
						cwd : './src/',
						src : ['index.html'],
						dest : '../<%= pkg.version %>/<%= now %>/<%= ver %>/'
						
					}
					*/
					
				]
				
			}
			
		},
		
		/*----------------------------------( 06 )----------------------------------*/
		
		/**
		 * Grunt task around preprocess npm module.
		 *
		 * @see https://github.com/onehealth/grunt-preprocess
		 * @see https://github.com/onehealth/preprocess
		 */
		
		preprocess : {
			
			dev : {
				
				src : './src/tmpl/index.html',
				dest : './dev/index.html'
				
			},
			
			prod : {
				
				src : './src/tmpl/index.html',
				dest : '../<%= pkg.version %>/<%= now %>/<%= ver %>/index.html',
				options : {
					
					context : {
						path : '/<%= pkg.name %>/<%= pkg.version %>/<%= now %>/<%= ver %>'
					}
					
				}
				
			}
			
		}
		
	});
	
	/*----------------------------------( TASKS )----------------------------------*/
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.loadNpmTasks('grunt-preprocess');
	
	grunt.loadNpmTasks('grunt-env');
	
	//----------------------------------
	
	/**
	 * @see https://github.com/onehealth/grunt-preprocess/issues/7
	 * @see https://github.com/onehealth/grunt-env/issues/4
	 */
	
	grunt.registerTask('printenv', function () { console.log(process.env); });
	
	//grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'cssmin', 'copy']);
	
	grunt.registerTask('default', ['jshint']);
	
	grunt.registerTask('dev', ['jshint', 'env:dev', 'clean:dev', 'preprocess:dev']);
	
	grunt.registerTask('prod', ['jshint', 'env:prod', 'clean:prod', 'uglify:prod', 'cssmin:prod', 'copy:prod', 'preprocess:prod']);
	
};
