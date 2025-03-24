const http = require('http');
const fs = require('fs');

// Configuration
const apiPort = 3000;
const dbPath = './db.json';

// Check if the database file exists and is valid JSON
console.log('Checking database file...');
try {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  try {
    const dbJson = JSON.parse(dbContent);
    console.log('✅ Database file exists and is valid JSON');
    console.log(`Posts: ${dbJson.posts?.length || 0}`);
    console.log(`Tags: ${dbJson.taglist?.length || 0}`);
  } catch (jsonError) {
    console.error('❌ Database file contains invalid JSON:', jsonError.message);
    console.log('First 100 characters of file:', dbContent.substring(0, 100));
  }
} catch (fsError) {
  console.error('❌ Error reading database file:', fsError.message);
}

// Check if the API server is running
console.log('\nChecking if API server is running...');
const req = http.request({
  host: 'localhost',
  port: apiPort,
  path: '/posts',
  method: 'GET',
  timeout: 5000
}, (res) => {
  console.log(`✅ API server is running on port ${apiPort}`);
  console.log(`Response status: ${res.statusCode} ${res.statusMessage}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const posts = JSON.parse(data);
      console.log(`Received ${posts.length} posts from API`);
    } catch (error) {
      console.error('❌ Error parsing API response:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error(`❌ API server is not reachable: ${error.message}`);
  console.log('Make sure json-server is running with: npm run api');
});

req.on('timeout', () => {
  console.error('❌ API request timed out after 5 seconds');
  req.destroy();
});

req.end();

// Final instructions
console.log('\nWhat to try next:');
console.log('1. Run "npm run api" to start the API server');
console.log('2. Visit http://localhost:3000/posts in your browser');
console.log('3. Visit http://localhost:3000/api-test.html for API testing');
console.log('4. Run "npx kill-port 3000" if port 3000 is already in use');
console.log('5. Check for CORS errors in browser console (F12)'); 