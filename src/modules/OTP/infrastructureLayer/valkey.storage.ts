const Redis = require('ioredis');

// Connect to ElastiCache cluster
const valkey = new Redis({
  host: 'otpservice-3cxxsn.serverless.use1.cache.amazonaws.com',
  port: 6379,
  tls: {}, // Required for ElastiCache Serverless (Encryption in Transit is enabled by default)
  // password: 'your-auth-token', // Uncomment if you set an Auth Token
});

valkey.on('connect', () => {
  console.log('Connected to ElastiCache (Valkey)');
  // Test the connection by setting and getting a key
  valkey.set('test_key', 'Hello, ElastiCache!', 'EX', 60, (err, result) => {
    if (err) {
      console.error('Error setting key:', err);
      return;
    }
    console.log('Set key result:', result);
    valkey.get('test_key', (err, value) => {
      if (err) {
        console.error('Error getting key:', err);
        return;
      }
      console.log('Get key value:', value);
      // Disconnect after testing
      valkey.quit();
    });
  });
});

valkey.on('error', (err) => {
  console.error('ElastiCache Error:', err);
});