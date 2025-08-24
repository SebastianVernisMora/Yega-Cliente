import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock for the login endpoint
  http.post('*/auth/login', async ({ request }) => {
    // Read the request body
    const credentials = await request.json();

    // Check if the credentials are correct
    if (credentials.email === 'test@yega.com' && credentials.password === 'password') {
      // If correct, return a mock token
      return HttpResponse.json({
        token: 'mock-jwt-token-12345',
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@yega.com',
        },
      });
    } else {
      // If incorrect, return an error
      return new HttpResponse(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
    }
  }),
];
