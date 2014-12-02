//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
    //>>excludeEnd("exclude");

    var addEventListenerExists = 'addEventListener' in Element.prototype;

    function addEventListener(element, event, handler) {
        if(addEventListenerExists) {
            element.addEventListener(event, handler, false);
        } else {
            element.attachEvent('on' + event, handler);
        }
    }

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
