import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomeComp";
import Quiz from "./Components/QuizComp";
import Result from "./Components/ResultComp";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play-quiz" element={<Quiz />} />
        <Route path="/finish-quiz" element={<Result />}/>
      </Routes>
  
    );
  }
}
