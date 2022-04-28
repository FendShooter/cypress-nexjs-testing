/// <reference types="cypress"/>

describe('testing api request', () => {
  it('request', () => {
    cy.visit('/')
    const log = Cypress.log({
      name: 'ABC',
      displayName: 'DEF',
      message: 'Some login',
      autoEnd: false,
    })
    cy.request({
      method: 'GET',
      url: 'http://localhost:3004/movies',
    }).then((request) => {
      expect(request.status).to.eq(200)
      assert.isArray(request.body)
      expect(request.body).length.gt(59)
      expect(request.body[0].title).exist
    })
    log.end()
  })

  it('change response body', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3004/movies',
      },
      {
        body: [],
      }
    ).as('matchUrl')
    cy.visit('/')
    cy.wait('@matchUrl')
  })
  it('change response status', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3004/movies',
      },
      {
        forceNetworkError: true,
      }
    ).as('matchUrl')
    cy.visit('/')
    cy.get('[data-cy=show-error]').should('be.visible')
  })

  it.only('chanh=ge response body dynamically', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3004/movies',
      },
      (res) => {
        res.reply((res) => {
          res.body[0].title = 'hello manilla'
          // console.log(res.headers)
          return res.body
        })
      }
    )

    cy.visit('/')
  })
})
