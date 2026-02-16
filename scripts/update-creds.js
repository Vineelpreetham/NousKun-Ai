
const fs = require('fs');
const path = require('path');

const credentialsPath = path.join(process.cwd(), 'credentials.json');
const envPath = path.join(process.cwd(), '.env.local');

try {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    const clientEmail = credentials.client_email;
    const privateKey = credentials.private_key;

    if (!clientEmail || !privateKey) {
        console.error('Invalid credentials file: missing client_email or private_key');
        process.exit(1);
    }

    let envContent = fs.readFileSync(envPath, 'utf8');

    // Regex to replace existing values or append if missing
    const emailRegex = /^GOOGLE_CLIENT_EMAIL=.*$/m;
    const keyRegex = /^GOOGLE_PRIVATE_KEY=.*$/m;

    if (emailRegex.test(envContent)) {
        envContent = envContent.replace(emailRegex, `GOOGLE_CLIENT_EMAIL="${clientEmail}"`);
    } else {
        envContent += `\nGOOGLE_CLIENT_EMAIL="${clientEmail}"`;
    }

    // Escape newlines for .env file
    const escapedKey = privateKey.replace(/\n/g, '\\n');

    if (keyRegex.test(envContent)) {
        envContent = envContent.replace(keyRegex, `GOOGLE_PRIVATE_KEY="${escapedKey}"`);
    } else {
        envContent += `\nGOOGLE_PRIVATE_KEY="${escapedKey}"`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log(`Updated .env.local with email: ${clientEmail}`);

} catch (error) {
    console.error('Error updating credentials:', error);
    process.exit(1);
}
