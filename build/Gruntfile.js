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
		
		watch : {
			
			tmpl : {
				
				files : [
					
					'./files/tmpl/*.html',
					'./files/css/less/*.less'
					
				],
				
				tasks : ['dev']
				
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
				'./files/js/woof.*.js'
				
			]
			
		},
		
		/*----------------------------------( ENVIRONMENT )----------------------------------*/
		
		/**
		 * Grunt task to automate environment configuration for future tasks.
		 *
		 * @see https://github.com/onehealth/grunt-env
		 */
		
		env : {
			
			/*
			options : {
				
				globalOption : 'foo'
				
			},
			*/
			
			dev : {
				
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
					
					'./files/index.html',
					'./files/css/<%= pkg.name %>.css'
					
				]
				
			},
			
			prod : {
				
				src : [
					
					'../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/**/*'
					
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
					
					'../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/js/preflight.min.js' : [
						'./files/js/preflight.js'
					],
					
					'../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/js/html5shiv-printshiv.min.js' : [
						'./files/js/html5shiv-printshiv.js'
					],
					
					'../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/js/<%= pkg.name %>.min.js' : [
						'./files/js/matchMedia.js',
						'./files/js/jquery.*.js',
						'./files/js/woof.js',
						'./files/js/woof.*.js',
						'./files/js/woof.init.js'
					],
					
					'../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/js/respond.min.js' : [
						'./files/js/respond.src.js',
						'./files/js/respond.proxy.js'
					]
					
				}
				
			}
			
		},
		
		/*----------------------------------( 04 )----------------------------------*/
		
		/**
		 * Compile LESS files to CSS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-less
		 */
		
		less : {
			
			options : {
				
				compress : true
				
			},
			
			dev : {
				
				files : {
					
					'./files/css/<%= pkg.name %>.css' : [
						'./files/css/less/<%= pkg.name %>.less',
						'./files/css/less/dev.less'
					]
					
				}
				
			},
			
			prod : {
				
				options : {
					
					yuicompress : true
					
				},
				
				files : {
					
					'../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/css/<%= pkg.name %>.min.css' : './files/css/less/<%= pkg.name %>.less'
					
				}
				
			}
			
		},
		
		/*----------------------------------( 05 )----------------------------------*/
		
		/**
		 * Copy files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-copy
		 * @see http://gruntjs.com/configuring-tasks#globbing-patterns
		 */

		copy : {
			
			prod : {
				
				files : [
					
					{
						
						expand : true,
						cwd : './files/',
						src : [
							'img/**',
							'!img/junk/**'
						],
						dest : '../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/'
						
					}/*,
					
					{
						
						filter : 'isFile',
						expand : true,
						cwd : './files/',
						src : ['index.html'],
						dest : '../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/'
						
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
				
				src : './files/tmpl/index.html',
				dest : './files/index.html'
				
			},
			
			prod : {
				
				src : './files/tmpl/index.html',
				dest : '../dist/<%= pkg.version %>/<%= now %>/<%= ver %>/index.html',
				options : {
					
					context : {
						path : '/<%= pkg.name %>/dist/<%= pkg.version %>/<%= now %>/<%= ver %>'
					}
					
				}
				
			}/*,
			
			// Testing ability to strip media queries using `@exclude` and `@endexclude`:
			test : {
				
				src : './files/css/less/base.less',
				dest : './files/css/less/ie/base.less'
				
			}
			*/
			
		}
		
	});
	
	/*----------------------------------( TASKS )----------------------------------*/
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
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
	
	//grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'copy']);
	
	grunt.registerTask('default', ['jshint']);
	
	grunt.registerTask('dev', ['jshint', 'env:dev', 'clean:dev', 'less:dev', 'preprocess:dev']);
	
	grunt.registerTask('prod', ['jshint', 'env:prod', 'clean:prod', 'uglify:prod', 'less:prod', 'copy:prod', 'preprocess:prod']);
	
};
