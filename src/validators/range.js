//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.range = function(element, options) {
      var maxRange = Number(element.getAttribute('data-val-range-max')||void 0);
      var minRange = Number(element.getAttribute('data-val-range-min')||void 0);
      var errorMessage = element.getAttribute('data-val-range');
      return function(value) {
        var numValue = +value;
        return value && !((numValue >= minRange || !isFinite(minRange)) && (numValue <= maxRange || !isFinite(maxRange))) ? errorMessage : void 0;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
