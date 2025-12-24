'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Station } from '@/src/core/types';

type LineOption = {
    id: string;
    name: string;
};

type Props = {
    stations: Station[];
    lines: LineOption[];
    onCalculate: (from: string, to: string, seat: string, lineId: string) => Promise<boolean>;
    onLineChange: (lineId: string) => void;
    currentLineId: string;
};

export function RetroTerminal({ stations, lines, onCalculate, onLineChange, currentLineId }: Props) {
    const [history, setHistory] = useState<string[]>([
        'PREEX TERMINAL v2.0 READY.',
        'SYSTEM: ONLINE',
        'TYPE "HELP" FOR INSTRUCTIONS.',
        '----------------------------------------'
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Keep focus logic (optional, maybe too aggressive if user wants to click elsewhere)
    useEffect(() => {
        const handleRefocus = () => {
            if (document.activeElement === document.body) {
                inputRef.current?.focus();
            }
        }
        document.addEventListener('keydown', handleRefocus); // Focus on keypress if body is active
        return () => document.removeEventListener('keydown', handleRefocus);
    }, []);

    // Initial focus
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = async () => {
        const cmdLine = input.trim();
        if (!cmdLine) return;

        // Echo command
        setHistory(prev => [...prev, `USER> ${cmdLine}`]);
        setInput('');

        const args = cmdLine.split(/\s+/);
        const cmd = args[0].toLowerCase();
        const params = args.slice(1);

        switch (cmd) {
            case 'help':
            case '?':
                setHistory(prev => [...prev,
                    'AVAILABLE COMMANDS:',
                    '  CALC <FROM> <TO> [SEAT] : Add route to list',
                    '      SEAT: free, rsv (default), green, gran',
                    '  LINE <NAME>             : Switch Shinkansen line',
                    '      NAME: tokaido, tohoku, joetsu, hokuriku, akita, yamagata',
                    '  LS / STATIONS           : List current stations',
                    '  LINES                   : List available lines',
                    '  CLEAR / CLS             : Clear screen',
                    ''
                ]);
                break;

            case 'clear':
            case 'cls':
                setHistory([]);
                break;

            case 'lines':
                setHistory(prev => [...prev, 'AVAILABLE LINES:', ...lines.map(l => `  [${l.id}] ${l.name}`)]);
                break;

            case 'ls':
            case 'stations':
                setHistory(prev => [...prev,
                `STATIONS (${currentLineId}):`,
                stations.map(s => `${s.name}(${s.id})`).join(', ')
                ]);
                break;

            case 'line':
                if (params.length === 0) {
                    setHistory(prev => [...prev, `CURRENT LINE: ${currentLineId}`]);
                } else {
                    const search = params[0].toLowerCase();
                    let match = lines.find(l => l.id.toLowerCase().includes(search));

                    // Shortcuts
                    if (!match) {
                        if (search.startsWith('tok')) match = lines.find(l => l.id === 'TOKAIDO_SANYO_KYUSHU');
                        else if (search.startsWith('toh')) match = lines.find(l => l.id === 'TOHOKU_HOKKAIDO');
                        else if (search.startsWith('joe')) match = lines.find(l => l.id === 'JOETSU');
                        else if (search.startsWith('hok')) match = lines.find(l => l.id === 'HOKURIKU');
                        else if (search.startsWith('aki')) match = lines.find(l => l.id === 'AKITA');
                        else if (search.startsWith('yam')) match = lines.find(l => l.id === 'YAMAGATA');
                    }

                    if (match) {
                        onLineChange(match.id);
                        setHistory(prev => [...prev, `SWITCHED LINE TO: ${match?.name}`]);
                    } else {
                        setHistory(prev => [...prev, `ERROR: Line "${search}" not found.`]);
                    }
                }
                break;

            case 'calc':
            case 'add':
                if (params.length < 2) {
                    setHistory(prev => [...prev, 'USAGE: CALC <FROM> <TO> [SEAT]']);
                    break;
                }
                const fromQ = params[0].toLowerCase();
                const toQ = params[1].toLowerCase();
                const seatQ = params[2]?.toLowerCase() || 'reserved';

                // Fuzzy Find
                const findSt = (q: string) => stations.find(s =>
                    s.id.toLowerCase() === q ||
                    s.id.toLowerCase().replace('_', '').includes(q) ||
                    s.name.toLowerCase().includes(q)
                );

                const fromSt = findSt(fromQ);
                const toSt = findSt(toQ);

                if (!fromSt) { setHistory(prev => [...prev, `ERROR: Station "${fromQ}" not found.`]); break; }
                if (!toSt) { setHistory(prev => [...prev, `ERROR: Station "${toQ}" not found.`]); break; }

                let seatId = 'reserved';
                if (['free', 'unreserved', 'jiyu'].includes(seatQ)) seatId = 'unreserved';
                if (['green', 'grn'].includes(seatQ)) seatId = 'green';
                if (['gran', 'granclass', 'glan'].includes(seatQ)) seatId = 'gran_class';

                setHistory(prev => [...prev, `PROCESSING: ${fromSt.id} -> ${toSt.id} (${seatId})...`]);

                try {
                    const success = await onCalculate(fromSt.id, toSt.id, seatId, currentLineId);
                    if (success) {
                        setHistory(prev => [...prev, '>> OK. ROUTE ADDED.']);
                    } else {
                        setHistory(prev => [...prev, '>> FAILED. CHECK SYSTEM LOGS.']);
                    }
                } catch (e) {
                    setHistory(prev => [...prev, '>> SYSTEM ERROR.']);
                }
                break;

            default:
                setHistory(prev => [...prev, `ERROR: UNKNOWN COMMAND "${cmd}".`]);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-black font-mono text-green-500 text-xs sm:text-sm p-4 overflow-hidden shadow-inner border-t border-green-900/50">

            {/* CRT Scanline Effect Overlay (Optional, CSS class would be better but inline for simplicity) */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-20"></div>

            <div className="flex-1 overflow-y-auto scrollbar-none pb-2 relative z-10" onClick={() => inputRef.current?.focus()}>
                {history.map((line, i) => (
                    <div key={i} className="mb-1 break-words">{line}</div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex items-center pt-2 border-t border-green-800/50 relative z-10">
                <span className="mr-2 text-green-400 font-bold animate-pulse">{'>'}</span>
                <input
                    ref={inputRef}
                    className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800 uppercase"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                    placeholder="COMMAND..."
                    autoComplete="off"
                    autoFocus
                />
            </div>
        </div>
    );
}
