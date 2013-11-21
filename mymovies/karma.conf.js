module.exports = function(config){
    config.set({

    files : [
      'src/main/webapp/lib/jquery/jquery-1.10.2.js',
      'src/main/webapp/lib/angular/angular.js',
      'src/main/webapp/lib/angular/angular-*.js',
      'src/main/webapp/js/*.js',
      'src/test/js/helper.js'
      ,'src/test/js/step-1.js'
      ,'src/test/js/step-2.js'
//      ,'src/test/js/step-3.js'
//      ,'src/test/js/step-4.js'
    ],

    exclude: ['src/main/webapp/lib/angular/angular-scenario.js'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-coverage',
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    reporters: ['progress', 'coverage', 'junit'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
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
