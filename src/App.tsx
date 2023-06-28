import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import logo from './logo.svg';

function NotFound() {
  return (
      <div className={"App-content"}>
        <h1>Oops! You seem to be lost.</h1>
        <h2>Try here: <Link to='/'>Home</Link></h2>
      </div>
  )
}

function App({views}: {
  views: { path: string; component: React.ReactComponentElement<any, Pick<any, string | number | symbol>>; }[]
}) {
  console.log(views);
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt={"logo"} height={45}/>
          <p>
            einladung
          </p>
        </header>
        <div className={"App-content"}>
          <Router>
            <Routes>
              {views.map((
                  view: {
                    path: string;
                    component: React.ReactComponentElement<any, Pick<any, string | number | symbol>>;
                  },
                  index: number
              ) => {
                let element = view.component;
                return <Route key={index} path={view.path} element={element}/>
              })}
              <Route key={views.length} path={"*"} element={<NotFound/>}/>
            </Routes>
          </Router>
        </div>
        <footer className={"App-footer"}>
          <p>
            This is a footer.
          </p>
        </footer>
      </div>
  );
}

export default App;
