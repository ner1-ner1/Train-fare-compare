'use client';

import { useState, useRef, useEffect } from 'react';
import {
  TOKAIDO_STATIONS,
  TOHOKU_STATIONS,
  JOETSU_STATIONS,
  HOKURIKU_STATIONS,
  AKITA_STATIONS,
  YAMAGATA_STATIONS,
  SEGMENTS,
  TOHOKU_SEGMENTS,
  JOETSU_SEGMENTS,
  HOKURIKU_SEGMENTS,
  AKITA_SEGMENTS,
  YAMAGATA_SEGMENTS
} from '@/src/data/shinkansen_data';
import { TicketView } from './components/ui/TicketView';
import { RetroTerminal } from './components/ui/RetroTerminal';
import { Button } from './components/ui/Button';
import { Select } from './components/ui/Select';
import { RouteMap } from './components/ui/RouteMap';
import type { Station } from '@/src/core/types';
import { calcLimitedExpressFee } from '@/src/core/limited_express_calculator';
import { TRAIN_MASTER } from '@/src/data/limited_express_data';
import { getLineDefinition, getStationInfo } from '@/src/data/station_master';
import type { Train } from '@/src/core/types';
import { useMemo } from 'react';

import { translations, Language } from '@/src/data/locales';

// ... (existing imports)

type ComparisonResult = {
  id: string; // Unique ID for list management
  timestamp: number; // For sorting by time
  lineId: string; // Shinkansen line identifier
  from: string;
  to: string;
  seatType: string;
  totalKm: number;
  fare: number; // Base Fare
  shinkansenFee: number; // Express Fee
  total: number;
  details?: { type: 'fare' | 'fee'; description: string; amount: number }[];
  // Selection State for Checkbox Calculation
  isFareSelected: boolean;
  isFeeSelected: boolean;
  transportMode?: 'shinkansen' | 'limited_express';
  trainName?: string;
  isNote?: boolean;  // Mark as free text note
  noteTitle?: string; // Text content for note
  noteColor?: string; // Color theme for the note
  customMemo?: string; // Memo for any item (including trains)
};

const NOTE_COLORS = [
  { id: 'amber', name: 'Amber', class: 'bg-amber-500' },
  { id: 'blue', name: 'Blue', class: 'bg-blue-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500' },
  { id: 'red', name: 'Red', class: 'bg-red-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500' },
  { id: 'slate', name: 'Gray', class: 'bg-slate-500' },
];

const NOTE_ICONS = [
  { id: 'memo', icon: '✎', label: 'Memo' },
  { id: 'hotel', icon: '🏨', label: 'Hotel' },
  { id: 'food', icon: '🍱', label: 'Food' },
  { id: 'bus', icon: '🚌', label: 'Bus' },
  { id: 'taxi', icon: '🚕', label: 'Taxi' },
  { id: 'other', icon: '⭐', label: 'Other' },
];

type SortOrder = 'manual' | 'price-asc' | 'price-desc';
type LineConfig = {
  id: string;
  name: string;
  stations: any[];
};

const LINE_OPTIONS: LineConfig[] = [
  { id: 'TOKAIDO_SANYO_KYUSHU', name: '東海道・山陽・九州新幹線', stations: TOKAIDO_STATIONS },
  { id: 'TOHOKU_HOKKAIDO', name: '東北・北海道新幹線', stations: TOHOKU_STATIONS },
  { id: 'JOETSU', name: '上越新幹線', stations: JOETSU_STATIONS },
  { id: 'HOKURIKU', name: '北陸新幹線', stations: HOKURIKU_STATIONS },
  { id: 'AKITA', name: '秋田新幹線 (こまち)', stations: AKITA_STATIONS },
  { id: 'YAMAGATA', name: '山形新幹線 (つばさ)', stations: YAMAGATA_STATIONS },
];

export default function Home() {
  /* MODE STATE */
  const [transportMode, setTransportMode] = useState<'shinkansen' | 'limited_express'>('shinkansen');
  const [selectedTrainName, setSelectedTrainName] = useState(TRAIN_MASTER[0].name);
  const [manualDistance, setManualDistance] = useState<number>(100);

  const [selectedLineId, setSelectedLineId] = useState('TOKAIDO_SANYO_KYUSHU');
  /* THEME LOGIC */
  const [theme, setTheme] = useState<'light' | 'dark' | 'retro'>('light');
  /* LANGUAGE */
  const [language, setLanguage] = useState<Language>('ja');
  const t = translations[language];

  const themeStyles = {
    light: {
      appBg: 'bg-slate-50',
      font: 'font-sans',
      textMain: 'text-slate-900',
      textSub: 'text-slate-500',
      panelLeft: 'bg-white/50 border-r-white/40',
      panelRight: 'bg-slate-100/30',
      cardBg: 'bg-white/60 border-white/40',
      inputBg: 'bg-white/50 border-white/20',
      accent: 'text-blue-600',
    },
    dark: {
      appBg: 'bg-slate-950',
      font: 'font-sans',
      textMain: 'text-slate-100',
      textSub: 'text-slate-400',
      panelLeft: 'bg-slate-900/50 border-r-white/5',
      panelRight: 'bg-black/20',
      cardBg: 'bg-slate-800/40 border-white/5',
      inputBg: 'bg-slate-900/50 border-white/10',
      accent: 'text-blue-400',
    },
    retro: {
      appBg: 'bg-black',
      font: 'font-mono tracking-tight',
      textMain: 'text-green-500',
      textSub: 'text-green-800',
      panelLeft: 'bg-black border-r-green-900',
      panelRight: 'bg-black',
      cardBg: 'bg-black border-green-800',
      inputBg: 'bg-black border-green-900 text-green-500',
      accent: 'text-green-400',
    }
  };

  const currentTheme = themeStyles[theme];

  // Helper to get segments for current line
  const getSegments = (id: string) => {
    // ... (existing logic) ...
    switch (id) {
      case 'TOKAIDO_SANYO_KYUSHU': return SEGMENTS;
      case 'TOHOKU_HOKKAIDO': return TOHOKU_SEGMENTS;
      case 'JOETSU': return JOETSU_SEGMENTS;
      case 'HOKURIKU': return HOKURIKU_SEGMENTS;
      case 'AKITA': return [...TOHOKU_SEGMENTS, ...AKITA_SEGMENTS];
      case 'YAMAGATA': return [...TOHOKU_SEGMENTS, ...YAMAGATA_SEGMENTS];
      default: return SEGMENTS;
    }
  };

  // ... (existing stations logic) ...
  const currentLine = LINE_OPTIONS.find(l => l.id === selectedLineId) || LINE_OPTIONS[0];
  const rawStations = currentLine.stations;
  const currentSegments = getSegments(selectedLineId);

  // 1. Shinkansen Stations Logic
  const shinkansenStations: Station[] = (() => {
    let dist = 0;
    return rawStations.map((s: Station, i: number) => {
      if (i > 0) {
        const prev = rawStations[i - 1];
        const seg = currentSegments.find((seg: any) =>
          (seg.fromStationId === prev.id && seg.toStationId === s.id) ||
          (seg.fromStationId === s.id && seg.toStationId === prev.id)
        );
        if (seg) dist += seg.km;
      }
      return { ...s, distance: dist };
    });
  })();

  // 2. Limited Express Stations Logic
  const leStations: Station[] = useMemo(() => {
    if (transportMode !== 'limited_express') return [];
    const train = TRAIN_MASTER.find(t => t.name === selectedTrainName);
    if (!train?.lineDefId) return [];

    const lineDef = getLineDefinition(train.lineDefId);
    if (!lineDef) return [];

    const result: Station[] = [];
    for (const s of lineDef.stations) {
      const info = getStationInfo(s.id);
      if (info) {
        result.push({ ...info, distance: s.km });
      }
    }
    return result;
  }, [transportMode, selectedTrainName]);

  const activeStations = transportMode === 'shinkansen' ? shinkansenStations : leStations;
  // Use activeStations instead of 'stations' for UI
  const stations = activeStations;

  const [from, setFrom] = useState(stations[0]?.id || 'TOKYO');
  const [to, setTo] = useState(stations[stations.length - 1]?.id || 'SHIN_OSAKA');

  useEffect(() => {
    if (stations.length > 0) {
      setFrom(stations[0].id);
      setTo(stations[stations.length - 1].id);
    }
  }, [selectedLineId, transportMode, selectedTrainName]); // Updated dependencies

  const [seatType, setSeatType] = useState('reserved');
  const [comparisons, setComparisons] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSelection, setActiveSelection] = useState<'from' | 'to'>('from');
  const [sortOrder, setSortOrder] = useState<SortOrder>('manual');
  const listEndRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!listContainerRef.current) return;
    try {
      setLoading(true);
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(listContainerRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: theme === 'retro' ? '#000000' : '#ffffff',
        scale: 2,
        // Force full scroll capture
        windowWidth: listContainerRef.current.scrollWidth + 100,
        windowHeight: listContainerRef.current.scrollHeight + 100,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('itinerary-list');
          if (el) {
            el.style.overflow = 'visible';
            el.style.height = 'auto';
            el.style.maxHeight = 'none';
            el.style.backdropFilter = 'none';
            el.style.transform = 'none';
            // Ensure visible background
            if (theme === 'dark') el.style.backgroundColor = '#0f172a'; // slate-900
            if (theme === 'light') el.style.backgroundColor = '#ffffff';
            if (theme === 'retro') el.style.backgroundColor = '#000000';
          }
        }
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `shinkansen-itinerary-${Date.now()}.png`;
      link.href = url;
      link.click();
    } catch (e: any) {
      console.error('Screenshot failed:', e);
      alert(`画像の保存に失敗しました: ${e.message || 'Unknown Error'}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSwapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleAddNote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newNote: ComparisonResult = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      lineId: 'NOTE',
      from: '',
      to: '',
      seatType: '-',
      totalKm: 0,
      fare: 0,
      shinkansenFee: 0,
      total: 0,
      isFareSelected: true, // Count note amount by default
      isFeeSelected: false,
      isNote: true,
      noteTitle: '',
      noteColor: 'amber',
      trainName: 'Note',
      customMemo: ''
    };
    setComparisons(prev => [newNote, ...prev]);
  };

  const updateComparisonItem = (id: string, field: string, value: any) => {
    setComparisons(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (field === 'title') return { ...item, noteTitle: value };
      if (field === 'amount') {
        const val = Number(value);
        return { ...item, fare: val, total: val };
      }
      if (field === 'color') return { ...item, noteColor: value };
      if (field === 'memo') return { ...item, customMemo: value };
      // Fallback for direct property update
      return { ...item, [field]: value };
    }));
  };

  const handleAddLimitedExpressRoute = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent accidental form submission
    e.stopPropagation(); // Stop event bubbling
    // Limited Express Calculation Logic

    try {
      setLoading(true);
      const train = TRAIN_MASTER.find(t => t.name === selectedTrainName);
      if (!train) throw new Error('Selected train not found');

      let calcDistance = manualDistance;
      let fromStationName = 'Starting Point';
      let toStationName = 'Destination';

      if (transportMode === 'limited_express' && stations.length > 0) {
        const s1 = stations.find(s => s.id === from);
        const s2 = stations.find(s => s.id === to);
        if (s1 && s2 && s1.distance !== undefined && s2.distance !== undefined) {
          const d = Math.abs(s2.distance - s1.distance);
          calcDistance = Math.round(d * 10) / 10;
          fromStationName = s1.name;
          toStationName = s2.name;
        }
      }

      if (calcDistance <= 0) throw new Error('Distance must be greater than 0');

      const fee = calcLimitedExpressFee(train, calcDistance, seatType as any);

      const mockFare = 0;

      const newComparison: ComparisonResult = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        lineId: train.lineDefId || 'LIMITED_EXPRESS',
        trainName: train.name,
        from: fromStationName,
        to: toStationName,
        seatType,
        totalKm: calcDistance,
        fare: mockFare,
        shinkansenFee: fee,
        total: mockFare + fee,
        details: [{ type: 'fee', description: `${train.name} ${seatType}`, amount: fee }],
        isFareSelected: false,
        isFeeSelected: true,
        transportMode: 'limited_express'
      };

      setComparisons(prev => [newComparison, ...prev]);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll ...
  useEffect(() => {
    if (sortOrder === 'manual') {
      listContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [comparisons, sortOrder]);

  const handleStationSelect = (id: string) => {
    // ...
    if (activeSelection === 'from') {
      setFrom(id);
      setActiveSelection('to');
    } else {
      setTo(id);
    }
  };

  // ABSTRACTED CALCULATION
  const executeCalculation = async (fromId: string, toId: string, seat: string, lineId: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromId, to: toId, seatType: seat, lineId: lineId }),
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();

      const newItem: ComparisonResult = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        lineId: lineId,
        from: fromId,
        to: toId,
        seatType: seat,
        totalKm: data.totalKm,
        fare: data.fare,
        shinkansenFee: data.shinkansenFee,
        total: data.total,
        details: data.details,
        isFareSelected: false,
        isFeeSelected: true,
        transportMode: 'shinkansen'
      };

      setComparisons(prev => [newItem, ...prev]);

      // Update GUI state to match (optional)
      if (lineId === selectedLineId) {
        setFrom(fromId);
        setTo(toId);
        setSeatType(seat);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleAddRoute = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    const success = await executeCalculation(from, to, seatType, selectedLineId);
    if (!success) alert('Error calculating fare');
    setLoading(false);
  };


  const removeComparison = (id: string) => {
    setComparisons(prev => prev.filter(c => c.id !== id));
  };

  // Toggle Function
  const toggleItemSelection = (id: string, type: 'fare' | 'fee') => {
    setComparisons(prev => prev.map(item => {
      if (item.id !== id) return item;
      return {
        ...item,
        isFareSelected: type === 'fare' ? !item.isFareSelected : item.isFareSelected,
        isFeeSelected: type === 'fee' ? !item.isFeeSelected : item.isFeeSelected
      };
    }));
  };

  // Batch Selection
  const applyBatchSelection = (mode: 'all' | 'fee_only' | 'fare_only') => {
    setComparisons(prev => prev.map(item => ({
      ...item,
      isFareSelected: mode === 'all' || mode === 'fare_only',
      isFeeSelected: mode === 'all' || mode === 'fee_only'
    })));
  };

  const getStationName = (id: string) => stations.find((s: any) => s.id === id)?.name || id;

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (sortOrder !== 'manual') return;
    setComparisons(prev => {
      const newArr = [...prev];
      if (direction === 'up' && index > 0) {
        [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
      } else if (direction === 'down' && index < newArr.length - 1) {
        [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      }
      return newArr;
    });
  };

  const sortedComparisons = [...comparisons].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.total - b.total;
    if (sortOrder === 'price-desc') return b.total - a.total;
    return 0; // Manual order
  });

  const getSeatColor = (type: string) => {
    if (type === 'gran_class') return 'bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.5)]';
    if (type === 'green') return 'bg-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.5)]';
    if (type === 'reserved') return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
    return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  };

  const getLineColor = (lineId: string) => {
    switch (lineId) {
      case 'TOKAIDO_SANYO_KYUSHU':
        return 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]';
      case 'TOHOKU_HOKKAIDO':
        return 'bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]';
      case 'JOETSU':
        return 'bg-pink-600 shadow-[0_0_10px_rgba(219,39,119,0.5)]';
      case 'HOKURIKU':
        return 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]';
      case 'AKITA':
        return 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]'; // Komachi Pink
      case 'YAMAGATA':
        return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'; // Tsubasa Orange
      default:
        // Fallback or Generic
        return 'bg-slate-600 shadow-[0_0_10px_rgba(71,85,105,0.5)]';
    }
  };

  const getLimitedExpressColor = (trainName: string) => {
    const train = TRAIN_MASTER.find(t => t.name === trainName);
    if (!train) return 'bg-slate-500';
    switch (train.company) {
      case 'JR_HOKKAIDO': return 'bg-lime-600 shadow-[0_0_10px_rgba(101,163,13,0.5)]';
      case 'JR_EAST': return 'bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]';
      case 'JR_TOKAI': return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'; // JR Central Orange
      case 'JR_WEST': return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
      case 'JR_SHIKOKU': return 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]';
      case 'JR_KYUSHU': return 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]';
      default: return 'bg-slate-500';
    }
  };

  // Grand Total Calculation (Based on Checkboxes)
  const grandTotal = comparisons.reduce((sum, item) => {
    let itemSum = 0;
    if (item.isFareSelected) itemSum += item.fare;
    if (item.isFeeSelected) itemSum += item.shinkansenFee;
    return sum + itemSum;
  }, 0);

  // Generate Text Summary
  const handleCopySummary = () => {
    const text = comparisons.map(c => {
      const parts = [];
      if (c.isFareSelected) parts.push(`Fare:¥${c.fare.toLocaleString()}`);
      if (c.isFeeSelected) parts.push(`Fee:¥${c.shinkansenFee.toLocaleString()}`);
      const lineTotal = (c.isFareSelected ? c.fare : 0) + (c.isFeeSelected ? c.shinkansenFee : 0);
      return `${getStationName(c.from)}→${getStationName(c.to)}: ¥${lineTotal.toLocaleString()} (${parts.join(', ')})`;
    }).join('\n') + `\n\nSelected Total: ¥${grandTotal.toLocaleString()}`;

    navigator.clipboard.writeText(text);
    alert('選択された金額の情報をコピーしました！');
  };

  return (
    <div className={`min-h-screen md:h-screen select-none overflow-y-auto md:overflow-hidden flex flex-col md:flex-row transition-colors duration-500 ${currentTheme.appBg} ${currentTheme.font} ${currentTheme.textMain}`}>

      {/* Background Ambience */}
      {theme !== 'retro' && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[100px] mix-blend-multiply filter opacity-70 animate-blob ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-200/30'}`}></div>
          <div className={`absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000 ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-200/30'}`}></div>
          <div className={`absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[100px] mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000 ${theme === 'dark' ? 'bg-pink-900/20' : 'bg-pink-200/30'}`}></div>
        </div>
      )}

      {/* LEFT PANEL: MAP & INPUTS */}
      <div className={`w-full md:w-[380px] shrink-0 z-20 relative h-auto md:h-full flex flex-col border-r backdrop-blur-xl shadow-[5px_0_30px_rgba(0,0,0,0.05)] transition-all duration-300 ${currentTheme.panelLeft}`}>
        {/* Header */}
        <div className={`p-4 shrink-0 border-b flex justify-between items-start backdrop-blur-sm ${theme === 'light' ? 'bg-white/40 border-white/40' : (theme === 'dark' ? 'bg-slate-900/40 border-white/10' : 'bg-black border-green-500/50')}`}>
          <div>
            <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
              <span className="text-2xl">🚄</span> {t.appTitle}
            </h1>
            <p className={`text-[10px] uppercase font-bold tracking-widest ml-9 opacity-50 ${currentTheme.textSub}`}>{t.appSubtitle}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(l => l === 'ja' ? 'en' : 'ja')}
              className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-colors ${theme === 'retro' ? 'border-green-800 text-green-600 hover:bg-green-900' : 'border-slate-300 text-slate-500 hover:bg-slate-100'}`}
            >
              {language === 'ja' ? 'English' : '日本語'}
            </button>

            {/* Theme Toggle */}
            <div className={`flex gap-1 p-1 rounded-full ${theme === 'retro' ? 'border border-green-500/50' : 'bg-slate-200/50 dark:bg-slate-800/50'}`}>
              <button onClick={() => setTheme('light')} className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] transition-all ${theme === 'light' ? 'bg-white shadow text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}>☀</button>
              <button onClick={() => setTheme('dark')} className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] transition-all ${theme === 'dark' ? 'bg-slate-700 shadow text-white' : 'text-slate-400 hover:text-slate-600'}`}>☾</button>
              <button onClick={() => setTheme('retro')} className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] transition-all ${theme === 'retro' ? 'bg-green-900 shadow text-green-400' : 'text-slate-400 hover:text-green-600'}`}>📟</button>
            </div>
          </div>
        </div>

        {/* Scrollable Area */}
        {theme === 'retro' ? (
          <RetroTerminal
            stations={stations}
            lines={LINE_OPTIONS}
            currentLineId={selectedLineId}
            onCalculate={executeCalculation}
            onLineChange={setSelectedLineId}
          />
        ) : (
          <div className="flex-1 overflow-visible md:overflow-y-auto p-4 space-y-4">

            {/* 1. Mode & Line Selector */}
            <div className="space-y-3">
              {/* Mode Toggle */}
              <div className={`flex p-1 rounded-lg ${(theme as string) === 'retro' ? 'bg-green-900/20 border border-green-900' : 'bg-slate-200/50'}`}>
                <button
                  type="button"
                  onClick={() => setTransportMode('shinkansen')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${transportMode === 'shinkansen' ? ((theme as string) === 'retro' ? 'bg-green-900 text-green-100' : 'bg-white shadow text-blue-600') : ((theme as string) === 'retro' ? 'text-green-800' : 'text-slate-500')}`}
                >
                  {t.modeShinkansen}
                </button>
                <button
                  onClick={() => setTransportMode('limited_express')}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${transportMode === 'limited_express' ? ((theme as string) === 'retro' ? 'bg-green-900 text-green-100' : 'bg-white shadow text-indigo-600') : ((theme as string) === 'retro' ? 'text-green-800' : 'text-slate-500')}`}
                >
                  {t.modeLimitedExpress}
                </button>
              </div>

              {transportMode === 'shinkansen' ? (
                <div className="relative group">
                  <div className={`absolute inset-0 rounded-lg blur opacity-50 transition duration-500 ${(theme as string) === 'retro' ? 'bg-green-900/40 opacity-0' : 'bg-gradient-to-r from-blue-50 to-purple-50 group-hover:opacity-100'}`}></div>
                  <select
                    title={t.trainName}
                    value={selectedLineId}
                    onChange={(e) => setSelectedLineId(e.target.value)}
                    className={`relative w-full rounded-lg pl-4 pr-10 py-3 text-xs outline-none font-bold shadow-sm backdrop-blur-md appearance-none cursor-pointer truncate transition-all ${currentTheme.inputBg} ${theme === 'light' ? 'focus:border-blue-400 focus:ring-2 focus:ring-blue-100' : 'focus:border-white/50'}`}
                  >
                    {LINE_OPTIONS.map(l => (
                      <option key={l.id} value={l.id} className="text-slate-800 bg-white">{l.name}</option> // Keep options readable
                    ))}
                  </select>
                  <div className={`absolute right-3 top-3 pointer-events-none ${(theme as string) === 'retro' ? 'text-green-500' : 'text-slate-500'}`}>▼</div>
                </div>
              ) : (
                <div className="relative group">
                  <select
                    title={t.trainName}
                    value={selectedTrainName}
                    onChange={(e) => setSelectedTrainName(e.target.value)}
                    className={`relative w-full rounded-lg pl-4 pr-10 py-3 text-xs outline-none font-bold shadow-sm backdrop-blur-md appearance-none cursor-pointer truncate transition-all ${currentTheme.inputBg} ${theme === 'light' ? 'focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100' : 'focus:border-white/50'}`}
                  >
                    <optgroup label="北海道 (JR Hokkaido)">
                      {TRAIN_MASTER.filter(t => t.company === 'JR_HOKKAIDO').map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </optgroup>
                    <optgroup label="東日本 (JR East)">
                      {TRAIN_MASTER.filter(t => t.company === 'JR_EAST').map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </optgroup>
                    <optgroup label="東海 (JR Central)">
                      {TRAIN_MASTER.filter(t => t.company === 'JR_TOKAI').map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </optgroup>
                    <optgroup label="西日本 (JR West)">
                      {TRAIN_MASTER.filter(t => t.company === 'JR_WEST').map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </optgroup>
                    <optgroup label="四国 (JR Shikoku)">
                      {TRAIN_MASTER.filter(t => t.company === 'JR_SHIKOKU').map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </optgroup>
                    <optgroup label="九州 (JR Kyushu)">
                      {TRAIN_MASTER.filter(t => t.company === 'JR_KYUSHU').map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </optgroup>
                  </select>
                  <div className={`absolute right-3 top-3 pointer-events-none ${(theme as string) === 'retro' ? 'text-green-500' : 'text-slate-500'}`}>▼</div>
                </div>
              )}
            </div>

            {/* 2. Route Map OR Distance Input OR Station Select (LE) */}
            {transportMode === 'shinkansen' ? (
              <div className={`rounded-xl shadow-inner p-3 shrink-0 backdrop-blur-sm relative overflow-hidden transition-colors ${currentTheme.cardBg}`}>
                {/* ... existing map ... */}
                <div className={`absolute inset-0 opacity-[0.03] [background-size:10px_10px] ${(theme as string) === 'retro' ? 'bg-[radial-gradient(#0f0_1px,transparent_1px)]' : 'bg-[radial-gradient(#000_1px,transparent_1px)]'}`}></div>

                {/* Explicit FROM/TO Toggle Buttons */}
                <div className="flex items-center gap-2 mb-2 shrink-0 z-10 relative">
                  <button
                    type="button"
                    onClick={() => setActiveSelection('from')}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-xs border transition-all relative overflow-hidden group ${activeSelection === 'from' ? ((theme as string) === 'retro' ? 'bg-green-900 text-green-100 border-green-500' : 'bg-blue-500/90 text-white border-blue-400 shadow-lg') : ((theme as string) === 'retro' ? 'bg-black text-green-700 border-green-900 hover:border-green-500' : 'bg-white/50 text-slate-500 border-white/60 hover:bg-white/80')}`}
                  >
                    <div className="relative z-10">
                      {t.from}
                      <div className="text-[9px] font-normal opacity-90 truncate mt-0.5">{getStationName(from)}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleSwapStations}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${(theme as string) === 'retro' ? 'bg-black border-green-700 text-green-500 hover:bg-green-900' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-500 shadow-sm'}`}
                    title="Swap Stations"
                  >
                    ⇄
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSelection('to')}
                    className={`flex-1 py-1.5 rounded-lg font-bold text-xs border transition-all relative overflow-hidden group ${activeSelection === 'to' ? ((theme as string) === 'retro' ? 'bg-amber-900 text-amber-100 border-amber-500' : 'bg-amber-500/90 text-white border-amber-400 shadow-lg') : ((theme as string) === 'retro' ? 'bg-black text-green-700 border-green-900 hover:border-amber-500' : 'bg-white/50 text-slate-500 border-white/60 hover:bg-white/80')}`}
                  >
                    <div className="relative z-10">
                      {t.to}
                      <div className="text-[9px] font-normal opacity-90 truncate mt-0.5">{getStationName(to)}</div>
                    </div>
                  </button>
                </div>

                <div className={`relative overflow-hidden h-[140px] rounded-lg shadow-inner ${(theme as string) === 'retro' ? 'bg-black border border-green-900' : 'bg-white/20 border border-white/30'}`}>
                  <RouteMap
                    stations={stations}
                    from={from}
                    to={to}
                    activeSelection={activeSelection}
                    onSelect={(id) => {
                      if (activeSelection === 'from') setFrom(id);
                      else setTo(id);
                    }}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ) : (
              /* Limited Express: Show Station Dropdowns instead of Map (if data exists) or Distance Input */
              stations.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`flex-1 p-3 rounded-lg border shadow-sm backdrop-blur-sm ${currentTheme.cardBg}`}>
                      <label className={`text-[10px] font-bold mb-1 block ${currentTheme.textSub}`}>{t.from}</label>
                      <select
                        title={t.from}
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className={`w-full bg-transparent font-bold text-sm outline-none ${currentTheme.textMain}`}
                      >
                        {stations.map(s => <option key={s.id} value={s.id} className="text-slate-800 bg-white">{s.name}</option>)}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleSwapStations}
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all mt-4 ${(theme as string) === 'retro' ? 'bg-black border-green-700 text-green-500 hover:bg-green-900' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-500 shadow-sm'}`}
                      title="Swap Stations"
                    >
                      ⇄
                    </button>

                    <div className={`flex-1 p-3 rounded-lg border shadow-sm backdrop-blur-sm ${currentTheme.cardBg}`}>
                      <label className={`text-[10px] font-bold mb-1 block ${currentTheme.textSub}`}>{t.to}</label>
                      <select
                        title={t.to}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className={`w-full bg-transparent font-bold text-sm outline-none ${currentTheme.textMain}`}
                      >
                        {stations.map(s => <option key={s.id} value={s.id} className="text-slate-800 bg-white">{s.name}</option>)}
                      </select>
                    </div>
                  </div>


                  {/* Display Distance */}
                  <div className="text-center text-xs font-bold opacity-70 mt-2">
                    Distance: {
                      stations.find(s => s.id === to)?.distance !== undefined && stations.find(s => s.id === from)?.distance !== undefined
                        ? (Math.round(Math.abs((stations.find(s => s.id === to)?.distance || 0) - (stations.find(s => s.id === from)?.distance || 0)) * 10) / 10) + ' km'
                        : 'Select Stations'
                    }
                  </div>
                </div>
              ) : (
                /* Fallback to Manual Distance */
                <div className={`p-4 rounded-xl border shadow-sm backdrop-blur-sm ${currentTheme.cardBg}`}>
                  <label className={`text-xs font-bold mb-2 block ${currentTheme.textSub}`}>Distance (km)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="e.g. 120"
                      aria-label={t.distance}
                      value={manualDistance}
                      onChange={(e) => setManualDistance(Number(e.target.value))}
                      min={1}
                      max={1500}
                      className={`w-full text-lg font-bold px-4 py-3 rounded-lg outline-none transition-all ${currentTheme.inputBg} ${theme === 'light' ? 'focus:ring-2 focus:ring-indigo-100' : ''}`}
                    />
                    <span className={`font-bold ${currentTheme.textMain}`}>km</span>
                  </div>
                  <div className="mt-2 text-xs text-red-400">Station data not available for this train.</div>
                </div>
              )
            )
            }

            {/* 3. Dropdowns (Shinkansen Only - LE handled above) */}
            {
              transportMode === 'shinkansen' && (
                <div className="grid grid-cols-2 gap-3">
                  {/* ... existing shinkansen dropdowns ... */}
                  <div className={`p-3 rounded-lg border shadow-sm backdrop-blur-sm ${currentTheme.cardBg}`}>
                    <label className={`text-[10px] font-bold mb-1 block ${currentTheme.textSub}`}>FROM</label>
                    <select
                      title="Select From Station"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className={`w-full bg-transparent font-bold text-sm outline-none ${currentTheme.textMain}`}
                    >
                      {stations.map(s => <option key={s.id} value={s.id} className="text-slate-800 bg-white">{s.name}</option>)}
                    </select>
                  </div>
                  <div className={`p-3 rounded-lg border shadow-sm backdrop-blur-sm ${currentTheme.cardBg}`}>
                    <label className={`text-[10px] font-bold mb-1 block ${currentTheme.textSub}`}>TO</label>
                    <select
                      title="Select To Station"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className={`w-full bg-transparent font-bold text-sm outline-none ${currentTheme.textMain}`}
                    >
                      {stations.map(s => <option key={s.id} value={s.id} className="text-slate-800 bg-white">{s.name}</option>)}
                    </select>
                  </div>
                </div>
              )
            }

            {/* 4. Seat Types */}
            <div className={`p-1.5 rounded-lg border shadow-sm backdrop-blur-sm ${currentTheme.cardBg}`}>
              <div className="flex gap-1">
                {['unreserved', 'reserved', 'green'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSeatType(type)}
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all relative overflow-hidden 
                    ${seatType === type
                        ? ((theme as string) === 'retro' ? 'text-black bg-green-500' : 'text-blue-600 bg-white shadow-sm')
                        : ((theme as string) === 'retro' ? 'text-green-800 hover:text-green-500' : 'text-slate-400 hover:text-slate-600 hover:bg-white/30')}`}
                  >
                    {type === 'unreserved' ? t.seatFree : type === 'reserved' ? t.seatReserved : t.seatGreen}
                  </button>
                ))}
                {(selectedLineId === 'TOHOKU_HOKKAIDO' || selectedLineId === 'HOKURIKU') && (
                  <button
                    type="button"
                    onClick={() => setSeatType('gran_class')}
                    className={`flex-1 py-1 rounded-md text-xs font-bold transition-all 
                    ${seatType === 'gran_class'
                        ? ((theme as string) === 'retro' ? 'text-black bg-amber-500' : 'text-amber-600 bg-amber-50 shadow-sm')
                        : ((theme as string) === 'retro' ? 'text-amber-900 hover:text-amber-500' : 'text-slate-400 hover:text-slate-600 hover:bg-white/30')}`}
                  >
                    {t.seatGran}
                  </button>
                )}
              </div>
            </div>

          </div >
        )}
      </div >


      {/* CENTRAL ACTION BUTTON */}
      {/* CENTRAL ACTION BUTTON - FLOW POSITION ON MOBILE, FIXED ON DESKTOP */}
      <div className="relative z-50 py-4 flex justify-center md:fixed md:left-[380px] md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:-translate-x-1/2 md:py-0 md:block">
        <div className="relative">
          <button
            onClick={(e) => transportMode === 'shinkansen' ? handleAddRoute(e) : handleAddLimitedExpressRoute(e)}
            disabled={loading}
            className={`
              group relative flex items-center justify-center w-16 h-16 md:w-14 md:h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              ${theme === 'retro'
                ? 'bg-black border-2 border-green-500 text-green-500 hover:bg-green-900 hover:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-4 border-white/20 hover:border-white/40 shadow-blue-900/30'}
            `}
            title="Add Route"
          >
            <span className="text-3xl md:text-2xl font-bold leading-none mb-1 group-hover:block hidden">＋</span>
            <span className="text-3xl md:text-2xl font-bold leading-none mb-1 group-hover:hidden">➜</span>
          </button>

          {/* Add Note Button (Positioned relative to main button) */}
          <div className="absolute top-0 right-[-60px] md:right-auto md:top-auto md:bottom-[-60px] md:left-1/2 md:-translate-x-1/2 md:mt-4">
            <button
              onClick={handleAddNote}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 ${theme === 'retro' ? 'bg-black border border-green-700 text-green-500' : 'bg-white text-slate-400 hover:text-amber-500'}`}
              title={t.addMemo}
            >
              <span className="text-xl">✎</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: LIST */}
      <div className={`flex-1 flex flex-col h-auto md:h-full relative z-10 overflow-visible md:overflow-hidden transition-colors ${currentTheme.panelRight}`}>

        {/* Header Actions */}
        <div className="p-6 pb-4 flex justify-end items-end">
          {/* Title removed per user request */}
          <div className="flex items-center gap-3">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              title={t.sortManual}
              className={`text-xs font-bold px-2 py-1.5 rounded-md border outline-none cursor-pointer transition-all ${theme === 'retro' ? 'bg-black text-green-500 border-green-700' : 'bg-white border-slate-200 text-slate-600'}`}
            >
              <option value="manual">{t.sortManual}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
            </select>
            {comparisons.length > 0 && (
              <button onClick={() => setComparisons([])} className={`text-xs font-bold px-3 py-1.5 rounded-md border border-transparent transition-all ${theme === 'retro' ? 'text-green-600 hover:text-red-500 hover:border-red-500' : 'text-red-500 hover:bg-red-50/50 hover:border-red-100'}`}>{t.clearAll}</button>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-visible md:overflow-auto px-4 md:px-6 pb-4 md:pb-28">
          {comparisons.length === 0 ? (
            <div className={`h-full flex flex-col items-center justify-center ${currentTheme.textSub} opacity-50`}>
              <div className="text-6xl mb-4 opacity-20">🚄</div>
              <p className="text-lg font-bold">{t.emptyListTitle}</p>
              <p className="text-sm opacity-70">{t.emptyListDesc}</p>
            </div>
          ) : (
            <div id="itinerary-list" ref={listContainerRef} className={`backdrop-blur-md rounded-xl shadow-xl border md:overflow-hidden ${currentTheme.cardBg}`}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-xs uppercase tracking-wider ${theme === 'light' ? 'border-slate-200/60 bg-white/30 text-slate-500' : (theme === 'dark' ? 'border-white/10 bg-slate-900/40 text-slate-400' : 'border-green-800 bg-black text-green-600')}`}>
                    <th className="p-3 md:p-5 font-bold">{t.listRoute}</th>
                    <th className="p-3 md:p-5 font-bold">{t.listSeat}</th>
                    <th className={`hidden md:table-cell p-3 md:p-5 font-bold text-right ${theme === 'retro' ? 'text-amber-500' : 'text-amber-700 bg-amber-50/30'}`}>{t.listFee}</th>
                    <th className="hidden md:table-cell p-3 md:p-5 font-bold text-right">{t.listFare}</th>
                    <th className="p-3 md:p-5 font-bold text-right">{t.listTotal}</th>
                    <th className="p-3 md:p-5 text-center w-10"></th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'light' ? 'divide-slate-100/50' : (theme === 'dark' ? 'divide-white/5' : 'divide-green-900')}`}>
                  {sortedComparisons.map((item, index) => (
                    <tr key={item.id} className={`group transition-colors duration-200 ${theme === 'retro' ? 'hover:bg-green-900/20' : 'hover:bg-white/10'}`}>
                      <td className="p-3 md:p-5">
                        <div className="flex items-center gap-3">
                          {/* Line Color Indicator */}
                          <div className={`w-1 md:w-1.5 h-6 md:h-8 rounded-full ${item.isNote ? 'bg-amber-400' : (item.transportMode === 'limited_express' ? getLimitedExpressColor(item.trainName || '') : getLineColor(item.lineId))}`} title={item.isNote ? 'Memo' : (item.transportMode === 'limited_express' ? item.trainName : (LINE_OPTIONS.find(l => l.id === item.lineId)?.name || ''))}></div>
                          <div className="flex-1">
                            {item.isNote ? (
                              <input
                                type="text"
                                value={item.noteTitle}
                                onChange={(e) => updateComparisonItem(item.id, 'title', e.target.value)}
                                className={`w-full bg-transparent font-bold border-b border-transparent hover:border-slate-300 focus:border-amber-400 outline-none transition-colors ${currentTheme.textMain}`}
                                placeholder="Type a memo..."
                              />
                            ) : (
                              <div>
                                <div className={`flex items-center gap-2 font-bold text-xs md:text-sm ${currentTheme.textMain}`}>
                                  <span>{item.transportMode === 'limited_express' ? item.from : getStationName(item.from)}</span>
                                  <span className="opacity-50">→</span>
                                  <span>{item.transportMode === 'limited_express' ? item.to : getStationName(item.to)}</span>
                                </div>
                                <div className={`flex items-center gap-2 text-[10px] mt-0.5 md:mt-1 font-medium ${currentTheme.textSub}`}>
                                  {item.transportMode === 'limited_express' ? (
                                    <span className={`px-1.5 py-0.5 rounded-sm border font-bold ${(theme as string) === 'retro'
                                      ? 'bg-black text-green-500 border-green-500'
                                      : (theme === 'dark'
                                        ? 'bg-indigo-900 text-indigo-100 border-indigo-700'
                                        : 'bg-indigo-100 text-indigo-900 border-indigo-200')
                                      }`}>
                                      {item.trainName}
                                    </span>
                                  ) : (
                                    <span className="opacity-80">
                                      {LINE_OPTIONS.find(l => l.id === item.lineId)?.name}
                                    </span>
                                  )}
                                  <span className="opacity-50">|</span>
                                  <span>{item.totalKm}km</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 md:p-5">
                        {!item.isNote && (
                          <span className={`px-2 md:px-2.5 py-0.5 md:py-1 rounded-md text-[9px] md:text-[10px] font-bold shadow-sm border ${(theme as string) === 'retro'
                            ? 'bg-black border-green-700 text-green-500'
                            : (item.seatType === 'green' ? 'bg-emerald-100/80 text-emerald-700 border-emerald-200' : (item.seatType === 'reserved' ? 'bg-blue-100/80 text-blue-700 border-blue-200' : item.seatType === 'gran_class' ? 'bg-amber-100/80 text-amber-800 border-amber-200' : 'bg-slate-100/80 text-slate-600 border-slate-200'))
                            }`}>
                            {item.seatType === 'unreserved' ? 'JO' : item.seatType === 'reserved' ? 'RSV' : item.seatType === 'green' ? 'GRN' : 'G.CLS'}
                          </span>
                        )}
                      </td>

                      {/* EXPRESS FEE CHECKBOX */}
                      <td className={`hidden md:table-cell p-3 md:p-5 text-right transition-colors ${(theme as string) === 'retro' ? 'hover:bg-amber-900/10' : 'bg-amber-50/10 hover:bg-amber-50/20'}`}>
                        {!item.isNote && (
                          <div className="flex items-center justify-end gap-3">
                            <div className={`text-xl font-black tracking-tight ${item.isFeeSelected ? ((theme as string) === 'retro' ? 'text-amber-500' : 'text-amber-600') : 'opacity-30 line-through'}`}>
                              ¥{item.shinkansenFee.toLocaleString()}
                            </div>
                            <div className="flex flex-col items-center">
                              <input
                                type="checkbox"
                                checked={item.isFeeSelected}
                                onChange={() => toggleItemSelection(item.id, 'fee')}
                                className="w-5 h-5 cursor-pointer rounded border-slate-300 accent-amber-500"
                                title="Toggle Fee"
                              />
                            </div>
                          </div>
                        )}
                      </td>

                      {/* FARE CHECKBOX */}
                      <td className={`hidden md:table-cell p-3 md:p-5 text-right ${theme === 'retro' ? 'text-green-600' : 'text-slate-500 dark:text-slate-400'}`}>
                        <div className="flex items-center justify-end gap-3">
                          {item.isNote ? (
                            <div className="flex items-center gap-1 bg-white/50 rounded px-2">
                              <span className="text-xs opacity-50">¥</span>
                              <input
                                type="number"
                                value={item.fare}
                                onChange={(e) => updateComparisonItem(item.id, 'amount', e.target.value)}
                                className={`w-20 text-right bg-transparent border-none outline-none font-medium text-base ${currentTheme.textMain}`}
                              />
                            </div>
                          ) : (
                            <div className={`font-medium text-base ${item.isFareSelected ? '' : 'opacity-30 line-through'}`}>
                              ¥{item.fare.toLocaleString()}
                            </div>
                          )}
                          <div className="flex flex-col items-center">
                            <input
                              type="checkbox"
                              checked={item.isFareSelected}
                              onChange={() => toggleItemSelection(item.id, 'fare')}
                              className="w-5 h-5 cursor-pointer rounded border-slate-300 accent-blue-500"
                              title={item.isNote ? "Include Amount" : "Toggle Fare"}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="p-3 md:p-5 text-right">
                        <div className={`font-bold text-base md:text-xl tracking-tight ${currentTheme.textMain}`}>
                          ¥{((item.isFareSelected ? item.fare : 0) + (item.isFeeSelected ? item.shinkansenFee : 0)).toLocaleString()}
                        </div>
                      </td>

                      <td className="p-3 md:p-5 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => removeComparison(item.id)}
                            className={`transition-colors text-lg leading-none mb-1 ${currentTheme.textSub} hover:text-red-500`}
                            title="Delete"
                          >
                            ×
                          </button>

                          {sortOrder === 'manual' && (
                            <div className="flex flex-col gap-0.5 opacity-50 hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => moveItem(index, 'up')}
                                disabled={index === 0}
                                className={`text-[10px] px-1 py-0.5 rounded hover:bg-black/10 disabled:opacity-20 ${currentTheme.textMain}`}
                              >
                                ▲
                              </button>
                              <button
                                onClick={() => moveItem(index, 'down')}
                                disabled={index === sortedComparisons.length - 1}
                                className={`text-[10px] px-1 py-0.5 rounded hover:bg-black/10 disabled:opacity-20 ${currentTheme.textMain}`}
                              >
                                ▼
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer: Grand Total */}
        {comparisons.length > 0 && (
          <div className={`relative md:absolute md:bottom-0 left-0 right-0 border-t p-4 md:p-6 shadow-[0_-5px_30px_rgba(0,0,0,0.05)] z-20 flex flex-col md:flex-row justify-between items-center gap-4 ${(theme as string) === 'light' ? 'bg-white border-slate-200' : ((theme as string) === 'dark' ? 'bg-slate-900 border-white/10' : 'bg-black border-green-900')}`}>

            {/* iOS 26 Style Footer Controls */}
            <div className={`flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full w-full md:w-auto backdrop-blur-xl ${(theme as string) === 'retro' ? 'bg-green-900/20 border border-green-900' : 'bg-slate-200/60 dark:bg-white/5 border border-white/10'}`}>
              <button onClick={() => applyBatchSelection('all')} className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all active:scale-95 ${(theme as string) === 'retro' ? 'text-green-400 hover:bg-green-900/50' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10'}`}>{t.selectAll}</button>
              <div className="w-px h-4 my-auto bg-slate-300 dark:bg-white/10 opacity-50"></div>
              <button onClick={() => applyBatchSelection('fee_only')} className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all active:scale-95 ${(theme as string) === 'retro' ? 'text-amber-500 hover:bg-green-900/50' : 'text-amber-600 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-white/10'}`}>{t.feeOnly}</button>
              <div className="w-px h-4 my-auto bg-slate-300 dark:bg-white/10 opacity-50"></div>
              <button onClick={() => applyBatchSelection('fare_only')} className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all active:scale-95 ${(theme as string) === 'retro' ? 'text-blue-400 hover:bg-green-900/50' : 'text-blue-600 dark:text-blue-400 hover:bg-white/50 dark:hover:bg-white/10'}`}>{t.fareOnly}</button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
              {/* Total Display */}
              <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between w-full md:w-auto gap-4">
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60 ${currentTheme.textSub}`}>
                  {t.selectedTotal}
                </span>
                <span className={`text-3xl md:text-4xl font-black tracking-tighter tabular-nums ${currentTheme.textMain} filter drop-shadow-sm`}>
                  <span className="text-lg align-top opacity-50 mr-1">¥</span>{grandTotal.toLocaleString()}
                </span>
              </div>

              {/* Action Buttons (iOS 26 Style) */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Screenshot Button */}
                <button
                  onClick={handleDownloadImage}
                  className={`
                    relative group overflow-hidden flex-1 md:flex-none
                    h-12 px-6 rounded-full
                    flex items-center justify-center gap-2
                    backdrop-blur-2xl transition-all duration-300
                    active:scale-90 hover:shadow-lg
                    ${(theme as string) === 'retro'
                      ? 'bg-black/80 border border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'bg-white/80 dark:bg-slate-800/80 border border-white/60 dark:border-white/10 text-slate-700 dark:text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-white'}
                  `}
                >
                  <span className="text-xl filter drop-shadow-md">📸</span>
                </button>

                {/* Copy Button */}
                <button
                  onClick={handleCopySummary}
                  className={`
                    relative group overflow-hidden flex-1 md:flex-none
                    h-12 px-8 rounded-full
                    flex items-center justify-center gap-2
                    backdrop-blur-2xl transition-all duration-300
                    active:scale-90 hover:shadow-lg
                    ${(theme as string) === 'retro'
                      ? 'bg-green-600/90 border border-green-400/50 text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                      : 'bg-gradient-to-b from-blue-500 to-blue-600 text-white border border-blue-400/30 shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.6)]'}
                  `}
                >
                  <span className="text-lg">📋</span>
                  <span className="font-bold text-sm tracking-wide group-hover:tracking-wider transition-all">{t.copy}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
