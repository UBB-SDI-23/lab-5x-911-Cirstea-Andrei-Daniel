import { InputLabel } from '@mui/material';
/// <reference types="cypress" />

describe('Login', () => {
  it('Logs in successfully', () => {
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
  })

  it('Log in failed', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/')

    cy.get('[data_testid="username"]').type('Andrei3')
    cy.get('[data_testid="password"]').type('Andrei2')

    cy.intercept('POST', 'https://sdi-2023-car-dealership.crabdance.com/api/users/login').as('loginRequest')

    cy.contains('Login').click()

    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
      if (interception.response != undefined) {
        expect(interception.response.statusCode).to.equal(400) // assuming that a successful login returns a 200 status code
      }
      else {
        expect.fail('Login request not intercepted')
      }
  })

    cy.contains('Failure')
    cy.contains('Invalid password for username Andrei3')
  })
})