'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

// Ref: https://github.com/webpack/docs/wiki/configuration#outputpublicpath

build.configureWebpack.setConfig({
  additionalConfiguration: (config) => {
    var webpack = require('webpack');

    // Angular 2 fix, see: https://github.com/angular/angular/issues/10618
    // Remove the Microsoft-provided Uglify plugin
    // If you only want this to happen during a prod build, add the
    // following if statement:
    // if (build.getConfig().production) { ... }
    
    config.plugins.forEach((plugin) => {
      if (plugin instanceof webpack.optimize.UglifyJsPlugin) {
        var index = config.plugins.indexOf(plugin);
        console.log("BGW: Uglify plugin found (index = " + index + "), we will remove it and re-add it later.");
        config.plugins.splice(index, 1);
      }
      /*
        if (plugin instanceof webpack.LoaderOptionsPlugin) {
          var index = config.plugins.indexOf(plugin);
          console.log("BGW: LoaderOptionsPlugin found (index = " + index + "), we will remove it and re-add it later.");
          config.plugins.splice(index, 1);
      }*/
    });

    // Workaround for ng2, see: https://github.com/angular/material2/issues/1335#issuecomment-277157354
    console.log("BGW: Switch-off the html-loader minimization.");
    config.htmlLoader = {
      minimize: false, // workaround for ng2 (only works for Webpack v1!)
    }
    /*
    config.plugins.push(new webpack.LoaderOptionsPlugin({
            options : {
                htmlLoader : {
                    minimize : false
                }
            }
    }));
    */

    // Add our custom config plugin
    console.log("BGW: Switch-off the UglifyJsPlugin mangle.");
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: false,
    }));

    config.devtool = 'eval-source-map';

    config.module.loaders.push([
      { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.html$/, loader: "html-loader?-minimize" }, // workaround for ng2
      //{ test: /\.html$/, loader: "html?interpolate=require&-minimize" }, // workaround for ng2
      // { test: /\.html$/, loader: "html-loader", query: { minimize: false } }, // workaround for ng2
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]}      
    ]);

    return config;
  }
});

build.initialize(gulp);
