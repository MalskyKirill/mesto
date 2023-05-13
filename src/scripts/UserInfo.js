class UserInfo {
  constructor({ name, job }) {
    // this._name = document.querySelector(name)
    // this._job = document.querySelector(job)

    this._profileName = document.querySelector('.profile__name');
    this._profileJob = document.querySelector('.profile__job');
  }

  //подставляем данные о юзере из разметки
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._profileName.textContent
    userInfo.job = this._profileJob.textContent;

    return userInfo;
  }

  //устанавливаем новые данные при сабмите
  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}

export default UserInfo;
