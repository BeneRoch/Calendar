module.exports = {
    prod: {
        options: {
            banner: '/*! Dependencies for <%= package.title %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src    : [
            'node_modules/jquery/dist/jquery.min.js'
        ],
        dest   : '<%= paths.js.dist %>/vendors.js'
    }
};

