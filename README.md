# Gerador de Briefings — Branding & Logo Design

Ferramenta para gerar briefings fictícios detalhados para projectos de branding e logo design.

## Funcionalidades

- Gera briefings completos com um clique (sector, empresa, público, cores, add-ons — tudo aleatório)
- 10 sectores com dados específicos (Tecnologia, Alimentação, Moda, Saúde, Finanças, Educação, Arquitectura, Entretenimento, Sustentabilidade, Beleza)
- Add-ons ajustados por sector
- Exportar / Imprimir como PDF
- Histórico de briefings guardado no browser (localStorage)
- Pesquisa rápida por nome, ID, sector ou estado
- Estado do projecto: Por iniciar → Em curso → Concluído

---

## Publicar no Vercel (recomendado — gratuito)

### Opção A — Arrastar e largar (mais fácil, sem conta GitHub)

1. Instala as dependências e faz o build:
   ```bash
   npm install
   npm run build
   ```
2. Vai a [vercel.com](https://vercel.com) e cria uma conta gratuita
3. No dashboard clica **"Add New > Project"**
4. Arrasta a pasta `dist/` gerada para a área de upload
5. Em segundos tens um URL público (ex: `gerador-briefings.vercel.app`)

### Opção B — Via GitHub (recomendado para actualizações futuras)

1. Cria um repositório no [github.com](https://github.com) e faz upload de todos estes ficheiros
2. Vai a [vercel.com](https://vercel.com), clica **"Add New > Project"**
3. Liga a tua conta GitHub e selecciona o repositório
4. Deixa as configurações por defeito (Vercel detecta Vite automaticamente)
5. Clica **Deploy** — pronto

A partir daí, cada vez que fizeres push ao GitHub o site actualiza automaticamente.

---

## Publicar no Netlify (alternativa gratuita)

1. Faz o build: `npm run build`
2. Vai a [netlify.com](https://netlify.com) e cria uma conta
3. Arrasta a pasta `dist/` para a área **"Deploy manually"**
4. URL público imediato (ex: `gerador-briefings.netlify.app`)

---

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## Domínio personalizado (opcional)

Tanto o Vercel como o Netlify permitem ligar um domínio próprio gratuitamente nas definições do projecto.
