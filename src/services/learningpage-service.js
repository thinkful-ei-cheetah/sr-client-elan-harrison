import TokenService from './token-service';
import config from '../config'

const LearningPageService ={
    fetchWordHead(){
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            method: "GET",
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`
              },
        }).then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    submitAnswer(userAnswer){
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(userAnswer)
        }).then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    }
}

export default LearningPageService;