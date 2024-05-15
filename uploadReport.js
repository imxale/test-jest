const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function uploadReport() {
    const form = new FormData();
    const filePath = path.resolve(__dirname, 'tests/stress/report/result.jtl');
    form.append('file', fs.createReadStream(filePath));

    try {
        const response = await axios.post('https://api.lingo.com/upload', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${process.env.LINGO_API_KEY}`
            }
        });
        console.log('Upload successful:', response.data);
    } catch (error) {
        console.error('Error uploading report:', error.response ? error.response.data : error.message);
    }
}

uploadReport();