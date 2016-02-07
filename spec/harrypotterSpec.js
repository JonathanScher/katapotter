var sut = require('../harrypotter.js')

describe("testBasics", function() {
  it("costs 0 when no book", function() {
    expect(sut.price([])).toBe(0);
  });

  it("has no price reduction", function() {
    expect(sut.price([0])).toBe(8);
    expect(sut.price([1])).toBe(8);
    expect(sut.price([2])).toBe(8);
    expect(sut.price([3])).toBe(8);
    expect(sut.price([4])).toBe(8);
    expect(sut.price([0, 0])).toBe(8 * 2);
    expect(sut.price([1, 1, 1])).toBe(8 * 3);
  });

  it("has a simple discount", function() {
    expect(sut.price([0, 1])).toBe(8 * 2 * 0.95);
    expect(sut.price([0, 2, 4])).toBe(8 * 3 * 0.9);
    expect(sut.price([0, 1, 2, 4])).toBe(8 * 4 * 0.8);
    expect(sut.price([0, 1, 2, 3, 4])).toBe(8 * 5 * 0.75);
    expect(sut.price([4])).toBe(8);
    expect(sut.price([0, 0])).toBe(8 * 2);
    expect(sut.price([1, 1, 1])).toBe(8 * 3);
  });

  it("has several discounts", function() {
    expect(sut.price([0, 0, 1])).toBe(8 + (8 * 2 * 0.95));
    expect(sut.price([0, 0, 1, 1])).toBe(2 * (8 * 2 * 0.95));
    expect(sut.price([0, 0, 1, 2, 2, 3])).toBe((8 * 4 * 0.8) + (8 * 2 * 0.95));
    expect(sut.price([0, 1, 1, 2, 3, 4])).toBe(8 + (8 * 5 * 0.75));
  });

  it("tests edge cases", function() {
    expect(sut.price([0, 0, 1, 1, 2, 2, 3, 4])).toBe(2 * (8 * 4 * 0.8));
    expect(sut.price([0, 0, 0, 0, 0, 
           1, 1, 1, 1, 1, 
           2, 2, 2, 2, 
           3, 3, 3, 3, 3, 
           4, 4, 4, 4])).toBe(3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8));
  });
});

describe("convertInto5Uplet", function(){
	it("returns [0,0,0,0,0] if empty", function() {
		expect(sut.convertInto5Uplet([])).toEqual([0,0,0,0,0]);
	});
	it("returns [1,0,0,0,0] if [0]", function() {
		expect(sut.convertInto5Uplet([0])).toEqual([1,0,0,0,0]);
	});
	it("returns [0,3,0,2,0] if [1,3,1,3,1]", function() {
		expect(sut.convertInto5Uplet([1,3,1,3,1])).toEqual([0,3,0,2,0]);
	});
});
