import { useState } from "react";
import logo from "../assets/logo.svg";
import icon from "../assets/logo-icon.svg";
import { MyLinks } from "../components/my-links";
import { NewLink } from "../components/new-link";

export function Home() {
   const [redirect, setRedirect] = useState(false)

   return redirect ? (
      <div className="bg-gray-100 rounded-md py-12 px-5 flex flex-col justify-center items-center sm:w-145 mx-4">
        <img src={icon} alt="logo do site" />

        <h1 className="py-6 text-2xl font-bold">Redirecionando...</h1>

        <div className="text-gray-600 font-medium">
          <p className="text-center">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <p className="text-center">
            Não foi redirecionado?{" "}
            <a className="text-theme-blue underline" href="#">
              Acesse aqui
            </a>
          </p>
        </div>
      </div>
   ) : (
      <div className="w-full">
        <img src={logo} alt="logo" className="h-6 mb-4 lg:mb-8 m-auto lg:m-0" />
        <div className="flex flex-col gap-3 lg:flex-row">
          <NewLink />
          <MyLinks />
        </div>
      </div>
   );
}