import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number().optional(),
    subServices: z.array(
      z.object({
        title: z.string(),
        icon: z.string(),
      })
    ),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    serviceSlug: z.string(),
    order: z.number().optional(),
  }),
});
const settings = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    logo: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    socialMedia: z.array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
        icon: z.string(),
      })
    ),
    navigation: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ),
    contactInfo: z.array(
      z.object({
        label: z.string(),
        link: z.string(),
        icon: z.string(),
      })
    ),
  }),
});

export const collections = {
  services,
  projects,
  settings,
};
