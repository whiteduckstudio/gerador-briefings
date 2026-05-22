import { useState, useEffect } from "react";

// ── PACKAGES ──────────────────────────────────────────────────────────────────

const PACKAGES = {
  egg: {
    name: "The Egg",
    price: "400€",
    emoji: "🥚",
    strategy: ["Análise de marca (mini)", "2 direcções criativas (moodboards)"],
    design: ["Logótipo principal, secundário e logomarca", "Paleta de cores e tipografia"],
    delivery: ["Manual de marca (mini)", "Guia de ficheiros", "Ficheiros: PNG, JPG, EPS, SVG"],
    addons: 0,
  },
  duckling: {
    name: "The Duckling",
    price: "750€",
    emoji: "🐥",
    strategy: ["Análise de marca completa", "2 direcções criativas (moodboards)"],
    design: ["Logótipo principal, secundário e logomarca", "Paleta de cores e tipografia", "Elementos gráficos", "2 add-ons à escolha"],
    delivery: ["Manual de marca completo", "Guia de ficheiros", "Ficheiros: PNG, JPG, EPS, SVG"],
    addons: 2,
  },
  duck: {
    name: "The Duck",
    price: "1.200€",
    emoji: "🦆",
    strategy: ["Análise de marca completa", "Pesquisa de mercado e concorrência", "2 direcções criativas (moodboards)"],
    design: ["Logótipo principal, secundário e logomarca", "Paleta de cores e tipografia", "Elementos gráficos", "Slogan", "4 add-ons à escolha"],
    delivery: ["Manual de marca completo", "Guia de ficheiros", "Ficheiros: PNG, JPG, EPS, SVG"],
    addons: 4,
  },
};

// ── SECTORS ───────────────────────────────────────────────────────────────────

const SECTORS = [
  { id: "food", label: "Alimentação & Restauração" },
  { id: "fashion", label: "Moda & Lifestyle" },
  { id: "health", label: "Saúde & Bem-estar" },
  { id: "beauty", label: "Beleza & Cosméticos" },
  { id: "education", label: "Educação & Formação" },
  { id: "architecture", label: "Arquitectura & Design de Interiores" },
  { id: "sustainability", label: "Sustentabilidade & Impacto Social" },
  { id: "entertainment", label: "Cultura & Entretenimento" },
  { id: "retail", label: "Comércio Local & Retalho" },
  { id: "services", label: "Serviços & Consultoria" },
];

// ── SECTOR DATA ───────────────────────────────────────────────────────────────

const SECTOR_DATA = {
  food: {
    names: ["Taberna do Largo", "Forno da Vila", "Sal & Brasa", "Casa do Prado", "Queijaria Mirandesa", "Tasca dos Sentidos", "Azeite & Sal", "Padaria Raízes"],
    locations: ["Lisboa", "Porto", "Braga", "Évora", "Coimbra", "Setúbal", "Faro", "Viseu"],
    whatDo: [
      "restaurante de cozinha tradicional portuguesa contemporânea com produtos locais e sazonais",
      "padaria artesanal que produz pão de fermentação lenta com farinhas biológicas portuguesas",
      "queijaria artesanal que produz e comercializa queijos regionais de pequenos produtores",
      "tasca moderna que reinventa receitas transmontanas num ambiente descontraído e acolhedor",
    ],
    origin: [
      "cresceu a ver a avó cozinhar e quis preservar essas receitas de uma forma moderna e acessível",
      "depois de anos a trabalhar em cozinhas estrangeiras, voltou a Portugal com vontade de valorizar os ingredientes locais",
      "detectou uma falta de espaços que unissem tradição e contemporaneidade na sua cidade",
      "cansou-se da restauração industrial e decidiu criar algo verdadeiro, com alma e produto de qualidade",
    ],
    mission: [
      "levar a cozinha portuguesa a uma nova geração sem perder a autenticidade das receitas tradicionais",
      "valorizar os produtores locais e colocar o produto português no centro da experiência gastronómica",
      "criar um espaço onde as pessoas se sintam em casa, com comida honesta e feita com amor",
      "mostrar que a gastronomia portuguesa pode ser contemporânea, sustentável e emocionante",
    ],
    values: [
      ["Autenticidade", "Sazonalidade", "Comunidade"],
      ["Qualidade", "Tradição", "Honestidade"],
      ["Proximidade", "Sustentabilidade", "Paixão"],
      ["Raízes", "Partilha", "Território"],
    ],
    unique: [
      "todos os ingredientes vêm de produtores locais com quem mantemos uma relação directa e pessoal",
      "as receitas são inspiradas em cadernos de família com mais de três gerações de história",
      "o menu muda semanalmente conforme o que a época e os produtores têm de melhor",
      "combinamos técnica moderna com sabores que as pessoas reconhecem e sentem como seus",
    ],
    threeWords: [
      ["Autêntico", "Acolhedor", "Saboroso"],
      ["Raiz", "Partilha", "Território"],
      ["Honesto", "Sazonal", "Português"],
      ["Memória", "Sabor", "Comunidade"],
    ],
    idealClient: [
      "adultos entre 28–50 anos que valorizam a gastronomia portuguesa e procuram experiências autênticas",
      "famílias e grupos de amigos que querem um espaço acolhedor para partilhar uma boa refeição",
      "turistas e locais curiosos que querem descobrir o melhor da cozinha regional portuguesa",
    ],
    firstFeel: ["aconchegada e curiosa, como se acabasse de descobrir um segredo bem guardado", "em casa, acolhida, como se já conhecesse o espaço há anos", "surpreendida e encantada com a autenticidade e o cuidado em cada detalhe"],
    regularFeel: ["parte de uma comunidade que partilha os mesmos valores de proximidade e qualidade", "fiel e orgulhosa de apoiar um projecto local com história e propósito", "reconfortada e alimentada — não só o corpo, mas também a alma"],
    relationship: ["próxima e familiar, como entre vizinhos que se conhecem há anos", "baseada na confiança e na consistência — saber que vai ter sempre a mesma qualidade", "calorosa e humana, onde o cliente se sente reconhecido e valorizado"],
    brandPerson: [
      "uma avó moderna que conhece todas as receitas tradicionais mas não tem medo de experimentar",
      "um agricultor apaixonado que sabe tudo sobre o produto e adora partilhar esse conhecimento",
      "um chef curioso que viajou pelo mundo mas voltou às raízes com novos olhos",
    ],
    personalityWords: [
      ["Acolhedor", "Autêntico", "Apaixonado"],
      ["Caloroso", "Honesto", "Enraizado"],
      ["Simples", "Genuíno", "Saboroso"],
    ],
    neverWords: [
      ["Frio", "Industrial", "Artificial"],
      ["Pretensioso", "Distante", "Genérico"],
      ["Vazio", "Impessoal", "Apressado"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Divertida", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é aquele sítio onde a comida sabe como devia saber — com alma e sem truques",
      "parece que entras na casa de alguém que cozinha muito bem e te trata como família",
      "o melhor lugar para comer bem e sentir que estás a apoiar algo verdadeiro e local",
    ],
    attractColors: [["#3B2314", "#D4A84B", "#F5ECD7"], ["#2C4A2E", "#A8C66C", "#F9F5EC"], ["#1C1C1C", "#E8C547", "#FFFDF5"]],
    avoidColors: [["vermelho vivo e amarelo néon", "associados a fast food e artifício"], ["tons fluorescentes", "transmitem artificialidade, o oposto do que a marca representa"]],
    visualStyle: ["Orgânico", "Vintage", "Ilustrativo"],
    admiredBrands: [
      [["Taberna da Rua das Flores", "autenticidade e design com raízes portuguesas"], ["Arcádia", "embalagem clássica com elegância atemporal"], ["Boa-Bao", "identidade vibrante e coerente em todos os pontos de contacto"]],
      [["Prado Restaurante", "simplicidade e ligação ao produto"], ["Origem", "identidade limpa que comunica qualidade sem exagero"], ["Super Bock", "identidade com história e orgulho nacional"]],
    ],
    dislikedBrands: [
      [["McDonald's", "identidade industrial e sem alma"], ["Telepizza", "visual genérico e pouco diferenciador"]],
      [["Pizza Hut", "excesso de vermelho sem personalidade"], ["Burger King", "visual demasiado agressivo para o conceito"]],
    ],
    visualEnergy: ["fotografia de produto com luz natural e texturas rústicas", "ilustrações de ingredientes e elementos da terra portuguesa", "padrões inspirados nos azulejos e tecidos tradicionais"],
    includeSymbol: ["elementos da natureza portuguesa — folhas de oliveira, espigas de trigo, videira", "iconografia rural — barril, forno, tacho de barro", "referências à arquitectura local — arcos, telhas, calçada"],
    avoidSymbol: ["garfo e faca estilizados — demasiado genérico na restauração", "chef com chapéu — clichê excessivo", "estrelas e coroas — associadas a fast food ou excesso de pretensão"],
    usedWhere: ["espaço físico", "redes sociais", "embalagens e take-away", "menu e carta"],
    deadline: ["2 meses", "6 semanas", "3 meses"],
    addons: ["Menu", "Carta de Vinhos", "Guardanapos", "Base de Copo", "Placemat", "Sacola de Papel", "Embalagem Take-Away", "Sticker", "Cartão de Fidelidade", "Cartão de Agradecimento", "Social Media", "Cartão de Visita"],
    competitors: ["Taberna da Rua das Flores", "Zé da Mouraria", "O Corvo"],
    slogans: ["Sabor com memória.", "Da terra à mesa.", "Cozinha com alma.", "Receitas que ficam."],
  },
  fashion: {
    names: ["Linho & Co.", "Casa Velha Studio", "Bruma Atelier", "Dunas", "Veste Lisboa", "Fio a Fio", "Atlântico Label", "Pele Nova"],
    locations: ["Lisboa", "Porto", "Braga", "Guimarães", "Viana do Castelo", "Cascais", "Setúbal"],
    whatDo: [
      "marca de roupa slow fashion com peças atemporais produzidas em Portugal com tecidos naturais",
      "atelier de moda que cria peças à medida para mulheres que querem vestir com intenção e personalidade",
      "marca de acessórios em cortiça e materiais naturais portugueses com design contemporâneo",
      "linha de roupa de banho e praia sustentável inspirada nas praias atlânticas portuguesas",
    ],
    origin: [
      "frustrada com o consumismo e a moda descartável, decidiu criar algo duradouro e feito com consciência",
      "depois de trabalhar em grandes marcas internacionais, quis trazer a produção para Portugal e devolver qualidade às peças",
      "cresceu rodeada de teceleiras no Minho e quis usar esse conhecimento ancestral de forma contemporânea",
      "apaixonou-se pela riqueza têxtil portuguesa e decidiu torná-la acessível a uma nova geração",
    ],
    mission: [
      "criar roupa que dure anos — peças com qualidade, propósito e ligação ao território português",
      "valorizar os artesãos e produtores têxteis portugueses através de um design contemporâneo e consciente",
      "mudar a relação das pessoas com o armário — comprar menos, comprar melhor, comprar com significado",
      "mostrar que é possível ser sustentável sem abdicar de estilo e sofisticação",
    ],
    values: [
      ["Sustentabilidade", "Qualidade", "Autenticidade"],
      ["Intenção", "Durabilidade", "Território"],
      ["Consciência", "Simplicidade", "Beleza"],
      ["Lentidão", "Propósito", "Honestidade"],
    ],
    unique: [
      "todas as peças são produzidas em Portugal com artesãos locais e tecidos naturais certificados",
      "design atemporal que não segue tendências sazonais — peças que duram anos sem sair de moda",
      "cada peça tem uma história — sabemos exactamente quem a fez, onde e com quê",
      "combinamos estética minimalista com o melhor dos têxteis tradicionais portugueses",
    ],
    threeWords: [
      ["Intencional", "Atemporal", "Português"],
      ["Lento", "Consciente", "Belo"],
      ["Puro", "Duradouro", "Honesto"],
      ["Natural", "Simples", "Cuidado"],
    ],
    idealClient: [
      "mulheres entre 25–45 anos que preferem investir em peças de qualidade a comprar muitas peças descartáveis",
      "consumidores conscientes que querem saber a origem do que vestem e apoiar a produção nacional",
      "profissionais urbanas que procuram um guarda-roupa cápsula com peças versáteis e atemporais",
    ],
    firstFeel: ["inspirada e consciente, como se descobrisse que é possível vestir bem e fazer bem", "calma e segura, como quem encontra exactamente o que procurava sem ruído", "surpreendida pela beleza discreta e pela qualidade evidente em cada detalhe"],
    regularFeel: ["fiel e orgulhosa de fazer escolhas com propósito e impacto positivo", "confortável e elegante — as peças fazem parte da sua identidade e do seu dia-a-dia", "conectada a algo maior — uma comunidade de pessoas que vestem com consciência"],
    relationship: ["próxima e baseada em confiança — como ter uma estilista pessoal que te conhece bem", "transparente e directa, sem marketing vazio — só produto e história real", "de longo prazo, como acontece com as peças — dura, cresce e melhora com o tempo"],
    brandPerson: [
      "uma mulher portuguesa de 35 anos, arquitecta, minimalista, que viaja pouco mas intensamente e não segue tendências",
      "um artesão moderno que aprendeu com os avós mas pensa no futuro e valoriza o design",
      "uma criativa independente que vive entre o Porto e a natureza, lê muito e compra pouco mas muito bem",
    ],
    personalityWords: [
      ["Serena", "Intencional", "Refinada"],
      ["Consciente", "Atemporal", "Genuína"],
      ["Suave", "Firme", "Elegante"],
    ],
    neverWords: [
      ["Ruidosa", "Descartável", "Superficial"],
      ["Apressada", "Artificial", "Excessiva"],
      ["Fria", "Distante", "Impessoal"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Séria", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é uma marca portuguesa que faz roupa bonita, de qualidade e com consciência — ficas bem e sentes-te bem",
      "parece minimalista mas tem muita história — cada peça foi feita por alguém em Portugal com muito cuidado",
      "o tipo de marca que dá vontade de comprar menos e escolher melhor",
    ],
    attractColors: [["#F5F0EB", "#2D2D2D", "#C9A96E"], ["#E8D5C4", "#1C1C1C", "#BFAE9E"], ["#FAF7F2", "#3D3635", "#C4A882"]],
    avoidColors: [["cores néon e saturadas", "conotadas com fast fashion e descartabilidade"], ["vermelho vivo", "demasiado agressivo para a energia calm e consciente da marca"]],
    visualStyle: ["Minimalista", "Elegante", "Orgânico"],
    admiredBrands: [
      [["Cos", "minimalismo sofisticado e atemporal"], ["Arket", "ligação à natureza e qualidade evidente"], ["Dielle", "produção nacional com identidade forte e clara"]],
      [["Loom", "slow fashion portuguesa com design limpo"], ["Veja", "transparência radical e identidade coerente"], ["Filippa K", "minimalismo escandinavo com durabilidade"]],
    ],
    dislikedBrands: [
      [["Shein", "fast fashion sem qualidade nem propósito"], ["Zara", "excesso de tendências sem identidade consistente"]],
      [["H&M", "volume sem consciência"], ["Primark", "descartável e sem alma"]],
    ],
    visualEnergy: ["lookbooks em linho branco com luz natural difusa e textura visível", "fotografia de detalhe — costuras, tecidos, mãos a trabalhar", "paleta de cor terrosa e natural, como a paisagem portuguesa"],
    includeSymbol: ["fio, agulha ou tear estilizados", "referência ao mapa de Portugal ou ao Atlântico", "elemento natural — folha, pedra, onda"],
    avoidSymbol: ["cabide estilizado — demasiado genérico na moda", "manequim ou silhueta humana — clichê do sector", "coroa ou elementos de luxo excessivo"],
    usedWhere: ["etiquetas e embalagens", "redes sociais", "loja online", "feiras e pop-ups"],
    deadline: ["3 meses", "2 meses", "6 semanas"],
    addons: ["Label Tag", "Etiqueta de Produto", "Sacola / Saco de Papel", "Caixa de Produto", "Papel de Embrulho", "Cartão de Agradecimento", "Lookbook", "Sticker", "Social Media", "Cartão de Visita", "Poster"],
    competitors: ["Loom", "Dielle", "By Neves"],
    slogans: ["Vista com intenção.", "Feito para durar.", "Menos, mas melhor.", "Com raízes portuguesas."],
  },
  health: {
    names: ["Clínica Alma", "Centro Viver Bem", "Espaço Raíz", "Consultório Calma", "Studio Florescer", "Plenamente", "Origem Saúde", "Equilíbrio Clínico"],
    locations: ["Lisboa", "Porto", "Braga", "Coimbra", "Cascais", "Sintra", "Aveiro", "Leiria"],
    whatDo: [
      "clínica de medicina integrativa que combina abordagens convencionais e complementares para o bem-estar global",
      "espaço de psicologia e coaching focado em adultos em transição de vida ou em situação de burnout",
      "centro de bem-estar que oferece yoga, meditação, nutrição e acompanhamento psicológico num só espaço",
      "consultório de nutrição funcional e medicina do estilo de vida para pessoas que querem mais energia e saúde",
    ],
    origin: [
      "depois de passar por um burnout pessoal, criou o espaço que gostaria de ter encontrado na altura",
      "frustrado com a medicina que trata sintomas e não pessoas, quis criar um modelo de cuidado mais humano",
      "reuniu uma equipa de profissionais com visões complementares para criar um espaço verdadeiramente integrado",
      "percebeu que as pessoas precisavam de apoio que fosse além da consulta de 15 minutos",
    ],
    mission: [
      "acompanhar pessoas no caminho para uma vida mais saudável, equilibrada e com mais sentido",
      "oferecer cuidados de saúde que respeitam o ser humano como um todo — corpo, mente e emoções",
      "tornar o bem-estar acessível e desmistificar práticas que podem transformar a vida das pessoas",
      "criar um espaço seguro onde as pessoas possam ser vulneráveis e encontrar suporte real",
    ],
    values: [
      ["Humanidade", "Integração", "Cuidado"],
      ["Equilíbrio", "Ciência", "Empatia"],
      ["Presença", "Honestidade", "Transformação"],
      ["Segurança", "Conexão", "Crescimento"],
    ],
    unique: [
      "abordagem verdadeiramente integrativa onde os profissionais comunicam entre si e tratam a pessoa como um todo",
      "ambiente desenhado para que as pessoas se sintam seguras, acolhidas e longe da frieza clínica habitual",
      "combinamos rigor científico com práticas complementares validadas — sem dogmas, com resultados",
      "o acompanhamento não termina na consulta — temos suporte contínuo entre sessões",
    ],
    threeWords: [
      ["Humano", "Integrado", "Transformador"],
      ["Seguro", "Presente", "Cuidador"],
      ["Equilibrado", "Científico", "Empático"],
      ["Acolhedor", "Real", "Eficaz"],
    ],
    idealClient: [
      "adultos entre 30–55 anos que sentem que algo não está bem mas não sabem exactamente o quê",
      "profissionais em burnout ou em transição de vida que precisam de apoio estruturado e humano",
      "pessoas que já tentaram outras abordagens e procuram algo mais integrado e personalizado",
    ],
    firstFeel: ["aliviada e esperançosa, como se finalmente encontrasse um lugar que a percebe", "segura e acolhida, sem julgamento — pode ser ela própria", "surpreendida pela calma e pelo profissionalismo que coexistem no mesmo espaço"],
    regularFeel: ["mais forte e mais consciente de si própria a cada sessão", "apoiada e acompanhada — não está sozinha no caminho", "grata por ter encontrado um espaço que a trata como pessoa e não como número"],
    relationship: ["de parceria e co-responsabilidade — caminhamos juntos mas a pessoa lidera a sua vida", "baseada em confiança profunda e continuidade — não é uma consulta isolada, é um acompanhamento", "calorosa e profissional em simultâneo — há cuidado real sem perder o rigor"],
    brandPerson: [
      "uma médica de 40 anos, calma, directa e profundamente humana — ouve antes de falar e nunca julga",
      "um terapeuta experiente que combina ciência com intuição e faz as pessoas sentirem-se verdadeiramente vistas",
      "uma profissional de saúde que passou ela própria por dificuldades e transformou isso em vocação",
    ],
    personalityWords: [
      ["Empática", "Rigorosa", "Transformadora"],
      ["Calma", "Presente", "Humana"],
      ["Segura", "Cuidadora", "Real"],
    ],
    neverWords: [
      ["Fria", "Clínica", "Distante"],
      ["Ansiosa", "Superficial", "Impessoal"],
      ["Rígida", "Assustadora", "Comercial"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Séria", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é um sítio onde te sentem realmente — não és um número, és uma pessoa com uma história",
      "ajudou-me a perceber coisas sobre mim que não conseguia ver sozinha — com muita gentileza e rigor",
      "o lugar onde fui depois de tentar tudo — e onde finalmente percebi o que precisava",
    ],
    attractColors: [["#1B4332", "#74C69D", "#F8F9FA"], ["#2D4159", "#89C2D9", "#F0F4F8"], ["#3D2B1F", "#E8C99A", "#FAF7F2"]],
    avoidColors: [["vermelho intenso", "associado a urgência e stress, o oposto do que queremos transmitir"], ["preto dominante", "demasiado pesado para um espaço que deve transmitir leveza e esperança"]],
    visualStyle: ["Minimalista", "Orgânico", "Elegante"],
    admiredBrands: [
      [["Headspace", "identidade que transmite calma e acessibilidade"], ["CUF", "profissionalismo com toque humano"], ["Rituals", "sensorialidade e cuidado em cada detalhe visual"]],
      [["Nativo", "bem-estar português com identidade clara e calorosa"], ["Bloom", "minimalismo que transmite saúde e equilíbrio"], ["The Body Shop", "valores claros reflectidos na identidade visual"]],
    ],
    dislikedBrands: [
      [["hospitais genéricos", "azul e branco frio sem personalidade"], ["farmácias de grande cadeia", "visual demasiado comercial e impessoal"]],
    ],
    visualEnergy: ["fotografia com luz natural suave, plantas e materiais orgânicos", "espaços brancos com elementos verdes e texturas naturais", "tipografia limpa com muito espaço em branco e sensação de respiração"],
    includeSymbol: ["elemento vegetal estilizado — folha, raiz, semente", "forma circular ou de ondas — continuidade e equilíbrio", "ponto de encontro ou abraço abstracto"],
    avoidSymbol: ["cruz vermelha ou símbolo médico convencional", "coração estilizado — demasiado usado no sector", "estetoscópio ou seringa — conotação demasiado clínica"],
    usedWhere: ["consultório físico", "website", "redes sociais", "materiais impressos para pacientes"],
    deadline: ["2 meses", "6 semanas", "3 meses"],
    addons: ["Cartão de Visita", "Papel Timbrado", "Envelope", "Cartão de Fidelidade", "Cartão de Agradecimento", "Brochura", "Flyer", "Social Media", "Assinatura de Email"],
    competitors: ["Clínica Espregueira-Mendes", "Hospital da Luz", "Centro de Saúde Integrada"],
    slogans: ["Cuide de si com ciência.", "O equilíbrio começa aqui.", "Saúde que respeita quem és.", "Para lá do sintoma."],
  },
  beauty: {
    names: ["Clé Studio", "Nua Cosméticos", "Aurore Skin", "Brilho Bruto", "Serum & Co.", "Pele Viva", "Matte Lisboa", "Tónica Natural"],
    locations: ["Lisboa", "Porto", "Cascais", "Braga", "Coimbra", "Aveiro"],
    whatDo: [
      "marca de cosméticos naturais e veganos desenvolvida em Portugal com ingredientes da flora portuguesa",
      "estúdio de beleza que oferece tratamentos faciais personalizados com produtos sem químicos agressivos",
      "linha de skincare minimalista com fórmulas baseadas em ciência e ingredientes locais certificados",
      "marca de maquilhagem inclusiva e vegana com tons pensados para a pele mediterrânica portuguesa",
    ],
    origin: [
      "depois de anos a sofrer de pele sensível, decidiu criar os produtos que precisava e não encontrava no mercado",
      "formada em farmácia, quis usar esse conhecimento para criar cosméticos mais honestos e eficazes",
      "apaixonou-se pela riqueza botânica portuguesa e quis transformar esses ingredientes em produtos de beleza",
      "insatisfeita com a falta de tons adequados para peles mediterrânicas, criou a sua própria linha",
    ],
    mission: [
      "criar produtos de beleza honestos, eficazes e respeitadores da pele e do planeta",
      "tornar a beleza consciente acessível — sem greenwashing, sem promessas vazias, com resultados reais",
      "valorizar a biodiversidade portuguesa através de cosméticos que funcionam e têm história",
      "empoderar as pessoas a cuidar da pele com produtos que respeitam quem são e onde vivem",
    ],
    values: [
      ["Transparência", "Eficácia", "Sustentabilidade"],
      ["Honestidade", "Naturalidade", "Inclusão"],
      ["Ciência", "Consciência", "Beleza Real"],
      ["Respeito", "Origem", "Autenticidade"],
    ],
    unique: [
      "todos os ingredientes activos têm origem portuguesa — desde o azeite do Alentejo ao aloe vera do Algarve",
      "fórmulas desenvolvidas com farmacêuticos portugueses — eficácia comprovada sem ingredientes desnecessários",
      "embalagens 100% recicláveis com refil disponível — beleza consciente do início ao fim",
      "sem parfum, sem sulfatos, sem parabenos — ingrediente a ingrediente, sabemos o que está em cada produto",
    ],
    threeWords: [
      ["Honesta", "Natural", "Eficaz"],
      ["Consciente", "Portuguesa", "Limpa"],
      ["Simples", "Real", "Cuidadora"],
      ["Transparente", "Botânica", "Moderna"],
    ],
    idealClient: [
      "mulheres de 25–45 anos com pele sensível que querem produtos eficazes e sem ingredientes desnecessários",
      "consumidores conscientes que lêem os ingredientes e querem saber exactamente o que aplicam na pele",
      "pessoas que transitaram para um estilo de vida mais sustentável e querem que os cosméticos acompanhem essa escolha",
    ],
    firstFeel: ["aliviada e confiante, como quem finalmente encontra algo honesto num mercado cheio de promessas", "curiosa e entusiasmada com a simplicidade e a clareza da comunicação", "surpreendida pela qualidade e pelo cuidado nos detalhes — desde a embalagem ao cheiro"],
    regularFeel: ["fiel e embaixadora — recomenda a amigos porque acredita genuinamente nos produtos", "confortável e informada — sabe o que usa e porquê, e isso dá segurança", "parte de uma comunidade que escolhe beleza com consciência e propósito"],
    relationship: ["educativa e transparente — queremos que o cliente perceba os produtos e tome decisões informadas", "próxima e honesta, sem marketing excessivo — só produto, ingredientes e resultados", "de longo prazo, como o cuidado da pele — consistente, paciente e com resultados que aparecem com o tempo"],
    brandPerson: [
      "uma dermatologista apaixonada por botânica que faz produtos que usaria ela própria e recomenda sem hesitação",
      "uma farmacêutica criativa que adora a natureza portuguesa e quer que os cosméticos sejam tão honestos quanto ela",
      "uma mulher de 32 anos que não segue tendências de beleza mas sabe muito sobre pele, ingredientes e sustentabilidade",
    ],
    personalityWords: [
      ["Honesta", "Consciente", "Eficaz"],
      ["Natural", "Simples", "Inteligente"],
      ["Transparente", "Cuidadora", "Autêntica"],
    ],
    neverWords: [
      ["Artificial", "Excessiva", "Enganosa"],
      ["Fútil", "Superficial", "Greenwashing"],
      ["Fria", "Distante", "Complicada"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Séria", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é a marca que finalmente faz o que promete — sem truques, sem listas intermináveis de ingredientes estranhos",
      "uso há anos e a minha pele nunca esteve tão bem — e ainda por cima é feita em Portugal",
      "o tipo de beleza que dá jeito saber que existe — boa para ti e boa para o planeta",
    ],
    attractColors: [["#2C1810", "#D4956A", "#FDF0E8"], ["#F8F4F0", "#1C1C1C", "#C8A882"], ["#1A3A2A", "#8FBC8F", "#F5F5F0"]],
    avoidColors: [["rosa choque e lilás sintético", "associados a beleza artificial e sem profundidade"], ["dourado excessivo", "remete para luxo pretensioso, não para autenticidade natural"]],
    visualStyle: ["Minimalista", "Elegante", "Orgânico"],
    admiredBrands: [
      [["The Ordinary", "transparência radical nos ingredientes e embalagem limpa"], ["Claus Porto", "herança portuguesa com design sofisticado e atemporal"], ["Aesop", "minimalismo inteligente com forte carácter editorial"]],
      [["Grown Alchemist", "botânica moderna com embalagem premium e honesta"], ["Sukin", "simplicidade e transparência com raízes naturais"], ["Nuxe", "elegância francesa com ingredientes naturais reconhecíveis"]],
    ],
    dislikedBrands: [
      [["marcas de grande distribuição genéricas", "embalagens coloridas sem identidade"], ["marcas de greenwashing", "verde por fora, chemicals por dentro — falta de honestidade"]],
    ],
    visualEnergy: ["fotografia botânica com ingredientes em contexto natural — flores, plantas, terra", "embalagem limpa com muita informação visível — lista de ingredientes como elemento de design", "luz difusa, sombras suaves, materiais orgânicos — vidro, cortiça, cerâmica"],
    includeSymbol: ["planta ou flor portuguesa estilizada", "gota ou elemento fluído", "folha ou raiz como assinatura gráfica"],
    avoidSymbol: ["coração ou laço de presente — demasiado genérico na beleza", "diamante ou coroa — associados a luxo falso", "mulher estilizada — clichê e pouco inclusivo"],
    usedWhere: ["embalagens e rótulos", "loja online", "redes sociais", "feiras e pop-ups"],
    deadline: ["2 meses", "3 meses", "6 semanas"],
    addons: ["Rótulo", "Embalagem", "Label Tag", "Caixa de Produto", "Papel de Embrulho", "Sticker", "Cartão de Agradecimento", "Cartão de Fidelidade", "Lookbook", "Social Media", "Cartão de Visita", "Brochura"],
    competitors: ["Claus Porto", "Castelbel", "Benamôr"],
    slogans: ["Beleza com origem.", "A sua pele, os nossos ingredientes.", "Simples. Eficaz. Português.", "Da natureza para si."],
  },
  education: {
    names: ["Escola Aberta", "Oficina do Saber", "Mente Viva", "Atlas Formação", "Núcleo Criativo", "Academia Ponte", "Estúdio Aprender", "Luz e Saber"],
    locations: ["Lisboa", "Porto", "Braga", "Coimbra", "Évora", "Faro", "Aveiro", "Viseu"],
    whatDo: [
      "escola de formação profissional em design, comunicação e criatividade para adultos em transição de carreira",
      "plataforma de cursos online em português focada em competências digitais para o mercado de trabalho actual",
      "centro de explicações e apoio escolar que usa metodologias activas e criativas para crianças e jovens",
      "programa de formação em liderança e desenvolvimento pessoal para equipas e organizações",
    ],
    origin: [
      "depois de anos como professor frustrado com o sistema, criou o modelo de ensino que sempre quis ter",
      "percebeu que havia muitos adultos com vontade de mudar de carreira mas sem acesso a formação de qualidade",
      "como pai, não encontrou um espaço de apoio escolar que valorizasse a criatividade e não só os resultados",
      "formado em pedagogia, quis criar um espaço onde aprender fosse genuinamente motivador e transformador",
    ],
    mission: [
      "tornar a aprendizagem transformadora e acessível — para que toda a gente possa reinventar o seu caminho",
      "desenvolver competências reais para o mercado actual através de metodologias que respeitam cada pessoa",
      "criar um espaço onde aprender é uma aventura e não uma obrigação — com resultados que se vêem na vida real",
      "democratizar o acesso à formação de qualidade em Portugal, independentemente da localização ou background",
    ],
    values: [
      ["Curiosidade", "Transformação", "Acessibilidade"],
      ["Qualidade", "Inclusão", "Impacto Real"],
      ["Criatividade", "Rigor", "Humanidade"],
      ["Crescimento", "Comunidade", "Propósito"],
    ],
    unique: [
      "metodologia baseada em projectos reais — os alunos saem com um portefólio, não só com um certificado",
      "professores que são profissionais activos nas suas áreas — ensino com experiência real e actualizada",
      "acompanhamento individual de cada aluno com feedback regular e mentoria personalizada",
      "comunidade activa de ex-alunos que colaboram, contratam e se apoiam mutuamente",
    ],
    threeWords: [
      ["Transformador", "Acessível", "Real"],
      ["Criativo", "Rigoroso", "Humano"],
      ["Motivador", "Prático", "Inclusivo"],
      ["Próximo", "Eficaz", "Inspirador"],
    ],
    idealClient: [
      "adultos de 25–45 anos que querem mudar de carreira ou actualizar competências para o mercado digital",
      "jovens de 16–24 anos que procuram uma alternativa ao ensino tradicional com mais criatividade e prática",
      "empresas e equipas que precisam de formação em competências criativas, digitais ou de liderança",
    ],
    firstFeel: ["entusiasmada e esperançosa, como quem percebe que a mudança que quer é possível", "acolhida e respeitada — não é tratada como aluna mas como adulto com um objectivo", "surpreendida pela clareza e pelo foco nos resultados reais, não nas horas de formação"],
    regularFeel: ["motivada e confiante, a ver o seu progresso de forma tangível a cada semana", "parte de uma comunidade que aprende e cresce junta", "orgulhosa do que está a construir — sente que está a investir em si própria de forma inteligente"],
    relationship: ["de mentoria — estamos do mesmo lado, a trabalhar para o mesmo objectivo", "honesta e directa, com feedback real que ajuda a crescer", "de comunidade — não é uma relação que termina no último dia de curso"],
    brandPerson: [
      "um professor de 38 anos, curioso, irreverente e com experiência real no mercado — fala a direito e entrega resultados",
      "uma mentora apaixonada que acredita genuinamente no potencial de cada pessoa e não desiste de ninguém",
      "um criativo que um dia foi aluno frustrado e decidiu criar o espaço que gostaria de ter tido",
    ],
    personalityWords: [
      ["Motivador", "Prático", "Acessível"],
      ["Curioso", "Directo", "Transformador"],
      ["Humano", "Rigoroso", "Inspirador"],
    ],
    neverWords: [
      ["Entediante", "Teórico", "Distante"],
      ["Elitista", "Rígido", "Impessoal"],
      ["Desactualizado", "Burocrático", "Frio"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Divertida", classicModern: "Moderna", quietBold: "Arrojada", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "aprendi mais em três meses do que em anos — com professores que sabem mesmo do que falam",
      "é o sítio onde fui quando quis mudar de vida e não sabia por onde começar — ajudaram-me a descobrir",
      "não é uma escola normal — é um lugar onde te tratam como adulto e te ajudam a construir algo real",
    ],
    attractColors: [["#1A1A2E", "#F7B731", "#FEFCF8"], ["#0D3B66", "#FAF0CA", "#F4D35E"], ["#2D6A4F", "#95D5B2", "#FEFCF8"]],
    avoidColors: [["cinzento e azul escuro institucional", "associados ao ensino tradicional e burocrático"], ["cores demasiado infantis", "o público é adulto e quer ser tratado como tal"]],
    visualStyle: ["Moderno", "Arrojado", "Geométrico"],
    admiredBrands: [
      [["EDIT.", "identidade jovem e criativa que rompe com o ensino tradicional"], ["Ironhack", "posicionamento claro e identidade forte no sector tech"], ["Domestika", "acessibilidade e comunidade numa identidade limpa e acolhedora"]],
      [["Red Academy", "criatividade e modernidade num sector conservador"], ["General Assembly", "clareza de propósito reflectida na identidade"], ["42 Lisboa", "disrupção do ensino com identidade que comunica diferença"]],
    ],
    dislikedBrands: [
      [["universidades tradicionais genéricas", "identidade estática e sem vida própria"], ["centros de formação básicos", "visual desactualizado que não inspira confiança"]],
    ],
    visualEnergy: ["fotografia de pessoas a trabalhar e a criar — não a ouvir aulas mas a fazer coisas", "paleta vibrante com contrastes fortes que transmitem energia e movimento", "tipografia arrojada com muito espaço branco — clareza e impacto em simultâneo"],
    includeSymbol: ["seta ou vector de movimento — crescimento e direcção", "ponto de exclamação ou interrogação estilizado", "forma geométrica que sugere construção ou montagem"],
    avoidSymbol: ["chapéu de formatura — clichê do ensino", "livro aberto estilizado — demasiado associado à escola tradicional", "lápis — demasiado infantil"],
    usedWhere: ["website", "redes sociais", "materiais impressos", "espaço físico"],
    deadline: ["2 meses", "3 meses", "6 semanas"],
    addons: ["Cartão de Visita", "Papel Timbrado", "Brochura", "Flyer", "Apresentação PowerPoint", "Social Media", "Pasta de Apresentação", "Bloco de Notas", "Caneta Personalizada", "T-shirt", "Tote Bag"],
    competitors: ["EDIT.", "Etic", "CESAE Digital"],
    slogans: ["Aprende. Cria. Transforma.", "O teu próximo capítulo começa aqui.", "Formação com propósito real.", "Porque aprender muda tudo."],
  },
  architecture: {
    names: ["Forma Atelier", "Espaço Nobre", "Studio Linha", "Planta & Co.", "Módulo Arquitectos", "Vide Interiores", "Arkê Studio", "Projecto Base"],
    locations: ["Lisboa", "Porto", "Cascais", "Braga", "Coimbra", "Sintra", "Aveiro"],
    whatDo: [
      "escritório de arquitectura residencial focado em reabilitação de edifícios históricos portugueses",
      "estúdio de design de interiores especializado em espaços comerciais com identidade forte e autoral",
      "empresa de arquitectura sustentável que projecta casas passivas e com impacto ambiental mínimo",
      "atelier de arquitectura de interiores para restaurantes e espaços de hospitalidade de nível médio-alto",
    ],
    origin: [
      "depois de trabalhar em grandes gabinetes sem espaço para a sua visão, criou o seu próprio atelier autoral",
      "apaixonado pela arquitectura portuguesa e pela necessidade de a reabilitar com respeito e contemporaneidade",
      "percebeu que havia uma lacuna entre o design de interiores acessível e o de luxo — e quis preencher esse espaço",
      "começou a fazer pequenos projectos para amigos e a qualidade do trabalho falou por si",
    ],
    mission: [
      "criar espaços que respiram — que tenham alma, luz, proporção e que melhorem genuinamente a vida das pessoas",
      "reabilitar o edificado português com respeito pelo passado e visão para o futuro",
      "projectar espaços comerciais que sejam extensões da identidade das marcas que os habitam",
      "tornar a boa arquitectura acessível a quem valoriza o espaço mas não tem um orçamento ilimitado",
    ],
    values: [
      ["Autoria", "Rigor", "Sensibilidade"],
      ["Luz", "Proporção", "Território"],
      ["Sustentabilidade", "Permanência", "Beleza"],
      ["Honestidade", "Detalhe", "Funcionalidade"],
    ],
    unique: [
      "cada projecto é único — não há soluções de prateleira, há escuta activa e design à medida de cada cliente",
      "trabalhamos com artesãos e fornecedores portugueses sempre que possível — o detalhe local faz a diferença",
      "acompanhamos o projecto do início ao fim, incluindo obra — o cliente tem sempre um interlocutor",
      "temos uma visão clara sobre materiais, proporções e luz que se mantém coerente em todos os nossos trabalhos",
    ],
    threeWords: [
      ["Autoral", "Rigoroso", "Sensível"],
      ["Atemporal", "Humano", "Preciso"],
      ["Português", "Sustentável", "Belo"],
      ["Honesto", "Detalhado", "Funcional"],
    ],
    idealClient: [
      "particulares que querem reabilitar a sua casa com cuidado e que valorizam o processo tanto quanto o resultado",
      "donos de restaurantes e espaços de hospitalidade que percebem que o espaço é parte da experiência",
      "promotores imobiliários que querem diferenciação através do design e da qualidade dos acabamentos",
    ],
    firstFeel: ["impressionada pelo portefólio e pela coerência estética — percebe imediatamente que há uma visão", "confiante de que está nas mãos certas — o trabalho fala por si", "entusiasmada com as possibilidades — sente que o seu espaço vai ser tratado com o cuidado que merece"],
    regularFeel: ["envolvida e respeitada no processo — as suas opiniões são ouvidas e incorporadas", "segura e informada — nunca fica sem saber o que está a acontecer no projecto", "orgulhosa do espaço que está a criar — sente que é uma co-criação"],
    relationship: ["de parceria e escuta — o cliente sabe o que quer viver, nós sabemos como criar o espaço para isso", "transparente e directa, com comunicação regular e honestidade sobre prazos e orçamentos", "de longo prazo — muitos clientes voltam para novos projectos ou recomendam activamente"],
    brandPerson: [
      "um arquitecto de 40 anos, minimalista, que colecciona livros de arquitectura e viaja para ver edifícios",
      "uma designer de interiores que pensa em luz, proporção e detalhe com a mesma atenção que um artista",
      "um profissional que fala pouco mas quando fala é relevante — deixa o trabalho comunicar por si",
    ],
    personalityWords: [
      ["Precisa", "Sensível", "Autoral"],
      ["Minimalista", "Atemporal", "Rigorosa"],
      ["Honesta", "Detalhada", "Silenciosa"],
    ],
    neverWords: [
      ["Ruidosa", "Excessiva", "Imprecisa"],
      ["Genérica", "Apressada", "Superficial"],
      ["Fria", "Vazia", "Sem Alma"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Séria", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Exclusiva", familyInstitutional: "Institucional" },
    friendDesc: [
      "é o tipo de arquitecto que ouve mesmo o que queres e entrega algo ainda melhor do que imaginavas",
      "trabalho impecável, detalhe a detalhe — e não deixa nada ao acaso",
      "transforma espaços — entra numa divisão qualquer e sai algo com alma e luz",
    ],
    attractColors: [["#F5F2EE", "#1C1C1C", "#B8A99A"], ["#FEFCF8", "#2C2C2C", "#C4A882"], ["#EAE0D5", "#3D3635", "#8B7355"]],
    avoidColors: [["cores vibrantes e saturadas", "conotadas com energia que não corresponde à seriedade e precisão do trabalho"], ["azul escuro corporativo", "demasiado bancário para um atelier criativo autoral"]],
    visualStyle: ["Minimalista", "Elegante", "Geométrico"],
    admiredBrands: [
      [["Promontório", "identidade que transmite autoridade e sofisticação sem exagero"], ["Aires Mateus", "minimalismo radical com presença forte"], ["Studio KO", "elegância discreta com grande personalidade autoral"]],
      [["Carrilho da Graça", "identidade intelectual e coerente com o trabalho"], ["Miguel Arruda", "autoridade discreta num sector competitivo"], ["Gonçalo Byrne", "herança e modernidade em equilíbrio perfeito"]],
    ],
    dislikedBrands: [
      [["construtoras genéricas", "identidade sem personalidade nem distinção"], ["promotores imobiliários de grande escala", "visual corporativo e frio sem alma"]],
    ],
    visualEnergy: ["fotografia de arquitectura com luz natural — sombras, texturas, materiais honestos", "plantas e desenhos técnicos como elementos gráficos — beleza no detalhe técnico", "espaço em branco generoso, tipografia fina, muito silêncio visual"],
    includeSymbol: ["linha arquitectónica estilizada — planta ou alçado abstracto", "ângulo ou forma geométrica precisa", "ponto e linha — minimalismo máximo"],
    avoidSymbol: ["casa estilizada — clichê absoluto na arquitectura", "régua ou compasso — demasiado genérico", "skyline de cidade — sem personalidade"],
    usedWhere: ["website e portfólio", "papelaria profissional", "placas de obra", "apresentações a clientes"],
    deadline: ["3 meses", "2 meses", "6 semanas"],
    addons: ["Cartão de Visita", "Papel Timbrado", "Envelope", "Pasta de Apresentação", "Apresentação PowerPoint", "Assinatura de Email", "Lookbook", "Social Media", "Tote Bag"],
    competitors: ["Promontório", "CVDB Arquitectos", "Atelier Data"],
    slogans: ["Espaços que respiram.", "Do conceito ao detalhe.", "Arquitectura com alma.", "Cada linha com intenção."],
  },
  sustainability: {
    names: ["Semente Circular", "Verde Raiz", "Terrana", "Cicla Portugal", "Gaia Studio", "Biome Projects", "Cleanloop", "Floresta Viva"],
    locations: ["Lisboa", "Porto", "Braga", "Évora", "Setúbal", "Coimbra", "Aveiro"],
    whatDo: [
      "empresa de consultoria em sustentabilidade e economia circular para PMEs portuguesas",
      "marca de produtos de limpeza doméstica 100% biodegradáveis com embalagens recarregáveis e design cuidado",
      "cooperativa de reciclagem criativa que transforma resíduos em produtos de design com identidade portuguesa",
      "plataforma que liga empresas portuguesas a projectos de reflorestação e compensação de carbono",
    ],
    origin: [
      "depois de trabalhar no sector corporativo e ver o desperdício de perto, decidiu criar soluções reais e acessíveis",
      "frustrada com os produtos de limpeza tóxicos e nas prateleiras, criou os seus próprios em casa e descobriu um negócio",
      "percebeu que os resíduos não são lixo — são matéria-prima para algo novo, com história e design",
      "acredita que as empresas portuguesas podem liderar a transição sustentável se tiverem as ferramentas certas",
    ],
    mission: [
      "provar que negócio e sustentabilidade não são opostos — são o mesmo caminho",
      "tornar a sustentabilidade acessível, prática e desejável para quem quer mudar mas não sabe por onde começar",
      "criar produtos e serviços que regeneram em vez de extrair — para pessoas, empresas e planeta",
      "construir uma economia circular portuguesa com impacto real e mensurável",
    ],
    values: [
      ["Impacto Real", "Transparência", "Regeneração"],
      ["Honestidade", "Circularidade", "Comunidade"],
      ["Ciência", "Acessibilidade", "Território"],
      ["Acção", "Autenticidade", "Futuro"],
    ],
    unique: [
      "sem greenwashing — cada afirmação de impacto é medida, publicada e verificável",
      "produtos e serviços desenhados para serem belos e eficazes — a sustentabilidade não tem que ser feia ou chata",
      "raízes profundamente portuguesas — matérias-primas locais, parcerias com cooperativas nacionais",
      "modelo circular completo — do produto ao fim de vida, pensamos em tudo",
    ],
    threeWords: [
      ["Real", "Regenerador", "Transparente"],
      ["Circular", "Honesto", "Impactante"],
      ["Português", "Consciente", "Accionável"],
      ["Autêntico", "Sustentável", "Belo"],
    ],
    idealClient: [
      "empresas portuguesas que querem integrar sustentabilidade de forma genuína e comunicá-la com credibilidade",
      "consumidores de 25–45 anos que já mudaram outros hábitos e querem que os produtos de limpeza acompanhem essa escolha",
      "marcas e organizações que percebem que o futuro do negócio passa pela sustentabilidade e querem estar na frente",
    ],
    firstFeel: ["aliviada — finalmente algo que parece real e não só marketing verde vazio", "esperançosa e activada — percebe que pode fazer escolhas com impacto sem complicações", "impressionada pela honestidade e pela clareza com que o impacto é comunicado"],
    regularFeel: ["orgulhosa das suas escolhas e confiante que está a contribuir para algo que importa", "parte de uma comunidade que age e não só fala — isso faz diferença", "fiel a uma marca que cresce e melhora com ela — há evolução constante e transparência total"],
    relationship: ["de parceria no impacto — estamos juntos no mesmo lado", "educativa e honesta — explicamos o porquê de cada decisão sem jargão", "de longo prazo e baseada em resultados reais — não em promessas"],
    brandPerson: [
      "um engenheiro do ambiente de 35 anos que largou o trabalho corporativo para criar soluções reais e fala a direito sobre impacto",
      "uma activista pragmática que não fica só nas palavras — cria produtos, mede impacto e publica resultados",
      "uma cientista apaixonada pela natureza portuguesa que acredita que a beleza e a sustentabilidade são inseparáveis",
    ],
    personalityWords: [
      ["Honesta", "Activista", "Real"],
      ["Regeneradora", "Transparente", "Optimista"],
      ["Circular", "Consciente", "Accionável"],
    ],
    neverWords: [
      ["Greenwashing", "Vaga", "Pretenciosa"],
      ["Catastrofista", "Culpabilizadora", "Inacessível"],
      ["Fria", "Corporativa", "Superficial"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Séria", classicModern: "Moderna", quietBold: "Arrojada", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é a marca que finalmente te faz sentir que as tuas escolhas têm impacto real — sem complicações nem culpa",
      "honesta a um nível que não estás habituado — dizem o que fazem e fazem o que dizem",
      "sustentabilidade sem drama nem greenwashing — prática, bonita e com resultados que se vêem",
    ],
    attractColors: [["#1B4332", "#52B788", "#F8F9FA"], ["#3D2B1F", "#A8763E", "#E8F5E9"], ["#0D3B66", "#48CAE4", "#CAF0F8"]],
    avoidColors: [["verde excessivamente saturado", "conotado com greenwashing e artificialidade"], ["castanho muito escuro", "pode remeter para algo pesado e sem esperança"]],
    visualStyle: ["Orgânico", "Minimalista", "Moderno"],
    admiredBrands: [
      [["Oatly", "comunicação radical e honesta com identidade forte e irreverente"], ["Patagonia", "activismo genuíno integrado na identidade desde o início"], ["Ecover", "simplicidade e clareza num sector cheio de ruído"]],
      [["Who Gives A Crap", "humor e propósito — prova que sustentabilidade pode ser divertida"], ["Tony's Chocolonely", "missão visível em tudo — do produto à embalagem"], ["Sonae MC", "escala com impacto mensurável em Portugal"]],
    ],
    dislikedBrands: [
      [["marcas de greenwashing genéricas", "verde por fora, nada por dentro — comunicação enganosa"], ["grandes corporações com relatórios ESG vazios", "impacto de fachada sem mudança real"]],
    ],
    visualEnergy: ["fotografia de natureza portuguesa — florestas, rios, paisagens — como promessa e como responsabilidade", "infografia clara e honesta com dados de impacto — transparência como design", "materiais reciclados visíveis nas embalagens — a imperfeição como honestidade"],
    includeSymbol: ["ciclo ou loop — economia circular", "folha ou semente com forma geométrica moderna", "raiz ou árvore estilizada com traço contemporâneo"],
    avoidSymbol: ["folha verde genérica — clichê absoluto do greenwashing", "planeta Terra estilizado — demasiado visto", "símbolo de reciclagem convencional — demasiado institucional"],
    usedWhere: ["embalagens", "website", "redes sociais", "apresentações a empresas"],
    deadline: ["2 meses", "3 meses", "6 semanas"],
    addons: ["Embalagem", "Rótulo", "Sacola de Papel", "Tote Bag", "Sticker", "Cartão de Agradecimento", "Brochura", "Flyer", "Social Media", "Cartão de Visita", "Papel de Embrulho"],
    competitors: ["Lipor", "Veolia Portugal", "Ambipar"],
    slogans: ["Negócios que regeneram.", "Sem greenwashing. Com impacto.", "Do resíduo ao recurso.", "O futuro que plantamos hoje."],
  },
  entertainment: {
    names: ["Holofote Produções", "Cena Aberta", "Spektra Lisboa", "Volta Studios", "Neonwave", "Pulso Cultural", "Fictvm", "Eco Criativo"],
    locations: ["Lisboa", "Porto", "Braga", "Coimbra", "Aveiro", "Faro"],
    whatDo: [
      "produtora de conteúdo audiovisual independente para plataformas digitais e festivais portugueses",
      "festival anual de música e artes performativas que mistura artistas emergentes e consagrados",
      "estúdio criativo que produz podcasts, vídeos e conteúdo digital para marcas com identidade cultural",
      "espaço de artes que programa espectáculos, exposições e residências artísticas em Portugal",
    ],
    origin: [
      "cansados de ver cultura portuguesa subfinanciada e mal comunicada, criaram uma plataforma para mudar isso",
      "começou como um evento pequeno entre amigos e cresceu organicamente porque havia uma lacuna real no mercado",
      "apaixonados por histórias portuguesas que não encontravam espaço nos meios mainstream",
      "perceberam que a cultura portuguesa tem imenso talento mas falta-lhe veículos de comunicação com qualidade",
    ],
    mission: [
      "dar visibilidade a histórias e artistas portugueses que merecem mais audiência e melhor produção",
      "criar plataformas culturais que conectem criadores e público de forma genuína e sustentável",
      "provar que a cultura portuguesa contemporânea é vibrante, relevante e internacionalmente competitiva",
      "democratizar o acesso à cultura de qualidade em Portugal, fora dos grandes centros",
    ],
    values: [
      ["Autenticidade", "Qualidade", "Comunidade"],
      ["Criatividade", "Independência", "Impacto Cultural"],
      ["Diversidade", "Inovação", "Território"],
      ["Partilha", "Excelência", "Cultura"],
    ],
    unique: [
      "curadoria com ponto de vista próprio — não programamos o que é seguro, programamos o que é significativo",
      "produção de qualidade com orçamentos independentes — criatividade como solução, não como desculpa",
      "ligação real às comunidades locais — não somos um evento que aparece e desaparece",
      "plataforma que descobre e apoia artistas emergentes antes de toda a gente",
    ],
    threeWords: [
      ["Vibrante", "Autêntico", "Cultural"],
      ["Independente", "Criativo", "Impactante"],
      ["Português", "Arrojado", "Relevante"],
      ["Curioso", "Comprometido", "Vivo"],
    ],
    idealClient: [
      "jovens e adultos de 18–40 anos com interesse em cultura independente e produções autorais portuguesas",
      "marcas que querem associar-se a conteúdo cultural de qualidade com público engajado e fiel",
      "artistas e criadores que procuram uma plataforma com visão e capacidade de produção",
    ],
    firstFeel: ["excitada e curiosa, como quem descobre algo que estava mesmo à procura", "surpreendida pela qualidade e pelo ponto de vista claro — há uma voz própria", "conectada — percebe que há uma comunidade à volta disto que partilha os seus valores"],
    regularFeel: ["fiel e evangelizadora — recomenda activamente porque se sente parte de algo", "enriquecida culturalmente — cada experiência acrescenta algo de novo", "orgulhosa de apoiar cultura portuguesa de qualidade"],
    relationship: ["de comunidade activa — o público é co-criador, não só consumidor", "próxima e directa, como fãs de uma banda independente que conhecem os músicos", "baseada em confiança curatorial — se dizemos que é bom, é mesmo bom"],
    brandPerson: [
      "um director artístico de 32 anos, que ouviu tudo, viu tudo e tem opinião sobre tudo — mas com humildade",
      "uma produtora independente que acredita que a cultura portuguesa merece melhor e age nesse sentido",
      "um curador apaixonado que conhece os artistas pelo primeiro nome e faz a ponte entre criadores e público",
    ],
    personalityWords: [
      ["Vibrante", "Curatorial", "Comprometida"],
      ["Arrojada", "Autêntica", "Cultural"],
      ["Independente", "Criativa", "Apaixonada"],
    ],
    neverWords: [
      ["Comercial", "Genérica", "Mainstream"],
      ["Fria", "Corporativa", "Vazia"],
      ["Segura", "Previsível", "Sem Risco"],
    ],
    spectrum: { simpleComplex: "Complexa", seriousFun: "Divertida", classicModern: "Moderna", quietBold: "Arrojada", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é o tipo de evento/marca que te faz descobrir coisas que não sabias que precisavas — e ficas grato",
      "cultura portuguesa com qualidade real — programação com ponto de vista e produção que respeita o público",
      "se gostas de cultura independente portuguesa, é essencial — tem uma curadoria impecável",
    ],
    attractColors: [["#0D0D0D", "#FF2D55", "#FFE620"], ["#0A0014", "#7B2FBE", "#00FFD1"], ["#1A1A1A", "#FF6B35", "#FEFCF8"]],
    avoidColors: [["bege e tons terra demasiado suaves", "sem energia suficiente para o contexto cultural e performativo"], ["azul corporativo", "demasiado institucional para uma marca cultural independente"]],
    visualStyle: ["Arrojado", "Moderno", "Geométrico"],
    admiredBrands: [
      [["NOS Alive", "identidade vibrante que evoluiu com o festival e tem reconhecimento internacional"], ["Culturgest", "sofisticação cultural com identidade clara e consistente"], ["Uzina Galeria", "ponto de vista autoral forte numa identidade visual marcante"]],
      [["Fórum Lisboa", "programação de qualidade com identidade que a reflecte"], ["Super Bock Super Rock", "energia e identidade que comunicam bem o festival"], ["Museu do Azulejo", "herança portuguesa com apresentação contemporânea"]],
    ],
    dislikedBrands: [
      [["eventos genéricos de entretenimento", "identidade descartável sem personalidade"], ["festivais corporativos", "alma vendida ao patrocínio — perde-se a identidade"]],
    ],
    visualEnergy: ["fotografia de palco e público com luz e movimento — energia palpável", "tipografia expressiva e experimental — a letra como elemento gráfico", "padrões geométricos e de cor intensa — identidade que se vê de longe"],
    includeSymbol: ["holofote, microfone ou onda sonora muito estilizados", "forma que transmite movimento e energia", "elemento tipográfico como símbolo — inicial estilizada"],
    avoidSymbol: ["nota musical genérica — clichê na cultura", "máscara de teatro — demasiado literal", "estrela de Hollywood — demasiado comercial"],
    usedWhere: ["cartazes e comunicação de evento", "redes sociais", "espaço físico", "merchandising"],
    deadline: ["2 meses", "3 meses", "6 semanas"],
    addons: ["Poster", "Banner", "Outdoor", "Flyer", "Programa de Evento", "Sticker", "T-shirt", "Boné", "Tote Bag", "Social Media", "Cartão de Visita", "Pulseira de Evento"],
    competitors: ["NOS Alive", "Culturgest", "Super Bock Super Rock"],
    slogans: ["Cultura com pulso.", "Histórias que ficam.", "O que acontece acontece aqui.", "Onde a cultura vive."],
  },
  retail: {
    names: ["Loja do Largo", "Armazém Nobre", "Casa da Praça", "O Celeiro", "Mercearia Viva", "Oficina do Produto", "Comércio da Vila", "Quintal & Co."],
    locations: ["Lisboa", "Porto", "Évora", "Braga", "Guimarães", "Coimbra", "Faro", "Viseu"],
    whatDo: [
      "mercearia gourmet focada em produtos portugueses de pequenos produtores com história e qualidade",
      "loja de produtos artesanais locais que serve de vitrina para artesãos da região e vende online",
      "espaço de comércio local que vende produtos de época directamente de agricultores da região",
      "loja de decoração e objectos de design português feitos por artesãos contemporâneos",
    ],
    origin: [
      "quis criar o espaço que sentia falta na sua cidade — um lugar onde comprar bem e conhecer quem produz",
      "como produtor local, percebeu que precisava de um canal de venda com identidade e não só de feiras ocasionais",
      "cresceu a ver o comércio local a morrer e decidiu criar um modelo que o tornasse desejável para uma nova geração",
      "apaixonada pelo design português, quis criar um espaço onde o produto nacional tivesse o palco que merece",
    ],
    mission: [
      "ser a ponte entre quem produz com cuidado e quem quer comprar com consciência e conhecimento",
      "valorizar o comércio e a produção local através de um espaço com identidade, curadoria e hospitalidade",
      "mostrar que comprar local é uma experiência, não apenas uma transacção",
      "tornar o produto português desejável e acessível a quem valoriza origem, qualidade e história",
    ],
    values: [
      ["Proximidade", "Curadoria", "Origem"],
      ["Qualidade", "Comunidade", "Autenticidade"],
      ["Território", "Hospitalidade", "Conhecimento"],
      ["Local", "Honestidade", "Partilha"],
    ],
    unique: [
      "conhecemos pessoalmente cada produtor — e isso está visível em cada produto que escolhemos vender",
      "não vendemos marcas, vendemos histórias — cada produto tem um produtor com nome e rosto",
      "espaço desenhado para que a visita seja uma experiência e não só uma compra",
      "curadoria rigorosa — preferimos ter menos e melhor do que muito e sem critério",
    ],
    threeWords: [
      ["Local", "Curado", "Acolhedor"],
      ["Autêntico", "Próximo", "Com História"],
      ["Honesto", "Seleccionado", "Comunitário"],
      ["Raiz", "Qualidade", "Partilha"],
    ],
    idealClient: [
      "adultos de 28–55 anos que valorizam a origem dos produtos e gostam de saber a história por detrás do que compram",
      "turistas que procuram experiências e produtos genuinamente locais para levar como memória",
      "famílias locais que querem apoiar a economia local e encontrar produtos de qualidade que não existem nos supermercados",
    ],
    firstFeel: ["encantada e curiosa, como quem entra num sítio com alma que não esperava encontrar", "acolhida e bem-vinda, como num espaço que tem prazer em partilhar o que tem", "surpreendida pela qualidade e pela história que cada produto conta"],
    regularFeel: ["fiel e comunidade — sente que pertence a algo local e genuíno", "confiante nas escolhas — sabe que o que compra tem qualidade e origem garantida", "parte de uma teia de pessoas e produtores que se apoiam mutuamente"],
    relationship: ["de confiança e recomendação — como perguntar a um amigo que percebe do assunto", "próxima e humana — há rostos conhecidos, histórias partilhadas", "de comunidade activa — eventos, encontros, novidades partilhadas"],
    brandPerson: [
      "um comerciante de 40 anos que conhece cada produtor pelo nome e tem orgulho no que vende",
      "uma curadora apaixonada que viaja pelo país a descobrir o melhor que Portugal produz",
      "alguém que cresceu com o cheiro de uma mercearia antiga e quis trazer essa memória para o presente",
    ],
    personalityWords: [
      ["Acolhedora", "Curada", "Autêntica"],
      ["Local", "Calorosa", "Rigorosa"],
      ["Próxima", "Honesta", "Generosa"],
    ],
    neverWords: [
      ["Fria", "Industrial", "Genérica"],
      ["Impessoal", "Apressada", "Descuidada"],
      ["Artificial", "Distante", "Sem Alma"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Divertida", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Acessível", familyInstitutional: "Familiar" },
    friendDesc: [
      "é aquela loja onde entras para comprar uma coisa e sais uma hora depois com a história de cada produto que escolheste",
      "o melhor sítio para comprar prendas com significado ou simplesmente para comer bem em casa",
      "tudo o que vendem tem qualidade real e uma história — não é marketing, é mesmo assim",
    ],
    attractColors: [["#3B2314", "#D4A84B", "#F5ECD7"], ["#2C4A2E", "#A8C66C", "#F9F5EC"], ["#F5F0EB", "#2D2D2D", "#C9A96E"]],
    avoidColors: [["vermelho e amarelo de supermercado", "associados a promoção e desconto — o oposto da curadoria e qualidade"], ["tons néon", "sem ligação ao produto local e artesanal"]],
    visualStyle: ["Orgânico", "Vintage", "Elegante"],
    admiredBrands: [
      [["A Vida Portuguesa", "identidade que celebra o produto português com sofisticação e amor"], ["Corvo", "curadoria e identidade coerente num espaço de comércio independente"], ["Arcádia", "herança e elegância num produto genuinamente português"]],
      [["Mercearia do Bairro", "proximidade e qualidade comunicadas com coerência"], ["Tasca do Chico", "autenticidade que se sente em tudo — do espaço ao produto"], ["Cork & Co.", "produto português com design e identidade internacionais"]],
    ],
    dislikedBrands: [
      [["hipermercados genéricos", "volume sem curadoria, identidade sem alma"], ["lojas de souvenirs turísticos", "produto português sem qualidade nem respeito pela origem"]],
    ],
    visualEnergy: ["fotografia de produto com texturas naturais — madeira, pedra, linho, barro", "espaço de loja com luz natural e produtos expostos com cuidado e respiração", "tipografia com personalidade — não perfeita, mas com carácter e memória"],
    includeSymbol: ["elemento da região ou do produto principal", "forma simples com referência ao território — mapa, planta, flor local", "letra inicial estilizada com carácter artesanal"],
    avoidSymbol: ["cesto de compras estilizado — demasiado genérico no retalho", "espiga de trigo genérica — clichê da alimentação", "casa e sol — excesso de regional sem identidade"],
    usedWhere: ["espaço físico", "embalagens e sacos", "redes sociais", "website"],
    deadline: ["2 meses", "6 semanas", "3 meses"],
    addons: ["Sacola de Papel", "Sticker", "Label Tag", "Cartão de Agradecimento", "Cartão de Fidelidade", "Embalagem", "Social Media", "Cartão de Visita", "Flyer", "Papel de Embrulho"],
    competitors: ["A Vida Portuguesa", "Mercearia Portuguesa", "Cork & Co."],
    slogans: ["Comprar bem é escolher bem.", "Do produtor para si.", "Com origem e com história.", "Portugal em cada produto."],
  },
  services: {
    names: ["Fio Condutor", "Núcleo Consulting", "Eixo Estratégico", "Plataforma Humana", "Base Criativa", "Studio Propósito", "Horizonte Consultores", "Âncora Estratégia"],
    locations: ["Lisboa", "Porto", "Braga", "Coimbra", "Cascais", "Aveiro"],
    whatDo: [
      "consultora de comunicação e estratégia de marca para PMEs e startups portuguesas",
      "agência criativa especializada em estratégia digital e conteúdo para marcas com propósito",
      "consultora de recursos humanos e cultura organizacional para empresas em crescimento",
      "estúdio de estratégia e inovação que ajuda empresas tradicionais a transformarem-se digitalmente",
    ],
    origin: [
      "depois de anos em grandes agências, decidiu criar uma consultora onde a qualidade e o resultado viessem antes da escala",
      "percebeu que as PMEs portuguesas precisavam de consultoria de nível internacional mas com foco e preço adequados",
      "frustrada com abordagens de consultoria que entregavam relatórios e não resultados, criou um modelo diferente",
      "especialista com 15 anos de experiência que decidiu trabalhar de forma mais próxima e impactante com menos clientes",
    ],
    mission: [
      "ajudar empresas portuguesas a comunicar melhor o que fazem — com clareza, coerência e impacto real",
      "criar estratégias que as empresas conseguem implementar — não apenas relatórios bonitos que ficam na gaveta",
      "ser o parceiro estratégico que as PMEs portuguesas precisam mas raramente têm acesso",
      "transformar a forma como as organizações comunicam internamente e externamente com resultados mensuráveis",
    ],
    values: [
      ["Clareza", "Impacto Real", "Parceria"],
      ["Honestidade", "Rigor", "Resultados"],
      ["Proximidade", "Transformação", "Compromisso"],
      ["Confiança", "Experiência", "Humanidade"],
    ],
    unique: [
      "não vendemos horas — vendemos resultados. O cliente sabe desde o início o que vai receber",
      "equipa sénior em todos os projectos — sem delegar para juniores logo a seguir à proposta",
      "método próprio desenvolvido com base em 15 anos de trabalho com empresas portuguesas de todos os sectores",
      "acompanhamento pós-projecto — não desaparecemos quando o trabalho está entregue",
    ],
    threeWords: [
      ["Clara", "Rigorosa", "Eficaz"],
      ["Estratégica", "Humana", "Comprometida"],
      ["Directa", "Experiente", "Transformadora"],
      ["Parceira", "Honesta", "Resultados"],
    ],
    idealClient: [
      "PMEs portuguesas com 10–100 colaboradores que cresceram e percebem que precisam de estratégia e comunicação profissional",
      "startups em fase de crescimento que precisam de clareza de posicionamento para atrair investimento ou clientes",
      "gestores e fundadores que percebem o valor da comunicação mas não têm recursos para uma equipa interna dedicada",
    ],
    firstFeel: ["aliviada e confiante, como quem percebe que finalmente encontrou alguém que percebe o seu problema", "impressionada pela clareza com que diagnosticam a situação sem precisar de muito contexto", "esperançosa — percebe que há um caminho e que tem quem a ajude a percorrê-lo"],
    regularFeel: ["empoderada e mais confiante nas suas decisões estratégicas", "apoiada e segura — tem um parceiro que está do seu lado quando as decisões são difíceis", "orgulhosa dos resultados — e capaz de os comunicar com clareza"],
    relationship: ["de parceria estratégica de longo prazo — não de fornecedor e cliente", "directa e sem rodeios — dizemos o que pensamos mesmo que não seja o que o cliente quer ouvir", "baseada em resultados e transparência — sem relatórios bonitos que não mudam nada"],
    brandPerson: [
      "um consultor de 42 anos, directo, experiente e sem paciência para estratégia vaga — quer resultados e entrega-os",
      "uma estratega que passou por todas as funções de uma empresa e por isso percebe o negócio de dentro para fora",
      "alguém que leu muito, trabalhou mais ainda, e agora usa tudo isso para ajudar quem está a construir algo",
    ],
    personalityWords: [
      ["Clara", "Directa", "Rigorosa"],
      ["Experiente", "Estratégica", "Comprometida"],
      ["Humana", "Eficaz", "Honesta"],
    ],
    neverWords: [
      ["Vaga", "Teórica", "Burocrática"],
      ["Arrogante", "Impessoal", "Distante"],
      ["Lenta", "Evasiva", "Genérica"],
    ],
    spectrum: { simpleComplex: "Simples", seriousFun: "Séria", classicModern: "Moderna", quietBold: "Discreta", accessibleExclusive: "Exclusiva", familyInstitutional: "Institucional" },
    friendDesc: [
      "falam a direito, percebem o teu negócio rapidamente e entregam o que prometem — raro numa consultora",
      "trabalhei com eles e foi a primeira vez que senti que o consultor estava mesmo do meu lado",
      "estratégia que se consegue implementar — não são académicos, são práticos com base sólida",
    ],
    attractColors: [["#0D1F2D", "#D4C5A0", "#FEFCF8"], ["#1C1C2E", "#C4A882", "#F5F5F5"], ["#2C2C2C", "#E8C547", "#FAFAFA"]],
    avoidColors: [["azul corporativo genérico", "demasiado associado a consultoras sem personalidade"], ["vermelho intenso", "demasiado agressivo para uma marca que comunica parceria e confiança"]],
    visualStyle: ["Minimalista", "Elegante", "Geométrico"],
    admiredBrands: [
      [["McKinsey", "autoridade e clareza de posicionamento num sector competitivo"], ["Ideo", "criatividade e método numa identidade coerente e reconhecível"], ["Stripe", "clareza técnica com elegância — complexo por dentro, simples por fora"]],
      [["Farfetch", "empresa portuguesa com identidade e presença internacionais"], ["Feedzai", "tech portuguesa com identidade forte e reconhecível"], ["OutSystems", "scale-up nacional com comunicação de nível global"]],
    ],
    dislikedBrands: [
      [["consultoras genéricas de grande escala", "identidade intercambiável — podiam ser qualquer uma"], ["agências de comunicação sem estratégia", "muito criativo, pouco eficaz — falta o rigor"]],
    ],
    visualEnergy: ["tipografia forte e clara como elemento principal — a palavra como design", "espaço em branco generoso com hierarquia de informação precisa", "fotografia de pessoas a trabalhar e a pensar — processo visível"],
    includeSymbol: ["seta, vector ou linha de trajectória — direcção e clareza", "forma geométrica precisa — rigor e método", "inicial ou monograma com traço forte"],
    avoidSymbol: ["aperto de mão — clichê em consultoria", "globo ou mapa mundial — demasiado genérico", "peças de puzzle — usado em excesso sem significado"],
    usedWhere: ["website", "papelaria profissional", "apresentações a clientes", "redes sociais"],
    deadline: ["2 meses", "6 semanas", "3 meses"],
    addons: ["Cartão de Visita", "Papel Timbrado", "Envelope", "Pasta de Apresentação", "Assinatura de Email", "Apresentação PowerPoint", "Brochura", "Social Media"],
    competitors: ["Accenture Portugal", "Deloitte", "PWC Portugal"],
    slogans: ["Estratégia que se vê em resultados.", "Clareza como vantagem competitiva.", "Parceiros de crescimento.", "Do diagnóstico à mudança real."],
  },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickN = (arr, n) => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

// ── GENERATE ──────────────────────────────────────────────────────────────────

function generateBriefing(forcedSectorId = null) {
  const packageKeys = ["egg", "duckling", "duck"];
  const pkg = PACKAGES[pick(packageKeys)];
  const pkgKey = packageKeys.find(k => PACKAGES[k] === pkg);
  const sectorMeta = forcedSectorId ? SECTORS.find(s => s.id === forcedSectorId) || pick(SECTORS) : pick(SECTORS);
  const s = SECTOR_DATA[sectorMeta.id];

  const name = pick(s.names);
  const location = pick(s.locations);
  const hasName = Math.random() > 0.3;
  const hasSlogan = pkgKey === "duck" ? Math.random() > 0.4 : Math.random() > 0.7;
  const slogan = pick(s.slogans);
  const hasVisualIdentity = Math.random() > 0.6;
  const visualStyle = pick(s.visualStyle);
  const admiredBrands = pick(s.admiredBrands);
  const dislikedBrands = pick(s.dislikedBrands);
  const attractColors = pick(s.attractColors);
  const avoidColors = pick(s.avoidColors);
  const threeWords = pick(s.threeWords);
  const values = pick(s.values);
  const personalityWords = pick(s.personalityWords);
  const neverWords = pick(s.neverWords);

  // Add-ons based on package
  const addons = pkgKey === "egg" ? [] : pickN(s.addons, pkg.addons);

  // Physical materials = add-ons that are physical
  const physicalAddons = addons.filter(a =>
    !["Social Media", "Apresentação PowerPoint", "Assinatura de Email", "Fundo de Videochamada"].includes(a)
  );

  const usedWhere = pickN(s.usedWhere, Math.min(s.usedWhere.length, 3));

  return {
    // Meta
    briefingId: `BRF-${Math.floor(Math.random() * 9000) + 1000}`,
    date: new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }),
    pkg, pkgKey,
    sectorLabel: sectorMeta.label,
    location,
    // S02 - Negócio
    name: hasName ? name : null,
    whatDo: pick(s.whatDo),
    origin: pick(s.origin),
    mission: pick(s.mission),
    values,
    unique: pick(s.unique),
    threeWords,
    // S03 - Público
    idealClient: pick(s.idealClient),
    firstFeel: pick(s.firstFeel),
    regularFeel: pick(s.regularFeel),
    relationship: pick(s.relationship),
    // S04 - Alma da marca
    brandPerson: pick(s.brandPerson),
    personalityWords,
    neverWords,
    spectrum: s.spectrum,
    friendDesc: pick(s.friendDesc),
    // S05 - Universo visual
    hasVisualIdentity,
    whatWorksChanges: hasVisualIdentity ? "O logótipo actual funciona em papel mas perde-se em digital — queremos algo mais versátil e contemporâneo." : null,
    attractColors,
    avoidColors,
    visualStyle,
    admiredBrands,
    dislikedBrands,
    visualEnergy: pick(s.visualEnergy),
    includeSymbol: pick(s.includeSymbol),
    avoidSymbol: pick(s.avoidSymbol),
    // S06 - Projecto
    hasSlogan,
    slogan: hasSlogan ? slogan : null,
    wantSlogan: !hasSlogan && pkgKey === "duck",
    usedWhere,
    physicalMaterials: physicalAddons,
    addons,
    deadline: pick(s.deadline),
    competitors: s.competitors,
    extra: "Precisamos que a identidade funcione bem tanto em digital como em impresso, e que seja versátil para uso em diferentes formatos e tamanhos.",
  };
}

// ── STORAGE ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = "briefing_history_v2";
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveHistory(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function BriefingGenerator() {
  const [briefing, setBriefing] = useState(null);
  const [status, setStatus] = useState("pending");
  const [isGenerating, setIsGenerating] = useState(false);
  const [dots, setDots] = useState(0);
  const [history, setHistory] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("random");
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);

  useEffect(() => { setHistory(loadHistory()); }, []);
  useEffect(() => {
    if (!isGenerating) return;
    const t = setInterval(() => setDots(d => (d + 1) % 4), 350);
    return () => clearInterval(t);
  }, [isGenerating]);

  function handleGenerate() {
    setIsGenerating(true);
    setBriefing(null);
    setStatus("pending");
    setTimeout(() => {
      const b = generateBriefing(sectorFilter === "random" ? null : sectorFilter);
      setBriefing(b);
      setIsGenerating(false);
      const entry = { ...b, status: "pending", savedAt: new Date().toISOString() };
      const updated = [entry, ...loadHistory()].slice(0, 50);
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
      (h.name || "sem nome").toLowerCase().includes(q) ||
      h.briefingId.toLowerCase().includes(q) ||
      h.sectorLabel.toLowerCase().includes(q) ||
      (h.status || "pending").toLowerCase().includes(q) ||
      (h.pkg?.name || "").toLowerCase().includes(q)
    );
  });

  function handleExportPDF() {
    if (!briefing) return;
    const pkg = briefing.pkg;
    const STATUS_LABEL = { pending: "Por iniciar", active: "Em curso", done: "Concluído" };
    const statusColor = { pending: "#5A5A5A", active: "#F0A030", done: "#52B788" }[status];

    const row = (label, value) => value ? `
      <div class="row">
        <div class="row-label">${label}</div>
        <div class="row-value">${value}</div>
      </div>` : "";

    const section = (title, content) => `
      <div class="section">
        <div class="section-label">${title}</div>
        ${content}
      </div>`;

    const swatches = briefing.attractColors.map(c =>
      `<div class="swatch-wrap"><div class="swatch" style="background:${c}"></div><div class="sl">${c}</div></div>`
    ).join("");

    const admiredRows = briefing.admiredBrands.map(([b, r]) =>
      `<div class="brand-row"><strong>${b}</strong> — ${r}</div>`
    ).join("");

    const dislikedRows = briefing.dislikedBrands.map(([b, r]) =>
      `<div class="brand-row"><strong>${b}</strong> — ${r}</div>`
    ).join("");

    const spectrumRows = Object.entries({
      "Simples / Complexa": [briefing.spectrum.simpleComplex, ["Simples","Complexa"]],
      "Séria / Divertida": [briefing.spectrum.seriousFun, ["Séria","Divertida"]],
      "Clássica / Moderna": [briefing.spectrum.classicModern, ["Clássica","Moderna"]],
      "Discreta / Arrojada": [briefing.spectrum.quietBold, ["Discreta","Arrojada"]],
      "Acessível / Exclusiva": [briefing.spectrum.accessibleExclusive, ["Acessível","Exclusiva"]],
      "Familiar / Institucional": [briefing.spectrum.familyInstitutional, ["Familiar","Institucional"]],
    }).map(([label, [val]]) =>
      `<div class="spec-row"><span class="spec-label">${label}</span><span class="spec-val">→ ${val}</span></div>`
    ).join("");

    const pkgDeliverables = [
      ...pkg.strategy.map(i => `<li>📋 ${i}</li>`),
      ...pkg.design.map(i => `<li>✏️ ${i}</li>`),
      ...pkg.delivery.map(i => `<li>📦 ${i}</li>`),
    ].join("");

    const html = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8"/>
<title>Briefing ${briefing.briefingId}${briefing.name ? " — " + briefing.name : ""}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#080D08;color:#FEFCF8;font-family:'Montserrat',sans-serif;font-size:10.5px}
  .page{max-width:820px;margin:0 auto;padding:40px 48px}
  .header{border-bottom:1px solid #1E1E1E;padding-bottom:24px;margin-bottom:32px;display:flex;justify-content:space-between;align-items:flex-start;gap:20px}
  .company-name{font-family:'Montserrat',sans-serif;font-weight:700;font-size:38px;font-weight:900;color:#FEFCF8;letter-spacing:-0.03em;line-height:1;margin-bottom:6px}
  .sector-tag{font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#3A3A3A;margin-bottom:8px}
  .meta{text-align:right;font-size:8.5px;color:#3A3A3A;letter-spacing:0.08em;line-height:2.2;flex-shrink:0}
  .pkg-badge{display:inline-block;border:1px solid #D4C5A0;color:#D4C5A0;font-size:9px;padding:4px 10px;letter-spacing:0.15em;margin-top:8px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
  .section{margin-bottom:22px}
  .section-label{font-size:7.5px;letter-spacing:0.25em;text-transform:uppercase;color:#F1B82F;border-bottom:1px solid #F1B82F;padding-bottom:5px;margin-bottom:12px}
  p, .val{font-size:10.5px;line-height:1.85;color:#C0BAB0}
  strong{color:#FEFCF8}
  .tag{display:inline-block;background:#1A1200;border:1px solid #3A3000;color:#F1B82F;font-size:8px;padding:2px 7px;margin:2px}
  .row{display:flex;gap:12px;padding:6px 0;border-bottom:1px solid #161616;align-items:flex-start}
  .row-label{font-size:8px;color:#4A4A4A;text-transform:uppercase;letter-spacing:0.1em;min-width:120px;flex-shrink:0;padding-top:2px}
  .row-value{color:#C0BAB0;font-size:10.5px;line-height:1.7}
  .swatches{display:flex;gap:10px;margin-bottom:10px}
  .swatch-wrap{text-align:center}
  .swatch{width:36px;height:36px;border-radius:4px;margin-bottom:6px}
  .sl{font-size:10px;color:#FEFCF8;font-weight:600;letter-spacing:0.03em}
  .brand-row{font-size:10px;color:#C0BAB0;margin-bottom:6px;padding-left:8px;border-left:2px solid #D4C5A0}
  .spec-row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #161616;font-size:9.5px}
  .spec-label{color:#5A5A5A}
  .spec-val{color:#D4C5A0;font-weight:700}
  .pkg-box{border:1px solid #2A2A2A;padding:16px;background:#0E0E0E;margin-bottom:20px}
  .pkg-title{font-family:'Montserrat',sans-serif;font-weight:700;font-size:18px;font-weight:700;color:#D4C5A0;margin-bottom:4px}
  .pkg-price{font-size:11px;color:#5A5A5A;margin-bottom:12px}
  .pkg-box ul{list-style:none;padding:0}
  .pkg-box li{font-size:10px;color:#C0BAB0;padding:3px 0;border-bottom:1px solid #141414}
  .addons{margin-top:8px}
  .chip{display:inline-block;border:1px solid #2A2A2A;padding:3px 8px;font-size:8.5px;color:#9A9A8A;margin:2px}
  .status-bar{display:inline-flex;align-items:center;gap:7px;border:1px solid;padding:8px 14px;margin-top:16px;font-size:9px;letter-spacing:0.12em;text-transform:uppercase}
  .status-dot{width:7px;height:7px;border-radius:50%}
  .divider{border:none;border-top:1px solid #1E1E1E;margin:24px 0}
  .full{grid-column:1/-1}
  .footer{margin-top:28px;padding-top:12px;border-top:1px solid #141414;display:flex;justify-content:space-between;font-size:7.5px;color:#2A2A2A}
  @media print{
    body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .page{padding:24px 32px}
  }
</style>
</head>
<body>
<div class="page">

<div class="header">
  <div>
    <div class="sector-tag">Briefing de Branding & Logo Design · ${briefing.sectorLabel}</div>
    <div class="company-name">${briefing.name || "Nome a definir"}</div>
    <div style="font-size:10px;color:#9A9A8A;margin-top:4px">${briefing.location}</div>
    <div class="pkg-badge">${briefing.pkg.emoji} ${briefing.pkg.name} — ${briefing.pkg.price}</div>
  </div>
  <div class="meta">
    <div>${briefing.briefingId}</div>
    <div>${briefing.date}</div>
  </div>
</div>

<div class="pkg-box">
  <div class="pkg-title">${briefing.pkg.emoji} ${briefing.pkg.name}</div>
  <div class="pkg-price">${briefing.pkg.price} · ${briefing.sectorLabel}</div>
  <ul>${pkgDeliverables}</ul>
  ${briefing.addons.length > 0 ? `<div class="addons"><span style="font-size:8px;color:#4A4A4A;margin-right:6px">ADD-ONS:</span>${briefing.addons.map(a => `<span class="chip">${a}</span>`).join("")}</div>` : ""}
</div>

<div class="grid">

  <div>
    ${section("02 · O Teu Negócio",
      row("O que faz", briefing.whatDo) +
      row("Como surgiu", briefing.origin) +
      row("Missão", briefing.mission) +
      row("Valores", briefing.values.join(", ")) +
      row("O que torna único", briefing.unique) +
      row("3 palavras", briefing.threeWords.join(", "))
    )}
    ${section("03 · O Teu Público",
      row("Cliente ideal", briefing.idealClient) +
      row("1.ª impressão", briefing.firstFeel) +
      row("Uso regular", briefing.regularFeel) +
      row("Relação", briefing.relationship)
    )}
  </div>

  <div>
    ${section("04 · A Alma da Marca",
      row("Se fosse uma pessoa", briefing.brandPerson) +
      row("Personalidade", briefing.personalityWords.join(", ")) +
      row("Nunca", briefing.neverWords.join(", ")) +
      row("Como descreve a um amigo", briefing.friendDesc)
    )}
    <div class="section">
      <div class="section-label">04 · Espectro da Marca</div>
      ${spectrumRows}
    </div>
    ${section("06 · O Projecto",
      row("Nome definido", briefing.name ? `Sim — ${briefing.name}` : "Não") +
      row("Slogan", briefing.hasSlogan ? `Sim — "${briefing.slogan}"` : briefing.wantSlogan ? "Não — mas quer criar" : "Não") +
      row("Onde usar", briefing.usedWhere.join(", ")) +
      row("Materiais físicos", briefing.physicalMaterials.length > 0 ? briefing.physicalMaterials.join(", ") : "Nenhum (pacote digital)") +
      row("Prazo", briefing.deadline) +
      row("Concorrentes", briefing.competitors.join(", ")) +
      row("Observações", briefing.extra)
    )}
  </div>

  <div class="full">
    <div class="section">
      <div class="section-label">05 · Universo Visual</div>
      <div class="grid" style="gap:20px">
        <div>
          ${row("Identidade actual", briefing.hasVisualIdentity ? `Sim — ${briefing.whatWorksChanges}` : "Não tem identidade visual")}
          <div style="margin:10px 0 4px"><span style="font-size:8px;color:#4A4A4A;letter-spacing:0.1em;text-transform:uppercase">Cores que atraem</span></div>
          <div class="swatches">${swatches}</div>
          ${row("Cores a evitar", `${briefing.avoidColors[0]} — ${briefing.avoidColors[1]}`)}
          ${row("Estilo visual", briefing.visualStyle)}
          ${row("Energia visual", briefing.visualEnergy)}
          ${row("Incluir", briefing.includeSymbol)}
          ${row("Evitar", briefing.avoidSymbol)}
        </div>
        <div>
          <div style="margin-bottom:8px"><span style="font-size:8px;color:#4A4A4A;letter-spacing:0.1em;text-transform:uppercase">Marcas admiradas</span></div>
          ${admiredRows}
          <div style="margin:10px 0 8px"><span style="font-size:8px;color:#4A4A4A;letter-spacing:0.1em;text-transform:uppercase">Marcas que não gosta</span></div>
          ${dislikedRows}
        </div>
      </div>
    </div>
  </div>

</div>

<div class="status-bar" style="color:${statusColor};border-color:${statusColor}">
  <div class="status-dot" style="background:${statusColor}"></div>
  Estado: ${STATUS_LABEL[status]}
</div>

<div class="footer">
  <span>${briefing.briefingId} · ${briefing.name || "Nome a definir"} · Gerador de Briefings White Duck Studio</span>
  <span>Branding & Logo Design</span>
</div>

</div>
<script>window.onload = function(){ window.print(); }</script>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) {
      alert("O browser bloqueou o pop-up. Por favor permite pop-ups e tenta novamente.");
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  const PKG_COLORS = { egg: "#B8860B", duckling: "#C4A820", duck: "#D4C5A0" };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#080D08", minHeight: "100vh", color: "#FEFCF8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .pfont{font-family:'Montserrat',sans-serif;font-weight:700}
        .mfont{font-family:'Montserrat',sans-serif}
        .gen-btn{background:#D4C5A0;color:#080D08;border:none;padding:16px 52px;cursor:pointer;font-family:'Montserrat',sans-serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;transition:all 0.2s}
        .gen-btn:hover{background:#E8DFC8;transform:translateY(-2px)}
        .pdf-btn{background:transparent;color:#D4C5A0;border:1px solid #D4C5A0;padding:14px 32px;cursor:pointer;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;transition:all 0.2s}
        .pdf-btn:hover{background:#1A1810;transform:translateY(-2px)}
        .section-label{font-family:'Montserrat',sans-serif;font-size:8.5px;letter-spacing:0.25em;text-transform:uppercase;color:#F1B82F;border-bottom:1px solid #F1B82F;padding-bottom:5px;margin-bottom:14px;font-weight:800}
        .row-wrap{padding:7px 0;border-bottom:1px solid #161616;display:flex;gap:12px}
        .row-lbl{font-size:8px;color:#FEFCF8;text-transform:uppercase;letter-spacing:0.1em;min-width:130px;flex-shrink:0;padding-top:2px;font-weight:600}
        .row-val{font-size:10.5px;color:#C0BAB0;line-height:1.75}
        .tag{display:inline-block;background:#1A1200;border:1px solid #3A3000;color:#F1B82F;font-size:8.5px;padding:2px 8px;letter-spacing:0.08em;margin:2px}
        .chip{display:inline-block;border:1px solid #2A2A2A;padding:3px 9px;font-size:8.5px;color:#9A9A8A;margin:2px;font-family:'Montserrat',sans-serif}
        .spec-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #141414;font-size:9.5px}
        .spec-lbl{color:#FEFCF8;font-weight:600}
        .spec-val{color:#D4C5A0;font-weight:700;letter-spacing:0.05em}
        .brand-item{font-size:10px;color:#C0BAB0;padding:5px 0 5px 10px;border-left:2px solid #D4C5A0;margin-bottom:6px;line-height:1.6}
        .pkg-banner{border:1px solid #2A2A2A;padding:16px 20px;background:#0E0E0E;margin-bottom:28px}
        .pkg-deliverable{font-size:10px;color:#C0BAB0;padding:4px 0;border-bottom:1px solid #141414}
        .status-bar{display:flex;align-items:center;gap:8px;padding:11px 16px;border:1px solid #2A2A2A;cursor:pointer;font-family:'Montserrat',sans-serif;font-size:9.5px;letter-spacing:0.12em;text-transform:uppercase;transition:all 0.25s;user-select:none;width:fit-content;margin-top:20px}
        .status-bar.pending{color:#5A5A5A;border-color:#2A2A2A}
        .status-bar.pending:hover{color:#D4C5A0;border-color:#D4C5A0}
        .status-bar.active{color:#F0A030;border-color:#F0A030;background:#1A1408}
        .status-bar.done{color:#52B788;border-color:#52B788;background:#0A1A10}
        .status-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
        .status-dot.pending{background:#3A3A3A}
        .status-dot.active{background:#F0A030;box-shadow:0 0 6px #F0A03088}
        .status-dot.done{background:#52B788;box-shadow:0 0 6px #52B78888}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .fade-in{animation:fadeIn 0.5s ease forwards}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .spinning{animation:spin 1.8s linear infinite;display:inline-block}
        .search-btn{background:transparent;border:1px solid #2A2A2A;color:#5A5A5A;padding:8px 16px;cursor:pointer;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;transition:all 0.2s;display:flex;align-items:center;gap:6px}
        .search-btn:hover{border-color:#D4C5A0;color:#D4C5A0}
        .search-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:100;display:flex;align-items:flex-start;justify-content:center;padding-top:80px}
        .search-panel{background:#0E0E0E;border:1px solid #2A2A2A;width:100%;max-width:660px;max-height:70vh;display:flex;flex-direction:column;animation:fadeIn 0.2s ease}
        .search-input{background:transparent;border:none;border-bottom:1px solid #2A2A2A;color:#FEFCF8;font-family:'Montserrat',sans-serif;font-size:13px;padding:18px 20px;outline:none;width:100%;letter-spacing:0.05em}
        .search-input::placeholder{color:#2A2A2A}
        .history-list{overflow-y:auto;flex:1}
        .history-item{padding:12px 20px;border-bottom:1px solid #141414;cursor:pointer;transition:background 0.15s;display:flex;justify-content:space-between;align-items:center}
        .history-item:hover{background:#111}
        .del-btn{background:transparent;border:none;color:#2A2A2A;cursor:pointer;font-size:14px;padding:2px 6px;transition:color 0.15s;flex-shrink:0}
        .del-btn:hover{color:#C04040}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#080D08}
        ::-webkit-scrollbar-thumb{background:#2A2A2A}
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #1E1E1E", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#FEFCF8", textTransform: "uppercase", marginBottom: 4, fontWeight: 500 }}>FERRAMENTA CRIATIVA · V3.0</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F1B82F", letterSpacing: "-0.01em", lineHeight: 1 }}>Gerador de Briefings</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {history.length > 0 && (
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: "transparent", border: "1px solid #F1B82F", color: "#F1B82F", padding: "10px 22px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, borderRadius: 4 }}
            >
              PESQUISA <span style={{ background: "#F1B82F", color: "#080D08", borderRadius: 2, padding: "0 6px", fontWeight: 800 }}>{history.length}</span>
            </button>
          )}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 400, fontStyle: "italic", color: "#FEFCF8", letterSpacing: "0.03em", lineHeight: 1.4 }}>NO QUACKS GIVEN.</div>
            <div style={{ fontSize: 11, fontWeight: 400, fontStyle: "italic", color: "#FEFCF8", letterSpacing: "0.03em" }}>JUST GREAT DESIGN.</div>
          </div>
          <img src="/logomarca.png" alt="White Duck Studio" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div onClick={() => setSearchOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 70 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#161616", border: "1px solid #2A2A2A", width: "100%", maxWidth: 760, maxHeight: "72vh", display: "flex", flexDirection: "column", borderRadius: 4, animation: "fadeIn 0.18s ease" }}>
            <input
              autoFocus
              placeholder="Pesquisa por nome, ID, sector, estado..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ background: "transparent", border: "none", borderBottom: "1px solid #2A2A2A", color: "#FEFCF8", fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 400, padding: "20px 24px", outline: "none", width: "100%" }}
            />
            <div style={{ overflowY: "auto", flex: 1 }}>
              {filteredHistory.length === 0 && (
                <div style={{ padding: "28px 24px", fontSize: 11, color: "#3A3A3A", textAlign: "center", fontFamily: "'Montserrat', sans-serif" }}>Nenhum resultado.</div>
              )}
              {filteredHistory.map(h => {
                const sc = { pending: "#5A5A5A", active: "#F1B82F", done: "#52B788" }[h.status || "pending"];
                const sl = { pending: "Por iniciar", active: "Em curso", done: "Concluído" }[h.status || "pending"];
                return (
                  <div key={h.briefingId} onClick={() => handleLoadFromHistory(h)} style={{ padding: "14px 24px", borderBottom: "1px solid #1A1A1A", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.12s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1E1E1E"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: sc, flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: "#FEFCF8", fontWeight: 700, marginBottom: 3, fontFamily: "'Montserrat', sans-serif" }}>
                          {h.name || "Nome a definir"}
                          <span style={{ color: "#3A3A3A", fontWeight: 400, marginLeft: 10, fontSize: 10 }}>{h.briefingId}</span>
                        </div>
                        <div style={{ fontSize: 10, color: "#F1B82F", fontFamily: "'Montserrat', sans-serif", display: "flex", gap: 10 }}>
                          <span style={{ fontStyle: "italic", color: "#5A5A5A" }}>{h.sectorLabel}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 10, color: sc, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{sl}</span>
                      <button onClick={e => handleDeleteFromHistory(h.briefingId, e)} style={{ background: "transparent", border: "none", color: "#3A3A3A", cursor: "pointer", fontSize: 16, padding: "2px 6px", transition: "color 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#C04040"}
                        onMouseLeave={e => e.currentTarget.style.color = "#3A3A3A"}
                      >✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "10px 24px", borderTop: "1px solid #1A1A1A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9, color: "#3A3A3A", fontFamily: "'Montserrat', sans-serif" }}>{filteredHistory.length} de {history.length} briefings</span>
              <button onClick={() => setSearchOpen(false)} style={{ background: "transparent", border: "1px solid #2A2A2A", color: "#5A5A5A", padding: "6px 14px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>Fechar ✕</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 32px" }}>

        {/* EMPTY STATE */}
        {!briefing && !isGenerating && (
          <div className="fade-in" style={{ textAlign: "center", padding: "120px 0 80px" }}>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#FEFCF8", marginBottom: 16, letterSpacing: "-0.02em" }}>Pronto para o desafio?</h2>
            <p style={{ fontSize: 14, color: "#FEFCF8", lineHeight: 1.9, maxWidth: 400, margin: "0 auto 48px", fontWeight: 400 }}>
              Um clique. Um briefing completo.<br />
              Empresa, setor, público, cores,<br />entregáveis - tudo sorteado
            </p>

            {/* Sector dropdown */}
            <div style={{ position: "relative", maxWidth: 440, margin: "0 auto 20px" }}>
              <button
                onClick={() => setSectorDropdownOpen(o => !o)}
                style={{ width: "100%", background: "transparent", border: "2px solid #3A3A3A", color: "#FEFCF8", padding: "16px 20px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 6 }}
              >
                <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "#5A5A5A", textTransform: "uppercase" }}>SETOR</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                    {sectorFilter === "random" ? "ALEATÓRIO" : SECTORS.find(s => s.id === sectorFilter)?.label.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 14, color: "#5A5A5A" }}>⌄</span>
                </span>
              </button>
              {sectorDropdownOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#161616", border: "1px solid #2A2A2A", borderRadius: 4, zIndex: 50, overflow: "hidden" }}>
                  {[{ id: "random", label: "Aleatório" }, ...SECTORS].map(s => (
                    <div
                      key={s.id}
                      onClick={() => { setSectorFilter(s.id); setSectorDropdownOpen(false); }}
                      style={{ padding: "12px 20px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: sectorFilter === s.id ? 700 : 400, color: sectorFilter === s.id ? "#F1B82F" : "#C0BAB0", borderBottom: "1px solid #1A1A1A", transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#1E1E1E"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              style={{ background: "#F1B82F", color: "#080D08", border: "none", padding: "18px 64px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 12, transition: "all 0.2s", maxWidth: 440, width: "100%" , justifyContent: "center" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F8CC52"}
              onMouseLeave={e => e.currentTarget.style.background = "#F1B82F"}
            >
              <span style={{ fontSize: 20 }}>🔥</span>
              GERAR BRIEFING
            </button>
          </div>
        )}

        {/* LOADING */}
        {isGenerating && (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <img src="/logomarca.png" alt="duck" style={{ width: 52, height: 52, borderRadius: "50%", marginBottom: 24, animation: "spin 1.8s linear infinite", display: "inline-block" }} />
            <div style={{ fontSize: 12, color: "#5A5A5A", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}>A GERAR{".".repeat(dots)}</div>
          </div>
        )}

        {/* BRIEFING */}
        {briefing && !isGenerating && (() => {
          const pkg = briefing.pkg;
          const pc = PKG_COLORS[briefing.pkgKey];

          const Row = ({ label, children }) => children ? (
            <div className="row-wrap">
              <div className="row-lbl">{label}</div>
              <div className="row-val">{children}</div>
            </div>
          ) : null;

          const Section = ({ title, children }) => (
            <div style={{ marginBottom: 24 }}>
              <div className="section-label">{title}</div>
              {children}
            </div>
          );

          return (
            <div className="fade-in">
              {/* DOC HEADER */}
              <div style={{ borderBottom: "1px solid #1E1E1E", paddingBottom: 22, marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div className="mfont" style={{ fontSize: 8, letterSpacing: "0.2em", color: "#3A3A3A", textTransform: "uppercase", marginBottom: 6 }}>Briefing de Branding & Logo Design · {briefing.sectorLabel}</div>
                  <h2 className="pfont" style={{ fontSize: 36, fontWeight: 900, color: "#FEFCF8", letterSpacing: "-0.02em", lineHeight: 1 }}>{briefing.name || "Nome a definir"}</h2>
                  <div className="mfont" style={{ fontSize: 10, color: "#5A5A5A", marginTop: 6 }}>{briefing.location}</div>
                  <div style={{ display: "inline-block", border: `1px solid ${pc}`, color: pc, fontSize: 9, padding: "4px 12px", letterSpacing: "0.15em", fontFamily: "'Montserrat', sans-serif", marginTop: 10 }}>
                    {pkg.emoji} {pkg.name} · {pkg.price}
                  </div>
                </div>
                <div className="mfont" style={{ fontSize: 8.5, color: "#3A3A3A", textAlign: "right", lineHeight: 2.2 }}>
                  <div>{briefing.briefingId}</div>
                  <div>{briefing.date}</div>
                </div>
              </div>

              {/* PACKAGE BANNER */}
              <div className="pkg-banner">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                  <div>
                    <div className="section-label">Estratégia</div>
                    {pkg.strategy.map((i, k) => <div key={k} className="pkg-deliverable">📋 {i}</div>)}
                  </div>
                  <div>
                    <div className="section-label">Design</div>
                    {pkg.design.map((i, k) => <div key={k} className="pkg-deliverable">✏️ {i}</div>)}
                  </div>
                  <div>
                    <div className="section-label">Entrega</div>
                    {pkg.delivery.map((i, k) => <div key={k} className="pkg-deliverable">📦 {i}</div>)}
                  </div>
                </div>
                {briefing.addons.length > 0 && (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #1A1A1A" }}>
                    <span className="mfont" style={{ fontSize: 8, color: "#4A4A4A", marginRight: 8, letterSpacing: "0.12em" }}>ADD-ONS ({briefing.addons.length}):</span>
                    {briefing.addons.map((a, i) => <span key={i} className="chip">{a}</span>)}
                  </div>
                )}
              </div>

              {/* MAIN GRID */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>

                {/* LEFT */}
                <div>
                  <Section title="02 · O Teu Negócio">
                    <Row label="O que faz">{briefing.whatDo}</Row>
                    <Row label="Como surgiu">{briefing.origin}</Row>
                    <Row label="Missão">{briefing.mission}</Row>
                    <Row label="Valores">{briefing.values.map((v, i) => <span key={i} className="tag">{v}</span>)}</Row>
                    <Row label="O que torna único">{briefing.unique}</Row>
                    <Row label="3 palavras">{briefing.threeWords.map((w, i) => <span key={i} className="tag">{w}</span>)}</Row>
                  </Section>

                  <Section title="03 · O Teu Público">
                    <Row label="Cliente ideal">{briefing.idealClient}</Row>
                    <Row label="1.ª impressão">{briefing.firstFeel}</Row>
                    <Row label="Uso regular">{briefing.regularFeel}</Row>
                    <Row label="Relação">{briefing.relationship}</Row>
                  </Section>

                  <Section title="05 · Universo Visual — Cor & Estilo">
                    <Row label="Identidade actual">{briefing.hasVisualIdentity ? `Sim — ${briefing.whatWorksChanges}` : "Não tem identidade visual"}</Row>
                    <div className="row-wrap">
                      <div className="row-lbl">Cores que atraem</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {briefing.attractColors.map((c, i) => (
                          <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ width: 36, height: 36, borderRadius: 4, background: c, marginBottom: 6 }} />
                            <div className="mfont" style={{ fontSize: 10, color: "#FEFCF8", fontWeight: 600, letterSpacing: "0.03em" }}>{c}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Row label="Cores a evitar">{briefing.avoidColors[0]} — {briefing.avoidColors[1]}</Row>
                    <Row label="Estilo visual"><span className="tag">{briefing.visualStyle}</span></Row>
                    <Row label="Energia visual">{briefing.visualEnergy}</Row>
                    <Row label="Incluir">{briefing.includeSymbol}</Row>
                    <Row label="Evitar">{briefing.avoidSymbol}</Row>
                  </Section>
                </div>

                {/* RIGHT */}
                <div>
                  <Section title="04 · A Alma da Marca">
                    <Row label="Se fosse uma pessoa">{briefing.brandPerson}</Row>
                    <Row label="Personalidade">{briefing.personalityWords.map((w, i) => <span key={i} className="tag">{w}</span>)}</Row>
                    <Row label="Nunca">{briefing.neverWords.map((w, i) => <span key={i} className="tag" style={{ borderColor: "#3A2020", color: "#C06060" }}>{w}</span>)}</Row>
                    <Row label="Descreveria a um amigo">{briefing.friendDesc}</Row>
                  </Section>

                  <Section title="04 · Espectro da Marca">
                    {Object.entries({
                      "Simples / Complexa": briefing.spectrum.simpleComplex,
                      "Séria / Divertida": briefing.spectrum.seriousFun,
                      "Clássica / Moderna": briefing.spectrum.classicModern,
                      "Discreta / Arrojada": briefing.spectrum.quietBold,
                      "Acessível / Exclusiva": briefing.spectrum.accessibleExclusive,
                      "Familiar / Institucional": briefing.spectrum.familyInstitutional,
                    }).map(([label, val]) => (
                      <div key={label} className="spec-row">
                        <span className="spec-lbl">{label}</span>
                        <span className="spec-val">→ {val}</span>
                      </div>
                    ))}
                  </Section>

                  <Section title="05 · Marcas de Referência">
                    <div className="mfont" style={{ fontSize: 8, color: "#FEFCF8", fontWeight: 700, marginBottom: 8 }}>ADMIRA</div>
                    {briefing.admiredBrands.map(([b, r], i) => (
                      <div key={i} className="brand-item"><strong style={{ color: "#FEFCF8" }}>{b}</strong> — {r}</div>
                    ))}
                    <div className="mfont" style={{ fontSize: 8, color: "#FEFCF8", fontWeight: 700, margin: "12px 0 8px" }}>NÃO GOSTA</div>
                    {briefing.dislikedBrands.map(([b, r], i) => (
                      <div key={i} className="brand-item" style={{ borderLeftColor: "#C06060" }}><strong style={{ color: "#FEFCF8" }}>{b}</strong> — {r}</div>
                    ))}
                  </Section>

                  <Section title="06 · O Projecto">
                    <Row label="Nome">{briefing.name ? `Sim — ${briefing.name}` : "Não tem nome definido"}</Row>
                    <Row label="Slogan / Tagline">{briefing.hasSlogan ? `Sim — "${briefing.slogan}"` : briefing.wantSlogan ? "Não — quer criar" : "Não"}</Row>
                    <Row label="Onde usar">{briefing.usedWhere.join(", ")}</Row>
                    <Row label="Materiais físicos">{briefing.physicalMaterials.length > 0 ? briefing.physicalMaterials.join(", ") : "Nenhum"}</Row>
                    <Row label="Prazo">{briefing.deadline}</Row>
                    <Row label="Concorrentes">{briefing.competitors.join(", ")}</Row>
                    <Row label="Observações">{briefing.extra}</Row>
                  </Section>
                </div>
              </div>

              {/* STATUS */}
              <div
                className={`status-bar ${status}`}
                onClick={() => handleStatusChange(status === "pending" ? "active" : status === "active" ? "done" : "pending")}
                title="Clique para alterar o estado"
              >
                <div className={`status-dot ${status}`} />
                {status === "pending" && "Por iniciar"}
                {status === "active" && "Em curso"}
                {status === "done" && "✓ Concluído"}
              </div>

              {/* ACTIONS */}
              <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid #1E1E1E", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={handleGenerate}
                  style={{ background: "#F1B82F", color: "#080D08", border: "none", padding: "16px 40px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F8CC52"}
                  onMouseLeave={e => e.currentTarget.style.background = "#F1B82F"}
                >
                  🔥 Gerar Novo Briefing
                </button>
                <button
                  onClick={handleExportPDF}
                  style={{ background: "transparent", color: "#F1B82F", border: "2px solid #F1B82F", padding: "16px 40px", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 6, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F1B82F"; e.currentTarget.style.color = "#080D08"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F1B82F"; }}
                >
                  ↓ Guardar / Imprimir PDF
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
