import { Hero } from "@/components/landing/Hero";
import {
  ProblemSolution,
  Benefits,
  Differentiator,
} from "@/components/landing/sections";
import { Testimonials } from "@/components/landing/Testimonials";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ContactSection } from "@/components/ContactSection";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import { testimonials, type LandingData } from "@/lib/landings";

export function ProductLanding({ data }: { data: LandingData }) {
  return (
    <>
      <JsonLd data={faqSchema(data.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: data.hero.eyebrow, path: data.path },
        ])}
      />

      <Hero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        highlight={data.hero.highlight}
        subtitle={data.hero.subtitle}
        bullets={data.hero.bullets}
        secondaryCta={{ label: "Ver cómo trabajamos", href: "#contacto" }}
      />

      <ProblemSolution
        problem={data.problem}
        solution={data.solution}
      />

      <Benefits
        title={data.benefits.title}
        subtitle={data.benefits.subtitle}
        items={data.benefits.items}
      />

      {data.differentiator && (
        <Differentiator
          stat={data.differentiator.stat}
          statLabel={data.differentiator.statLabel}
          title={data.differentiator.title}
          body={data.differentiator.body}
        />
      )}

      <VideoTestimonial />

      <Testimonials items={testimonials} className="bg-sand" />

      <FAQ items={data.faq} />

      <ContactSection origen={data.path} />

      <FinalCTA title={data.finalCta.title} body={data.finalCta.body} />
    </>
  );
}
