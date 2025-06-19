import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast"; 
import { Outlet } from "react-router-dom";


function App() {
  return (
    <>
    <Toaster position="top-right" />
    <div className="min-h-screen flex flex-col justify-between">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
    </>
  );
}

export default App;
