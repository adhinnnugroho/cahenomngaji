import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { surahApi } from "@/core/api/surah.api";
import type { Ayat, SurahDetail } from "@/core/api/types/surah.types";

const BATCH_SIZE = 10;

const useSurahDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const [allAyat, setAllAyat] = useState<Ayat[]>([]);
    const [surah, setSurah] = useState<Partial<SurahDetail>>({});
    const [playingIndex, setPlayingIndex] = useState(-1);
    const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);

    // Persistent audio ref — survives re-renders and pagination
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playingIndexRef = useRef(-1);

    // Fetch once on mount / id change
    const fetchSurahDetail = useCallback(async (surahId: string) => {
        try {
            const { data } = await surahApi.getById(Number(surahId));
            const detail = data.data;
            setAllAyat(detail.ayat);
            setSurah(detail);
            setLoadedCount(BATCH_SIZE);
        } catch (error) {
            console.error("Failed to fetch surah detail:", error);
        }
    }, []);

    useEffect(() => {
        if (id) fetchSurahDetail(id as string);
    }, [id, fetchSurahDetail]);

    // Derived: visible ayat slice (no re-fetch needed)
    const ayatList = allAyat.slice(0, loadedCount);

    // Infinite scroll — just increases the slice window
    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 200 && loadedCount < allAyat.length) {
            setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, allAyat.length));
        }
    }, [loadedCount, allAyat.length]);

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

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Play a specific ayat by its global index (0-based matching allAyat)
    const playAyatByIndex = useCallback(
        (index: number) => {
            const ayat = allAyat[index];
            if (!ayat) {
                setPlayingIndex(-1);
                playingIndexRef.current = -1;
                return;
            }

            // Ensure the ayat is visible (load more if needed)
            if (index >= loadedCount) {
                setLoadedCount(index + BATCH_SIZE);
            }

            // Stop previous
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.onended = null;
            }

            const audio = new Audio(ayat.audio["02"]);
            audioRef.current = audio;
            setPlayingIndex(index);
            playingIndexRef.current = index;

            audio.play().catch(console.error);

            audio.onended = () => {
                const nextIdx = playingIndexRef.current + 1;
                if (nextIdx < allAyat.length) {
                    playAyatByIndex(nextIdx);
                } else {
                    setPlayingIndex(-1);
                    playingIndexRef.current = -1;
                }
            };
        },
        [allAyat, loadedCount]
    );

    // Toggle play/pause for a specific ayat
    const handleAudioPlayback = useCallback(
        (index: number) => {
            if (playingIndexRef.current === index && audioRef.current) {
                if (audioRef.current.paused) {
                    audioRef.current.play().catch(console.error);
                    setPlayingIndex(index);
                } else {
                    audioRef.current.pause();
                    setPlayingIndex(-1);
                    playingIndexRef.current = -1;
                }
            } else {
                playAyatByIndex(index);
            }
        },
        [playAyatByIndex]
    );

    return {
        ayatList,
        allAyat,
        surah,
        playingIndex,
        handleAudioPlayback,
        loadedCount,
        totalCount: allAyat.length,
    };
};

export default useSurahDetail;
