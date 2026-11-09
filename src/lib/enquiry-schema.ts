import { z } from "zod";
import { TERMS_VERSION } from "./terms";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  businessName: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9+()\-\s]*$/, "Please enter a valid phone number")
    .optional()
    .default(""),
  service: z.string().trim().max(160).optional().default(""),
  location: z.string().trim().min(1, "Please enter the project location").max(200),
  budget: z.string().trim().max(80).optional().default(""),
  details: z.string().trim().min(10, "Please tell me a little more (at least 10 characters)").max(5000),
  contactMethod: z.string().trim().max(40).optional().default(""),
  termsAccepted: z.literal(true),
  termsReadToEnd: z.literal(true),
  termsVersion: z.literal(TERMS_VERSION),
  // spam protection
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().nonnegative(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
