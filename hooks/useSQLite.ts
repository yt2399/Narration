import { makeAutoObservable } from "mobx";
import * as SQLite from "expo-sqlite";
import { FriendInfoListType, QueryDemandType, SingleChatType } from "../types";

export type useSqliteStateType = {
  Sqlite: SQLite.WebSQLDatabase | null;
  isReady: boolean;
};

export class useSqlite {
  SqliteState: useSqliteStateType = {
    Sqlite: null,
    isReady: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  connect(userId: string) {
    this.SqliteState.Sqlite = SQLite.openDatabase(`${userId}.db`, "1.0.1");

    if (this.SqliteState.Sqlite) {
      this.SqliteState.isReady = true;
    }
  }
}

const useSqliteState = new useSqlite();

/**
 * 初始化一个sql库，如果没有就会创建
 */

/**
 * 创建好友信息列表
 */
export function useCreateFriendsInfoList(Sqlite: SQLite.WebSQLDatabase) {
  Sqlite.transaction(Db => {
    Db.executeSql(
      `CREATE TABLE IF NOT EXISTS u_friends_info (
          friendsId TEXT PRIMARY KEY ,
          avatar TEXT NOT NULL,
          friendsName TEXT NOT NULL,
          lastMessage TEXT NOT NULL,
          lastMessageCount INT NOT NULL,
          finalTime INT NOT NULL,
          star INT NOT NULL,
          updTime INT NOT NULL
          )`
    );
  });
}

/**
 * 新增好友列表信息
 */
export function useAddFriendMsg(
  Sqlite: SQLite.WebSQLDatabase,
  parameter: FriendInfoListType,
  friendId: string
) {
  const { avatar, friendsName, lastMessage, finalTime, star, updTime ,lastMessageCount} = parameter;

  return new Promise((resolve, reject) => {
    Sqlite.transaction(
      Db => {
        Db.executeSql(
          `
          INSERT INTO u_friends_info (friendsId,avatar,friendsName,lastMessage,finalTime,star,updTime,lastMessageCount) 
          VALUES ('${friendId}','${avatar}','${friendsName}','${lastMessage}',${finalTime},${star},${updTime},${lastMessageCount})
          ON CONFLICT(friendsId) DO UPDATE SET 
          avatar = '${avatar}', 
          friendsName = '${friendsName}', 
          lastMessage = '${lastMessage}', 
          lastMessageCount = '${lastMessageCount}',
          finalTime = ${finalTime}, 
          star = ${star}, 
          updTime = ${updTime};
          `,
          []
        );
      },
      error => reject(error),
      () => {
        resolve(true);
      }
    );
  });
}

/**
 * 查询所有好友列表
 */
export function useQueryFriendList(Sqlite: SQLite.WebSQLDatabase) {
  return new Promise<SQLite.ResultSet[]>((resolve, reject) => {
    Sqlite.exec(
      [
        {
          sql: `SELECT * FROM  u_friends_info
            ORDER BY finalTime DESC`,
          args: [],
        },
      ],
      false,
      (err, result) => {
        if (err) return reject(err);
        resolve(result as unknown as SQLite.ResultSet[]);
      }
    );
  });
}

/**
 * 创建单聊对话表
 */
export async function useCreateSingleChatContent(Sqlite: SQLite.WebSQLDatabase, friendsId: string) {
  Sqlite.transaction(
    Db => {
      Db.executeSql(
        `CREATE TABLE IF NOT EXISTS u_chat_${friendsId} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          isSender INT NOT NULL,
          senderId TEXT NOT NULL,
          recipient TEXT NOT NULL,
          type INT NOT NULL,
          content TEXT NOT NULL,
          timeStamp BIGINT NOT NULL)`
      );
    },
    error => console.log("创建单聊好友失败", error)
  );
}
/**
 * 新增单聊好友聊天记录
 */
export function useAddSingleChatContent(
  Sqlite: SQLite.WebSQLDatabase,
  parameter: SingleChatType,
  friendId: string
) {
  const { isSender, senderId, recipient, type, content, timeStamp } = parameter;

  return new Promise((resolve, reject) => {
    Sqlite.transaction(
      Db => {
        Db.executeSql(
          `INSERT INTO u_chat_${friendId} (isSender,senderId,recipient,type,content,timeStamp) VALUES (?,?,?,?,?,?)`,
          [isSender, senderId, recipient, type, content, timeStamp]
        );
      },
      error => reject(error),
      () => {

        resolve(true);
      }
    );
  });
}

/**
 * 查询单聊记录
 */
export function useQueryDemand(Sqlite: SQLite.WebSQLDatabase, friendId: string, limit: number) {
  return new Promise((resolve, reject) => {
    Sqlite.exec(
      [
        {
          sql: `SELECT * FROM  u_chat_${friendId}
            ORDER BY id DESC
            LIMIT ${limit} `,
          args: [],
        },
      ],
      false,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

/**
 * 删除单个好友数据库
 */
export async function useDeleteSQL(Sqlite: SQLite.WebSQLDatabase) {
  // const SQLiteDb: SQLite.WebSQLDatabase = SQLite.openDatabase(`${friendsId}.db`, "1.0.1");
  Sqlite.closeAsync();
  return await Sqlite.deleteAsync();
}

export default useSqliteState;
