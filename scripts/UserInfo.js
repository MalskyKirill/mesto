class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);

    this._profileName = document.querySelector('.profile__name');
    this._profileJob = document.querySelector('.profile__job');
  }

  //подставляем данные о юзере из разметки
  getUserInfo() {
    this._name.value = this._profileName.textContent;
    this._job.value = this._profileJob.textContent;
  }

  //устанавливаем новые данные при сабмите
  setUserInfo() {
    this._profileName.textContent = this._name.value;
    this._profileJob.textContent = this._job.value;
  }
}

export default UserInfo;
