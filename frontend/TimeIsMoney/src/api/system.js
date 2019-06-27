import axios from 'axios'
import service from './../util/service.js'
export async function getTopTen(){
    
    let response = await service.get('/questionnaires/tenQues')
    console.error("11111111111")
    console.error(JSON.stringify(response))
    return response.data
}

export async function sendMessage(data){
    let response = await service.post('/notifications', data)
    return response.data
}

export async function deleteCache(){
    let response = await service.delete('/cache')
    return response.data
}