import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./component/AddProduct";
import Login from "./component/Login";
import Nav from "./component/Nav";
import PageNotFound from "./component/PageNotFound";
import PrivateComponent from "./component/PrivateComponent";
import ProductList from "./component/ProductList";
import Profile from "./component/Profile";
import SignUp from "./component/SignUp";
import Update from "./component/Update";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bgVideo from'./component/video/video4.mp4'


function App() {
  return (
    <div className="App">
      {/* <video autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video> */}
      <BrowserRouter>
        <Nav />
        <ToastContainer theme="dark"  position={"bottom-right"}/>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="login" element={<Login/>}/>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
