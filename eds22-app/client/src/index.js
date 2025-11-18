// Debug mode activated - extensive logging
console.log('🔍 [DEBUG] Starting index.js execution');

try {
  console.log('🔍 [DEBUG] Step 1: Attempting to import React');
  const React = require('react');
  console.log('✅ [DEBUG] Step 1: React imported successfully');

  console.log('🔍 [DEBUG] Step 2: Attempting to import ReactDOM');
  const ReactDOM = require('react-dom/client');
  console.log('✅ [DEBUG] Step 2: ReactDOM imported successfully');

  console.log('🔍 [DEBUG] Step 3: Attempting to import global styles');
  require('./styles/globals.css');
  console.log('✅ [DEBUG] Step 3: Global styles imported successfully');

  console.log('🔍 [DEBUG] Step 4: Attempting to import App component');
  const App = require('./App').default;
  console.log('✅ [DEBUG] Step 4: App component imported successfully');

  console.log('🔍 [DEBUG] Step 5: Checking for root element');
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found in DOM');
  }
  console.log('✅ [DEBUG] Step 5: Root element found:', rootElement);

  console.log('🔍 [DEBUG] Step 6: Creating React root');
  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ [DEBUG] Step 6: React root created successfully');

  console.log('🔍 [DEBUG] Step 7: Attempting to render App');
  root.render(
    React.createElement(React.StrictMode, null,
      React.createElement(App, null)
    )
  );
  console.log('✅ [DEBUG] Step 7: App rendered successfully');
  console.log('🎉 [DEBUG] All steps completed - React should be mounted!');

} catch (error) {
  console.error('❌ [DEBUG] Fatal error during React initialization:', error);
  console.error('❌ [DEBUG] Error stack:', error.stack);
  
  // Display error on page
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: monospace; background: #ff0000; color: white;">
      <h1>React Initialization Error</h1>
      <p><strong>Message:</strong> ${error.message}</p>
      <p><strong>Stack:</strong></p>
      <pre style="background: #000; padding: 10px; overflow: auto;">${error.stack}</pre>
      <p>Check browser console for detailed logs.</p>
    </div>
  `;
}
