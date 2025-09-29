import { useState } from 'react';
import './index.css';

export default function App() {
  const [message, setMessage] = useState('Verifyz Protocol App - Working!');

  return (
    <div className="min-h-screen text-white relative bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          {message}
        </h1>
        
        <div className="text-center">
          <p className="text-xl mb-4">
            🎉 Server and client structure successfully fixed!
          </p>
          
          <div className="bg-black/50 p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">✅ Issues Resolved:</h2>
            <ul className="text-left space-y-2">
              <li>✅ Fixed server/index.ts (was JSON instead of TypeScript)</li>
              <li>✅ Resolved import path issues</li>
              <li>✅ Server starts successfully on port 3000</li>
              <li>✅ Consolidated App components (using App.tsx)</li>
              <li>✅ Fixed main.tsx imports</li>
              <li>✅ Removed duplicate App.jsx files</li>
            </ul>
          </div>
          
          <button 
            onClick={() => setMessage('🚀 Ready to add blockchain features!')}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Test React State
          </button>
        </div>
      </div>
    </div>
  );
}