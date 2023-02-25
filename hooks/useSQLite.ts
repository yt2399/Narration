import { makeAutoObservable } from "mobx";
import * as SQLite from "expo-sqlite";
import { QueryDemandType, SingleChatType } from "../types";

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
 * 创建好友信息列表
 */
export function useCreateFriendsInfoList(Sqlite: SQLite.WebSQLDatabase) {
  return new Promise((resolve, reject) => {
    Sqlite.transaction(
      Db => {
        Db.executeSql(
          `CREATE TABLE IF NOT EXISTS u_friends_info (
          friendsId TEXT PRIMARY KEY ,
          avatar TEXT NOT NULL,
          friendsName TEXT NOT NULL,
          finalStatement TEXT NOT NULL,
          finalTime TEXT NOT NULL)`
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
 * 新增单聊好友聊天记录
 */
export function useAddSingleChatContent(Sqlite: SQLite.WebSQLDatabase, parameter: SingleChatType) {
  const { isSender, senderId, recipient, type, content, timeStamp } = parameter;

  return new Promise((resolve, reject) => {
    Sqlite.transaction(
      Db => {
        Db.executeSql(
          `INSERT INTO u_chat_${recipient} (isSender,senderId,recipient,type,content,timeStamp) VALUES (?,?,?,?,?,?)`,
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
