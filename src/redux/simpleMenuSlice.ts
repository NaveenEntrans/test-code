import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SimpleMenuState {
  menu: Array<Menu | "devider">;
}

const initialState: SimpleMenuState = {
  menu: [
    {
      icon: "Activity",
      pathname: "/simple-menu/page-1",
      title: "Page 1",
    },
    {
      icon: "Activity",
      pathname: "/simple-menu/page-2",
      title: "Dashboard",
    },
  ],
};

export const simpleMenuSlice = createSlice({
  name: "simpleMenu",
  initialState,
  reducers: {},
});

export const selectSimpleMenu = (state: RootState) => state.simpleMenu.menu;

export default simpleMenuSlice.reducer;
