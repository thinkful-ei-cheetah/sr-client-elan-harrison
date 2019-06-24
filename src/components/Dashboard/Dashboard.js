import React, { Component } from 'react'
import axios from 'axios'
import UserContext from '../../contexts/UserContext'
import TokenService from '../../services/token-service'

export class Dashboard extends Component {
  static contextType = UserContext

  async componentDidMount() {
    // const results = await axios.get('http://localhost:8000/api/language', {
    //   headers: {
    //     'Authorization': `Bearer ${TokenService.getAuthToken()}`,
    //     'content-type': 'application/json'
    //   }
    // })
    // console.log(results)
  }

  render() {
    return (
      <section>
        
      </section>
    )
  }
}

export default Dashboard
