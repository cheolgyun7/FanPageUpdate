import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "components/Home";
import Detail from "components/Detail";
import Layout from "components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
