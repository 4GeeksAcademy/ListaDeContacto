import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light">
			<div className="container d-flex justify-content-end">				
				<div className="ml-auto">
					<Link to="/contact-list">
						<button className="btn btn-primary m-2">Contact List</button>
					</Link>
					<Link to="/contact-form">
						<button className="btn btn-success">Contact Form</button>
					</Link>
					
				</div>
			</div>
		</nav>
	);
};