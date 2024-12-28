import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

// 앱 로딩시 빈 장바구니 백엔드에 전송 방지: 함수 외부에 변수 선언
let initial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  // 전체 장바구니 상태에 대한 구독 설정 -> cart 변경 시 App 재실행 & cart 최신 상태
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // [ 리덕스 상태에 따라 달라지는 부수 효과 ]
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://react-redux-http-cf0d8-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (initial) {
      // 초기값인 true이면 HTTP 요청 함수 sendCartData() 방지
      initial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Senting cart data failed!",
        })
      );
    });
  }, [cart, dispatch]); // 의존성에 cart : cart 변경될 때마다 fetch

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
