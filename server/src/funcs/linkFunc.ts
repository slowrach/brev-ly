import z from "zod";
import { Readable } from "node:stream";

const linkRequest = z.object({
   name: z.string(),
   contentStream: z.instanceof(Readable),
})

