import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="search" element={<Search />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
