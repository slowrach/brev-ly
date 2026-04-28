import { BrowserRouter } from "react-router";
import { Index } from "./routes";
export { NewLink } from "./components/new-link";

export function App() {
  return (
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}
