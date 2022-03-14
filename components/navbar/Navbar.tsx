import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { userContext } from "../../providers/userProvider";

type PropTypes = {};

const Navbar: React.FC<PropTypes> = () => {
	const [showDropdown, setShowDropdown] = useState<Boolean>(false);
	const { user } = useContext(userContext);

	// handle dropdown outside click
	useEffect(() => {
		if (!showDropdown) return;
		const handleOutsideClick = () => {
			setShowDropdown(false);
		};
		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [showDropdown]);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const Logout = () => {};

	return (
		<nav className="flex justify-between items-center p-4 border-b-[1px] border-main-purple">
			<Link href="/">Circle</Link>
			<li className="flex items-center gap-4">
				<div className="flex items-center gap-6 mr-12">
					<Link href="/projects">
						<a className="opacity-80 hover:opacity-100 cursor-pointer">
							Projects
						</a>
					</Link>
					<Link href="/people">
						<a className="opacity-80 hover:opacity-100 cursor-pointer">
							People
						</a>
					</Link>
				</div>
				<div className="flex items-center cursor-pointer relative">
					<span className="select-none" onClick={toggleDropdown}>
						{user?.name || "username"}
					</span>
					<Image
						src={
							showDropdown
								? "/images/expand-up-icon.svg"
								: "/images/expand-down-icon.svg"
						}
						alt="expand"
						width={25}
						height={25}
						onClick={toggleDropdown}
					/>
					<div
						role="menu"
						className={`absolute top-[30px] right-0 mt-2 w-[200px] rounded-md shadow-sm shadow-gray-600 ${
							!showDropdown ? "hidden" : ""
						}`}
					>
						<Link href="/projects">
							<a
								className="block px-4 py-2 bg-slate-900 hover:bg-gray-800 text-sm opacity-70 hover:opacity-100"
								role="menuitem"
							>
								My Projects
							</a>
						</Link>
						<Link href="/profile">
							<a
								className="block px-4 py-2 bg-gray-900 hover:bg-gray-800 text-sm opacity-70 hover:opacity-100"
								role="menuitem"
							>
								Profile
							</a>
						</Link>
						<Link href="/logout">
							<a
								className="block px-4 py-2 bg-gray-900 hover:bg-gray-800 text-sm opacity-70 hover:opacity-100"
								role="menuitem"
							>
								Logout
							</a>
						</Link>
					</div>
				</div>
				<Image
					src="/images/login-icon.svg"
					alt="logout"
					width={25}
					height={25}
					className="opacity-100 hover:opacity-90 hover:scale-105 cursor-pointer"
					onClick={Logout}
				/>
			</li>
		</nav>
	);
};

export default Navbar;
