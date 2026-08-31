# VS Odonto

Site institucional do Dr. Vinicius Silva e Silva — Odontologia Planejada, no Tatuapé. Construído com Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4/CSS global, Vitest e Playwright.

## Desenvolvimento

Requer Node.js compatível com Next.js 16. Copie `.env.example` para `.env.local`, mantenha a indexação desativada localmente e execute:

```bash
npm install
npm run dev
```

Scripts disponíveis:

- `npm run build` — build otimizado de produção;
- `npm run lint` — análise estática;
- `npm run typecheck` — validação TypeScript;
- `npm run test` — testes unitários;
- `npm run test:e2e` — testes de interface com Playwright;
- `npm run format:check` — verificação de formatação.

## Configuração pública

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=5511974218938
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Em previews da Vercel, defina a URL real do preview e mantenha `NEXT_PUBLIC_ALLOW_INDEXING=false`. Para publicar no domínio oficial, configure a URL HTTPS final e somente então use `NEXT_PUBLIC_ALLOW_INDEXING=true`. Um build indexável com `localhost` é bloqueado de propósito.

Essas variáveis contêm apenas configuração pública. Não adicione segredos com o prefixo `NEXT_PUBLIC_`.

## Conteúdo e imagens

Dados comerciais e mídia ficam centralizados em `src/config/site.ts` e `src/data/content.ts`. As fotos aprovadas estão em `public/images/clinic`; substitua referências pelo catálogo `clinicMedia`, preservando dimensões e compressão. A imagem institucional da seção do Dr. Vinicius pode ser trocada por um retrato oficial quando aprovado pelo cliente.

## Deploy

O projeto está preparado para Vercel. Configure as variáveis separadamente para Preview e Production, rode todas as verificações e publique primeiro em preview. HSTS e uma CSP baseada em nonce devem ser avaliados somente junto ao domínio final e à estratégia definitiva de hospedagem; os demais headers de hardening já são enviados pela aplicação.
