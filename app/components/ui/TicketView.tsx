import { Station } from '@/src/core/types';

type TicketProps = {
    from: string; // Name
    to: string; // Name
    date: string; // e.g. "12月24日"
    totalPrice: number;
    breakdown: string; // e.g. "内訳：運賃9,460・特5,490"
    seatType: string; // "指定席" or "自由席"
    distance: number;
    className?: string;
};

export function TicketView({ from, to, date, totalPrice, breakdown, seatType, distance, className = '' }: TicketProps) {
    // Ticket background: Light/White approach for "White Base" UI
    // Using a subtle border and clean white background
    return (
        <div className={`font-mono select-none w-full ${className}`}>
            <div className="relative w-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                {/* Left Accent Bar (Visual only, simulates ticket stub) */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-100 border-r border-dashed border-slate-300"></div>

                <div className="flex flex-col md:flex-row items-center p-3 pl-6 gap-4 md:gap-8">
                    {/* Route Section */}
                    <div className="flex-1 flex items-center space-x-3 min-w-0">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-lg md:text-2xl font-bold text-slate-800 truncate">{from}</span>
                            <span className="text-slate-400 text-sm">➡</span>
                            <span className="text-lg md:text-2xl font-bold text-slate-800 truncate">{to}</span>
                        </div>
                    </div>

                    {/* Meta Info: Seat / Date / Distance */}
                    <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 shrink-0">
                        <div className="flex flex-col items-center px-3 py-1 bg-slate-50 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">{date}</span>
                            <span className="text-[10px] text-slate-400">乗車日</span>
                        </div>
                        <div className={`px-3 py-1 font-bold rounded border ${seatType.includes('グリーン') ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                            {seatType}
                        </div>
                        <div className="hidden md:block font-mono tracking-wider">
                            {distance.toFixed(1)}km
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="text-right shrink-0 min-w-[120px]">
                        <div className="text-2xl font-bold text-slate-900 tracking-tight">
                            ¥{totalPrice.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                            {breakdown}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
