import copy from "../assets/copy.svg";
import trash from "../assets/trash.svg";
import { Button } from "./ui/button";

export type Upload = {
  originalLink: string;
  shortLink: string;
};

export function Item({ originalLink, shortLink }: Upload) {
  return (
    <div className="flex items-center justify-between w-full gap-3 py-3 border-t border-t-gray-200">
      <div className="flex flex-col gap-1 w-39">
        <span className="text-theme-blue font-medium text-sm truncate lg:overflow-visible">
          {originalLink}
        </span>
        <span className="text-gray-400 text-xs truncate lg:overflow-visible">
          {`brev.ly/${shortLink}`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm whitespace-nowrap">
          30 acessos
        </span>

        <div className="flex gap-1">
          <Button variant="gray">
            <img src={copy} alt="ícone de copiar" className="w-4 h-4" />
          </Button>
          <Button variant="gray">
            <img src={trash} alt="ícone de deletar" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
