import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/login" element={<div>login</div>}/>
        <Route path="/register" element={<div>register</div>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
