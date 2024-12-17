import { z } from 'zod'

export const projectSchema = z.object({
  name : z.string()
        .min(1, "Project length must be 1 word atleast")
        .max(100, "Project length should be less than 100"),
  key : z.string()
        .min(2, "Project key length should atleast be 2")
        .max(10, "Project key length should atmost be 10"),
  description :z.string()
              .max(500, "Project description cant be more than 500 words")
              .optional()
}) 