import { sendOTPEmail } from './Configurations/emailServices.js'; // Adjust the path as needed

// Define the email and OTP
const testEmail = 'omdesai2112@gmail.com'; // Replace with the recipient's email
const testOTP = '123456'; // Replace with a test OTP

// Send OTP email
sendOTPEmail(testEmail, testOTP)
    .then(() => {
        console.log('OTP email sent successfully.');
    })
    .catch((error) => {
        console.error('Failed to send OTP email:', error);
    });
