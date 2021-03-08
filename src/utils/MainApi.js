export class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(response) {
    return response.then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка получения данных: ${res.status} ${res.statusText}`));
      })
  }

  // регистрация
  register(name, email, password) {
    return this._getResponseData(fetch(`${this._baseUrl}/signup`, {  
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password
        })
      }))
  }

  //авторизация
  login(email, password) {
    return this._getResponseData(fetch(`${this._baseUrl}/signin`, {  
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      }))
  }

  //провека токена
  checkToken(token) {
    return this._getResponseData(fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    }))
  }

  //данные пользователя
  getCurrentUser(token) {
    return this._getResponseData(fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${token}`
      }
    }))
  }

  saveProfile(data) {
    const token = localStorage.getItem('token');
    return this._getResponseData(fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      }))
  }

    //все фильмы
    getMoveis() {
      const token = localStorage.getItem('token');
      return this._getResponseData(fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization" : `Bearer ${token}`
        }
      }))
    }
  

}

const mainApi = new MainApi({
  baseUrl: 'https://api.katanova-movies.students.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default mainApi;