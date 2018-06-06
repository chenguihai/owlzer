'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);


    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: appConfig,
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/js/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            start:{
                options: {
                    livereload: '<%= connect.start.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/views/**/*.html',
                    '<%= yeoman.app %>/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                    '<%= yeoman.app %>/js/**/*.js'
                ]
            },
            dist:{
                options: {
                    livereload: '<%= connect.dist.options.livereload %>'
                },
                files: [
                    '<%= yeoman.dist %>/{,*/}*.html',
                    '<%= yeoman.dist %>/views/**/*.html',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                    '<%= yeoman.dist %>/js/**/*.js'
                ]
            }
        },
        connect: {
            options: {
                protocol: 'http',
                port: 10012,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 36003
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        console.log(connect);
                        return [
                            connect.static('dist'),
                            connect().use(
                              '/bower_components',
                              connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('dist'),
                            connect.static('test'),
                            connect().use(
                              '/bower_components',
                              connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            start:{
              options:{
                  port: 80,
                  open: true,
                  hostname: '0.0.0.0',
                  livereload: 36000,
                  base:'<%= yeoman.app %>',
                  middleware: function (connect) {
                      return [
                          connect().use('/bower_components',connect.static('./bower_components')),
                          connect.static(appConfig.app)
                      ];
                  }
              }
            },
            dist: {
                options: {
                    port: 88,
                    open: true,
                    hostname: '0.0.0.0',
                    livereload: 36008,
                    base:'<%= yeoman.dist %>',
                    middleware: function (connect) {
                        return [
                            connect().use('/bower_components',connect.static('./bower_components')),
                            connect.static(appConfig.dist)
                        ];
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Add vendor prefixed styles
        // 这个还有问题
        autoprefixer: {
            options: {
                browserslist: ['>1%', 'last 2 versions', 'chrome', 'ie']
            },
            mutiple_files: {
                expand: true,
                flatten: true,//是否取代原先文件名
                // src: 'css/styles/*.css',
                // dest: './result/'
                cdw: '<%= yeoman.app %>/',
                src: 'styles/*.css',
                dest: '.tmp/styles/'
            }
        },
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /^(\.\.\/)/
            }
        },
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/js/**/*.js',
                    '<%= yeoman.dist %>/views/**/*.html',
                    // '<%= yeoman.dist %>/views/tpl/*.html',
                    '!<%= yeoman.dist %>/index.html',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/assets/**/*.{png,jpg,jpeg,gif,webp,svg,ico}',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                    '<%= yeoman.dist %>/fonts/*',
                ]
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '.tmp',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],//原来的值是这个uglifyjs
                            // js: ['concat'],//原来的值是这个uglifyjs
                            css: ['concat']
                            // css: ['concat']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            htmlUi: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            js: ['<%= yeoman.dist %>/js/**/*.js'],
            img: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            jsImg:['<%= yeoman.dist %>/js/**/*.js'],
            // jsImg:['<%= yeoman.dist %>/js/controllers/*.js'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles',
                    '<%= yeoman.dist %>/assets/layouts/css',
                    '<%= yeoman.dist %>/assets/layouts/css/themes',
                    '<%= yeoman.dist %>/js',
                    '<%= yeoman.dist %>/views',
                ],
                patterns: {
                    js: [[/([a-zA-Z0-9]+\.js|[a-zA-Z_0-9]+\.html)/g, 'replace js in js']],
                    htmlUi: [[/([a-zA-Z-]+\.html)/g, 'replace html in html']],
                    img: [[/([a-zA-Z0-9_\-]+\.[png,jpg]|[a-zA-Z0-9_\-]+\.ico)/g, 'replace image in css']],
                    jsImg: [[/([a-zA-Z0-9_\-@]+\.png|[a-zA-Z0-9_\-@]+\.jpg)/g, 'replace image in js']]
                    // jsImg: [[/([a-zA-Z0-9_\-@]+\.jpg|[a-zA-Z0-9_\-@]+\.png|[a-zA-Z0-9_\-@]+\.jpeg|[a-zA-Z0-9]+\.js|[a-zA-Z_0-9]+\.html|[a-zA-Z_0-9]+\.sb)/g, 'replace image in js']]
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: '**/*.css',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/js',
                    src: '**/*.js',
                    dest: '<%= yeoman.dist %>/js'
                }]
            },
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>*/',
                mangle: true//不混淆变量名
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 1 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images/',
                    src: '{,*/}*.{png,jpg,jpeg,gif,ico}',
                    dest: '.tmp/images/'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images/',
                    src: '{,*/}*.svg',
                    dest: '.tmp/images/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,//去除空格，不清除script,style,pre,textarea里面的空格
                    conservativeCollapse: true,//至少保留一个空格
                    collapseBooleanAttributes: true,//去除selected,disabled,checked,readonly的属性值
                    removeCommentsFromCDATA: true,//省略注释语法
                    removeOptionalTags: true,//自动把缺失的标签补全
                    removeComments : true, 	//移除注释
                    removeEmptyAttributes:true //删除值为空的html属性
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>/'
                }]
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/js',//原文直接写路径
                    src: '**/*.js',
                    dest: '.tmp/js'
                },{
                    expand:true,
                    cwd:'.tmp/js',
                    src:'**/*.js',
                    dest:'.tmp/js'
                }]
            }
        },
        cdnify: {
            options: {
                base: 'http://www.ddpai.com/'
            },
            customOptions: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/styles',
                    src: '*.css',
                    dest: '<%= yeoman.dist %>/styles'
                }]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '<%= yeoman.dist %>/',
                        src: ['assets/**/*', 'fonts/*','*.html', 'views/{,*/}*.html']
                    },
                    {
                        expand: true,
                        cwd: '.tmp/styles',
                        dest: '<%= yeoman.dist %>/styles',
                        src: ['*.css']
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['*.{png,jpg,jpeg,gif,ico}']
                    },
                    {
                        expand: true,
                        cwd: '.tmp/js',
                        dest: '<%= yeoman.dist %>/js',
                        src: ['**/*']
                    },
                    // {
                    //     expand: true,
                    //     cwd: 'bower_components/bootstrap/dist',
                    //     src: 'fonts/*',
                    //     dest: '<%= yeoman.dist %>/'
                    // },
                    // {
                    //     expand: true,
                    //     cwd: 'bower_components/font-awesome/',
                    //     src: 'fonts/*',
                    //     dest: '<%= yeoman.dist %>/'
                    // }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles/',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build','connect:dist:keepalive','watch:dist']);
        }
        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            // 'connect:livereload',
            'connect:start',
            // 'watch'
            'watch:start'
        ]);
    });
    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);
    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        // 'cdnify',//cdn路径
        'cssmin',
        // 'filerev',//命名文件
        'usemin',
        'htmlmin',
        'uglify'
    ]);
    grunt.registerTask('default', [
        'usemin:jsImg'
    ]);
};
