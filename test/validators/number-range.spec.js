describe('number and range', function() {

    it('invalidates a non-numeric value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-number="Invalid message for number" data-val-range="Invalid message for range" data-val-range-min="10" value="12a"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('invalidates too low non-numeric value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-number="Invalid message for number" data-val-range="Invalid message for range" data-val-range-min="10" value="1"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('validates a valid non-numeric value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-number="Invalid message for number" data-val-range="Invalid message for range" data-val-range-min="10" value="12"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

});
