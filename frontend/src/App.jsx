import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <div 
      className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:id" element={<CoursePage />} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App