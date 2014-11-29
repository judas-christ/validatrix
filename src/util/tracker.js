//>>excludeStart("exclude", pragmas.exclude);
define([], function(){
    //>>excludeEnd("exclude");

    (function(validatrix) {
        var debugInfo = {};

        function createDebugValidator(key, originalValidator) {
            return function() {
                debugInfo[key]++;
                return originalValidator.apply(null, Array.prototype.slice.call(arguments, 0));
            };
        }

        var originalValidator, debugValidator;
        for(var key in validatrix.validators) {
            if(validatrix.validators.hasOwnProperty(key)) {
                debugInfo[key] = 0;
                validatrix.validators[key] = createDebugValidator(key, validatrix.validators[key]);
            }
        }

        validatrix.debugReport = function() {
            return debugInfo;
        };

    })(window.validatrix);

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
