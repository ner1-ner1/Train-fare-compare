import { NextResponse } from 'next/server';
import { calculateRouteCost } from '@/src/core/calculator';
import { RouteRepository } from '@/src/server/repository';
import { FARE_TABLE, FEE_TABLE } from '@/src/data/shinkansen_data';
import { SeatType } from '@/src/core/types';

const routeRepo = new RouteRepository();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { from, to, seatType, lineId } = body;

        if (!from || !to) {
            return NextResponse.json({ error: 'Missing from/to' }, { status: 400 });
        }

        const segments = routeRepo.findSegments(from, to, lineId);

        if (segments.length === 0) {
            return NextResponse.json({ error: 'No route found' }, { status: 404 });
        }

        const result = calculateRouteCost(
            segments,
            (seatType as SeatType) || 'unreserved', // Default
            FARE_TABLE,
            FEE_TABLE
        );

        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
