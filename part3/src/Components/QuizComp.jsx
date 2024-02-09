import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css"; 
import quizQuestions from "./Questions.json"; 

class QuizComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionNum: 0,
      score: 0,
      attemptedQuestions: [],
      questions: quizQuestions, 
    };
  }

  handleNext = () =>
    this.setState((prevState) => ({
      currentQuestionNum:
        prevState.currentQuestionNum < 14
          ? prevState.currentQuestionNum + 1
          : prevState.currentQuestionNum,
    }));

  handlePrevious = () =>
    this.setState((prevState) => ({
      currentQuestionNum:
        prevState.currentQuestionNum > 0
          ? prevState.currentQuestionNum - 1
          : prevState.currentQuestionNum,
    }));

  handleOption = (e) => {
    const selectedAnswer = e.target.innerText;
    const isCorrect =
      selectedAnswer === this.state.questions[this.state.currentQuestionNum].answer;
    alert(isCorrect ? "Correct answer" : "Incorrect answer");
    if (!this.state.attemptedQuestions.includes(this.state.currentQuestionNum)) {
      this.setState((prevState) => ({
        attemptedQuestions: [...prevState.attemptedQuestions, prevState.currentQuestionNum],
        score: isCorrect ? prevState.score + 1 : prevState.score,
      }));
    }
  };

  handleFinish = () => {
    this.props.history.push("/finish-quiz", {
      score: this.state.score,
      attempted: this.state.attemptedQuestions,
    });
  };

  handleQuit = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      window.location.reload(false);
    }
  };

  render() {
    const { currentQuestionNum } = this.state;
    return (
      <div className="quiz">
        <p className="question">Question</p>
        <div>
          <span className="span-num">{currentQuestionNum + 1} of 15</span>
          <h5 className="question-text">{this.state.questions[currentQuestionNum].question}</h5>
        </div>
        <div className="options">
          {["A", "B", "C", "D"].map((option, index) => (
            <p
              key={index}
              className="option"
              onClick={this.handleOption}
            >
              {this.state.questions[currentQuestionNum][`option${option}`]}
            </p>
          ))}
        </div>
        <div>
          <button
            className="btn-move previous"
            onClick={this.handlePrevious}
          >
            Previous
          </button>
          <button
            className="btn-move next"
            onClick={this.handleNext}
          >
            Next
          </button>
          <button
            className="btn-move quit"
            onClick={this.handleQuit}
          >
            Quit
          </button>
          <Link to="/finish-quiz" state={{ 
            score: this.state.score,
            attempted: this.state.attemptedQuestions,
          }}>
            <button
              className="btn-move finish"
              onClick={this.handleFinish}
            >
              Finish
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default QuizComp;
