beforeEach(() => {
  cy.intercept('**/api/**', (req) => {
    const { pathname } = new URL(req.url);

    if (req.method === 'GET' && pathname.endsWith('/ingredients')) {
      req.alias = 'getIngredients';
      req.reply({ fixture: 'ingredients.json' });
      return;
    }

    if (req.method === 'GET' && pathname.endsWith('/auth/user')) {
      req.alias = 'getUser';
      req.reply({ fixture: 'user.json' });
      return;
    }

    if (req.method === 'PATCH' && pathname.endsWith('/auth/user')) {
      req.alias = 'patchUser';
      req.reply({ fixture: 'user.json' });
      return;
    }

    if (req.method === 'POST' && pathname.endsWith('/orders')) {
      req.alias = 'createOrder';
      req.reply({ fixture: 'order.json' });
      return;
    }

    if (req.method === 'GET' && pathname.endsWith('/orders')) {
      req.alias = 'getUserOrders';
      req.reply({ fixture: 'orders.json' });
      return;
    }

    if (req.method === 'GET' && pathname.endsWith('/orders/all')) {
      req.alias = 'getFeedOrders';
      req.reply({ fixture: 'feeds.json' });
      return;
    }

    if (req.method === 'GET' && /\/orders\/\d+$/.test(pathname)) {
      req.alias = 'getOrderByNumber';
      req.reply({ fixture: 'order-by-number.json' });
      return;
    }

    if (req.method === 'POST' && pathname.endsWith('/auth/token')) {
      req.alias = 'refreshToken';
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          accessToken: 'Bearer mock-access-token',
          refreshToken: 'mock-refresh-token'
        }
      });
      return;
    }

    if (req.method === 'POST' && pathname.endsWith('/auth/login')) {
      req.alias = 'login';
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          accessToken: 'Bearer mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            email: 'test@example.com',
            name: 'Test User'
          }
        }
      });
      return;
    }

    if (req.method === 'POST' && pathname.endsWith('/auth/register')) {
      req.alias = 'register';
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          accessToken: 'Bearer mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            email: 'test@example.com',
            name: 'Test User'
          }
        }
      });
      return;
    }

    if (req.method === 'POST' && pathname.endsWith('/auth/logout')) {
      req.alias = 'logout';
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
      return;
    }

    req.reply({
      statusCode: 404,
      body: {
        success: false,
        message: `Error API route: ${req.method} ${pathname}`
      }
    });
  });
});
