module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webserver: 'C:/apps/Apache Software Foundation/Apache24/htdocs/',
    
    copy: {
        css: {
            files: [{
                expand: true,
                cwd: 'src/css',
                src: '**',
                dest: 'build/css'
            }]
        },
        test: {
            files: [{
                expand: true,
                cwd: 'build',
                src: '**', // read everything inside the cwd
                dest: '<%= webserver %>/'
            }]
        }
    },
                    
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        js: {
            src: 'src/js/*.js',
            dest: 'build/js/<%= pkg.name %>.min.js'
        }
    },
    
    watch: {
        css: {
            files: ['css/**'],
            tasks: ['copy:css']
        },
        js: {
            files: ['js/**'],
            tasks: ['uglify']
        }        
    }   
  });

  // Load plugin tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // My tasks
  grunt.registerTask('test', function() {
    console.log('Testing 1 2 3');
  });
  
  // Default task
  grunt.registerTask('default', ['copy:css', 'uglify', 'watch']);
};