// User ID Generator Utility
// Generates unique IDs for students and faculties

export function generateStudentUserId(): string {
  // Format: STU + 6 digits (e.g., STU001234)
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `STU${randomNum}`;
}

export function generateFacultyUserId(): string {
  // Format: FAC + 5 digits (e.g., FAC00123)
  const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `FAC${randomNum}`;
}

export function generateAdminUserId(): string {
  // Format: ADM + 4 digits (e.g., ADM0001)
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ADM${randomNum}`;
}

export function generatePassword(length: number = 12): string {
  // Generate a random password with uppercase, lowercase, numbers, and symbols
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  let password = '';
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function isValidUserIdFormat(userId: string): boolean {
  // Check if it matches expected format
  return /^(STU|FAC|ADM)\d+$/.test(userId);
}
