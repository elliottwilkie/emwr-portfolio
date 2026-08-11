import { CaseStudyContent } from "../../CaseStudyContent";
import { HomePill, TimeFooter } from "../../SiteChrome";
import { caseStudies } from "../../site-data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
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
