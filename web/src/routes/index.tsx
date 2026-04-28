import { Routes, Route } from "react-router";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";

export function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
