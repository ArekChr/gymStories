import axios from 'axios'
import { USER_REGISTER } from './types'

const URL = `${API_URL}/user/`

export function regusterUser(data) {
  const request = axios({
    method:"POST",
    url: URL,
    data:{
      email: data.email,
      password: data.password
    },
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.data)

  return {
    type: USER_REGISTER,
    payload: request
  }
}