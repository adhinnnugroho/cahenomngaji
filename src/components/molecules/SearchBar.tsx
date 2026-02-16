interface SearchBarProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchBar = ({
    onChange,
    placeholder = "Cari surah...",
}: SearchBarProps) => {
    return (
        <div className="relative w-full">
            <input
                type="search"
                className="block w-full rounded-2xl py-3.5 pl-5 pr-14 text-sm glass-strong text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all duration-300"
                placeholder={placeholder}
                onChange={onChange}
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2 gradient-primary w-10 h-10 rounded-xl flex items-center justify-center">
                <i className="bx bx-search text-xl text-white" />
            </div>
        </div>
    );
};

export default SearchBar;
