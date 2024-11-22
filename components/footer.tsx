'use client'

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Github, GitCommit } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Footer(): React.JSX.Element {
	const [commitHash, setCommitHash] = useState<string | null>(null)

	useEffect(() => {
		const fetchCommitHash = async () => {
			try {
				const response = await fetch('/api/commit')
				if (response.ok) {
					const data = await response.json()
					setCommitHash(data.commitHash)
				} else {
					console.error('Failed to fetch commit hash')
				}
			} catch (error) {
				console.error('Error fetching commit hash:', error)
			}
		}

		fetchCommitHash()
	}, [])

	return (
		<footer className="flex flex-row gap-2 mt-32 py-6 w-full shrink-0 items-center justify-between">
			<p className="text-sm text-muted-foreground">
				Made by{' '}
				<Link
					className="text-sm hover:text-primary transition-colors duration-200"
					href="https://nicholasadamou.com"
					target="_blank"
					rel="noopener noreferrer"
					>
					Nicholas Adamou
				</Link>
				.
			</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
				{commitHash && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									className="text-sm transition-colors duration-200 text-muted-foreground flex items-center gap-1 bg-[#181818] py-1 px-2 rounded-full"
									href={`https://github.com/nicholasadamou/ui/commit/${commitHash}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<GitCommit className="w-4 h-4" />
									<span className="font-mono">{commitHash.slice(0, 7)}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>View latest commit</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				<Link
					className="text-sm hover:text-primary transition-colors duration-200 text-[#6C848C] flex items-center gap-1"
					href="https://github.com/nicholasadamou/ui"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github className="w-4 h-4" />
				</Link>
			</nav>
		</footer>
	)
}
