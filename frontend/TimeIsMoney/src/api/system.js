import axios from 'axios'
import service from './../util/service.js'
export async function getTopTen(){
    let response = await service.get('')
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