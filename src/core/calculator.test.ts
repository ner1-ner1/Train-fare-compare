import { describe, it, expect } from 'vitest';
import { calculateRouteCost, calculateTotalKm } from './calculator';
import { Segment, FareRule, ShinkansenFeeRule, SeatType } from './types';

describe('Calculator', () => {
    // Mock Data
    const sampleFareTable: FareRule[] = [
        { maxKm: 300, fare: 5000 },
        { maxKm: 600, fare: 9000 },
        { maxKm: 1000, fare: 12000 },
    ];

    const sampleFeeTable: ShinkansenFeeRule[] = [
        { line: 'TOKAIDO', seatType: 'unreserved', maxKm: 300, fee: 3000 },
        { line: 'TOKAIDO', seatType: 'reserved', maxKm: 300, fee: 4000 },
        { line: 'TOKAIDO', seatType: 'unreserved', maxKm: 600, fee: 5000 },
        { line: 'TOKAIDO', seatType: 'reserved', maxKm: 600, fee: 6000 },
    ];

    const segments: Segment[] = [
        { id: '1', fromStationId: 'A', toStationId: 'B', line: 'TOKAIDO', km: 100, type: 'shinkansen' },
        { id: '2', fromStationId: 'B', toStationId: 'C', line: 'TOKAIDO', km: 450, type: 'shinkansen' }
    ];

    it('calculates total km correctly', () => {
        expect(calculateTotalKm(segments)).toBe(550);
    });

    it('calculates cost for Reserved seat correctly', () => {
        const cost = calculateRouteCost(segments, 'reserved', sampleFareTable, sampleFeeTable);

        expect(cost.totalKm).toBe(550);
        // 550km <= 600km rule
        // Fare: 9000
        expect(cost.fare).toBe(9000);
        // Fee: 6000 (reserved, <=600)
        expect(cost.shinkansenFee).toBe(6000);
        expect(cost.total).toBe(15000);
    });

    it('calculates cost for Unreserved seat correctly', () => {
        const cost = calculateRouteCost(segments, 'unreserved', sampleFareTable, sampleFeeTable);

        expect(cost.shinkansenFee).toBe(5000); // 5000 (unreserved, <=600)
        expect(cost.total).toBe(14000);
    });
});
