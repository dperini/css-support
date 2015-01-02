this.CSSTest || (this.CSSTest = (function(global) {

	var version = '0.4',

	sheet, style,

	doc = global.document,
	root = doc.documentElement,
	head = root.getElementsByTagName('head')[0] || root,

	impl = doc.implementation ||
		{ hasFeature: function() { return false; } },

	style = doc.createElement("style");
	style.type = 'text/css';

	head.insertBefore(style, head.firstChild);

	sheet = style.sheet || style.styleSheet;

	// removing it crashes IE browsers
	//head.removeChild(style);

	// transform (p)roperty name to Camel Case (fontSize, lineHeight)
	var toCamelCase =
		function(p) {
			if (p == 'float') {
				return 'styleFloat' in root.style ? 'styleFloat' :
					'cssFloat' in root.style ? 'cssFloat' : p;
			}
			return p.replace(/-([a-z])/g,
				function(m, c) {
					return c.toUpperCase();
				}
			);
		};

	return {

		supportAtRule: impl.hasFeature('CSS2', '') ?
			function(rule) {
				if (!(sheet && rule)) return false;
				var result = false;
				try {
					sheet.insertRule(rule, 0);
					result = !(/unknown/i).test(sheet.cssRules[0].cssText);/* &&
						sheet.cssRules[0].cssText.replace(/[\s;\\\x22\x27]/g, '') ==
						rule.replace(/[\s;\\\x22\x27]/g, '');*/
					sheet.deleteRule(sheet.cssRules.length - 1);
				} catch(e) { }
				return result;
			} :
			function(rule) {
				if (!(sheet && rule)) return false;
				sheet.cssText = rule;
				return sheet.cssText.length !== 0 &&
					!(/unknown/i).test(sheet.cssText) &&
					sheet.cssText.replace(/\r+|\n+/g, '').
						indexOf(rule.split(' ')[0]) === 0;
			},

		supportMediaQuery: impl.hasFeature('CSS2', '') ?
			function(media) {
				if (!(sheet && media)) return false;
				var result = false;
				try {
					sheet.insertRule(media, 0);
					result = !(/unknown/i).test(sheet.cssRules[0].cssText);/* &&
						sheet.cssRules[0].cssText.replace(/[\s;\\\x22\x27]/g, '') ==
						media.replace(/[\s;\\\x22\x27]/g, '');*/
					sheet.deleteRule(sheet.cssRules.length - 1);
				} catch(e) { }
				return result;
			} :
			function(media) {
				if (!(sheet && media)) return false;
				sheet.cssText = media;
				return sheet.cssText.length !== 0 &&
					!(/unknown/i).test(sheet.cssText) &&
					sheet.cssText.replace(/\r+|\n+/g, '').
						indexOf(media.split(' ')[0]) === 0;
			},

		supportSelector: impl.hasFeature('CSS2', '') ?
			function(selector) {
				if (!(sheet && selector)) return false;
				try {
					sheet.insertRule(selector + '{ }', 0);
					sheet.deleteRule(sheet.cssRules.length - 1);
				} catch(e) { return false; }
				return true;
			} :
			function(selector) {
				if (!(sheet && selector)) return false;
				sheet.cssText = selector + ' { }';
				return sheet.cssText.length !== 0 &&
					!(/unknown/i).test(sheet.cssText) &&
					sheet.cssText.indexOf(selector) === 0;
			},

		supportProperty: impl.hasFeature('CSS2', '') ?
			function(property, value) {
				if (!property) return false;
				var result = false, prop = toCamelCase(property);
				if (!value && prop in root.style) {
					return typeof root.style[prop] == 'string';
				} else {
					if (!(sheet)) return false;
					try {
						sheet.insertRule('WRONG { ' + property + ': auto; }', 0);
						result = sheet.cssRules[0].cssText.
							match(/{\s*(.*)\s*}/)[1].length !== 0;
						sheet.deleteRule(sheet.cssRules.length - 1);
					} catch(e) { }
				}
				return result;
			} :
			function(property, value) {
				if (!(property && sheet)) return false;
				var name = toCamelCase(property);
				if (value) {
					sheet.addRule('div', property + ': ' + value + ';');
					return sheet.cssText.indexOf(property.toUpperCase()) > - 1;
                }
				return name in root.style &&
					typeof root.style[name] == 'string' ||
					typeof root.style[name] == 'number';
			}

	};

})(this));
