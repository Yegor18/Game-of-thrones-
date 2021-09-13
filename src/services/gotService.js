export default class GotService {

    constructor()
    {
        this._apiBase = 'https://anapioficeandfire.com/api/';
    }
  
  
    getResource = async(url) =>
    {
    const res = await fetch(`${this._apiBase}${url}`);
  
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
  
    return await res.json();
    };
    getAllCharacters = async(i) =>
    {
        const res = await this.getResource(`characters?page=${i}&pageSize=10`);
        return res.map((elem) => this._transformCharacter(elem));
    }
    getCharacter = async(id) =>
    {
        const character = await this.getResource(`characters/${id}`);
        return this._transformCharacter(character);
    }
  
    getAllBooks = async(i) =>
    {
        const res = await this.getResource(`books?page=${i}`);
        return res.map((elem) => this._transformBook(elem));
    }

    getBook = async(id) =>
    {
        const book = await this.getResource(`books/${id}`);
        return this._transformBook(book);
    }
    
    getAllHomes = async(i) =>
    {
        const res = await this.getResource(`houses?page=${i}`);
        return res.map((elem) => this._transformHouse(elem));
    }
    getHome = async(id) =>
    {
        const home = await this.getResource(`houses/${id}`);
        return this._transformHouse(home);
    }

    _transformCharacter(char,i) {
        this.nodata(char);
        return {
            id: char.url,
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
        }
    }

    _transformHouse(house,i) {
        this.nodata(house);
        return {
            id: house.url,
            name: house.name,
            region: house.region,
            coatOfArms: house.coatOfArms,
            title: house.titles[0],
        }
    }

    nodata(char) {
        for (let r in char)
        {
            if (char[r] === "")
        char[r] ="no_data";
        }
    }

    _transformBook(book,i) {
        this.nodata(book);
        return {
            id:book.url,
            name:book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            author: book.authors[0],
            isbn: book.isbn,
        }
    }

  }


