//>>excludeStart("exclude", pragmas.exclude);
define([], function(){
    //>>excludeEnd("exclude");

    var _options = {
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
        for(var opt in _options) {
            if(options && options.hasOwnProperty(opt)) {
                _myOptions[opt] = options[opt];
            } else if(_options.hasOwnProperty(opt)) {
                _myOptions[opt] = _options[opt];
            }
        }
        this.options = _myOptions;

        var elementsToValidate = root.querySelectorAll('[data-val=true]');
        for(var i=elementsToValidate.length;i--;) {
            initElement(elementsToValidate[i], _myOptions);
        }
        // var form;
        // for(var i=window.document.forms.length;i--;) {
        //     form = window.document.forms[i];
        //     form.addEventListener('submit', submitHandler, false);
        // }
    }

    Validatrix.prototype = {
        validate: validateForm
    };

    function initElement(element, options) {
        //check if this element has been setup already
        if(element.validatrix) return;

        element.validatrix = [];
        var attr, valName, handlerAdded = false;
        for(var i=element.attributes.length;i--;) {
            attr = element.attributes[i];
            valName = _validatorRegex.exec(attr.name);
            if(valName) {
                valName = valName[1];
                if(valName in _validators) {
                    element.validatrix.push(_validators[valName](element, options));
                    if(!handlerAdded) {
                        element.form.noValidate = true;
                        element.addEventListener('change', function(event) {
                            validateElement(event.target || event.srcElement, options);
                        }, false);
                        handlerAdded = true;
                    }
                } else {
                    if(window.console) {
                        console.error('No validator found with name "' + valName + '"');
                    }
                }
            }
        }
    }

    function init(root, options) {
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

    // function submitHandler(event) {
    //     var form = event.target || event.srcElement;
    //     if(!validateForm(form)) event.preventDefault();
    // };

    window.validatrix = validatrix;

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
