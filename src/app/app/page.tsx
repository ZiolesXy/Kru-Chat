"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import GeneratedText from "./GeneratedText";
import GeneratorForm from "./GeneratorForm";

export default function Home() {
	const [apiKey, setApiKey] = useState("");
	const [postPurpose, setPostPurpose] = useState("");
	const [mimicStyle, setMimicStyle] = useState("");
	const [keywords, setKeywords] = useState("");
	const [hashtags, setHashtags] = useState("");
	const [targetAudience, setTargetAudience] = useState("");
	const [minWords, setMinWords] = useState(200);
	const [postPhotoBase64, setPostPhotoBase64] = useState<string | null>(null);
	const [generatedText, setGeneratedText] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [showInput, setShowInput] = useState(true); // State to toggle input/output on small screens

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleMinWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value)) {
			setMinWords(value);
		}
	};

	const handleBlur = () => {
		setMinWords((prevValue) => {
			if (prevValue < 20) return 20;
			if (prevValue > 1000) return 1000;
			return prevValue;
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) {
			window.alert("Tidak ada file yang dipilih");
			setPostPhotoBase64(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
		if (file.size > maxSizeInBytes) {
			window.alert("Ukuran file melebihi batas maksimum 10 MB");
			setPostPhotoBase64(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		if (!file.type.startsWith("image/")) {
			window.alert("File yang dipilih bukan gambar");
			setPostPhotoBase64(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			setPostPhotoBase64(reader.result as string);
		};
		reader.readAsDataURL(file);

		reader.onerror = () => {
			window.alert("Gagal membaca file");
			setPostPhotoBase64(null);
			if (fileInputRef.current) fileInputRef.current.value = "";
		};
	};

	const handleGenerate = async () => {
		if (!apiKey) {
			(document.getElementById("api-key-modal") as HTMLDialogElement).showModal();
			return;
		}

		if (!postPurpose) {
			window.alert("Mohon isi Deskripsi dan Tujuan Postingan!");
			return;
		}

		const maxWords = minWords + 5;

		let prompt = `Buatlah sebuah postingan media sosial sesuai dengan spesifikasi berikut:\n\n`;
		prompt += `Tujuan postingan: ${postPurpose}\n\n`;
		if (mimicStyle)
			prompt += `Gunakan gaya penulisan yang mirip dengan postingan berikut: ${mimicStyle}.\n\n`;
		if (keywords)
			prompt += `Pastikan untuk menyertakan kata kunci berikut agar relevan: ${keywords}.\n\n`;
		if (hashtags) {
			prompt += `Gunakan hashtag berikut dalam postingan: ${hashtags}.\n\n`;
		} else {
			prompt += `Buatlah postingan tanpa hashtag.\n\n`;
		}
		if (targetAudience) {
			prompt += `Target audiens dari postingan ini adalah: ${targetAudience}. Sesuaikan gaya bahasa, nada, dan struktur agar menarik bagi audiens tersebut.\n\n`;
		}
		if (postPhotoBase64) {
			prompt += `Berikut adalah gambar terkait dengan postingan ini. Gunakan informasi dalam gambar sebagai referensi untuk memperkaya isi postingan.\n\n`;
		}
		prompt += `Pastikan panjang postingan minimal ${minWords} kata, tetapi jangan terlalu jauh dari batas minimal ini (idealnya tidak lebih dari ${maxWords} kata).\n`;
		prompt += `Gunakan bahasa yang menarik, persuasif, dan sesuai dengan konteks.\n`;
		prompt += `Jangan gunakan Markdown seperti Headers, Bold, Italic, dan sebagainya kecuali New Line.\n`;
		prompt += `Jika ini adalah postingan promosi, buat agar mengundang interaksi dari audiens, seperti ajakan bertanya, CTA (Call To Action), atau format lain yang menarik.\n`;

		setIsGenerating(true);

		try {
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						contents: [
							{
								parts: [
									{ text: prompt },
									...(postPhotoBase64
										? [
												{
													inlineData: {
														mimeType: "image/jpeg",
														data: postPhotoBase64.split(",")[1]
													}
												}
											]
										: [])
								]
							}
						]
					})
				}
			);

			if (response.ok) {
				const data = await response.json();
				const text = data.candidates[0].content.parts[0].text;
				setGeneratedText(text);
			} else {
				window.alert(`API Error: ${response.statusText}`);
			}
		} catch (error) {
			window.alert(`Error generating content: ${error}`);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<>
			{/* Main container: column on all screens, full height */}
			<div className="flex min-h-screen flex-col">
				{/* Navbar: always visible */}
				<div className="bg-base-200 flex w-full items-center justify-between px-2 py-2 md:px-4">
					<Link className="flex items-center gap-4" href="/">
						<div className="mask mask-squircle sm-h-12 relative h-6 w-6 md:h-12">
							<Image
								src="/logo.svg"
								fill={true}
								alt="Kruu AI Logo"
								className="h-full w-full object-cover"
							/>
						</div>
						<span className="text-xl md:text-4xl">Kruu AI</span>
					</Link>
					<div className="flex gap-1">
						{/* Switch button: visible only on small screens */}
						<button className="btn md:hidden" onClick={() => setShowInput(!showInput)}>
							<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M5.825 16L7.7 17.875q.275.275.275.688t-.275.712q-.3.3-.712.3t-.713-.3L2.7 15.7q-.15-.15-.213-.325T2.426 15t.063-.375t.212-.325l3.6-3.6q.3-.3.7-.287t.7.312q.275.3.288.7t-.288.7L5.825 14H12q.425 0 .713.288T13 15t-.288.713T12 16zm12.35-6H12q-.425 0-.712-.288T11 9t.288-.712T12 8h6.175L16.3 6.125q-.275-.275-.275-.687t.275-.713q.3-.3.713-.3t.712.3L21.3 8.3q.15.15.212.325t.063.375t-.063.375t-.212.325l-3.6 3.6q-.3.3-.7.288t-.7-.313q-.275-.3-.288-.7t.288-.7z"
								></path>
							</svg>
						</button>
						{/* Settings button */}
						<button
							className="btn"
							onClick={() =>
								(document.getElementById("api-key-modal") as HTMLDialogElement).showModal()
							}
						>
							Settings
						</button>
					</div>
				</div>
				{/* Content area: column on small screens, row on larger screens */}
				<div className="flex flex-1 flex-col md:flex-row">
					{/* Input area: conditional visibility */}
					<div
						className={`bg-base-200 flex flex-col overflow-y-auto ${
							showInput ? "block" : "hidden"
						} flex-1 md:block`}
					>
						<GeneratorForm
							postPurpose={postPurpose}
							setPostPurpose={setPostPurpose}
							mimicStyle={mimicStyle}
							setMimicStyle={setMimicStyle}
							keywords={keywords}
							setKeywords={setKeywords}
							hashtags={hashtags}
							setHashtags={setHashtags}
							targetAudience={targetAudience}
							setTargetAudience={setTargetAudience}
							minWords={minWords}
							handleMinWordsChange={handleMinWordsChange}
							handleBlur={handleBlur}
							handleFileChange={handleFileChange}
							fileInputRef={fileInputRef}
							isGenerating={isGenerating}
							onGenerate={handleGenerate}
						/>
					</div>
					{/* Output area: conditional visibility */}
					<div
						className={`flex flex-col overflow-y-auto ${
							!showInput ? "block" : "hidden"
						} flex-1 md:block`}
					>
						<GeneratedText text={generatedText} />
					</div>
				</div>
			</div>
			{/* API Key Modal */}
			<dialog className="modal" id="api-key-modal">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Google Gemini API Key</h3>
					<p className="py-4">
						Your API Key can be found in&nbsp;
						<Link
							className="link text-blue-500"
							target="_blank"
							href="https://aistudio.google.com/apikey"
						>
							Google AI Studio
						</Link>
					</p>
					<input
						type="text"
						className="input w-full"
						placeholder="your-api-key"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
					/>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
