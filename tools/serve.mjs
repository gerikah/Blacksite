// Optional zero-dependency local preview. The site itself needs no Node or build.
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff2':'font/woff2' };
const server = createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403); res.end('Forbidden'); return; }
    if (pathname.split('/').some(part => part.startsWith('.'))) { res.writeHead(403); res.end('Forbidden'); return; }
    if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
    const stat = statSync(file);
    res.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Content-Length':stat.size, 'Cache-Control':'no-store' });
    if (req.method === 'HEAD') res.end(); else createReadStream(file).pipe(res);
  } catch { res.writeHead(404, { 'Content-Type':'text/plain' }); res.end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`BLACKSITE preview: http://127.0.0.1:${port}`));
server.on('error', err => { console.error(err.message); process.exitCode = 1; });
