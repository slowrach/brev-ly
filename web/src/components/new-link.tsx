import { useState } from "react";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { Button } from "./ui/button";
import { Input } from "./input";
import { api } from "../http/api";

export function NewLink() {
  const [original, setOriginal] = useState("");
  const [short, setShort] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    try {
      setLoading(true);

      await api.post("/", { originalLink: original, shortLink: short });

      setOriginal("")
      setShort("")
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.message);
      }

      if (error instanceof AxiosError) {
        return alert("Não é possível criar com o mesmo link encurtado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 px-6 py-8 rounded-md lg:w-90 h-full">
      <h2 className="text-black text-xl font-bold mb-6">Novo link</h2>

      <div className="flex flex-col gap-4">
        <Input
          legend="link original"
          placeholder="www.exemplo.com.br"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />
        <Input
          legend="link encurtado"
          prefix="brev.ly/"
          value={short}
          onChange={(e) => setShort(e.target.value)}
        />
      </div>

      <Button
        onClick={() => submit()}
        variant="blue"
        disabled={loading ? true : false}
      >
        {loading ? "Salvando..." : "Salvar link"}
      </Button>
    </div>
  );
}
