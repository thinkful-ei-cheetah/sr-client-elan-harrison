import React from 'react';
import DashBoardService from '../../services/dashboard-service';
import DashCard from '../DashCard/DashCard';

export default class DashBoard extends React.Component{
    state={
        current:null,
        wordList:null
    }
    componentWillMount(){
        DashBoardService.fetchWords()
        .then(lang =>{
            this.setState({
                wordList:lang.words,
                current:0
            })
        })
        .then(() => console.log(this.state.wordList))
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
            <div>
                Fetching WordList
            </div>   
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
        return (
            <div>
                {this.renderDisplay()}
                <button type="button" onClick ={(ev)=>{
                    ev.preventDefault();
                    this.previousWord()
                }}>previous</button>
                <button type="button" onClick ={(ev)=>{
                    ev.preventDefault();
                    this.nextWord()
                }}>next</button>
            </div>
        )
    }
}