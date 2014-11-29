//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.required = function(element, options) {
      return function(value) {
        return !!value;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
