import React from 'react';
import { Link } from 'react-router-dom'
import DashboardService from '../../services/dashboard-service';
import DashCard from '../DashCard/DashCard';
import UserContext from '../../contexts/UserContext'
import Loading from '../Loading/Loading'
import './Dashboard.css'

export default class Dashboard extends React.Component{
    static contextType = UserContext
    state={
        current:null,
        wordList:null,
        language: null,
        totalScore: 0,
        loading: true,
        error: null
    }
    componentDidMount(){
        DashboardService.fetchWords()
        .then(lang =>{
            this.setState({
                wordList:lang.words,
                language: lang.language.name,
                totalScore: lang.language.total_score,
                loading: true,
                current:0
            })
        })
        .catch(err => this.context.setError(err.error))
    }
    renderDisplay(){
        if(this.state.wordList!==null){
            let words=[];
            for (let i=0; i<3;i++){
                words.push(this.state.wordList[this.state.current+i])
            }
            return (
                <DashCard words={words}/>
            )
        }
        return (
            <Loading loading={this.state.loading} /> 
        )
    }
    nextWord(){
        if (this.state.wordList[this.state.current+3]){
            this.setState({
                current:this.state.current+1
            })
        }
    }

    previousWord(){
        if (this.state.wordList[this.state.current-1]){
            this.setState({
                current: this.state.current-1
            })
        }
    }
    render(){
        const { language, totalScore } = this.state
        return (
            <div className="DashCard-Container">
                <h3 className="score">{`Total Score: ${totalScore}`}</h3>
                <Link to={"/learn"}><button className="stylish-btn" >{`Start Learning ${language}`}</button></Link>
                <div className="btn-container">
                    <button type="button" className="stylish-btn" onClick ={(ev)=>{
                        ev.preventDefault();
                        this.previousWord()
                    }}>previous</button>
                    <button type="button" className="stylish-btn" onClick ={(ev)=>{
                        ev.preventDefault();
                        this.nextWord()
                    }}>next</button>
                </div>
                {this.renderDisplay()}
            </div>
        )
    }
}