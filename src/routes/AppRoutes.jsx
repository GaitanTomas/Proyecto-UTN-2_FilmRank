import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";
import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import Series from "../pages/Series/Series";
import MyRanking from "../pages/MyRanking/MyRanking";
import Detail from "../pages/Detail/Detail";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="peliculas" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="miranking" element={<MyRanking />} />
        <Route path="pelicula/:id" element={<Detail type="movie" />} />
        <Route path="serie/:id" element={<Detail type="series" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
