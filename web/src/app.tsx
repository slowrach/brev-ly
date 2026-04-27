import logo from "./assets/logo.svg";
import { MyLinks } from "./components/my-links";
import { NewLink } from "./components/new-link";
export { NewLink } from "./components/new-link"

export function App() {
  return (
    <main className='h-dvh flex flex-col justify-center items-center bg-gray-200'>
      <img src={logo} alt="logo"  className="h-6 mb-4"/>

      <div className="flex flex-col gap-3">
        <NewLink />
        <MyLinks />
      </div>
    </main>
  )
}
