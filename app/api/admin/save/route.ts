import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define path to the View Model JSON (Source of Truth for the App currently)
const DATA_PATH = path.join(process.cwd(), 'data', 'farms.view.json');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, updates } = body;

        // 1. Read Current Data
        const rawData = fs.readFileSync(DATA_PATH, 'utf8');
        const farms = JSON.parse(rawData);

        // 2. Find and Update Target Farm
        const farmIndex = farms.findIndex((f: any) => f.id === id);
        if (farmIndex === -1) {
            return NextResponse.json({ error: 'Farm not found' }, { status: 404 });
        }

        // Merge updates
        // We handle simple fields and structured objects
        const updatedFarm = { ...farms[farmIndex], ...updates };

        // Special Handling for nested fields if passed flatly, but for now we expect 'updates' to match schema structure or be processed by client.
        // Let's assume 'updates' contains the full objects for updated sections like 'infoTable', 'sections', 'location'.

        farms[farmIndex] = updatedFarm;

        // 3. Write Back to File
        fs.writeFileSync(DATA_PATH, JSON.stringify(farms, null, 2));

        return NextResponse.json({ success: true, farm: updatedFarm });
    } catch (e) {
        console.error("Save Error:", e);
        return NextResponse.json({ error: 'Failed to save', details: String(e) }, { status: 500 });
    }
}
