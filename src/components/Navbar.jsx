import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light">
			<div className="container d-flex justify-content-end">				
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-success">Add New contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};