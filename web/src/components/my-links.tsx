import { useState } from "react";
import download from "../assets/download.svg";
import link from "../assets/link.svg";
import { Item } from "./item";
import { Button } from "./ui/button";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { motion } from "motion/react";

export function MyLinks() {
  const [items, setItems] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gray-100 p-6 rounded-md lg:w-145 h-full relative overflow-hidden">
      {loading && (
        <motion.div
          className="absolute top-0 left-0 bg-theme-blue h-1 w-[25%]"
          animate={{ x: ["-100%", "400%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      )}

      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-black text-xl font-bold">Meus links</h2>
        <Button variant="gray" disabled={false}>
          <img src={download} alt="ícone de download" className="w-4 h-4" />
          <span className="text-xs font-bold">Baixar CSV</span>
        </Button>
      </div>
      {items ? (
        <ScrollArea.Root type="always">
          <ScrollArea.Viewport className="h-70 lg:h-112">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none transition-colors duration-160 ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col translate-x-3"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 bg-theme-blue before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:-translate-x-1/2 before:-translate-y-1/2" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 border-t border-t-gray-300 w-full h-full pt-8 pb-10">
          <img src={link} alt="ícone de link" />
          <span className="text-xxs text-gray-500 uppercase">
            Ainda não existem links cadastrados
          </span>
        </div>
      )}
    </div>
  );
}
