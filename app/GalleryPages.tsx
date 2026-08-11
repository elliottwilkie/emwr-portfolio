"use client";

import { HomePill, TimeFooter } from "./SiteChrome";
import { artImages, photoImages } from "./site-data";

export function ArtGalleryPage({ embedded = false }: { embedded?: boolean }) {
  const Wrapper = embedded ? "div" : "main";

  return (
    <Wrapper className={`detail-page gallery-page ${embedded ? "gallery-page-embedded" : ""}`}>
      <header className="gallery-intro">
        <h1>Art and illustration</h1>
        <p>I&apos;ve been drawing since I could hold a pencil, now it&apos;s a life-long hobby. My claim to fame is that Mads Mikkelsen shared my portrait of him (yay).</p>
      </header>
      <div className="two-column-gallery art-grid">
        <div className="art-column">
          {artImages.slice(0, 7).map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`Illustration ${index + 1}`} loading="eager" /></figure>)}
        </div>
        <div className="art-column">
          {artImages.slice(7).map((image, index) => <figure key={`${image}-${index + 7}`}><img src={image} alt={`Illustration ${index + 8}`} loading="eager" /></figure>)}
        </div>
      </div>
      {!embedded && <TimeFooter wide />}
      {!embedded && <HomePill />}
    </Wrapper>
  );
}

export function PhotographyPage({ embedded = false }: { embedded?: boolean }) {
  const Wrapper = embedded ? "div" : "main";

  return (
    <Wrapper className={`detail-page gallery-page ${embedded ? "gallery-page-embedded" : ""}`}>
      <header className="gallery-intro">
        <h1>Photography</h1>
        <p>I love to travel, and whenever I slip into pretending I&apos;m a photographer. I like capturing places, details, and little moments that would otherwise blur together.</p>
      </header>
      <div className="two-column-gallery photo-grid">
        {photoImages.map((item, index) => <figure key={`${item.image}-${index}`}><img src={item.image} alt={item.label} loading="eager" /><figcaption role="tooltip">{item.label}</figcaption></figure>)}
      </div>
      {!embedded && <TimeFooter wide />}
      {!embedded && <HomePill />}
    </Wrapper>
  );
}
