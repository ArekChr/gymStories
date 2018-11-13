import ApiError from './ApiError'
import BaseUrl from './BaseUrl'

export async function getTrainings(): Promise<Array<Training>> {
  const requestUrl = `${BaseUrl}trainings`

  const response = await fetch(requestUrl)

  if (response.ok) {
    return response.json()
  }
  else {
    throw new ApiError(response.status, response.statusText)
  }
}