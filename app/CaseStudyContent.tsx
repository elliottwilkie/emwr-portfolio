import { CaseStudy } from "./site-data";

function CaseSection({ title, paragraphs, emphasise = false }: { title: string; paragraphs: string[]; emphasise?: boolean }) {
  if (emphasise) {
    const familiar = paragraphs[1];
    const stop = familiar.indexOf(".");
    return (
      <section className="case-section oath-role">
        <h2>{title}</h2>
        <p>{paragraphs[0]}<br /><br /><strong>{familiar.slice(0, stop + 1)}</strong>{familiar.slice(stop + 1)}</p>
        {paragraphs.slice(2).map((paragraph) => {
          const sentence = paragraph.indexOf(".");
          return <p key={paragraph}><strong>{paragraph.slice(0, sentence + 1)}</strong>{paragraph.slice(sentence + 1)}</p>;
        })}
      </section>
    );
  }

  return <section className="case-section"><h2>{title}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>;
}

export function CaseStudyContent({ study, embedded = false }: { study: CaseStudy; embedded?: boolean }) {
  const preGallery = study.sections.slice(0, 3);
  const postGallery = study.sections.slice(3);

  return (
    <article className={`case-study-content study-${study.slug} ${embedded ? "is-embedded" : ""}`}>
      <header className="case-hero"><h1>{study.title}</h1><p>{study.subtitle}</p></header>
      <dl className="case-meta">{study.meta.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="case-copy">{preGallery.map((section) => <CaseSection key={section.title} {...section} emphasise={study.slug === "oath" && section.title === "My role"} />)}</div>
      <div className="case-gallery">{study.images.map((image, index) => <figure key={image}><img src={image} alt={`${study.title} design screen ${index + 1}`} loading={index < 2 ? "eager" : "lazy"} /></figure>)}</div>
      <div className="case-copy case-copy-after">
        {postGallery.map((section) => <CaseSection key={section.title} {...section} />)}
        {study.quotes?.map((item) => <blockquote key={item.byline}><p>“{item.quote}”</p><cite>{item.byline}</cite></blockquote>)}
      </div>
    </article>
  );
}
