describe('validatrix', function() {


    it('is invalid when a field is invalid', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-required="Invalid message for required"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('calls oninvalid with element and error message', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-required="Invalid message for required"></form>')[0];
        var oninvalidCalled = false;
        var oninvalidElement, oninvalidMessage;
        var val = validatrix.init(form, { oninvalid: function(el, msg) { oninvalidCalled = true; oninvalidElement = el; oninvalidMessage = msg; } });
        var field = form.firstChild;
        val.validate(form);
        expect(oninvalidCalled).to.equal(true);
        expect(oninvalidElement).to.equal(field);
        expect(oninvalidMessage).to.equal('Invalid message for required');
    });

    it('calls onvalid with element', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-required="Invalid message for required" value="valid value"></form>')[0];
        var onvalidCalled = false;
        var onvalidElement;
        var val = validatrix.init(form, { onvalid: function(el) { onvalidCalled = true; onvalidElement = el; } });
        var field = form.firstChild;
        val.validate(form);
        expect(onvalidCalled).to.equal(true);
        expect(onvalidElement).to.equal(field);
    });


});
