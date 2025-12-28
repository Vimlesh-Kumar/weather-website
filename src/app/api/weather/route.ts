import { NextRequest, NextResponse } from 'next/server';
import { geocode, forecast } from '@/utils/weather';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'You must provide an address!' }, { status: 400 });
    }

    try {
        const geo = await geocode(address);
        const weather = await forecast(geo.latitude, geo.longitude);

        return NextResponse.json({
            location: geo.location,
            forecast: weather,
            address,
        });
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message || 'An error occurred' }, { status: 500 });
    }
}
