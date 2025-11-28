import { google } from 'googleapis';

export const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/calendar',
];

export function getAuth() {
    // 1. Log checking (for debugging)
    // console.log("Checking Google Creds:", { 
    //   email: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 
    //   key: !!process.env.GOOGLE_PRIVATE_KEY,
    //   sheet: !!process.env.GOOGLE_SHEET_ID
    // });

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        console.error("❌ Missing Google Credentials in .env.local");
        return null; // Return null so we can handle it gracefully
    }

    return new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: SCOPES,
    });
}

export async function getMenuData() {
    const auth = getAuth();

    if (!auth) {
        console.warn("⚠️ No Auth available, returning empty menu.");
        return null;
    }

    const sheets = google.sheets({ version: 'v4', auth });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Menu!A2:D', // Expects: Category, Name, Description, Image
        });

        const rows = response.data.values;
        if (!rows) return {};

        // Transform rows into your Record<string, MenuStation> structure
        const menuStructure: any = {};

        rows.forEach((row) => {
            const [categoryKey, name, description, image] = row;

            // Skip empty rows
            if (!categoryKey || !name) return;

            if (!menuStructure[categoryKey]) {
                menuStructure[categoryKey] = {
                    title: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                    items: []
                };
            }

            menuStructure[categoryKey].items.push({
                name,
                description: description || "",
                image: image || "/placeholder-logo.png"
            });
        });

        return menuStructure;
    } catch (error) {
        console.error('❌ Google Sheets API Error:', error);
        return null;
    }
}