import type { Metadata } from "next";
import { HomePage } from "./HomePage";

export const metadata: Metadata = {
  title: { absolute: "Elliott Wilkie-Roşca — Product Designer" },
  description:
    "Product designer with 12+ years of experience simplifying complex products across healthcare, AI, e-commerce, and emerging technology.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
