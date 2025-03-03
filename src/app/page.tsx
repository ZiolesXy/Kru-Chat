"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
	const date = new Date();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5
			}
		}
	};

	const imageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.7,
				ease: "easeOut"
			}
		}
	};

	return (
		<>
			<motion.div className="animated-background flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
				<motion.div
					className="flex w-96 flex-col items-center justify-center rounded-md border border-gray-100 bg-gray-400/50 bg-clip-padding px-8 py-4 text-center backdrop-blur-sm backdrop-filter"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.h1 className="text-6xl text-white" variants={itemVariants}>
						Kruu AI
					</motion.h1>

					<motion.h2 className="mb-6 text-white" variants={itemVariants}>
						Iklan Efektif Tanpa Ribet dengan AI
					</motion.h2>

					<motion.div className="mask mask-squircle relative h-48 w-48" variants={imageVariants}>
						<Image
							src="/logo.svg"
							fill={true}
							alt="Social Media"
							className="h-full w-full object-cover"
						/>
					</motion.div>

					<motion.p className="mt-4 mb-6 text-white" variants={itemVariants}>
						Tingkatkan engagement dengan postingan menarik yang dibuat otomatis oleh AI
					</motion.p>

					<motion.button
						className="btn btn-neutral btn-wide rounded-full"
						variants={itemVariants}
						whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
					>
						Try it Now
					</motion.button>
				</motion.div>
			</motion.div>

			<motion.div
				className="fixed bottom-0 w-full bg-black p-1 text-center"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}
			>
				<span className="text-white">Copyright &copy; {date.getFullYear()} Kruu AI</span>
			</motion.div>
		</>
	);
}
