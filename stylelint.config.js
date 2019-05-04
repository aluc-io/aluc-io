module.exports = {
  rules: {
    "shorthand-property-no-redundant-values": null,

    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "unit-no-unknown": true,
    "property-no-unknown": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "no-empty-source": true,
    "no-extra-semicolons": true,
    "function-url-no-scheme-relative": true,
    "declaration-no-important": true,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "no-duplicate-selectors": null,
    "declaration-block-no-duplicate-properties": null,
    "no-descending-specificity": null,
  }
}
