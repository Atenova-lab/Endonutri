/* Preguntas educativas vinculadas a los apartados publicados de Endonutri. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EndonutriGamesData = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const foods = [
    { id: 'brocoli', name: 'Brócoli', icon: '🥦', roles: ['veg'] },
    { id: 'ensalada', name: 'Ensalada de hojas y tomate', icon: '🥗', roles: ['veg'] },
    { id: 'zanahoria', name: 'Zanahoria', icon: '🥕', roles: ['veg'] },
    { id: 'calabacin', name: 'Calabacín', icon: '🥒', roles: ['veg'] },
    { id: 'pimiento', name: 'Pimiento', icon: '🫑', roles: ['veg'] },
    { id: 'judias', name: 'Judías verdes', icon: '🌱', roles: ['veg'] },
    { id: 'pollo', name: 'Pollo', icon: '🍗', roles: ['protein'] },
    { id: 'merluza', name: 'Merluza', icon: '🐟', roles: ['protein'] },
    { id: 'huevo', name: 'Huevo', icon: '🥚', roles: ['protein'] },
    { id: 'tofu', name: 'Tofu', icon: '◻️', roles: ['protein'] },
    { id: 'lentejas', name: 'Lentejas cocidas', icon: '🫘', roles: ['protein', 'carbs'] },
    { id: 'garbanzos', name: 'Garbanzos cocidos', icon: '🫘', roles: ['protein', 'carbs'] },
    { id: 'arroz', name: 'Arroz integral', icon: '🍚', roles: ['carbs'] },
    { id: 'patata', name: 'Patata cocida', icon: '🥔', roles: ['carbs'] },
    { id: 'pan', name: 'Pan integral', icon: '🍞', roles: ['carbs'] },
    { id: 'pasta', name: 'Pasta integral', icon: '🍝', roles: ['carbs'] }
  ];
  const plates = [
    { id: 'almuerzo', title: 'Un almuerzo a tu gusto', intro: 'Hay muchas combinaciones posibles. Elige alimentos para cada parte del plato.', foodIds: ['brocoli','ensalada','zanahoria','pollo','merluza','huevo','tofu','lentejas','arroz','patata','pan','pasta'] },
    { id: 'vegetal', title: 'Un plato con proteínas vegetales', intro: 'Prueba las legumbres o el tofu como fuente de proteína.', foodIds: ['brocoli','ensalada','calabacin','pimiento','zanahoria','tofu','lentejas','garbanzos','arroz','patata','pan','pasta'] },
    { id: 'guiso', title: 'Los ingredientes de un guiso', intro: 'Aunque lo cocines todo junto, puedes pensar en el espacio de cada grupo de alimentos.', foodIds: ['zanahoria','pimiento','judias','calabacin','pollo','huevo','lentejas','garbanzos','arroz','patata','pan','pasta'] }
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
  return { foods, plates, macros, quizzes };
});
