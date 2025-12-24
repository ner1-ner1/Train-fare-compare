import { TariffId, LimitedExpressFeeRule, Train } from '../core/types';

// 5. 特急料金テーブル (MVP)
export const LIMITED_EXPRESS_FEES: LimitedExpressFeeRule[] = [
    // --- BASIC_LE (標準・A特急料金) ---
    // 自由席 (仕様書例 + 一般的な推測値)
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 50, fee: 760 },
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 100, fee: 1290 },
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 150, fee: 1860 },
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 200, fee: 2200 },
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 300, fee: 2530 }, // 推測
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 400, fee: 2970 }, // 仕様書例
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 600, fee: 3630 }, // 仕様書例
    { tariff: 'BASIC_LE', seatType: 'unreserved', maxKm: 801, fee: 4290 }, // 仕様書例 (800以下と仮定)

    // 指定席 (自由席 + 530円)
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 50, fee: 1290 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 100, fee: 1820 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 150, fee: 2390 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 200, fee: 2730 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 300, fee: 3060 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 400, fee: 3500 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 600, fee: 4160 },
    { tariff: 'BASIC_LE', seatType: 'reserved', maxKm: 801, fee: 4820 },

    // --- ALL_RESERVED (JR東日本 新着席サービス等) ---
    // 指定席のみ
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 50, fee: 760 },
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 100, fee: 1020 },
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 150, fee: 1580 },
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 200, fee: 2240 },
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 300, fee: 2550 },
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 400, fee: 2900 },
    { tariff: 'ALL_RESERVED', seatType: 'reserved', maxKm: 601, fee: 3500 }, // 推測

    // --- HOKKAIDO_ALL_RESERVED (北海道) ---
    // 指定席のみ (2024年現在: 全車指定席化後料金)
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 50, fee: 1360 },
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 100, fee: 1990 },
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 150, fee: 2550 },
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 200, fee: 3110 },
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 300, fee: 3670 },
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 400, fee: 4230 },
    { tariff: 'HOKKAIDO_ALL_RESERVED', seatType: 'reserved', maxKm: 601, fee: 4790 },
];


export const TRAIN_MASTER: Train[] = [
    // 1. 北海道
    { name: '北斗', company: 'JR_HOKKAIDO', tariff: 'HOKKAIDO_ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'HOKUTO_LINE' },
    { name: 'すずらん', company: 'JR_HOKKAIDO', tariff: 'HOKKAIDO_ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: false, lineDefId: 'HOKUTO_LINE' },
    { name: 'おおぞら', company: 'JR_HOKKAIDO', tariff: 'HOKKAIDO_ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'OZORA_TOKACHI_LINE' },
    { name: 'とかち', company: 'JR_HOKKAIDO', tariff: 'HOKKAIDO_ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'OZORA_TOKACHI_LINE' },

    // 2. 東北
    { name: 'ひたち', company: 'JR_EAST', tariff: 'ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'JOBAN_LINE' },
    { name: 'ときわ', company: 'JR_EAST', tariff: 'ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'JOBAN_LINE' },
    { name: 'つがる', company: 'JR_EAST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'TSUGARU_INAHO_LINE' },
    { name: 'いなほ', company: 'JR_EAST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'TSUGARU_INAHO_LINE' },

    // 3. 関東・甲信越
    { name: '成田エクスプレス', company: 'JR_EAST', tariff: 'ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'NARITA_EXPRESS_LINE' },
    { name: '踊り子', company: 'JR_EAST', tariff: 'ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'ODORIKO_LINE' },
    { name: 'あずさ', company: 'JR_EAST', tariff: 'ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'CHUO_LINE' },
    { name: 'かいじ', company: 'JR_EAST', tariff: 'ALL_RESERVED', seatPolicy: 'ALL_RESERVED', hasGreen: true, lineDefId: 'CHUO_LINE' },
    { name: 'わかしお', company: 'JR_EAST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: false, lineDefId: 'WAKASHIO_SAZANAMI_LINE' },
    { name: 'さざなみ', company: 'JR_EAST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: false, lineDefId: 'WAKASHIO_SAZANAMI_LINE' },

    // 4. 中部
    { name: 'しなの', company: 'JR_TOKAI', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'SHINANO_LINE' },
    { name: 'ひだ', company: 'JR_TOKAI', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'HIDA_LINE' },
    { name: '南紀', company: 'JR_TOKAI', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: false, lineDefId: 'NANKI_LINE' },

    // 5. 関西・中国
    { name: 'サンダーバード', company: 'JR_WEST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'THUNDERBIRD_LINE' },
    { name: 'くろしお', company: 'JR_WEST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'KUROSHIO_LINE' },
    { name: 'はるか', company: 'JR_WEST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'HARUKA_LINE' },
    { name: 'こうのとり', company: 'JR_WEST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'KONOTORI_LINE' },
    { name: 'やくも', company: 'JR_WEST', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'YAKUMO_LINE' },

    // 6. 四国
    { name: 'しおかぜ', company: 'JR_SHIKOKU', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'SHIOKAZE_LINE' },
    { name: '南風', company: 'JR_SHIKOKU', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'NANPU_LINE' },
    { name: 'うずしお', company: 'JR_SHIKOKU', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: false, lineDefId: 'UZUSHIO_LINE' },

    // 7. 九州
    { name: 'ソニック', company: 'JR_KYUSHU', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'SONIC_LINE' },
    { name: 'かもめ', company: 'JR_KYUSHU', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: true, lineDefId: 'RELAY_KAMOME_LINE' },
    { name: 'きりしま', company: 'JR_KYUSHU', tariff: 'BASIC_LE', seatPolicy: 'HAS_UNRESERVED', hasGreen: false, lineDefId: 'KIRISHIMA_LINE' },
];

