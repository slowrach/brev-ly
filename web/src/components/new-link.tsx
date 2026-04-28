import { useState } from "react";
import { Button } from "./ui/button";

export function NewLink() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="bg-gray-100 p-6 rounded-md lg:w-90 h-full">
      <h2 className="text-black text-xl font-bold mb-6">Novo link</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="uppercase text-xxs text-gray-500 mb-2">
            link original
          </label>
          <input
            type="text"
            placeholder="www.exemplo.com.br"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="uppercase text-xxs text-gray-500 mb-2">
            link encurtado
          </label>
          <input
            type="text"
            placeholder="brev.ly/"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      <Button variant="blue" disabled={loading ? true : false} >
        {loading ? "Salvando..." : "Salvar link"} 
      </Button>
    </div>
  );
}
