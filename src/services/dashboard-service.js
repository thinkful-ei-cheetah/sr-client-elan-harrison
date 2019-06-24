import TokenService from './token-service';

const dashBoardService ={
    fetchWords(){
        return fetch('http://localhost:8000/api/language', {
            method: "GET",
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
              },
        }).then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    }
}
export default dashBoardService;