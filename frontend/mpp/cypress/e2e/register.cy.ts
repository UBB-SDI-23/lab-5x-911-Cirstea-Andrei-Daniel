/// <reference types="cypress" />

describe('Register', () => {
  it('Register successfully', () => {
    // Visit the login page
      cy.visit('http://localhost:5173/')
      cy.contains('Register').click()

      const uuid = Cypress._.random(10, 10000)
      cy.url().should('include', '/register')

      cy.get('[data_testid="username"]').type('Andrei' + uuid)
      cy.get('[data_testid="password"]').type('Andrei' + uuid)
      cy.get('[data_testid="email"]').type('andrei@gmail.com')

      cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/register').as('registerRequest')

      cy.contains('Register').click()

      cy.wait('@registerRequest', { timeout: 10000 }).then((interception) => {
          if (interception.response != undefined) {
            expect(interception.response.statusCode).to.equal(200) // assuming that a successful login returns a 200 status code
          }
          else {
            expect.fail('Register request not intercepted')
          }
      })

      cy.contains('Confirm').click()

      cy.url().should('include', '/home')
      cy.contains('Logged in as Andrei' + uuid + ' with role Regular')
  })
  it('Register failed', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/')
    cy.contains('Register').click()

    cy.url().should('include', '/register')

    const uuid = Cypress._.random(10, 10000)
    cy.get('[data_testid="username"]').type('Andrei' + uuid)
    cy.get('[data_testid="password"]').type('a')
    cy.get('[data_testid="email"]').type('andrei@gmail.com')

    cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/register').as('registerRequest')

    cy.contains('Register').click()

    cy.wait('@registerRequest', { timeout: 10000 }).then((interception) => {
        if (interception.response != undefined) {
          expect(interception.response.statusCode).to.equal(400) // assuming that a successful login returns a 200 status code
        }
        else {
          expect.fail('Register request not intercepted')
        }
    })

    cy.contains('Failure')
    cy.contains('Invalid password: a')
  })
})