import React, { useState } from "react";
import { ReactDOM } from "react";
import { render } from "react-dom";
// import DiscourseContextContext from "./discoursContextContext";
import { returnQueries } from "./utils";
import QueryFormat from "./queryFormat";

class DiscourseContext extends React.Component<{}, {
  displayQuestions: boolean
}> {

  constructor(props) {
    super(props);
    this.state = {
      displayQuestions: false
    };
  }


  displayQuestion = () => {
    console.log("hi")
    this.setState({
      displayQuestions: !this.state.displayQuestions
    })


  }
  render() {
    let questions = null
    if (this.state.displayQuestions) {
      questions = (
        <div>
          <QueryFormat></QueryFormat>
        </div>
      )
    }
    return (
      <div>
        {/* <button className="btn" onClick={this.displayQuestion}>View Unanswered Questions</button> */}
        <div className="App">
          <h1 className="font-bold select-none opacity-50 cursor-pointer" onClick={this.displayQuestion}>Discourse Context</h1>
          {questions}
        </div>
      </div>

    )
  }
}

export default DiscourseContext;