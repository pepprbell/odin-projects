const capitalize = require('./capitalize')
describe('capitalize', () => {
  test('case 1', () => {
    expect(capitalize('capitalize')).toBe('Capitalize');
  })
  
  test('case 2 - blank', () => {
    expect(capitalize(' capitalize')).toBe('Capitalize');
  })
  
  test('case 3 - number', () => {
    expect(capitalize('1apitalize')).toBe('1apitalize');
  })
});

const reverseString = require('./reverseString')
describe('reverse string', () => {
  test('case 1', () => {
    expect(reverseString('123456789')).toBe('987654321');
  })
  
  test('case 2', () => {
    expect(reverseString('1212')).toBe('2121');
  })
});

const calculator = require('./calculator')
describe('calculator', () => {
  test('case 1 - add', () => {
    expect(calculator.add(1,2)).toBe(3);
  })
  
  test('case 2 - subtract', () => {
    expect(calculator.subtract(5,2)).toBe(3);
  })

  test('case 3 - divide', () => {
    expect(calculator.divide(6,2)).toBe(3);
  })

  test('case 4 - zero division', () => {
    expect(calculator.divide(6,0)).toBe(null);
  })

  test('case 5 - multiply', () => {
    expect(calculator.multiply(-3,1)).toBe(-3);
  })
});

const caesarCipher = require('./caesarCipher')
describe('caesar cipher', () => {
  test('case 1 - non-alphabet', () => {
    expect(caesarCipher('caesar/ cipher.',22)).toBe('ywaown/ yeldan.');
  })
  test('case 2 - z to a', () => {
    expect(caesarCipher('zookeeper',15)).toBe('oddzttetg');
  })
  test('case 3 - aAaAaA', () => {
    expect(caesarCipher('cAeSaR',8)).toBe('kImAiZ');
  })
})

const analyzeArray = require('./analyzeArray')
describe('analyze array', () => {
  test('case 1', () => {
    expect(analyzeArray([1,2,3,4,5,6,7])).toMatchObject({
      average: 4,
      min: 1,
      max: 7,
      length: 7
    });
  })

  test('case 2', () => {
    expect(analyzeArray([-1,0,1])).toMatchObject({
      average: 0,
      min: -1,
      max: 1,
      length: 3
    });
  })
})