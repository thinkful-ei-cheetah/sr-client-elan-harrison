import React from 'react';
import './LearningPage.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

class LearningPage extends React.Component{
    constructor(){
        super();
        this.state={
            isFlipped:false,
            word:'Word',
            answer:null
        };
        this.userInput = React.createRef();
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(ev){
        ev.preventDefault();
        
        this.setState({
            isFlipped:!this.state.isFlipped
        })
        
    }
    renderBack(){
        if (this.state.answer===null){
            return (
                <div>
                    Checking Answer...
                </div>
            )
        }
        return (
            <div>
                {this.state.answer}
                <button type="button" onClick={this.handleClick}/>
            </div>
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
                <form id="User-Guess">
                    <label>
                        Your Guess:{' '}
                        <input type="text" ref={this.userInput} />
                    </label>
                
                </form>
                <button type="button" className="Submit-Btn" onClick={(ev)=>{
                    this.handleClick(ev)
                    }
                    }>Submit</button>
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