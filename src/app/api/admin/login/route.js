import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { password } = await request.json();

        // In a real app, use environment variables and hashed passwords
        if (password === 'admin123') {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
