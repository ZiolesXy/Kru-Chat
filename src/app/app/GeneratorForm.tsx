import { Ref } from "react";

export default function GeneratorForm({
	postPurpose,
	setPostPurpose,
	mimicStyle,
	setMimicStyle,
	keywords,
	setKeywords,
	hashtags,
	setHashtags,
	targetAudience,
	setTargetAudience,
	minWords,
	handleMinWordsChange,
    handleBlur,
	handleFileChange,
    fileInputRef,
	isGenerating,
	onGenerate
}: {
	postPurpose: string;
	setPostPurpose: (value: string) => void;
	mimicStyle: string;
	setMimicStyle: (value: string) => void;
	keywords: string;
	setKeywords: (value: string) => void;
	hashtags: string;
	setHashtags: (value: string) => void;
	targetAudience: string;
	setTargetAudience: (value: string) => void;
	minWords: number;
	handleMinWordsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: Ref<HTMLInputElement>;
	isGenerating: boolean;
	onGenerate: () => void;
}) {
	return (
		<div className="flex-1 p-4">
			<div className="bg-base-300 flex h-full flex-col justify-between rounded-md border border-gray-600 p-4">
				<span>
					Beritahu kami tentang produk atau layanan Anda, dan kami akan menulis postingannya
				</span>
				<div className="mt-4 flex flex-col gap-1">
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Deskripsi dan Tujuan Postingan</legend>
						<textarea
							className="textarea w-full resize-none"
							placeholder="Promosi sandal jepit swallow untuk diskon Tahun Baru dengan gaya kasual..."
							value={postPurpose}
							onChange={(e) => setPostPurpose(e.target.value)}
						/>
					</fieldset>
					<fieldset className="fieldset">
						<legend className="fieldset-legend">Contoh Gaya Postingan untuk Ditiru</legend>
						<textarea
							className="textarea w-full resize-none"
							placeholder="🌟 Berita menarik dari teman-teman kami di..."
							value={mimicStyle}
							onChange={(e) => setMimicStyle(e.target.value)}
						/>
						<div className="fieldset-label">Opsional</div>
					</fieldset>
					<div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
						<fieldset className="fieldset flex-1">
							<legend className="fieldset-legend">Keywords</legend>
							<input
								type="text"
								className="input w-full"
								placeholder="Diskon, Spesial..."
								value={keywords}
								onChange={(e) => setKeywords(e.target.value)}
							/>
							<div className="fieldset-label">Opsional</div>
						</fieldset>
						<fieldset className="fieldset flex-1">
							<legend className="fieldset-legend">Hashtags</legend>
							<input
								type="text"
								className="input w-full"
								placeholder="#Diskon, #Spesial..."
								value={hashtags}
								onChange={(e) => setHashtags(e.target.value)}
							/>
							<div className="fieldset-label">Opsional</div>
						</fieldset>
						<fieldset className="fieldset flex-1">
							<legend className="fieldset-legend">Target Audiens</legend>
							<input
								type="text"
								className="input w-full"
								placeholder="Ibu-ibu, Millenials..."
								value={targetAudience}
								onChange={(e) => setTargetAudience(e.target.value)}
							/>
							<div className="fieldset-label">Opsional</div>
						</fieldset>
					</div>
					<div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
						<fieldset className="fieldset flex-1">
							<legend className="fieldset-legend">Minimal Kata</legend>
							<input
								type="number"
								value={minWords}
                                onBlur={handleBlur}
								onChange={handleMinWordsChange}
								className="input w-full"
							/>
						</fieldset>
						<fieldset className="fieldset flex-1">
							<legend className="fieldset-legend">Foto Postingan</legend>
							<input
								type="file"
								onChange={handleFileChange}
								ref={fileInputRef}
								className="file-input w-full"
							/>
							<div className="fieldset-label">Opsional</div>
						</fieldset>
					</div>
				</div>
				<button className="btn btn-neutral" disabled={isGenerating} onClick={onGenerate}>
					{isGenerating ? "Generating..." : "Generate"}
				</button>
			</div>
		</div>
	);
}
