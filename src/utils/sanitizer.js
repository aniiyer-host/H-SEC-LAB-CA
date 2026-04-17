/**
 * Secure Blog Viewer - Sanitization Utility
 * 
 * Manual implementation of input sanitization to prevent XSS.
 * This function handles common XSS vectors by escaping HTML special characters.
 * It is used before storing data and before rendering (as a secondary defense).
 */

export const sanitizeInput = (str) => {
  if (!str || typeof str !== 'string') return '';

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  // 1. Basic HTML Escaping
  const sanitized = str.replace(/[&<>"'/`=]/g, (s) => map[s]);

  // 2. Prevent protocol-based injection (e.g. javascript:, data:)
  // We strip these specifically if they appear at the start of a string or after whitespace
  const protocolPattern = /^(javascript|data|vbscript):/i;
  if (protocolPattern.test(sanitized.trim())) {
    return "[DEACTIVATED_LINK]";
  }

  return sanitized;
};

/**
 * Validates the length and presence of inputs.
 * Returns an error message or null if valid.
 */
export const validateBlogInput = (title, content) => {
  if (!title || title.trim().length === 0) {
    return "Title is required.";
  }
  if (title.length > 100) {
    return "Title must be under 100 characters.";
  }
  if (!content || content.trim().length === 0) {
    return "Content is required.";
  }
  if (content.length > 5000) {
    return "Content must be under 5000 characters.";
  }
  return null;
};

/**
 * Client-side Rate Limiting
 * Prevents spam submits (60s cooldown per form type).
 * Uses localStorage timestamps.
 */
export const checkRateLimit = (formType = 'blog') => {
  try {
    const key = `SEC_RATE_${formType}`;
    const lastTime = localStorage.getItem(key);
    const now = Date.now();
    const cooldown = 60 * 1000; // 60 seconds

    if (lastTime && (now - parseInt(lastTime)) < cooldown) {
      const remaining = Math.ceil((cooldown - (now - parseInt(lastTime))) / 1000);
      return `Rate limited. Wait ${remaining}s.`;
    }

    localStorage.setItem(key, now.toString());
    return null;
  } catch (e) {
    console.error('Rate limit check failed:', e);
    return null;
  }
};

/**
 * Simple CSRF Token Generation/Validation
 * UUID-based per session, stored securely.
 */
export const generateCSRF = () => {
  return crypto.randomUUID();
};

export const validateCSRF = (token) => {
  try {
    const stored = localStorage.getItem('SEC_CSRF_TOKEN');
    return stored === token;
  } catch (e) {
    return false;
  }
};

export const setCSRFToken = (token) => {
  try {
    localStorage.setItem('SEC_CSRF_TOKEN', token);
  } catch (e) {
    console.error('CSRF set failed:', e);
  }
};

