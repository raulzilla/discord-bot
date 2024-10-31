import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import feedback from "./../../config/feedback.js";

const getComps = async () => {
  try {
    const docId = process.env.DOC_ID
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    });

    const doc = new GoogleSpreadsheet(docId, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = await doc.sheetsByIndex[0].getRows();

    const response = sheet.map(item => {
      const row = item._rawData
      if (row.length > 1) {
        return {
          name: `🗺️ㅤ${row[0]}`,
          value: `${row.slice(1).join(", ")}\n\n`
        }
      }
    }).filter(item => item)

    return response
  } catch (e) {
    console.log(e)
    return feedback.msgError;
  }
};

export default getComps;
