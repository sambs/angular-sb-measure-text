angular.module('measureText', [])

  .factory('measureTextWidth', function () {
    var cache = {};

    return function (element) {
      if (!cache[element]){
        var style = element[0].currentStyle || window.getComputedStyle(element[0], null);
        var sizer = $(document.createElement('div')).css({
          position: 'absolute',
          left: '-10000px',
          top: '-10000px',
          display: 'none',
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          fontStyle: style.fontStyle,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
          whiteSpace: 'nowrap'
        });
        sizer.attr('class','text-width-measurer');
        $('body').append(sizer);
        cache[element] = sizer;
      }
      cache[element].text(element.val() || element.text());
      return cache[element].width();
    };
  });
