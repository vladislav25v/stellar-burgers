const BUN_ID = 'bun_1';
const MAIN_ID = 'main_1';
const MAIN_NAME = 'Test Main';
const ORDER_NUMBER = '12345';

const addIngredientById = (id: string) => {
  cy.get(`[data-cy="ingredient-card-${id}"]`).find('button').click();
};

describe('Burger constructor page', () => {
  describe('Ingredients and modal behavior', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('adds ingredient from list into constructor', () => {
      addIngredientById(BUN_ID);
      addIngredientById(MAIN_ID);

      cy.get(`[data-cy="constructor-ingredient-${MAIN_ID}"]`).should('exist');
      cy.get('[data-cy="constructor-empty-bun-top"]').should('not.exist');
      cy.get('[data-cy="constructor-empty-bun-bottom"]').should('not.exist');
    });

    it('opens and closes ingredient modal with correct ingredient data', () => {
      cy.get(`[data-cy="ingredient-link-${MAIN_ID}"]`).click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="ingredient-details"]').should('be.visible');
      cy.get('[data-cy="ingredient-name"]').should('have.text', MAIN_NAME);

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Order creation flow', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();

      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('refreshToken', 'mock-refresh-token');
          win.document.cookie =
            'accessToken=Bearer%20mock-access-token; path=/';
        }
      });
      cy.wait('@getIngredients');
      cy.wait('@getUser');
    });

    afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('creates an order, shows correct order number, then clears constructor', () => {
      addIngredientById(BUN_ID);
      addIngredientById(MAIN_ID);

      cy.get('[data-cy="burger-constructor"]').find('button').last().click();

      cy.wait('@createOrder')
        .its('request.body')
        .should('deep.equal', { ingredients: [BUN_ID, MAIN_ID, BUN_ID] });

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain.text', ORDER_NUMBER);

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-empty-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-empty-bun-bottom"]').should('exist');
      cy.get('[data-cy="constructor-empty-ingredients"]').should('exist');
    });
  });
});
