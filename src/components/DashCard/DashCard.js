import React from 'react';

export default function DashCard(props){
    return props.words.map(word =>{
        return (
            <div className="DashCard" key={word.original}>
                <h2 className="Word">{word.original}</h2>
                <span>
                    Correct Count:{word.correct_count}
                </span>
                <br/>
                <span>
                    Incorrect Count:{word.incorrect_count}
                </span>
            </div>
        )
    })
}