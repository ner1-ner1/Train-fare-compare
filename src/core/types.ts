export type CompanyId = 'JR_HOKKAIDO' | 'JR_EAST' | 'JR_TOKAI' | 'JR_WEST' | 'JR_SHIKOKU' | 'JR_KYUSHU' | 'OTHER' | string;

export type Station = {
    id: string;
    name: string;
    kana?: string;
    company?: CompanyId;
    pref?: string;
    lat?: number;
    lon?: number;
    aliases?: string[];
    distance?: number; // Distance from origin in km
};

export type LineType = 'conventional' | 'shinkansen';

export type Segment = {
    id: string;
    fromStationId: string;
    toStationId: string;
    line: string;
    km: number;
    type: LineType;
};

export type SeatType = 'unreserved' | 'reserved' | 'green' | 'gran_class';

export type ShinkansenFeeRule = {
    line: string;
    seatType: SeatType;
    maxKm: number;
    fee: number;
};

export type FareRule = {
    maxKm: number;
    fare: number;
};

export type Route = {
    segments: Segment[];
};

export type CostBreakdown = {
    totalKm: number;
    fare: number;
    shinkansenFee: number;
    total: number;
    details: {
        type: 'fare' | 'fee';
        description: string;
        amount: number;
    }[];
};

// --- Limited Express Types ---

export type TariffId = 'BASIC_LE' | 'ALL_RESERVED' | 'HOKKAIDO_ALL_RESERVED' | 'SPECIAL_FIXED';

export type SeatPolicy = 'HAS_UNRESERVED' | 'ALL_RESERVED';

export type Train = {
    name: string;
    company: string; // 'JR_EAST' | 'JR_WEST' | 'JR_HOKKAIDO' etc.
    tariff: TariffId;
    seatPolicy: SeatPolicy;
    hasGreen: boolean;
    lineDefId?: string;
};

export type LimitedExpressFeeRule = {
    tariff: TariffId;
    seatType: 'unreserved' | 'reserved' | 'green';
    maxKm: number;
    fee: number;
};
