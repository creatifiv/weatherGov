window.onerror = function(message, source, lineno, colno, error) {
  var errorMessage = "Error caught in window.onerror:"
  errorMessage += `Message: ${message}`;
  errorMesaage += `Source: ${source}`; 
  errorMessage += `Line: ${lineno}`;
  errorMessage += `Column: ${colno}`;
  errorMessage += `Error object: ${error}`:
  alert(errorMessage);
  return true; // Suppress the default error handling
};

