import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "components/Home";
import Detail from "components/Detail";
import Layout from "components/Layout/Layout";
import Login from "components/Layout/Login";
import { useSelector } from "react-redux";
import Mypage from "components/Layout/Mypage";

const Router = () => {
  const isLogin = useSelector((state) => state.auth.logging);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 로그인되지 않은 경우에는 로그인 페이지로 리다이렉트 */}
          {!isLogin && <Route path="*" element={<Navigate to="/" replace />} />}
          {/* 로그인된 경우에만 접근 가능한 페이지 */}
          {isLogin && <Route path="/" element={<Home />} />}
          {isLogin && <Route path="/detail/:id" element={<Detail />} />}
          {isLogin && <Route path="/mypage" element={<Mypage />} />}
          {/* 로그인되지 않은 경우에만 접근 가능한 페이지 */}
          {!isLogin && <Route path="/" element={<Login />} />}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
