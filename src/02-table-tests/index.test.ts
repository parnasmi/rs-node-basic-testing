// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 20, b: 4, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: '1', b: 2, action: Action.Add, expected: null }, // invalid a
  { a: 1, b: 2, action: '%', expected: null }, // invalid action
];

describe('simpleCalculator - table tests', () => {
  test.each(testCases)(
    'returns $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
