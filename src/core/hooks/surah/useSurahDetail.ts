import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { surahApi } from "@/core/api/surah.api";
import type { Ayat, SurahDetail } from "@/core/api/types/surah.types";

const useSurahDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [ayatList, setAyatList] = useState<Ayat[]>([]);
    const [surah, setSurah] = useState<Partial<SurahDetail>>({});
    const [playingIndex, setPlayingIndex] = useState(-1);
    const [loadedCount, setLoadedCount] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const fetchSurahDetail = useCallback(
        async (surahId: string) => {
            try {
                const { data } = await surahApi.getById(Number(surahId));
                const detail = data.data;
                setTotalCount(detail.ayat.length);
                setAyatList(detail.ayat.slice(0, loadedCount));
                setSurah(detail);
            } catch (error) {
                console.error("Failed to fetch surah detail:", error);
            }
        },
        [loadedCount]
    );

    useEffect(() => {
        if (id) fetchSurahDetail(id as string);
    }, [id, fetchSurahDetail]);

    // Infinite scroll
    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight && loadedCount < totalCount) {
            setLoadedCount((prev) => prev + 5);
        }
    }, [loadedCount, totalCount]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Save last read
    useEffect(() => {
        if (!id || !surah.namaLatin) return;
        const timeout = setTimeout(() => {
            localStorage.setItem(
                "lastRead",
                JSON.stringify({
                    surahId: id,
                    surahName: surah.namaLatin,
                    lastReadTime: Date.now(),
                })
            );
        }, 1000);
        return () => clearTimeout(timeout);
    }, [id, surah.namaLatin]);

    // Audio playback
    const handleAudioPlayback = (index: number) => {
        const audioEl = document.getElementById(`audio-${index}`) as HTMLAudioElement;
        if (!audioEl) return;

        if (playingIndex === index) {
            if (audioEl.paused) {
                audioEl.play();
            } else {
                audioEl.pause();
                setPlayingIndex(-1);
            }
        } else {
            // Stop currently playing
            if (playingIndex >= 0) {
                const prev = document.getElementById(`audio-${playingIndex}`) as HTMLAudioElement;
                prev?.pause();
            }
            setPlayingIndex(index);
            audioEl.play();
            audioEl.onended = () => {
                const nextIdx = index + 1;
                if (nextIdx < ayatList.length) {
                    handleAudioPlayback(nextIdx);
                } else {
                    setPlayingIndex(-1);
                }
            };
        }
    };

    return {
        ayatList,
        surah,
        playingIndex,
        handleAudioPlayback,
    };
};

export default useSurahDetail;
