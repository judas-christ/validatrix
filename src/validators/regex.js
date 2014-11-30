//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.regex = function(element, options, overridePattern, overrideMessage) {
      //overridePattern and overrideMessage is used to create quick and dirty validators for length etc that can easily be expressed as regexes
      var pattern = overridePattern || element.getAttribute('data-val-regex-pattern');
      var regex = new RegExp(pattern);
      var errorMessage = overrideMessage || element.getAttribute('data-val-regex');
      return function(value) {
        return value && !regex.test(value) ? errorMessage : void 0;
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
