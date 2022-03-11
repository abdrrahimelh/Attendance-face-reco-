const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:8888' : 'https://your_deployment.server.com';
console.log(server);