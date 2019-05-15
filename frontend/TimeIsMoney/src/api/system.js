import axios from 'axios'

export async function getTopTen(){
    let response = await axios.get('')
    return response.data
}