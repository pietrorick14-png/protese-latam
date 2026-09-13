# PROTESE LATAM

Landing page estática em espanhol neutro LATAM, mesma estrutura visual e de conteúdo da página brasileira de próteses capilares (`pr-teses`), só com a copy traduzida.

## Estado atual
- Copy em espanhol neutro LATAM, nas 9 dobras (igual à página original)
- Mockup principal LATAM em AVIF/WebP, seis larguras (400 a 1536px), preload do LCP
- 3 depoimentos em espanhol
- Imagens da seção de modelos mantidas iguais à versão brasileira (hotlink para `cursoprotesecapilar.lovable.app`), por pedido explícito
- Sem pixels, UTMs ou scripts de rastreamento
- Sem checkout ainda; os CTAs apontam para `#checkout` (âncora da própria página) até o link da Wiapy ser instalado
- HTML/CSS/JS puro, sem framework nem passo de build — publica direto no Cloudflare Pages apontando para a raiz do repositório, sem comando de build

## Pendências antes de publicar de verdade
- Trocar `href="#checkout"` pelos links de checkout (Wiapy) quando existirem
- Registrar tracking (UTMify/Meta), se for usar
