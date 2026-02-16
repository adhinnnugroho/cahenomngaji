import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Google Fonts — Inter + Amiri (Arabic) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Boxicons */}
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        {/* PWA & Meta */}
        <meta name="description" content="Cahenomngaji — Baca Al-Qur'an, Doa, dan Jadwal Sholat" />
        <meta name="theme-color" content="#020617" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
