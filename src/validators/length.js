//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.length = function(element, options) {
      var maxLength = Number(element.getAttribute('data-val-length-max')||void 0);
      var minLength = Number(element.getAttribute('data-val-length-min')||void 0);
      var errorMessage = element.getAttribute('data-val-length');
      return function(value) {
        return value && !((value.length >= minLength || !isFinite(minLength)) && (value.length <= maxLength || !isFinite(maxLength))) ? errorMessage : void 0;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
