import { officialMedia } from "@/data/academy";

export function PageHero({
  eyebrow,
  title,
  body,
  image = officialMedia.academyHero,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image?: string;
}) {
  return (
    <section className="page-hero" style={{ "--hero-image": `url(${image})` } as React.CSSProperties}>
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  );
}
