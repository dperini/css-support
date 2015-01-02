/*
// CSS Selectors Level 3
// Latest: http://www.w3.org/TR/css3-selectors/
// Current: http://www.w3.org/TR/2009/PR-css3-selectors-20091215
*/
CSSTest.selectors = {

  universalSelector: [ '*' ],

  typeSelector: [ 'E' ],

  idSelectors: [ 'E#myid' ],

  classSelectors: [ 'E.warning' ],

  combinators: [
    'E F',
    'E > F',
    'E + F',
    'E ~ F'
  ],

  attributeSelectors: [
    'E[foo]',
    'E[foo="bar"]',
    'E[foo~="bar"]',
    'E[foo^="bar"]',
    'E[foo$="bar"]',
    'E[foo*="bar"]',
    'E[foo|="en"]'
  ],

  structuralPseudosClass: [
    ':root',
    ':empty',
    ':only-child',
    ':last-child',
    ':first-child',
    ':only-of-type',
    ':last-of-type',
    ':first-of-type',
    ':nth-child(n)',
    ':nth-of-type(n)',
    ':nth-last-child(n)',
    ':nth-last-of-type(n)'
  ],

  linkPseudoClass: [
    ':link',
    ':visited'
  ],

  userActionPseudoClass: [
    ':active',
    ':focus',
    ':hover'
  ],

  targetPseudoClass: [ ':target' ],

  langPseudoClass: [ ':lang(en)' ],

  dynamicPseudosClass: [
    ':checked',
    ':disabled',
    ':enabled'
  ],

  negationPseudoClass: [ ':not(E)' ],

  contentPseudoClass: [
    '::after',
    '::before',
    '::first-line',
    '::first-letter',
    '::selection'
  ]

};
