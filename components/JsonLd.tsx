/**
 * Rendert strukturierte Daten (schema.org / JSON-LD) in den HTML-Output.
 *
 * Server-Component ohne Client-JS: das Script-Tag steht damit schon im
 * ausgelieferten HTML und wird auch von Crawlern gelesen, die kein JavaScript
 * ausfuehren (u. a. den meisten KI-Crawlern).
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // `<` maskieren, damit ein Inhalt wie "</script>" aus den Google-Sheet-
          // Daten das Script-Tag nicht vorzeitig schliessen kann.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
