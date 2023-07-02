import React, {
	ChangeEvent,
	ChangeEventHandler,
	Dispatch,
	FormEvent,
	FormEventHandler,
	MouseEventHandler,
	SetStateAction,
	useState
} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import '../assets/App.css';
import NotFound from "./NotFound";
import Index from "./Index";
import jake from "../assets/jake.png";

const lowerEnd = 1;
const higherEnd = 5;
let changeInputs: Function;

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
	changeInputs: Function;
}


function App(): React.JSX.Element {

	const [count, setCount]: [number, Dispatch<number>] = useState(1);
	const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState("");

	const countIsLowerEnd: Function = (): boolean => {
		return count <= lowerEnd;
	}

	const countIsHigherEnd: Function = (): boolean => {
		return count >= higherEnd;
	}

	const decreaseCount: MouseEventHandler = (ignored: any): void => {
		if (countIsLowerEnd()) {
			return;
		}
		setCount(count - 1);
	}

	const increaseCount: MouseEventHandler = (ignored: any): void => {
		if (countIsHigherEnd()) {
			return;
		}
		setCount(count + 1);
	}

	const setuser: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		setUser(event.target.value);
	}

	const handleSubmit: FormEventHandler = (event: FormEvent): void => {
		event.preventDefault();
		console.log(`submitting form with user: ${user}`);
		console.log(`submitting form with count: ${count}`);
		fetch(`http://ohmygit.de:8000/set/${user}/to/${count}`,
		).then((response: any) => {
			console.log(response);
		}).catch((error: any) => {
			console.log(error);
		});
	}

	const callbacks: AppCallbacks = {
		submit: handleSubmit,
		setUser: setuser,
		decreaseCount: decreaseCount,
		increaseCount: increaseCount,
		countIsLowerEnd: countIsLowerEnd,
		countIsHigherEnd: countIsHigherEnd,
		changeInputs: changeInputs,
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
					<BrowserRouter>
						<Routes>
							<Route key={0} path={"/"} element={<Index callbacks={callbacks} state={state}/>}/>
							<Route key={2} path={"*"} element={<NotFound/>}/>
						</Routes>
					</BrowserRouter>
				</div>
			</div>
	);

}

export default App;
