import React, {Dispatch, useState} from "react";
import {Link} from "react-router-dom";
import {AppCallbacks, AppState} from "./App";
import person from "../assets/person.png";

function Index(props: { state: AppState; callbacks: AppCallbacks }): React.JSX.Element {

	let state: AppState = props.state;
	let callbacks: AppCallbacks = props.callbacks;
	const [placeholder, setPlaceholder]: [string, Dispatch<string>] = useState("name");

	const getPersons: Function = () => {
		const personRow: React.JSX.Element[] = [];
		for (let i: number = 0; i < state.getCount(); i++) {
			personRow.push(
					<img key={i}
							 src={person}
							 className={"Party-person Bouncy-person" + Math.round(Math.random() * 3)}
							 height={"40px"}
							 width={"40px"}
							 alt={"person"}/>
			);
		}
		return personRow;
	};

	const inputOnBlur = (ignored: any) => {
		setPlaceholder("name...")
	};

	const inputOnFocus = (ignored: any) => {
		setPlaceholder("")
	}

	return <div className={"App-content"}>
		<p className={"card"}>
			ich habe nächste woche geburtstag 🥳
		</p>
		<p className={"card"}>
			deshalb gibt es am
			<span className={"relevant"}> nächsten freitag (7. juli) </span>
			eine party<br/>
			ich freue mich wenn ihr vorbeikommt!
		</p>
		<p className={"card"}>
			damit die nachbarn nicht so lange leiden müssen, fangen wir einfach schon
			<span className={"relevant"}> um 18 uhr </span>
			an 🎉<br/>
			es gibt essen und etwas zu trinken, aber bringt gerne auch noch ein getränk mit
		</p>
		<p className={"card"}>
			wer kommen möchte, kann hier (s)einen namen eintragen und gerne auch +x personen mitbringen
		</p>
		<form onSubmit={callbacks.submit} className={"Form card"} autoComplete={"off"}>
			<div className={"Form-row"}>
				<input className={"Name"}
							 type={"text"}
							 name={"name"}
							 id={"name"}
							 onChange={callbacks.setUser}
							 placeholder={placeholder}
							 onFocus={inputOnFocus}
							 onBlur={inputOnBlur}
							 autoComplete={"off"}/>
			</div>
			<div className={"Party-person-row"}>
				<div className={"Plus-minus"}>
					<button className={"Change-count"} type={"button"} disabled={callbacks.countIsHigherEnd()}
									onClick={callbacks.increaseCount}> +
					</button>
					<button className={"Change-count"} type={"button"} disabled={callbacks.countIsLowerEnd()}
									onClick={callbacks.decreaseCount}> -
					</button>
				</div>
				<div className={"Party-persons"}>
					{getPersons()}
				</div>
			</div>
			<div className={"Form-row"}>
				<div className={"Form-row-item"}>
					<button className={"Button-submit"}
									disabled={state.getUser() === ""}
									type={"submit"}>{callbacks.countIsLowerEnd() ? "ich komme" : "wir kommen"} vorbei
					</button>
				</div>
			</div>
		</form>
		<p className={"card"}>
			hier findet das statt:
			<br/>
			<Link className={"relevant"} to="https://goo.gl/maps/UcJT9sgUDk9LQtjW6">greifenhagener str. 16, 10437
				berlin</Link>
		</p>
		<p className={"card"}>
			bis dann!
		</p>
	</div>;
}

export default Index;