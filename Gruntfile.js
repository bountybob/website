module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webserver: 'C:/apps/Apache Software Foundation/Apache24/htdocs/',
    
        clean: {
            build: ['build']
        },
        
        copy: {
            css: {
                files: [
                    {src: [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',                        
                    ], dest: 'build/css/', expand: true, flatten: true}
                ]
            },
            js: {
                files: [
                    {src: [                        
                        'node_modules/jquery/dist/jquery.min.js', 
                        'node_modules/popper/dist/popper.min.js',         
                        'node_modules/bootstrap/dist/js/bootstrap.min.js'
                    ], dest: 'build/js/', expand: true, flatten: true}
                ]                            
            },
            html: {
                files: [
                    {src: 'src/*.html', dest: 'build/', expand: true, flatten: true}
                ]
            }            
        }, // copy
                    
        concat: {
            css: {                
                src: 'src/css/*.css',
                dest: 'build/css/<%= pkg.name %>.css'
            }
        }, // concat
    
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                src: 'src/js/*.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        }, // uglify
    
        watch: {
            css: {
                files: ['src/css/*.css'],
                tasks: ['concat:css']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html']
            }        
        } // watch
    }); // initConfig

    // Load plugin tasks  
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // My tasks
    grunt.registerTask('test', function() {
        console.log('Testing 1 2 3');
    });
  
    // Default task
    grunt.registerTask('default', [
        'clean',
        'copy', 
        'concat', 
        'uglify', 
        'watch'
    ]);
};