import React, {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	FormEventHandler,
	MouseEventHandler,
	SetStateAction,
	useState
} from 'react';
import '../assets/App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./NotFound";
import Index from "./Index";
import jake from "../assets/jake.png";


export interface AppState {
	getCount: Function;
	getUser: Function;
}

export interface AppCallbacks {
	submit: FormEventHandler;
	setuser: ChangeEventHandler;
	substract: MouseEventHandler;
	add: MouseEventHandler;
	noplusx: Function;
	fullplusx: Function;
}


function App(): React.JSX.Element {

	const [count, setCount]: [number, Dispatch<number>] = useState(1);
	const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState("");

	const noplusx: Function = () => {
		return count === 1;
	}

	const fullplusx: Function = () => {
		return count > 4;
	}

	const subtract: MouseEventHandler = (ignored: any) => {
		if (noplusx()) {
			return;
		}
		setCount(count - 1);
	}

	const add: MouseEventHandler = (ignored: any) => {
		if (fullplusx()) {
			return;
		}
		setCount(count + 1);
	}

	const setuser: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setUser(event.target.value);
	}

	const handleSubmit: FormEventHandler = (event: any) => {
		event.preventDefault();
		console.log(`submitting form with user: ${user}`);
		console.log(`submitting form with count: ${count}`);
	}

	const callbacks: AppCallbacks = {
		submit: handleSubmit,
		setuser: setuser,
		substract: subtract,
		add: add,
		noplusx: noplusx,
		fullplusx: fullplusx
	}

	const state: AppState = {
		getUser: () => user,
		getCount: () => count,
	}

	return (
			<div className="App">
				<header className="App-header">
					<img src={jake} alt={"jakobs gesicht"} className={"Jakobs-gesicht"}/>
					<p>
						einladung zur party am 7. juli
					</p>
				</header>
				<div className={"App-content-wrapper"}>
					<Router>
						<Routes>
							<Route key={0} path={"/"} element={<Index callbacks={callbacks} state={state}/>}/>
							<Route key={2} path={"*"} element={<NotFound/>}/>
						</Routes>
					</Router>
				</div>
			</div>
	);

}

export default App;
