window.onerror = function(message, source, lineno, colno, error) {
  var errorMessage = "Error caught in window.onerror:"
  errorMessage += `Message: ${message}`;
  errorMessage += `Source: ${source}`; 
  errorMessage += `Line: ${lineno}`;
  errorMessage += `Column: ${colno}`;
  errorMessage += `Error object: ${error}`:
  try{alert(errorMessage);}
catch(error){ alert(error.message)}
  return true; // Suppress the default error handling
};

