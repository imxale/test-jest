const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function uploadReport() {
    const form = new FormData();
    const filePath = './test_results.csv';
    form.append('file', fs.createReadStream(filePath));

    const url = 'https://api.lingo.com/upload';
    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await axios.post(url, form, {
                headers: {
                    ...form.getHeaders(),
                    'Authorization': `Bearer ${process.env.LINGO_API_KEY}`
                }
            });
            console.log('Upload successful:', response.data);
            return; // exit the function on success
        } catch (error) {
            attempt++;
            if (error.code === 'ENOTFOUND') {
                console.error(`DNS resolution error for ${url}: ${error.message}`);
                console.log(`Retrying attempt ${attempt}/${maxRetries}...`);
                await new Promise(res => setTimeout(res, 5000)); // wait for 5 seconds before retrying
            } else {
                console.error('Error uploading report:', error.response ? error.response.data : error.message);
                break; // exit the loop on other errors
            }
        }
    }
    console.error(`Failed to upload report after ${maxRetries} attempts.`);
}

uploadReport();