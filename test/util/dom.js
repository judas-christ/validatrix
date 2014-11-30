//dom utils for test
var domUtils = {
    create: function(elementString) {
        var wrap = document.createElement('div');
        wrap.innerHTML = elementString;
        return Array.prototype.slice.call(wrap.children, 0);
    }
};
