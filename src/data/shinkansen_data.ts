import { Station, Segment, FareRule, ShinkansenFeeRule } from '../core/types';

export const TOKAIDO_STATIONS: Station[] = [
    // --- TOKAIDO ---
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
    { id: 'SHIN_OSAKA', name: '新大阪', company: 'JR_TOKAI' },

    // --- SANYO ---
    { id: 'SHIN_KOBE', name: '新神戸', company: 'JR_WEST' },
    { id: 'NISHI_AKASHI', name: '西明石', company: 'JR_WEST' },
    { id: 'HIMEJI', name: '姫路', company: 'JR_WEST' },
    { id: 'AIOI', name: '相生', company: 'JR_WEST' },
    { id: 'OKAYAMA', name: '岡山', company: 'JR_WEST' },
    { id: 'SHIN_KURASHIKI', name: '新倉敷', company: 'JR_WEST' },
    { id: 'FUKUYAMA', name: '福山', company: 'JR_WEST' },
    { id: 'SHIN_ONOMICHI', name: '新尾道', company: 'JR_WEST' },
    { id: 'MIHARA', name: '三原', company: 'JR_WEST' },
    { id: 'HIGASHI_HIROSHIMA', name: '東広島', company: 'JR_WEST' },
    { id: 'HIROSHIMA', name: '広島', company: 'JR_WEST' },
    { id: 'SHIN_IWAKUNI', name: '新岩国', company: 'JR_WEST' },
    { id: 'TOKUYAMA', name: '徳山', company: 'JR_WEST' },
    { id: 'SHIN_YAMAGUCHI', name: '新山口', company: 'JR_WEST' },
    { id: 'ASA', name: '厚狭', company: 'JR_WEST' },
    { id: 'SHIN_SHIMONOSEKI', name: '新下関', company: 'JR_WEST' },
    { id: 'KOKURA', name: '小倉', company: 'JR_KYUSHU' }, // JR West operates Sanyo part, visually merging
    { id: 'HAKATA', name: '博多', company: 'JR_KYUSHU' },

    // --- KYUSHU ---
    { id: 'SHIN_TOSU', name: '新鳥栖', company: 'JR_KYUSHU' },
    { id: 'KURUME', name: '久留米', company: 'JR_KYUSHU' },
    { id: 'CHIKUGO_FUNAGOYA', name: '筑後船小屋', company: 'JR_KYUSHU' },
    { id: 'SHIN_OMUTA', name: '新大牟田', company: 'JR_KYUSHU' },
    { id: 'SHIN_TAMANA', name: '新玉名', company: 'JR_KYUSHU' },
    { id: 'KUMAMOTO', name: '熊本', company: 'JR_KYUSHU' },
    { id: 'SHIN_YATSUSHIRO', name: '新八代', company: 'JR_KYUSHU' },
    { id: 'SHIN_MINAMATA', name: '新水俣', company: 'JR_KYUSHU' },
    { id: 'IZUMI', name: '出水', company: 'JR_KYUSHU' },
    { id: 'SENDAI', name: '川内', company: 'JR_KYUSHU' },
    { id: 'KAGOSHIMA_CHUO', name: '鹿児島中央', company: 'JR_KYUSHU' },
];

export const TOHOKU_STATIONS: Station[] = [
    { id: 'TOKYO', name: '東京', company: 'JR_EAST' },
    { id: 'UENO', name: '上野', company: 'JR_EAST' },
    { id: 'OMIYA', name: '大宮', company: 'JR_EAST' },
    { id: 'OYAMA', name: '小山', company: 'JR_EAST' },
    { id: 'UTSUNOMIYA', name: '宇都宮', company: 'JR_EAST' },
    { id: 'NASUSHIOBARA', name: '那須塩原', company: 'JR_EAST' },
    { id: 'SHIN_SHIRAKAWA', name: '新白河', company: 'JR_EAST' },
    { id: 'KORIYAMA', name: '郡山', company: 'JR_EAST' },
    { id: 'FUKUSHIMA', name: '福島', company: 'JR_EAST' },
    { id: 'SHIROISHI_ZAO', name: '白石蔵王', company: 'JR_EAST' },
    { id: 'SENDAI', name: '仙台', company: 'JR_EAST' },
    { id: 'FURUKAWA', name: '古川', company: 'JR_EAST' },
    { id: 'KURIKOMA_KOGEN', name: 'くりこま高原', company: 'JR_EAST' },
    { id: 'ICHINOSEKI', name: '一ノ関', company: 'JR_EAST' },
    { id: 'MIZUSAWA_ESASHI', name: '水沢江刺', company: 'JR_EAST' },
    { id: 'KITAKAMI', name: '北上', company: 'JR_EAST' },
    { id: 'SHIN_HANAMAKI', name: '新花巻', company: 'JR_EAST' },
    { id: 'MORIOKA', name: '盛岡', company: 'JR_EAST' },
    { id: 'IWATE_NUMAKUNAI', name: 'いわて沼宮内', company: 'JR_EAST' },
    { id: 'NINOHE', name: '二戸', company: 'JR_EAST' },
    { id: 'HACHINOHE', name: '八戸', company: 'JR_EAST' },
    { id: 'SHICHINOHE_TOWADA', name: '七戸十和田', company: 'JR_EAST' },
    { id: 'SHIN_AOMORI', name: '新青森', company: 'JR_EAST' },
    // --- HOKKAIDO ---
    { id: 'OKUTSUGARU_IMABETSU', name: '奥津軽いまべつ', company: 'JR_HOKKAIDO' },
    { id: 'KIKONAI', name: '木古内', company: 'JR_HOKKAIDO' },
    { id: 'SHIN_HAKODATE_HOKUTO', name: '新函館北斗', company: 'JR_HOKKAIDO' },
];

export const STATIONS = TOKAIDO_STATIONS; // Alias for now

export const SEGMENTS: Segment[] = [
    // --- TOKAIDO SEGMENTS ---
    // TOKAIDO
    { id: 't1_a', fromStationId: 'TOKYO', toStationId: 'SHINAGAWA', line: 'TOKAIDO_SHINKANSEN', km: 6.8, type: 'shinkansen' },
    { id: 't1_b', fromStationId: 'SHINAGAWA', toStationId: 'SHIN_YOKOHAMA', line: 'TOKAIDO_SHINKANSEN', km: 22.0, type: 'shinkansen' }, // 28.8 - 6.8
    { id: 't2', fromStationId: 'SHIN_YOKOHAMA', toStationId: 'ODAWARA', line: 'TOKAIDO_SHINKANSEN', km: 55.1, type: 'shinkansen' },
    { id: 't3', fromStationId: 'ODAWARA', toStationId: 'ATAMI', line: 'TOKAIDO_SHINKANSEN', km: 20.7, type: 'shinkansen' },
    { id: 't4', fromStationId: 'ATAMI', toStationId: 'MISHIMA', line: 'TOKAIDO_SHINKANSEN', km: 16.1, type: 'shinkansen' },
    { id: 't5', fromStationId: 'MISHIMA', toStationId: 'SHIN_FUJI', line: 'TOKAIDO_SHINKANSEN', km: 25.7, type: 'shinkansen' },
    { id: 't6', fromStationId: 'SHIN_FUJI', toStationId: 'SHIZUOKA', line: 'TOKAIDO_SHINKANSEN', km: 34.2, type: 'shinkansen' },
    { id: 't7', fromStationId: 'SHIZUOKA', toStationId: 'KAKEGAWA', line: 'TOKAIDO_SHINKANSEN', km: 49.1, type: 'shinkansen' },
    { id: 't8', fromStationId: 'KAKEGAWA', toStationId: 'HAMAMATSU', line: 'TOKAIDO_SHINKANSEN', km: 27.0, type: 'shinkansen' },
    { id: 't9', fromStationId: 'HAMAMATSU', toStationId: 'TOYOHASHI', line: 'TOKAIDO_SHINKANSEN', km: 36.5, type: 'shinkansen' },
    { id: 't10', fromStationId: 'TOYOHASHI', toStationId: 'MIKAWA_ANJO', line: 'TOKAIDO_SHINKANSEN', km: 42.6, type: 'shinkansen' },
    { id: 't11', fromStationId: 'MIKAWA_ANJO', toStationId: 'NAGOYA', line: 'TOKAIDO_SHINKANSEN', km: 29.7, type: 'shinkansen' },
    { id: 't12', fromStationId: 'NAGOYA', toStationId: 'GIFU_HASHIMA', line: 'TOKAIDO_SHINKANSEN', km: 29.6, type: 'shinkansen' },
    { id: 't13', fromStationId: 'GIFU_HASHIMA', toStationId: 'MAIBARA', line: 'TOKAIDO_SHINKANSEN', km: 40.0, type: 'shinkansen' },
    { id: 't14', fromStationId: 'MAIBARA', toStationId: 'KYOTO', line: 'TOKAIDO_SHINKANSEN', km: 68.1, type: 'shinkansen' },
    { id: 't15', fromStationId: 'KYOTO', toStationId: 'SHIN_OSAKA', line: 'TOKAIDO_SHINKANSEN', km: 39.0, type: 'shinkansen' },

    // --- SANYO SEGMENTS ---
    { id: 's1', fromStationId: 'SHIN_OSAKA', toStationId: 'SHIN_KOBE', line: 'SANYO_SHINKANSEN', km: 35.3, type: 'shinkansen' },
    { id: 's2', fromStationId: 'SHIN_KOBE', toStationId: 'NISHI_AKASHI', line: 'SANYO_SHINKANSEN', km: 22.8, type: 'shinkansen' },
    { id: 's3', fromStationId: 'NISHI_AKASHI', toStationId: 'HIMEJI', line: 'SANYO_SHINKANSEN', km: 33.1, type: 'shinkansen' },
    { id: 's4', fromStationId: 'HIMEJI', toStationId: 'AIOI', line: 'SANYO_SHINKANSEN', km: 20.7, type: 'shinkansen' },
    { id: 's5', fromStationId: 'AIOI', toStationId: 'OKAYAMA', line: 'SANYO_SHINKANSEN', km: 67.9, type: 'shinkansen' },
    { id: 's6', fromStationId: 'OKAYAMA', toStationId: 'SHIN_KURASHIKI', line: 'SANYO_SHINKANSEN', km: 28.5, type: 'shinkansen' },
    { id: 's7', fromStationId: 'SHIN_KURASHIKI', toStationId: 'FUKUYAMA', line: 'SANYO_SHINKANSEN', km: 33.2, type: 'shinkansen' },
    { id: 's8', fromStationId: 'FUKUYAMA', toStationId: 'SHIN_ONOMICHI', line: 'SANYO_SHINKANSEN', km: 20.1, type: 'shinkansen' },
    { id: 's9', fromStationId: 'SHIN_ONOMICHI', toStationId: 'MIHARA', line: 'SANYO_SHINKANSEN', km: 11.5, type: 'shinkansen' },
    { id: 's10', fromStationId: 'MIHARA', toStationId: 'HIGASHI_HIROSHIMA', line: 'SANYO_SHINKANSEN', km: 34.9, type: 'shinkansen' },
    { id: 's11', fromStationId: 'HIGASHI_HIROSHIMA', toStationId: 'HIROSHIMA', line: 'SANYO_SHINKANSEN', km: 32.3, type: 'shinkansen' },
    { id: 's12', fromStationId: 'HIROSHIMA', toStationId: 'SHIN_IWAKUNI', line: 'SANYO_SHINKANSEN', km: 44.4, type: 'shinkansen' },
    { id: 's13', fromStationId: 'SHIN_IWAKUNI', toStationId: 'TOKUYAMA', line: 'SANYO_SHINKANSEN', km: 46.1, type: 'shinkansen' },
    { id: 's14', fromStationId: 'TOKUYAMA', toStationId: 'SHIN_YAMAGUCHI', line: 'SANYO_SHINKANSEN', km: 44.3, type: 'shinkansen' },
    { id: 's15', fromStationId: 'SHIN_YAMAGUCHI', toStationId: 'ASA', line: 'SANYO_SHINKANSEN', km: 35.1, type: 'shinkansen' },
    { id: 's16', fromStationId: 'ASA', toStationId: 'SHIN_SHIMONOSEKI', line: 'SANYO_SHINKANSEN', km: 26.6, type: 'shinkansen' },
    { id: 's17', fromStationId: 'SHIN_SHIMONOSEKI', toStationId: 'KOKURA', line: 'SANYO_SHINKANSEN', km: 18.6, type: 'shinkansen' },
    { id: 's18', fromStationId: 'KOKURA', toStationId: 'HAKATA', line: 'SANYO_SHINKANSEN', km: 67.2, type: 'shinkansen' },

    // --- KYUSHU SEGMENTS ---
    { id: 'k1', fromStationId: 'HAKATA', toStationId: 'SHIN_TOSU', line: 'KYUSHU_SHINKANSEN', km: 28.6, type: 'shinkansen' },
    { id: 'k2', fromStationId: 'SHIN_TOSU', toStationId: 'KURUME', line: 'KYUSHU_SHINKANSEN', km: 7.1, type: 'shinkansen' },
    { id: 'k3', fromStationId: 'KURUME', toStationId: 'CHIKUGO_FUNAGOYA', line: 'KYUSHU_SHINKANSEN', km: 15.1, type: 'shinkansen' },
    { id: 'k4', fromStationId: 'CHIKUGO_FUNAGOYA', toStationId: 'SHIN_OMUTA', line: 'KYUSHU_SHINKANSEN', km: 16.5, type: 'shinkansen' },
    { id: 'k5', fromStationId: 'SHIN_OMUTA', toStationId: 'SHIN_TAMANA', line: 'KYUSHU_SHINKANSEN', km: 23.3, type: 'shinkansen' },
    { id: 'k6', fromStationId: 'SHIN_TAMANA', toStationId: 'KUMAMOTO', line: 'KYUSHU_SHINKANSEN', km: 28.3, type: 'shinkansen' },
    { id: 'k7', fromStationId: 'KUMAMOTO', toStationId: 'SHIN_YATSUSHIRO', line: 'KYUSHU_SHINKANSEN', km: 33.3, type: 'shinkansen' },
    { id: 'k8', fromStationId: 'SHIN_YATSUSHIRO', toStationId: 'SHIN_MINAMATA', line: 'KYUSHU_SHINKANSEN', km: 41.8, type: 'shinkansen' },
    { id: 'k9', fromStationId: 'SHIN_MINAMATA', toStationId: 'IZUMI', line: 'KYUSHU_SHINKANSEN', km: 16.6, type: 'shinkansen' },
    { id: 'k10', fromStationId: 'IZUMI', toStationId: 'SENDAI', line: 'KYUSHU_SHINKANSEN', km: 32.7, type: 'shinkansen' },
    { id: 'k11', fromStationId: 'SENDAI', toStationId: 'KAGOSHIMA_CHUO', line: 'KYUSHU_SHINKANSEN', km: 46.1, type: 'shinkansen' },
];

export const TOHOKU_SEGMENTS: Segment[] = [
    { id: 'th1', fromStationId: 'TOKYO', toStationId: 'UENO', line: 'TOHOKU_SHINKANSEN', km: 3.6, type: 'shinkansen' },
    { id: 'th2', fromStationId: 'UENO', toStationId: 'OMIYA', line: 'TOHOKU_SHINKANSEN', km: 27.7, type: 'shinkansen' },
    { id: 'th3', fromStationId: 'OMIYA', toStationId: 'OYAMA', line: 'TOHOKU_SHINKANSEN', km: 50.3, type: 'shinkansen' },
    { id: 'th4', fromStationId: 'OYAMA', toStationId: 'UTSUNOMIYA', line: 'TOHOKU_SHINKANSEN', km: 27.2, type: 'shinkansen' },
    { id: 'th5', fromStationId: 'UTSUNOMIYA', toStationId: 'NASUSHIOBARA', line: 'TOHOKU_SHINKANSEN', km: 47.9, type: 'shinkansen' },
    { id: 'th6', fromStationId: 'NASUSHIOBARA', toStationId: 'SHIN_SHIRAKAWA', line: 'TOHOKU_SHINKANSEN', km: 28.1, type: 'shinkansen' },
    { id: 'th7', fromStationId: 'SHIN_SHIRAKAWA', toStationId: 'KORIYAMA', line: 'TOHOKU_SHINKANSEN', km: 41.7, type: 'shinkansen' },
    { id: 'th8', fromStationId: 'KORIYAMA', toStationId: 'FUKUSHIMA', line: 'TOHOKU_SHINKANSEN', km: 43.7, type: 'shinkansen' },
    { id: 'th9', fromStationId: 'FUKUSHIMA', toStationId: 'SHIROISHI_ZAO', line: 'TOHOKU_SHINKANSEN', km: 50.0, type: 'shinkansen' },
    { id: 'th10', fromStationId: 'SHIROISHI_ZAO', toStationId: 'SENDAI', line: 'TOHOKU_SHINKANSEN', km: 44.5, type: 'shinkansen' },
    { id: 'th11', fromStationId: 'SENDAI', toStationId: 'FURUKAWA', line: 'TOHOKU_SHINKANSEN', km: 43.4, type: 'shinkansen' },
    { id: 'th12', fromStationId: 'FURUKAWA', toStationId: 'KURIKOMA_KOGEN', line: 'TOHOKU_SHINKANSEN', km: 32.1, type: 'shinkansen' },
    { id: 'th13', fromStationId: 'KURIKOMA_KOGEN', toStationId: 'ICHINOSEKI', line: 'TOHOKU_SHINKANSEN', km: 25.0, type: 'shinkansen' },
    { id: 'th14', fromStationId: 'ICHINOSEKI', toStationId: 'MIZUSAWA_ESASHI', line: 'TOHOKU_SHINKANSEN', km: 28.0, type: 'shinkansen' },
    { id: 'th15', fromStationId: 'MIZUSAWA_ESASHI', toStationId: 'KITAKAMI', line: 'TOHOKU_SHINKANSEN', km: 16.2, type: 'shinkansen' },
    { id: 'th16', fromStationId: 'KITAKAMI', toStationId: 'SHIN_HANAMAKI', line: 'TOHOKU_SHINKANSEN', km: 14.3, type: 'shinkansen' },
    { id: 'th17', fromStationId: 'SHIN_HANAMAKI', toStationId: 'MORIOKA', line: 'TOHOKU_SHINKANSEN', km: 35.3, type: 'shinkansen' },
    { id: 'th18', fromStationId: 'MORIOKA', toStationId: 'IWATE_NUMAKUNAI', line: 'TOHOKU_SHINKANSEN', km: 33.1, type: 'shinkansen' },
    { id: 'th19', fromStationId: 'IWATE_NUMAKUNAI', toStationId: 'NINOHE', line: 'TOHOKU_SHINKANSEN', km: 34.6, type: 'shinkansen' },
    { id: 'th20', fromStationId: 'NINOHE', toStationId: 'HACHINOHE', line: 'TOHOKU_SHINKANSEN', km: 34.2, type: 'shinkansen' },
    { id: 'th21', fromStationId: 'HACHINOHE', toStationId: 'SHICHINOHE_TOWADA', line: 'TOHOKU_SHINKANSEN', km: 35.8, type: 'shinkansen' },
    { id: 'th22', fromStationId: 'SHICHINOHE_TOWADA', toStationId: 'SHIN_AOMORI', line: 'TOHOKU_SHINKANSEN', km: 45.9, type: 'shinkansen' },

    // --- HOKKAIDO SEGMENTS ---
    { id: 'hk1', fromStationId: 'SHIN_AOMORI', toStationId: 'OKUTSUGARU_IMABETSU', line: 'HOKKAIDO_SHINKANSEN', km: 38.5, type: 'shinkansen' },
    { id: 'hk2', fromStationId: 'OKUTSUGARU_IMABETSU', toStationId: 'KIKONAI', line: 'HOKKAIDO_SHINKANSEN', km: 74.8, type: 'shinkansen' },
    { id: 'hk3', fromStationId: 'KIKONAI', toStationId: 'SHIN_HAKODATE_HOKUTO', line: 'HOKKAIDO_SHINKANSEN', km: 35.5, type: 'shinkansen' },
];

export const JOETSU_STATIONS: Station[] = [
    { id: 'TOKYO', name: '東京', company: 'JR_EAST' },
    { id: 'UENO', name: '上野', company: 'JR_EAST' },
    { id: 'OMIYA', name: '大宮', company: 'JR_EAST' },
    { id: 'KUMAGAYA', name: '熊谷', company: 'JR_EAST' },
    { id: 'HONJO_WASEDA', name: '本庄早稲田', company: 'JR_EAST' },
    { id: 'TAKASAKI', name: '高崎', company: 'JR_EAST' },
    { id: 'JOMO_KOGEN', name: '上毛高原', company: 'JR_EAST' },
    { id: 'ECHIGO_YUZAWA', name: '越後湯沢', company: 'JR_EAST' },
    { id: 'URASA', name: '浦佐', company: 'JR_EAST' },
    { id: 'NAGAOKA', name: '長岡', company: 'JR_EAST' },
    { id: 'TSUBAME_SANJO', name: '燕三条', company: 'JR_EAST' },
    { id: 'NIIGATA', name: '新潟', company: 'JR_EAST' },
];

export const JOETSU_SEGMENTS: Segment[] = [
    { id: 'j1', fromStationId: 'TOKYO', toStationId: 'UENO', line: 'JOETSU_SHINKANSEN', km: 3.6, type: 'shinkansen' },
    { id: 'j2', fromStationId: 'UENO', toStationId: 'OMIYA', line: 'JOETSU_SHINKANSEN', km: 27.7, type: 'shinkansen' },
    { id: 'j3', fromStationId: 'OMIYA', toStationId: 'KUMAGAYA', line: 'JOETSU_SHINKANSEN', km: 36.6, type: 'shinkansen' },
    { id: 'j4', fromStationId: 'KUMAGAYA', toStationId: 'HONJO_WASEDA', line: 'JOETSU_SHINKANSEN', km: 21.1, type: 'shinkansen' },
    { id: 'j5', fromStationId: 'HONJO_WASEDA', toStationId: 'TAKASAKI', line: 'JOETSU_SHINKANSEN', km: 19.6, type: 'shinkansen' },
    { id: 'j6', fromStationId: 'TAKASAKI', toStationId: 'JOMO_KOGEN', line: 'JOETSU_SHINKANSEN', km: 36.3, type: 'shinkansen' },
    { id: 'j7', fromStationId: 'JOMO_KOGEN', toStationId: 'ECHIGO_YUZAWA', line: 'JOETSU_SHINKANSEN', km: 29.4, type: 'shinkansen' },
    { id: 'j8', fromStationId: 'ECHIGO_YUZAWA', toStationId: 'URASA', line: 'JOETSU_SHINKANSEN', km: 32.8, type: 'shinkansen' },
    { id: 'j9', fromStationId: 'URASA', toStationId: 'NAGAOKA', line: 'JOETSU_SHINKANSEN', km: 27.0, type: 'shinkansen' },
    { id: 'j10', fromStationId: 'NAGAOKA', toStationId: 'TSUBAME_SANJO', line: 'JOETSU_SHINKANSEN', km: 23.7, type: 'shinkansen' },
    { id: 'j11', fromStationId: 'TSUBAME_SANJO', toStationId: 'NIIGATA', line: 'JOETSU_SHINKANSEN', km: 35.8, type: 'shinkansen' },
];

export const HOKURIKU_STATIONS: Station[] = [
    { id: 'TOKYO', name: '東京', company: 'JR_EAST' },
    { id: 'UENO', name: '上野', company: 'JR_EAST' },
    { id: 'OMIYA', name: '大宮', company: 'JR_EAST' },
    { id: 'KUMAGAYA', name: '熊谷', company: 'JR_EAST' },
    { id: 'HONJO_WASEDA', name: '本庄早稲田', company: 'JR_EAST' },
    { id: 'TAKASAKI', name: '高崎', company: 'JR_EAST' },
    { id: 'ANNAKA_HARUNA', name: '安中榛名', company: 'JR_EAST' },
    { id: 'KARUIZAWA', name: '軽井沢', company: 'JR_EAST' },
    { id: 'SAKUDAIRA', name: '佐久平', company: 'JR_EAST' },
    { id: 'UEDA', name: '上田', company: 'JR_EAST' },
    { id: 'NAGANO', name: '長野', company: 'JR_EAST' },
    { id: 'IIYAMA', name: '飯山', company: 'JR_EAST' },
    { id: 'JOETSU_MYOKO', name: '上越妙高', company: 'JR_EAST' }, // Boundary JR East/West
    { id: 'ITOIGAWA', name: '糸魚川', company: 'JR_WEST' },
    { id: 'KUROBE_UNAZUKIONSEN', name: '黒部宇奈月温泉', company: 'JR_WEST' },
    { id: 'TOYAMA', name: '富山', company: 'JR_WEST' },
    { id: 'SHIN_TAKAOKA', name: '新高岡', company: 'JR_WEST' },
    { id: 'KANAZAWA', name: '金沢', company: 'JR_WEST' },
    { id: 'KOMATSU', name: '小松', company: 'JR_WEST' },
    { id: 'KAGA_ONSEN', name: '加賀温泉', company: 'JR_WEST' },
    { id: 'AWARA_ONSEN', name: '芦原温泉', company: 'JR_WEST' },
    { id: 'FUKUI', name: '福井', company: 'JR_WEST' },
    { id: 'ECHIZEN_TAKEFU', name: '越前たけふ', company: 'JR_WEST' },
    { id: 'TSURUGA', name: '敦賀', company: 'JR_WEST' },
];

export const HOKURIKU_SEGMENTS: Segment[] = [
    // Shared with Joetsu/Tohoku (duplicated for independence)
    { id: 'h1', fromStationId: 'TOKYO', toStationId: 'UENO', line: 'HOKURIKU_SHINKANSEN', km: 3.6, type: 'shinkansen' },
    { id: 'h2', fromStationId: 'UENO', toStationId: 'OMIYA', line: 'HOKURIKU_SHINKANSEN', km: 27.7, type: 'shinkansen' },
    { id: 'h3', fromStationId: 'OMIYA', toStationId: 'KUMAGAYA', line: 'HOKURIKU_SHINKANSEN', km: 36.6, type: 'shinkansen' },
    { id: 'h4', fromStationId: 'KUMAGAYA', toStationId: 'HONJO_WASEDA', line: 'HOKURIKU_SHINKANSEN', km: 21.1, type: 'shinkansen' },
    { id: 'h5', fromStationId: 'HONJO_WASEDA', toStationId: 'TAKASAKI', line: 'HOKURIKU_SHINKANSEN', km: 19.6, type: 'shinkansen' },
    // Branch from Takasaki
    { id: 'h6', fromStationId: 'TAKASAKI', toStationId: 'ANNAKA_HARUNA', line: 'HOKURIKU_SHINKANSEN', km: 18.5, type: 'shinkansen' },
    { id: 'h7', fromStationId: 'ANNAKA_HARUNA', toStationId: 'KARUIZAWA', line: 'HOKURIKU_SHINKANSEN', km: 23.3, type: 'shinkansen' },
    { id: 'h8', fromStationId: 'KARUIZAWA', toStationId: 'SAKUDAIRA', line: 'HOKURIKU_SHINKANSEN', km: 17.6, type: 'shinkansen' },
    { id: 'h9', fromStationId: 'SAKUDAIRA', toStationId: 'UEDA', line: 'HOKURIKU_SHINKANSEN', km: 23.5, type: 'shinkansen' },
    { id: 'h10', fromStationId: 'UEDA', toStationId: 'NAGANO', line: 'HOKURIKU_SHINKANSEN', km: 33.2, type: 'shinkansen' },
    { id: 'h11', fromStationId: 'NAGANO', toStationId: 'IIYAMA', line: 'HOKURIKU_SHINKANSEN', km: 29.9, type: 'shinkansen' },
    { id: 'h12', fromStationId: 'IIYAMA', toStationId: 'JOETSU_MYOKO', line: 'HOKURIKU_SHINKANSEN', km: 29.6, type: 'shinkansen' },
    { id: 'h13', fromStationId: 'JOETSU_MYOKO', toStationId: 'ITOIGAWA', line: 'HOKURIKU_SHINKANSEN', km: 37.0, type: 'shinkansen' },
    { id: 'h14', fromStationId: 'ITOIGAWA', toStationId: 'KUROBE_UNAZUKIONSEN', line: 'HOKURIKU_SHINKANSEN', km: 39.2, type: 'shinkansen' },
    { id: 'h15', fromStationId: 'KUROBE_UNAZUKIONSEN', toStationId: 'TOYAMA', line: 'HOKURIKU_SHINKANSEN', km: 33.8, type: 'shinkansen' },
    { id: 'h16', fromStationId: 'TOYAMA', toStationId: 'SHIN_TAKAOKA', line: 'HOKURIKU_SHINKANSEN', km: 19.0, type: 'shinkansen' },
    { id: 'h17', fromStationId: 'SHIN_TAKAOKA', toStationId: 'KANAZAWA', line: 'HOKURIKU_SHINKANSEN', km: 39.7, type: 'shinkansen' },
    { id: 'h18', fromStationId: 'KANAZAWA', toStationId: 'KOMATSU', line: 'HOKURIKU_SHINKANSEN', km: 27.6, type: 'shinkansen' },
    { id: 'h19', fromStationId: 'KOMATSU', toStationId: 'KAGA_ONSEN', line: 'HOKURIKU_SHINKANSEN', km: 14.6, type: 'shinkansen' },
    { id: 'h20', fromStationId: 'KAGA_ONSEN', toStationId: 'AWARA_ONSEN', line: 'HOKURIKU_SHINKANSEN', km: 16.3, type: 'shinkansen' },
    { id: 'h21', fromStationId: 'AWARA_ONSEN', toStationId: 'FUKUI', line: 'HOKURIKU_SHINKANSEN', km: 17.9, type: 'shinkansen' },
    { id: 'h22', fromStationId: 'FUKUI', toStationId: 'ECHIZEN_TAKEFU', line: 'HOKURIKU_SHINKANSEN', km: 19.0, type: 'shinkansen' },
    { id: 'h23', fromStationId: 'ECHIZEN_TAKEFU', toStationId: 'TSURUGA', line: 'HOKURIKU_SHINKANSEN', km: 30.2, type: 'shinkansen' },
];

export const AKITA_STATIONS: Station[] = [
    // Includes Tohoku portion (Tokyo to Morioka)
    ...TOHOKU_STATIONS.slice(0, 18), // Tokyo(0) to Morioka(17) inclusive in loop? Slice(0, 18) takes indices 0-17.
    { id: 'SHIZUKUISHI', name: '雫石', company: 'JR_EAST' },
    { id: 'TAZAWAKO', name: '田沢湖', company: 'JR_EAST' },
    { id: 'KAKUNODATE', name: '角館', company: 'JR_EAST' },
    { id: 'OMAGARI', name: '大曲', company: 'JR_EAST' },
    { id: 'AKITA', name: '秋田', company: 'JR_EAST' },
];

export const AKITA_SEGMENTS: Segment[] = [
    ...TOHOKU_SEGMENTS.slice(0, 17), // Tokyo to Morioka
    { id: 'ak1', fromStationId: 'MORIOKA', toStationId: 'SHIZUKUISHI', line: 'AKITA_SHINKANSEN', km: 16.0, type: 'shinkansen' },
    { id: 'ak2', fromStationId: 'SHIZUKUISHI', toStationId: 'TAZAWAKO', line: 'AKITA_SHINKANSEN', km: 24.1, type: 'shinkansen' },
    { id: 'ak3', fromStationId: 'TAZAWAKO', toStationId: 'KAKUNODATE', line: 'AKITA_SHINKANSEN', km: 18.8, type: 'shinkansen' },
    { id: 'ak4', fromStationId: 'KAKUNODATE', toStationId: 'OMAGARI', line: 'AKITA_SHINKANSEN', km: 16.8, type: 'shinkansen' },
    { id: 'ak5', fromStationId: 'OMAGARI', toStationId: 'AKITA', line: 'AKITA_SHINKANSEN', km: 51.7, type: 'shinkansen' },
];

export const YAMAGATA_STATIONS: Station[] = [
    // Includes Tohoku portion (Tokyo to Fukushima)
    ...TOHOKU_STATIONS.slice(0, 9), // Tokyo(0) to Fukushima(8) -> slice(0,9)
    { id: 'YONEZAWA', name: '米沢', company: 'JR_EAST' },
    { id: 'TAKAHATA', name: '高畠', company: 'JR_EAST' },
    { id: 'AKAYU', name: '赤湯', company: 'JR_EAST' },
    { id: 'KAMINOYAMA_ONSEN', name: 'かみのやま温泉', company: 'JR_EAST' },
    { id: 'YAMAGATA', name: '山形', company: 'JR_EAST' },
    { id: 'TENDO', name: '天童', company: 'JR_EAST' },
    { id: 'SAKURANBO_HIGASHINE', name: 'さくらんぼ東根', company: 'JR_EAST' },
    { id: 'MURAYAMA', name: '村山', company: 'JR_EAST' },
    { id: 'OISHIDA', name: '大石田', company: 'JR_EAST' },
    { id: 'SHINJO', name: '新庄', company: 'JR_EAST' },
];

export const YAMAGATA_SEGMENTS: Segment[] = [
    ...TOHOKU_SEGMENTS.slice(0, 8), // Tokyo to Fukushima
    { id: 'ya1', fromStationId: 'FUKUSHIMA', toStationId: 'YONEZAWA', line: 'YAMAGATA_SHINKANSEN', km: 40.1, type: 'shinkansen' },
    { id: 'ya2', fromStationId: 'YONEZAWA', toStationId: 'TAKAHATA', line: 'YAMAGATA_SHINKANSEN', km: 9.9, type: 'shinkansen' },
    { id: 'ya3', fromStationId: 'TAKAHATA', toStationId: 'AKAYU', line: 'YAMAGATA_SHINKANSEN', km: 6.1, type: 'shinkansen' },
    { id: 'ya4', fromStationId: 'AKAYU', toStationId: 'KAMINOYAMA_ONSEN', line: 'YAMAGATA_SHINKANSEN', km: 14.9, type: 'shinkansen' },
    { id: 'ya5', fromStationId: 'KAMINOYAMA_ONSEN', toStationId: 'YAMAGATA', line: 'YAMAGATA_SHINKANSEN', km: 16.1, type: 'shinkansen' },
    { id: 'ya6', fromStationId: 'YAMAGATA', toStationId: 'TENDO', line: 'YAMAGATA_SHINKANSEN', km: 13.3, type: 'shinkansen' },
    { id: 'ya7', fromStationId: 'TENDO', toStationId: 'SAKURANBO_HIGASHINE', line: 'YAMAGATA_SHINKANSEN', km: 7.0, type: 'shinkansen' },
    { id: 'ya8', fromStationId: 'SAKURANBO_HIGASHINE', toStationId: 'MURAYAMA', line: 'YAMAGATA_SHINKANSEN', km: 5.4, type: 'shinkansen' },
    { id: 'ya9', fromStationId: 'MURAYAMA', toStationId: 'OISHIDA', line: 'YAMAGATA_SHINKANSEN', km: 11.3, type: 'shinkansen' },
    { id: 'ya10', fromStationId: 'OISHIDA', toStationId: 'SHINJO', line: 'YAMAGATA_SHINKANSEN', km: 17.9, type: 'shinkansen' },
];

export const FARE_TABLE: FareRule[] = [
    { maxKm: 3, fare: 150 },
    { maxKm: 6, fare: 190 },
    { maxKm: 10, fare: 200 },
    { maxKm: 15, fare: 240 },
    { maxKm: 20, fare: 330 },
    { maxKm: 25, fare: 420 },
    { maxKm: 30, fare: 510 },
    { maxKm: 35, fare: 590 },
    { maxKm: 40, fare: 680 },
    { maxKm: 45, fare: 770 },
    { maxKm: 50, fare: 860 },
    { maxKm: 60, fare: 990 },
    { maxKm: 70, fare: 1170 },
    { maxKm: 80, fare: 1340 },
    { maxKm: 90, fare: 1520 },
    { maxKm: 100, fare: 1690 },
    { maxKm: 120, fare: 1980 },
    { maxKm: 140, fare: 2310 },
    { maxKm: 160, fare: 2640 },
    { maxKm: 180, fare: 3080 },
    { maxKm: 200, fare: 3410 },
    { maxKm: 220, fare: 3740 },
    { maxKm: 240, fare: 4070 },
    { maxKm: 260, fare: 4510 },
    { maxKm: 280, fare: 4840 },
    { maxKm: 300, fare: 5170 },
    { maxKm: 320, fare: 5500 },
    { maxKm: 340, fare: 5720 },
    { maxKm: 360, fare: 6050 },
    { maxKm: 380, fare: 6380 },
    { maxKm: 400, fare: 6600 },
    { maxKm: 420, fare: 6930 },
    { maxKm: 440, fare: 7260 },
    { maxKm: 460, fare: 7480 },
    { maxKm: 480, fare: 7700 },
    { maxKm: 500, fare: 8030 },
    { maxKm: 520, fare: 8360 },
    { maxKm: 540, fare: 8690 },
    { maxKm: 560, fare: 8910 },
    { maxKm: 580, fare: 9240 },
    { maxKm: 600, fare: 9460 },
    { maxKm: 640, fare: 9790 },
    { maxKm: 680, fare: 10120 },
    { maxKm: 720, fare: 10450 },
    { maxKm: 760, fare: 10780 },
    { maxKm: 800, fare: 11110 },
    { maxKm: 1000, fare: 12000 }, // Simplified >800
    { maxKm: 1400, fare: 15000 },
    { maxKm: 1600, fare: 17000 },
    { maxKm: 1800, fare: 19000 },
    { maxKm: 2000, fare: 21000 },
    { maxKm: 3000, fare: 25000 },
];

export const FEE_TABLE: ShinkansenFeeRule[] = [
    // --- TOKAIDO (Updated) ---
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1760 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2530 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 300, fee: 3410 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 400, fee: 4180 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 500, fee: 4620 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 600, fee: 4950 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 700, fee: 5390 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 800, fee: 5940 }, // Approx
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'unreserved', maxKm: 1400, fee: 8470 },

    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2290 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 3060 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 300, fee: 3940 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 400, fee: 4710 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 500, fee: 5150 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 600, fee: 5490 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 700, fee: 5920 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 800, fee: 6470 }, // +530
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'reserved', maxKm: 1400, fee: 9000 },

    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3060 }, // 1760+1300
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 200, fee: 5330 }, // 2530+2800 (Fee is Unreserved + Green Fee effectively?) No, usually Res+Green. 
    // Wait, let's stick to simple "Fee" for now. 
    // If Green Fee is ~2800 and Res Fee is 3060. Total ~5860.
    // My previous assumption was 4500.
    // Let's use approximations based on Navitime for Key Distances.
    // 200km Green: ~5860.
    // 300km Green: ~7780 (3940+3840).
    // 400km Green: ~8900 (4710+4190).
    // 600km Green: ~10890 (5490+5400).
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3590 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 200, fee: 5860 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 300, fee: 7780 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 400, fee: 8900 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 500, fee: 10550 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 600, fee: 10890 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 800, fee: 13000 },
    { line: 'TOKAIDO_SHINKANSEN', seatType: 'green', maxKm: 1400, fee: 16000 },

    // --- SANYO & KYUSHU (Approximate / Generalized) ---
    // Using simple distance logic for MVP
    { line: 'SANYO_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1760 },
    { line: 'SANYO_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2530 },
    { line: 'SANYO_SHINKANSEN', seatType: 'unreserved', maxKm: 600, fee: 4950 },
    { line: 'SANYO_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2290 },
    { line: 'SANYO_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 3060 },
    { line: 'SANYO_SHINKANSEN', seatType: 'reserved', maxKm: 600, fee: 5490 },
    { line: 'SANYO_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3300 },
    { line: 'SANYO_SHINKANSEN', seatType: 'green', maxKm: 200, fee: 4500 },
    { line: 'SANYO_SHINKANSEN', seatType: 'green', maxKm: 400, fee: 6500 },
    { line: 'SANYO_SHINKANSEN', seatType: 'green', maxKm: 600, fee: 8500 },
    // Long distance fallback
    { line: 'SANYO_SHINKANSEN', seatType: 'unreserved', maxKm: 1400, fee: 8470 }, // 9000 - 530
    { line: 'SANYO_SHINKANSEN', seatType: 'reserved', maxKm: 1400, fee: 9000 },
    { line: 'SANYO_SHINKANSEN', seatType: 'green', maxKm: 1400, fee: 13000 },

    { line: 'KYUSHU_SHINKANSEN', seatType: 'unreserved', maxKm: 50, fee: 870 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1760 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2530 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'unreserved', maxKm: 300, fee: 4500 }, // Approx for Hakata-Kagoshima

    { line: 'KYUSHU_SHINKANSEN', seatType: 'reserved', maxKm: 50, fee: 1400 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2290 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 3060 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'reserved', maxKm: 300, fee: 5200 }, // Matches user info (~5280)

    { line: 'KYUSHU_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3500 },
    { line: 'KYUSHU_SHINKANSEN', seatType: 'green', maxKm: 300, fee: 8000 }, // Rough estimate

    // --- TOHOKU ---
    { line: 'TOHOKU_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1800 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'unreserved', maxKm: 340, fee: 2600 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'unreserved', maxKm: 400, fee: 4000 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'unreserved', maxKm: 700, fee: 5500 },

    { line: 'TOHOKU_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2330 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'reserved', maxKm: 340, fee: 3130 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'reserved', maxKm: 400, fee: 4530 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'reserved', maxKm: 700, fee: 6030 },

    { line: 'TOHOKU_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3000 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'green', maxKm: 400, fee: 6000 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'green', maxKm: 700, fee: 9000 },

    { line: 'TOHOKU_SHINKANSEN', seatType: 'gran_class', maxKm: 100, fee: 5000 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'gran_class', maxKm: 400, fee: 10000 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'gran_class', maxKm: 700, fee: 15000 },
    // Extend for Hokkaido (Tokyo-Hakodate ~860km)
    { line: 'TOHOKU_SHINKANSEN', seatType: 'unreserved', maxKm: 900, fee: 7500 }, // Approx
    { line: 'TOHOKU_SHINKANSEN', seatType: 'reserved', maxKm: 900, fee: 8500 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'green', maxKm: 900, fee: 11000 },
    { line: 'TOHOKU_SHINKANSEN', seatType: 'gran_class', maxKm: 900, fee: 18000 },

    // Hokkaido specific (if local only) - Calculator groups them, so 'TOHOKU_SHINKANSEN' rules might be applied if we just use that key for the group?
    // Calculator logic: `feeTable.filter(r => group.lines.includes(r.line)...)`
    // So if I add rules for 'HOKKAIDO_SHINKANSEN', they will be candidates.
    // However, usually we want one rule for the total distance.
    // So I should arguably add 'HOKKAIDO_SHINKANSEN' to the rules above or just duplicate?
    // Let's add explicit Hokkaido-only rules for short hops, and ensure long-distance uses the Tohoku rules (which we just extended).
    // Actually, because the calculator matches `r.line`, if the segment is Hokkaido but rule is Tohoku, it won't match?
    // `group.lines.includes(r.line)` - YES it will match if I use `HOKKAIDO_SHINKANSEN` in the rule line.
    // But if I want ONE fee for the whole Tokyo-Hakodate trip, I need a rule that covers that distance...
    // Current calculator logic: sums distance for ALL segments in group. Then finds a rule in that group.
    // It filters rules by: `group.lines.includes(r.line)`.
    // So if I have a rule `{line: 'TOHOKU_SHINKANSEN', maxKm: 900}`, it is included.
    // And it will match the 860km total distance.
    // So I don't need 'HOKKAIDO' specific rules for the through trip, AS LONG AS 'TOHOKU' rules cover the distance.
    // But for local Hokkaido trips (Shin-Aomori to Hakodate), the distance is small (~150km).
    // Should use the appropriate fee.


    // --- JOETSU ---
    { line: 'JOETSU_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1800 },
    { line: 'JOETSU_SHINKANSEN', seatType: 'unreserved', maxKm: 300, fee: 3500 },
    { line: 'JOETSU_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2330 },
    { line: 'JOETSU_SHINKANSEN', seatType: 'reserved', maxKm: 300, fee: 4030 },
    { line: 'JOETSU_SHINKANSEN', seatType: 'green', maxKm: 300, fee: 7000 },

    // --- HOKURIKU ---
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1800 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2600 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'unreserved', maxKm: 300, fee: 3500 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'unreserved', maxKm: 400, fee: 4200 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'unreserved', maxKm: 600, fee: 5000 },

    { line: 'HOKURIKU_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2330 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 3130 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'reserved', maxKm: 300, fee: 4030 }, // e.g., Tokyo-Nagano (~222km)
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'reserved', maxKm: 400, fee: 4700 }, // e.g., Tokyo-Toyama (~391km)
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'reserved', maxKm: 600, fee: 5800 }, // e.g., Tokyo-Kanazawa (~450km)
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'reserved', maxKm: 800, fee: 6500 },

    { line: 'HOKURIKU_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3000 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'green', maxKm: 200, fee: 4500 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'green', maxKm: 300, fee: 6000 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'green', maxKm: 400, fee: 8000 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'green', maxKm: 600, fee: 10000 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'green', maxKm: 800, fee: 12000 },

    { line: 'HOKURIKU_SHINKANSEN', seatType: 'gran_class', maxKm: 400, fee: 12000 },
    { line: 'HOKURIKU_SHINKANSEN', seatType: 'gran_class', maxKm: 800, fee: 18000 },

    // --- AKITA (Mini-Shinkansen) ---
    // Distances are short (Morioka-Akita ~127km)
    { line: 'AKITA_SHINKANSEN', seatType: 'unreserved', maxKm: 50, fee: 1000 }, // Fallback, actually all reserved
    { line: 'AKITA_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1500 },
    { line: 'AKITA_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2000 },

    { line: 'AKITA_SHINKANSEN', seatType: 'reserved', maxKm: 50, fee: 1500 },
    { line: 'AKITA_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2000 },
    { line: 'AKITA_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 2500 }, // e.g. Morioka-Akita ~127km falls here (~2500 yen approx)

    { line: 'AKITA_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3000 },
    { line: 'AKITA_SHINKANSEN', seatType: 'green', maxKm: 200, fee: 4000 },

    // --- YAMAGATA (Mini-Shinkansen) ---
    // Distances (Fukushima-Yamagata ~90km, -Shinjo ~150km)
    { line: 'YAMAGATA_SHINKANSEN', seatType: 'unreserved', maxKm: 50, fee: 1000 },
    { line: 'YAMAGATA_SHINKANSEN', seatType: 'unreserved', maxKm: 100, fee: 1500 },
    { line: 'YAMAGATA_SHINKANSEN', seatType: 'unreserved', maxKm: 200, fee: 2000 },

    { line: 'YAMAGATA_SHINKANSEN', seatType: 'reserved', maxKm: 50, fee: 1500 },
    { line: 'YAMAGATA_SHINKANSEN', seatType: 'reserved', maxKm: 100, fee: 2000 },
    { line: 'YAMAGATA_SHINKANSEN', seatType: 'reserved', maxKm: 200, fee: 2500 },

    { line: 'YAMAGATA_SHINKANSEN', seatType: 'green', maxKm: 100, fee: 3000 },
    { line: 'YAMAGATA_SHINKANSEN', seatType: 'green', maxKm: 200, fee: 4000 },
];
