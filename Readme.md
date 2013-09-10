Measure Text
============

Currently only measures width. 

Usage
-----

    angular.module('tagInput', ['measureText'])

      .directive('tagInput', ['measureTextWidth', function (measureTextWidth) {

        return {
          link: function($scope, $element, attrs) {
            var textWidth = measureTextWidth($element);
          }
        };
      }]);
