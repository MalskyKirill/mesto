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

  getCards() {
    return fetch(`${this._url}/cards`, {
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

  edingProfile({ name, job }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

  addCard({title: name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
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
