module.exports = {
    options: {
        spawn: false,
        livereload: false
    },
    sass: {
        files: [ '<%= paths.css.src %>/**/*.scss' ],
        tasks: [ 'sass', 'postcss' ]
    },
    tasks: {
        options: {
            reload: false
        },
        files: [
            'Gruntfile.js',
            '<%= paths.grunt %>/**/*'
        ]
    }
};
