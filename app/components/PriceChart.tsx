'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    data: {
        totalKm: number;
        fare: number;
        shinkansenFee: number;
        total: number;
    };
};

export default function PriceChart({ data }: Props) {
    const chartData = [
        {
            name: 'Total Cost',
            Fare: data.fare,
            'Express Fee': data.shinkansenFee,
        },
    ];

    return (
        <div className="h-64 w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-center">Cost Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip
                        formatter={(value: any) => `¥${Number(value).toLocaleString()}`}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Fare" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={40} />
                    <Bar dataKey="Express Fee" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
