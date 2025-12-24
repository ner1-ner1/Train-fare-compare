type CardProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'glass' | 'solid';
};

export function Card({ children, className = '', variant = 'glass' }: CardProps) {
    const variants = {
        glass: "bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 transition-colors",
        solid: "bg-slate-800 border border-slate-700 shadow-xl"
    };

    return (
        <div className={`rounded-3xl ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
}
