import { makeAutoObservable } from "mobx";
import { UserInfo } from "./reducer";

export type StoreType = {
  avatar: string;
  id: string;
  nickname: string;
  token: string;
};

//currentEntrance
//判断当前用户界面入口
//根据入口转换不同收受消息类型场景
//101.首页 102.朋友列表 103.聊天框中

class Store {
  //用户信息
  userInfo: StoreType | null = null;

  //当前入口
  currentEntrance: number = 101;

  //当前好友id
  currentFriends: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setUser(Info: UserInfo) {
    this.userInfo = Info;
  }
  setCurrentEntrance(Entrance: number) {
    this.currentEntrance = Entrance;
  }
  setCurrentFriends(Friends: string) {
    this.currentFriends = Friends;
  }
}
const store = new Store();
export default store;
