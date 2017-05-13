'use strict';

describe('numeric', function () {

  const warn = getWarnFn('Numeric operation with non-numeric value: {x} * {y}');
  let f;

  describe('vars', function () {
    before(() => f = getFn('x * y'));
    it('warns for (number, string)', () => warn(f, 1, '1'));
    it('warns for (number, boolean)', () => warn(f, 1, true));
    it('warns for (number, null)', () => warn(f, 1, null));
    it('warns for (number, undefined)', () => warn(f, 1, undefined));
    it('warns for (number, array)', () => warn(f, 1, [1]));
    it('warns for (number, object)', () => warn(f, 1, {x: 1}));
    it('warns for (number, NaN)', () => warn(f, 1, NaN));
    it('warns for (number, +Infinity)', () => warn(f, 1, 1/0));
    it('warns for (number, -Infinity)', () => warn(f, 1, -1/0));
    it('warns for (+Infinity, +Infinity)', () => warn(f, 1/0, 1/0));
    it('warns for (+Infinity, -Infinity)', () => warn(f, 1/0, -1/0));
    it('warns for (string, string)', () => warn(f, '1', '1'));
    it('warns for (string, String)', () => warn(f, '1', new String('1')));
    it('does not warn for (number, number)', () => doesNotWarn(f, 1, 1));
    it('does not warn for (number, Number)', () => doesNotWarn(f, 1, new Number(1)));
  });

  describe('3 operands', function () {
    before(() => f = getFn('x * 2 - y'));
    it('warns for (number, string)', () => {
      warn(f, 1, '1', 'Numeric operation with non-numeric value: 2 (number) - "1" (string)');
    });
    it('does not warn for (number, literal, number)', () => {
      doesNotWarn(f, 1, 1);
    });
  });

  describe('explicit values', function () {
    it('should not transform (number, number)', function () {
      f = getFn(`1 * 2`);
      assert.include(f.toString(), '1 * 2');
    });
    it('should not transform (number, number, number)', function () {
      f = getFn(`1 * 2 / 3`);
      assert.include(f.toString(), '1 * 2 / 3');
    });
  });

  describe('should keep result', function () {
    it('minus', function () {
      const f = getFn('x - y');
      assert.equal(f(2, 3), -1);
    });

    it('multiply', function () {
      const f = getFn('x * y');
      assert.equal(f(2, 3), 6);
    });

    it('divide', function () {
      const f = getFn('x / y');
      assert.equal(f(6, 3), 2);
    });

    it('remainder', function () {
      const f = getFn('x % y');
      assert.equal(f(3, 2), 1);
    });

    it('minus & multiply', function () {
      const f = getFn('x - y * 3');
      assert.equal(f(4, 2), -2);
    });

    it('minus (with brackets) & multiply', function () {
      const f = getFn('(x - y) * 3');
      assert.equal(f(4, 2), 6);
    });

    it('multiply & minus', function () {
      const f = getFn('x * 3 - y');
      assert.equal(f(3, 2), 7);
    });

    it('multiply & minus (with brackets)', function () {
      const f = getFn('x * (3 - y)');
      assert.equal(f(3, 2), 3);
    });
  });
});
