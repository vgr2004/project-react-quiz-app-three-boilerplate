import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";
import questions from "./Questions.json";

class QuizComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: questions,
      currQuestion: {},
      nextQuestion: {},
      prevQuestion: {},
      currQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      numberofAnsweredQuestions: 0,
      answer: ''
    };
  }

  componentDidMount() {
    this.displayQuestion(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion);
  }

  displayQuestion = (questions = this.state.questions, currQuestion, nextQuestion, prevQuestion) => {
    let { currQuestionIndex } = this.state;
    if (this.state.questions.length !== 0) {
      questions = this.state.questions;
      currQuestion = questions[currQuestionIndex];
      nextQuestion = questions[currQuestionIndex + 1];
      prevQuestion = questions[currQuestionIndex - 1];

      const answer = currQuestion.answer;

      this.setState({
        currQuestion,
        nextQuestion,
        prevQuestion,
        answer
      });
    }
  };

  handleNextButtonClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(prevState => ({
        currQuestionIndex: prevState.currQuestionIndex + 1
      }), () => {
        this.displayQuestion(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion);
      });
    }
  };

  handlePrevButtonClick = () => {
    if (this.state.prevQuestion !== undefined) {
      this.setState(prevState => ({
        currQuestionIndex: prevState.currQuestionIndex - 1
      }), () => {
        this.displayQuestion(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion);
      });
    }
  };

  handleQuitButtonClick = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      window.location.reload(false);
    }
  };

  handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    }
    else {
      this.wrongAnswer();
    }
  }
  handleQuitButtonClick=() =>{
    if (window.confirm("Are you sure you want to quit?")) {
      window.location.reload(false);
    }
  }

  correctAnswer = () => {
    this.setState(prevstate => ({
      score: prevstate.score + 1,
      correctAnswers: prevstate.correctAnswers + 1,
      currQuestionIndex: prevstate.currQuestionIndex + 1,
      numberofAnsweredQuestions: prevstate.numberofAnsweredQuestions + 1
    }), () => {
      this.displayQuestion(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion);
    });

    alert("Correct answer");
  };

  wrongAnswer = () => {
    this.setState(prevstate => ({
      wrongAnswers: prevstate.wrongAnswers + 1,
      currQuestionIndex: prevstate.currQuestionIndex + 1,
      numberofAnsweredQuestions: prevstate.numberofAnsweredQuestions + 1
    }), () => {
      this.displayQuestion(this.state.questions, this.state.currQuestion, this.state.nextQuestion, this.state.prevQuestion);
    });

    alert("Wrong answer");
  };

  render() {
    const { currQuestion } = this.state;
    return (
      <div className="question">
        <h2>Question</h2>

        <div>
          <span>{this.state.currQuestionIndex + 1} of {this.state.questions.length}</span>
          <h5>{currQuestion.question}</h5>
        </div>

        <div className="Choice-container">
          <p onClick={this.handleOptionClick} className="choice">{currQuestion.optionB}</p>
          <p onClick={this.handleOptionClick} className="choice">{currQuestion.optionA}</p>
        </div>

        <div className="Choice-container">
          <p onClick={this.handleOptionClick} className="choice">{currQuestion.optionC}</p>
          <p onClick={this.handleOptionClick} className="choice">{currQuestion.optionD}</p>
        </div>

        <div className="btn-container">
          <button className="btn previous" onClick={this.handlePrevButtonClick}>Previous</button>
          <button className="btn next" onClick={this.handleNextButtonClick}>Next</button>
          <button className="btn quit" onClick={this.handleQuitButtonClick}>Quit</button>
          <Link to="/finish-quiz" state={{
            answeredQuestions: this.state.numberofAnsweredQuestions,
            score: this.state.score,
            correctAnswer: this.state.correctAnswers,
            totalQuestions: this.state.questions.length,
            wrongAnswer: this.state.wrongAnswers
          }}>
            <button id="finish">Finish</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default QuizComp;
