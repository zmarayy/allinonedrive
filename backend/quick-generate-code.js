// Quick script to generate an access code
// Run with: node quick-generate-code.js

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let code = '';
for (let i = 0; i < 8; i++) {
  code += chars[Math.floor(Math.random() * chars.length)];
}

console.log('\n✅ ACCESS CODE GENERATED');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📦 Package: Ultimate Pro');
console.log('📧 Email: test@allinonedrive.com');
console.log('🔑 Access Code:', code);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n📝 To add this to Firestore:');
console.log('1. Go to Firebase Console > Firestore Database');
console.log('2. Add a new document in the "codes" collection');
console.log('3. Set these fields:');
console.log('   - code: "' + code + '"');
console.log('   - email: "test@allinonedrive.com"');
console.log('   - package: "ultimate_pro"');
console.log('   - createdAt: (current timestamp)');
console.log('\nOr use the API endpoint:');
console.log('POST http://localhost:5000/api/generate-code');
console.log('Body: {"email":"test@allinonedrive.com","package":"ultimate_pro"}');
console.log('\n');
