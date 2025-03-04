import ReactMarkdown from 'react-markdown';

export default function GeneratedText({ text }: { text: string }) {
	return (
		<div className="p-8">
			<ReactMarkdown>{text}</ReactMarkdown>
		</div>
	);
}
