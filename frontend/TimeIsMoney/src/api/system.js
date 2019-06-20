import axios from 'axios'

export async function getTopTen(){
    let response = await axios.get('')
    return response.data
}

export async function sendMessage(data){
    let response = await axios.post('/notifications', data)
    return response.data
}