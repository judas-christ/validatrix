describe('length', function() {

    it('should ignore an empty value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-min="3" data-val-length-max="6"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('invalidates a too short value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-min="3" data-val-length-max="6" value="a"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('invalidates a too long value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-min="3" data-val-length-max="6" value="toolong"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('validates a valid length value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-min="3" data-val-length-max="6" value="ok!"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid length value 2', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-min="3" data-val-length-max="6" value="ok too"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid minimum length value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-min="3" value="ok too"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid maximum length value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-length="Invalid message for length" data-val-length-max="6" value="ok too"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

});
