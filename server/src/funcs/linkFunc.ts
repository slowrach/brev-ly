import z from "zod";

const linkRequest = z.object({
   originalLink: z.url(),
   shortLink: z.string(),
})

export type LinkRequest = z.input<typeof linkRequest>

export async function uploadLinks(request: LinkRequest) {
   const { originalLink, shortLink } = linkRequest.parse(request)

   return { originalLink, shortLink }
}



