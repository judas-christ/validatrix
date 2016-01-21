/*! validatrix - v0.0.2 */
(function(window, undefined){

    var _defaultOptions = {
        validateAll: false,
        validateOnChange: true,
        oninvalid: void 0,
        onvalid: void 0
    };

    var _validators = {};
    var _validatorRegex = /^data-val-([a-z]+)$/;
    var validatrix = {
        validators: _validators,
        init: init
    };

    function Validatrix(root, options) {
        var _myOptions = {};
        for(var opt in _defaultOptions) {
            if(options && options.hasOwnProperty(opt)) {
                _myOptions[opt] = options[opt];
            } else if(_defaultOptions.hasOwnProperty(opt)) {
                _myOptions[opt] = _defaultOptions[opt];
            }
        }
        this.options = _myOptions;

        var elementsToValidate = root.querySelectorAll('[data-val=true]');
        for(var i=elementsToValidate.length;i--;) {
            initElement(elementsToValidate[i], _myOptions);
        }
    }

    Validatrix.prototype = {
        validate: validateForm
    };

    function initElement(element, options) {
        //check if this element has been setup already
        if(element.validatrix) return;

        element.validatrix = [];
        var attr, valName, handlerAdded = false;

        function changeHandler(event) {
            event = event || window.event;
            validateElement(event.target || event.srcElement, options);
        };;

        for(var i=element.attributes.length;i--;) {
            attr = element.attributes[i];
            valName = _validatorRegex.exec(attr.name);
            if(valName) {
                valName = valName[1];
                if(valName in _validators) {
                    element.validatrix.push(_validators[valName](element, options));
                    if(!handlerAdded) {
                        element.form.noValidate = true;
                        addEventListener(element, 'change', changeHandler);
                        handlerAdded = true;
                    }
                }
                else {
                    if(window.console) {
                        console.error('No validator found with name "' + valName + '"');
                    }
                }
            }
        }
    }

    function init(root, options) {
        if(typeof root === 'object' && !(root instanceof Element)) {
            options = root;
            root = undefined;
        }
        return new Validatrix(root||document, options);
    }

    function validateForm(form) {
        var formIsValid = true;
        var elements = form.querySelectorAll('[data-val=true]');
        for(var i=0,l=elements.length;i<l;i++) {
            if(validateElement(elements[i], this.options) === false) {
                formIsValid = false;
                if(!this.options.validateAll) {
                    break;
                }
            }
        }
        return formIsValid;
    }

    function validateElement(element, options) {
        var errorMessage;
        if(element.validatrix && element.validatrix.length) {
            for(var valI=0,valL=element.validatrix.length;valI<valL;valI++) {
                errorMessage = element.validatrix[valI](element.value);
                if(errorMessage) {
                    if(options.oninvalid && typeof options.oninvalid === 'function') {
                        options.oninvalid(element, errorMessage);
                    }
                    break;
                }
            }
            if(!errorMessage && options.onvalid && typeof options.onvalid === 'function') {
                options.onvalid(element);
            }
        }
        return !errorMessage;
    }

    window.validatrix = validatrix;



    var addEventListenerExists = 'addEventListener' in Element.prototype;

    function addEventListener(element, event, handler) {
        if(addEventListenerExists) {
            element.addEventListener(event, handler, false);
        } else {
            element.attachEvent('on' + event, handler);
        }
    }



    validatrix.validators.required = function(element, options) {
      var errorMessage = element.getAttribute('data-val-required');
      return function(value) {
        return Boolean(value) ? void 0 : errorMessage;
      };
    };



    validatrix.validators.regex = function(element, options, overridePattern, overrideMessage) {
      //overridePattern and overrideMessage is used to create quick and dirty validators for length etc that can easily be expressed as regexes
      var pattern = overridePattern || element.getAttribute('data-val-regex-pattern');
      var regex = new RegExp(pattern);
      var errorMessage = overrideMessage || element.getAttribute('data-val-regex');
      return function(value) {
        return value && !regex.test(value) ? errorMessage : void 0;
      };
    };



    validatrix.validators.length = function(element, options) {
      var maxLength = Number(element.getAttribute('data-val-length-max')||void 0);
      var minLength = Number(element.getAttribute('data-val-length-min')||void 0);
      var errorMessage = element.getAttribute('data-val-length');
      return function(value) {
        return value && !((value.length >= minLength || !isFinite(minLength)) && (value.length <= maxLength || !isFinite(maxLength))) ? errorMessage : void 0;
      };
    };



    validatrix.validators.number = function(element, options) {
      //TODO: localize . or ,?
      var errorMessage = element.getAttribute('data-val-number');
      return function(value) {
        return value && !isFinite(+value) ? errorMessage : void 0;
      };
    };




    validatrix.validators.range = function(element, options) {
      var maxRange = Number(element.getAttribute('data-val-range-max')||void 0);
      var minRange = Number(element.getAttribute('data-val-range-min')||void 0);
      var errorMessage = element.getAttribute('data-val-range');
      return function(value) {
        var numValue = +value;
        return value && !((numValue >= minRange || !isFinite(minRange)) && (numValue <= maxRange || !isFinite(maxRange))) ? errorMessage : void 0;
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