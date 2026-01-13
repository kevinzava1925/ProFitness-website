#!/usr/bin/env node

/**
 * Script to generate bcrypt hash for admin password
 * Usage: node scripts/generate-password-hash.js <password>
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-password-hash.js <password>');
  console.error('Example: node scripts/generate-password-hash.js mySecurePassword123');
  process.exit(1);
}

if (password.length < 8) {
  console.warn('Warning: Password is less than 8 characters. Consider using a stronger password.');
}

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('\n✅ Password hash generated successfully!\n');
    console.log('Add this to your environment variables:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
    console.log('⚠️  Keep this hash secure and never commit it to version control!\n');
  })
  .catch(error => {
    console.error('Error generating hash:', error);
    process.exit(1);
  });


