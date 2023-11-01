const fs = require('fs');
const axios = require('axios');
const papaparse = require('papaparse');
require('dotenv').config();

const inputMessagesFilePath = './csv/jumper-default-checkout-template-messages.csv';
const inputButtonsFilePath = './csv/jumper-default-checkout-template-buttons.csv';
const outputMessagesFilePath = './csv/messages-transrated.csv';
const outputButtonsFilePath = './csv/buttons-transrated.csv';
const deepLApiKey = process.env.DEEPL_API_KEY;

if (!deepLApiKey) {
  console.error('Please set your DeepL API key in the .env file.');
  process.exit(1);
}

async function translateText(text) {
  try {
    const response = await axios.post(`https://api-free.deepl.com/v2/translate`, null, {
      params: {
        auth_key: deepLApiKey,
        text: text,
        target_lang: 'JA', // Japanese
      },
    });

    return response.data.translations[0].text;
  } catch (error) {
    console.error('Error during translation:', error);
    return text; // Return original text in case of an error
  }
}

async function translateMessage() {
  const fileContent = fs.readFileSync(inputMessagesFilePath, 'utf8');
  const parsedCSV = papaparse.parse(fileContent, { header: true });

  for (const row of parsedCSV.data) {
    if (row.message) {
      const translatedMessage = await translateText(row.message);
      row['Translated message'] = translatedMessage;
    }
  }

  const outputCSV = papaparse.unparse(parsedCSV.data);
  fs.writeFileSync(outputMessagesFilePath, outputCSV);
  console.log('Message translation completed and file saved to:', outputMessagesFilePath);
}

async function translateButton() {
  const fileContent = fs.readFileSync(inputButtonsFilePath, 'utf8');
  const parsedCSV = papaparse.parse(fileContent, { header: true });

  for (const row of parsedCSV.data) {
    if (row.Title) {
      const translatedTitle = await translateText(row.Title);
      row['Translated Title'] = translatedTitle;
    }
    if (row['Sub Title']) {
      const translatedSubTitle = await translateText(row['Sub Title']);
      row['Translated Sub Title'] = translatedSubTitle;
    }
  }

  const outputCSV = papaparse.unparse(parsedCSV.data);
  fs.writeFileSync(outputButtonsFilePath, outputCSV);
  console.log('Button title translation completed and file saved to:', outputButtonsFilePath);
}

(async () => {
  console.log('Starting message translation...');
  await translateMessage();
  console.log('Starting button title translation...');
  await translateButton();
})();