import { Segment, ShinkansenFeeRule, FareRule, CostBreakdown, SeatType } from './types';

// Calculate total operating kilometers for a list of segments
export function calculateTotalKm(segments: Segment[]): number {
    return segments.reduce((sum, seg) => sum + seg.km, 0);
}

// Find appropriate fare based on total km
export function lookupFare(km: number, fareTable: FareRule[]): number {
    // Sort by maxKm just in case
    const sorted = [...fareTable].sort((a, b) => a.maxKm - b.maxKm);
    const rule = sorted.find(r => km <= r.maxKm);
    return rule ? rule.fare : -1; // -1 indicates out of range/error
}

// Calculate Shinkansen Express Fee
// Rules:
// - Tokaido & Sanyo treated as one continuous line for fee calculation.
// - Kyushu is separate.
// - If route spans Sanyo & Kyushu, fee = Fee(Sanyo portion) + Fee(Kyushu portion).
export function calculateShinkansenFee(
    segments: Segment[],
    seatType: SeatType,
    feeTable: ShinkansenFeeRule[]
): { totalFee: number; details: { description: string; amount: number }[] } {
    const shinkansenSegments = segments.filter(s => s.type === 'shinkansen');
    if (shinkansenSegments.length === 0) return { totalFee: 0, details: [] };

    // Define groups. Each inner array is a set of lines that behave as one "through" zone.
    const feeGroups = [
        { lines: ['TOKAIDO_SHINKANSEN', 'SANYO_SHINKANSEN'], name: 'Tokaido/Sanyo Express Fee' },
        { lines: ['KYUSHU_SHINKANSEN'], name: 'Kyushu Express Fee' },
        { lines: ['TOHOKU_SHINKANSEN', 'HOKKAIDO_SHINKANSEN'], name: 'Tohoku/Hokkaido Express Fee' },
        // Note: Hokkaido segments are calculated as part of Tohoku line distance (summed),
        // UNLESS the trip is exclusively within Hokkaido Shinkansen, in which case fee is 0 (handled below).
        { lines: ['JOETSU_SHINKANSEN'], name: 'Joetsu Express Fee' },
        { lines: ['HOKURIKU_SHINKANSEN'], name: 'Hokuriku Express Fee' },
        { lines: ['AKITA_SHINKANSEN'], name: 'Akita Express Fee' },
        { lines: ['YAMAGATA_SHINKANSEN'], name: 'Yamagata Express Fee' }
    ];

    let totalFee = 0;
    const details: { description: string; amount: number }[] = [];

    for (const group of feeGroups) {
        // Find segments belonging to this group
        const groupSegments = shinkansenSegments.filter(s => group.lines.includes(s.line));

        if (groupSegments.length > 0) {
            // Special Logic: If Hokkaido Shinkansen Only -> Fee is 0 (treated as conventional line for fee purposes in this app context)
            const isPureHokkaido = groupSegments.every(s => s.line === 'HOKKAIDO_SHINKANSEN');
            if (isPureHokkaido) {
                details.push({
                    description: group.name + ' (Hokkaido Local)',
                    amount: 0
                });
                continue;
            }

            const km = calculateTotalKm(groupSegments);

            const rules = feeTable.filter(r =>
                group.lines.includes(r.line) && r.seatType === seatType
            );

            // Sort by maxKm
            const sorted = rules.sort((a, b) => a.maxKm - b.maxKm);

            const rule = sorted.find(r => km <= r.maxKm);

            if (rule) {
                totalFee += rule.fee;
                details.push({
                    description: group.name,
                    amount: rule.fee
                });
            }
        }
    }

    return { totalFee, details };
}

export function calculateRouteCost(
    segments: Segment[],
    seatType: SeatType,
    fareTable: FareRule[],
    feeTable: ShinkansenFeeRule[]
): CostBreakdown {
    const totalKm = calculateTotalKm(segments);

    // 1. Calculate Base Fare (Ticket)
    const fare = lookupFare(totalKm, fareTable);

    // 2. Calculate Express Fee
    const { totalFee: shinkansenFee, details: feeDetails } = calculateShinkansenFee(segments, seatType, feeTable);

    const total = (fare > 0 ? fare : 0) + (shinkansenFee > 0 ? shinkansenFee : 0);

    return {
        totalKm,
        fare,
        shinkansenFee,
        total,
        details: [
            { type: 'fare', description: `Base Fare (${totalKm.toFixed(1)} km)`, amount: fare },
            ...feeDetails.map(d => ({ type: 'fee' as const, description: d.description, amount: d.amount }))
        ]
    };
}
