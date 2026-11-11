/* Adaptación del Cuestionario ETD Avanzada aportado para ENDONUTRI. */
(function (root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.EndonutriChecklistData = data;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const sources = {
    dosis: ['UCSF Diabetes Teaching Center · Cálculo de insulina', 'https://diabetesteachingcenter.ucsf.edu/about-diabetes/type-2-diabetes/use-insulin-type-2-diabetes/calculating-insulin-dose'],
    activa: ['ADA · Uso del calculador de bolos', 'https://doi.org/10.2337/9781580408363.ch07'],
    aspart: ['AEMPS · Ficha técnica de NovoRapid', 'https://cima.aemps.es/cima/pdfs/es/ft/99119009/99119009_ft.pdf'],
    hipo: ['ADA 2026 · Tratamiento de la hipoglucemia', 'https://doi.org/10.2337/dc26-S006'],
    ejercicio: ['ADA/EASD 2026 · Actividad física y diabetes tipo 1', 'https://doi.org/10.2337/dci26-0122']
  };
  const questions = [
    {
      id: 1, question: '¿Qué es un calculador de bolos?',
      options: ['Un medidor de glucemia que no requiere configuración.', 'Una herramienta que propone dosis de insulina personalizadas.', 'Un tipo de insulina de acción rápida.', 'Un programa educativo para pacientes con diabetes.'],
      correct: 1, explanation: 'El calculador usa los ajustes de tu pauta para estimar la insulina rápida necesaria. Según el dispositivo, puede tener en cuenta los hidratos de carbono, la glucosa y la insulina que aún está actuando.', source: 'activa'
    },
    {
      id: 2, question: '¿Qué se calcula utilizando el factor de sensibilidad a la insulina (FSI)?',
      options: ['La duración de la insulina activa.', 'La cantidad de insulina necesaria para corregir una glucosa alta.', 'El número de raciones de hidratos de carbono.', 'La dosis de insulina para cubrir los hidratos de la comida.'],
      correct: 1, explanation: 'El FSI estima cuánto puede bajar la glucosa con una unidad de insulina rápida. Sirve para calcular la parte de corrección del bolo; para cubrir los hidratos de la comida se usa el ratio.', source: 'dosis'
    },
    {
      id: 3, question: 'En el calculador de bolos, ¿qué significa el ajuste «duración de la insulina activa»?',
      options: ['Un parámetro fijo que no cambia para nadie.', 'El tiempo estimado durante el que la insulina del bolo sigue haciendo efecto.', 'La cantidad total de insulina administrada en el pasado.', 'Una dosis adicional de insulina para hacer deporte.'],
      correct: 1, explanation: 'La duración se mide en tiempo y ayuda al calculador a estimar cuánta insulina de bolos anteriores sigue actuando. Esa cantidad restante es lo que se llama insulina activa; tenerla en cuenta ayuda a evitar correcciones superpuestas.', source: 'activa'
    },
    {
      id: 4, question: 'En el ejemplo de insulina aspart rápida (NovoRapid), ¿qué duración aproximada de acción es compatible con su ficha técnica?',
      options: ['2 horas.', '4 horas.', '6 horas.', '8 horas.'],
      correct: 1, explanation: 'La ficha técnica describe una duración aproximada de 3 a 5 horas, así que 4 horas encaja en ese intervalo. El ajuste de tu calculador depende de la insulina y del dispositivo y debe seguir la pauta acordada con tu equipo.', source: 'aspart'
    },
    {
      id: 5, question: 'Si el ratio insulina/hidratos se expresa en unidades por ración de 10 g, ¿qué representa?',
      options: ['Las unidades de insulina por cada 100 g de hidratos.', 'Las unidades de insulina por cada 10 g de hidratos.', 'La dosis máxima de insulina permitida.', 'El número de raciones que debes comer.'],
      correct: 1, explanation: 'En este formato, el ratio indica la insulina rápida que cubre una ración de 10 g. Algunos dispositivos lo muestran al revés, como gramos de hidratos que cubre una unidad: conviene comprobar la unidad que aparece.', source: 'dosis'
    },
    {
      id: 6, question: '¿Con qué se relaciona la regla del 15?',
      options: ['Con el tratamiento de la hiperglucemia.', 'Con el tratamiento de la hipoglucemia.', 'Con la administración de insulina.', 'Con el conteo de hidratos de carbono.'],
      correct: 1, explanation: 'Como pauta habitual en adultos que están conscientes y pueden tragar, se toman 15 g de glucosa o hidratos de absorción rápida y se vuelve a comprobar la glucosa a los 15 minutos. Si sigue baja, se repite el tratamiento según la pauta personal, que puede variar con algunos sistemas automatizados.', source: 'hipo'
    },
    {
      id: 7, question: '¿Cuál es la principal diferencia entre el factor de sensibilidad a la insulina (FSI) y el ratio insulina/hidratos?',
      options: ['El ratio corrige glucosas altas y el FSI sirve para las comidas.', 'El ratio sirve para cubrir los hidratos de la comida y el FSI, para calcular la corrección de una glucosa alta.', 'No hay diferencia: significan lo mismo.', 'El ratio se usa solo para el deporte y el FSI solo para comidas como pizzas y hamburguesas.'],
      correct: 1, explanation: 'Son dos cálculos distintos: el ratio relaciona los gramos de hidratos con las unidades de insulina de la comida; el FSI estima el efecto de una unidad sobre la glucosa para calcular una corrección.', source: 'dosis'
    },
    {
      id: 8, question: 'Si el ratio es de 1 unidad de insulina por cada 10 g de hidratos (1:10) y vas a cenar 60 g de hidratos, ¿cuánta insulina sugeriría el calculador solo por la comida?',
      options: ['4 unidades de insulina rápida.', '8 unidades de insulina rápida.', '6 unidades de insulina rápida.', '3 unidades de insulina rápida y 14 de insulina lenta.'],
      correct: 2, explanation: 'En este ejemplo, 60 g divididos entre 10 g por unidad dan 6 unidades de insulina rápida para cubrir la comida. La pregunta solo calcula esa parte del bolo; no incluye corrección ni otros ajustes de tu pauta.', source: 'dosis'
    },
    {
      id: 9, question: '¿Qué puede ocurrir con tu glucosa después de comer si introduces 30 g de hidratos en el calculador, pero en realidad comes 60 g?',
      options: ['Aumenta el riesgo de hipoglucemia por haber registrado menos hidratos.', 'No pasa nada: el calculador corrige solo el error.', 'La glucosa puede subir porque el calculador estima menos insulina para la comida de la que corresponde.', 'La glucosa se mantiene necesariamente en rango si el calculador está bien configurado.'],
      correct: 2, explanation: 'El calculador hace su estimación con los gramos que le indicas. Si registras 30 g en vez de 60 g, la parte del bolo destinada a la comida puede quedar corta y la glucosa puede subir.', source: 'dosis'
    },
    {
      id: 10, question: '¿Qué información básica necesita el calculador de bolos si vas a comer antes de hacer ejercicio?',
      options: ['Las pulsaciones y los pasos que diste ayer.', 'Solo si vas a hacer pesas, cardio, yoga o una caminata larga.', 'Los hidratos de carbono que vas a comer y tu glucosa actual.', 'El tipo de ropa que usarás y si llevas glucosa para tratar una bajada.'],
      correct: 2, explanation: 'Los hidratos y la glucosa actual son datos básicos para estimar el bolo. Para decidir cómo ajustarlo antes de la actividad también cuentan tu pauta personal, la insulina activa y el tipo y la duración del ejercicio.', source: 'ejercicio'
    },
    {
      id: 11, question: '¿Qué hidratos de carbono debes indicar en el calculador de bolos para tu comida si vas a hacer ejercicio justo después?',
      options: ['Solo los de las bebidas light.', 'El doble de los que pensabas tomar.', 'Ninguno, no hace falta.', 'La cantidad real de hidratos de carbono de la comida, siguiendo tu pauta para el ejercicio.'],
      correct: 3, explanation: 'Cuenta los hidratos reales de la comida. Si vas a hacer ejercicio, sigue los ajustes de bolo, objetivo o modo de actividad acordados para tu dispositivo. Los hidratos que tomes para tratar una bajada se manejan según tu plan de hipoglucemia.', source: 'ejercicio'
    }
  ];
  return { title: 'Cuestionario ETD Avanzada', version: '2026-11-11', sources, questions };
});
