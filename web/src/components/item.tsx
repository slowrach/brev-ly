import copy from "../assets/copy.svg"
import trash from "../assets/trash.svg"

export function Item() {
  return (
    <div className="flex items-center justify-between w-full py-2 border-t border-t-gray-200 width-full">
      <div className="flex flex-col gap-1">
        <span className="text-[#2C46B1] font-medium text-sm">projeto_final.pdf</span>
        <span className="text-gray-400 text-xs">brev.ly/proj2026</span>
      </div>

      <div className="text-gray-500 text-sm">
        30 acessos
      </div>

      <div className="flex gap-2">
        <button className="bg-gray-200 text-gray-500 rounded-md p-2 flex items-center gap-1">
          <img src={copy} alt="ícone de copiar" className="w-4 h-4" />
        </button>
        <button className="bg-gray-200 text-gray-500 rounded-md p-2 flex items-center gap-1">
          <img src={trash} alt="ícone de deletar" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
