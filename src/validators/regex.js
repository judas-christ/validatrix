//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.regex = function(element, options, overridePattern) {
      //overridePattern is used to create quick and dirty validators for length etc that can easily be expressed as regexes
      var pattern = overridePattern || element.getAttribute('data-val-regex-pattern');
      var regex = new RegExp(pattern);
      return function(value) {
        return regex.test(value);
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
