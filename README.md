Validatrix
==========

A simple replacement for ASP.NET MVC unobtrusive validation without dependencies on other frameworks.

## Usage

Although it is quite possible to just download the minified script from the dist folder of this repo, Validatrix is designed to be custom built for each project. Hence, it is recommended you clone the repo, add the development version of validatrix (validatrix.dev.js) to your project and then remove the components you are not using from the `build/production.js` file and build your own version.

Once you have included the script on your page, initialize Validatrix like this:

```js
var validator = validatrix.init(formToValidate, {
    oninvalid: fieldInvalidHandler,
    onvalid: fieldValidHandler
});

formToValidate.onsubmit = function(e) {
    if(!validator.validate(e.target || e.srcElement)) {
        e.preventDefault();
    }
};

```

Like jQuery unobtrusive validation, Validatrix looks at `data-val-*` attributes, finds the corresponding validator and hooks it up.

## Compatibility

Validatrix requires `querySelector` so Internet Explorer 8 and up plus modern browsers should all work.

## Extending

### Event handlers

Validatrix comes with default handlers for invalid and valid fields, but you are encouraged to roll your own that do exactly what you want. There are two possibilities here; either build them similarly to `events/defaultValidationEvents.js` or attach them on a case by case basis using the `oninvalid`/`onvalid` options:

```js
var validator = validatrix.init(form, {
    oninvalid: customInvalidHandler,
    onvalid: customValidHandler
});
```

#### oninvalid(element, errorMessage)

* `element` (HTMLElement) the invalid element
* `errorMessage` (String) the error message to display

#### onvalid(element)

* `element` (HTMLElement) the valid element

### Custom validators

Validatrix comes with a very limited number of validators per default. This is by design to keep it small and lean, but it means you may have to write your own validators. Luckily, that isn't very complicated. Create a new file in `src/validators`, add this and change the name of the validator:

```js
//>>excludeStart("exclude", pragmas.exclude);
define(['validatrix'], function(){
//>>excludeEnd("exclude");

    validatrix.validators.myvalidator = function(element, options) {
      var errorMessage = element.getAttribute('data-val-myvalidator');
      return function(value) {
        return (errorMessage if value is invalid, undefined otherwise);
      };
    };

//>>excludeStart("exclude", pragmas.exclude);
});
//>>excludeEnd("exclude");
```

You can now validate fields with a `data-val-myvalidator="Invalid message for myvalidator"` attribute.

#### Regular expression-based custom validators

If your custom validator is easy to express as a regular expression, you can call the regex validator with an override pattern:

```js
validatrix.validators.myvalidator = function(element, options) {
  var errorMessage = element.getAttribute('data-val-myvalidator');
  return validatrix.validators.regex(element, options, 'myvalidator(?: pattern)?', errorMessage);
};
```
