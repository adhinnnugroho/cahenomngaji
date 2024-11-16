type SearchInputPropsType = {
    'onChange'?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    'handleAnimationSearchInput'?: () => void,
    'placeholder'?: string
}

const SearchInput = ({ onChange, handleAnimationSearchInput, placeholder = "Search Surah" }: SearchInputPropsType) => {
    return (
        <div className="relative w-full transition-all duration-300 ease-in-out">
            <input
                type="search"
                className="block w-full rounded-lg p-4 text-sm bg-gray-700 border border-gray-700 transition-all duration-300 ease-in-out text-white"
                placeholder={placeholder} onChange={onChange} />
            <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white font-medium text-sm h-10 w-10 rounded-full bg-gray-500 transition-all duration-300 ease-in-out"
                onClick={handleAnimationSearchInput}
            >
                <i className="bx bx-search text-2xl" />
            </button>
        </div>
    );
};

export default SearchInput;
