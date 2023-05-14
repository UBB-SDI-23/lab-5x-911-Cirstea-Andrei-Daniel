/// <reference types="cypress" />

describe('Login', () => {
    it('Logs in successfully', () => {
      // Visit the login page
      cy.visit('/login')
  
      // Fill in the username and password fields
      cy.get('input[name="username"]').type('myusername')
      cy.get('input[name="password"]').type('mypassword')
  
      // Intercept the login request
      cy.intercept('POST', '/api/login').as('loginRequest')
  
      // Click the login button
      cy.get('button[type="submit"]').click()
  
      // Wait for the login request to complete
      cy.wait('@loginRequest').then((xhr) => {
        // Verify the request was successful
        expect(xhr.response.status).to.equal(200)
  
        // Verify the response contains a JWT token
        expect(xhr.response.body.token).to.exist
      })
  
      // Verify that the user is redirected to the home page
      cy.url().should('include', '/home')
    })
  })