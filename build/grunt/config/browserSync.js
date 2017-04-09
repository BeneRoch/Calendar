module.exports = {
    options: {
        open      : false,
        proxy     : 'calendar.dev',
        port      : 3000,
        watchTask : true,
        notify    : false
    },
    dev: {
        bsFiles: {
            src : [
                '<%= paths.css.dist %>/**/*.css',
                '<%= paths.js.dist %>/**/*.js'
            ]
        }
    }
};
