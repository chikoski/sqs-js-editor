module.exports = function(grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	dirs: {
	    src: {
		root: 'src/main',
		less: '<%= dirs.src.root %>/less',
		js: '<%= dirs.src.root %>/js',
		editor: '<%= dirs.src.js %>/editor',
		boot: '<%= dirs.src.js %>/boot'
	    },
	    dest: {
		root: 'target',
		css: '<%= dirs.dest.root %>/css',
		js: '<%= dirs.dest.root %>/js'
	    }
	},
	concat: {
	    boot: {
		src: '<%= dirs.src.boot %>/*.js',
		dest: '<%= dirs.dest.js %>/boot.js'
	    }
	},
	copy: {
	    model: {
		src: '<%= dirs.src.editor %>/models.js',
		dest: '<%= dirs.dest.js %>/models.js'
	    },
	    views: {
		src: '<%= dirs.src.editor %>/views.js',
		dest: '<%= dirs.dest.js %>/views.js'
	    },
	    parser: {
		src: '<%= dirs.src.editor %>/parser.js',
		dest: '<%= dirs.dest.js %>/parser.js'
	    },
	    editor: {
		src: '<%= dirs.src.editor %>/editor.js',
		dest: '<%= dirs.dest.js %>/editor.js'
	    }
	},
	less: {
	    dist: {
		src: 'src/main/less/sqseditor.less',
		dest: 'target/css/sqseditor.css'
	    }
	},
	uglify: {
	    model: {
		src: '<%= dirs.dest.js %>/models.js',
		dest: '<%= dirs.dest.js %>/models.min.js'
	    },
	    views: {
		src: '<%= dirs.dest.js %>/views.js',
		dest: '<%= dirs.dest.js %>/views.min.js'
	    },
	    parser: {
		src: '<%= dirs.dest.js %>/parser.js',
		dest: '<%= dirs.dest.js %>/parser.min.js'
	    },
	    parser: {
		src: '<%= dirs.dest.js %>/editor.js',
		dest: '<%= dirs.dest.js %>/editor.min.js'
	    },
	    boot: {
		src: '<%= dirs.dest.js %>/boot.js',
		dest: 'target/js/boot.min.js'
	    }
	},
	watch: {
	    less: {
		files: ['<%= dirs.src.less %>/*.less'],
		tasks: ['less']
	    },
	    js: {
		files: ['<%= dirs.src.boot %>/*.js', '<%= dirs.src.editor %>/*.js'],
		tasks: 'buildjs'
	    }
	}
	
    });

    grunt.registerTask('buildjs', ['concat', 'copy', 'uglify']);
    grunt.registerTask('less', ['less']);
    grunt.registerTask('default', ['buildjs', 'less']);
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};