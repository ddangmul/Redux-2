import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

// 앱 로딩시 빈 장바구니 백엔드에 전송 방지: 함수 외부에 변수 선언
let initial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  // 전체 장바구니 상태에 대한 구독 설정 -> cart 변경 시 App 재실행 & cart 최신 상태
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (cart.changed) {
      dispatch(
        sendCartData({ items: cart.items, totalQuantity: cart.totalQuantity }) // changed는 전송 x
      );
    }
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
