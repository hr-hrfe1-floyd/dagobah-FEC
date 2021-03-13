module.exports = {
  // This passes the token for the Github API
  // Github API Permission requirements:
  // User - all
  // Admin - read:org
  token: 'YOUR_TOKEN_HERE',
  // Letsencrypt certificate
  certificateKey: '/path/to/privkey.pem',
  certificateChain: '/path/to/fullchain.pem',
  httpPort: 3000,
  httpsPort: 3001
};
