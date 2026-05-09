import { Routes, Route } from "react-router";
import { Home } from "../pages/Home";

export function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortLink" element={<Home />} />
    </Routes>
  );
}
