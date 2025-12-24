type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'modern-primary' | 'modern-secondary' | 'modern-ghost' | 'modern-danger';
    fullWidth?: boolean;
    subLabel?: string;
};

export function Button({
    children,
    variant = 'modern-primary',
    fullWidth = false,
    className = '',
    subLabel,
    ...props
}: ButtonProps) {

    const baseStyles = "relative overflow-hidden transition-all duration-300 font-medium flex flex-col items-center justify-center gap-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    // Modern Rounded Shapes
    const shapeStyles = "rounded-2xl";

    const variants = {
        'modern-primary': "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:brightness-110",
        'modern-secondary': "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-sm",
        'modern-ghost': "text-slate-400 hover:text-white hover:bg-white/5",
        'modern-danger': "bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/40 hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${shapeStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            <span className="block text-lg tracking-wide z-10">
                {children}
            </span>

            {subLabel && (
                <span className="block text-[10px] uppercase tracking-widest opacity-70 z-10">
                    {subLabel}
                </span>
            )}
        </button>
    );
}
