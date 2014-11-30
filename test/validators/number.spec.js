describe('number', function() {

    it('should ignore an empty value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-number="Invalid message for number"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('invalidates an non-numeric value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-number="Invalid message for number" value="12a"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('validates a numeric value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-number="Invalid message for number" value="12"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

});
