/** TEMP debug: lists env var NAMES visible to Pages Functions (never values). Remove before launch. */
export const onRequest = ({ env }: { env: Record<string, unknown> }): Response =>
  new Response(
    JSON.stringify({ names: Object.keys(env).filter((k) => k !== 'ASSETS').map((k) => JSON.stringify(k)).sort() }, null, 2),
    { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } },
  );
