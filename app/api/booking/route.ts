import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getAuth } from '@/lib/google';

export async function GET(req: NextRequest) {
    const auth = getAuth();
    if (!auth) return NextResponse.json({ error: 'Server Auth Missing' }, { status: 500 });

    const calendar = google.calendar({ version: 'v3', auth });

    const now = new Date();
    const threeMonthsOut = new Date();
    threeMonthsOut.setMonth(now.getMonth() + 3);

    try {
        const response = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            timeMin: now.toISOString(),
            timeMax: threeMonthsOut.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items || [];

        // UPDATED LOGIC: Return full YYYY-MM-DD date strings
        const bookedDates = events
            .map(event => {
                // Support both all-day events (date) and timed events (dateTime)
                const start = event.start?.date || event.start?.dateTime;
                if (!start) return null;

                // Return just the date part YYYY-MM-DD
                // Note: This uses the date string directly to avoid timezone shifting issues
                return new Date(start).toISOString().split('T')[0];
            })
            .filter(Boolean);

        return NextResponse.json({ bookedDates });
    } catch (error) {
        console.error("❌ Calendar Fetch Error:", error);
        return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { date, eventType, guestCount, timeSlot, venue, contactName, contactEmail, contactPhone, specialRequests } = body;

    const auth = getAuth();
    if (!auth) return NextResponse.json({ error: 'Server Auth Missing' }, { status: 500 });

    const sheets = google.sheets({ version: 'v4', auth });
    const calendar = google.calendar({ version: 'v3', auth });

    try {
        // 1. Add to Google Sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'BOOKING!A:I',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[
                    new Date().toISOString(),
                    date,
                    eventType,
                    guestCount,
                    timeSlot,
                    venue,
                    contactName,
                    contactEmail,
                    contactPhone,
                    specialRequests
                ]],
            },
        });

        // 2. Add to Google Calendar
        const eventDate = new Date(date);
        let startHour = 9;
        if (timeSlot === 'afternoon') startHour = 12;
        if (timeSlot === 'evening') startHour = 17;

        eventDate.setHours(startHour, 0, 0);
        const endDate = new Date(eventDate);
        endDate.setHours(startHour + 3, 0, 0);

        await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            requestBody: {
                summary: `RegAl Event: ${eventType} - ${contactName}`,
                description: `Guests: ${guestCount}\nVenue: ${venue}\nPhone: ${contactPhone}\nNote: ${specialRequests}`,
                location: venue,
                start: { dateTime: eventDate.toISOString() },
                end: { dateTime: endDate.toISOString() },
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("❌ Booking Error:", error);
        return NextResponse.json({ error: error.message || 'Booking failed' }, { status: 500 });
    }
}