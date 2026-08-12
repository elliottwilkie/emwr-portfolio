import type { Metadata } from "next";
import { PhotographyPage } from "../GalleryPages";

export const metadata: Metadata = {
  title: "Photography",
  description: "Travel and everyday photography by Elliott Wilkie-Roşca.",
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  return <PhotographyPage />;
}
