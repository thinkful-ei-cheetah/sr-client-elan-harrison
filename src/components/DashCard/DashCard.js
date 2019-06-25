import React from 'react';
import './DashCard.css';

export default function DashCard(props){
    return props.words.map(word =>{
        return (
            <div className="DashCard" key={word.original}>
                <h4 className="Word">{word.original}</h4>
                <span>
                    Correct Count: {word.correct_count}
                </span>
                <br/>
                <span>
                    Incorrect Count: {word.incorrect_count}
                </span>
            </div>
        )
    })
}