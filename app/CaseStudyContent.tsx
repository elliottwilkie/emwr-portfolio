import { CaseStudy } from "./site-data";

function balancedText(text: string) {
  return text.replace(/(\p{L})-(?=\p{L})/gu, "$1\u2011");
}

function CaseSection({ title, paragraphs, emphasise = false }: { title: string; paragraphs: string[]; emphasise?: boolean }) {
  if (emphasise) {
    const familiar = paragraphs[1];
    const stop = familiar.indexOf(".");
    return (
      <section className="case-section oath-role">
        <h2>{balancedText(title)}</h2>
        <p>{balancedText(paragraphs[0])}<br /><br /><strong>{balancedText(familiar.slice(0, stop + 1))}</strong>{balancedText(familiar.slice(stop + 1))}</p>
        {paragraphs.slice(2).map((paragraph) => {
          const sentence = paragraph.indexOf(".");
          return <p key={paragraph}><strong>{balancedText(paragraph.slice(0, sentence + 1))}</strong>{balancedText(paragraph.slice(sentence + 1))}</p>;
        })}
      </section>
    );
  }

  return <section className="case-section"><h2>{balancedText(title)}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{balancedText(paragraph)}</p>)}</section>;
}

export function CaseStudyContent({ study, embedded = false }: { study: CaseStudy; embedded?: boolean }) {
  const preGallery = study.sections.slice(0, 3);
  const postGallery = study.sections.slice(3);

  return (
    <article className={`case-study-content study-${study.slug} ${embedded ? "is-embedded" : ""}`}>
      <header className="case-hero"><h1>{balancedText(study.title)}</h1><p>{balancedText(study.subtitle)}</p></header>
      <dl className="case-meta">{study.meta.map(([label, value]) => <div key={label}><dt>{balancedText(label)}</dt><dd>{balancedText(value)}</dd></div>)}</dl>
      <div className="case-copy">{preGallery.map((section) => <CaseSection key={section.title} {...section} emphasise={study.slug === "oath" && section.title === "My role"} />)}</div>
      <div className="case-gallery">{study.images.map((image, index) => <figure key={image}><img src={image} alt={`${study.title} design screen ${index + 1}`} loading={index < 2 ? "eager" : "lazy"} /></figure>)}</div>
      <div className="case-copy case-copy-after">
        {postGallery.map((section) => <CaseSection key={section.title} {...section} />)}
        {study.quotes?.map((item) => <blockquote key={item.byline}><p>“{balancedText(item.quote)}”</p><cite>{balancedText(item.byline)}</cite></blockquote>)}
      </div>
    </article>
  );
}
