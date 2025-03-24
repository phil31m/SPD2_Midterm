const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './public',
  noCors: false
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

// Add custom middleware before router
server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

server.use(router);

// Start server
const port = 3000;
server.listen(port, () => {
  console.log('JSON Server is running');
  console.log(`API available at http://localhost:${port}`);
  console.log(`API test page: http://localhost:${port}/api-test.html`);
  console.log('Database contents:');
  try {
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    console.log(`Posts: ${db.posts.length}`);
    console.log(`Tags: ${db.taglist.length}`);
  } catch (err) {
    console.error('Error reading database:', err);
  }
}); 