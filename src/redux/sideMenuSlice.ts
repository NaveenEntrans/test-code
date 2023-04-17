import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { icons } from '../base-components/Lucide'

export interface Menu {
  icon: keyof typeof icons
  title: string
  pathname?: string
  subMenu?: Menu[]
  ignore?: boolean
}

export interface SideMenuState {
  menu: Array<Menu | 'devider'>
}

const initialState: SideMenuState = {
  menu: [
    // {
    //   icon: 'Activity',
    //   pathname: '/',
    //   title: 'Home',
    // },
    {
      icon: 'Users',
      pathname: '/page-1',
      title: 'User Setup',
    },
    // {
    //   icon: 'Users',
    //   pathname: '/user',
    //   title: 'User',
    // },
  ],
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {},
})

export const selectSideMenu = (state: RootState) => state.sideMenu.menu

export default sideMenuSlice.reducer
