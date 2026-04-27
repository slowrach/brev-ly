import download from "../assets/download.svg"
import { Item } from "./item"

export function MyLinks() {
  return (
    <div className="bg-gray-100 p-6 rounded-md w-90">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-black text-xl font-bold">Meus links</h2>

        <button className="bg-gray-200 text-gray-500 rounded-md p-2 flex items-center gap-1">
          <img src={download} alt="ícone de download" className="w-4 h-4" />
          <span className="text-xs font-bold">Baixar CSV</span>
        </button>
      </div>

      <div>
        <Item />
      </div>

    </div>
  )
}
