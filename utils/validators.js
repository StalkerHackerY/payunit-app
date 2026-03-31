// Utility functions for input validation

/**
 * Strict validation for Cameroon MTN phone (6XXXXXXXX format)
 * Supports: 6XXXXXXXX, +2376XXXXXXXX
 */
export const validatePhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }

  // Clean phone
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  // Strict MTN format: 6XXXXXXXX or +2376XXXXXXXX  
  const mtnRegex = /^(237)?6[0-9]{8}$/;
  
  if (!mtnRegex.test(cleanPhone)) {
    return { 
      valid: false, 
      error: 'Invalid MTN Cameroon phone. Use strict format: 6XXXXXXXX or +2376XXXXXXXX'
    };
  }

  // Normalize to international format
  const normalized = cleanPhone.startsWith('237') ? cleanPhone : `237${cleanPhone}`;
  return { valid: true, normalized };
};

/**
 * Validate payment amount
 */
export const validateAmount = (amount) => {
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    return { valid: false, error: 'Amount must be a number greater than 0' };
  }

  const numAmount = parseFloat(amount);
  if (numAmount < 100) { // Minimum typical for mobile money
    return { valid: false, error: 'Amount must be at least 100 XAF' };
  }

  return { valid: true, value: numAmount };
};

/**
 * Validate network (MTN or Orange)
 */
export const validateNetwork = (network) => {
  const validNetworks = ['CM_MTNMOMO', 'CM_ORANGE'];
  if (!validNetworks.includes(network)) {
    return { 
      valid: false, 
      error: `Invalid network. Use one of: ${validNetworks.join(', ')}` 
    };
  }
  return { valid: true };
};
