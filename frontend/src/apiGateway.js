let apiGateway = 'https://188goo.com';

if (process.env.NODE_ENV === 'development') {
  apiGateway = 'http://localhost:8000';
}

export const API_GATEWAY = apiGateway;
