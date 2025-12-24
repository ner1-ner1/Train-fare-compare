'use client';

import { Station } from '@/src/core/types';

type RouteMapProps = {
    stations: Station[];
    from: string;
    to: string;
    activeSelection: 'from' | 'to'; // New prop
    onSelect: (id: string) => void;
    className?: string;
};

export function RouteMap({ stations, from, to, activeSelection, onSelect, className = '' }: RouteMapProps) {
    if (!stations) return null;

    // Horizontal Layout for Sidebar - Compact
    const stationGap = 60;
    const startPadding = 40;
    const totalWidth = Math.max(800, stations.length * stationGap + startPadding * 2);
    const svgHeight = 140;
    const lineY = 50;

    // Calculate active range
    const fromIdx = stations.findIndex(s => s.id === from);
    const toIdx = stations.findIndex(s => s.id === to);
    const startIdx = (fromIdx !== -1 && toIdx !== -1) ? Math.min(fromIdx, toIdx) : -1;
    const endIdx = (fromIdx !== -1 && toIdx !== -1) ? Math.max(fromIdx, toIdx) : -1;

    // Calculate Distance
    let selectedDistance: number | null = null;
    if (fromIdx !== -1 && toIdx !== -1 && stations[fromIdx].distance !== undefined && stations[toIdx].distance !== undefined) {
        selectedDistance = Math.abs((stations[toIdx].distance || 0) - (stations[fromIdx].distance || 0));
        selectedDistance = Math.round(selectedDistance * 10) / 10;
    }

    const getX = (idx: number) => startPadding + idx * stationGap;

    const getIndex = (id: string) => stations.findIndex(s => s.id === id);

    return (
        <div className={`select-none overflow-x-auto ${className} scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent`}>
            <svg width={totalWidth} height={svgHeight} className="drop-shadow-sm font-sans bg-transparent min-w-full">
                {/* Main Line Background */}
                <line
                    x1={startPadding} y1={lineY} x2={getX(stations.length - 1)} y2={lineY}
                    stroke="rgba(0,0,0,0.1)"
                    className="stroke-slate-200"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Active Route Highlight */}
                {startIdx !== -1 && endIdx !== -1 && (
                    <>
                        <line
                            x1={getX(startIdx)} y1={lineY} x2={getX(endIdx)} y2={lineY}
                            stroke="url(#gradient-route)"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        {/* Distance Label Above Line */}
                        {selectedDistance !== null && (
                            <g transform={`translate(${(getX(startIdx) + getX(endIdx)) / 2}, ${lineY - 20})`}>
                                <rect x="-35" y="-12" width="70" height="18" rx="4" fill="#1e293b" opacity="0.9" />
                                <text
                                    x="0" y="0"
                                    fill="#fbbf24"
                                    fontSize="11"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {selectedDistance.toFixed(1)} km
                                </text>
                                {/* Triangle */}
                                <path d="M -4 6 L 0 10 L 4 6 Z" fill="#1e293b" opacity="0.9" />
                            </g>
                        )}
                    </>
                )}

                {/* Gradients */}
                <defs>
                    <linearGradient id="gradient-route" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                </defs>

                {/* Stations */}
                {stations.map((s, idx) => {
                    const x = getX(idx);
                    const isFrom = s.id === from;
                    const isTo = s.id === to;
                    const isSelected = isFrom || isTo;
                    const isBetween = startIdx !== -1 && idx > startIdx && idx < endIdx;
                    const isMajor = ['TOKYO', 'SHIN_OSAKA', 'HAKATA', 'NAGOYA', 'SENDAI', 'MORIOKA', 'SHIN_AOMORI'].some(id => s.id.includes(id));

                    // Dynamic styling based on active mode
                    const isTargetMode = (activeSelection === 'from' && isFrom) || (activeSelection === 'to' && isTo);
                    const dimOthers = !isTargetMode && isSelected;

                    return (
                        <g
                            key={s.id}
                            onClick={() => onSelect(s.id)}
                            className="cursor-pointer group"
                        >
                            {/* Hit Area - Tall strip */}
                            <rect x={x - 15} y="0" width="30" height={svgHeight} fill="transparent" />

                            {/* Connection Dot */}
                            <circle
                                cx={x} cy={lineY}
                                r={isSelected ? 8 : (isBetween ? 5 : 4)}
                                fill={isFrom ? '#3b82f6' : (isTo ? '#fbbf24' : (isBetween ? '#fff' : '#94a3b8'))}
                                stroke={isSelected ? '#fff' : 'none'}
                                strokeWidth="2"
                                className={`transition-all duration-300 group-hover:r-8 ${isBetween ? 'stroke-slate-300' : ''}`}
                                opacity={dimOthers ? 0.5 : 1}
                            />

                            {/* Pulsing Ring for Active Selection Mode */}
                            {isTargetMode && (
                                <circle cx={x} cy={lineY} r="12" fill="none" stroke={activeSelection === 'from' ? '#3b82f6' : '#fbbf24'} strokeWidth="2" className="animate-ping opacity-75" />
                            )}

                            {/* Station Name Labels - Rotated for space */}
                            <text
                                x={x} y={lineY + 25}
                                fill={isSelected ? '#0f172a' : (isMajor ? '#334155' : '#94a3b8')} // Darker text for white base
                                fontSize={isSelected ? "14" : (isMajor ? "12" : "10")}
                                fontWeight={isSelected || isMajor ? "bold" : "normal"}
                                textAnchor="start"
                                transform={`rotate(45, ${x}, ${lineY + 25})`}
                                className="transition-all duration-300 group-hover:fill-blue-600 group-hover:font-bold select-none"
                            >
                                {s.name}
                            </text>

                            {/* Indicators */}
                            {isFrom && <text x={x} y={lineY - 20} fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle">DEP</text>}
                            {isTo && <text x={x} y={lineY - 20} fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">ARR</text>}

                            {/* Hover Guide */}
                            <text x={x} y={lineY - 35} fill={activeSelection === 'from' ? '#3b82f6' : '#fbbf24'} fontSize="10" fontWeight="bold" textAnchor="middle" className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {activeSelection === 'from' ? 'SET FROM' : 'SET TO'}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
