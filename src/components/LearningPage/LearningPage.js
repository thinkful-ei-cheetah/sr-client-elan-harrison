import React from 'react';
import './LearningPage.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import LearningPageService from '../../services/learningpage-service'
import Loading from '../Loading/Loading'

class LearningPage extends React.Component{
    constructor(){
        super();
        this.state={
            isFlipped:false,
            word:'',
            results: {},
            loading: true,
            answering: true
        };
        this.userInput = React.createRef();
        this.handleNextQuestion = this.handleNextQuestion.bind(this)
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this)
    }

    async componentDidMount() {
        const word = await LearningPageService.fetchWordHead()
        this.setState({ word: word.nextWord, loading: false })
    }
    
    async handleNextQuestion(ev){
        ev.preventDefault();
        const newWord = await LearningPageService.fetchWordHead()
        this.setState({
            isFlipped:!this.state.isFlipped,
            word: newWord.nextWord,
            answering: true
        })
        
    }

    async handleSubmitAnswer(ev){
        ev.preventDefault()
        const { answering } = this.state
        console.log(answering)
        if (answering) {
            const userAnswer = this.userInput.current.value
            const results = await LearningPageService.submitAnswer({
                userAnswer
            })
            this.setState({ 
                results: results, 
                isFlipped:!this.state.isFlipped, 
                loading: false,
                answering: false
            })
            this.userInput.current.value = ''
        }
    }
    renderBack(){
        const { word, results, loading } = this.state
        if (results.answer===null){
            return (
                <Loading loading={loading} />
            )
        }
        return (
            <>
                <div className="results-container">
                    <h1 className="description">
                        {results.isCorrect
                        ? `Good job! You answered correctly.`
                        : `Sorry, you answered incorrectly.`}
                    </h1>
                    <h3>{`The correct translation to ${word} is ${results.answer}`}</h3>
                    <div className="results-info">
                        <p>{`Correct count: ${results.wordCorrectCount}`}</p>
                        <p>{`Incorrect count: ${results.wordIncorrectCount}`}</p>
                        <p>{`Total score: ${results.totalScore}`}</p>
                    </div>  
                    <button type="button" className="next stylish-btn" onClick={this.handleNextQuestion}>
                    Move to the Next Question
                    </button>                  
                </div>
            </>
        )
    }
    renderFront(){
        if(this.state.word===''){
            return(
                <Loading loading={this.state.loading} />
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