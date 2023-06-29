import React from "react";
import {Link} from "react-router-dom";

class NotFound extends React.Component {
	render(): React.JSX.Element {
		return (
				<div className={"App-content"}>
					<h1>Oops! You seem to be lost.</h1>
					<h2>Try here: <Link to='/'>Home</Link></h2>
				</div>
		)
	}
}

export default NotFound;