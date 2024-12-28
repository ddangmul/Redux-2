// 장바구니 토글용 (사용자 인터페이스)
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      // 리덕스 툴킷이 코드를 캡쳐해 제3의 라이브러리 imer로 새 상태 객체 생성
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
