/// <reference types="cypress"/>

// cypress best pratices

describe(
  'best pratices',
  {
    env: {
      valWidth: 260,
    },
  },
  () => {
    it('taking snapshot of the DOM', () => {
      cy.viewport(Cypress.env('valWidth'), 800)
      cy.visit('/')
      const log = Cypress.log({
        name: 'simple',
        displayName: 'double simple',
        autoEnd: false,
      })
      // cy.clearLocalStorage()
      cy.title().should('contain', 'Next App')
      log.snapshot('before')
      cy.window().then((win) => console.log(win.innerWidth))
      cy.get('[src="/vercel.svg"]').should('be.visible')
      log.snapshot('after')
      log.end()
    })
  }
)
