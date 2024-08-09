import React from "react";
import { NavLink} from "react-router-dom";

function Navbar() {
	return (
		<>
			<div className="fixed top-0 left-0 right-0">
				<div className="flex shadow-md p-4 justify-between bg-white h-[3rem]">
					<div>
						<h1>Home</h1>
					</div>
					<div className="w-[30%] flex justify-end pr-5 space-x-5">
						<span>
							<NavLink to="/">Create Post</NavLink>
						</span>
						<span>
							<NavLink to="/all">All Post</NavLink>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
