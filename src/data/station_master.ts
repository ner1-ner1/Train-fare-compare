// Import all station/line JSONs
import stationsHokkaido from './stations/stations_hokkaido.json';
import stationsEast from './stations/stations_east.json';
import stationsTokai from './stations/stations_tokai.json';
import stationsWest from './stations/stations_west.json';
import stationsShikoku from './stations/stations_shikoku.json';
import stationsKyushu from './stations/stations_kyushu.json';

import linesHokkaido from './stations/lines_hokkaido.json';
import linesEast from './stations/lines_east.json';
import linesTokai from './stations/lines_tokai.json';
import linesWest from './stations/lines_west.json';
import linesShikoku from './stations/lines_shikoku.json';
import linesKyushu from './stations/lines_kyushu.json';

import type { Station } from '@/src/core/types';

// Consolidated Station Master
export const ALL_STATIONS: Station[] = [
    ...stationsHokkaido,
    ...stationsEast,
    ...stationsTokai,
    ...stationsWest,
    ...stationsShikoku,
    ...stationsKyushu,
] as Station[]; // Cast because JSON structure matches Station type

// Line Definition Type
export type LineDefinition = {
    id: string;
    name: string;
    stations: { id: string; km: number }[];
};

// Consolidated Line Master
export const ALL_LINES: LineDefinition[] = [
    ...linesHokkaido,
    ...linesEast,
    ...linesTokai,
    ...linesWest,
    ...linesShikoku,
    ...linesKyushu,
];

// Helper to get definition
export const getLineDefinition = (id: string): LineDefinition | undefined => {
    return ALL_LINES.find(l => l.id === id);
};

// Helper to get station info
export const getStationInfo = (id: string): Station | undefined => {
    // Use a Map in production for performance, but find is fine for MVP
    return ALL_STATIONS.find(s => s.id === id);
};
