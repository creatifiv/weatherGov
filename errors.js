// Set up the global error handler at the top of the file
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Error caught in window.onerror:");
  console.error(`Message: ${message}`);
  console.error(`Source: ${source}`);
  console.error(`Line: ${lineno}`);
  console.error(`Column: ${colno}`);
  console.error(`Error object: ${error}`);
  return true; // Suppress the default error handling
};

// Your other script code follows...