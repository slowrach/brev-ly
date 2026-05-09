import { useState } from "react";
import z, { ZodError } from "zod";
import { AxiosError } from "axios";
import { Button } from "./ui/button";
import { Input } from "./input";
import { api } from "../http/api";
import { useStates } from "../store/state";
import { InputError } from "./inputError";
import { Message } from "./ui/message";
import type { Upload } from "../store/state";

const inputSchema = z.object({
  originalLink: z.url({ message: "Informe uma url válida" }).trim(),
  shortLink: z
    .string({
      message: "Informe uma url minúscula e sem espaço/caracter especial",
    })
    .min(1, {
      message: "Informe uma url minúscula e sem espaço/caracter especial",
    })
    .trim(),
});

export function NewLink() {
  const { saving, setSaving, addUpload } = useStates();

  const [original, setOriginal] = useState("");
  const [short, setShort] = useState("");
  const [errorOriginal, setErrorOriginal] = useState("");
  const [errorShort, setErrorShort] = useState("");
  const [errorApi, setErrorApi] = useState("");

  function handleChangeOriginal(value: string) {
    const parsed = inputSchema.partial().safeParse({ originalLink: value });

    setOriginal(value);

    if (errorOriginal !== "" && (!parsed.error || value.length === 0))
      setErrorOriginal("");
  }

  function handleChangeShort(value: string) {
    const parsed = inputSchema.partial().safeParse({ shortLink: value });

    setShort(value);

    if ((errorShort !== "" && !parsed.error) || value.length === 0)
      setErrorShort("");
  }

  async function submit() {
    try {
      setSaving(true);

      setErrorOriginal("");
      setErrorShort("");

      const data = inputSchema.parse({
        originalLink: original,
        shortLink: short,
      });

      const response = await api.post<Upload>("/", {
        originalLink: data.originalLink,
        shortLink: data.shortLink,
      });

      setOriginal("");
      setShort("");
      addUpload(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          if (issue.path[0] === "originalLink") {
            setErrorOriginal(issue.message);
          }
          if (issue.path[0] === "shortLink") {
            setErrorShort(issue.message);
          }
        });
      }

      if (error instanceof AxiosError) {
        setErrorApi(error.response!.data.message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-gray-100 px-6 py-8 rounded-md lg:w-90 h-full">
      <h2 className="text-black text-xl font-bold mb-6">Novo link</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input
            type="url"
            legend="link original"
            placeholder="www.exemplo.com.br"
            value={original}
            required
            onChange={(e) => handleChangeOriginal(e.target.value)}
            className={errorOriginal && "border-red-700"}
          />
          {errorOriginal && <InputError message={errorOriginal} />}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            legend="link encurtado"
            prefix="brev.ly/"
            value={short}
            required
            onChange={(e) => handleChangeShort(e.target.value)}
            className={errorShort && "border-red-700"}
          />
          {errorShort && <InputError message={errorShort} />}
        </div>
      </div>

      <Button
        onClick={() => submit()}
        variant="blue"
        disabled={saving ? true : false}
      >
        {saving ? "Salvando..." : "Salvar link"}
        <span className="sr-only">Save link</span>
      </Button>

      {errorApi.length > 0 && (
        <Message
          onClose={() => setErrorApi("")}
          title="Erro no cadastro"
          text={errorApi}
          variant="red"
        />
      )}
    </div>
  );
}
