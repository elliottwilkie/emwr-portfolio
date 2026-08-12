import type { Metadata } from "next";
import { ArtGalleryPage } from "../GalleryPages";

export const metadata: Metadata = {
  title: "Art and illustration",
  description: "Portraits, sketches, and illustration work by Elliott Wilkie-Roşca.",
  alternates: { canonical: "/art" },
};

export default function ArtPage() {
  return <ArtGalleryPage />;
}
