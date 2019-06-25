import React from 'react';
import './LearningPage.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import LearningPageService from '../../services/learningpage-service'

class LearningPage extends React.Component{
    constructor(){
        super();
        this.state={
            isFlipped:false,
            word:'',
            answer:null,
            results: {}
        };
        this.userInput = React.createRef();
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this)
    }

    async componentDidMount() {
        const word = await LearningPageService.fetchWordHead()
        this.setState({ word: word.nextWord })
    }
    
    handleClick(ev){
        ev.preventDefault();
        
        this.setState({
            isFlipped:!this.state.isFlipped
        })
        
    }

    async handleSubmitAnswer(ev){
        ev.preventDefault()
        const userAnswer = this.userInput.current.value
        const results = await LearningPageService.submitAnswer({
            userAnswer
        })
        this.setState({ answer: results.answer, results: results, isFlipped:!this.state.isFlipped })
    }
    renderBack(){
        const { answer, word, results } = this.state
        if (this.state.answer===null){
            return (
                <div>
                    Checking Answer...
                </div>
            )
        }
        return (
            <>
                <div className="results">
                    <div className="description">
                        {results.isCorrect
                        ? `Good job! You answered correctly.`
                        : `Sorry, you answered incorrectly. The correct translation to ${word} is ${answer}`}
                    </div>
                    <div className="score">
                        <p>{`Correct count: ${results.wordCorrectCount}`}</p>
                        <p>{`Incorrect count: ${results.wordIncorrectCount}`}</p>
                        <p>{`Total score: ${results.totalScore}`}</p>
                    </div>                    
                </div>
                <button type="button" onClick={this.handleClick}>
                Click here to go to the next question!
                </button>
            </>
        )
    }
    renderFront(){
        if(this.state.word===null){
            return(
                <div>
                    <span>Fetching Word...</span>
                    
                </div>
            )
        }
        return(
            <div className="Word-Container">
                <h2>{this.state.word}</h2>
                <form id="User-Guess" onSubmit={(ev)=>{
                    this.handleSubmitAnswer(ev)
                    }}>
                    <label>
                        Your Guess:{' '}
                        <input type="text" ref={this.userInput}/>
                    </label>
                    <button type="submit" className="Submit-Btn stylish-btn">Submit</button>
                </form>
            </div>
        )
    }

    render(){
        return (
            <div className="Card-Container">
                <Flippy
                flipDirection="horizontal"
                flipOnClick={false}
                isFlipped={this.state.isFlipped}
                style={{width: '800px', height: '100%'}}
                >
                    <FrontSide>
                        {this.renderFront()}
                    </FrontSide>
                    <BackSide>
                        {this.renderBack()}
                    </BackSide>
                </Flippy>
           </div>
        )
    }

}
export default LearningPage