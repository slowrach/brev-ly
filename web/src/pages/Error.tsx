import error from "../assets/404.svg"

export function Error() {
  return (
    <div className="bg-gray-100 rounded-md py-12 px-5 flex flex-col justify-center items-center sm:w-145 mx-4">
      <img src={error} alt="logo 404" className="w-50" />

      <h1 className="py-6 text-2xl font-bold">Link não encontrado</h1>

      <div className="text-gray-600 font-medium">
        <p className="text-center">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em {" "}
          <a className="text-theme-blue underline" href="/">
            brev.ly
          </a>.
        </p>
      </div>
    </div>
  );
}
