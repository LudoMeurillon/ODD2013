module.exports = function(config){
    config.set({

    files : [
      'src/main/webapp/lib/jquery/jquery-1.10.2.js',
      'src/main/webapp/lib/angular/angular.js',
      'src/main/webapp/lib/angular/angular-*.js',
      'src/main/webapp/js/*.js',
      'src/test/js/helper.js',

      //'src/test/js/step-routage.js',
      //'src/test/js/step-scope.js',
      //'src/test/js/step-filter.js',
      //'src/test/js/step-directive.js',
      //'src/test/js/step-tags.js'
    ],

    exclude: ['src/main/webapp/lib/angular/angular-scenario.js'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-coverage',
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    reporters: ['progress', 'coverage', 'junit'],

    preprocessors: {
      'src/main/webapp/js/*.js': ['coverage']
    },


    junitReporter : {
      outputFile: 'target/karma/unit.xml',
      suite: 'unit'
    },

    coverageReporter: {
      type : 'html',
      dir : 'target/karma/coverage/'
    }

})}
