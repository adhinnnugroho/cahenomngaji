import { useState } from "react";

export const useAnimationInputSearch = () => {
    const [animationSearchInput, setAnimationSearchInput] = useState(false);

    const handleAnimationSearchInput = () => {
        setAnimationSearchInput(!animationSearchInput);
    }

    return { animationSearchInput, handleAnimationSearchInput };
}