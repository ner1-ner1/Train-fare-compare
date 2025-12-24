import { describe, it, expect } from 'vitest';
import { calcLimitedExpressFee } from './limited_express_calculator';
import { TRAIN_MASTER, LIMITED_EXPRESS_FEES } from '../data/limited_express_data';
import { Train } from './types';

describe('Limited Express Calculator (MVP)', () => {

    // 1. 北海道 (HOKKAIDO_ALL_RESERVED)
    describe('Hokkaido Area (HOKKAIDO_ALL_RESERVED)', () => {
        const hokuto = TRAIN_MASTER.find(t => t.name === '北斗') as Train;

        it('should calculate correct fee for Hotel (Reserved, 50km)', () => {
            // 50km -> 1160 (仮定値)
            expect(calcLimitedExpressFee(hokuto, 50, 'reserved')).toBe(1160);
        });

        it('should calculate correct fee for Hotel (Reserved, 200km)', () => {
            // 200km -> 2730
            expect(calcLimitedExpressFee(hokuto, 200, 'reserved')).toBe(2730);
        });

        it('should throw error for Unreserved seat', () => {
            expect(() => calcLimitedExpressFee(hokuto, 100, 'unreserved'))
                .toThrow('自由席が設定されていません');
        });
    });

    // 2. 東北 (ALL_RESERVED & BASIC_LE)
    describe('Tohoku Area', () => {
        const hitachi = TRAIN_MASTER.find(t => t.name === 'ひたち') as Train;
        const tsugaru = TRAIN_MASTER.find(t => t.name === 'つがる') as Train;

        it('Hitachi (ALL_RESERVED): should calculate 50km/100km fees', () => {
            expect(calcLimitedExpressFee(hitachi, 50, 'reserved')).toBe(760);
            expect(calcLimitedExpressFee(hitachi, 100, 'reserved')).toBe(1020);
        });

        it('Tsugaru (BASIC_LE): should support Unreserved seat', () => {
            // 50km -> 760
            expect(calcLimitedExpressFee(tsugaru, 50, 'unreserved')).toBe(760);
        });
    });

    // 3. 関東 (BASIC_LE)
    describe('Kanto Area (BASIC_LE)', () => {
        const shonan = TRAIN_MASTER.find(t => t.name === 'わかしお') as Train; // BASIC_LE

        it('should calculate correctly for Unreserved vs Reserved (50km)', () => {
            // Unreserved: 760
            expect(calcLimitedExpressFee(shonan, 50, 'unreserved')).toBe(760);
            // Reserved: 1290 (760 + 530)
            expect(calcLimitedExpressFee(shonan, 50, 'reserved')).toBe(1290);
        });

        it('should calculate correctly for Unreserved vs Reserved (100km)', () => {
            expect(calcLimitedExpressFee(shonan, 100, 'unreserved')).toBe(1290);
            expect(calcLimitedExpressFee(shonan, 100, 'reserved')).toBe(1820);
        });
    });

    // 600kmオーバーの挙動 (Fallback to max)
    it('should fallback to max fee if distance exceeds table', () => {
        const shonan = TRAIN_MASTER.find(t => t.name === 'わかしお') as Train;
        // 900km -> 801km〜の料金 (4290 or 4820)
        expect(calcLimitedExpressFee(shonan, 900, 'unreserved')).toBe(4290);
    });
});
