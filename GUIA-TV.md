# 📺 Como instalar na TV + Colocar Online

## Opção 1 — Mais fácil (funciona em TODA Smart TV): Navegador da TV

1. **Coloque online grátis em 30 segundos:**
   - Arraste a pasta `player` para https://app.netlify.com/drop (é só arrastar, sem cadastro complexo)
   - OU: https://vercel.com/new → importe a pasta `player`
   - OU: `npx vercel --prod` dentro de `player` (se usa Vercel CLI)
   - Você ganha um link tipo `https://seu-iptv.netlify.app`

2. **Na TV:** abra o navegador (LG webOS, Samsung Tizen, Android TV, Roku, Fire TV todos têm) e digite o link.
3. Salve nos favoritos. Pronto — vira app de TV.

> **Dica:** depois que abrir na TV, no Chrome da TV aparece "Instalar app" / "Adicionar à tela inicial" → vira ícone como Netflix.

## Opção 2 — Melhor experiência (Android TV / Google TV / Fire TV Stick)

Essas TVs rodam Android — instale como app nativo:

**A) Kodi (recomendado, melhor player HLS da TV):**
1. Instale **Kodi** pela Play Store da TV
2. Kodi → Add-ons → Meus add-ons → Clientes PVR → **IPTV Simple Client** → Ativar
3. Configure → URL da lista M3U: cole seu link online ex: `https://seu-iptv.netlify.app/playlists/br.m3u`
4. Ou copie `player/playlists/br.m3u` para um pendrive e aponte local.

**B) Apps IPTV da Play Store da TV:**
- **TiviMate**, **IPTV Smarters Pro**, **OTT Navigator** → cole a mesma URL `.../playlists/br.m3u`
- São feitos para controle remoto.

**C) Instalar este player como APK (PWA em APK):**
1. No celular, abra o link → Menu Chrome → "Instalar app"
2. Ou gere APK com https://pwa2apk.com ou https://appsgeyser.com colando seu link
3. Instale no TV via "Enviar para TV" / pendrive (ativar Fontes desconhecidas)

## Opção 3 — LG webOS / Samsung Tizen (sem Android)

- Use **Opção 1 (navegador)** — é o oficial
- Ou instale **SS IPTV** / **Smart IPTV** / **Net IPTV** pela loja da TV e cole a URL `https://seu-iptv.netlify.app/playlists/br.m3u`
- LG webOS também aceita instalar via **WebOS Dev Manager** se quiser empacotar o `player` como app webOS

## Opção 4 — Ver na TV sem instalar nada (transmitir do celular/PC)

- Abra o link no celular/PC e transmita:
  - **Chromecast:** botão Cast do Chrome → TV
  - **Miracast / AirPlay:** espelhar tela

## ⚠️ Importante

- Seu projeto já vem com **398 canais FTA do Brasil** (`player/playlists/br.m3u`) + controle por setas do controle remoto + PWA instalável.
- Alguns canais podem não tocar no navegador por **CORS** — os mesmos tocam perfeito no **Kodi / VLC / TiviMate** (eles não bloqueiam CORS). Por isso a Opção 2 é a mais estável.
- Tudo é legal e gratuito (iptv-org só lista sinais abertos). Para atualizar: `node scripts/fetch-playlist.mjs br`

## Deploy rápido (passo a passo Netlify Drop)

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `C:\Users\roger\Desktop\Projetos\IPTV\player` inteira
3. Aguarde 10s → copie o link
4. Na TV, abra o link. Se quiser, renomeie o site em Site settings → Change site name

## Testar local antes (PC)

```
.\node_modules\.bin\serve.cmd player -l 8080 -s
# http://localhost:8080
```

