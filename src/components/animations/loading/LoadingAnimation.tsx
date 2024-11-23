import { loadingSearchAnimations } from "@/assets/loading"
import Image from "next/image";

export const LoadingAnimation = ({ isLoading, children }: any) => {
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