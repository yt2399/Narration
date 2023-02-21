import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDataInfoType } from "../types";

/**
 * 存储Storage String内容
 * @param itemName String Store名称
 * @param value String Store内容
 */
const useStoreString = async (itemName: string, value: string) => {
  try {
    await AsyncStorage.setItem(itemName, value);
  } catch (e) {
    // saving error
  }
};

/**
 * 存储Storage Object内容
 * @param itemName String Store名称
 * @param value Object Store内容
 */

const useStoreObject = async (itemName: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(itemName, jsonValue);
  } catch (e) {
    // saving error
  }
};

/**
 * 读取Storage String内容
 * @param itemName String Store名称
 */
const useGetStoreString = async (itemName: string) => {
  try {
    const value = await AsyncStorage.getItem(itemName);
    console.log(value, "value");

    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    return null;
    // error reading value
  }
};

/**
 * 读取Storage Object内容
 * @param itemName String Store名称
 */
const useGetStoreObject = (itemName: string) => {
  return new Promise(async (resolve, reject) => {
    const jsonValue = await AsyncStorage.getItem(itemName);
    if (typeof jsonValue === "string") {
      resolve(JSON.parse(jsonValue) as userDataInfoType)
      return;
    }
    reject(jsonValue);
  });
};

/**
 * 移除Storage内容
 * @param itemName String Store名称
 */

const useRemoveStore = async (itemName: string) => {
  try {
    await AsyncStorage.removeItem(itemName);
  } catch (error) {}
};

export { useStoreString, useStoreObject, useGetStoreString, useGetStoreObject, useRemoveStore };
