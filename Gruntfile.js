module.exports = function( grunt ) {

    grunt.initConfig({

        pkg   : grunt.file.readJSON('package.json'),
        clean : [ "<%= pkg.environment %>/*" ],

        copy : {
            base : {
                files : [
                    {
                        expand  : true,
                        flatten : true,
                        dest    : '<%= pkg.environment %>/',
                        src     : [ 'src/*' ],
                        filter  : 'isFile'
                    }
                ]
            },
            core : {
                files : [
                    {
                        expand  : true,
                        flatten : true,
                        dest    : '<%= pkg.environment %>/assets/core/',
                        cwd     : 'src/core/',
                        src     : [
                            'angular/angular.min.js',
                            'angular/angular.min.js.map',
                            'angular-route/angular-route.min.js',
                            'angular-route/angular-route.min.js.map',
                            'angular-animate/angular-animate.min.js',
                            'angular-animate/angular-animate.min.js.map',
                            'angular-cookies/angular-cookies.min.js',
                            'angular-cookies/angular-cookies.min.js.map',
                            'angular-bootstrap/ui-bootstrap.min.js',
                            'angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'angular-input-masks/angular-input-masks.min.js',
                            'angular-input-masks/angular-input-masks-dependencies.min.js',
                            'angular-sanitize/angular-sanitize.min.js',
                            'angular-sanitize/angular-sanitize.min.js.map',
                            'angular-ui-mask/dist/mask.min.js',
                            'underscore/underscore-min.js',
                            'underscore/underscore-min.map',
                            'jquery/dist/jquery.min.js',
                            'jquery/dist/jquery.min.map',
                            'angular-popeye/release/popeye.min.js'
                        ]
                    }
                ]
            },
            bootstrap : {
                files : [
                    {
                        expand  : true,
                        flatten : false,
                        dest    : '<%= pkg.environment %>/assets/core/bootstrap/',
                        cwd     : 'src/core/bootstrap/dist/',
                        src     : [ '**/*' ]
                    }
                ]
            },
            vendor : {
                files : [
                    {
                        expand  : true,
                        dest    : '<%= pkg.environment %>/assets/vendor/',
                        cwd     : 'src/vendor',
                        src     : [ '**' ]
                    }
                ]
            },
            views : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/views/',
                        cwd    : 'src/app/components/',
                        src    : [ '**/*.html' ]
                    }
                ]
            },
            images : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/assets/images/',
                        cwd    : 'src/assets/images/',
                        src    : [ '**' ]
                    }
                ]
            },
            fonts : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/assets/fonts/',
                        cwd    : 'src/assets/fonts/',
                        src    : [ '**' ]
                    }
                ]
            }
        },

        concat : {
            options : {
                separator : ';',
                sourceMap : true,
                banner    : "'use strict';\n",
                process   : function(src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist : {
                src  : [ 'src/app/*.js', 'src/app/**/*.js' ],
                dest : '<%= pkg.environment %>/assets/app/main.js'
            }
        },

        uglify : {
            options : {
                mangle : false
            },
            core : {
                files : {
                    '<%= pkg.environment %>/assets/app/main.js' : [ '<%= pkg.environment %>/assets/app/main.js' ]
                }
            }
        },

        compass : {
            dist : {
                options : {
                    config : 'config.rb'
                }
            }
        },

        concat_css: {
            all : {
                src : ["src/assets/css/*.css"],
                dest:  "<%= pkg.environment %>/assets/css/main.css"
            }
        },

        cacheBust : {
            options : {
                encoding  : 'utf8',
                algorithm : 'md5',
                length    : 16
            },
            assets : {
                files : {
                    src : ['<%= pkg.environment %>/index.html']
                }
            }
        },

        jshint : {
            options : {
                reporter : require('jshint-stylish')
            },
            all: [
                "Gruntfile.js",
                "src/app/**/*.js"
            ]
        }

    });

    grunt.loadNpmTasks( 'grunt-bower-task' );
    grunt.loadNpmTasks( 'grunt-cache-bust' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-compass' );
    grunt.loadNpmTasks( 'grunt-concat-css' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    grunt.registerTask( 'build', [
            'jshint',
            'clean',
            'copy',
            'compass',
            'concat',
            'concat_css',
            'uglify'
        ]
    );

};
