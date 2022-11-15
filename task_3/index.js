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
      return response.json()
    })
    .then((data) => {
      // ! We cannot check if character exists with 'response.status !== '404', 
      // or 'response.ok ==='true', because we possibly can catch
      //  a lot of other mistakes (e.g wrong url),
      // and return null instead of error message. 
      // RickAndMorty API returns an error message, if you try to find non-existent Character.
      // So I decided to work with it:
      if (data.error === 'Character not found') {
        return null
      }
      return data
    })
      //catch errors
    .catch((error) => `Error: ${error}`)

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
      const data = await fetchedEpisode.json()
      if (data.error === 'Episode not found') {
        return null
      } 
      return data

    } catch (error) {
      return `Error: ${error}`
    }
  }
}