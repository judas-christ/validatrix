//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.required = function(element, options) {
      var errorMessage = element.getAttribute('data-val-required');
      return function(value) {
        return Boolean(value) ? void 0 : errorMessage;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
