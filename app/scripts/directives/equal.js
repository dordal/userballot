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
 *
 * http://stackoverflow.com/a/18014975
 */
userballotApp.directive('equal', function () {
    return {
        restrict: 'A',
		require: '?ngModel',
        link: function(scope, elm, attrs, ngModel) {
			if (!ngModel) return;
			
			// watch own value and re-validate on change
			scope.$watch(attrs.ngModel, function() {
				validate();
			});

			// observe the other value and re-validate on change
			attrs.$observe('equal', function (val) {
				validate();
			});

			var validate = function() {
				// values
				var val1 = ngModel.$viewValue;
				var val2 = attrs.equal;

				// set validity
				ngModel.$setValidity('mismatch', val1 == val2);
			};
        }
    };
});
