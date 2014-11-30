describe('regex', function() {

    it('should ignore an empty value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-regex="Invalid message for regex" data-val-regex-pattern="^test$"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('invalidates an invalid non-empty value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-regex="Invalid message for regex" data-val-regex-pattern="^test$" value="0"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(false);
    });

    it('validates a valid non-empty value', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-regex="Invalid message for regex" data-val-regex-pattern="^test$" value="test"></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

    it('validates a valid non-empty value with special characters', function() {
        var form = domUtils.create('<form><input name="field" type="text" data-val="true" data-val-regex="Invalid message for regex" data-val-regex-pattern="^[\\s\\d]+$" value=" 4 33 2 23 324432   23 "></form>')[0];
        var val = validatrix.init(form);
        var field = form.firstChild;
        expect(val.validate(form)).to.equal(true);
    });

});
