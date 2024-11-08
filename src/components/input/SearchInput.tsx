type SearchInputPropsType = {
    'onChange'?: (e: any) => void,
    'handleAnimationSearchInput'?: () => void
}

const SearchInput = ({ onChange, handleAnimationSearchInput }: SearchInputPropsType) => {
    return (
        <div className="relative w-full transition-all duration-300 ease-in-out">
            <input
                type="search"
                className="block w-full rounded-lg p-4 text-sm text-gray-900 border border-gray-300 transition-all duration-300 ease-in-out"
                placeholder="Search Surah" onChange={onChange} />
            <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white font-medium text-sm h-10 w-10 rounded-full bg-blue-500 transition-all duration-300 ease-in-out"
                onClick={handleAnimationSearchInput}
            >
                <i className="bx bx-search text-2xl" />
            </button>
        </div>
    );
};

export default SearchInput;
