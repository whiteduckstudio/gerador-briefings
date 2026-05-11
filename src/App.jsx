import { useState, useEffect } from "react";

const SECTORS = [
  { id: "tech", label: "Tecnologia" },
  { id: "food", label: "Alimentação" },
  { id: "fashion", label: "Moda & Lifestyle" },
  { id: "health", label: "Saúde & Bem-estar" },
  { id: "finance", label: "Finanças" },
  { id: "education", label: "Educação" },
  { id: "architecture", label: "Arquitectura & Design" },
  { id: "entertainment", label: "Entretenimento" },
  { id: "sustainability", label: "Sustentabilidade" },
  { id: "beauty", label: "Beleza & Cosméticos" },
];

const SECTOR_DATA = {
  tech: {
    names: ["Nuvex", "Synqra", "Orbio", "Veltrik", "Cyphon", "Nexara", "Fluxbit", "Zentral"],
    taglines: ["A ligar o futuro, hoje.", "Código que transforma vidas.", "Tecnologia com propósito.", "A simplificar o complexo."],
    descriptions: ["startup de SaaS focada na gestão de projectos ágeis em equipas remotas", "plataforma de inteligência artificial aplicada à análise de dados empresariais", "empresa de cibersegurança focada em pequenas e médias empresas", "marketplace B2B para integração de APIs e serviços digitais"],
    audiences: ["profissionais de TI e programadores entre 25–40 anos", "gestores e CTOs de startups em fase de crescimento", "empresas de média dimensão em processo de transformação digital"],
    tones: ["Inovador, fiável e técnico, sem ser frio", "Ousado e disruptivo, mas acessível", "Profissional e moderno, com leveza"],
    colors: [["#0D1F2D", "#00C2FF", "#FFFFFF"], ["#1A1A2E", "#E94560", "#0F3460"], ["#0A0A0A", "#39FF14", "#FFFFFF"]],
    competitors: ["Notion, Monday.com e Asana", "Salesforce, HubSpot e Zoho", "Cloudflare, Okta e CrowdStrike"],
    avoidances: ["visual demasiado técnico ou frio", "ícones genéricos de circuitos ou binários", "excesso de azul corporativo sem personalidade"],
    deliverables: ["Logótipo principal + versão monocromática", "Paleta de cores com aplicações", "Tipografia primária e secundária", "Ícone/símbolo isolado (app icon)", "Manual de utilização básico"],
  },
  food: {
    names: ["Marvela", "Tartê", "Grão Nobre", "Safra & Co.", "Quemada", "Broto", "Terroir", "Almanac"],
    taglines: ["Sabor com alma.", "Do campo à sua mesa.", "Gastronomia que conta histórias.", "Comer bem é viver bem."],
    descriptions: ["restaurante de cozinha contemporânea portuguesa com menu de degustação", "marca de snacks saudáveis para o público fitness e plant-based", "cafetaria artesanal com foco na origem dos grãos e design de interiores", "serviço de subscrição de refeições gourmet com chefs independentes"],
    audiences: ["adultos urbanos entre 28–45 anos com interesse em gastronomia e viagem", "consumidores conscientes que priorizam ingredientes naturais e sustentáveis"],
    tones: ["Artesanal, quente e autêntico, com sofisticação discreta", "Vibrante e jovem, mas com raízes na tradição", "Premium e minimalista, com referências naturais"],
    colors: [["#3B2314", "#D4A84B", "#F5ECD7"], ["#2C4A2E", "#A8C66C", "#F9F5EC"], ["#1C1C1C", "#E8C547", "#FFFDF5"]],
    competitors: ["Eataly, Outback e Fogo de Chão", "Dr. Oetker, Kind e GoMacro", "Blue Bottle, Tim Hortons e Intelligentsia"],
    avoidances: ["clichês de folhas verdes ou grãos flutuantes", "fontes em script excessivamente floreadas", "paleta demasiado genérica (vermelho + amarelo)"],
    deliverables: ["Logótipo principal + variações", "Paleta de cores com swatches", "Aplicação em embalagens (mockup)", "Papelaria (cardápio, sacola, copo)", "Identidade para redes sociais"],
  },
  fashion: {
    names: ["Verlé", "Aura Cult", "Noirè", "Tessuto", "Bruma", "Côte & Luz", "Veldt", "Formas"],
    taglines: ["Vista quem é.", "Moda sem prazo de validade.", "Estilo com intenção.", "Onde a forma encontra a essência."],
    descriptions: ["marca de moda slow fashion com foco em peças atemporais e produção local", "streetwear de luxo acessível para a geração Z urbana", "editora de moda digital com curadoria de tendências e lookbooks interactivos", "marca de acessórios sustentáveis feitos de materiais reciclados"],
    audiences: ["mulheres entre 22–38 anos com rendimento médio-alto e consciência ambiental", "jovens de 18–28 anos que vivem em grandes centros urbanos"],
    tones: ["Elegante e contemporâneo, com personalidade forte", "Rebelde e criativo, fora dos padrões convencionais", "Neutro e editorial, com influências europeias"],
    colors: [["#1C1C1C", "#E8D5C4", "#BFAE9E"], ["#F5F0EB", "#2D2D2D", "#C9A96E"], ["#0A0A0A", "#FFFFFF", "#FF3B3B"]],
    competitors: ["Zara, & Other Stories e Mango", "Off-White, Carhartt e Supreme", "Vogue, Refinery29 e Business of Fashion"],
    avoidances: ["fontes serifadas genéricas sem carácter próprio", "silhuetas humanas estilizadas clichê", "excesso de dourado sem propósito"],
    deliverables: ["Logótipo principal + versões (claro/escuro)", "Etiquetas e tags de produto", "Lookbook digital (layout básico)", "Identidade visual para e-commerce", "Templates de stories e posts"],
  },
  health: {
    names: ["Vivara", "Zenith", "Lumen Health", "Raíz", "Plenê", "Calma", "Bios", "Florae"],
    taglines: ["Saúde que cabe na sua vida.", "Cuide de si com ciência.", "Equilíbrio em cada escolha.", "Bem-estar sem complicações."],
    descriptions: ["clínica de medicina integrativa que une tratamentos convencionais e holísticos", "aplicação de saúde mental com terapia guiada por IA e meditação", "marca de suplementos naturais para atletas amadores e pessoas activas", "plataforma de telemedicina focada na saúde preventiva"],
    audiences: ["adultos entre 30–55 anos preocupados com qualidade de vida", "millennials ansiosos à procura de ferramentas de autocuidado"],
    tones: ["Humano, acolhedor e cientificamente embasado", "Calmo, limpo e esperançoso, sem ser clínico demais", "Moderno e empoderador, com toque de naturalidade"],
    colors: [["#1B4332", "#74C69D", "#F8F9FA"], ["#2D4159", "#89C2D9", "#F0F4F8"], ["#3D2B1F", "#E8C99A", "#FAF7F2"]],
    competitors: ["Hospital da Luz, CUF e HPA Saúde", "Calm, Headspace e Nativo", "Farmácias Holon, Celeiro e Biomédica"],
    avoidances: ["símbolo de cruz vermelha", "estética demasiado clínica e fria", "fontes sans-serif ultra-corporativas"],
    deliverables: ["Logótipo + símbolo de saúde exclusivo", "Paleta de cores com aplicações", "Identidade para app (ícone + ecrãs)", "Papelaria clínica", "Kit de comunicação digital"],
  },
  finance: {
    names: ["Vaulta", "Crédix", "Aurum", "Nex Capital", "Fluxo", "Klara Bank", "Moneda", "Parité"],
    taglines: ["O seu dinheiro, as suas regras.", "Finanças para pessoas reais.", "Construa o seu futuro, agora.", "A transparência é o nosso activo."],
    descriptions: ["fintech de investimentos dirigida a jovens que nunca investiram", "banco digital com foco em microempresários e trabalhadores independentes", "plataforma de gestão financeira pessoal com gamificação", "corretora de criptoactivos com interface simplificada para iniciantes"],
    audiences: ["jovens adultos de 20–35 anos sem experiência em investimentos", "trabalhadores independentes e freelancers que precisam separar finanças pessoais e empresariais"],
    tones: ["Acessível, transparente e moderno, sem ser informal demais", "Confiável, mas descomplicado, quebrando o estereótipo bancário", "Audacioso e inovador, com autoridade"],
    colors: [["#0D1117", "#00DC82", "#FFFFFF"], ["#12235A", "#4FC3F7", "#F5F5F5"], ["#1A1A2E", "#FFD700", "#EBEBEB"]],
    competitors: ["Revolut, N26 e Monzo", "Millennium BCP, Santander e BPI", "Binance, Coinbase e Kraken"],
    avoidances: ["símbolo de cifrão ($) como elemento principal", "excesso de azul marinho corporativo sem diferenciação", "ilustrações genéricas de crescimento financeiro"],
    deliverables: ["Logótipo + ícone para app", "Paleta de cores e tipografia", "Identidade visual completa", "Mockup de cartão de crédito/débito", "Guia de tom de voz e identidade"],
  },
  education: {
    names: ["Nóde", "Estúdio Saber", "Lumina", "Pensare", "Aula Viva", "Cognito", "Atlas School", "Cálamo"],
    taglines: ["Aprender é transformar.", "Conhecimento sem fronteiras.", "Educação que inspira.", "O futuro começa na sala de aula."],
    descriptions: ["plataforma de cursos online com metodologia baseada em projectos práticos", "escola de programação para crianças e adolescentes dos 8 aos 16 anos", "editora de materiais didácticos para o ensino básico", "aceleradora de carreiras tech com percursos de aprendizagem personalizados"],
    audiences: ["adultos de 22–40 anos em transição de carreira ou à procura de especialização", "pais de crianças dos 6 aos 15 anos com interesse em educação tecnológica"],
    tones: ["Motivador, acessível e contemporâneo, sem ser infantil", "Criativo e lúdico para crianças, fiável para os pais", "Sério e especializado, com abertura e inclusão"],
    colors: [["#1A1A2E", "#F7B731", "#FFFFFF"], ["#0D3B66", "#FAF0CA", "#F4D35E"], ["#2D6A4F", "#95D5B2", "#FFFFFF"]],
    competitors: ["Coursera, Udemy e EDIT.", "Code.org, Scratch e Kano", "Porto Editora, Leya e Texto Editores"],
    avoidances: ["coruja estilizada (clichê de educação)", "lápis e livros como símbolo principal", "excesso de cores primárias sem refinamento"],
    deliverables: ["Logótipo + mascote opcional", "Sistema de cores para múltiplos produtos", "Identidade para plataforma digital", "Material didáctico (capa/contracapa)", "Kit de redes sociais"],
  },
  architecture: {
    names: ["Forma.", "Planta & Co.", "Vide Arquitetura", "Arkê", "Espaço Bruto", "Studio Linha", "Módulo", "Cortex Design"],
    taglines: ["Espaços que respiram.", "Do conceito à construção.", "Arquitectura como experiência.", "Cada linha com intenção."],
    descriptions: ["escritório de arquitectura residencial de alto padrão com foco em sustentabilidade", "estúdio de design de interiores para espaços comerciais e de retalho", "empresa de visualização arquitectónica 3D e realidade aumentada", "consultoria de arquitectura bioclimática para projectos de grande escala"],
    audiences: ["clientes de rendimento elevado à procura de projectos exclusivos e personalizados", "empresas de retalho em expansão que necessitam de identidade visual espacial"],
    tones: ["Refinado, autoral e intelectual, com austeridade calculada", "Contemporâneo e funcional, com sofisticação discreta", "Técnico e visionário, com forte identidade visual"],
    colors: [["#F5F2EE", "#1C1C1C", "#B8A99A"], ["#FFFFFF", "#2C2C2C", "#C4A882"], ["#EAE0D5", "#3D3635", "#8B7355"]],
    competitors: ["Atelier Data, Promontório e CVDB Arquitectos", "João Luís Carrilho da Graça, Aires Mateus e Manuel Aires Mateus", "Perkins&Will, HOK e SHoP Architects"],
    avoidances: ["planta baixa estilizada como símbolo", "fontes serif demasiado clássicas sem modernidade", "paleta bege excessivamente genérica"],
    deliverables: ["Logótipo + assinatura tipográfica", "Sistema de papelaria premium", "Identidade para portfólio digital", "Apresentação de projectos (template)", "Sinalização e placa de obra"],
  },
  entertainment: {
    names: ["Holofote", "Spektra", "Volta Studios", "Echo", "Neonwave", "Cena", "Pulse Media", "Fictvm"],
    taglines: ["Histórias que ficam.", "Entretenimento sem limites.", "Onde a cultura acontece.", "Criatividade em estado puro."],
    descriptions: ["produtora de conteúdo audiovisual para plataformas de streaming", "festival independente de música electrónica e arte digital", "estúdio de desenvolvimento de jogos indie com narrativa portuguesa", "agência de talentos digitais focada em criadores de conteúdo"],
    audiences: ["jovens de 16–35 anos ligados à cultura pop e digital", "fãs de entretenimento independente e produções autorais"],
    tones: ["Vibrante, irreverente e criativo, com atitude", "Misterioso e imersivo, evocando experiências únicas", "Dinâmico e contemporâneo, ligado à cultura jovem"],
    colors: [["#0D0D0D", "#FF2D55", "#FFE620"], ["#0A0014", "#7B2FBE", "#00FFD1"], ["#1A1A1A", "#FF6B35", "#FFFFFF"]],
    competitors: ["Ukbar Filmes, Clap Filmes e David & Golias", "NOS Alive, Super Bock Super Rock e Primavera Sound", "Bica Studios, Nerd Monkeys e Forge Reply"],
    avoidances: ["claquete de cinema como símbolo principal", "paletas de néon sem identidade própria", "tipografia de cartaz genérica"],
    deliverables: ["Logótipo + motion identity", "Paleta de cores e sistema tipográfico", "Identidade para redes sociais", "Cartaz/poster evento (template)", "Abertura animada (storyboard)"],
  },
  sustainability: {
    names: ["Verde Raiz", "Cicla", "Gaia Co.", "Refloresta", "Terrana", "Semente", "Cleanloop", "Biome"],
    taglines: ["O futuro que plantamos hoje.", "Negócios que regeneram.", "Sustentabilidade sem greenwashing.", "Cuidar da terra é cuidar de todos."],
    descriptions: ["startup de tecnologia para gestão de carbono e créditos ambientais corporativos", "marca de produtos de limpeza doméstica 100% biodegradáveis e recarregáveis", "cooperativa de reciclagem com modelo de economia circular e design social", "plataforma de impacto social que liga empresas a projectos ambientais"],
    audiences: ["empresas que precisam de reportar metas ESG e procuram credibilidade ambiental", "consumidores conscientes de 25–45 anos que procuram alternativas sustentáveis"],
    tones: ["Autêntico e engajado, longe do greenwashing superficial", "Otimista e científico, com urgência sem catastrofismo", "Terreno e humano, com raízes na natureza"],
    colors: [["#1B4332", "#52B788", "#F8F9FA"], ["#3D2B1F", "#A8763E", "#E8F5E9"], ["#0D3B66", "#48CAE4", "#CAF0F8"]],
    competitors: ["Rituals, Lush e Claus Porto", "Sonae MC, Method e Ecover", "Lipor, Renewi e Veolia Portugal"],
    avoidances: ["folha verde genérica como símbolo", "excesso de verde sem sofisticação", "comunicação culpabilizadora ou demasiado pesada"],
    deliverables: ["Logótipo + símbolo com significado ecológico", "Manual de identidade sustentável", "Embalagem e rótulo (mockup)", "Kit de comunicação B2B", "Relatório de impacto (template visual)"],
  },
  beauty: {
    names: ["Elara", "Nua", "Skin Ritual", "Brilho Bruto", "Aurore", "Matte", "Clé", "Serum Studio"],
    taglines: ["Beleza que respeita.", "A sua pele, a sua essência.", "Ciência com leveza.", "Do natural ao extraordinário."],
    descriptions: ["marca de cosméticos veganos e cruelty-free para peles negras e mistas", "linha de skincare minimalista com fórmulas baseadas em biotecnologia", "perfumaria artesanal com ingredientes portugueses e embalagens autorais", "marca de maquilhagem inclusiva com mais de 50 tons de base"],
    audiences: ["mulheres de 25–45 anos que valorizam a transparência de ingredientes e a ética", "consumidores da geração Z que procuram expressão pessoal e inclusão"],
    tones: ["Empoderador, inclusivo e sofisticado, sem ser excludente", "Limpo e científico, com sensorialidade e poesia", "Luxuoso e artesanal, com narrativa de origem"],
    colors: [["#2C1810", "#D4956A", "#FDF0E8"], ["#F8F4F0", "#1C1C1C", "#C8A882"], ["#1A0A2E", "#E8C5D0", "#FFFFFF"]],
    competitors: ["Fenty Beauty, ILIA e Kosas", "The Ordinary, Drunk Elephant e Paula's Choice", "L'Occitane, Lush e O Boticário"],
    avoidances: ["excesso de cor-de-rosa clichê", "ilustrações de flores sem originalidade", "fontes serif antiquadas sem modernidade"],
    deliverables: ["Logótipo + símbolo para embalagem", "Sistema de cores por linha de produto", "Embalagem primária e secundária (mockup)", "Identidade para e-commerce e redes sociais", "Lookbook digital / catálogo"],
  },
};

const SECTOR_ADDONS = {
  tech: [
    "Cartão de Visita", "Papel Timbrado", "Envelope", "Pasta de Apresentação",
    "Assinatura de Email", "Apresentação PowerPoint", "Fundo de Videochamada",
    "Social Media", "Caneca", "Pin / Botton", "Pen Drive", "T-shirt", "Tote Bag",
  ],
  food: [
    "Menu", "Carta de Vinhos", "Placemat", "Guardanapos", "Base de Copo",
    "Caixa de Take-Away", "Copo Descartável", "Embalagem", "Rótulo",
    "Sacola de Papel", "Papel de Embrulho", "Sticker", "Cartão de Fidelidade",
    "Cartão de Agradecimento", "Flyer", "Social Media", "Cartão de Visita",
  ],
  fashion: [
    "Cartão de Visita", "Label Tag", "Etiqueta de Produto", "Embalagem",
    "Sacola / Saco de Papel", "Caixa de Produto", "Papel de Embrulho",
    "Fita Adesiva Personalizada", "Lookbook", "Catálogo", "Cartão de Agradecimento",
    "Sticker", "Tote Bag", "Poster", "Social Media",
  ],
  health: [
    "Cartão de Visita", "Papel Timbrado", "Envelope", "Assinatura de Email",
    "Cartão de Fidelidade", "Cartão de Agradecimento", "Brochura", "Flyer",
    "Rótulo", "Embalagem", "Caneca", "Social Media",
  ],
  finance: [
    "Cartão de Visita", "Papel Timbrado", "Envelope", "Pasta de Apresentação",
    "Assinatura de Email", "Apresentação PowerPoint", "Fundo de Videochamada",
    "Brochura", "Cartão Presente", "Social Media",
  ],
  education: [
    "Cartão de Visita", "Papel Timbrado", "Envelope", "Pasta de Apresentação",
    "Bloco de Notas", "Caneta Personalizada", "Assinatura de Email",
    "Apresentação PowerPoint", "Brochura", "Flyer", "Caneca",
    "Pin / Botton", "T-shirt", "Tote Bag", "Social Media",
  ],
  architecture: [
    "Cartão de Visita", "Papel Timbrado", "Envelope", "Pasta de Apresentação",
    "Assinatura de Email", "Apresentação PowerPoint", "Lookbook",
    "Catálogo", "Brochura", "Caneca", "Tote Bag", "Social Media",
  ],
  entertainment: [
    "Cartão de Visita", "Poster", "Banner", "Outdoor", "Flyer", "Convite",
    "Brochura", "Programa de Evento", "Pulseira de Evento", "Sticker",
    "Pin / Botton", "T-shirt", "Boné", "Tote Bag", "Caneca",
    "Social Media", "Roll-Up / Display",
  ],
  sustainability: [
    "Cartão de Visita", "Papel Timbrado", "Envelope", "Brochura", "Flyer",
    "Embalagem", "Rótulo", "Sacola de Papel", "Papel de Embrulho",
    "Tote Bag", "Sticker", "Cartão de Agradecimento", "Social Media",
  ],
  beauty: [
    "Cartão de Visita", "Cartão de Fidelidade", "Cartão de Agradecimento",
    "Embalagem", "Rótulo", "Label Tag", "Caixa de Produto", "Papel de Embrulho",
    "Fita Adesiva Personalizada", "Sacola / Saco de Papel", "Sticker",
    "Lookbook", "Catálogo", "Brochura", "Poster", "Social Media",
  ],
};

const TIMELINES = ["2 semanas", "3 semanas", "4 semanas", "6 semanas", "8 semanas"];
const BUDGETS = ["€ 1.500–3.000", "€ 3.000–6.000", "€ 6.000–12.000", "€ 12.000–25.000", "€ 25.000+"];
const FORMATS = ["Apenas digital (SVG, PDF, PNG)", "Digital + impresso", "Completo (digital, impresso e motion)"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickN = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

function generateBriefing() {
  const sectorMeta = pick(SECTORS);
  const s = SECTOR_DATA[sectorMeta.id];
  const sectorAddons = SECTOR_ADDONS[sectorMeta.id].map((label, i) => ({ id: `addon_${i}`, label }));
  const chosenAddOns = pickN(sectorAddons, Math.floor(Math.random() * 4) + 2);
  const deliverables = [...s.deliverables, ...chosenAddOns.map((a) => a.label)];

  const refs = [
    ["Airbnb", "simplicidade e pertencimento"], ["Spotify", "identidade vibrante e sistema escalável"],
    ["Patagonia", "autenticidade e valores visíveis"], ["Apple", "minimalismo e sofisticação"],
    ["Oatly", "personalidade forte e irreverência"], ["Mailchimp", "calor humano e originalidade"],
    ["Stripe", "clareza técnica e elegância"], ["Glossier", "comunidade e estética clean"],
    ["Supreme", "escassez e desejo cultural"], ["Revolut", "desburocratização e empoderamento"],
  ];

  const adjPairs = [
    ["moderno", "atemporal"], ["ousado", "acessível"], ["sofisticado", "autêntico"],
    ["minimalista", "expressivo"], ["técnico", "humano"], ["premium", "inclusivo"],
    ["orgânico", "contemporâneo"], ["vibrante", "fiável"],
  ];

  const logoStyles = [
    "Logótipo tipográfico (wordmark) com tipografia exclusiva ou adaptada",
    "Símbolo + logótipo (combination mark) com ícone geométrico e wordmark",
    "Lettermark — monograma ou iniciais estilizadas",
    "Emblem — símbolo contido em forma geométrica com texto integrado",
    "Brandmark — símbolo pictórico independente com utilizações separadas do nome",
  ];

  return {
    name: pick(s.names),
    tagline: pick(s.taglines),
    sectorLabel: sectorMeta.label,
    description: pick(s.descriptions),
    audience: pick(s.audiences),
    tone: pick(s.tones),
    colors: pick(s.colors),
    competitor: pick(s.competitors),
    avoidance: pick(s.avoidances),
    timeline: pick(TIMELINES),
    budget: pick(BUDGETS),
    format: pick(FORMATS),
    adj: pick(adjPairs),
    chosenRefs: pickN(refs, 3),
    chosenAddOns,
    deliverables,
    logoStyle: pick(logoStyles),
    date: new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }),
    briefingId: `BRF-${Math.floor(Math.random() * 9000) + 1000}`,
  };
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "briefing_history";

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveHistory(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
}

export default function BriefingGenerator() {
  const [briefing, setBriefing] = useState(null);
  const [status, setStatus] = useState("pending");
  const [isGenerating, setIsGenerating] = useState(false);
  const [dots, setDots] = useState(0);
  const [history, setHistory] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // PDF via print window

  // Load history from localStorage
  useEffect(() => { setHistory(loadHistory()); }, []);

  function handleExportPDF() {
    if (!briefing) return;
    const STATUS_LABEL = { pending: "Por iniciar", active: "Em curso", done: "Concluído" };
    const statusColor = { pending: "#5A5A5A", active: "#F0A030", done: "#52B788" }[status];

    const deliverableRows = briefing.deliverables
      .map(d => `<div class="del-row">→ ${d}</div>`)
      .join("");

    const addOnChips = briefing.chosenAddOns
      .map(a => `<span class="chip">${a.label}</span>`)
      .join("");

    const refRows = briefing.chosenRefs
      .map(([brand, reason]) => `<div class="ref-row"><span class="ref-bullet">◈</span><span><strong>${brand}</strong> — ${reason}</span></div>`)
      .join("");

    const swatches = briefing.colors
      .map(c => `<div class="swatch-wrap"><div class="swatch" style="background:${c}"></div><div class="swatch-label">${c}</div></div>`)
      .join("");

    const infoItems = [
      ["Prazo estimado", briefing.timeline],
      ["Orçamento", briefing.budget],
      ["Formato de entrega", briefing.format],
      ["Sector", briefing.sectorLabel],
    ].map(([l, v]) => `<div class="info-cell"><div class="info-label">${l}</div><div class="info-val">${v}</div></div>`).join("");

    const html = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8"/>
<title>Briefing ${briefing.briefingId} — ${briefing.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:wght@400;700;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0C0C0C;color:#E8E4DC;font-family:'Space Mono',monospace;font-size:11px;padding:0}
  .page{max-width:800px;margin:0 auto;padding:40px 48px}
  .top-bar{border-bottom:1px solid #1E1E1E;padding-bottom:20px;margin-bottom:32px;display:flex;justify-content:space-between;align-items:flex-start}
  .company-name{font-family:'Playfair Display',serif;font-size:42px;font-weight:900;color:#E8E4DC;letter-spacing:-0.03em;line-height:1}
  .tagline{font-family:'Playfair Display',serif;font-style:italic;color:#9A9A8A;margin-top:6px;font-size:14px}
  .meta{text-align:right;line-height:2;font-size:9px;color:#3A3A3A;letter-spacing:0.1em}
  .meta .sector{color:#D4C5A0}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:28px}
  .section-label{font-size:8px;letter-spacing:0.25em;text-transform:uppercase;color:#D4C5A0;border-bottom:1px solid #D4C5A0;padding-bottom:5px;margin-bottom:13px}
  .section{margin-bottom:24px}
  p{font-size:10.5px;line-height:1.9;color:#C0BAB0}
  strong{color:#E8E4DC}
  .tag{display:inline-block;background:#1A1810;border:1px solid #2A2A2A;color:#D4C5A0;font-size:8px;padding:2px 7px;letter-spacing:0.1em;margin:0 2px}
  .ref-row{display:flex;gap:8px;margin-bottom:7px;font-size:10.5px;color:#C0BAB0}
  .ref-bullet{color:#D4C5A0;flex-shrink:0}
  .swatches{display:flex;gap:10px;margin-bottom:10px}
  .swatch-wrap{text-align:center}
  .swatch{width:28px;height:28px;border-radius:2px;margin-bottom:4px}
  .swatch-label{font-size:7.5px;color:#4A4A4A}
  .logo-box{border:1px solid #2A2A2A;padding:11px 14px;background:#111;font-size:10.5px;line-height:1.6;color:#C0BAB0}
  .avoid{display:flex;gap:8px;align-items:flex-start}
  .avoid-x{color:#C04040;font-size:13px;flex-shrink:0}
  .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .info-cell{border:1px solid #1E1E1E;padding:9px 11px}
  .info-label{font-size:7.5px;color:#3A3A3A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px}
  .info-val{font-size:9.5px;color:#D4C5A0}
  .divider{border:none;border-top:1px solid #1E1E1E;margin:24px 0}
  .del-row{display:flex;gap:8px;padding:7px 0;border-bottom:1px solid #1A1A1A;font-size:10.5px;color:#C0BAB0}
  .del-row::before{content:"→";color:#D4C5A0;flex-shrink:0}
  .chips{margin-top:6px}
  .chip{display:inline-block;border:1px solid #2A2A2A;padding:3px 9px;font-size:8.5px;color:#9A9A8A;margin:2px}
  .status-bar{display:inline-flex;align-items:center;gap:7px;border:1px solid;padding:8px 14px;margin-top:16px;font-size:9px;letter-spacing:0.12em;text-transform:uppercase}
  .status-dot{width:7px;height:7px;border-radius:50%}
  .footer{margin-top:32px;padding-top:14px;border-top:1px solid #141414;display:flex;justify-content:space-between;font-size:8px;color:#2A2A2A;letter-spacing:0.08em}
  @media print{
    body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .no-print{display:none!important}
    .page{padding:28px 36px}
  }
</style>
</head>
<body>
<div class="page">

  <div class="top-bar">
    <div>
      <div style="font-size:8px;letter-spacing:0.2em;color:#3A3A3A;text-transform:uppercase;margin-bottom:6px">Briefing de Branding &amp; Logo Design</div>
      <div class="company-name">${briefing.name}</div>
      <div class="tagline">"${briefing.tagline}"</div>
    </div>
    <div class="meta">
      <div>${briefing.briefingId}</div>
      <div>${briefing.date}</div>
      <div class="sector">${briefing.sectorLabel.toUpperCase()}</div>
    </div>
  </div>

  <div class="grid">
    <div>
      <div class="section">
        <div class="section-label">Sobre a Empresa</div>
        <p>A <strong>${briefing.name}</strong> é uma ${briefing.description}. Fundada com a proposta de ser <em>${briefing.adj[0]}</em> e <em>${briefing.adj[1]}</em>, a empresa procura consolidar a sua presença no mercado com uma identidade visual sólida e diferenciada que traduza os seus valores de forma imediata.</p>
      </div>
      <div class="section">
        <div class="section-label">Público-Alvo</div>
        <p>Dirigida a ${briefing.audience}, a marca precisa de gerar identificação imediata com esse perfil, transmitindo credibilidade e conexão emocional desde o primeiro contacto visual.</p>
      </div>
      <div class="section">
        <div class="section-label">Tom &amp; Personalidade</div>
        <p>${briefing.tone}. A identidade deve equilibrar os atributos de <span class="tag">${briefing.adj[0]}</span> e <span class="tag">${briefing.adj[1]}</span>, sem cair em clichês do sector.</p>
      </div>
      <div class="section">
        <div class="section-label">Referências Inspiracionais</div>
        <p style="font-size:9px;color:#4A4A4A;margin-bottom:8px">Não para copiar — pelo raciocínio estratégico:</p>
        ${refRows}
      </div>
      <div class="section">
        <div class="section-label">Panorama Competitivo</div>
        <p>Os principais concorrentes a considerar são <strong>${briefing.competitor}</strong>. A ${briefing.name} deve posicionar-se de forma visualmente distinta e memorável dentro desse cenário.</p>
      </div>
    </div>
    <div>
      <div class="section">
        <div class="section-label">Direcção de Cor</div>
        <div class="swatches">${swatches}</div>
        <p style="font-size:9.5px;color:#4A4A4A">Paleta sugerida para exploração inicial. O designer tem liberdade para propor variações desde que mantenha o posicionamento emocional.</p>
      </div>
      <div class="section">
        <div class="section-label">Abordagem de Logo</div>
        <div class="logo-box">${briefing.logoStyle}</div>
      </div>
      <div class="section">
        <div class="section-label">O Que Evitar</div>
        <div class="avoid"><span class="avoid-x">✕</span><p>${briefing.avoidance}. O cliente já viu exemplos deste padrão em concorrentes e deseja diferenciação clara.</p></div>
      </div>
      <div class="section">
        <div class="section-label">Informações do Projecto</div>
        <div class="info-grid">${infoItems}</div>
      </div>
    </div>
  </div>

  <hr class="divider"/>
  <div class="section-label">Âmbito de Entrega</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 28px;margin-bottom:16px">${deliverableRows}</div>

  <div class="chips">
    <span style="font-size:8px;color:#3A3A3A;margin-right:6px;letter-spacing:0.12em">ADD-ONS SORTEADOS:</span>
    ${addOnChips}
  </div>

  <div class="status-bar" style="color:${statusColor};border-color:${statusColor}">
    <div class="status-dot" style="background:${statusColor}"></div>
    Estado: ${STATUS_LABEL[status]}
  </div>

  <div class="footer">
    <span>${briefing.briefingId} · ${briefing.name} · Gerador de Briefings</span>
    <span>Branding &amp; Logo Design</span>
  </div>

</div>
<script>window.onload = function(){ window.print(); }</script>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) {
      alert("O browser bloqueou o pop-up. Por favor permite pop-ups para este site e tenta novamente.");
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  useEffect(() => {
    if (!isGenerating) return;
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 350);
    return () => clearInterval(t);
  }, [isGenerating]);

  function handleGenerate() {
    setIsGenerating(true);
    setBriefing(null);
    setStatus("pending");
    setTimeout(() => {
      const b = generateBriefing();
      setBriefing(b);
      setIsGenerating(false);
      // Save to history
      const entry = { ...b, status: "pending", savedAt: new Date().toISOString() };
      const updated = [entry, ...loadHistory()].slice(0, 50); // keep last 50
      saveHistory(updated);
      setHistory(updated);
    }, 1400);
  }

  function handleStatusChange(newStatus) {
    setStatus(newStatus);
    if (!briefing) return;
    const updated = loadHistory().map(h =>
      h.briefingId === briefing.briefingId ? { ...h, status: newStatus } : h
    );
    saveHistory(updated);
    setHistory(updated);
  }

  function handleLoadFromHistory(entry) {
    setBriefing(entry);
    setStatus(entry.status || "pending");
    setSearchOpen(false);
    setSearchQuery("");
  }

  function handleDeleteFromHistory(id, e) {
    e.stopPropagation();
    const updated = loadHistory().filter(h => h.briefingId !== id);
    saveHistory(updated);
    setHistory(updated);
  }

  const filteredHistory = history.filter(h => {
    const q = searchQuery.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.briefingId.toLowerCase().includes(q) ||
      h.sectorLabel.toLowerCase().includes(q) ||
      (h.status || "pending").toLowerCase().includes(q) ||
      h.tagline.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#0C0C0C", minHeight: "100vh", color: "#E8E4DC" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pfont { font-family: 'Playfair Display', serif; }
        .mfont { font-family: 'Space Mono', monospace; }
        .gen-btn {
          background: #D4C5A0; color: #0C0C0C; border: none;
          padding: 16px 52px; cursor: pointer; font-family: 'Space Mono', monospace;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          font-weight: 700; transition: all 0.2s;
        }
        .gen-btn:hover { background: #E8DFC8; transform: translateY(-2px); }
        .gen-btn:disabled { background: #2A2A2A; color: #5A5A5A; cursor: not-allowed; transform: none; }
        .section-label {
          font-family: 'Space Mono', monospace; font-size: 9px;
          letter-spacing: 0.25em; text-transform: uppercase; color: #D4C5A0;
          border-bottom: 1px solid #D4C5A0; padding-bottom: 6px; margin-bottom: 16px;
        }
        .color-swatch { width: 30px; height: 30px; border-radius: 2px; display: inline-block; }
        .addon-chip {
          display: inline-block; border: 1px solid #2A2A2A; padding: 4px 10px;
          font-size: 9px; color: #9A9A8A; letter-spacing: 0.08em; margin: 3px;
          font-family: 'Space Mono', monospace;
        }
        .deliverable-item {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 8px 0; border-bottom: 1px solid #1E1E1E; font-size: 11px;
        }
        .deliverable-item::before { content: "→"; color: #D4C5A0; flex-shrink: 0; }
        .tag {
          display: inline-block; background: #1A1810; border: 1px solid #2A2A2A;
          color: #D4C5A0; font-size: 9px; padding: 3px 8px; letter-spacing: 0.1em;
          font-family: 'Space Mono', monospace;
        }
        .logo-box {
          border: 1px solid #2A2A2A; padding: 12px 16px; background: #111;
          font-size: 11px; line-height: 1.6; color: #C0BAB0;
          font-family: 'Space Mono', monospace;
        }
        .info-cell { border: 1px solid #1E1E1E; padding: 10px 12px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1.8s linear infinite; display: inline-block; }
        .pdf-btn {
          background: transparent; color: #D4C5A0; border: 1px solid #D4C5A0;
          padding: 16px 36px; cursor: pointer; font-family: 'Space Mono', monospace;
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          font-weight: 700; transition: all 0.2s;
        }
        .pdf-btn:hover { background: #1A1810; transform: translateY(-2px); }
        .pdf-btn:disabled { border-color: #3A3A3A; color: #4A4A4A; cursor: not-allowed; transform: none; }
        .status-bar {
          display: flex; align-items: center; gap: 8px;
          margin-top: 20px; padding: 12px 16px;
          border: 1px solid #2A2A2A; cursor: pointer;
          font-family: 'Space Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: all 0.25s; user-select: none; width: fit-content;
        }
        .status-bar.pending { color: #5A5A5A; border-color: #2A2A2A; background: transparent; }
        .status-bar.pending:hover { color: #D4C5A0; border-color: #D4C5A0; }
        .status-bar.active { color: #F0A030; border-color: #F0A030; background: #1A1408; }
        .status-bar.active:hover { background: #221A0A; }
        .status-bar.done { color: #52B788; border-color: #52B788; background: #0A1A10; }
        .status-bar.done:hover { background: #0D2016; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; transition: background 0.25s; }
        .status-dot.pending { background: #3A3A3A; }
        .status-dot.active { background: #F0A030; box-shadow: 0 0 6px #F0A03088; }
        .status-dot.done { background: #52B788; box-shadow: 0 0 6px #52B78888; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0C0C0C; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; }
        .search-btn {
          background: transparent; border: 1px solid #2A2A2A; color: #5A5A5A;
          padding: 8px 16px; cursor: pointer; font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          transition: all 0.2s; display: flex; align-items: center; gap: 6px;
        }
        .search-btn:hover { border-color: #D4C5A0; color: #D4C5A0; }
        .search-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85);
          z-index: 100; display: flex; align-items: flex-start; justify-content: center;
          padding-top: 80px;
        }
        .search-panel {
          background: #0E0E0E; border: 1px solid #2A2A2A;
          width: 100%; max-width: 640px; max-height: 70vh;
          display: flex; flex-direction: column; animation: fadeIn 0.2s ease;
        }
        .search-input {
          background: transparent; border: none; border-bottom: 1px solid #2A2A2A;
          color: #E8E4DC; font-family: 'Space Mono', monospace; font-size: 13px;
          padding: 18px 20px; outline: none; width: 100%; letter-spacing: 0.05em;
        }
        .search-input::placeholder { color: #3A3A3A; }
        .history-list { overflow-y: auto; flex: 1; }
        .history-item {
          padding: 14px 20px; border-bottom: 1px solid #181818; cursor: pointer;
          transition: background 0.15s; display: flex; justify-content: space-between; align-items: center;
        }
        .history-item:hover { background: #141414; }
        .history-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .del-btn {
          background: transparent; border: none; color: #2A2A2A; cursor: pointer;
          font-size: 14px; padding: 2px 6px; transition: color 0.15s; flex-shrink: 0;
        }
        .del-btn:hover { color: #C04040; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1E1E1E", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="mfont" style={{ fontSize: 9, letterSpacing: "0.3em", color: "#3A3A3A", textTransform: "uppercase", marginBottom: 4 }}>
            Ferramenta Criativa ◈ v3.0
          </div>
          <h1 className="pfont" style={{ fontSize: 22, fontWeight: 900, color: "#E8E4DC", letterSpacing: "-0.02em" }}>
            Gerador de Briefings
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {history.length > 0 && (
            <button className="search-btn" onClick={() => setSearchOpen(true)}>
              ◎ Pesquisar
              <span style={{ color: "#D4C5A0" }}>({history.length})</span>
            </button>
          )}
          <div className="mfont" style={{ fontSize: 9, color: "#2A2A2A", letterSpacing: "0.1em", textAlign: "right" }}>
            BRANDING<br />& LOGO DESIGN
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-panel" onClick={e => e.stopPropagation()}>
            <input
              className="search-input"
              autoFocus
              placeholder="Pesquisar por nome, ID, sector, estado…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="history-list">
              {filteredHistory.length === 0 && (
                <div className="mfont" style={{ padding: "24px 20px", fontSize: 10, color: "#3A3A3A", textAlign: "center" }}>
                  Nenhum resultado encontrado.
                </div>
              )}
              {filteredHistory.map(h => {
                const sc = { pending: "#3A3A3A", active: "#F0A030", done: "#52B788" }[h.status || "pending"];
                const sl = { pending: "Por iniciar", active: "Em curso", done: "Concluído" }[h.status || "pending"];
                return (
                  <div key={h.briefingId} className="history-item" onClick={() => handleLoadFromHistory(h)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div className="history-dot" style={{ background: sc, boxShadow: `0 0 5px ${sc}88` }} />
                      <div style={{ minWidth: 0 }}>
                        <div className="mfont" style={{ fontSize: 11, color: "#E8E4DC", fontWeight: 700, marginBottom: 2 }}>
                          {h.name}
                          <span style={{ color: "#3A3A3A", fontWeight: 400, marginLeft: 8 }}>{h.briefingId}</span>
                        </div>
                        <div className="mfont" style={{ fontSize: 9, color: "#5A5A5A", display: "flex", gap: 10 }}>
                          <span style={{ color: "#D4C5A0" }}>{h.sectorLabel}</span>
                          <span>{h.tagline}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <div className="mfont" style={{ fontSize: 8, color: sc, letterSpacing: "0.1em" }}>{sl}</div>
                      <button className="del-btn" onClick={e => handleDeleteFromHistory(h.briefingId, e)} title="Remover">✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "10px 20px", borderTop: "1px solid #1A1A1A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="mfont" style={{ fontSize: 8, color: "#2A2A2A" }}>
                {filteredHistory.length} de {history.length} briefing{history.length !== 1 ? "s" : ""}
              </span>
              <button className="search-btn" onClick={() => setSearchOpen(false)}>
                Fechar ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 32px" }}>

        {/* EMPTY STATE */}
        {!briefing && !isGenerating && (
          <div className="fade-in" style={{ textAlign: "center", padding: "100px 0" }}>
            <div className="pfont" style={{ fontSize: 72, color: "#181818", marginBottom: 36, lineHeight: 1 }}>✦</div>
            <h2 className="pfont" style={{ fontSize: 34, fontWeight: 700, color: "#E8E4DC", marginBottom: 14 }}>
              Pronto para o desafio?
            </h2>
            <p className="mfont" style={{ fontSize: 10, color: "#4A4A4A", lineHeight: 2.2, maxWidth: 340, margin: "0 auto 48px" }}>
              Um clique. Um briefing completo.<br />
              Empresa, sector, público, cores,<br />entregas — tudo sorteado.
            </p>
            <button className="gen-btn" onClick={handleGenerate}>
              ✦ Gerar Briefing
            </button>
          </div>
        )}

        {/* LOADING */}
        {isGenerating && (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div className="pfont spinning" style={{ fontSize: 40, color: "#D4C5A0", marginBottom: 24 }}>✦</div>
            <div className="mfont" style={{ fontSize: 10, color: "#4A4A4A", letterSpacing: "0.25em" }}>
              A GERAR{".".repeat(dots)}
            </div>
          </div>
        )}

        {/* BRIEFING */}
        {briefing && !isGenerating && (
          <div className="fade-in">
            {/* Doc header */}
            <div style={{ borderBottom: "1px solid #1E1E1E", paddingBottom: 24, marginBottom: 36 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div className="mfont" style={{ fontSize: 9, letterSpacing: "0.2em", color: "#3A3A3A", textTransform: "uppercase", marginBottom: 6 }}>
                    Briefing de Branding & Logo Design
                  </div>
                  <h2 className="pfont" style={{ fontSize: 44, fontWeight: 900, color: "#E8E4DC", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {briefing.name}
                  </h2>
                  <p className="pfont" style={{ fontSize: 15, color: "#9A9A8A", fontStyle: "italic", marginTop: 8 }}>
                    "{briefing.tagline}"
                  </p>
                </div>
                <div className="mfont" style={{ fontSize: 9, color: "#3A3A3A", textAlign: "right", lineHeight: 2.2 }}>
                  <div>{briefing.briefingId}</div>
                  <div>{briefing.date}</div>
                  <div style={{ color: "#D4C5A0" }}>{briefing.sectorLabel.toUpperCase()}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>

              {/* LEFT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

                <div>
                  <div className="section-label">Sobre a Empresa</div>
                  <p className="mfont" style={{ fontSize: 11, lineHeight: 1.9, color: "#C0BAB0" }}>
                    A <strong style={{ color: "#E8E4DC" }}>{briefing.name}</strong> é uma {briefing.description}.
                    Fundada com a proposta de ser <em>{briefing.adj[0]}</em> e <em>{briefing.adj[1]}</em>,
                    a empresa procura consolidar a sua presença no mercado com uma identidade visual
                    sólida e diferenciada que traduza os seus valores de forma imediata.
                  </p>
                </div>

                <div>
                  <div className="section-label">Público-Alvo</div>
                  <p className="mfont" style={{ fontSize: 11, lineHeight: 1.9, color: "#C0BAB0" }}>
                    Dirigida a {briefing.audience}, a marca precisa de gerar identificação
                    imediata com esse perfil, transmitindo credibilidade e conexão emocional
                    desde o primeiro contacto visual.
                  </p>
                </div>

                <div>
                  <div className="section-label">Tom & Personalidade</div>
                  <p className="mfont" style={{ fontSize: 11, lineHeight: 1.9, color: "#C0BAB0" }}>
                    {briefing.tone}. A identidade deve equilibrar os atributos de{" "}
                    <span className="tag">{briefing.adj[0]}</span> e{" "}
                    <span className="tag">{briefing.adj[1]}</span>, sem cair em clichês do sector.
                  </p>
                </div>

                <div>
                  <div className="section-label">Referências Inspiracionais</div>
                  <p className="mfont" style={{ fontSize: 10, color: "#3A3A3A", marginBottom: 12 }}>
                    Não para copiar — pelo raciocínio estratégico:
                  </p>
                  {briefing.chosenRefs.map(([brand, reason], i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <span style={{ color: "#D4C5A0", flexShrink: 0, marginTop: 1 }}>◈</span>
                      <span className="mfont" style={{ fontSize: 11, color: "#C0BAB0" }}>
                        <strong style={{ color: "#E8E4DC" }}>{brand}</strong> — {reason}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="section-label">Panorama Competitivo</div>
                  <p className="mfont" style={{ fontSize: 11, lineHeight: 1.9, color: "#C0BAB0" }}>
                    Os principais concorrentes a considerar são{" "}
                    <strong style={{ color: "#E8E4DC" }}>{briefing.competitor}</strong>.
                    A {briefing.name} deve posicionar-se de forma visualmente distinta
                    e memorável dentro desse cenário.
                  </p>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

                <div>
                  <div className="section-label">Direcção de Cor</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    {briefing.colors.map((c, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div className="color-swatch" style={{ background: c, marginBottom: 6 }} />
                        <div className="mfont" style={{ fontSize: 8, color: "#3A3A3A" }}>{c}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mfont" style={{ fontSize: 10, color: "#3A3A3A", lineHeight: 1.8 }}>
                    Paleta sugerida para exploração inicial. O designer tem liberdade
                    para propor variações desde que mantenha o posicionamento emocional.
                  </p>
                </div>

                <div>
                  <div className="section-label">Abordagem de Logo</div>
                  <div className="logo-box">{briefing.logoStyle}</div>
                </div>

                <div>
                  <div className="section-label">O Que Evitar</div>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#C04040", flexShrink: 0, fontSize: 14, marginTop: 1 }}>✕</span>
                    <p className="mfont" style={{ fontSize: 11, color: "#C0BAB0", lineHeight: 1.9 }}>
                      {briefing.avoidance}. O cliente já viu exemplos deste padrão
                      em concorrentes e deseja diferenciação clara.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="section-label">Informações do Projecto</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      ["Prazo estimado", briefing.timeline],
                      ["Orçamento", briefing.budget],
                      ["Formato", briefing.format],
                      ["Sector", briefing.sectorLabel],
                    ].map(([label, value]) => (
                      <div key={label} className="info-cell">
                        <div className="mfont" style={{ fontSize: 8, color: "#3A3A3A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{label}</div>
                        <div className="mfont" style={{ fontSize: 10, color: "#D4C5A0" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Deliverables */}
            <div style={{ marginTop: 36, borderTop: "1px solid #1E1E1E", paddingTop: 28 }}>
              <div className="section-label">Âmbito de Entrega</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px" }}>
                {briefing.deliverables.map((d, i) => (
                  <div key={i} className="deliverable-item mfont" style={{ color: "#C0BAB0" }}>{d}</div>
                ))}
              </div>
            </div>

            {/* Add-ons sorteados */}
            <div style={{ marginTop: 20 }}>
              <span className="mfont" style={{ fontSize: 9, color: "#3A3A3A", marginRight: 8, letterSpacing: "0.15em" }}>ADD-ONS SORTEADOS:</span>
              {briefing.chosenAddOns.map((a) => (
                <span key={a.id} className="addon-chip">{a.label}</span>
              ))}
            </div>

            {/* Status toggle */}
            <div
              className={`status-bar ${status}`}
              onClick={() => handleStatusChange(status === 'pending' ? 'active' : status === 'active' ? 'done' : 'pending')}
              title="Clique para alterar o estado do briefing"
            >
              <div className={`status-dot ${status}`} />
              {status === 'pending' && 'Por iniciar'}
              {status === 'active' && 'Em curso'}
              {status === 'done' && '✓ Concluído'}
            </div>

            {/* Buttons */}
            <div style={{ marginTop: 52, paddingTop: 32, borderTop: "1px solid #1E1E1E", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="gen-btn" onClick={handleGenerate}>
                ✦ Gerar Novo Briefing
              </button>
              <button className="pdf-btn" onClick={handleExportPDF}>
                ↓ Guardar / Imprimir PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
