import type { Metadata } from "next";
import { CaseStudyContent } from "../../CaseStudyContent";
import { HomePill, TimeFooter } from "../../SiteChrome";
import { caseStudies } from "../../site-data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return { title: "Project not found" };

  const socialTitle = `${study.title} — Elliott Wilkie-Roşca`;
  return {
    title: study.title,
    description: study.subtitle,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: socialTitle,
      description: study.subtitle,
      url: `/work/${slug}`,
      siteName: "Elliott Wilkie-Roşca",
      type: "article",
      images: [{ url: "/og-social.png", width: 1731, height: 909, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: study.subtitle,
      images: ["/og-social.png"],
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) return <main className="detail-page"><h1>Not found</h1><HomePill /></main>;

  return (
    <main className={`detail-page case-study-page study-${study.slug}`}>
      <CaseStudyContent study={study} />
      <TimeFooter />
      <HomePill />
    </main>
  );
}
