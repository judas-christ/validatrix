//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.number = function(element, options) {
      //TODO: localize . or ,?
      var errorMessage = element.getAttribute('data-val-number');
      return function(value) {
        return value && !isFinite(+value) ? errorMessage : void 0;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");

