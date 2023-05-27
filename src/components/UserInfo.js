class UserInfo {
  constructor({ id, name, job, avatar }) {
    this._id = id;
    this._profileName = name
    this._profileJob = job
    this._profileAvatar = avatar;
  }

  //подставляем данные о юзере из разметки
  getUserInfo() {
    const userInfo = {};

    userInfo._id = this._id;
    userInfo.name = this._profileName.textContent;
    userInfo.job = this._profileJob.textContent;
    userInfo.avatar = this._profileAvatar;

    return userInfo;
  }

  //устанавливаем новые данные
  setUserInfo({_id, name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._id = _id;
    this._profileAvatar.src = avatar;
  }
}

export default UserInfo;
