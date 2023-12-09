class MovieDbService {

  _apiKey = 'e0ac4ef20aac59a9e50d45b2d6ffb2c5';

  _apiBase = 'https://api.themoviedb.org/3/';

  async getResource(url) {

    const res = await fetch(url);

    if(!res.ok) {
      throw new Error('new error')
    }

  const body = await res.json()
  return body;
}

getAllMovie = async(query, page = 1) => {
  this.pagePage = query;
  this.queryString = page;
  const res = await this.getResource(`${this._apiBase}search/movie?api_key=${this._apiKey}&query=${this.queryString}&include_adult=false&language=en-US&page=${this.pagePage}`);
  return res;
  }

getGenresList = async() => {
  const res = await this.getResource(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en`);
  return res;
}

}

export default MovieDbService;