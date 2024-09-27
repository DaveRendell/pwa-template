import { z } from "zod"

const Item = z.object({
  id: z.number(),

  name: z.string().min(1),
  counter: z.number(),
})

type Item = z.infer<typeof Item>

export default Item
