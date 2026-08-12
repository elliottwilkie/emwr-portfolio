import type { Metadata } from "next";
import { ExperimentsPage } from "./ExperimentsPage";

export const metadata: Metadata = {
  title: "Experiments",
  description: "A collection of product concepts, interactions, and experiments by Elliott Wilkie-Roşca.",
  alternates: { canonical: "/selected-works" },
};

export default function SelectedWorksPage() {
  return <ExperimentsPage />;
}
