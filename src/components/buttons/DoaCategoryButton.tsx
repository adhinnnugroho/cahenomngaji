export const DoaCategoryButton = ({ onClick, title, CategoryDoa }: any) => {
    return (
        <>
            <button className={`py-2 px-3 rounded-lg ${CategoryDoa ? 'bg-purple-600 text-white' : 'bg-white text-black'}`} onClick={onClick}>
                <h2 className="text-xl font-semibold capitalize ">
                    {title}
                </h2>
            </button>
        </>
    )
}