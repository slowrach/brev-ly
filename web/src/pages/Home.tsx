import logo from "../assets/logo.svg";
import icon from "../assets/logo-icon.svg";
import { MyLinks } from "../components/my-links";
import { NewLink } from "../components/new-link";
import { useParams } from "react-router";
import { useStates, type Upload } from "../store/state";
import { Error } from "./Error";
import { useEffect } from "react";
import { api } from "../http/api";

export function Home() {
  const params = useParams();
  const { loading, uploads, setUploads, setLoading } = useStates();

  useEffect(() => {
    async function getUploads() {
      setLoading(true);
      try {
        const response = await api.get<Upload[]>("/");
        setUploads(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUploads();
  }, []);

  if (!params.shortLink)
    return (
      <div className="flex my-8 lg:my-22  justify-center">
        <div className="flex flex-col">
          <img
            src={logo}
            alt="logo"
            className="h-6 mb-6 lg:mb-8 lg:self-start"
          />
          <div>
            <div className="flex flex-col gap-3 lg:flex-row">
              <NewLink />
              <MyLinks />
            </div>
          </div>
        </div>
      </div>
    );

  if (loading) return;

  const link = uploads.find((upload) => upload.shortLink === params.shortLink);

  if (link) {
    window.location.replace(link.originalLink);

    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="bg-gray-100 rounded-md py-12 px-5 flex flex-col justify-center items-center sm:w-145 mx-4">
          <img src={icon} alt="logo do site" />

          <h1 className="py-6 text-2xl font-bold">Redirecionando...</h1>

          <div className="text-gray-600 font-medium">
            <p className="text-center">
              O link será aberto automaticamente em alguns instantes.
            </p>
            <p className="text-center">
              Não foi redirecionado?{" "}
              <a className="text-theme-blue underline" href={link.originalLink}>
                Acesse aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <Error />
      </div>
    );
}
