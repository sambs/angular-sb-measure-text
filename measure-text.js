angular.module('measureText', [])

  .factory('textToHtml', function () {

    function repeat (string, number) {
      for (var i = 0, r = ''; i < number; i++) {
        r += string;
      }
      return r;
    }

    return function (str, newlines) {
      str = str.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;');

      if (newlines) {
        str = str.replace(/\n$/, '<br/>&nbsp;')
          .replace(/\n/g, '<br/>');
      }

      return str.replace(/\s{2,}/g, function (space) {
        return repeat('&nbsp;', space.length - 1) + ' ';
      });
    };
  })

  .factory('measureTextWidth', ['textToHtml', function (textToHtml) {
    var cache = {};

    return function (element) {
      if (!cache[element]) {
        var style = element[0].currentStyle || window.getComputedStyle(element[0], null);
        var sizer = angular.element(document.createElement('div')).css({
          position: 'absolute',
          top: '-10000px',
          left: '-10000px',
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          fontStyle: style.fontStyle,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
          whiteSpace: 'nowrap'
        });
        sizer.attr('class','text-width-measurer');
        angular.element(document.body).append(sizer);
        cache[element] = sizer;
      }
      var str = element.val() || element.text();
      if (element.is('input,textarea,pre')) str = textToHtml(str);
      cache[element].html(str);
      return cache[element].width();
    };
  }])

  .factory('measureTextHeight', ['textToHtml', function (textToHtml) {
    var cache = {};

    return function (element) {

      if (!cache[element]) {
        var style = element[0].currentStyle || window.getComputedStyle(element[0], null);
        var paddingLeft = parseInt(element.css('paddingLeft') || 0, 10);
        var paddingRight = parseInt(element.css('paddingRight') || 0, 10);

        var sizer = angular.element(document.createElement('div')).css({
          position: 'absolute',
          top: '-10000px',
          left: '-10000px',
          width: element[0].offsetWidth - paddingLeft - paddingRight,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          fontStyle: style.fontStyle,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
          lineHeight: element.css('lineHeight'),
          resize: 'none'
        });
        sizer.attr('class','text-height-measurer');
        angular.element(document.body).append(sizer);
        cache[element] = sizer;
      }
      var str = element.val() || element.text();
      if (element.is('input,textarea,pre')) str = textToHtml(str, true);
      cache[element].html(str);
      return cache[element].height();
    };
  }]);

