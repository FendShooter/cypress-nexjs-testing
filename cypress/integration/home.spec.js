/// <reference types="cypress"/>

describe('some tst', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit('/')
  })
  it('first page', () => {
    const token = 'abc'
    cy.contains('h1', 'Welcome').find('a').should('contain', 'Next.js')
    cy.log('something new')
    cy.get("[src='/vercel.svg']").should('be.visible')
    cy.url().then((value) => cy.log(value))
    cy.then(() => window.localStorage.setItem('__auth__token', token))
    cy.url().should('include', '/')
  })
})
