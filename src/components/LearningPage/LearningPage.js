import React from 'react';
import './LearningPage.css';
import Flippy from 'react-flippy';
import LearningPageService from '../../services/learningpage-service'
import GuessCard from '../GuessCard/GuessCard'
import AnswerCard from '../AnswerCard/AnswerCard'

class LearningPage extends React.Component{
    constructor(){
        super();
        this.state={
            isFlipped:false,
            word:'',
            results: {},
            loading: true,
            answering: true,
            correct: 0
        };
        this.userInput = React.createRef();
        this.handleNextQuestion = this.handleNextQuestion.bind(this)
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this)
    }

    async componentDidMount() {
        const word = await LearningPageService.fetchWordHead()
        this.setState({ word: word.nextWord, loading: false, correct: word.wordCorrectCount })
    }
    
    handleNextQuestion = async (ev) => {
        ev.preventDefault();
        const newWord = await LearningPageService.fetchWordHead()
        this.setState({
            isFlipped:!this.state.isFlipped,
            word: newWord.nextWord,
            answering: true
        })
        
    }

    handleSubmitAnswer = async(ev) => {
        ev.preventDefault()
        const { answering } = this.state
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

    render(){
        const { word, correct, loading, results } = this.state
        return (
            <div className="Card-Container">
                <Flippy
                flipDirection="horizontal"
                flipOnClick={false}
                isFlipped={this.state.isFlipped}
                style={{width: '800px', height: '100%'}}
                >
                    <GuessCard
                        word={word}
                        correct={correct}
                        loading={loading}
                        results={results}
                        inputValue={this.userInput}
                        handleSubmitAnswer={this.handleSubmitAnswer}
                    />
                    <AnswerCard
                        word={word}
                        loading={loading}
                        results={results}
                        handleNextQuestion={this.handleNextQuestion}
                    />
                </Flippy>
           </div>
        )
    }

}
export default LearningPage