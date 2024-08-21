import { HashRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import Home from "./pages/Home.jsx.old";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Login />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="search" element={<Search />} /> */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
