# Notas Iniciais do Projeto CS Fragrances

**Estrutura do Projeto:**
*   **Tecnologia:** Parece ser um projeto full-stack com `client/` (frontend) e `server/` (backend). O frontend utiliza React/TypeScript (`.tsx` e `tsconfig.json`) e provavelmente Vite, dado o `vite.config.ts`.
*   **Frontend (`client/src`):**
    *   Páginas: `Home.tsx`, `NotFound.tsx`.
    *   Componentes: `Navigation.tsx`, `HeroSection.tsx`, `PerfumesSection.tsx`, `SoapSection.tsx`, `StorySection.tsx`, `FeaturesSection.tsx`, `Footer.tsx`, `ProductCard.tsx`, `ProductCardEnhanced.tsx`, `ProductsSection.tsx`.
    *   A página inicial (`Home.tsx`) é composta por seções modulares.

**Requisitos do Usuário e Mapeamento para Componentes:**
1.  **Novos Produtos:**
    *   CS Her (Feminino, R$ 69,90)
    *   CS Origin (Feminino, R$ 69,90)
    *   CS Enigma (Masculino, R$ 69,90)
    *   CS Horizon (Masculino, R$ 69,90)
    *   *Ação:* Atualizar a seção de dados/produtos (provavelmente em `client/src/data/` ou `client/src/const.ts`) e o componente `PerfumesSection.tsx` ou `ProductsSection.tsx`.
2.  **Botões Chatbot/WhatsApp:**
    *   *Ação:* Criar um novo componente flutuante (ex: `FloatingButtons.tsx`) e integrá-lo ao `App.tsx` ou `Home.tsx`.
3.  **Integração Instagram (@bycsfragrances):**
    *   *Ação:* Criar uma nova seção (ex: `InstagramFeedSection.tsx`) e integrá-la ao `Home.tsx`. Será necessário usar um widget ou API de terceiros, pois o Instagram não oferece mais feeds simples via API.
4.  **Página de Produtos Dinâmica e Detalhada:**
    *   *Ação:* Criar uma nova página (ex: `ProductDetail.tsx` em `client/src/pages/`) e configurar o roteamento (se ainda não estiver configurado). O componente `ProductCardEnhanced.tsx` pode ser uma base.
5.  **Cards Detalhados na Seção "Fragrances":**
    *   *Ação:* Modificar `PerfumesSection.tsx` ou criar um novo componente de card para exibir o detalhamento.
6.  **Seção de Ingredientes:**
    *   *Ação:* Criar uma nova seção (ex: `IngredientsSection.tsx`) e integrá-la ao `Home.tsx` ou à nova página de detalhes do produto.

**Imagens Anexadas:**
*   As imagens foram descompactadas e estão no diretório raiz. Devem ser movidas para um diretório de assets (ex: `client/public/images/`) para serem usadas no frontend.

**Pesquisa de Referência (Tom Ford, Jo Malone):**
*   **Princípios de Design de Luxo:** Foco em design limpo, tipografia elegante, alta qualidade de imagem, experiência de compra sem atrito e imersão na marca.
*   **Aplicações:** Usar as imagens fornecidas com destaque, garantir que a navegação seja intuitiva e que a página de detalhes do produto seja visualmente rica e informativa, seguindo o padrão de "venda expressiva de perfumes mundialmente".

**Próximos Passos:**
1.  Mover as imagens para o diretório de assets.
2.  Localizar e analisar o arquivo de dados de produtos.
3.  Iniciar a implementação das alterações de conteúdo.
4.  Realizar a pesquisa de API/Widget para o feed do Instagram.
5.  Implementar as funcionalidades de chatbot/WhatsApp.
