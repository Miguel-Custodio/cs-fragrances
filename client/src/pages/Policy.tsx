import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import { POLICY_LAST_UPDATED, type PolicyDoc } from '@/data/policies';

/** Renders one policy document. Text containing [PLACEHOLDER: ...] is highlighted so it cannot be missed. */
function Highlighted({ text }: { text: string }) {
  const parts = text.split(/(\[PLACEHOLDER[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[PLACEHOLDER') ? (
          <mark key={i} className="bg-amber-200 text-amber-950 px-1 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Policy({ doc }: { doc: PolicyDoc }) {
  usePageMeta(doc.title, doc.description);

  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <article className="container max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">{doc.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            Last updated: <Highlighted text={POLICY_LAST_UPDATED} />
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <Highlighted text={doc.intro} />
          </p>
          {doc.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-3">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-gray-700 mb-3 leading-relaxed">
                  <Highlighted text={p} />
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {section.bullets.map((b, i) => (
                    <li key={i}>
                      <Highlighted text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
}
