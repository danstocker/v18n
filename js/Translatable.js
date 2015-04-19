/*global dessert, troop, sntls, v18n */
troop.postpone(v18n, 'Translatable', function () {
    "use strict";

    var base = troop.Base,
        self = base.extend();

    /**
     * @name v18n.Translatable.create
     * @function
     * @param {string} originalText
     * @returns {v18n.Translatable}
     */

    /**
     * Represents a string, that might manifest in different languages depending on the current locale.
     * TODO: Store count & replacements.
     * @class
     * @extends troop.Base
     * @extends v18n.Stringifiable
     */
    v18n.Translatable = self
        .addMethods(/** @lends v18n.Translatable# */{
            /**
             * @param {string} originalString
             * @ignore
             */
            init: function (originalString) {
                /**
                 * Original string associated with the translatable.
                 * This will be used as the key when looking up translations.
                 * @type {string}
                 */
                this.originalString = originalString;
            },

            /**
             * Converts Translatable to a string, according to the current locale.
             * @returns {string}
             */
            toString: function () {
                var originalString = this.originalString,
                    currentLocaleKey = v18n.Locale.currentLocaleKey,
                    locale = v18n.Locale.create(currentLocaleKey);
                return locale.getTranslation(originalString) || originalString;
            }
        });
});

(function () {
    "use strict";

    troop.Properties.addProperties.call(
        String.prototype,
        /** @lends String# */{
            /**
             * Converts string to a translatable.
             * @returns {v18n.Translatable}
             */
            toTranslatable: function () {
                return v18n.Translatable.create(this.valueOf());
            }
        },
        false, false, false);
}());
