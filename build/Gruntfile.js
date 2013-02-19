/*global module:false, console:false, process:false*/

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),
		
		// http://tanepiper.com/blog/2012/11/25/building-and-testing-javascript-with-gruntjs/
		now : grunt.template.today('yyyymmdd'), // http://blog.stevenlevithan.com/archives/date-time-format (yyyymmddhhMMss)
		
		num : 1,
		
		/*----------------------------------( ENV )----------------------------------*/
		
		/**
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
		
		clean : {
			
			options : {
				
				force : true // Sketchy!
				
			},
			
			dev : {
				
				src : [
					
					'./src/index.html' // Sketchy?
					
				]
				
			},
			
			prod : {
				
				src : [
					
					'../<%= pkg.version %>/<%= now %>/<%= num %>/**/*'
					
				]
				
			}
			
		},
		
		/*----------------------------------( 02 )----------------------------------*/
		
		/**
		 * @see http://www.jshint.com/docs/
		 * @see http://www.jshint.com/docs/
		 * @see https://github.com/jshint/jshint/blob/r12/jshint.js#L256
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
		
		/*----------------------------------( 03 )----------------------------------*/
		
		/**
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 */
		
		uglify : {
			
			main : {
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= num %>/js/<%= pkg.name %>.min.js' : [
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
					]
					
				}
				
			},
			
			other : {
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= num %>/js/headutils.min.js' : ['./src/js/headutils.js'],
					'../<%= pkg.version %>/<%= now %>/<%= num %>/js/respond.min.js' : ['./src/js/respond.src.js'],
					'../<%= pkg.version %>/<%= now %>/<%= num %>/js/html5shiv.min.js' : ['./src/js/html5shiv.js']
					
				}
				
			}
			
		},
		
		/*----------------------------------( 04 )----------------------------------*/
		
		cssmin : {
			
			compress : {
				
				files : {
					
					'../<%= pkg.version %>/<%= now %>/<%= num %>/css/<%= pkg.name %>.min.css' : [
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
		
		copy : {
			
			main : {
				
				files : [
					
					{
						
						expand : true,
						cwd : './src/',
						src : ['img/**'],
						dest : '../<%= pkg.version %>/<%= now %>/<%= num %>/'
						
					}//,
					
					/*
					{
						
						filter : 'isFile',
						expand : true,
						cwd : './src/',
						src : ['index.html'],
						dest : '../<%= pkg.version %>/<%= now %>/<%= num %>/'
						
					}
					*/
					
				]
				
			}
			
		},
		
		/*----------------------------------( 06 )----------------------------------*/
		
		/**
		 * @see https://github.com/onehealth/grunt-preprocess
		 */
		
		preprocess : {
			
			dev : {
				
				src     : './src/tmpl/index.html',
				dest    : './src/index.html',
				options : {
					
					//context : { customOption : 'foo' }
					
				}
				
			},
			
			prod : {
				
				src  : './src/tmpl/index.html',
				dest : '../<%= pkg.version %>/<%= now %>/<%= num %>/index.html'
				
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
	
	grunt.registerTask('dev', ['env:dev', 'clean:dev', 'jshint', 'preprocess:dev']);
	
	grunt.registerTask('prod', ['env:prod', 'clean', 'jshint', 'uglify', 'cssmin', 'copy', 'preprocess']);
	
};
