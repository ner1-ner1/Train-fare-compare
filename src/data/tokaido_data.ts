import { Station, Segment, FareRule, ShinkansenFeeRule } from '../core/types';

export const STATIONS: Station[] = [
    { id: 'TOKYO', name: '東京', company: 'JR_TOKAI' },
    { id: 'SHINAGAWA', name: '品川', company: 'JR_TOKAI' },
    { id: 'SHIN_YOKOHAMA', name: '新横浜', company: 'JR_TOKAI' },
    { id: 'ODAWARA', name: '小田原', company: 'JR_TOKAI' },
    { id: 'ATAMI', name: '熱海', company: 'JR_TOKAI' },
    { id: 'MISHIMA', name: '三島', company: 'JR_TOKAI' },
    { id: 'SHIN_FUJI', name: '新富士', company: 'JR_TOKAI' },
    { id: 'SHIZUOKA', name: '静岡', company: 'JR_TOKAI' },
    { id: 'KAKEGAWA', name: '掛川', company: 'JR_TOKAI' },
    { id: 'HAMAMATSU', name: '浜松', company: 'JR_TOKAI' },
    { id: 'TOYOHASHI', name: '豊橋', company: 'JR_TOKAI' },
    { id: 'MIKAWA_ANJO', name: '三河安城', company: 'JR_TOKAI' },
    { id: 'NAGOYA', name: '名古屋', company: 'JR_TOKAI' },
    { id: 'GIFU_HASHIMA', name: '岐阜羽島', company: 'JR_TOKAI' },
    { id: 'MAIBARA', name: '米原', company: 'JR_TOKAI' },
    { id: 'KYOTO', name: '京都', company: 'JR_TOKAI' },
    { id: 'SHIN_OSAKA', name: '新大阪', company: 'JR_TOKAI' }
];

// Simplified distances (approx)
export const SEGMENTS: Segment[] = [
    { id: '1', fromStationId: 'TOKYO', toStationId: 'SHIN_YOKOHAMA', line: 'TOKAIDO_SHINKANSEN', km: 28.8, type: 'shinkansen' },
    { id: '2', fromStationId: 'SHIN_YOKOHAMA', toStationId: 'ODAWARA', line: 'TOKAIDO_SHINKANSEN', km: 55.1, type: 'shinkansen' }, // 83.9 - 28.8
    { id: '3', fromStationId: 'ODAWARA', toStationId: 'ATAMI', line: 'TOKAIDO_SHINKANSEN', km: 20.7, type: 'shinkansen' },
    { id: '4', fromStationId: 'ATAMI', toStationId: 'MISHIMA', line: 'TOKAIDO_SHINKANSEN', km: 16.1, type: 'shinkansen' },
    { id: '5', fromStationId: 'MISHIMA', toStationId: 'SHIN_FUJI', line: 'TOKAIDO_SHINKANSEN', km: 25.7, type: 'shinkansen' },
    { id: '6', fromStationId: 'SHIN_FUJI', toStationId: 'SHIZUOKA', line: 'TOKAIDO_SHINKANSEN', km: 34.2, type: 'shinkansen' },
    { id: '7', fromStationId: 'SHIZUOKA', toStationId: 'KAKEGAWA', line: 'TOKAIDO_SHINKANSEN', km: 49.1, type: 'shinkansen' },
    { id: '8', fromStationId: 'KAKEGAWA', toStationId: 'HAMAMATSU', line: 'TOKAIDO_SHINKANSEN', km: 27.0, type: 'shinkansen' },
    { id: '9', fromStationId: 'HAMAMATSU', toStationId: 'TOYOHASHI', line: 'TOKAIDO_SHINKANSEN', km: 36.5, type: 'shinkansen' },
    { id: '10', fromStationId: 'TOYOHASHI', toStationId: 'MIKAWA_ANJO', line: 'TOKAIDO_SHINKANSEN', km: 42.6, type: 'shinkansen' },
    { id: '11', fromStationId: 'MIKAWA_ANJO', toStationId: 'NAGOYA', line: 'TOKAIDO_SHINKANSEN', km: 29.7, type: 'shinkansen' },
    { id: '12', fromStationId: 'NAGOYA', toStationId: 'GIFU_HASHIMA', line: 'TOKAIDO_SHINKANSEN', km: 29.6, type: 'shinkansen' },
    { id: '13', fromStationId: 'GIFU_HASHIMA', toStationId: 'MAIBARA', line: 'TOKAIDO_SHINKANSEN', km: 40.0, type: 'shinkansen' }, // Approx
    { id: '14', fromStationId: 'MAIBARA', toStationId: 'KYOTO', line: 'TOKAIDO_SHINKANSEN', km: 68.1, type: 'shinkansen' },
    { id: '15', fromStationId: 'KYOTO', toStationId: 'SHIN_OSAKA', line: 'TOKAIDO_SHINKANSEN', km: 39.0, type: 'shinkansen' }
];

// Simplified Fare Table (example values based on JR distance/fare)
export const FARE_TABLE: FareRule[] = [
    { maxKm: 30, fare: 510 },
    { maxKm: 50, fare: 860 },
    { maxKm: 100, fare: 1690 },
    { maxKm: 200, fare: 3410 },
    { maxKm: 300, fare: 5170 },
    { maxKm: 400, fare: 6500 },
    { maxKm: 500, fare: 8030 },
    { maxKm: 600, fare: 9460 },
    { maxKm: 800, fare: 10000 },
];

// Simplified Express Fee (Tokaido Shinkansen)
export const FEE_TABLE: ShinkansenFeeRule[] = [
    // Unreserved
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1760 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2530 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 300, fee: 3410 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 600, fee: 4950 },

    // Reserved (Usually +530 or more depending on season, using base)
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2290 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 3060 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 300, fee: 3940 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 600, fee: 5490 },
];
