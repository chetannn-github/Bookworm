export function isPasswordStrong(password) {
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  
    if (strongRegex.test(password) || mediumRegex.test(password)) {
      return true; // Medium or Strong
    } else {
      return false; // Weak
    }
  }
  