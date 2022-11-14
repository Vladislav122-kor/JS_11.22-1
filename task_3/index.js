// API requests implementation 
class RickAndMorty {
  //method to fetch character from API
  getCharacter(id) {
    //throw an error if id not a valid number
    if (!Number.isFinite(id)) {
      throw new Error('Type valid ID')
    }
    //get pers with then...catch()
    const pers = fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      //if no pers with this id - return null
      if (response.status === 404) {
        return null
      }
      //return pers object with all data we need
      return response.json()
    })
      //catch errors
    .catch((error) => `Error: ` + error)

    return pers
  }
  //get episode method with async/await. All logic is same as in
  //getCharacter method
  async getEpisode(episode) {
    if (!Number.isFinite(episode)) {
      throw new Error('Type valid episode number')
    }
    try {
      const fetchedEpisode = await fetch(
        `https://rickandmortyapi.com/api/episode/${episode}`
      )
    
      if (fetchedEpisode.status === 404) {
        return null
      }
      const data = fetchedEpisode.json()
      return data
    } catch (error) {
      return `Error: ${error}`
    }
  }
}