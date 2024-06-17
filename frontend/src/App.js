import { HashRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
// import Home from "./pages/Home.jsx.old";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Search />} />
          {/* <Route path="search" element={<Search />} /> */}
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
