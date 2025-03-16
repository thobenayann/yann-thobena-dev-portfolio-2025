import { newsletterSchema } from '@/schemas/newsletter.schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate the request body using Zod
        const result = newsletterSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const { email } = result.data;

        // Check if required environment variables are set
        if (
            !process.env.MAILCHIMP_API_KEY ||
            !process.env.MAILCHIMP_AUDIENCE_ID ||
            !process.env.MAILCHIMP_API_SERVER
        ) {
            console.error('Missing required Mailchimp environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const apiKey = process.env.MAILCHIMP_API_KEY;
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        const apiServer = process.env.MAILCHIMP_API_SERVER;

        const url = `https://${apiServer}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(
                    `anystring:${apiKey}`
                ).toString('base64')}`,
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed',
            }),
        });

        const responseData = await response.json();

        // Handle existing subscribers
        if (response.status === 400 && responseData.title === 'Member Exists') {
            return NextResponse.json(
                { message: 'You are already subscribed to this newsletter' },
                { status: 200 }
            );
        }

        if (!response.ok) {
            console.error('Mailchimp API error:', responseData);
            return NextResponse.json(
                { error: responseData.detail || 'Failed to subscribe' },
                { status: response.status }
            );
        }

        return NextResponse.json(
            { message: 'Successfully subscribed to the newsletter' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
