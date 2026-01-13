import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  phone: z.string()
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s\-\+\(\)]*$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 200 * 1024 * 1024, 'File size must be less than 200MB')
    .refine(
      (file) => {
        const allowedTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
          'image/gif',
          'video/mp4',
          'video/webm',
          'video/quicktime',
        ];
        return allowedTypes.includes(file.type);
      },
      'File type not allowed. Allowed types: JPEG, PNG, WEBP, GIF, MP4, WEBM, MOV'
    ),
});

// Content item validation
export const contentItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(200),
  image: z.string().url('Invalid image URL'),
  description: z.string().max(5000).optional(),
  date: z.string().max(100).optional(),
  price: z.string().max(50).optional(),
  benefits: z.array(z.string()).optional(),
  trainer: z.string().max(200).optional(),
  schedule: z.array(z.string()).optional(),
  headerImage: z.string().url('Invalid header image URL').optional(),
});


