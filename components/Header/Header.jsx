"use client";

import Link from "next/link";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProviderButton from "./ProviderButton";

function Header() {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};

		setUpProviders();
	}, []);

	return (
		<nav className="w-full sticky top-0 z-10 bg-base-100/90 border-b border-base-300 backdrop-blur-md flex items-center justify-around p-4 shadow shadow-sm">
			<h1 className="text-secondary font-bold text-sm">
				{" "}
				<Link href="/">Gym Buddies</Link>{" "}
			</h1>
			<ul className="flex text-primary gap-3 items-center">
				{session ? (
					<>
						<li>
							<details className="dropdown dropdown-bottom dropdown-end">
								<summary className="m-1 btn btn-outline btn-secondary text-secondary-content">
									Options
								</summary>
								<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
									<li>
										{" "}
										<Link
											href="/dashboard"
											className="text-secondary font-semibold underline underline-sm"
										>
											Dashboard
										</Link>{" "}
									</li>
									<li>
										{" "}
										<button
											type="button"
											className="text-secondary font-semibold underline underline-sm"
											onClick={() => signOut()}
										>
											{" "}
											Log Out
										</button>{" "}
									</li>
								</ul>
							</details>
						</li>
					</>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<ProviderButton provider={provider} key={provider.id} signIn={signIn} />
								);
							})}
					</>
				)}
			</ul>
		</nav>
	);
}

export default Header;
