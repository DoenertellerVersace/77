import React, {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	FormEventHandler,
	MouseEventHandler,
	SetStateAction,
	useState
} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '../assets/App.css';
import NotFound from "./NotFound";
import Index from "./Index";
import jake from "../assets/jake.png";

const lowerEnd = 1;
const higherEnd = 5;

export interface AppState {
	getCount: Function;
	getUser: Function;
}

export interface AppCallbacks {
	submit: FormEventHandler;
	setUser: ChangeEventHandler;
	decreaseCount: MouseEventHandler;
	increaseCount: MouseEventHandler;
	countIsLowerEnd: Function;
	countIsHigherEnd: Function;
}


function App(): React.JSX.Element {

	const [count, setCount]: [number, Dispatch<number>] = useState(1);
	const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState("");

	const countIsLowerEnd: Function = () => {
		return count <= lowerEnd;
	}

	const countIsHigherEnd: Function = () => {
		return count >= higherEnd;
	}

	const decreaseCount: MouseEventHandler = (ignored: any) => {
		if (countIsLowerEnd()) {
			return;
		}
		setCount(count - 1);
	}

	const increaseCount: MouseEventHandler = (ignored: any) => {
		if (countIsHigherEnd()) {
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
		setUser: setuser,
		decreaseCount: decreaseCount,
		increaseCount: increaseCount,
		countIsLowerEnd: countIsLowerEnd,
		countIsHigherEnd: countIsHigherEnd
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
