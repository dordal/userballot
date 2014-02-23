/**
 * File : equal.js
 *
 * This file contains a custom directives for use with angular
 * form validators.
 */

'use strict';

/**
 * equal
 *
 * Determines whether two values are equal or not and validates form
 * accordingly.
 */
userballotApp.directive('equal', function () {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$parsers.unshift(function(viewValue) {

                if(viewValue === scope[attrs.equal]) {
                    ctrl.$setValidity('equal', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('equal', false);
                    return undefined;
                }
            });
        }
    };
});
