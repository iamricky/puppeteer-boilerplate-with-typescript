import { z } from "zod";

export type Task = z.infer<typeof TaskSchema>;

const TaskFunctionsSchema = z.record(
  z.object({
    path: z
      .string({
        invalid_type_error: "Handler path must be a string.",
      })
      .optional(),
    description: z.string().optional(),
  }),
);

export const TaskSchema = z.object({
  name: z.string({
    required_error: "A name is required for tasks.",
    invalid_type_error: "Name must be a string.",
  }),
  description: z.string().optional(),
  functions: TaskFunctionsSchema,
});
