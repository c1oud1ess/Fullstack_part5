describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'sb2',
      name: 'mike greenl',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('login form can be opened', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sb2')
      cy.get('#password').type('123456')
      cy.get('#login').click()
      cy.get('.notification')
        .should('contain', 'Welcome mike green')
      cy.contains('Welcome mike green')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sbsb')
      cy.get('#password').type('1234')
      cy.get('#login').click()
      cy.get('.errornotification')
        .should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'Welcome mike green')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('sb2')
      cy.get('#password').type('123456')
      cy.get('#login').click()
      cy.wait(2000)
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title-input').type('text')
      cy.get('#author-input').type('poro lube')
      cy.get('#url-input').type('http://abcde')
      cy.get('#create-blog').click()
      cy.get('.notification')
        .should('contain', 'New blog "text" by poro lube added')
    })
  })

  describe('with blogs', function () {
    beforeEach(function () {
      cy.get('#username').type('sb2')
      cy.get('#password').type('123456')
      cy.get('#login').click()
      cy.wait(2000)
      cy.contains('new note').click()
      cy.get('#title-input').type('text')
      cy.get('#author-input').type('poro lube')
      cy.get('#url-input').type('http://abcde')
      cy.get('#create-blog').click()
    })


    it('blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('Likes 0')
      cy.get('#like-button').click()
      cy.get('.notification')
        .should('contain', 'like blog successfully')
      cy.contains('Likes 1')
      cy.contains('Likes 0').should('not.exist')
    })

    it('blog can be deleted by owner', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.notification')
        .should('contain', 'remove blog successfully')
      cy.contains('text poro lube').should('not.exist')
    })

    it('only blog owner can see delete button', function () {
      const user = {
        username: 'sb3',
        name: 'bbke graaan',
        password: '654321'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.contains('logout').click()
      cy.get('#username').type('sb3')
      cy.get('#password').type('654321')
      cy.get('#login').click()
      cy.wait(2000)
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

  })

})