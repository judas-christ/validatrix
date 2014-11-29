/*! validatrix - v0.0.0 */
(function(window, undefined){

    var _options = {
        validateAll: false,
        validateOnChange: true
    };

    var _validators = {};
    var _validatorRegex = /^data-val-([a-z]+)$/;
    var validatrix = {
        validators: _validators,
        init: init
    };

    function initElement(element, options) {
        //check if this element has been setup already
        if(element.validatrix) return;

        element.validatrix = [];
        //TODO: how to get all data-val attributes?
        var attr, valName, handlerAdded = false;
        for(var i=element.attributes.length;i--;) {
            attr = element.attributes[i];
            valName = _validatorRegex.exec(attr.name);
            if(valName) {
                valName = valName[1];
                if(valName in _validators) {
                    element.validatrix.push(_validators[valName](element, options));
                    if(!handlerAdded) {
                        element.addEventListener('change', function(event) {
                            var inputElement = event.target || event.srcElement;
                            runValidations(inputElement);
                        }, false);
                        handlerAdded = true;
                    }
                } else {
                    window.console&&console.error('No validator found with name "' + valName + '"');
                }
            }
        }
    }

    function init(root) {
        var elementsToValidate = root.querySelectorAll('[data-val=true]');
        for(var i=elementsToValidate.length;i--;) {
            initElement(elementsToValidate[i], _options);
        }
        var form;
        for(var i=window.document.forms.length;i--;) {
            form = window.document.forms[i];
            form.addEventListener('submit', submitHandler, false);
        }
    }

    function runValidations(element) {
        var isValid;
        if(element.validatrix && element.validatrix.length) {
            for(var valI=0,valL=element.validatrix.length;valI<valL;valI++) {
                isValid = element.validatrix[valI](element.value);
                if(!isValid) {
                    //TODO: show error message
                    element.className = 'invalid';
                    break;
                }
            }
            if(isValid) {
                element.className = 'valid';
            }
        }
        console.log(element.name, isValid);
        return isValid;
    }

    function submitHandler(event) {
        var form = event.target || event.srcElement;
        var formIsValid = true;
        var isValid;
        for(var i=0,l=form.elements.length;i<l;i++) {
            isValid = runValidations(form.elements[i]);
            if(isValid === false) {
                formIsValid = false;
                if(!_options.validateAll) {
                    break;
                }
            }
        }
        if(!formIsValid) event.preventDefault();
    };

    window.validatrix = validatrix;



    validatrix.validators.required = function(element, options) {
      return function(value) {
        return !!value;
      };
    };



    validatrix.validators.regex = function(element, options, overridePattern) {
      //overridePattern is used to create quick and dirty validators for length etc that can easily be expressed as regexes
      var pattern = overridePattern || element.getAttribute('data-val-regex-pattern');
      var regex = new RegExp(pattern);
      return function(value) {
        return regex.test(value);
      };
    };



    validatrix.validators.length = function(element, options) {
      var maxLength = element.getAttribute('data-val-length-max');
      var minLength = element.getAttribute('data-val-length-min');
      return function(value) {
        return value && value.length >= minLength && value.length <= maxLength;
      };
    };



    validatrix.validators.number = function(element, options) {
      //TODO: localize . or ,?
      return function(value) {
        return !value || isFinite(+value);
      };
    };




    validatrix.validators.range = function(element, options) {
      var maxRange = element.getAttribute('data-val-range-max');
      var minRange = element.getAttribute('data-val-range-min');
      return function(value) {
        var numValue = +value;
        return value && numValue >= minRange && numValue <= maxRange;
      };
    };




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


})(this);