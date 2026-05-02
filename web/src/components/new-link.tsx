import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./input";

export function NewLink() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="bg-gray-100 px-6 py-8 rounded-md lg:w-90 h-full">
      <h2 className="text-black text-xl font-bold mb-6">Novo link</h2>

      <div className="flex flex-col gap-4">
        <Input legend="link original" placeholder="www.exemplo.com.br" />
        <Input legend="link encurtado" prefix="brev.ly/" />
      </div>

      <Button variant="blue" disabled={loading ? true : false } >
        {loading ? "Salvando..." : "Salvar link"} 
      </Button>
    </div>
  );
}
