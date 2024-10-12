import { z } from 'astro:content';

const carouselSlideSchema = z.object({
  image: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

const testimonialSchema = z.object({
  content: z.string(),
  author: z.string(),
});

const homeSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  heroImage: z.string(),
  carouselSlides: z.array(carouselSlideSchema),
  services: z.object({
    title: z.string(),
    description: z.string(),
  }),
  featuredProjects: z.object({
    title: z.string(),
    description: z.string(),
  }),
  about: z.object({
    title: z.string(),
    description: z.string(),
    cta: z.string(),
  }),
  testimonials: z.object({
    title: z.string(),
    items: z.array(testimonialSchema),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    link: z.string(),
  }),
});

export default homeSchema;
