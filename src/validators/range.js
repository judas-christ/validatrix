//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.range = function(element, options) {
      var maxRange = element.getAttribute('data-val-range-max');
      var minRange = element.getAttribute('data-val-range-min');
      return function(value) {
        var numValue = +value;
        return value && numValue >= minRange && numValue <= maxRange;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
