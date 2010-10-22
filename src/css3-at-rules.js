/*
// CSS3 module: Syntax (4.6 At-rules etc...)
// Latest: http://www.w3.org/TR/css3-syntax/
// Current: http://www.w3.org/TR/2003/WD-css3-syntax-20030813/
*/
var rules = {

  atRules: (function() {
    var items = [ ];
    // @charset will not work on IE
    // if set in using inline style
    items.push('@charset "utf-8";');
    items.push('@charset "latin1";');
    items.push('@charset "iso-8859-15";');
    items.push('@font-face { src: local("Helvetica"); }');
    items.push('@font-face { src: url("data:font/opentype,"); }');
    // added conditionally, crashes IE6
    if (!document.createEventObject) {
      items.push('@import url("data:text/css,body { color: inherit; }");');
      items.push('@import url("data:text/css,@charset \'Windows-1251\';");');
    }
    items.push('@media all { body { color: inherit; } }');
    items.push('@media print { body { color: inherit; } }');
    items.push('@media screen { body { color: inherit; } }');
    items.push('@media not screen { body { color: inherit; } }');
    items.push('@media not screen and (color) { body { color: inherit; } }');
    items.push('@media print, projection, screen { body { color: inherit; } }');
    items.push('@media screen and (orientation: portrait) { body { color: inherit; } }');
	items.push('@namespace svg url(http://www.w3.org/2000/svg);');
    items.push('@page { size: landscape; }');
    return items;
  })()

};
