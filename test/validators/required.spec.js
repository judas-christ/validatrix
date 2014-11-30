describe('require', function() {

    it('invalidates a field with an empty value', function() {
        var form = domUtils.create('<form><input name="requiredField" type="text" data-val="true" data-val-required="Invalid message for required"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('validates a field with a non-empty value', function() {
        var form = domUtils.create('<form><input name="requiredField" type="text" data-val="true" data-val-required="Invalid message for required" value="non-empty"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a field with a non-empty 0 value', function() {
        var form = domUtils.create('<form><input name="requiredField" type="text" data-val="true" data-val-required="Invalid message for required" value="0"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

});
