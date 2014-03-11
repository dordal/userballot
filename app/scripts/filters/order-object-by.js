/**
 * File : order-object-by.js
 *
 * This file contains a custom filter for use with angular
 */
 
 /**
 * orderObjectBy
 *
 * Orders an array of objects by a specified object property
 *
 * http://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/
 */
 
 userballotApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field]);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
