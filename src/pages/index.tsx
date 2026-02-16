import Button from "@/components/atoms/Button";
import Image from "next/image";
import welcomeScreenBackground from "@/assets/images/welcomeScreenBackground.png";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cahenomngaji — Baca Al-Quran & Doa Harian</title>
      </Head>
      <div className="min-h-screen bg-surface-950 flex items-center justify-center px-6">
        <div className="text-center max-w-sm mx-auto animate-fade-in-up">
          {/* Brand */}
          <h1 className="gradient-text text-4xl font-extrabold tracking-tight">
            CAHENOMNGAJI
          </h1>
          <p className="text-surface-400 text-base mt-3 leading-relaxed">
            Learn Quran and Recite once everyday
          </p>

          {/* Hero image */}
          <div className="relative mt-8 mb-12">
            <div className="absolute -inset-4 bg-primary-500/10 rounded-3xl blur-2xl" />
            <Image
              src={welcomeScreenBackground}
              width={320}
              height={320}
              alt="Welcome illustration"
              className="mx-auto relative z-10 drop-shadow-2xl"
              priority
            />
          </div>

          {/* CTA */}
          <Button
            variant="primary"
            href="/home"
            className="w-full py-4 text-lg rounded-2xl shadow-xl shadow-primary-900/40"
          >
            Get Started
          </Button>

          <p className="text-xs text-surface-600 mt-6">
            Bismillah, mulai perjalanan mengaji
          </p>
        </div>
      </div>
    </>
  );
}
