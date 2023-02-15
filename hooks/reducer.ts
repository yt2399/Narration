import React from "react";

// 初始状态
type state = {
  isActivityIndicator: Boolean;
};

type action = {
  type: string
  payload: any
}

export const state = {
  isActivityIndicator: false,
};

// reducer 用于修改状态

export const reducer = (state: state, action: action) => {
  const { type, payload } = action;

  switch (type) {
    case "SetToLoad":
      return {
        ...state,
        isActivityIndicator: payload,
      };
    default: {
      return state;
    }
  }
};

export const GlobalContext = React.createContext({});
