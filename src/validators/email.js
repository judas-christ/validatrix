//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix', 'validators/regex'], function(){
    //>>excludeEnd("exclude");

    validatrix.validators.email = function(element, options) {
      var errorMessage = element.getAttribute('data-val-email');
      return validatrix.validators.regex(element, options, '\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*', errorMessage);
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
