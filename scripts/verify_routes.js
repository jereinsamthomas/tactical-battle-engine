const routes = [
  '/',
  '/datasets',
  '/scenarios',
  '/knowledge',
  '/laws',
  '/battle',
  '/debate',
  '/analytics',
  '/api/knowledge',
];

async function main() {
  console.log('Testing Tactics OS HTTP endpoints on http://localhost:3000...\n');
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      const text = await res.text();
      console.log(`Route [${r}]: Status ${res.status} OK (${(text.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Route [${r}]: Failed -`, err.message);
    }
  }
}

main();
