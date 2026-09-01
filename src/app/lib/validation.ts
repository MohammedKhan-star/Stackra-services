import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .max(100, "Company name is too long")
    .optional()
    .or(z.literal("")),

  service: z
    .string()
    .min(1, "Please select a service"),

  budget: z
    .string()
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;