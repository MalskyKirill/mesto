class ApiService {
  constructor(url, authorizationToken) {
    this._url = url;
    this._authorizationToken = authorizationToken;
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

}

export default ApiService;
