import { Station, Segment } from '../core/types';
import {
    TOKAIDO_STATIONS, SEGMENTS as TOKAIDO_SEGMENTS,
    TOHOKU_STATIONS, TOHOKU_SEGMENTS,
    JOETSU_STATIONS, JOETSU_SEGMENTS,
    HOKURIKU_STATIONS, HOKURIKU_SEGMENTS,
    AKITA_STATIONS, AKITA_SEGMENTS,
    YAMAGATA_STATIONS, YAMAGATA_SEGMENTS
} from '../data/shinkansen_data';

export class StationRepository {
    getAllStations(): Station[] {
        return [
            ...TOKAIDO_STATIONS,
            ...TOHOKU_STATIONS,
            ...JOETSU_STATIONS,
            ...HOKURIKU_STATIONS,
            ...AKITA_STATIONS,
            ...YAMAGATA_STATIONS
        ];
    }

    getStationById(id: string): Station | undefined {
        return this.getAllStations().find(s => s.id === id);
    }
}

export class RouteRepository {
    findSegments(fromId: string, toId: string, lineId: string = 'TOKAIDO_SANYO_KYUSHU'): Segment[] {
        // Select correct data source
        let currentStations = TOKAIDO_STATIONS;
        let currentSegments = TOKAIDO_SEGMENTS;

        if (lineId === 'TOHOKU_HOKKAIDO') {
            currentStations = TOHOKU_STATIONS;
            currentSegments = TOHOKU_SEGMENTS;
        } else if (lineId === 'JOETSU') {
            currentStations = JOETSU_STATIONS;
            currentSegments = JOETSU_SEGMENTS;
        } else if (lineId === 'HOKURIKU') {
            currentStations = HOKURIKU_STATIONS;
            currentSegments = HOKURIKU_SEGMENTS;
        } else if (lineId === 'AKITA') {
            currentStations = AKITA_STATIONS;
            currentSegments = AKITA_SEGMENTS;
        } else if (lineId === 'YAMAGATA') {
            currentStations = YAMAGATA_STATIONS;
            currentSegments = YAMAGATA_SEGMENTS;
        }

        const fromIndex = currentStations.findIndex(s => s.id === fromId);
        const toIndex = currentStations.findIndex(s => s.id === toId);

        if (fromIndex === -1 || toIndex === -1) {
            // Check if user is searching cross-line? For now throw error or just fail.
            // With Line Selector, user shouldn't be able to select stations not in the line.
            throw new Error(`Station not found in line ${lineId}`);
        }

        if (fromIndex === toIndex) {
            return [];
        }

        const isDownbound = fromIndex < toIndex;
        let resultSegments: Segment[] = [];

        if (isDownbound) {
            resultSegments = currentSegments.slice(fromIndex, toIndex);
        } else {
            resultSegments = currentSegments.slice(toIndex, fromIndex);
        }

        return resultSegments;
    }
}
