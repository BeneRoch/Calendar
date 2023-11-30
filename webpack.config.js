const path                      = require('path');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const terser                    = require('terser');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = [
    {
        node:    {
            global: true
        },
        entry:   {
            bCalendar: [
                './src/js/doc.js',
                './src/js/calendar.js',
                './src/js/options.js',
                './src/js/listeners.js',
                './src/js/view.js',
                './src/js/utils.js'
            ]
        },
        output:  {
            path: path.resolve(__dirname, 'dist/js/')
        },
        module:  {
            rules: [
                {
                    test:    /\.js$/,
                    exclude: /node_modules/,
                    use:     {
                        loader:  'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                }
            ]
        },
        plugins: [
            new MergeIntoSingleFilePlugin({
                files:     {
                    "app.js": [
                        './src/js/doc.js',
                        './src/js/calendar.js',
                        './src/js/options.js',
                        './src/js/listeners.js',
                        './src/js/view.js',
                        './src/js/utils.js'
                    ]
                },
                transform: {
                    "app.js": async (code) => {
                        const minifiedCode = await terser.minify(code);
                        return minifiedCode.code;
                    },
                }
            })
        ]
    },
    {
        entry:   {
            main: './src/styles/main.scss'
        },
        output:  {
            path: path.resolve(__dirname, 'dist/styles/')
        },
        module:  {
            rules: [
                {
                    test: /\.scss$/,
                    use:  [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'main.css',
            }),
        ]
    }
];
