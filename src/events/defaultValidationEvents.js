//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    _defaultOptions.oninvalid = function(element, errorMessage) {
        element.className = element.className.replace(/valid/g, '') + ' invalid';
        document.querySelector('[data-valmsg-for="' + element.name + '"]').innerHTML = errorMessage;
    };

    _defaultOptions.onvalid = function(element) {
        element.className = element.className.replace(/invalid/g, '') + ' valid';
        document.querySelector('[data-valmsg-for="' + element.name + '"]').innerHTML = '';
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
