type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
};

export function Select({ label, className = '', children, ...props }: SelectProps) {
    return (
        <div className="w-full">
            {label && <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{label}</label>}
            <div className="relative group">
                <select
                    className={`
            w-full appearance-none bg-slate-800/50 backdrop-blur-sm border border-slate-700 
            text-white rounded-xl py-4 px-5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            transition-all cursor-pointer font-medium hover:bg-slate-800/80
            ${className}
          `}
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-hover:text-white transition-colors">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
