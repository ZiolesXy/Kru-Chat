import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-black">
			<h1 className="text-2xl text-red-500">404</h1>
			<p className="text-white">Page Not Found</p>
			<Link className="text-gray-600 transition hover:text-gray-200" href="/">
				Go back to the home page
			</Link>
		</div>
	);
}
