import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BubblePage from "./components/BubblePage";
// import "./styles.scss";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={BubblePage} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
