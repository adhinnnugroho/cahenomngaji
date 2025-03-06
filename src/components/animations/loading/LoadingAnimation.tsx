import { loadingSearchAnimations } from "@/components/index";

import Image from "next/image";

const LoadingAnimation = ({ isLoading, children }: any) => {
    return (
        <>
            {isLoading ? (
                <Image
                    src={loadingSearchAnimations}
                    width={330}
                    height={60}
                    alt="ramadhan"
                    className="mx-auto"
                    priority
                />
            ) : (
                children
            )}
        </>
    );
}

export default LoadingAnimation