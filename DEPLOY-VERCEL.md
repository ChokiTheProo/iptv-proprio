# 🚀 Deploy na Vercel — 1 clique (você já tem conta)

Seu projeto já está 100% pronto. O deploy via CLI foi bloqueado pelo antivírus/sandbox
aqui (EPERM ao fazer spawn), mas você faz em **1 clique pelo site da Vercel**.

---

## MÉTODO 1 — Mais rápido: Dashboard da Vercel (recomendado)

### Passo A — Subir pelo Git (melhor, deploy automático)

1. **Crie um repositório no GitHub:**
   - Acesse https://github.com/new → Nome: `iptv-proprio` → Create
2. **Envie o projeto:**
   ```powershell
   cd C:\Users\roger\Desktop\Projetos\IPTV
   git init
   git add player vercel.json README.md GUIA-TV.md
   git commit -m "IPTV proprio - 279 canais + filmes"
   git branch -M main
   git remote add origin https://github.com/SEUUSER/iptv-proprio.git
   git push -u origin main
   ```
3. **Na Vercel:**
   - https://vercel.com/new → **Import** seu repositório `iptv-proprio`
   - **IMPORTANTE:** Em `Root Directory` selecione `player` (ou deixe `Framework Preset: Other`)
   - Clique **Deploy** → em 20s você ganha o link: `https://iptv-proprio-XXXX.vercel.app`

### Passo B — Sem Git (arrastar pasta)

1. Acesse https://vercel.com/new
2. Clique em **Browse** ou arraste a pasta `C:\Users\roger\Desktop\Projetos\IPTV\player`
3. Deploy → link pronto.

> O arquivo `vercel.json` na raiz já configura CORS para as playlists funcionarem na TV.

---

## MÉTODO 2 — Vercel CLI (quando o antivírus liberar)

```powershell
npm i -g vercel
vercel login
cd C:\Users\roger\Desktop\Projetos\IPTV\player
vercel --prod --yes
```

Se der `EPERM`/`spawn`:
- Desative temporariamente antivírus (Avast/AVG bloqueiam spawn do Node)
- Ou use `npx vercel --prod --yes` com PowerShell como **Administrador**
- Ou use o Método 1 acima (funciona sempre)

---

## 📺 Depois do deploy — Como deixar como APP na TV

### Seu link será tipo:
```
https://seu-iptv.vercel.app
https://seu-iptv.vercel.app/playlists/br-online.m3u  ← 279 canais testados
https://seu-iptv.vercel.app/playlists/filmes.m3u      ← 7 filmes curadoria
https://seu-iptv.vercel.app/playlists/tudo.m3u        ← 286 tudo junto
```

### Na TV:

**1. Samsung / LG / TCL / Philco (qualquer Smart TV) — Navegador:**
- Abra o **Navegador** da TV → digite `https://seu-iptv.vercel.app`
- Aperte ⭐ Favoritos
- Menu do navegador → **Adicionar à tela inicial** / **Instalar app** → vira ícone igual Netflix
- Controle remoto: **Setas ↑↓ + OK** para navegar nos canais

**2. Android TV / Google TV / Fire TV Stick (MELHOR):**
- Play Store da TV → instale **TiviMate** ou **Kodi**
- **Kodi:** Add-ons → PVR Clients → IPTV Simple Client → URL: `https://seu-iptv.vercel.app/playlists/br-online.m3u`
- **TiviMate:** Add Playlist → URL → cole `.../br-online.m3u`
- Funciona 100% sem erro de CORS (navegador às vezes bloqueia, apps nativos não)

**3. iPhone/Android → Transmitir para TV:**
- Abra o link no celular → botão **Cast** (Chromecast) ou Espelhar Tela

---

## 🔗 Também pode usar sem Vercel (só link da playlist)

Você nem precisa do site — pode usar direto a playlist no app da TV:
- No **SS IPTV / Smart IPTV / TiviMate** da TV, adicione URL:
  ```
  https://iptv-org.github.io/iptv/countries/br.m3u
  ```
  Ou melhor, seu `br-online.m3u` já testado após deploy.

---

## ✅ Teste local antes do deploy

```powershell
cd C:\Users\roger\Desktop\Projetos\IPTV
.\node_modules\.bin\serve.cmd player -l 8080 -s
# http://localhost:8080
```

Arquivo pronto para deploy: `deploy.zip` (na raiz do projeto) — é só arrastar em https://vercel.com/new
