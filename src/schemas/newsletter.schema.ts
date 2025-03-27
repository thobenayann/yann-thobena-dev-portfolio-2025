import { z } from 'zod';

export const newsletterSchemaMessages = {
    en: {
        required: 'Email is required',
        invalid: 'Please enter a valid email address',
    },
    fr: {
        required: "L'email est requis",
        invalid: 'Veuillez entrer une adresse email valide',
    },
} as const;

export const getNewsletterSchema = (locale: 'en' | 'fr') =>
    z.object({
        email: z
            .string()
            .min(1, { message: newsletterSchemaMessages[locale].required })
            .email({ message: newsletterSchemaMessages[locale].invalid }),
    });

export const newsletterSchema = getNewsletterSchema('en');

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
