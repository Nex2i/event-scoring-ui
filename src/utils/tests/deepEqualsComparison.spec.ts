import { deepEquals } from '../deepEqualsComparison';

describe('test coreui', function () {
  it('test coreui.deepEquals', function (done) {
    const obj1 = {
      a: 1,
    };
    const obj2 = {
      a: 1,
    };
    const obj3 = {
      b: 1,
    };

    expect(deepEquals(obj1, obj2)).toBe(true);
    expect(deepEquals(obj1, obj3)).toBe(false);
    done();
  });
});
