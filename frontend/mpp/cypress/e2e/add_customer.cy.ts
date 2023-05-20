/// <reference types="cypress" />

describe('Add Customer', () => {
  it('Successful add', () => {
    // Visit the login page
      cy.visit('http://localhost:5173/')

      cy.get('[data_testid="username"]').type('Andrei3')
      cy.get('[data_testid="password"]').type('Andrei3')

      cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/users/login').as('loginRequest')

      cy.contains('Login').click()

      cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
          if (interception.response != undefined) {
            expect(interception.response.statusCode).to.equal(200) // assuming that a successful login returns a 200 status code
            expect(interception.response.body.token).to.exist // assuming that the login response body contains a token field
          }
          else {
            expect.fail('Login request not intercepted')
          }
      })

      // Verify that the user is redirected to the home page
      cy.url().should('include', '/home')

      // Login successful
      cy.contains('Customer').click()
      cy.get('[data-testid="add_button"]').click()
      cy.get('[data_testid="first_name"').type("Maria")
      cy.get('[data_testid="last_name"').type("Smith")
      cy.get('[data_testid="phone_number"').type("0727779991")
      cy.get('[data_testid="priority"').type("VIP")

      cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/customers').as('addRequest')

      cy.get('[data-testid="add_button"').click()

      cy.wait('@addRequest', { timeout: 10000 }).then((interception) => {
        if (interception.response != undefined) {
          expect(interception.response.statusCode).to.equal(200) // assuming that a successful login returns a 200 status code
        }
        else {
          expect.fail('Add request not intercepted')
        }
    })
  })

})