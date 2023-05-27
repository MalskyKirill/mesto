class ApiService {
  constructor(url, authorizationToken) {
    this._url = url;
    this._authorizationToken = authorizationToken;
  }

  // получает данные в профайл с сервера
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

  // получает карточки с сервера
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

  //отправляет изменныные данниу профайла на сервер
  edingProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
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

  // отправляет новую карточку на сервер
  addCard({ title: name, link }) {
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

  //удалить карточку
  deliteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
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

  //лайк карточки
  likeCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'PUT',
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

  //удаление лайка
  deliteLikeCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'DELETE',
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

  //смена аватара
  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link
      })
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
