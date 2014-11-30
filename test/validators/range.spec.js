describe('range', function() {

    it('should ignore an empty value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="100" data-val-range-max="1000"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('invalidates a too low value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="100" data-val-range-max="1000" value="99"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('invalidates a too negative low value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="100" data-val-range-max="1000" value="-1"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('invalidates a too high value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="100" data-val-range-max="1000" value="1001"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('validates a valid low value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="100" data-val-range-max="1000" value="100"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid high value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="100" data-val-range-max="1000" value="1000"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid 0 value ', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="-10" data-val-range-max="10" value="0"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid negative value ', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="-10" data-val-range-max="10" value="-1"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid value with only minimum limit', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-min="9" value="100000"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid value with only maximum limit', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-range="Invalid message for range" data-val-range-max="9" value="1"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

});
