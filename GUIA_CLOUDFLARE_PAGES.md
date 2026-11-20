# Guia: publicar o site no Cloudflare Pages (grátis)

Este guia é para o Miguel colocar o csfragrances.ca no [Cloudflare Pages](https://developers.cloudflare.com/pages/), no plano **Free**, que permite loja. Não precisa contratar nem assinar nada pago.

Os nomes dos menus abaixo foram conferidos na documentação oficial da Cloudflare (novembro de 2026). Se alguma tela estiver um pouco diferente, siga o que o próprio painel mostrar.

Fontes oficiais:

- Criar o projeto a partir do GitHub: [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- Comando e pasta do build: [Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- Versão do Node e do pnpm: [Build image](https://developers.cloudflare.com/pages/configuration/build-image/)
- Variáveis e segredos: [Environment variables / Secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- Funções (o checkout): [Functions](https://developers.cloudflare.com/pages/functions/get-started/)
- Domínio próprio: [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- SSL automático (quando o DNS fica na Cloudflare): [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/)

## 1. Crie uma conta grátis

1. Abra [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Cadastre-se com o seu e-mail e escolha o plano **Free**.
3. Confirme o e-mail se a Cloudflare pedir.

Não precisa adicionar o domínio da GoDaddy ainda. Primeiro o site precisa aparecer no endereço de teste (`*.pages.dev`).

## 2. Conecte o repositório do GitHub

1. No painel da Cloudflare, vá em **Workers & Pages**.
2. Clique em **Create application** → **Pages** → **Connect to Git**.
3. Escolha **GitHub** e, se pedir, autorize o aplicativo **Cloudflare Workers & Pages** na sua conta (a do `Miguel-Custodio`).
4. Selecione o repositório `cs-fragrances`.
5. Clique em **Install & Authorize** e depois em **Begin setup**, se esses botões aparecerem.

## 3. Configure o build

Na tela **Set up builds and deployments**, preencha assim:

| Campo | Valor |
| --- | --- |
| Project name | por exemplo `cs-fragrances` (isso vira o endereço `cs-fragrances.pages.dev`) |
| Production branch | **`master`** (é o site que já está no ar hoje; não use a branch de testes) |
| Framework preset | pode deixar em branco, ou Vite, se aparecer. Os dois campos abaixo importam mais do que o preset |
| Build command | `pnpm build` |
| Build output directory | `dist/public` |
| Root directory (advanced) | deixe em branco (o código está na raiz do repositório) |

A versão do Node já está no arquivo `.node-version` do repositório (`22`), que é o que a Cloudflare recomenda. O pnpm entra pelo `pnpm-lock.yaml`. Se o build reclamar da versão do pnpm, adicione a variável `PNPM_VERSION` com o valor `10.4.1` no passo 5.

O checkout (`POST /api/checkout`) já está pronto em `functions/api/checkout.ts`. A Cloudflare publica essa pasta sozinha; você não precisa criar a função na mão.

Clique em **Save and Deploy** e espere o primeiro build terminar.

## 4. Teste no endereço da Cloudflare, antes de mexer no domínio

Quando o deploy terminar, a Cloudflare mostra um endereço único, no formato:

`https://SEU-PROJETO.pages.dev`

Esse é o lugar certo para testar. O site da GoDaddy (`csfragrances.ca`) continua como está, até você apontar o domínio no passo 7.

Outras branches (por exemplo `feature/fase1-checkout-politicas`) ganham uma **prévia** automática, com outro endereço `*.pages.dev`. Use essa prévia para ver as páginas novas sem publicar no site principal.

Confira pelo menos:

- a Home, a loja, Our Story e as políticas;
- o carrinho (código postal e retirada grátis);
- o checkout: enquanto o token da Square e os valores reais de frete não estiverem configurados, o carrinho oferece o pedido por WhatsApp. Isso é esperado.

## 5. Variáveis e segredos

1. Abra o projeto em **Workers & Pages**.
2. Vá em **Settings** → **Variables and Secrets** → **Add**.
3. Cadastre as mesmas variáveis na **Production** e na **Preview** (a Preview é a das branches de teste).

| Nome | Tipo | Valor | Observação |
| --- | --- | --- | --- |
| `SQUARE_ACCESS_TOKEN` | Secret (marque **Encrypt**) | o token da Square | não cole isso no chat nem no GitHub |
| `SQUARE_LOCATION_ID` | variável | o Location ID da Square | |
| `SQUARE_ENVIRONMENT` | variável | `sandbox` na Preview; `production` só quando o site for ao ar de verdade | |
| `SITE_URL` | variável | na Preview, o endereço `*.pages.dev`; na Production, `https://www.csfragrances.ca` | |
| `SHIPPING_RATES_CONFIRMED` | variável | `false` | só mude para `true` quando os valores de frete forem os reais |
| `TAX_ENABLED` | variável | `false` | deixe desligado até o registro de GST/PST |
| `KITS_ENABLED` | variável | `false` | deixe desligado até a Raquel aprovar os kits |
| `VITE_TAX_ENABLED` | variável | `false` | tem que ser igual ao `TAX_ENABLED` |
| `VITE_KITS_ENABLED` | variável | `false` | tem que ser igual ao `KITS_ENABLED` |

Os nomes que começam com `VITE_` entram no site na hora do **build**. Se você mudar um deles depois, faça um novo deploy.

Depois de salvar as variáveis, dispare um novo deploy para elas valerem.

## 6. Como saber se o build deu certo

- Em **Deployments** (dentro do projeto), o build precisa aparecer como sucesso.
- O comando é `pnpm build` e a pasta enviada é `dist/public`.
- As páginas (`/about`, `/shop`, políticas) devem abrir no `*.pages.dev` (é um site em React: a Cloudflare serve a Home quando o arquivo da rota não existe, e o React cuida do resto).
- `/api/checkout` deve responder (em um teste de pagamento, ou com uma recusa amigável se a Square ainda não estiver configurada). Não deve aparecer uma página 404 de arquivo estático.

Se o build falhar por causa do Node ou do pnpm, confira se o `.node-version` está no repositório e, se precisar, defina `NODE_VERSION=22` e `PNPM_VERSION=10.4.1` em **Settings** → **Variables and Secrets**.

## 7. Só quando estiver pronto: apontar o domínio da GoDaddy

**Não faça este passo enquanto estiver só testando.** Mudar o DNS agora tira o site atual do ar (o da Vercel) e aponta o csfragrances.ca para a Cloudflare. Faça isso só quando você quiser publicar o site novo, e com a Production branch em `master` (ou na branch que você tiver aprovado).

Primeiro, associe o domínio **dentro** do projeto da Cloudflare. Se você criar o CNAME na GoDaddy sem esse passo, o endereço pode mostrar o erro **522**.

1. No projeto, vá em **Custom domains** → **Set up a domain**.
2. Digite o domínio (por exemplo `www.csfragrances.ca` ou `csfragrances.ca`) e clique em **Continue**.

Há dois caminhos, os dois descritos na documentação oficial:

### Opção A — trocar os nameservers (melhor para o domínio principal, `csfragrances.ca`)

Para usar o domínio sem o `www` (o “apex”, por exemplo `csfragrances.ca`), a Cloudflare pede que o domínio vire uma zona dela e que os nameservers apontem para a Cloudflare. Depois disso, ela mesma cria o registro CNAME.

1. A Cloudflare mostra **dois nameservers**.
2. No site da GoDaddy, no DNS do domínio, troque os nameservers pelos dois que a Cloudflare mostrou.
3. Espere a propagação (pode levar de alguns minutos a algumas horas).
4. Quando o domínio ficar com o status **Active** no painel da Cloudflare, o HTTPS (cadeado) é emitido sozinho. Em um domínio com DNS na Cloudflare isso é o Universal SSL, gratuito, renovado automaticamente.

Repita **Set up a domain** para `www.csfragrances.ca` se quiser os dois endereços.

### Opção B — só um CNAME, sem trocar os nameservers (serve para um subdomínio, como `www`)

Se você quiser deixar o DNS na GoDaddy, dá para apontar um **subdomínio** (por exemplo `www.csfragrances.ca`) com um CNAME para `SEU-PROJETO.pages.dev`.

A documentação oficial avisa: isso **não** basta para o domínio principal (`csfragrances.ca`) — para o apex, use a opção A.

1. Associe `www.csfragrances.ca` em **Custom domains** → **Set up a domain**.
2. Na GoDaddy, crie (ou edite) um registro **CNAME**:
   - Nome / host: `www`
   - Destino / conteúdo: `SEU-PROJETO.pages.dev`
3. Espere o status ficar **Active**. O certificado HTTPS é pedido automaticamente depois que o domínio é associado e fica ativo. Se o domínio não estiver com o DNS na Cloudflare, a validação do certificado pode pedir um passo a mais; nesse caso, siga o que o próprio painel mostrar.

## 8. Checklist rápido

- [ ] Conta Free criada, sem plano pago
- [ ] Repositório `cs-fragrances` conectado
- [ ] Production branch = `master`
- [ ] Build command = `pnpm build`, output = `dist/public`
- [ ] O site abre em `*.pages.dev` e a prévia da branch nova também
- [ ] Variáveis cadastradas (token da Square criptografado; flags de frete, imposto e kits ainda em `false`)
- [ ] Só então: domínio associado no painel e DNS da GoDaddy alterado
- [ ] Cadeado HTTPS aparecendo, status **Active**

Se algo travar no meio do caminho, pare antes de mudar o DNS e me chame com um print da tela.


## SEO e pré-renderização (nov/2026)

- O `pnpm build` agora gera um HTML estático por rota (título, meta, canonical, Open Graph e JSON-LD já no HTML), `404.html`, `sitemap.xml` e `robots.txt` em `dist/public`. Nada disso depende de serviço pago e funciona igual na Vercel e no Cloudflare Pages.
- Comando de build e pasta de saída não mudam: `pnpm build` e `dist/public`.
- Cloudflare Pages: não crie regra SPA (`/* /index.html 200`). Com o `404.html` presente, rotas inexistentes devolvem 404 de verdade. Os redirecionamentos (`/b2b` para `/business`) estão em `client/public/_redirects`; na Vercel estão em `vercel.json`.
- Redirecionar `csfragrances.ca` (sem www) para `https://www.csfragrances.ca` com 301 é feito no painel do domínio (Cloudflare: Rules > Redirect Rules; Vercel: Domains). Não está no código.
- Ao criar uma rota nova, inclua-a em `client/src/data/routes.ts`. O build falha se uma página fora do sitemap não tiver `noindex`, ou se aparecer "Scentec", "IFF" ou "[PLACEHOLDER" no HTML do B2B.
- Fatos B2B ainda não confirmados (pedido mínimo, prazos, entrega, equipamentos, termos) ficam em `shared/b2bConfig.ts`. Enquanto estiverem `null`, o site mostra "Contact us for details".

## Calculadora de private label (função de servidor)
A calculadora chama `POST /api/private-label-calc`. A tabela de fragrância por produto fica só no servidor
(`shared/privateLabelFormulas.ts`); o navegador recebe apenas % do lote e contagens arredondadas.
No Cloudflare Pages a função é `functions/api/private-label-calc.ts` (nenhuma variável de ambiente, sem custo extra).
No Vercel é `api/private-label-calc.ts`. Sem função (hospedagem 100% estática) a calculadora avisa que está indisponível.
