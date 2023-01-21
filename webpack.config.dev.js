const path = require('path'); //ayuda a traer el elemento path
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


/*
Si queremos añadir el autocompletado para nuestro archivo 
de webpack, podemos añadir el siguiente código 
antes del module.exports
*/

/** @type {import('webpack').Configuration} */
module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    // EL NOMBRE DEL ARCHIVO FINAL,
    assetModuleFilename: 'assets/images/[hash][ext][query]'

    },
    mode: 'development',
    watch: true,
    resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    alias: {
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@templates': path.resolve(__dirname, 'src/templates/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },

    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.js$/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use: {
                    loader: "babel-loader"
                },
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/
            },
            {
                test: /\.(css|styl)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ],
            },
            {
                test: /\.png/, // REGLA PARA ACEPTAR IMAGENES .PNG
                type: "asset/resource"
            },
            {
            test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
                use: {
                    loader: 'url-loader', // NOMBRE DEL LOADER
                    options: {
                        limit: false, // O LE PASAMOS UN NUMERO
                        // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'aplication/font-woff',
                        // Especifica el tipo MIME con el que se alineará el archivo. 
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[contenthash].[ext]",
                        // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                        // ubuntu-regularhola.woff
                        outputPath: './assets/fonts/', 
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: '../assets/fonts/',
                        // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        esModule: false
                    }
                }
            }
        ]
    },
    // SECCION DE PLUGINS
    plugins: [
        new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
                }
            ]
        }),
        new Dotenv()
    ],
}