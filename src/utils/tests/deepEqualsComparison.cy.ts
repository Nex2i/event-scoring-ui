import { deepEquals } from '../deepEqualsComparison';

describe('deepEquals function', () => {
  it('should correctly compare objects', () => {
    // Test data
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const obj3 = { b: 1 };

    // Wrap the function and run assertions
    cy.wrap(deepEquals(obj1, obj2)).should('eq', true);
    cy.wrap(deepEquals(obj1, obj3)).should('eq', false);
  });
});
