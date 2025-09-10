import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { DashboardViewEnum } from "../../utils/enums";

interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
  selectedDashboardTab: number;
  dashboardView: DashboardViewEnum;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  selectedDashboardTab: 0,
  dashboardView: DashboardViewEnum.LIST,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setSelectedDashboardTab: (
      state,
      action: PayloadAction<{ selectedTab: number }>
    ) => {
      state.selectedDashboardTab = action.payload.selectedTab;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateDashboardView: (state, action: PayloadAction<{ dashboardView: DashboardViewEnum }>) => {
      state.dashboardView = action.payload.dashboardView;
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  login,
  logout,
  updateUser,
  setUserInfo,
  setSelectedDashboardTab,
  updateDashboardView,
} = userSlice.actions;
export default userSlice.reducer;
