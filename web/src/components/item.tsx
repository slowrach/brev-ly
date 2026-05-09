import { useState } from "react";
import copy from "../assets/copy.svg";
import trash from "../assets/trash.svg";
import { Button } from "./ui/button";
import { Message } from "./ui/message";
import { api } from "../http/api";
import { type Upload, useStates } from "../store/state";

export function Item({
  accessNumber,
  uploadId,
  originalLink,
  shortLink,
}: Upload) {
  const [visible, setVisible] = useState(false);
  const { deleteUpload } = useStates();

  async function deleteLink() {
    try {
      const isConfirmed = window.confirm(
        `Você realmente quer apagar o link ${shortLink}?`,
      );

      if (isConfirmed) {
        await api.delete(`/${uploadId}`);
        deleteUpload(uploadId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-between w-full gap-3 py-3 border-t border-t-gray-200">
      <div className="flex flex-col gap-1 w-39">
        <a
          href={`http://192.168.1.7:5173/${shortLink}`}
          target="_blank"
          className="text-theme-blue font-medium text-sm truncate lg:overflow-visible hover:underline"
        >
          {`brev.ly/${shortLink}`}
        </a>
        <span className="text-gray-400 text-xs truncate lg:overflow-visible">
          {originalLink}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm whitespace-nowrap">
          {`${accessNumber} acessos`}
        </span>

        <div className="flex gap-1">
          <Button
            variant="gray"
            onClick={() => {
              navigator.clipboard.writeText(originalLink);
              setVisible(true);
            }}
            className="h-8 w-8"
          >
            <img src={copy} alt="ícone de copiar" className="w-4 h-4" />
            <span className="sr-only">Copy Link</span>
          </Button>

          <Button
            variant="gray"
            onClick={() => deleteLink()}
            className="h-8 w-8"
          >
            <img src={trash} alt="ícone de deletar" className="w-4 h-4" />
            <span className="sr-only">Delete Link</span>
          </Button>
        </div>
      </div>

      {visible && (
        <Message
          variant="blue"
          title="Link copiado com sucesso"
          text={`O link ${shortLink} foi copiado para a área de transferência`}
          onClose={() => setVisible(false)}
        />
      )}
    </div>
  );
}
