import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins"
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#94cbb5"
};

export const metadata: Metadata = {
	metadataBase: new URL("https://kru-chat.vercel.app"),
	title: "Kruu AI | Pembuat Postingan Sosial Media dengan AI",
	description:
		"Hasilkan postingan media sosial untuk Instagram, Twitter, dan platform lainnya yang menarik dengan bantuan AI. Ideal untuk membuat teks promosi produk & layanan. Coba Kruu AI sekarang!",
	keywords: [
		"AI",
		"Artificial Intelligence",
		"Generatif AI",
		"social media post generator",
		"pembuat postingan media sosial",
		"social media marketing",
		"pemasaran media sosial",
		"iklan online",
		"online advertising",
		"Google Gemini",
		"Indonesia",
		"promosi produk",
		"social media ads"
	],
	openGraph: {
		url: "https://kru-chat.vercel.app",
		type: "website",
		locale: "id_ID",
		title: "Kruu AI | Pembuat Postingan Sosial Media dengan AI",
		description:
			"Hasilkan postingan media sosial untuk Instagram, Twitter, dan platform lainnya yang menarik dengan bantuan AI. Ideal untuk membuat teks promosi produk & layanan. Coba Kruu AI sekarang!",
		siteName: "Kruu AI",
		images: [
			{
				url: "https://kru-chat.vercel.app/images/logo.png",
				width: 1200,
				height: 630,
				alt: "Kruu AI - Pembuat Postingan Media Sosial AI"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "Kruu AI | Pembuat Postingan Sosial Media dengan AI",
		description:
			"Hasilkan postingan media sosial untuk Instagram, Twitter, dan platform lainnya yang menarik dengan bantuan AI. Ideal untuk membuat teks promosi produk & layanan. Coba Kruu AI sekarang!",
		images: [
			{
				url: "https://kru-chat.vercel.app/images/logo.png",
				width: 1200,
				height: 630,
				alt: "Kruu AI - Pembuat Postingan Media Sosial AI"
			}
		]
	},
	robots: {
		index: true,
		follow: true,
		"max-image-preview": "large",
		"max-snippet": -1,
		"max-video-preview": -1,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1
		}
	},
	alternates: {
		canonical: "https://kru-chat.vercel.app"
	},
	applicationName: "Kruu AI",
	appleWebApp: {
		capable: true,
		title: "Kruu AI",
		statusBarStyle: "default"
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
		],
	},
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`}>{children}</body>
		</html>
	);
}
