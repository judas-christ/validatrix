//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.number = function(element, options) {
      //TODO: localize . or ,?
      return function(value) {
        return !value || isFinite(+value);
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");

