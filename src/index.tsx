import React, {
	EventHandler,
	FormEvent, Provider,
	ReactComponentElement
} from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root: Root = ReactDOM.createRoot(
		document.getElementById('root') as HTMLElement
);

let state: {
	count: () => number ;
	counter: number;
	user: null;
} = {

	user: null,
	counter: 1,
	count: () => 1,

}

state.count = () => state.counter;

function noplusx(): boolean {
	return state.counter === 1;
}

function subtract(event: React.MouseEvent<HTMLButtonElement>) {
	state.counter--;
	console.log(state.count);
}

function add(event: React.MouseEvent<HTMLButtonElement>) {
	state.counter++;
	console.log(state.count);
}

function assembleViews(): ({
	path: string;
	submitHandler: undefined | null | EventHandler<FormEvent>;
	component: ReactComponentElement<any>
})[] {

	console.log("assembling views...");
	let indexSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {

		event.preventDefault();
		console.log("handling submit event...");
		console.log(event);

	};

	return [
		{
			path: "/",
			submitHandler: indexSubmitHandler,
			component: <div>
				<p>
					ich habe nächste woche geburtstag und möchte mit euch feiern.
					deshalb gibt es nächsten freitag (7.7.) eine party.
					ich würde mich freuen, wenn ihr vorbeikommt.
				</p>
				<p>
					es gibt essen und etwas zu trinken, aber bringt gerne auch getränke mit.
					wer kommen möchte, kann hier (s)einen namen eintragen und gerne auch +x personen anmelden.
				</p>
				<form onSubmit={indexSubmitHandler} className={"Form"}>
					<p className={"Form-row"}>
						<input type="text" name="name" id="name"/>
						<button type="button" disabled={noplusx()} onClick={subtract}>-</button>
						<div>{state.counter}</div>
						<button type="button" onClick={add}>+</button>
					</p>
					<button type="submit">anmelden</button>
				</form>
			</div>
		},
		{
			path: "/about",
			submitHandler: undefined,
			component: <div>About</div>
		},
		{
			path: "/users",
			submitHandler: undefined,
			component: <div>Users</div>
		}
	];
}

root.render(
		<React.StrictMode>
			<App views={assembleViews()}/>
		</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
