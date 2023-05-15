/// <reference types="cypress" />

describe('Register', () => {
  it('Register successfully', () => {
    // Visit the login page
      cy.visit('http://localhost:5173/')
      cy.contains('Register').click()

      cy.url().should('include', '/register')

      cy.get('[data_testid="username"]').type('Andrei4')
      cy.get('[data_testid="password"]').type('Andrei4')
      cy.get('[data_testid="email"]').type('andrei@gmail.com')

      cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/register').as('registerRequest')

      cy.contains('Register').click()

      cy.wait('@registerRequest', { timeout: 10000 }).then((interception) => {
          if (interception.response != undefined) {
            expect(interception.response.statusCode).to.equal(200) // assuming that a successful login returns a 200 status code
            expect(interception.response.body.token).to.exist // assuming that the login response body contains a token field
          }
          else {
            expect.fail('Login request not intercepted')
          }
      })

      cy.contains('Confirm').click()

      // cy.get('[data_testid="username"]').type('Andrei3')
      // cy.get('[data_testid="password"]').type('Andrei3')

      // cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/users/login').as('loginRequest')

      // cy.contains('Login').click()

      // cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
      //     if (interception.response != undefined) {
      //       expect(interception.response.statusCode).to.equal(200) // assuming that a successful login returns a 200 status code
      //       expect(interception.response.body.token).to.exist // assuming that the login response body contains a token field
      //     }
      //     else {
      //       expect.fail('Login request not intercepted')
      //     }
      // })

      // // Verify that the user is redirected to the home page
      // cy.url().should('include', '/home')
  })
})