
alert("hi gsng");

window.onerror = function(message, source, lineno, colno, error) {
  var errorMessage = "Error caught in window.onerror: ";
  errorMessage += `Message: ${message} `;
  errorMessage += `Source: ${source} `;
  errorMessage += `Line: ${lineno} `;
  errorMessage += `Column: ${colno} `;
  errorMessage += `Error object: ${error}`;

  try {
    alert(errorMessage);  // Display error message in an alert
  } catch (error) {
    alert("Error occurred while trying to show the error message: " + error.message);
  }

  return true;  // Suppress the default error handling
};