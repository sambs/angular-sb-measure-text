Measure Text
============

jQuery is required as jqLite elements don't have size methods.

Usage
-----

    angular.module('tagInput', ['measureText'])

      .directive('tagInput', ['measureTextWidth', function (measureTextWidth) {

        return {
          link: function(scope, elem, attrs) {
            var textWidth = measureTextWidth(elem);
            // do something with this new found knowledge...
          }
        };
      }]);
