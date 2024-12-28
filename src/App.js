import { useSelector } from "react-redux";
import { useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  // 전체 장바구니 상태에 대한 구독 설정 -> cart 변경 시 App 재실행 & cart 최신 상태
  const cart = useSelector((state) => state.cart);

  // [ 리덕스 상태에 따라 달라지는 부수 효과 ]
  useEffect(() => {
    fetch(
      "https://react-redux-http-cf0d8-default-rtdb.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
  }, [cart]); // 의존성에 cart : cart 변경될 때마다 fetch

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
