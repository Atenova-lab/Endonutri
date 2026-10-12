/* Preguntas educativas vinculadas a los apartados publicados de Endonutri. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EndonutriGamesData = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const foods = [
  {
    "id": "ensalada",
    "name": "Ensalada de hojas, tomate y pepino",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 0
  },
  {
    "id": "pisto",
    "name": "Pisto de verduras",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 1
  },
  {
    "id": "asadas",
    "name": "Verduras asadas",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 2
  },
  {
    "id": "brocoli",
    "name": "Brócoli al vapor",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 3
  },
  {
    "id": "calabacin",
    "name": "Calabacín a la plancha",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 4
  },
  {
    "id": "judias",
    "name": "Judías verdes salteadas",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 5
  },
  {
    "id": "calabaza",
    "name": "Crema de calabaza sin patata",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 6
  },
  {
    "id": "gazpacho",
    "name": "Gazpacho sin pan",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 7
  },
  {
    "id": "pollo",
    "name": "Pechuga de pollo a la plancha",
    "icon": "🍽️",
    "roles": [
      "protein"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 8
  },
  {
    "id": "ternera",
    "name": "Filete de ternera",
    "icon": "🍽️",
    "roles": [
      "protein"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 9
  },
  {
    "id": "merluza",
    "name": "Merluza al horno",
    "icon": "🍽️",
    "roles": [
      "protein"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 10
  },
  {
    "id": "salmon",
    "name": "Salmón a la plancha",
    "icon": "🍽️",
    "roles": [
      "protein"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 11
  },
  {
    "id": "tofu",
    "name": "Tofu dorado",
    "icon": "🍽️",
    "roles": [
      "protein"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 12
  },
  {
    "id": "huevo",
    "name": "Tortilla francesa",
    "icon": "🍽️",
    "roles": [
      "protein"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 13
  },
  {
    "id": "lentejas",
    "name": "Lentejas cocidas",
    "icon": "🍽️",
    "roles": [
      "protein",
      "carbs"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 14,
    "note": "Aportan proteínas, hidratos y fibra; encajan en cualquiera de los dos cuartos."
  },
  {
    "id": "garbanzos",
    "name": "Garbanzos cocidos",
    "icon": "🍽️",
    "roles": [
      "protein",
      "carbs"
    ],
    "atlas": "img/juegos/preparaciones.webp",
    "tile": 15,
    "note": "Aportan proteínas, hidratos y fibra; encajan en cualquiera de los dos cuartos."
  },
  {
    "id": "arroz",
    "name": "Arroz integral",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 0
  },
  {
    "id": "pasta",
    "name": "Espirales de pasta integral",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 1
  },
  {
    "id": "patata",
    "name": "Patata asada",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 2
  },
  {
    "id": "pan",
    "name": "Pan integral",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 3
  },
  {
    "id": "quinoa",
    "name": "Quinoa cocida",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 4
  },
  {
    "id": "cuscus",
    "name": "Cuscús",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 5
  },
  {
    "id": "boniato",
    "name": "Boniato asado",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 6
  },
  {
    "id": "alubias",
    "name": "Alubias blancas",
    "icon": "🍽️",
    "roles": [
      "protein",
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 7,
    "note": "Aportan proteínas, hidratos y fibra; encajan en cualquiera de los dos cuartos."
  },
  {
    "id": "espinacas",
    "name": "Espinacas salteadas",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 8
  },
  {
    "id": "setas",
    "name": "Setas salteadas",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 9
  },
  {
    "id": "zanahoria",
    "name": "Zanahoria al vapor",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 10
  },
  {
    "id": "tomate",
    "name": "Ensalada de tomate y pepino",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 11
  },
  {
    "id": "crema",
    "name": "Crema de calabacín sin patata",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 12
  },
  {
    "id": "salmorejo",
    "name": "Salmorejo con pan y aceite",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 13,
    "note": "Esta receta contiene pan y aceite; no cuenta como una ración de verdura sola."
  },
  {
    "id": "espaguetis",
    "name": "Pasta con tomate y verduras",
    "icon": "🍽️",
    "roles": [
      "carbs"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 14,
    "note": "La base es pasta. La salsa no sustituye la mitad de verduras del plato."
  },
  {
    "id": "col",
    "name": "Ensalada de col y zanahoria",
    "icon": "🍽️",
    "roles": [
      "veg"
    ],
    "atlas": "img/juegos/acompanamientos.webp",
    "tile": 15
  }
];
  const plates = [
  {
    "id": "mediterraneo",
    "title": "Un almuerzo mediterráneo",
    "intro": "Combina preparaciones conocidas y elige la combinación que más te apetezca.",
    "foodIds": [
      "ensalada",
      "pisto",
      "asadas",
      "brocoli",
      "gazpacho",
      "pollo",
      "merluza",
      "salmon",
      "huevo",
      "garbanzos",
      "arroz",
      "pasta",
      "patata",
      "pan",
      "quinoa",
      "espaguetis"
    ]
  },
  {
    "id": "vegetal",
    "title": "Todo vegetal",
    "intro": "Usa tofu o legumbres como fuente de proteína.",
    "foodIds": [
      "pisto",
      "asadas",
      "espinacas",
      "setas",
      "tomate",
      "col",
      "tofu",
      "lentejas",
      "garbanzos",
      "alubias",
      "arroz",
      "quinoa",
      "cuscus",
      "boniato",
      "pasta",
      "pan"
    ]
  },
  {
    "id": "pescado",
    "title": "Pescado y guarniciones",
    "intro": "¿Con qué verduras y acompañamiento prepararías tu pescado?",
    "foodIds": [
      "ensalada",
      "asadas",
      "brocoli",
      "judias",
      "calabacin",
      "zanahoria",
      "merluza",
      "salmon",
      "arroz",
      "patata",
      "boniato",
      "quinoa",
      "pan",
      "pasta"
    ]
  },
  {
    "id": "cuchara",
    "title": "También con cuchara",
    "intro": "Una crema o un gazpacho puede formar parte de la comida. Fíjate en la receta indicada.",
    "foodIds": [
      "calabaza",
      "crema",
      "gazpacho",
      "pisto",
      "ensalada",
      "tomate",
      "pollo",
      "huevo",
      "tofu",
      "garbanzos",
      "alubias",
      "pan",
      "patata",
      "arroz",
      "salmorejo",
      "pasta"
    ]
  },
  {
    "id": "carne",
    "title": "Filete con algo más",
    "intro": "Añade verduras y una fuente de hidratos al pollo o al filete.",
    "foodIds": [
      "pisto",
      "asadas",
      "setas",
      "brocoli",
      "judias",
      "col",
      "pollo",
      "ternera",
      "huevo",
      "arroz",
      "patata",
      "cuscus",
      "boniato",
      "pan",
      "espaguetis",
      "quinoa"
    ]
  },
  {
    "id": "pasta",
    "title": "La pasta también tiene sitio",
    "intro": "La pasta ocupa un cuarto; completa el resto con verduras y proteína.",
    "foodIds": [
      "pisto",
      "calabacin",
      "espinacas",
      "setas",
      "tomate",
      "ensalada",
      "pollo",
      "merluza",
      "tofu",
      "lentejas",
      "pasta",
      "espaguetis",
      "arroz",
      "pan"
    ]
  },
  {
    "id": "fresco",
    "title": "Una comida fresca",
    "intro": "Prueba ensaladas y sopas frías junto con otras preparaciones.",
    "foodIds": [
      "ensalada",
      "tomate",
      "col",
      "gazpacho",
      "crema",
      "judias",
      "huevo",
      "tofu",
      "salmon",
      "garbanzos",
      "pan",
      "quinoa",
      "cuscus",
      "patata",
      "salmorejo",
      "arroz"
    ]
  },
  {
    "id": "libre",
    "title": "Tu propia combinación",
    "intro": "Elige libremente entre las 32 preparaciones. Hay muchas respuestas válidas.",
    "foodIds": [
      "ensalada",
      "pisto",
      "asadas",
      "brocoli",
      "calabacin",
      "judias",
      "calabaza",
      "gazpacho",
      "pollo",
      "ternera",
      "merluza",
      "salmon",
      "tofu",
      "huevo",
      "lentejas",
      "garbanzos",
      "arroz",
      "pasta",
      "patata",
      "pan",
      "quinoa",
      "cuscus",
      "boniato",
      "alubias",
      "espinacas",
      "setas",
      "zanahoria",
      "tomate",
      "crema",
      "salmorejo",
      "espaguetis",
      "col"
    ]
  }
];
  const macros = [
    { id:'pan', name:'Pan', icon:'🍞', answer:'carbs', why:'El pan se utiliza como fuente de hidratos de carbono. También contiene algo de proteína; el integral suele aportar más fibra.' },
    { id:'arroz', name:'Arroz', icon:'🍚', answer:'carbs', why:'El arroz aporta sobre todo almidón, un tipo de hidrato de carbono. Puede formar parte de una comida junto con verdura y proteína.' },
    { id:'platano', name:'Plátano', icon:'🍌', answer:'carbs', why:'La fruta aporta hidratos de carbono, además de agua, fibra y otros nutrientes. No equivale a un refresco azucarado.' },
    { id:'pollo', name:'Pollo', icon:'🍗', answer:'protein', why:'El pollo es una fuente de proteínas. Su contenido de grasa depende de la pieza y de cómo se prepare.' },
    { id:'merluza', name:'Merluza', icon:'🐟', answer:'protein', why:'La merluza es un pescado blanco y una fuente de proteínas.' },
    { id:'huevo', name:'Huevo', icon:'🥚', answer:'protein', why:'Incluimos el huevo entre los alimentos proteicos. También aporta grasa, sobre todo en la yema: un alimento puede aportar varios nutrientes.' },
    { id:'tofu', name:'Tofu', icon:'◻️', answer:'protein', why:'El tofu, elaborado a partir de soja, es una fuente de proteínas vegetales. También contiene grasa; su composición cambia según el producto.' },
    { id:'aceite', name:'Aceite de oliva', icon:'🫒', answer:'fats', why:'El aceite aporta grasa. Las grasas tienen funciones necesarias; no hay que eliminarlas todas de la alimentación.' },
    { id:'nueces', name:'Nueces', icon:'🌰', answer:'fats', why:'En las nueces destaca la grasa. También aportan proteínas y fibra: no pertenecen a un único grupo de nutrientes.' },
    { id:'aguacate', name:'Aguacate', icon:'🥑', answer:'fats', why:'En el aguacate destaca el aporte de grasa. También contiene fibra y otros nutrientes.' }
  ];
  macros.push(...[
  {
    "id": "pasta",
    "name": "Pasta integral",
    "icon": "🍝",
    "answer": "carbs",
    "why": "La pasta es una fuente de almidón. La integral suele aportar más fibra, sin tener necesariamente menos calorías."
  },
  {
    "id": "patata",
    "name": "Patata",
    "icon": "🥔",
    "answer": "carbs",
    "why": "La patata aporta almidón; en el método del plato ocupa el espacio de los hidratos."
  },
  {
    "id": "boniato",
    "name": "Boniato",
    "icon": "🍠",
    "answer": "carbs",
    "why": "El boniato es un tubérculo que aporta hidratos de carbono."
  },
  {
    "id": "avena",
    "name": "Copos de avena",
    "icon": "🌾",
    "answer": "carbs",
    "why": "La avena es un cereal con hidratos y fibra; también contiene algo de proteína y grasa."
  },
  {
    "id": "quinoa",
    "name": "Quinoa",
    "icon": "🌾",
    "answer": "carbs",
    "why": "Usamos la quinoa como acompañamiento con hidratos; también aporta proteína y fibra."
  },
  {
    "id": "cuscus",
    "name": "Cuscús",
    "icon": "🍚",
    "answer": "carbs",
    "why": "El cuscús se elabora habitualmente con sémola de trigo y aporta hidratos."
  },
  {
    "id": "maiz",
    "name": "Maíz",
    "icon": "🌽",
    "answer": "carbs",
    "why": "El maíz es un cereal. Aunque aparezca en ensaladas, cuenta como fuente de hidratos."
  },
  {
    "id": "manzana",
    "name": "Manzana",
    "icon": "🍎",
    "answer": "carbs",
    "why": "La fruta aporta hidratos propios, agua y fibra. No es necesario eliminarla por contener azúcar."
  },
  {
    "id": "pera",
    "name": "Pera",
    "icon": "🍐",
    "answer": "carbs",
    "why": "La pera aporta hidratos, agua y fibra, especialmente si se consume entera."
  },
  {
    "id": "naranja",
    "name": "Naranja entera",
    "icon": "🍊",
    "answer": "carbs",
    "why": "La naranja entera aporta hidratos, agua y fibra. Comerla entera conserva mejor la fibra que exprimirla."
  },
  {
    "id": "uvas",
    "name": "Uvas",
    "icon": "🍇",
    "answer": "carbs",
    "why": "Las uvas contienen hidratos propios de la fruta. La cantidad se adapta a la pauta personal."
  },
  {
    "id": "fresas",
    "name": "Fresas",
    "icon": "🍓",
    "answer": "carbs",
    "why": "Entre estos grupos, en la fruta destacan los hidratos; también aporta agua y fibra."
  },
  {
    "id": "pavo",
    "name": "Pechuga de pavo",
    "icon": "🦃",
    "answer": "protein",
    "why": "La carne de pavo es una fuente de proteínas. No equivale necesariamente a cualquier fiambre de pavo."
  },
  {
    "id": "ternera",
    "name": "Filete de ternera",
    "icon": "🥩",
    "answer": "protein",
    "why": "La carne de ternera aporta proteínas; la grasa cambia según la pieza y la preparación."
  },
  {
    "id": "bacalao",
    "name": "Bacalao",
    "icon": "🐟",
    "answer": "protein",
    "why": "El bacalao es una fuente de proteínas de pescado. La preparación también importa."
  },
  {
    "id": "atun",
    "name": "Atún al natural",
    "icon": "🐟",
    "answer": "protein",
    "why": "El atún al natural es una fuente de proteínas. Las versiones en aceite añaden grasa de cobertura."
  },
  {
    "id": "gambas",
    "name": "Gambas",
    "icon": "🦐",
    "answer": "protein",
    "why": "Las gambas son una fuente de proteínas. La salsa o el aceite de cocinado pueden cambiar el conjunto."
  },
  {
    "id": "mejillones",
    "name": "Mejillones",
    "icon": "🐚",
    "answer": "protein",
    "why": "Los mejillones aportan proteínas, además de otros nutrientes."
  },
  {
    "id": "claras",
    "name": "Claras de huevo",
    "icon": "🥚",
    "answer": "protein",
    "why": "En las claras destaca la proteína. La yema del huevo entero aporta también grasa."
  },
  {
    "id": "tempeh",
    "name": "Tempeh",
    "icon": "🫘",
    "answer": "protein",
    "why": "El tempeh es un derivado de soja que usamos como fuente de proteína vegetal; también aporta otros nutrientes."
  },
  {
    "id": "almendras",
    "name": "Almendras",
    "icon": "🌰",
    "answer": "fats",
    "why": "En las almendras destacan las grasas; también aportan proteína y fibra."
  },
  {
    "id": "avellanas",
    "name": "Avellanas",
    "icon": "🌰",
    "answer": "fats",
    "why": "Las avellanas son frutos secos en los que destaca la grasa, junto con otros nutrientes."
  },
  {
    "id": "pistachos",
    "name": "Pistachos",
    "icon": "🌰",
    "answer": "fats",
    "why": "Los pistachos aportan grasas, proteína y fibra. En este ejercicio los reconocemos como fuente destacada de grasa."
  },
  {
    "id": "semillas",
    "name": "Semillas de girasol",
    "icon": "🌻",
    "answer": "fats",
    "why": "Las semillas de girasol son una fuente de grasas y también contienen proteína."
  },
  {
    "id": "sesamo",
    "name": "Semillas de sésamo",
    "icon": "🌱",
    "answer": "fats",
    "why": "En el sésamo destaca la grasa; no es un alimento formado solo por un nutriente."
  },
  {
    "id": "aceitunas",
    "name": "Aceitunas",
    "icon": "🫒",
    "answer": "fats",
    "why": "Las aceitunas se utilizan como fuente de grasa. La cantidad y su preparación forman parte de la elección."
  },
  {
    "id": "lentejas",
    "name": "Lentejas",
    "icon": "🫘",
    "answer": "protein-carbs",
    "why": "Las legumbres aportan hidratos y proteínas, además de fibra: no hace falta encajarlas en un solo grupo."
  },
  {
    "id": "garbanzos",
    "name": "Garbanzos",
    "icon": "🫘",
    "answer": "protein-carbs",
    "why": "Los garbanzos aportan hidratos y proteína vegetal, además de fibra."
  },
  {
    "id": "alubias",
    "name": "Alubias blancas",
    "icon": "🫘",
    "answer": "protein-carbs",
    "why": "Las alubias aportan proteína vegetal e hidratos. Pueden ocupar cualquiera de los dos cuartos del plato."
  },
  {
    "id": "salmon",
    "name": "Salmón",
    "icon": "🐟",
    "answer": "protein-fats",
    "why": "El salmón es pescado azul: aporta proteínas y grasas, entre ellas omega-3."
  }
]);
  const question = (id, text, options, answer, why, route) => ({ id, text, options, answer, why, route });
  const quizzes = [
    { id:'alimentacion', title:'Comer mejor', icon:'🥗', hint:'Plato, agua y nutrientes', questions:[
      question('plato','En el método del plato, ¿qué grupo ocupa aproximadamente la mitad?', ['Verduras y hortalizas','Solo carne','Solo pan'],0,'La mitad de verduras, un cuarto de alimentos proteicos y un cuarto de cereales o tubérculos es una orientación visual. Las cantidades se adaptan a cada persona.','herramientas-plato'),
      question('agua','¿Qué bebida podemos elegir habitualmente para acompañar la comida?', ['Un refresco azucarado','Agua','Una bebida energética'],1,'El agua es una opción habitual para acompañar las comidas. No necesitamos bebidas azucaradas para hidratarnos.','herramientas-plato'),
      question('vegetal','¿Podemos obtener proteínas de alimentos vegetales?', ['No, solo de la carne','Solo si tomamos batidos','Sí, por ejemplo de legumbres y tofu'],2,'Las legumbres, la soja y sus derivados pueden aportar proteínas. Una alimentación vegetal variada puede cubrir las necesidades con una planificación adecuada.','macro-proteinas'),
      question('hidratos','¿Es necesario eliminar siempre el pan, el arroz y la patata para cuidarse?', ['No: importan la cantidad y el conjunto de la alimentación','Sí, están prohibidos','Solo se pueden comer si hacemos deporte'],0,'Los hidratos pueden formar parte de una alimentación equilibrada. Las cantidades se adaptan a la pauta y a las necesidades de cada persona.','macro-hidratos'),
      question('legumbres','¿Qué aportan las lentejas y los garbanzos?', ['Solo grasa','Hidratos, proteínas y fibra','Solo agua'],1,'Las legumbres aportan varios nutrientes. Pueden utilizarse como fuente de proteína y también aportan hidratos y fibra.','macro-proteinas')
    ]},
    { id:'movimiento', title:'Moverme más', icon:'🚶', hint:'Empezar, fuerza y vida diaria', questions:[
      question('empezar','Si llevo tiempo sin hacer ejercicio, ¿cómo puedo empezar?', ['Con lo más intenso desde el primer día','No empezar hasta estar en forma','Con pequeñas actividades adaptadas a mí'],2,'Empieza con actividades que puedas realizar con seguridad y aumenta poco a poco. Tu equipo puede ayudarte a adaptarlas si lo necesitas.','ejercicio-empezar'),
      question('fuerza','¿Para qué puede ayudarme el ejercicio de fuerza?', ['Para tareas como levantarme de una silla y llevar la compra','Solo para competir','Para dejar de comer proteínas'],0,'La fuerza ayuda a mantener la capacidad para las tareas cotidianas. No es solo para personas deportistas.','ejercicio-fuerza'),
      question('diario','¿Cuál de estas acciones también suma movimiento?', ['Estar todo el día sentado','Caminar para hacer un recado','Mirar un vídeo de ejercicio sin moverse'],1,'Caminar, desplazarte y realizar actividades cotidianas también cuentan. El movimiento no se limita al gimnasio.','ejercicio-pasos'),
      question('progresar','Cuando una actividad se vuelve más fácil, ¿cómo puedo progresar?', ['Aumentando todo de golpe','Entrenando siempre con dolor','Con pequeños aumentos, respetando la técnica y mi situación'],2,'La progresión puede ser gradual. El dolor y las limitaciones necesitan valoración; no son un objetivo del entrenamiento.','ejercicio-empezar'),
      question('salud','¿El ejercicio puede mejorar mi salud aunque la báscula cambie poco?', ['Sí, puede beneficiar la fuerza y otros aspectos de la salud','No, solo cuenta si bajo mucho de peso','Solo si hago ejercicio todos los días sin descansar'],0,'Los beneficios del movimiento van más allá del peso. Mejorar capacidad física y bienestar también es importante.','ejercicio-fuerza')
    ]},
    { id:'hambre', title:'Hambre y saciedad', icon:'💚', hint:'Escuchar las señales del cuerpo', questions:[
      question('factores','¿Qué puede influir en el hambre?', ['Únicamente la fuerza de voluntad','Señales del cuerpo, emociones, descanso y entorno','Solo la hora del reloj'],1,'El hambre tiene muchas influencias. Reconocerlas ayuda a entender lo que te pasa, sin culpas.','obesidad-hambre'),
      question('emociones','Si noto ganas de comer cuando estoy nervioso, ¿qué puede ayudar?', ['Castigarme','Saltarme la siguiente comida por obligación','Reconocer cómo me siento y qué apoyo necesito'],2,'Las emociones pueden influir en la alimentación. Observarlas con amabilidad y buscar apoyo puede ayudar; no es un fallo personal.','obesidad-hambre'),
      question('pausa','Durante la comida, ¿para qué puede servir una pausa?', ['Para notar sabor, comodidad y saciedad','Para obligarme siempre a dejar comida','Para comer después el doble'],0,'La pausa permite observar cómo te encuentras. No te obliga a terminar ni a dejar comida: es una ayuda para escuchar tus señales.','herramientas-raciones'),
      question('descanso','¿El descanso puede influir en el apetito?', ['No tiene ninguna relación','Sí, puede influir','Solo importa si hacemos deporte'],1,'El descanso es uno de los factores que puede influir en la regulación del apetito y en el bienestar.','obesidad-hambre'),
      question('reposo','¿El cuerpo utiliza energía cuando estamos en reposo?', ['No utiliza nada','Solo si estamos pensando','Sí, para respirar y mantener sus funciones'],2,'El cuerpo necesita energía también para funciones como respirar, mantener la temperatura y hacer funcionar los órganos.','obesidad-metabolismo')
    ]},
    { id:'etiquetas', title:'Entender las etiquetas', icon:'🔎', hint:'Comparar sin complicarte', questions:[
      question('comparar','Para comparar dos yogures parecidos, ¿qué dato me ayuda?', ['La información por 100 g de ambos','El color del envase','Que uno use una ración de 30 g y el otro de 200 g'],0,'Compara productos similares usando la misma referencia, por ejemplo 100 g. Después piensa en la cantidad que realmente tomarás.','herramientas-etiquetas'),
      question('ingredientes','¿Cómo se ordenan habitualmente los ingredientes en la etiqueta?', ['Por orden alfabético','De mayor a menor cantidad utilizada','Primero los más saludables'],1,'La lista se presenta, como norma general, en orden decreciente de peso en el momento de elaboración.','herramientas-etiquetas'),
      question('integral','Si un producto es integral, ¿tiene necesariamente menos calorías?', ['Sí, siempre','No tiene calorías','No; suele aportar más fibra'],2,'Integral no significa necesariamente menos calorías. La fibra y la composición también importan al elegir.','macro-hidratos'),
      question('azucar','«Sin azúcares añadidos» significa que…', ['Puede contener azúcares propios de los ingredientes','Nunca contiene ningún azúcar','Podemos tomar cualquier cantidad'],0,'Sin azúcares añadidos no equivale a ausencia de todos los azúcares. Un producto puede contener los propios de sus ingredientes.','herramientas-etiquetas'),
      question('procesado','¿Todo alimento procesado es perjudicial?', ['Sí, sin excepciones','No: también están procesados el yogur natural y las legumbres en bote','Solo si se vende en un supermercado'],1,'Importan el producto, su composición y el patrón habitual. Procesado no es sinónimo de perjudicial.','herramientas-etiquetas')
    ]},
    { id:'mitos', title:'Mitos y hábitos', icon:'💡', hint:'Las ideas que conviene recordar', questions:[
      question('obesidad','¿La obesidad depende solo de la fuerza de voluntad?', ['Sí, únicamente','Solo del tamaño del plato','No: intervienen muchos factores'],2,'Biología, entorno, hábitos y otras circunstancias pueden influir. La obesidad no se explica únicamente por la voluntad.','obesidad-que-es'),
      question('bascula','¿La báscula informa por sí sola de la grasa y el músculo?', ['No: muestra el peso total','Sí, distingue todo con precisión','Solo distingue el músculo'],0,'El peso total no separa grasa, músculo y agua. La valoración puede necesitar otros datos.','obesidad-composicion'),
      question('habitos','¿Qué enfoque suele ser más fácil de mantener?', ['Cambiar todo de golpe y prohibir muchos alimentos','Pequeños cambios realistas que puedo repetir','Buscar una solución milagrosa'],1,'Trabajar cambios adaptados a tu vida ayuda a construir hábitos. No hace falta buscar la perfección ni soluciones milagrosas.','obesidad-piramide'),
      question('batidos','¿Todas las personas necesitan batidos de proteínas?', ['Sí, obligatoriamente','Solo si comen pan','No: se puede obtener proteína de alimentos habituales'],2,'Los suplementos no son obligatorios para todo el mundo. La necesidad se valora según la alimentación y la situación individual.','macro-proteinas'),
      question('localizada','¿Hacer abdominales permite elegir exactamente de dónde perder grasa?', ['No, la pérdida de grasa no se elige por zonas','Sí, solo de la barriga','Sí, siempre que los haga cada día'],0,'Un ejercicio puede fortalecer una zona, pero no permite elegir exactamente dónde se pierde grasa.','ejercicio-fuerza')
    ]}
  ];
  quizzes.push(...[
  {
    "id": "hidratos",
    "title": "Hidratos sin miedo",
    "icon": "🍞",
    "hint": "Energía, fibra y alimentos",
    "questions": [
      {
        "id": "energia",
        "text": "¿Qué función tienen los hidratos?",
        "options": [
          "Aportar energía",
          "Impedir toda pérdida de peso",
          "Sustituir el agua"
        ],
        "answer": 0,
        "why": "Son una fuente habitual de energía para el cuerpo.",
        "route": "macro-hidratos"
      },
      {
        "id": "patata",
        "text": "En el método del plato, ¿dónde colocamos la patata?",
        "options": [
          "En la mitad de verduras",
          "En el cuarto de hidratos",
          "En el cuarto de proteína"
        ],
        "answer": 1,
        "why": "Aunque sea vegetal, la patata es un tubérculo rico en almidón.",
        "route": "herramientas-plato"
      },
      {
        "id": "fruta",
        "text": "¿La fruta entera equivale a un refresco azucarado?",
        "options": [
          "Sí, son idénticos",
          "Sí, si es dulce",
          "No: aporta también agua, fibra y nutrientes"
        ],
        "answer": 2,
        "why": "La composición completa del alimento importa, no solo sus azúcares.",
        "route": "macro-hidratos"
      },
      {
        "id": "integrales",
        "text": "¿Qué suele aportar más una versión integral?",
        "options": [
          "Fibra",
          "Alcohol",
          "Siempre menos calorías"
        ],
        "answer": 0,
        "why": "Integral suele significar más fibra; no garantiza menos calorías.",
        "route": "macro-hidratos"
      },
      {
        "id": "cantidad",
        "text": "¿Cómo se decide la cantidad de arroz o pasta?",
        "options": [
          "Es igual para todo el mundo",
          "Se adapta a necesidades y pauta",
          "Se elimina siempre"
        ],
        "answer": 1,
        "why": "La cantidad depende de la persona y del conjunto de la alimentación.",
        "route": "macro-hidratos"
      }
    ]
  },
  {
    "id": "proteinas",
    "title": "Proteínas cotidianas",
    "icon": "🥚",
    "hint": "Fuentes animales y vegetales",
    "questions": [
      {
        "id": "funcion",
        "text": "Las proteínas ayudan a…",
        "options": [
          "Construir y reparar tejidos",
          "Sustituir el descanso",
          "Eliminar la necesidad de comer verduras"
        ],
        "answer": 0,
        "why": "Participan en músculos, tejidos, defensas y otras funciones.",
        "route": "macro-proteinas"
      },
      {
        "id": "tofu",
        "text": "¿Qué alimento es una fuente de proteína vegetal?",
        "options": [
          "Aceite de oliva",
          "Tofu",
          "Agua"
        ],
        "answer": 1,
        "why": "El tofu se elabora con soja y aporta proteína vegetal.",
        "route": "macro-proteinas"
      },
      {
        "id": "mayores",
        "text": "¿Las proteínas solo importan a deportistas?",
        "options": [
          "Sí",
          "Solo a quienes compiten",
          "No, todas las personas las necesitan"
        ],
        "answer": 2,
        "why": "También ayudan al mantenimiento de tejidos en la vida cotidiana.",
        "route": "macro-proteinas"
      },
      {
        "id": "combinacion",
        "text": "¿Es obligatorio juntar legumbres y cereales en la misma comida?",
        "options": [
          "No: importa la variedad del conjunto",
          "Sí, siempre",
          "Solo pueden comerse por la noche"
        ],
        "answer": 0,
        "why": "Una alimentación vegetal variada no exige esa combinación en cada comida.",
        "route": "macro-proteinas"
      },
      {
        "id": "exceso",
        "text": "¿Más proteína siempre es mejor?",
        "options": [
          "Sí, sin límite",
          "No: la cantidad se adapta a cada persona",
          "Sí, si viene en un batido"
        ],
        "answer": 1,
        "why": "La edad, la actividad y la salud influyen en las necesidades.",
        "route": "macro-proteinas"
      }
    ]
  },
  {
    "id": "grasas",
    "title": "Grasas con criterio",
    "icon": "🫒",
    "hint": "Funciones y raciones",
    "questions": [
      {
        "id": "eliminar",
        "text": "¿Conviene eliminar todas las grasas?",
        "options": [
          "Sí",
          "Solo si comemos fruta",
          "No, cumplen funciones necesarias"
        ],
        "answer": 2,
        "why": "Las grasas son necesarias y algunas aportan ácidos grasos esenciales.",
        "route": "macro-grasas"
      },
      {
        "id": "aceite",
        "text": "El aceite de oliva es una fuente de…",
        "options": [
          "Grasas",
          "Solo proteína",
          "Solo hidratos"
        ],
        "answer": 0,
        "why": "El aceite aporta grasa; la cantidad también importa.",
        "route": "macro-grasas"
      },
      {
        "id": "frutos",
        "text": "¿Qué afirmación describe mejor los frutos secos?",
        "options": [
          "Solo tienen proteína",
          "Aportan grasa, proteína y fibra",
          "No aportan energía"
        ],
        "answer": 1,
        "why": "Un alimento puede aportar varios nutrientes a la vez.",
        "route": "macro-grasas"
      },
      {
        "id": "vitaminas",
        "text": "Las grasas ayudan a absorber…",
        "options": [
          "Solo agua",
          "Todas las etiquetas",
          "Vitaminas A, D, E y K"
        ],
        "answer": 2,
        "why": "Estas vitaminas son liposolubles: la grasa participa en su absorción.",
        "route": "macro-grasas"
      },
      {
        "id": "medir",
        "text": "¿Para qué puede ayudar medir el aceite alguna vez?",
        "options": [
          "Para conocer la cantidad usada",
          "Para prohibirlo para siempre",
          "Para quitarle sus calorías"
        ],
        "answer": 0,
        "why": "Medir orienta sobre las raciones; no significa eliminar el aceite.",
        "route": "macro-grasas"
      }
    ]
  },
  {
    "id": "plato",
    "title": "El plato en la vida real",
    "icon": "🍽️",
    "hint": "Recetas y combinaciones",
    "questions": [
      {
        "id": "pisto",
        "text": "¿El pisto puede ocupar parte de la mitad de verduras?",
        "options": [
          "No, porque está cocinado",
          "Sí, si su base son hortalizas",
          "Solo si no lleva tomate"
        ],
        "answer": 1,
        "why": "Las verduras cocinadas también cuentan. La receta y sus cantidades importan.",
        "route": "herramientas-plato"
      },
      {
        "id": "mezclado",
        "text": "¿Se puede aplicar el método a una receta mezclada?",
        "options": [
          "Nunca",
          "Solo a ensaladas",
          "Sí, pensando en sus ingredientes y proporciones"
        ],
        "answer": 2,
        "why": "También puede orientar guisos y ensaladas completas.",
        "route": "herramientas-plato"
      },
      {
        "id": "pasta",
        "text": "Un plato solo de pasta, ¿incluye por sí mismo todos los grupos?",
        "options": [
          "No, podemos añadir verduras y proteína",
          "Sí, siempre",
          "Sí, si el plato es grande"
        ],
        "answer": 0,
        "why": "Se puede completar con verduras y una fuente de proteína.",
        "route": "herramientas-plato"
      },
      {
        "id": "legumbre",
        "text": "¿Dónde pueden encajar las legumbres?",
        "options": [
          "Solo en las verduras",
          "Como proteína o como hidratos",
          "Solo como grasa"
        ],
        "answer": 1,
        "why": "Aportan proteína vegetal, hidratos y fibra.",
        "route": "herramientas-plato"
      },
      {
        "id": "guia",
        "text": "Las proporciones del dibujo son…",
        "options": [
          "Una regla idéntica para todo el mundo",
          "Un peso exacto de cada alimento",
          "Una orientación que se adapta a cada persona"
        ],
        "answer": 2,
        "why": "El plato ayuda a organizar la comida; no fija una ración universal.",
        "route": "herramientas-plato"
      }
    ]
  },
  {
    "id": "compra",
    "title": "Organizar la compra",
    "icon": "🛒",
    "hint": "Opciones prácticas para el día a día",
    "questions": [
      {
        "id": "plan",
        "text": "Antes de comprar, ¿qué puede ayudar?",
        "options": [
          "Revisar lo que hay y hacer una lista",
          "Comprar solo por el envase",
          "Evitar toda planificación"
        ],
        "answer": 0,
        "why": "Revisar y planificar facilita preparar comidas variadas.",
        "route": "herramientas-compra"
      },
      {
        "id": "bote",
        "text": "¿Las legumbres de bote pueden ser una opción práctica?",
        "options": [
          "No, por estar envasadas",
          "Sí, revisando el producto y su preparación",
          "Solo si no tienen legumbres"
        ],
        "answer": 1,
        "why": "Las legumbres en conserva pueden facilitar incluirlas en las comidas.",
        "route": "herramientas-compra"
      },
      {
        "id": "congelado",
        "text": "¿Las verduras congeladas pueden ayudarnos a comer verdura?",
        "options": [
          "Nunca",
          "Solo si eliminamos las frescas",
          "Sí, son una opción práctica"
        ],
        "answer": 2,
        "why": "Tener verduras disponibles facilita utilizarlas en distintas preparaciones.",
        "route": "herramientas-compra"
      },
      {
        "id": "conjunto",
        "text": "¿Qué compra ayuda a preparar un plato completo?",
        "options": [
          "Verduras, una proteína y un cereal o tubérculo",
          "Solo arroz",
          "Solo aceite"
        ],
        "answer": 0,
        "why": "Tener alimentos de los distintos grupos facilita combinarlos.",
        "route": "herramientas-plato"
      },
      {
        "id": "etiqueta",
        "text": "Entre productos similares, ¿qué conviene revisar?",
        "options": [
          "Solo el dibujo",
          "Ingredientes e información nutricional",
          "Solo el nombre comercial"
        ],
        "answer": 1,
        "why": "La etiqueta permite comparar composición usando una misma referencia.",
        "route": "herramientas-etiquetas"
      }
    ]
  },
  {
    "id": "raciones",
    "title": "Raciones y volumen",
    "icon": "🥣",
    "hint": "Aprender a mirar las cantidades",
    "questions": [
      {
        "id": "kcal",
        "text": "¿100 g de pollo son 100 g de proteína?",
        "options": [
          "Sí",
          "Sí, si es a la plancha",
          "No: el alimento tiene también agua y otros componentes"
        ],
        "answer": 2,
        "why": "El peso del alimento no equivale al peso de un único nutriente.",
        "route": "macronutrientes"
      },
      {
        "id": "volumen",
        "text": "¿Dos alimentos del mismo volumen tienen siempre la misma energía?",
        "options": [
          "No, depende de su composición",
          "Sí, siempre",
          "Solo si están en un bol"
        ],
        "answer": 0,
        "why": "La densidad energética relaciona energía y cantidad de alimento.",
        "route": "macronutrientes"
      },
      {
        "id": "verduras",
        "text": "¿Qué puede aportar añadir verduras a una receta?",
        "options": [
          "Eliminar toda su energía",
          "Más volumen, agua y fibra",
          "Convertirla automáticamente en una dieta perfecta"
        ],
        "answer": 1,
        "why": "Las verduras pueden aumentar el volumen y aportar fibra y agua.",
        "route": "macronutrientes"
      },
      {
        "id": "peso",
        "text": "La misma energía en dos raciones significa…",
        "options": [
          "Los mismos nutrientes",
          "La misma saciedad para todo el mundo",
          "Que aportan energía similar, sin igualar su composición"
        ],
        "answer": 2,
        "why": "Igualar calorías no iguala proteína, fibra ni otros nutrientes.",
        "route": "macronutrientes"
      },
      {
        "id": "adaptar",
        "text": "¿Qué ayuda a ajustar una ración?",
        "options": [
          "Tener en cuenta hambre, necesidades y pauta",
          "Copiar siempre el plato de otra persona",
          "Usar la misma cantidad toda la vida"
        ],
        "answer": 0,
        "why": "Las cantidades reales se adaptan a la situación de cada persona.",
        "route": "herramientas-raciones"
      }
    ]
  },
  {
    "id": "repaso",
    "title": "Repaso de ideas clave",
    "icon": "🌿",
    "hint": "Un poco de todo",
    "questions": [
      {
        "id": "salmon",
        "text": "¿Qué combinación destaca en el salmón?",
        "options": [
          "Solo hidratos",
          "Proteínas y grasas",
          "Solo agua"
        ],
        "answer": 1,
        "why": "El pescado azul aporta proteína y grasas, entre ellas omega-3.",
        "route": "macro-grasas"
      },
      {
        "id": "agua",
        "text": "¿Qué bebida es una buena opción habitual?",
        "options": [
          "Solo zumos",
          "Refrescos como única bebida",
          "Agua"
        ],
        "answer": 2,
        "why": "El agua es una opción habitual para acompañar la comida.",
        "route": "herramientas-plato"
      },
      {
        "id": "movimiento",
        "text": "¿Caminar para hacer un recado cuenta como movimiento?",
        "options": [
          "Sí",
          "Solo con ropa deportiva",
          "No, nunca"
        ],
        "answer": 0,
        "why": "El movimiento puede integrarse en las tareas del día a día.",
        "route": "ejercicio-pasos"
      },
      {
        "id": "culpa",
        "text": "Si un hábito me cuesta, ¿qué enfoque ayuda más?",
        "options": [
          "Culparme",
          "Buscar un cambio realista y apoyo",
          "Prohibir todos los alimentos"
        ],
        "answer": 1,
        "why": "Adaptar los cambios a la vida y pedir apoyo facilita practicarlos.",
        "route": "obesidad-piramide"
      },
      {
        "id": "aprender",
        "text": "Si me equivoco en un juego, ¿qué puedo hacer?",
        "options": [
          "Dejar de aprender",
          "Tomarlo como un diagnóstico",
          "Leer la explicación y volver a intentarlo"
        ],
        "answer": 2,
        "why": "Estos juegos sirven para practicar ideas; equivocarse también forma parte del aprendizaje.",
        "route": "juegos"
      }
    ]
  }
]);
  return { foods, plates, macros, quizzes };
});
