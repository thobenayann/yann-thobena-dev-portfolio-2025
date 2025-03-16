import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const authToken = request.cookies.get('authToken');

        if (authToken?.value === 'authenticated') {
            return NextResponse.json({ authenticated: true });
        } else {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch (error) {
        console.error('Error in check-auth route:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
