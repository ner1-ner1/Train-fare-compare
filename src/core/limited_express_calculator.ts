import { Train, LimitedExpressFeeRule } from './types';
import { LIMITED_EXPRESS_FEES } from '../data/limited_express_data';

// 8. 料金計算フロー
export function calcLimitedExpressFee(train: Train, km: number, seatType: 'unreserved' | 'reserved' | 'green'): number {

    // バリデーション: 全車指定席列車で自由席を選択した場合
    if (train.seatPolicy === 'ALL_RESERVED' && seatType === 'unreserved') {
        throw new Error(`列車「${train.name}」には自由席が設定されていません。指定席またはグリーン席を選択してください。`);
    }

    // バリデーション: グリーン席なし列車でグリーン席を選択した場合 (optional)
    if (!train.hasGreen && seatType === 'green') {
        throw new Error(`列車「${train.name}」にはグリーン席が設定されていません。`);
    }

    // 料金テーブルから該当するルールを抽出
    // 条件: 料金体系(tariff)が一致 かつ 座席種別(seatType)が一致 かつ 距離(km)が maxKm 以下
    const applicableRules = LIMITED_EXPRESS_FEES
        .filter(r => r.tariff === train.tariff && r.seatType === seatType)
        .filter(r => km <= r.maxKm);

    if (applicableRules.length === 0) {
        // 該当するルールがない場合 (例: kmが想定外に長い、またはデータ不備)
        // ここでは最も長い距離の料金を適用する救済措置をとるか、エラーにするか。
        // 仕様書では「km <= maxKm を満たすルールのうち maxKm が最小のものを採用」
        // もし600km超えでデータがない場合は...
        // 上限なしの場合は最後のルールを適用するのが一般的だが、今回はエラーまたは最大値を返す。

        // データ内で最大のmaxKmを持つルールを探す
        const fallbackRules = LIMITED_EXPRESS_FEES
            .filter(r => r.tariff === train.tariff && r.seatType === seatType)
            .sort((a, b) => b.maxKm - a.maxKm);

        if (fallbackRules.length > 0) {
            return fallbackRules[0].fee;
        }

        throw new Error(`料金データが見つかりません (Train:${train.name}, Tariff:${train.tariff}, Seat:${seatType}, Dist:${km}km)`);
    }

    // maxKm が小さい順にソートし、最初の1つ（最小のもの）を取得
    const rule = applicableRules.sort((a, b) => a.maxKm - b.maxKm)[0];

    return rule.fee;
}

// テスト用またはデバッグ用のヘルパー関数
export function getTrainInfo(trainName: string): Train | undefined {
    // この関数は本来TRAIN_MASTERを使うべきだが、core/calculator.tsはdata層に依存して良いか？
    // import済みなのでOK
    const { TRAIN_MASTER } = require('../data/limited_express_data'); // commonjs require to avoid Circular dependency if any? No, let's use import normally.
    return TRAIN_MASTER.find((t: Train) => t.name === trainName);
}
