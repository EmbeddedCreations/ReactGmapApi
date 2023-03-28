import React from "react";

function ContextMenus(props) {
	const menuClick = (e) => {
		console.log("You clicked on '" + e.target.textContent + "'");
	};

	const MenuOptions = [
		{ id: 1, name: "Delete" }
	];

	return (
		<ul
			className="right-menus"
			style={{ top: props.postion.y, left: props.postion.x }}
		>
			{MenuOptions.map((option) => {
				return (
					<li key={option.id} onClick={menuClick}>
						{option.name}
					</li>
				);
			})}
		</ul>
	);
}

export default ContextMenus;
