describe('template spec', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      username: 'mean mouse',
      name: 'Aughust',
      password: 'mean_password',
    };

    const user2 = {
      username: 'kind mouse',
      name: 'Aughust',
      password: 'kind_password',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3000/');
  });

  it('Login form is shown', () => {
    cy.get('#username-input');
    cy.get('#password-input');
    cy.get('#logIn');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      // cy.request('POST', 'http://localhost:3003/api/login', {
      //   username: 'mean mouse',
      //   password: 'mean_password',
      // }).then((response) =>
      //   localStorage.setItem('loggedUser', JSON.stringify(response.body))
      // );
      cy.get('#username-input').type('mean mouse');
      cy.get('#password-input').type('mean_password');
      cy.get('#logIn').click();

      cy.get('#logOut');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username-input').type('random mouse');
      cy.get('#password-input').type('random_password');
      cy.get('#logIn').click();

      cy.get('.error').contains('wrong username or password');
    });
  });

  describe('logged in', () => {
    beforeEach(() => {
      cy.get('#username-input').type('mean mouse');
      cy.get('#password-input').type('mean_password');
      cy.get('#logIn').click();
    });

    it('a blog can be created', () => {
      cy.get('.create-blog-button').click();

      cy.get('.title').type('How to make cats tidy up');
      cy.get('.author').type('Einshten');
      cy.get('.url').type('http:www.cats.com');

      cy.get('.submit-button').click();

      cy.get('.blog');
    });

    it('user who have created the blog can delete it', () => {
      cy.get('.create-blog-button').click();

      cy.get('.title').type('How to make cats tidy up');
      cy.get('.author').type('Einshten');
      cy.get('.url').type('http:www.cats.com');

      cy.get('.submit-button').click();

      cy.get('.show-details-button').click();

      cy.get('.delete-button').click();

      cy.get('html').should('not.contain', 'How to make cats tidy up');
    });

    it('only user who have created the blog can see the delete button', () => {
      cy.get('.create-blog-button').click();

      cy.get('.title').type('How to make cats tidy up');
      cy.get('.author').type('Einshten');
      cy.get('.url').type('http:www.cats.com');

      cy.get('.submit-button').click();

      cy.get('.show-details-button').click();
      cy.get('.blog').should('contain', 'delete');

      cy.get('#logOut').click();

      cy.get('#username-input').type('kind mouse');
      cy.get('#password-input').type('kind_password');
      cy.get('#logIn').click();

      cy.get('.show-details-button').click();

      cy.get('.blog').should('not.contain', '.delete-button');
    });

    it('the blogs are ordered according to likes', () => {
      cy.get('.create-blog-button').click();
      cy.get('.title').type('How to make cats tidy up');
      cy.get('.author').type('Einshten');
      cy.get('.url').type('http:www.cats.com');
      cy.get('.submit-button').click();

      cy.get('.create-blog-button').click();
      cy.get('.title').type('Storac');
      cy.get('.author').type('Stringson');
      cy.get('.url').type('http:w23ldsa.com');
      cy.get('.submit-button').click();

      cy.contains('How to make cats tidy up').parent().as('catsBlog');

      cy.get('@catsBlog').find('.show-details-button').click();

      cy.get('@catsBlog').find('.like-button').click();

      cy.get('.blog')
        .eq(0)
        .should('contain', 'How to make cats tidy up Einshten');

      cy.get('.blog').contains('Storac').parent().as('storacBlog');

      cy.get('@storacBlog').find('.show-details-button').click();

      cy.get('@storacBlog').find('.like-button').click();

      cy.wait(1000);

      cy.get('@storacBlog').find('.like-button').click();

      cy.get('.blog').eq(0).should('contain', 'Storac');
    });
  });
});
