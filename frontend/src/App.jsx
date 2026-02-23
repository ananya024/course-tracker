import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useState, useEffect } from "react";

function App() {
  
  const { currentUser } = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // This effect runs once after the store is ready
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 1. While waiting for storage, show nothing or a spinner
  if (!isHydrated) {
    return <div className="min-h-screen flex items-center justify-center">
             <span className="loading loading-spinner loading-lg"></span>
           </div>;
  }
  
  return (
    <div 
      className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar/>
      <Routes>
        <Route path="/" element={currentUser ? (<HomePage />) : (<AuthPage />)}/>
        
        {/* <Route path="/home" element={<HomePage/>}/> */}
        <Route path="/course/:uid/:cid" element={<CoursePage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App