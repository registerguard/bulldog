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
		
		/*----------------------------------( WATCH )----------------------------------*/
		
		/**
		 * Run predefined tasks whenever watched file patterns are added, changed
		 * or deleted.
		 *
		 * $ grunt watch
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-watch
		 */
		
		watch: {
			
			tmpl : {
				
				files: [
					
					'./dev/tmpl/*.html',
					'./dev/css/less/*.less'
					
				],
				
				tasks: ['dev']
				
			}
			
		},
		
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
				'./dev/js/woof.*.js'
				
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
					
					'./dev/index.html',
					'./dev/css/<%= pkg.name %>.css'
					
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
						'./dev/js/preflight.js'
					],
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/html5shiv-printshiv.min.js' : [
						'./dev/js/html5shiv-printshiv.js'
					],
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/<%= pkg.name %>.min.js' : [
						'./dev/js/matchMedia.js',
						'./dev/js/jquery.*.js',
						'./dev/js/woof.js',
						'./dev/js/woof.*.js',
						'./dev/js/woof.init.js'
					],
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/js/respond.min.js' : [
						'./dev/js/respond.src.js',
						'./dev/js/respond.proxy.js'
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
		
		/*
		cssmin : {
			
			prod : {
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/css/<%= pkg.name %>.min.css' : [
						'./dev/css/bassline.css',
						'./dev/css/normalize.css',
						'./dev/css/wiffle.css',
						'./dev/css/onoff.css',
						'./dev/css/lines.css',
						'./dev/css/global.css',
						'./dev/css/navigation.css',
						'./dev/css/base.css',
						'./dev/css/utils.css',
						'./dev/css/headings.css',
						'./dev/css/rgpdf.css',
						'./dev/css/images.css',
						'./dev/css/lists.css',
						'./dev/css/tables.css',
						'./dev/css/copy.css',
						'./dev/css/media.css',
						'./dev/css/pending.css'
					]
					
				}
				
			}
			
		},
		*/
		
		//----------------------------------
		
		/**
		 * Compile LESS files to CSS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-less
		 */
		
		less: {
			
			options : {
				
				compress : true
				
			},
			
			dev: {
				
				files : {
					
					'./dev/css/<%= pkg.name %>.css' : './dev/css/less/<%= pkg.name %>.less'
					
				}
				
			},
			
			prod : {
				
				options : {
					
					yuicompress : true
					
				},
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= ver %>/css/<%= pkg.name %>.min.css' : './dev/css/less/<%= pkg.name %>.less'
					
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
						cwd : './dev/',
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
						cwd : './dev/',
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
				
				src : './dev/tmpl/index.html',
				dest : './dev/index.html'
				
			},
			
			prod : {
				
				src : './dev/tmpl/index.html',
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
	
	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
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
	
	grunt.registerTask('dev', ['jshint', 'env:dev', 'clean:dev', 'less:dev', 'preprocess:dev']);
	
	grunt.registerTask('prod', ['jshint', 'env:prod', 'clean:prod', 'uglify:prod', 'less:prod', 'copy:prod', 'preprocess:prod']);
	
};
