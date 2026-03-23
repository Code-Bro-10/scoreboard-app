const http = require('http');

const testPost = (path, body) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let resData = '';
      res.on('data', chunk => resData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: resData }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

(async () => {
  try {
    console.log('Testing /api/auth/signup...');
    let res = await testPost('/api/auth/signup', { name: 'Test', email: 'test@example.com', password: 'password123' });
    console.log('Signup Response:', res.status, res.data);

    console.log('Testing /api/auth/login...');
    let loginRes = await testPost('/api/auth/login', { email: 'test@example.com', password: 'password123' });
    console.log('Login Response:', loginRes.status, loginRes.data);
  } catch (err) {
    console.error(err);
  }
})();
