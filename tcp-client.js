const net = require('net');
const readline = require('readline');

const client = net.createConnection({ port: 4000, host: '127.0.0.1' }, () => {
  console.log('Connected to server');
});

client.on('data', (data) => {
  console.log('Received from server:', data.toString());
});

client.on('end', () => {
  console.log('Disconnected from server');
});

client.on('error', (err) => {
  console.error('Client error:', err.message);
});

// 监听命令行输入，实时发送给服务器
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'send> '
});

rl.prompt();

rl.on('line', (line) => {
  client.write(line);
  rl.prompt();
}).on('close', () => {
  client.end();
  console.log('Client closed');
  process.exit(0);
});

