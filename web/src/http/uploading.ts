import axios from "axios";

interface Params {
   originalLink: string,
   shortLink: string,
}

export async function uploading({ originalLink, shortLink }: Params) {
   const data = new FormData()

   data.append(originalLink, shortLink)

   const response = await axios.post<{ originalLink: string, shortLink: string }>('http://localhost:3333/', data)

   return { originalLink: response.data.originalLink, shortLink: response.data.shortLink }
}