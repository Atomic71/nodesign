import { z } from 'astro:content';

export const iconSchema = z.enum([
  'nodesign-brand',
  'social-facebook',
  'social-instagram',
  'home',
  'chevron-right',
  'phone',
  'email',
]);

export type IconType = z.infer<typeof iconSchema>;
