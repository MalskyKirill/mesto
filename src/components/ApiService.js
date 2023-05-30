class ApiService {
  constructor(url, authorizationToken) {
    this._url = url;
    this._authorizationToken = authorizationToken;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // получает данные в профайл с сервера
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // получает карточки с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
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
    }).then((res) => {
      return this._getResponseData(res);
    });
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
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //удалить карточку
  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //лайк карточки
  likeCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //удаление лайка
  deliteLikeCard(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
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
        avatar: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export default ApiService;
