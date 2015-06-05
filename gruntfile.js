'use strict';




module.exports = function(grunt){

    require('load-grunt-tasks');
    require('time-grunt');

    grunt.initConfig({
        watch:{
            js:{
                files:['app/js/*.js','bin/**/*.js'],
                options:{
                    livereload:true
                }
            },
            views:{
                files:['app/views/**','views/*.ejs'],
                options: {
                    livereload:true
                }
            },
            styles:{
                files:['app/styles/**'],
                options:{
                    livereload:true
                }
            },
            models:{
                files:['lib/models/**'],
                options:{
                    livereload:true
                }
            },
            schemas:{
                files:['lib/schemas/**'],
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev: {
                options: {
                    file: 'bin/www',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 4000
                    },
                    cwd: __dirname
                }
            }
        },
        jshint: {
            options: {
                ignores: ['/lib/**/*.js']
            },
            all: ['app/**/*.js']
        },
        uglify: {
            development: {
                files: {
                }
            }
        },
        concurrent:{
            tasks:['watch','nodemon','uglify','jshint']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.options('force',true);
    console.log(grunt)

    grunt.registerTask('default',['concurrent']);
};