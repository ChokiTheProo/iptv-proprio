# 📺 IPTV Próprio — 100% Gratuito e Legal

> Player PWA + 279 canais do Brasil testados (70% online) + filmes curadoria. Fonte: [iptv-org/iptv](https://github.com/iptv-org/iptv) (só FTA). Sem pirataria.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEUUSER/iptv-proprio)

**Demo:** https://seu-iptv.vercel.app _(troque após deploy)_

## 🚀 Deploy na Vercel (30s)

### Opção 1 — 1 clique
Clique no botão **Deploy with Vercel** acima. Em `Root Directory` escolha `player` → Deploy.

### Opção 2 — Git
```powershell
git init
git add .
git commit -m "IPTV proprio"
git branch -M main
git remote add origin https://github.com/SEUUSER/iptv-proprio.git
git push -u origin main
```
Depois em https://vercel.com/new → Import seu repositório → **Root Directory: `player`** → Deploy.

> `vercel.json` na raiz já configura CORS para as playlists funcionarem na TV.

### Estrutura para GitHub/Vercel

```
IPTV/                  ← RAIZ do repositório (é aqui que faz git init)
├── player/            ← É ESSA PASTA que a Vercel vai publicar
│   ├── index.html     ← Player HLS (hls.js) + controle remoto TV
│   ├── manifest.json  ← PWA (vira app na TV)
│   ├── sw.js          ← cache offline
│   └── playlists/
│       ├── br.m3u (398 canais)
│       ├── br-online.m3u (279 testados ✅ USE ESTE)
│       ├── filmes.m3u (7 filmes CC/domínio público)
│       └── tudo.m3u (286)
├── scripts/
│   ├── fetch-playlist.mjs   → baixa br.m3u do iptv-org
│   ├── test-channels.mjs    → testa e gera br-online.m3u
│   └── build-filmes.mjs     → gera filmes.m3u
├── vercel.json        ← Headers CORS + cache (DEVE ficar na RAIZ)
├── .gitignore
├── package.json
├── GUIA-TV.md         ← Como instalar na TV
└── DEPLOY-VERCEL.md   ← Passo a passo deploy
```

**Importante:**
- **Git:** faça `git init` na pasta `C:\Users\roger\Desktop\Projetos\IPTV` (RAIZ, não dentro de `player`)
- **Vercel:** importe a RAIZ e configure `Root Directory = player` (Settings → Build & Development Settings → Root Directory → `player`)
- Ou, mais simples: na Vercel clique em **Import** e selecione `player` como root — funciona dos dois jeitos porque `vercel.json` está na raiz.

## 📺 Instalar na TV

| TV | Como |
|---|---|
| **Qualquer Smart TV** | Navegador → `https://seu-iptv.vercel.app` → Menu → Adicionar à tela inicial (vira app) |
| **Android TV / Fire Stick** | TiviMate / Kodi (IPTV Simple) → URL: `https://seu-iptv.vercel.app/playlists/br-online.m3u` |
| **LG / Samsung** | SS IPTV / Smart IPTV → mesma URL `.../br-online.m3u` |

Controle remoto: setas ↑↓ + OK.

## 🧪 Testar local

```powershell
npm run iptv              # http://localhost:8080
npm run iptv:fetch        # atualiza br.m3u
npm run test:channels     # testa 398 e gera br-online.m3u (279 online)
npm run filmes            # gera filmes.m3u
```

## 🔍 REA (Engenharia Reversa)

REA v6.5.0 já instalado (`node_modules/rea-agents`) — Node 24.15.0.

```powershell
.\node_modules\.bin\rea.cmd doctor
.\node_modules\.bin\rea.cmd analyze-javascript-application "C:\caminho\do\app" --json
.\node_modules\.bin\rea.cmd setup --yes   # registra MCP
```

Só analise apps que você possui/autorizado. Ver [REA](https://github.com/morluto/rea).

## ⚠️ Legal

Só canais FTA/públicos. Sem IPTV pirata pago. Fontes: iptv-org + Blender CC + Archive.org domínio público.
