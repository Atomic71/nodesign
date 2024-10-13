import { defineCollection, z } from 'astro:content';
import homeSchema from './home/schema';
import { iconSchema } from '@utils/schemas/icons';

const home = defineCollection({
  type: 'data',
  schema: homeSchema,
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: iconSchema,
    order: z.number().optional(),
    subServices: z.array(
      z.object({
        title: z.string(),
        icon: iconSchema,
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

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    mission: z.object({
      title: z.string(),
      description: z.string(),
    }),
    team: z.object({
      title: z.string(),
      description: z.string(),
    }),
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
        icon: iconSchema,
        label: z.string(),
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
        url: z.string(),
        icon: iconSchema,
      })
    ),
  }),
});

const contact = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  services,
  // projects,
  settings,
  home,
  contact,
  about,
};
