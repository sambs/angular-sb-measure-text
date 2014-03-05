sbMeasureText
=============

Provides two services, `sbMeasureTextWidth` and `sbMeasureTextHeight` and a filter `textToHtml`.

jQuery is required as jqLite elements don't have size methods.

Usage
-----

    angular.module('myModule', ['sbMeasureText'])

      .directive('myDirective', ['sbMeasureTextWidth', function (measureTextWidth) {

        return {
          link: function(scope, elem, attrs) {
            var textWidth = measureTextWidth(elem);
            // do something with this new found knowledge...
          }
        };
      }]);

ToDo
----

Tests - what do we compare the result to?

License
-------

Licensed under the MIT License
