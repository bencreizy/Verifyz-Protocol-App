{
  "name": "verifyz-app",
  "version": "1.0.0",
  "description": "Verifyz Protocol App - Proof of Presence platform",
  "main": "server/index.ts",
  "type": "module",
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "vite build",
    "start": "tsx server/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["verifyz", "protocol", "crypto", "presence", "app"],
  "author": "Jason Emerick",
  "license": "ISC",
  "dependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "express": "^4.18.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^5.0.12"
  },
  "devDependencies": {
    "tsx": "^3.12.7",
    "typescript": "^5.3.3"
  }
}
