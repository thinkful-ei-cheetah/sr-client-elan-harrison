import React, { Component } from 'react'
import Loading from '../Loading/Loading'
import { FrontSide } from 'react-flippy'

export class GuessCard extends Component {
  render() {
    const { word, results, loading, correct, inputValue, handleSubmitAnswer } = this.props
    return (
      <FrontSide>
        <div className="Word-Container">
          <h2>{word}</h2>
          {!results.answer && <Loading loading={loading}/>}
          <h3>{`Correct Guesses: ${correct}`}</h3>
          <form id="User-Guess" onSubmit={handleSubmitAnswer}>
              <label>
                  Your Guess:{' '}
                  <input type="text" ref={inputValue}/>
              </label>
              <button type="submit" className="Submit-Btn stylish-btn">Submit</button>
          </form>
        </div> 
      </FrontSide>
    )
  }
}

export default GuessCard
