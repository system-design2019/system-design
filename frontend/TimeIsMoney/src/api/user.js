import axios from 'axios'

const ROOT = '/api/puser/'

export async function login (username, password) {
    let response = await axios.post('/user', JSON.stringify({username:username, password:password}))
    console.log('response:'+response)
}