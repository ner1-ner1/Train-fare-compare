type TextSummaryProps = {
    from: string;
    to: string;
    totalKm: number;
    fare: number;
    fee: number;
    total: number;
    seatType: string;
};

export function TextSummary({ from, to, totalKm, fare, fee, total, seatType }: TextSummaryProps) {
    const text = `
【経路】${from} ➡ ${to}
【距離】${totalKm.toFixed(1)} km
【座席】新幹線${seatType === 'reserved' ? '指定席' : '自由席'}
---------------------------
運賃：¥${fare.toLocaleString()}
料金：¥${fee.toLocaleString()}
---------------------------
合計：¥${total.toLocaleString()}
`.trim();

    return (
        <div className="bg-gray-50 border border-gray-300 rounded p-4 font-mono text-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500 font-bold">Copyable Text</span>
                <button
                    onClick={() => navigator.clipboard.writeText(text)}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                    Copy
                </button>
            </div>
            <pre className="whitespace-pre-wrap select-all bg-white p-2 rounded border border-gray-100">
                {text}
            </pre>
        </div>
    );
}
