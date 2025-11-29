/**
 * Generate a unique 8-digit alphanumeric code
 * Format: A-Z, 0-9 (uppercase)
 */
const generateAccessCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  
  return code;
};

module.exports = { generateAccessCode };

