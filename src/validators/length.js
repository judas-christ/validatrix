//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.length = function(element, options) {
      var maxLength = element.getAttribute('data-val-length-max');
      var minLength = element.getAttribute('data-val-length-min');
      return function(value) {
        return value && value.length >= minLength && value.length <= maxLength;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
