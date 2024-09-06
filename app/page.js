"use client";

import Hero from "./hero/page";
import RelatedProduct from "../common/relatedProduct";

export default function Home() {
  return (
    <div className="md:flex flex-col flex gap-16 items-center justify-center ">
      <Hero />
      <RelatedProduct heading="RelatedProduct" />
    </div>
  );
}
