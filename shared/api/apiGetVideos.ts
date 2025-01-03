import mockData from './response.json'

export const apiGetVideos = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockData
  } catch (error) {
    console.error('Произошла ошибка при получении видео:', error)
    throw error
  }
}
