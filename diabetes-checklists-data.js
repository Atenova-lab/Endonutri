/* ENDONUTRI: 3 checklists revisados. Documento original conservado por separado. */
(function(root,factory){if(typeof module === "object" && module.exports)module.exports=factory();else root.EndonutriChecklistData=factory();})(typeof globalThis!=="undefined"?globalThis:this,function(){return {
  "version": "2026-10-12.1",
  "threshold": 70,
  "racionGrams": 10,
  "sourceDocument": "recursos/diabetes/Cuestionarios_Diabetes_original.odt",
  "sources": [
    {
      "id": "ada6",
      "label": "ADA, Standards of Care 2026: objetivos e hipoglucemia",
      "url": "https://doi.org/10.2337/dc26-S006"
    },
    {
      "id": "ada5",
      "label": "ADA, Standards of Care 2026: alimentación y actividad física",
      "url": "https://doi.org/10.2337/dc26-S005"
    },
    {
      "id": "ada10",
      "label": "ADA, Standards of Care 2026: riesgo cardiovascular y lípidos",
      "url": "https://doi.org/10.2337/dc26-S010"
    },
    {
      "id": "fitter",
      "label": "FITTER Forward 2025: técnica de inyección",
      "url": "https://doi.org/10.1016/j.mayocp.2025.01.004"
    },
    {
      "id": "tresiba",
      "label": "AEMPS: ficha técnica de Tresiba",
      "url": "https://cima.aemps.es/cima/dochtml/ft/112807004/FT_112807004.html"
    },
    {
      "id": "novorapid",
      "label": "AEMPS: ficha técnica de NovoRapid",
      "url": "https://cima.aemps.es/cima/dochtml/ft/99119001/FT_99119001.html"
    },
    {
      "id": "glucagon",
      "label": "AEMPS: glucagón nasal Baqsimi",
      "url": "https://cima.aemps.es/cima/dochtml/ft/1191406001/FT_1191406001.html"
    },
    {
      "id": "ucsf",
      "label": "UCSF Diabetes Teaching Center: HC, FSI y cálculos de insulina",
      "url": "https://diabetesteachingcenter.ucsf.edu/about-diabetes/type-2-diabetes/use-insulin-type-2-diabetes/calculating-insulin-dose"
    },
    {
      "id": "active",
      "label": "UCSF Diabetes Teaching Center: hipoglucemia e insulina activa",
      "url": "https://diabetesteachingcenter.ucsf.edu/living-diabetes/newly-diagnosed/low-blood-glucose-faqs"
    },
    {
      "id": "esc",
      "label": "ESC 2023: diabetes y riesgo cardiovascular",
      "url": "https://academic.oup.com/eurheartj/article/44/39/4043/7238227"
    },
    {
      "id": "gi",
      "label": "Universidad de Sídney: índice glucémico",
      "url": "https://glycemicindex.com/about-gi/"
    },
    {
      "id": "gifaq",
      "label": "Universidad de Sídney: preguntas sobre índice glucémico",
      "url": "https://glycemicindex.com/faqs/"
    },
    {
      "id": "lentils",
      "label": "Universidad de Sídney: índice glucémico de las lentejas",
      "url": "https://glycemicindex.com/2025/03/lentils/"
    },
    {
      "id": "saedyn",
      "label": "SAEDYN: ajuste de dosis de insulina (guía 2021)",
      "url": "https://guiapacientes.saedyn.es/pdfs/Conocer_mas_sobre_ajuste_de_dosis_de_insulina.pdf"
    }
  ],
  "quizzes": [
    {
      "id": "basica",
      "questions": [
        {
          "id": 1,
          "question": "¿Cómo debes conservar tu pluma de insulina una vez empezada?",
          "options": [
            "Congelarla para conservarla mejor.",
            "Todas las insulinas abiertas deben estar siempre entre 4 y 15 °C.",
            "Dejarla al sol si el día no es muy caluroso.",
            "Seguir su prospecto y protegerla del calor, la luz y la congelación."
          ],
          "correct": 3,
          "explanation": "La temperatura permitida depende de la insulina y la presentación. No existe un intervalo único para todas las plumas en uso.",
          "sources": [
            "tresiba",
            "novorapid"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 2,
          "question": "¿Cuánto tiempo puedes usar una insulina después de abrirla?",
          "options": [
            "Siempre 14 días.",
            "El tiempo indicado en el prospecto de esa insulina y presentación.",
            "Siempre 21 días.",
            "Siempre 28 días, aunque el prospecto diga otra cosa."
          ],
          "correct": 1,
          "explanation": "Anota la fecha de apertura. Algunas insulinas duran 4 semanas y otras, como Tresiba, hasta 8 semanas en uso, en las condiciones autorizadas.",
          "sources": [
            "tresiba",
            "novorapid"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 3,
          "question": "¿Qué debe hacer si la insulina ha sido congelada?",
          "options": [
            "Utilizarla",
            "Calentarse a temperatura adecuada",
            "Almacenarla a temperatura ambiente",
            "Desecharla"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Desecharla",
          "sources": [
            "ada6"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 4,
          "question": "¿Por qué debes usar una aguja nueva en cada inyección?",
          "options": [
            "Para aumentar la cantidad de insulina sin cambiar la dosis.",
            "Porque la aguja nueva hace innecesario rotar los puntos.",
            "Porque reutilizarla puede aumentar el dolor, dañar la aguja y favorecer obstrucciones o lesiones en la piel.",
            "Porque permite compartir la pluma."
          ],
          "correct": 2,
          "sources": [
            "fitter",
            "tresiba"
          ],
          "explanation": "Respuesta correcta: Porque reutilizarla puede aumentar el dolor, dañar la aguja y favorecer obstrucciones o lesiones en la piel.",
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 5,
          "question": "¿En qué tejido se debe inyectar la insulina con una pluma?",
          "options": [
            "En el músculo.",
            "En una vena.",
            "En el tejido graso subcutáneo, debajo de la piel.",
            "En cualquier tejido, sin diferencia."
          ],
          "correct": 2,
          "sources": [
            "fitter",
            "tresiba"
          ],
          "explanation": "Respuesta correcta: En el tejido graso subcutáneo, debajo de la piel.",
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 6,
          "question": "¿Cómo se debe proceder al elegir un área para inyectar insulina?",
          "options": [
            "Seleccionar un área y rotar sistemáticamente",
            "Escoger sin pensar",
            "Inyectar siempre en el mismo lugar",
            "Elegir cualquier parte del cuerpo"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Seleccionar un área y rotar sistemáticamente",
          "sources": [
            "ada6"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 7,
          "question": "¿Cuál es un factor de riesgo asociado a la reutilización de agujas?",
          "options": [
            "Aumento de la insulina",
            "Disminución de la efectividad",
            "Lipohipertrofia",
            "Cirugía innecesaria"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Lipohipertrofia",
          "sources": [
            "ada6"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 8,
          "question": "¿Qué debes comprobar para administrar correctamente la dosis con una pluma?",
          "options": [
            "Solo que haya insulina en la pluma.",
            "Que hayas hecho ejercicio antes.",
            "Solo la temperatura de la habitación.",
            "La insulina, su concentración, la dosis, la aguja nueva y la comprobación de flujo indicada por el fabricante."
          ],
          "correct": 3,
          "explanation": "Comprueba la etiqueta, la dosis y el funcionamiento de la pluma siguiendo su manual. La rotación protege el tejido, pero no sustituye estas comprobaciones.",
          "sources": [
            "tresiba",
            "fitter"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 9,
          "question": "¿Cuál es uno de los beneficios de la actividad física y el ejercicio en personas con diabetes?",
          "options": [
            "Mejora el control de la diabetes al disminuir el nivel de glucosa en sangre.",
            "Provoca un aumento de peso significativo.",
            "Reduce la sensibilidad a la insulina.",
            "Ayuda a aumentar los niveles de glucosa en sangre."
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Mejora el control de la diabetes al disminuir el nivel de glucosa en sangre.",
          "sources": [
            "ada6"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 10,
          "question": "Como referencia general, ¿cuánto ejercicio aeróbico de intensidad moderada se recomienda por semana a la mayoría de adultos con diabetes?",
          "options": [
            "30 minutos en total.",
            "Solo 15 minutos.",
            "Exactamente 300 minutos para todo el mundo.",
            "Al menos 150 minutos, repartidos durante la semana y adaptados a la persona."
          ],
          "correct": 3,
          "explanation": "La referencia habitual es al menos 150 minutos semanales de actividad moderada. Hay alternativas de actividad vigorosa y adaptaciones según la salud y la capacidad física.",
          "sources": [
            "ada5"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 11,
          "question": "¿Qué señal indica que un ejercicio está siendo de intensidad alta para ti?",
          "options": [
            "Respiras mucho más rápido y solo puedes decir unas pocas palabras seguidas.",
            "Respiras igual que estando en reposo.",
            "Puedes cantar cómodamente.",
            "No notas ningún esfuerzo."
          ],
          "correct": 0,
          "explanation": "La intensidad depende de la condición física. Una velocidad concreta, como 7 km/h, no representa el mismo esfuerzo para todas las personas.",
          "sources": [
            "ada5"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 12,
          "question": "¿Qué tipo de ejercicio es caminar a paso ligero de forma mantenida?",
          "options": [
            "Un ejercicio aeróbico.",
            "Un ejercicio exclusivamente de equilibrio.",
            "Un ejercicio exclusivamente de fuerza.",
            "Un ejercicio de meditación."
          ],
          "correct": 0,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Un ejercicio aeróbico.",
          "topic": "Actividad física"
        },
        {
          "id": 13,
          "question": "Si tienes retinopatía proliferativa o no proliferativa grave, ¿qué debes hacer antes de realizar ejercicio intenso?",
          "options": [
            "Suponer que cualquier ejercicio es seguro.",
            "Evitar caminar para siempre.",
            "Consultar las restricciones con tu equipo y evitar los esfuerzos contraindicados para tu caso.",
            "Hacer únicamente ejercicio al aire libre."
          ],
          "correct": 2,
          "explanation": "Las restricciones dependen del grado de retinopatía. En formas avanzadas, ciertos esfuerzos pueden aumentar el riesgo de hemorragia o desprendimiento de retina.",
          "sources": [
            "ada5"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 14,
          "question": "¿Cuáles son las características del ejercicio aeróbico recomendado?",
          "options": [
            "Actividades que usen grandes grupos musculares.",
            "Actividades cortas y no rítmicas.",
            "Actividades que no requieran esfuerzo.",
            "Actividades estáticas."
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Actividades que usen grandes grupos musculares.",
          "sources": [
            "ada6"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 15,
          "question": "¿Qué se considera un beneficio del ejercicio físico en la diabetes?",
          "options": [
            "Aumento de complicaciones cardiovasculares.",
            "Reducción de energía y motivación.",
            "Mejora de la autoestima y salud mental.",
            "Incremento de la resistencia a la insulina."
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Mejora de la autoestima y salud mental.",
          "sources": [
            "ada6"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 16,
          "question": "¿Con qué frecuencia se recomienda el ejercicio de fuerza a la mayoría de adultos con diabetes?",
          "options": [
            "Una vez al mes.",
            "Dos o tres sesiones por semana, en días no consecutivos y adaptadas a la persona.",
            "Todos los días con los mismos músculos, sin recuperación.",
            "Solo cuando suba la glucosa."
          ],
          "correct": 1,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Dos o tres sesiones por semana, en días no consecutivos y adaptadas a la persona.",
          "topic": "Actividad física"
        },
        {
          "id": 17,
          "question": "¿Qué hábito diario se recomienda además del ejercicio programado?",
          "options": [
            "Permanecer sentado el mayor tiempo posible.",
            "Evitar todas las actividades físicas.",
            "Moverse más e interrumpir los periodos prolongados de estar sentado.",
            "Hacer solo estiramientos una vez al mes."
          ],
          "correct": 2,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Moverse más e interrumpir los periodos prolongados de estar sentado.",
          "topic": "Actividad física"
        },
        {
          "id": 18,
          "question": "¿Qué se debe hacer antes, durante y después del ejercicio en pacientes con diabetes que reciben insulina?",
          "options": [
            "Descartar complicaciones vasculares.",
            "Programar una cena abundante.",
            "Monitorizar la glucemia.",
            "Aumentar la dosis de insulina siempre."
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Monitorizar la glucemia.",
          "sources": [
            "ada6"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 19,
          "question": "En una persona que usa insulina, ¿qué problema puede aparecer durante o después del ejercicio?",
          "options": [
            "Mejora de la autoestima.",
            "Hipoglucemia.",
            "Mejora del acondicionamiento físico.",
            "Mayor bienestar."
          ],
          "correct": 1,
          "sources": [
            "active",
            "ada5"
          ],
          "explanation": "Respuesta correcta: Hipoglucemia.",
          "topic": "Actividad física"
        },
        {
          "id": 20,
          "question": "Si usas insulina, ¿cómo puedes prevenir bajadas de glucosa relacionadas con el ejercicio?",
          "options": [
            "Vigilando la glucosa y ajustando hidratos o insulina según tu pauta, la actividad y la insulina activa.",
            "Aumentando siempre la dosis de insulina.",
            "Dejando de hacer cualquier ejercicio.",
            "Tomando siempre la misma cantidad de azúcar, sin medir la glucosa."
          ],
          "correct": 0,
          "explanation": "La necesidad de hidratos y los ajustes de insulina son individuales. El ejercicio puede producir bajadas también varias horas después.",
          "sources": [
            "active",
            "ada5"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 21,
          "question": "¿Qué tipo de ejercicio puede ayudar a aumentar la masa muscular en personas con diabetes?",
          "options": [
            "Ejercicio de resistencia muscular.",
            "Ejercicio aeróbico intenso.",
            "Ejercicio de estiramiento.",
            "Cualquier tipo de actividad ligera."
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Ejercicio de resistencia muscular.",
          "sources": [
            "ada6"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 22,
          "question": "¿Qué efecto puede tener el ejercicio regular sobre la sensibilidad a la insulina?",
          "options": [
            "Disminuye la sensibilidad a la insulina.",
            "Solo afecta a la insulina en ayunas.",
            "No tiene efecto sobre la insulina.",
            "Aumenta la sensibilidad a la insulina."
          ],
          "correct": 3,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Aumenta la sensibilidad a la insulina.",
          "topic": "Actividad física"
        },
        {
          "id": 23,
          "question": "¿Qué medida se debe tomar si presenta síntomas de alarma durante el ejercicio?",
          "options": [
            "Continuar hasta completar el ejercicio.",
            "Tomar un descanso y luego reiniciar sin cambios.",
            "Aumentar la intensidad del ejercicio.",
            "Interrumpir inmediatamente y buscar atención médica si es necesario."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Interrumpir inmediatamente y buscar atención médica si es necesario.",
          "sources": [
            "ada6"
          ],
          "topic": "Actividad física"
        },
        {
          "id": 24,
          "question": "Si usas insulina y vas a hacer ejercicio prolongado, ¿qué debes planificar?",
          "options": [
            "No descansar en ningún momento.",
            "Controles de glucosa, hidratación e hidratos o ajustes de insulina según tu pauta.",
            "Hacer siempre ejercicio de máxima intensidad.",
            "No beber agua."
          ],
          "correct": 1,
          "sources": [
            "active",
            "ada5"
          ],
          "explanation": "Respuesta correcta: Controles de glucosa, hidratación e hidratos o ajustes de insulina según tu pauta.",
          "topic": "Actividad física"
        },
        {
          "id": 25,
          "question": "¿Qué práctica se menciona como un factor que puede causar lipodistrofias relacionadas con la insulina?",
          "options": [
            "Inyectarse en tejido subcutáneo sano.",
            "Usar una aguja nueva.",
            "Repetir las inyecciones en los mismos puntos sin rotación.",
            "Rotar ordenadamente dentro de una misma zona."
          ],
          "correct": 2,
          "explanation": "Puedes usar una misma región, como el abdomen, cambiando sistemáticamente los puntos. No inyectes en bultos o zonas endurecidas.",
          "sources": [
            "fitter",
            "tresiba"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 26,
          "question": "¿Cómo se pueden detectar lipodistrofias?",
          "options": [
            "Solo mediante análisis de sangre.",
            "Solo cuando aparece dolor.",
            "Mediante radiografías.",
            "Mirando y palpando sistemáticamente las zonas de inyección."
          ],
          "correct": 3,
          "explanation": "La inspección y la palpación ayudan a detectar bultos, endurecimientos o cambios del tejido. No se trata de masajear la zona.",
          "sources": [
            "fitter"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 27,
          "question": "¿Qué situación puede hacer sospechar problemas de absorción por lipohipertrofia?",
          "options": [
            "Glucosas que varían sin explicación y bultos o endurecimientos en las zonas de inyección.",
            "Dormir mejor.",
            "Tener más apetito.",
            "Tener dolor de cabeza únicamente."
          ],
          "correct": 0,
          "explanation": "Las variaciones de glucosa no confirman por sí solas una lipohipertrofia. Es necesario revisar la técnica e inspeccionar y palpar las zonas.",
          "sources": [
            "fitter"
          ],
          "topic": "Insulina y técnica de inyección"
        },
        {
          "id": 28,
          "question": "¿Qué componente presente en legumbres, frutas y cereales integrales ayuda a moderar la absorción de hidratos de carbono?",
          "options": [
            "Proteínas",
            "Hidratos de carbono simples",
            "Fibra",
            "Grasas saturadas"
          ],
          "correct": 2,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Fibra",
          "topic": "Alimentación"
        },
        {
          "id": 29,
          "question": "¿Qué se debe hacer si los triglicéridos están elevados en una persona con diabetes?",
          "options": [
            "Revisar con el equipo la alimentación, el alcohol, el control de la glucosa y el tratamiento según el nivel de triglicéridos.",
            "Aumentar las grasas saturadas.",
            "Aumentar el azúcar para sustituir todas las grasas.",
            "No hacer ningún cambio."
          ],
          "correct": 0,
          "explanation": "No se recomienda eliminar todas las grasas como regla general. Los triglicéridos muy elevados pueden requerir restricciones específicas y tratamiento para prevenir pancreatitis.",
          "sources": [
            "ada10"
          ],
          "topic": "Alimentación"
        },
        {
          "id": 30,
          "question": "¿Cuáles son los dos tipos de complicaciones asociadas con la diabetes mellitus ?",
          "options": [
            "Temporales y permanentes",
            "Inmediatas y latentes",
            "Leves y severas",
            "Agudas y crónicas"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Agudas y crónicas",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 31,
          "question": "¿Cuál es una de las complicaciones agudas de la diabetes ?",
          "options": [
            "Hipertensión",
            "Hipoglucemia",
            "Insuficiencia renal",
            "Retinopatía."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Hipoglucemia",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 32,
          "question": "¿Qué situación puede alertar de riesgo de cetoacidosis y requiere seguir el plan de enfermedad y consultar?",
          "options": [
            "Una glucosa baja aislada.",
            "Tabaquismo sin cambios de glucosa.",
            "Colesterol alto sin otros síntomas.",
            "Glucosa elevada con cetonas, especialmente si hay vómitos o mal estado general."
          ],
          "correct": 3,
          "explanation": "La cetoacidosis implica cetonas y acidosis por falta de insulina. Puede aparecer sin glucosa muy elevada en determinadas situaciones.",
          "sources": [
            "tresiba",
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 33,
          "question": "¿Cuál es una complicación microvascular común en diabetes ?",
          "options": [
            "Infarto cerebral",
            "Infarto de miocardio",
            "Obstrucción de arterias",
            "Retinopatía diabética"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Retinopatía diabética",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 34,
          "question": "¿Qué puede provocar la nefropatía diabética?",
          "options": [
            "Problemas de visión",
            "Insuficiencia renal",
            "Amputaciones",
            "Infartos"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Insuficiencia renal",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 35,
          "question": "¿Qué afecta la neuropatía diabética?",
          "options": [
            "Vasos sanguíneos",
            "Nervios",
            "Riñones",
            "Corazón"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Nervios",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 36,
          "question": "¿Cuál es un síntoma común de la hipoglucemia?",
          "options": [
            "Pérdida de peso",
            "Náuseas",
            "Confusión.",
            "Dolor abdominal"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Confusión.",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 37,
          "question": "Si usas insulina, ¿qué riesgo puede aumentar el alcohol, sobre todo si bebes sin comer?",
          "options": [
            "Curar la diabetes.",
            "Sufrir hipoglucemia, incluso varias horas después.",
            "Dejar de necesitar controles de glucosa.",
            "Que desaparezcan todas las bajadas nocturnas."
          ],
          "correct": 1,
          "sources": [
            "active",
            "ada6"
          ],
          "explanation": "Respuesta correcta: Sufrir hipoglucemia, incluso varias horas después.",
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 38,
          "question": "¿Qué debes hacer ante una hipoglucemia si estás consciente y puedes tragar con seguridad?",
          "options": [
            "Administrarte más insulina.",
            "Tomar hidratos de absorción rápida y volver a medir la glucosa siguiendo tu pauta de tratamiento.",
            "Hacer ejercicio intenso.",
            "Esperar sin tratarla."
          ],
          "correct": 1,
          "explanation": "En muchos adultos se emplean 15 g de glucosa y una nueva comprobación a los 15 minutos. La pauta se adapta, por ejemplo, en niños o sistemas automatizados.",
          "sources": [
            "ada6"
          ],
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 39,
          "question": "¿Qué situaciones pueden desencadenar una cetoacidosis diabética?",
          "options": [
            "Beber agua y mantener la insulina pautada.",
            "Omitir o recibir insulina insuficiente, o tener una infección que aumente las necesidades de insulina.",
            "Rotar correctamente los puntos de inyección.",
            "Cambiar la aguja de la pluma."
          ],
          "correct": 1,
          "sources": [
            "tresiba"
          ],
          "explanation": "Respuesta correcta: Omitir o recibir insulina insuficiente, o tener una infección que aumente las necesidades de insulina.",
          "topic": "Complicaciones e hipoglucemia"
        },
        {
          "id": 40,
          "question": "Durante una hipoglucemia, ¿Qué debe hacerse si el paciente no puede tragar?",
          "options": [
            "No dar nada por boca, administrar el glucagón prescrito según su presentación y llamar al 112.",
            "Darle un vaso de zumo aunque no pueda tragar.",
            "Administrarle insulina rápida.",
            "Dejarlo solo hasta que se recupere."
          ],
          "correct": 0,
          "explanation": "Si no puede tragar con seguridad, no des alimentos ni bebidas por boca. La dosis y la técnica del glucagón dependen de la presentación; no todos son de 1 mg.",
          "sources": [
            "ada6",
            "glucagon"
          ],
          "topic": "Complicaciones e hipoglucemia"
        }
      ],
      "title": "Educación diabetológica básica",
      "description": "Insulina, ejercicio, prevención y complicaciones.",
      "pdf": "pdfs/diabetes/checklist-basica.pdf"
    },
    {
      "id": "avanzada",
      "questions": [
        {
          "id": 1,
          "question": "¿Qué es un calculador de bolo?",
          "options": [
            "Un medidor de glucemia que no requiere configuración.",
            "Un dispositivo que proporciona recomendaciones de dosis de insulina personalizadas.",
            "Un tipo de insulina de acción rápida.",
            "Un programa educativo para pacientes."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Un dispositivo que proporciona recomendaciones de dosis de insulina personalizadas.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 2,
          "question": "¿Qué tipo de pacientes son los potenciales usuarios del calculador de bolo?",
          "options": [
            "Pacientes con diabetes tipo 2 únicamente.",
            "Pacientes que no tienen miedo a las hipoglucemias.",
            "Personas sin diabetes.",
            "Pacientes en terapia basal-bolo que desean mejorar su control."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Pacientes en terapia basal-bolo que desean mejorar su control.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 3,
          "question": "¿Qué componente de un bolo ayuda a calcular el factor de sensibilidad a la insulina (FSI)?",
          "options": [
            "La insulina correctora para una glucosa elevada.",
            "La duración de la insulina activa.",
            "El número de raciones de hidratos de carbono.",
            "La insulina que cubre los hidratos de la comida."
          ],
          "correct": 0,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: La insulina correctora para una glucosa elevada.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 4,
          "question": "Para análogos rápidos, ¿qué regla orienta una estimación inicial del FSI en mg/dl por unidad, usando la dosis total diaria de insulina (DTI)?",
          "options": [
            "FSI = 1700 / DTI",
            "FSI = 1800 / DTI",
            "FSI = 1500 / DTI",
            "FSI = 2000 / DTI"
          ],
          "correct": 1,
          "explanation": "La regla 1800/DTI es una estimación inicial, no una dosis prescrita. Debe validarse y ajustarse según los datos de cada persona.",
          "sources": [
            "ucsf"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 5,
          "question": "¿Qué significa que queda insulina rápida activa después de un bolo?",
          "options": [
            "Que hace falta repetir exactamente la misma dosis.",
            "Que toda la insulina del día ya ha dejado de actuar.",
            "Que parte de la dosis anterior todavía puede bajar la glucosa.",
            "Que la insulina basal se ha convertido en rápida."
          ],
          "correct": 2,
          "explanation": "La insulina activa es el efecto remanente de dosis previas. La duración de acción es el tiempo utilizado para estimar ese efecto en el calculador.",
          "sources": [
            "active"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 6,
          "question": "En un ejemplo teórico sin insulina rápida previa activa, ¿cómo se calcula la dosis correctora si la glucosa supera el objetivo?",
          "options": [
            "Dosis de insulina prandial + FSI",
            "Gramos de HC / Ratio",
            "(Glucemia actual - Glucemia objetivo) / FSI",
            "Sumar insulina prandial e insulina activa."
          ],
          "correct": 2,
          "explanation": "La fórmula es (glucosa actual - objetivo)/FSI. En la práctica hay que considerar insulina activa, tendencia y el plan individual antes de una corrección.",
          "sources": [
            "ucsf",
            "active"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 7,
          "question": "¿Cómo se decide la duración de acción de la insulina rápida que se configura en el calculador?",
          "options": [
            "Según la insulina, el dispositivo y la pauta validada por el equipo; no hay un máximo universal de 4 horas.",
            "Siempre se fija en 2 horas.",
            "Siempre se fija en 1 hora si vas a comer.",
            "Se cambia al azar cada día."
          ],
          "correct": 0,
          "explanation": "La duración depende del producto y del contexto. NovoRapid tiene una duración de acción descrita de 3 a 5 horas. No debes reducir la duración para obtener más correcciones.",
          "sources": [
            "novorapid",
            "active"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 8,
          "question": "¿Qué datos deben estar correctamente registrados para una recomendación de bolo?",
          "options": [
            "Solo el agua que se ha bebido.",
            "Solo el peso del último mes.",
            "Solo los pasos diarios.",
            "Glucosa, hidratos previstos y dosis de insulina realmente administradas con sus horarios."
          ],
          "correct": 3,
          "sources": [
            "ucsf",
            "active"
          ],
          "explanation": "Respuesta correcta: Glucosa, hidratos previstos y dosis de insulina realmente administradas con sus horarios.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 9,
          "question": "¿Cuál es un factor que influye en la sensibilidad a la insulina?",
          "options": [
            "La hora del día.",
            "La cantidad de ejercicio realizada.",
            "La edad del paciente.",
            "Todas las anteriores."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Todas las anteriores.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 10,
          "question": "En este checklist, una ración equivale a 10 g de HC. ¿Qué representa un ratio expresado en unidades por ración?",
          "options": [
            "La necesidad de insulina por cada 100g de carbohidratos.",
            "El número de raciones que un paciente debe consumir.",
            "La dosis máxima de insulina permitida.",
            "La necesidad de insulina por cada ración de 10g de carbohidratos."
          ],
          "correct": 3,
          "sources": [
            "saedyn"
          ],
          "explanation": "Respuesta correcta: La necesidad de insulina por cada ración de 10g de carbohidratos.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 11,
          "question": "¿Cómo se denomina el rango de valores de glucemia antes de las comidas?",
          "options": [
            "Objetivo de glucosa posprandial.",
            "Cantidad diaria de hidratos.",
            "Solo glucosa al despertarse.",
            "Objetivo de glucosa preprandial."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Objetivo de glucosa preprandial.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 12,
          "question": "Si el ratio está expresado en unidades por ración de 10 g, ¿qué calcula «raciones de HC × ratio»?",
          "options": [
            "La dosis de insulina necesaria para corregir una hipoglucemia.",
            "La cantidad de glucosa que se ha consumido.",
            "La cantidad de insulina que cubre la comida.",
            "La insulina regular necesaria."
          ],
          "correct": 2,
          "explanation": "La multiplicación se usa cuando el ratio está expresado en unidades por ración. Si está en gramos por unidad, los gramos de HC se dividen entre el ratio.",
          "sources": [
            "ucsf",
            "saedyn"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 13,
          "question": "¿Qué datos se deben recopilar para configurar el calculador de bolo?",
          "options": [
            "Frecuencia de ejercicio y consumo de líquidos.",
            "FSI, Ratio, Objetivo de control, Tramos horarios, Insulina activa.",
            "Tipo de insulina y presupuesto mensual.",
            "Raciones de comida y número de comidas en días de descanso."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: FSI, Ratio, Objetivo de control, Tramos horarios, Insulina activa.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 14,
          "question": "¿Qué beneficio puede aportar un calculador de bolo correctamente configurado y utilizado?",
          "options": [
            "Ayudar a tomar decisiones con más confianza, sin eliminar el riesgo de hipoglucemia.",
            "Aumentar obligatoriamente el miedo a las bajadas.",
            "Garantizar que nunca habrá una bajada.",
            "Hacer innecesaria la educación diabetológica."
          ],
          "correct": 0,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Ayudar a tomar decisiones con más confianza, sin eliminar el riesgo de hipoglucemia.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 15,
          "question": "¿Qué se debe considerar al elegir la duración de la insulina activa?",
          "options": [
            "El costo de cada tipo de insulina.",
            "El tiempo que el paciente ha estado diagnosticado.",
            "Los alimentos que el paciente consume.",
            "El tipo de insulina utilizada."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: El tipo de insulina utilizada.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 16,
          "question": "¿Qué se debe hacer si el paciente no aporta datos de su glucemia para configurar las ratios?",
          "options": [
            "Se procede a la configuración manual.",
            "Se le solicitará que registre sus datos y los aporte más tarde en otra cita",
            "El calculador no puede ser utilizado.",
            "Se ignoran estos parámetros."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Se le solicitará que registre sus datos y los aporte más tarde en otra cita",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 17,
          "question": "Para seguir las recomendaciones del calculador de bolo, los pacientes deberían...",
          "options": [
            "Realizar mediciones diarias de azúcar.",
            "Registrar las raciones de carbohidratos y las dosis de insulina.",
            "Consultar solo una vez por semana.",
            "No realizar ningún registro."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Registrar las raciones de carbohidratos y las dosis de insulina.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 18,
          "question": "¿Qué se debe realizar tras recibir la recomendación del calculador de bolo?",
          "options": [
            "Dar por definitiva cualquier cifra, aunque los datos sean erróneos.",
            "Esperar siempre exactamente 15 minutos, cualquiera que sea la insulina.",
            "Revisar los datos, la insulina activa y la recomendación según la pauta acordada antes de administrar el bolo.",
            "Duplicar la dosis recomendada."
          ],
          "correct": 2,
          "sources": [
            "active",
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Revisar los datos, la insulina activa y la recomendación según la pauta acordada antes de administrar el bolo.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 19,
          "question": "¿De qué manera afecta el control posprandial al manejo de la diabetes?",
          "options": [
            "Incrementa los niveles de glucosa sin control.",
            "Es esencial para el control metabólico.",
            "No tiene impacto en el tratamiento.",
            "Complica el conteo de carbohidratos."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Es esencial para el control metabólico.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 20,
          "question": "¿Qué medición se aconseja realizar para alcanzar un mejor control en diabetes?",
          "options": [
            "Eliminar todos los hidratos de carbono.",
            "Vigilar la glucosa con la frecuencia acordada y revisar los patrones y ajustes con el equipo.",
            "Reducir la insulina por cuenta propia.",
            "Medir solo una vez al mes."
          ],
          "correct": 1,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Vigilar la glucosa con la frecuencia acordada y revisar los patrones y ajustes con el equipo.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 21,
          "question": "La \"Regla del 15\" se relaciona con...",
          "options": [
            "El tratamiento de hiperglucemia.",
            "La administración de insulina.",
            "El tratamiento de hipoglucemia.",
            "El conteo de carbohidratos."
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: El tratamiento de hipoglucemia.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 22,
          "question": "Ante un aumento en los niveles de glucosa, ¿Cuál sería el paso correcto a seguir?",
          "options": [
            "Inyectar insulina sin comprobar nada.",
            "Tomar azúcar automáticamente.",
            "No actuar aunque haya vómitos o somnolencia.",
            "Comprobar la glucosa y seguir el plan individual, considerando insulina activa, síntomas y cetonas cuando corresponda."
          ],
          "correct": 3,
          "sources": [
            "active",
            "ada6"
          ],
          "explanation": "Respuesta correcta: Comprobar la glucosa y seguir el plan individual, considerando insulina activa, síntomas y cetonas cuando corresponda.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 23,
          "question": "¿Qué resultado puede favorecer el uso adecuado de un calculador de bolo, junto con educación y seguimiento?",
          "options": [
            "Mejor control de los niveles de HbA1c.",
            "Incremento del miedo a las hipoglucemias.",
            "Aumento de la duración de las terapias.",
            "Más complicaciones en el tratamiento."
          ],
          "correct": 0,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Mejor control de los niveles de HbA1c.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 24,
          "question": "La \"duración\" de la insulina activa se refiere a...",
          "options": [
            "El tiempo que tarda la insulina en ser eliminada del cuerpo.",
            "La cantidad de insulina administrada durante cada día.",
            "El tiempo durante el cual la insulina tiene efecto.",
            "La duración total del tratamiento insulínico."
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: El tiempo durante el cual la insulina tiene efecto.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 25,
          "question": "¿Qué se entiende por \"Fenómeno del alba\" en diabetes?",
          "options": [
            "Un tipo de ejercicio.",
            "Un tipo de insulina.",
            "Una bajada de glucosa siempre causada por caminar.",
            "Una subida de glucosa al amanecer que no se explica por una comida o una hipoglucemia previa."
          ],
          "correct": 3,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Una subida de glucosa al amanecer que no se explica por una comida o una hipoglucemia previa.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 26,
          "question": "El Factor de Sensibilidad a la Insulina (FSI) se refiere a:",
          "options": [
            "La cantidad de insulina necesaria cada 24 horas",
            "El tiempo que tarda la insulina en actuar",
            "Glucemia que se disminuye al inyectar 1 UI de insulina rápida",
            "La frecuencia de las comidas"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Glucemia que se disminuye al inyectar 1 UI de insulina rápida",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 27,
          "question": "¿Qué es un bolo de insulina?",
          "options": [
            "Insulina necesaria para la ingesta y/o correctora",
            "Insulina que se administra por vía intravenosa",
            "Menor cantidad de insulina utilizada en el día",
            "El tipo de insulina de acción prolongada"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Insulina necesaria para la ingesta y/o correctora",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 28,
          "question": "Si aparece hiperglucemia marcada con vómitos, dolor abdominal o mal estado general, ¿qué debes hacer?",
          "options": [
            "Esperar hasta el día siguiente sin medir.",
            "Administrarte varias correcciones seguidas sin revisar la insulina activa.",
            "Seguir el plan de enfermedad, comprobar cetonas si está indicado y solicitar valoración urgente.",
            "Limitar el agua aunque puedas beber."
          ],
          "correct": 2,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Seguir el plan de enfermedad, comprobar cetonas si está indicado y solicitar valoración urgente.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 29,
          "question": "¿Cuál es una función principal del calculador de bolo?",
          "options": [
            "Determinar la comida sin introducir datos.",
            "Ayudar a calcular una recomendación con los parámetros y datos introducidos.",
            "Dar la misma dosis a todas las personas.",
            "Administrar siempre insulina de forma automática, aunque sea una app."
          ],
          "correct": 1,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Ayudar a calcular una recomendación con los parámetros y datos introducidos.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 30,
          "question": "En diabetes tipo 1, si la glucosa supera 250 mg/dl de forma persistente o hay enfermedad, ¿qué comprobación puede indicar tu plan?",
          "options": [
            "La medición de cetonemia capilar",
            "La medición de glucosa en orina",
            "El ajuste de dosis de insulina",
            "Contar los carbohidratos ingeridos"
          ],
          "correct": 0,
          "explanation": "La vigilancia de cetonas depende del riesgo y del plan individual. Con síntomas de cetosis, especialmente con iSGLT2, pueden necesitarse controles incluso con glucosa menos elevada.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 31,
          "question": "Las situaciones que podrían causar hipoglucemia leve incluyen:",
          "options": [
            "Recibir más insulina de la necesaria para la ingesta o la actividad, por ejemplo al comer menos o hacer ejercicio sin ajustar.",
            "Hacer siempre comidas muy abundantes.",
            "Usar una aguja nueva.",
            "Beber agua según la sed."
          ],
          "correct": 0,
          "sources": [
            "active"
          ],
          "explanation": "Respuesta correcta: Recibir más insulina de la necesaria para la ingesta o la actividad, por ejemplo al comer menos o hacer ejercicio sin ajustar.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 32,
          "question": "Ante una hipoglucemia, si se presenta pérdida de conciencia:",
          "options": [
            "Es necesaria la ayuda inmediata de otra persona",
            "Se debe administrar más insulina",
            "No es obligatorio hacer nada",
            "Se debe inducir al paciente a beber agua"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Es necesaria la ayuda inmediata de otra persona",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 33,
          "question": "La importancia del conocimiento sobre la alimentación radica en:",
          "options": [
            "Ajustar la dosis de insulina más efectivamente",
            "Ignorar las raciones de carbohidratos",
            "Reducir la cantidad de carbohidratos a consumir",
            "Aumentar el consumo calórico sin control"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Ajustar la dosis de insulina más efectivamente",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 34,
          "question": "¿Qué recomendación puede proporcionar un calculador de bolo configurado correctamente?",
          "options": [
            "La cantidad exacta de grasa corporal.",
            "Un diagnóstico de diabetes sin análisis.",
            "Una estimación de la dosis de insulina rápida para la comida y/o la corrección.",
            "La presión arterial sin medirla."
          ],
          "correct": 2,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Una estimación de la dosis de insulina rápida para la comida y/o la corrección.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 35,
          "question": "¿Qué conjunto de parámetros debe validar el equipo para configurar el calculador?",
          "options": [
            "Solo la glucosa de una mañana.",
            "Objetivo de glucosa, FSI, ratio de HC, duración de acción y tramos horarios cuando proceda.",
            "Solo el nombre y apellido.",
            "Solo la fecha de la última revisión."
          ],
          "correct": 1,
          "sources": [
            "ucsf",
            "active"
          ],
          "explanation": "Respuesta correcta: Objetivo de glucosa, FSI, ratio de HC, duración de acción y tramos horarios cuando proceda.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 36,
          "question": "¿Cómo se genera una recomendación automática de insulina?",
          "options": [
            "Solo con el nivel de glucosa",
            "Utilizando datos de una base de datos externa",
            "Por petición del usuario",
            "Basada en el nivel de glucosa, carbohidratos y insulina activa"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Basada en el nivel de glucosa, carbohidratos y insulina activa",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 37,
          "question": "¿Qué dato utiliza la regla 1800/DTI para estimar inicialmente el FSI?",
          "options": [
            "Solo la fecha de nacimiento",
            "Los meses de tratamiento",
            "La cantidad total de insulina diaria",
            "La edad y el peso del usuario"
          ],
          "correct": 2,
          "explanation": "DTI es la suma de la insulina basal y los bolos diarios. La estimación se revisa con patrones reales de glucosa.",
          "sources": [
            "ucsf"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 38,
          "question": "Una vez que el equipo ha validado los parámetros y los has revisado, ¿qué debes hacer en la app para conservar esa configuración?",
          "options": [
            "Volver a cambiarlos al azar.",
            "Reiniciar sin guardar.",
            "Enviar las claves de acceso a soporte.",
            "Guardar la configuración y comprobar que se ha conservado."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Guardar la configuración y comprobar que se ha conservado.",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 39,
          "question": "¿Para qué se utiliza el Ratio Carbohidratos/Insulina?",
          "options": [
            "Para cuantificar el consumo de agua",
            "Para calcular la dosis de insulina rápida necesaria",
            "Para medir la actividad física",
            "Para seguir la dieta de grasas"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Para calcular la dosis de insulina rápida necesaria",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 40,
          "question": "¿Qué se debe verificar antes de guardar la configuración?",
          "options": [
            "La fecha de nacimiento únicamente",
            "Que toda la información sea correcta",
            "Solo la insulina utilizada",
            "Los niveles de glucosa anteriores"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Que toda la información sea correcta",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 41,
          "question": "¿Qué se debe hacer si tienes dudas sobre la información a introducir?",
          "options": [
            "Consultar con un amigo",
            "Contestar al cuestionario por intuición",
            "Consultar con tu profesional sanitario",
            "Ignorarlo y continuar"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Consultar con tu profesional sanitario",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 42,
          "question": "¿Qué es el objetivo glucémico?",
          "options": [
            "La cantidad total de insulina del día.",
            "El valor o intervalo de glucosa acordado con el equipo para una situación concreta.",
            "Los hidratos que se deben comer al día.",
            "El nombre de un medicamento."
          ],
          "correct": 1,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: El valor o intervalo de glucosa acordado con el equipo para una situación concreta.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 43,
          "question": "¿Qué debe hacer si tiene cambios en el objetivo glucémico a lo largo del día en el calculador de bolos?",
          "options": [
            "No hacer nada",
            "Modificar el objetivo automáticamente",
            "Configurar cada tramo de forma individual",
            "Eliminar el dato del objetivo"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Configurar cada tramo de forma individual",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 44,
          "question": "¿Por qué es necesario seleccionar el modo de contar los hidratos de carbono?",
          "options": [
            "Porque afecta la recomendación de insulina",
            "Porque es irrelevante para la configuración",
            "Porque solo se puede hacer en un idioma específico",
            "Porque no tiene impacto en el cálculo"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Porque afecta la recomendación de insulina",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 45,
          "question": "¿Qué conclusión se puede hacer sobre la importancia de los datos para el Calculador?",
          "options": [
            "Los datos deben ser precisos para un buen funcionamiento",
            "Los datos no son importantes",
            "Los datos son opcionales",
            "Los errores son aceptables en esta aplicación"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Los datos deben ser precisos para un buen funcionamiento",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 46,
          "question": "¿Qué afecta la configuración incorrecta en el Calculador de Bolo?",
          "options": [
            "Puede resultar en dosis de insulina incorrectas",
            "Nada, siempre se puede ajustar después",
            "No afecta el registro de datos",
            "Genera un error fatal en la aplicación"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Puede resultar en dosis de insulina incorrectas",
          "sources": [
            "ada6"
          ],
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 47,
          "question": "¿Qué acción es necesaria después de recibir recomendaciones de insulina?",
          "options": [
            "Eliminar todas las dosis previas del registro.",
            "Ignorar siempre todas las recomendaciones.",
            "Revisar los datos y confirmar que la recomendación encaja con la pauta acordada; consultar si hay dudas.",
            "Administrar cualquier cifra sin comprobarla."
          ],
          "correct": 2,
          "sources": [
            "ucsf",
            "active"
          ],
          "explanation": "Respuesta correcta: Revisar los datos y confirmar que la recomendación encaja con la pauta acordada; consultar si hay dudas.",
          "topic": "Calculador de bolo e insulina activa"
        },
        {
          "id": 48,
          "question": "¿Cómo se valora el riesgo cardiovascular de una persona con diabetes?",
          "options": [
            "Siempre es bajo.",
            "Siempre es moderado.",
            "Siempre es alto, sin excepciones.",
            "Se individualiza según antecedentes, daño de órganos y otros factores de riesgo."
          ],
          "correct": 3,
          "sources": [
            "esc",
            "ada10"
          ],
          "explanation": "Respuesta correcta: Se individualiza según antecedentes, daño de órganos y otros factores de riesgo.",
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 49,
          "question": "¿Cuál de las siguientes es una complicación cardiovascular grave asociada a la diabetes?",
          "options": [
            "Un infarto de miocardio.",
            "Una contractura muscular.",
            "Un catarro común.",
            "Una alergia al polen."
          ],
          "correct": 0,
          "sources": [
            "ada10"
          ],
          "explanation": "Respuesta correcta: Un infarto de miocardio.",
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 50,
          "question": "Para muchos adultos no embarazados con diabetes, ¿cuál es una referencia habitual de objetivo de HbA1c, siempre individualizada?",
          "options": [
            "Exactamente 5 % para todo el mundo.",
            "Menos del 7 %, si puede alcanzarse de forma segura y es adecuado para esa persona.",
            "Más del 8 % para todo el mundo.",
            "No existe relación con el seguimiento de la diabetes."
          ],
          "correct": 1,
          "explanation": "Un objetivo de tratamiento no es lo mismo que un valor normal en alguien sin diabetes. Puede ser más o menos estricto según la situación.",
          "sources": [
            "ada6"
          ],
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 51,
          "question": "¿Qué se debe evitar para prevenir problemas en los pies diabéticos?",
          "options": [
            "Usar zapatos ajustados y fumar.",
            "Realizar actividad física adaptada.",
            "Inspeccionar los pies a diario.",
            "Lavar los pies y secarlos cuidadosamente."
          ],
          "correct": 0,
          "sources": [
            "ada10"
          ],
          "explanation": "Respuesta correcta: Usar zapatos ajustados y fumar.",
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 52,
          "question": "¿Cómo se puede definir la retinopatía diabética?",
          "options": [
            "Una contractura del párpado.",
            "Daño de la retina relacionado con la diabetes.",
            "Una infección de la piel del pie.",
            "Una lesión del oído."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Daño de la retina relacionado con la diabetes.",
          "sources": [
            "ada6"
          ],
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 53,
          "question": "¿Qué cuidados diarios se recomiendan para el pie diabético?",
          "options": [
            "Dejar que la piel se reseque",
            "Usar zapatos ajustados y tacones altos",
            "No preocuparme por los callos",
            "Inspeccionar los pies todos los días"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Inspeccionar los pies todos los días",
          "sources": [
            "ada6"
          ],
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 54,
          "question": "¿Cuál es la relación entre diabetes y enfermedades cardiovasculares?",
          "options": [
            "Son irrelevantes entre sí",
            "Las enfermedades cardiovasculares aumentan el riesgo de diabetes",
            "La diabetes aumenta el riesgo cardiovascular",
            "Ambos son independientes"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: La diabetes aumenta el riesgo cardiovascular",
          "sources": [
            "ada6"
          ],
          "topic": "Prevención y complicaciones"
        },
        {
          "id": 55,
          "question": "¿Qué se debe hacer cuando se nota una lesión en los pies diabéticos?",
          "options": [
            "Tratar de curarla en casa sin consultar",
            "Hacer un análisis de sangre",
            "Aguantar el dolor",
            "Consultar a un médico inmediatamente"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Consultar a un médico inmediatamente",
          "sources": [
            "ada6"
          ],
          "topic": "Prevención y complicaciones"
        }
      ],
      "title": "Educación diabetológica avanzada",
      "description": "Calculador de bolo, insulina activa y decisiones seguras.",
      "pdf": "pdfs/diabetes/checklist-avanzada.pdf"
    },
    {
      "id": "hidratos",
      "questions": [
        {
          "id": 1,
          "question": "¿Cuál es uno de los beneficios del conteo de carbohidratos ?",
          "options": [
            "Permite más flexibilidad en las comidas.",
            "Permite una dieta fija.",
            "Elimina la necesidad de insulina.",
            "Reduce la cantidad de alimentos consumidos."
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Permite más flexibilidad en las comidas.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 2,
          "question": "En un alimento envasado, ¿qué información es especialmente útil para contar sus hidratos de carbono?",
          "options": [
            "Solo la publicidad del envase.",
            "La etiqueta nutricional, teniendo en cuenta la cantidad que vas a comer.",
            "Solo el color del paquete.",
            "Solo las calorías."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: La etiqueta nutricional, teniendo en cuenta la cantidad que vas a comer.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 3,
          "question": "¿Qué herramientas pueden ayudarte a aprender a estimar las cantidades de alimentos?",
          "options": [
            "Tablas o etiquetas con información de hidratos.",
            "Una báscula de cocina.",
            "Medidas caseras previamente comprobadas, como tazas.",
            "Todas las anteriores."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Todas las anteriores.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 4,
          "question": "¿Qué herramienta permite medir con precisión el peso de la porción de alimento?",
          "options": [
            "Contar las piezas sin considerar su tamaño.",
            "Mirar solo el precio.",
            "Una báscula de cocina.",
            "Estimar siempre a ojo."
          ],
          "correct": 2,
          "explanation": "El peso por sí solo no indica los gramos de HC: se combina con la etiqueta o una tabla fiable y se distingue entre alimento crudo y cocinado.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 5,
          "question": "¿Por qué se sugiere crear una base de datos personal para el conteo de carbohidratos?",
          "options": [
            "Para reducir el costo de alimentos.",
            "Para hacer dieta.",
            "Para evitar la compra de alimentos innecesarios.",
            "Para tener un registro de alimentos similares consumidos frecuentemente."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Para tener un registro de alimentos similares consumidos frecuentemente.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 6,
          "question": "¿Cuál es el enfoque principal del conteo de carbohidratos?",
          "options": [
            "Limitar azúcares y calorías.",
            "Contar carbohidratos.",
            "Usar un sistema de alimentos equivalentes.",
            "Reducir la ingesta de alimentos."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Contar carbohidratos.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 7,
          "question": "¿Qué aspecto del conteo de carbohidratos puede llevar a hiperglucemia?",
          "options": [
            "La falta de práctica.",
            "La necesidad de consumir menos azúcares.",
            "Usar fórmulas complejas.",
            "Conteo de carbohidratos poco preciso."
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Conteo de carbohidratos poco preciso.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 8,
          "question": "Si se calcula la insulina de una comida según sus HC, ¿qué error puede empeorar la glucosa después de comer?",
          "options": [
            "Comprobar la etiqueta.",
            "Pesar la porción cuando sea necesario.",
            "Contar incorrectamente los hidratos y calcular una dosis que no corresponde a la comida.",
            "Pedir ayuda al equipo si hay dudas."
          ],
          "correct": 2,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Contar incorrectamente los hidratos y calcular una dosis que no corresponde a la comida.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 9,
          "question": "En el conteo de carbohidratos, ¿Qué se debe tomar en cuenta al leer etiquetas?",
          "options": [
            "El contenido de azúcares solamente.",
            "Los ingredientes presentados.",
            "La cantidad total de carbohidratos.",
            "El precio del producto."
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: La cantidad total de carbohidratos.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 10,
          "question": "¿Qué relación existe entre el conteo de carbohidratos y la hipoglucemia?",
          "options": [
            "El conteo de carbohidratos es irrelevante para la hipoglucemia.",
            "El conteo de carbohidratos impreciso puede causar hipoglucemia.",
            "La hipoglucemia no guarda relación en el conteo de carbohidratos",
            "No hay relación entre los dos"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: El conteo de carbohidratos impreciso puede causar hipoglucemia.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 11,
          "question": "¿Qué se debe tener en cuenta al practicar el conteo de carbohidratos en casa?",
          "options": [
            "Solo practicar con alimentos empaquetados.",
            "Usar diferentes artículos de la casa para entrenar la estimación de porciones.",
            "Enfocarse en teorías y métodos complejos.",
            "No es necesario practicar en casa."
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Usar diferentes artículos de la casa para entrenar la estimación de porciones.",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 12,
          "question": "¿Cómo puede ayudar un conteo de HC más preciso al control de la diabetes?",
          "options": [
            "No tiene ninguna utilidad.",
            "Elimina la necesidad de controles de glucosa.",
            "Puede mejorar el ajuste de la insulina y el control de la HbA1c, junto con el resto del tratamiento.",
            "Garantiza una HbA1c perfecta sin seguimiento."
          ],
          "correct": 2,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Puede mejorar el ajuste de la insulina y el control de la HbA1c, junto con el resto del tratamiento.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 13,
          "question": "¿Cómo se llama el conteo que utiliza una relación insulina/HC para calcular la insulina de la comida?",
          "options": [
            "Conteo sin considerar la insulina.",
            "Dieta sin hidratos de carbono.",
            "Conteo de calorías solamente.",
            "Conteo avanzado de hidratos de carbono."
          ],
          "correct": 3,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Conteo avanzado de hidratos de carbono.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 14,
          "question": "En un ejemplo teórico, si 1 unidad cubre 20 g de HC, ¿cuántas unidades cubrirían 40 g, sin añadir corrección?",
          "options": [
            "1 unidad",
            "3 unidades",
            "2 unidades",
            "4 unidades"
          ],
          "correct": 2,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: 2 unidades",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 15,
          "question": "En el sistema de raciones de 10 g utilizado en este checklist, ¿cuántos gramos de HC contiene una ración?",
          "options": [
            "5 gramos",
            "10 gramos",
            "15 gramos",
            "20 gramos"
          ],
          "correct": 1,
          "explanation": "Aquí se utiliza 1 ración = 10 g de HC. Otros países o aplicaciones pueden emplear equivalencias diferentes; comprueba siempre la configuración.",
          "sources": [
            "saedyn"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 16,
          "question": "¿Qué información se encuentra en las etiquetas nutricionales?",
          "options": [
            "Solo la cantidad de azúcares",
            "La cantidad de carbohidratos en gramos",
            "La cantidad de proteínas y grasas, pero no carbohidratos",
            "Instrucciones de uso"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: La cantidad de carbohidratos en gramos",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 17,
          "question": "¿Qué se debe hacer si un paquete de pasta indica que contiene 35 gramos de carbohidratos por cada 100 gramos?",
          "options": [
            "Consumir todo el paquete",
            "Ignorar la etiqueta",
            "Calcular la cantidad proporcional dependiendo de lo que se consuma",
            "Únicamente consumir raciones"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Calcular la cantidad proporcional dependiendo de lo que se consuma",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 18,
          "question": "En un ejemplo, 2 unidades de insulina cubren 20 g de HC. ¿Qué relación representa?",
          "options": [
            "1:5",
            "1:15",
            "1:10",
            "1:20"
          ],
          "correct": 2,
          "explanation": "20 g divididos entre 2 unidades son 10 g por unidad: 1:10. Es un ejemplo educativo, no una pauta de tratamiento.",
          "sources": [
            "ucsf"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 19,
          "question": "¿Qué es una ración en el contexto de carbohidratos?",
          "options": [
            "Una cantidad de carbohidratos estandarizada",
            "Una medida de calorías",
            "Una recomendación de actividad física",
            "Un tipo de alimento."
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Una cantidad de carbohidratos estandarizada",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 20,
          "question": "Para calcular la insulina que cubre los HC de una comida, ¿qué dato necesitas además de los gramos de HC?",
          "options": [
            "La relación insulina/HC pautada para ese momento.",
            "Solo las calorías del día.",
            "Solo el número de pasos.",
            "Solo las horas de sueño."
          ],
          "correct": 0,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: La relación insulina/HC pautada para ese momento.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 21,
          "question": "En un cálculo de insulina para una comida, ¿qué revisión es más completa?",
          "options": [
            "Considerar solo el agua bebida.",
            "Revisar HC, glucosa, insulina activa y actividad prevista según el plan individual.",
            "Considerar únicamente la hora del reloj.",
            "Ignorar las dosis previas."
          ],
          "correct": 1,
          "sources": [
            "ucsf",
            "active"
          ],
          "explanation": "Respuesta correcta: Revisar HC, glucosa, insulina activa y actividad prevista según el plan individual.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 22,
          "question": "¿Qué permite al usuario del contaje avanzado tener flexibilidad en la comida?",
          "options": [
            "El tiempo de las comidas",
            "La cantidad de calorías",
            "El tipo de carbohidratos",
            "La relación insulina/carbohidratos"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: La relación insulina/carbohidratos",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 23,
          "question": "¿Qué representa una relación insulina/carbohidratos de 1:10?",
          "options": [
            "Diez unidades por cada gramo de HC.",
            "Una unidad de insulina por 10 gramos de HC.",
            "Una unidad por 100 gramos de HC.",
            "Diez gramos de proteína por unidad de insulina."
          ],
          "correct": 1,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Una unidad de insulina por 10 gramos de HC.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 24,
          "question": "Para calcular la insulina que cubre los HC de una comida, ¿qué relación se utiliza?",
          "options": [
            "La relación insulina/carbohidratos",
            "La relación de calorías",
            "La cantidad de ejercicio",
            "La cantidad de grasas consumidas."
          ],
          "correct": 0,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: La relación insulina/carbohidratos",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 25,
          "question": "¿Cuál puede ser una meta al contar carbohidratos con éxito?",
          "options": [
            "Bajar de peso rápidamente",
            "No comer en absoluto",
            "Consumir más carbohidratos",
            "Establecer una dosis óptima de insulina"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Establecer una dosis óptima de insulina",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 26,
          "question": "En el sistema de raciones utilizado en este checklist, ¿a cuántos gramos de HC equivale una ración?",
          "options": [
            "15 gramos",
            "10 gramos",
            "30 gramos",
            "25 gramos"
          ],
          "correct": 1,
          "sources": [
            "saedyn"
          ],
          "explanation": "Respuesta correcta: 10 gramos",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 27,
          "question": "Si comes más HC de los previstos y usas una pauta ajustada por relación insulina/HC, ¿qué puede ocurrir?",
          "options": [
            "Puede aumentar la insulina necesaria para cubrir la comida, siguiendo tu pauta y considerando el resto de factores.",
            "Nunca cambia la necesidad de insulina.",
            "Siempre debes compensarlo con ejercicio intenso.",
            "Siempre debes omitir la siguiente comida."
          ],
          "correct": 0,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Puede aumentar la insulina necesaria para cubrir la comida, siguiendo tu pauta y considerando el resto de factores.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 28,
          "question": "¿Qué afirmación es correcta sobre la relación insulina/HC?",
          "options": [
            "Debe ser idéntica para todas las personas.",
            "Cambia obligatoriamente solo por la estación del año.",
            "Se elige por los antojos de cada día.",
            "Puede variar según la hora y las circunstancias; se revisa con el equipo usando los patrones de glucosa."
          ],
          "correct": 3,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Puede variar según la hora y las circunstancias; se revisa con el equipo usando los patrones de glucosa.",
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 29,
          "question": "¿Qué es esencial al leer las etiquetas de productos para contar carbohidratos?",
          "options": [
            "La talla del paquete",
            "El contenido total de grasa",
            "La fecha de caducidad",
            "La cantidad de carbohidratos por porción o gramos"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: La cantidad de carbohidratos por porción o gramos",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 30,
          "question": "¿Cuál es el objetivo principal de contar carbohidratos?",
          "options": [
            "Mejorar la variedad de la dieta",
            "Controlar los niveles de glucosa en sangre",
            "Reducir la cantidad de insulina diariamente",
            "Aumentar la ingesta de proteínas"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Controlar los niveles de glucosa en sangre",
          "sources": [
            "ada5"
          ],
          "topic": "Conteo, etiquetas y raciones"
        },
        {
          "id": 31,
          "question": "Cuando el páncreas conserva su función, ¿qué hormona ayuda a regular la subida de glucosa tras comer?",
          "options": [
            "Insulina",
            "Glucosa",
            "Adrenalina",
            "Cortisol"
          ],
          "correct": 0,
          "explanation": "En diabetes tipo 1 la producción de insulina es insuficiente o está ausente, por lo que se necesita insulina administrada como tratamiento.",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 32,
          "question": "¿Qué riesgo se asocia a mantener glucosas elevadas después de las comidas de forma repetida?",
          "options": [
            "Desnutrición",
            "Hipoglucemia",
            "Incremento de peso",
            "Desarrollo de complicaciones"
          ],
          "correct": 3,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Desarrollo de complicaciones",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 33,
          "question": "¿Qué fuentes de HC conviene priorizar dentro de una alimentación equilibrada?",
          "options": [
            "Bebidas azucaradas como base de la dieta.",
            "Dulces sin considerar la cantidad.",
            "Legumbres, cereales integrales, fruta entera y otras fuentes con fibra y poco procesamiento.",
            "Alimentos refinados solo porque contienen almidón."
          ],
          "correct": 2,
          "explanation": "La calidad depende del alimento completo, la fibra y el procesamiento, no solo de clasificar el HC como simple o complejo.",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 34,
          "question": "Si se ingieren más HC de los que cubre la dosis pautada, ¿qué puede ocurrir?",
          "options": [
            "Una bajada obligatoria de glucosa.",
            "Una subida de glucosa tras la comida.",
            "Pérdida de peso inmediata.",
            "Que deje de ser necesario medir la glucosa."
          ],
          "correct": 1,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Una subida de glucosa tras la comida.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 35,
          "question": "¿Cuál es la función de la insulina de acción rápida?",
          "options": [
            "Cubrir por sí sola las necesidades basales de todo el día.",
            "Controlar exclusivamente el apetito.",
            "Eliminar la necesidad de calcular los HC.",
            "Ayudar a cubrir la subida de glucosa de la comida y/o corregir una glucosa elevada según la pauta."
          ],
          "correct": 3,
          "explanation": "La rápida no actúa de forma instantánea. El inicio y la duración dependen de la insulina utilizada.",
          "sources": [
            "novorapid",
            "ucsf"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 36,
          "question": "¿Cómo puede influir una comida rica en grasa en la respuesta de glucosa?",
          "options": [
            "Puede retrasar el vaciamiento del estómago y producir una subida más tardía de glucosa.",
            "Siempre acelera la digestión de todos los HC.",
            "Nunca tiene efecto.",
            "Hace innecesaria la insulina."
          ],
          "correct": 0,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Puede retrasar el vaciamiento del estómago y producir una subida más tardía de glucosa.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 37,
          "question": "¿Cuál es un ejemplo de alimento con HC y fibra que puede formar parte de una alimentación saludable?",
          "options": [
            "Azúcar de mesa.",
            "Lentejas cocidas.",
            "Refresco azucarado.",
            "Caramelos."
          ],
          "correct": 1,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Lentejas cocidas.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 38,
          "question": "¿Qué efecto puede tener la fibra de los alimentos sobre la respuesta de glucosa?",
          "options": [
            "Ayudar a moderar la absorción de HC y la subida de glucosa.",
            "Aumentarla siempre de forma inmediata.",
            "Garantizar pérdida de peso sin otros cambios.",
            "Sustituir por completo la insulina."
          ],
          "correct": 0,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Ayudar a moderar la absorción de HC y la subida de glucosa.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 39,
          "question": "¿Cuál es el objetivo al aprender a contar los carbohidratos?",
          "options": [
            "Eliminar todos los carbohidratos de la dieta",
            "Manejar la cantidad de insulina",
            "Mejorar el sabor de los alimentos",
            "Reducir las calorías consumidas"
          ],
          "correct": 1,
          "explanation": "Respuesta correcta: Manejar la cantidad de insulina",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 40,
          "question": "¿Qué describe el índice glucémico (IG) de un alimento?",
          "options": [
            "Solo su contenido de fibra.",
            "Su cantidad de grasa.",
            "Los gramos totales de HC de cualquier porción.",
            "La respuesta de glucosa que produce frente a una referencia, comparando la misma cantidad de HC disponibles."
          ],
          "correct": 3,
          "sources": [
            "gi"
          ],
          "explanation": "Respuesta correcta: La respuesta de glucosa que produce frente a una referencia, comparando la misma cantidad de HC disponibles.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 41,
          "question": "¿Qué función cumple la insulina basal?",
          "options": [
            "Cubrir únicamente los HC de una comida.",
            "Sustituir siempre los bolos de una persona con diabetes tipo 1.",
            "Cubrir las necesidades de insulina entre comidas y durante la noche, con la frecuencia pautada para cada producto.",
            "Corregir de inmediato cualquier glucosa elevada."
          ],
          "correct": 2,
          "explanation": "No todas las insulinas basales se administran con la misma frecuencia. Se sigue la pauta del producto y del equipo.",
          "sources": [
            "tresiba"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 42,
          "question": "¿Cómo se decide el momento de administrar la insulina rápida de una comida?",
          "options": [
            "Siempre varias horas después, sin mirar la glucosa.",
            "Según el tipo de insulina, la glucosa, la comida y la pauta del equipo; habitualmente se administra antes de comer.",
            "Solo por la noche.",
            "No es necesario tener una pauta."
          ],
          "correct": 1,
          "sources": [
            "novorapid"
          ],
          "explanation": "Respuesta correcta: Según el tipo de insulina, la glucosa, la comida y la pauta del equipo; habitualmente se administra antes de comer.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 43,
          "question": "¿Qué es el Ratio en el conteo de carbohidratos?",
          "options": [
            "Cuánto carbohidrato cubre una unidad de insulina",
            "Cuánto insulina se necesita para mantener el nivel de glucosa",
            "El número de calorías en una porción de alimento",
            "El porcentaje de grasa en la dieta"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Cuánto carbohidrato cubre una unidad de insulina",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 44,
          "question": "¿Cuál de estos alimentos suele tener un índice glucémico bajo?",
          "options": [
            "Lentejas cocidas.",
            "Pan blanco.",
            "Glucosa pura.",
            "Cereales de maíz inflados."
          ],
          "correct": 0,
          "explanation": "Las lentejas son un ejemplo de alimento con HC y bajo IG. A las verduras de hoja, con muy pocos HC disponibles, no se les asigna un IG medido del mismo modo.",
          "sources": [
            "lentils",
            "gifaq"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 45,
          "question": "¿En qué consiste la terapia basal bolo?",
          "options": [
            "Uso exclusivo de insulina de acción prolongada",
            "Combinación de proteínas y carbohidratos",
            "Un solo tipo de insulina todos los días",
            "Combinación de insulina basal y de acción rápida"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Combinación de insulina basal y de acción rápida",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 46,
          "question": "¿Qué indica una glucosa elevada después de las comidas que se repite con frecuencia?",
          "options": [
            "Que conviene revisar los patrones y el plan, porque la hiperglucemia mantenida aumenta el riesgo de complicaciones.",
            "Que el tratamiento ya no necesita revisión.",
            "Que los controles no son necesarios.",
            "Que se deben eliminar todos los HC para siempre."
          ],
          "correct": 0,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: Que conviene revisar los patrones y el plan, porque la hiperglucemia mantenida aumenta el riesgo de complicaciones.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 47,
          "question": "¿Qué se debe hacer para ajustar la dosis de insulina?",
          "options": [
            "Registrar los niveles de glucosa antes y después de las comidas",
            "Modificar la cantidad de carbohidratos sin vigilancia",
            "Ignorar los carbohidratos por completo",
            "Aplicar insulina regularmente sin cambios"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Registrar los niveles de glucosa antes y después de las comidas",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 48,
          "question": "¿Cómo puede ayudar conocer el índice glucémico, junto con la cantidad de HC y el resto de la comida?",
          "options": [
            "Puede ayudar a elegir alimentos y entender la respuesta de glucosa.",
            "Permite ignorar la cantidad que se come.",
            "Garantiza que nunca habrá una bajada.",
            "Permite eliminar la necesidad de insulina."
          ],
          "correct": 0,
          "sources": [
            "gi"
          ],
          "explanation": "Respuesta correcta: Puede ayudar a elegir alimentos y entender la respuesta de glucosa.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 49,
          "question": "¿Qué se compara para calcular el índice glucémico de un alimento?",
          "options": [
            "La cantidad de hierro del alimento.",
            "La respuesta de glucosa tras tomar la misma cantidad de HC disponibles del alimento y de una referencia.",
            "La cantidad de colesterol de la comida.",
            "La cantidad de proteínas exclusivamente."
          ],
          "correct": 1,
          "sources": [
            "gi"
          ],
          "explanation": "Respuesta correcta: La respuesta de glucosa tras tomar la misma cantidad de HC disponibles del alimento y de una referencia.",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 50,
          "question": "¿Puede aparecer glucosa en la orina cuando la glucosa en sangre está elevada?",
          "options": [
            "Toda la glucosa se convierte inmediatamente en grasa.",
            "No, nunca puede aparecer glucosa en la orina.",
            "Sí, cuando se supera la capacidad del riñón para reabsorberla; no ocurre igual ante cualquier subida.",
            "Toda la glucosa se convierte en proteínas."
          ],
          "correct": 2,
          "explanation": "La glucosuria depende del manejo renal de la glucosa. También hay medicamentos, como los iSGLT2, que favorecen su eliminación por la orina.",
          "sources": [
            "ada5"
          ],
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 51,
          "question": "En un ejemplo, si el IG es 50 y la porción tiene 20 g de HC disponibles, ¿cuál es su carga glucémica (IG × HC / 100)?",
          "options": [
            "25",
            "15",
            "20",
            "10"
          ],
          "correct": 3,
          "sources": [
            "gi"
          ],
          "explanation": "Respuesta correcta: 10",
          "topic": "Alimentación y respuesta de glucosa"
        },
        {
          "id": 52,
          "question": "El factor de sensibilidad a la insulina (FSI) se utiliza para calcular:",
          "options": [
            "Los HC que se pueden comer sin límite.",
            "La proporción de insulina basal.",
            "El tiempo de acción de la insulina.",
            "La dosis de insulina correctora para una glucosa por encima del objetivo."
          ],
          "correct": 3,
          "explanation": "El FSI estima cuánto baja la glucosa con una unidad de rápida. Para cubrir los HC de una comida se utiliza la relación insulina/HC.",
          "sources": [
            "ucsf"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 53,
          "question": "En un ejemplo educativo para una corrección, la glucosa actual es 290 mg/dl y el objetivo es 100 mg/dl. ¿Cuál es la diferencia?",
          "options": [
            "250 mg/dl",
            "220 mg/dl",
            "180 mg/dl",
            "190 mg/dl"
          ],
          "correct": 3,
          "explanation": "290 - 100 = 190 mg/dl. Es una diferencia de glucosa, no una dosis de insulina; faltan el FSI y la revisión de insulina activa.",
          "sources": [
            "ucsf"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 54,
          "question": "La duración de la insulina activa se refiere a:",
          "options": [
            "Tiempo durante el cual la insulina ejerce su efecto",
            "Tiempo en que se inyecta la insulina",
            "Tiempo de espera antes de correr",
            "Tiempo que se necesita para calcular la dosis"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Tiempo durante el cual la insulina ejerce su efecto",
          "sources": [
            "ada5"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 55,
          "question": "El uso de calculadoras de bolus permite a los pacientes:",
          "options": [
            "Utilizar insulina de acción prolongada",
            "Aumentar la complejidad de su tratamiento",
            "Aquellos sin diabetes a controlar su ingesta",
            "Aumentar su independencia y autonomía en el control glucémico"
          ],
          "correct": 3,
          "explanation": "Respuesta correcta: Aumentar su independencia y autonomía en el control glucémico",
          "sources": [
            "ada5"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 56,
          "question": "Para muchos adultos no embarazados, ¿cuál es una referencia habitual de objetivo antes de comer, que debe individualizarse?",
          "options": [
            "70-100 mg/dl para todo el mundo.",
            "120-160 mg/dl obligatoriamente.",
            "80-130 mg/dl, adaptándolo con el equipo.",
            "200-250 mg/dl para todo el mundo."
          ],
          "correct": 2,
          "sources": [
            "ada6"
          ],
          "explanation": "Respuesta correcta: 80-130 mg/dl, adaptándolo con el equipo.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 57,
          "question": "¿Qué debe hacerse antes de hacer un bolo corrector si se ha administrado insulina anteriormente?",
          "options": [
            "Repetir siempre el bolo al cabo de una hora.",
            "Aumentar siempre la corrección.",
            "Revisar cuánto bolo previo sigue activo y tenerlo en cuenta según el calculador o el plan pautado.",
            "Administrar otra dosis sin comprobar nada."
          ],
          "correct": 2,
          "sources": [
            "active"
          ],
          "explanation": "Respuesta correcta: Revisar cuánto bolo previo sigue activo y tenerlo en cuenta según el calculador o el plan pautado.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 58,
          "question": "¿Qué objetivo de glucosa debe utilizarse para calcular una corrección?",
          "options": [
            "El acordado con el equipo para esa persona y momento.",
            "Siempre 80 mg/dl para cualquier persona.",
            "Siempre 100 mg/dl para todo el mundo.",
            "El que permita obtener la dosis más alta."
          ],
          "correct": 0,
          "sources": [
            "ada6",
            "ucsf"
          ],
          "explanation": "Respuesta correcta: El acordado con el equipo para esa persona y momento.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 59,
          "question": "¿Qué puede ocurrir con la glucosa tras una comida con bastante grasa?",
          "options": [
            "Siempre baja sin necesidad de insulina.",
            "Puede producirse una subida más tardía y prolongada; se revisan los patrones con el equipo.",
            "Siempre sube solo durante los primeros 5 minutos.",
            "Nunca cambia."
          ],
          "correct": 1,
          "sources": [
            "ada5"
          ],
          "explanation": "Respuesta correcta: Puede producirse una subida más tardía y prolongada; se revisan los patrones con el equipo.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 60,
          "question": "¿Qué debes considerar antes de repetir un bolo corrector?",
          "options": [
            "Que siempre debe repetirse a la hora.",
            "Que siempre se puede repetir sin mirar la glucosa.",
            "La insulina que sigue activa, el tipo de insulina y la pauta acordada; no existe una regla universal de repetir a las 2 horas.",
            "Que una segunda dosis no puede causar hipoglucemia."
          ],
          "correct": 2,
          "explanation": "Repetir correcciones mientras sigue actuando una dosis previa puede acumular insulina y causar hipoglucemia. El intervalo y los ajustes se individualizan.",
          "sources": [
            "active",
            "novorapid"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 61,
          "question": "¿Qué nutriente se transforma en glucosa en mayor cantidad cuando se ingiere?",
          "options": [
            "Hidratos de carbonos",
            "Grasas",
            "Proteínas",
            "Fibras"
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Hidratos de carbonos",
          "sources": [
            "ada5"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 62,
          "question": "¿Cuál es la conclusión final sobre el ajuste de la dosis para la cobertura de la ingesta?",
          "options": [
            "Reduce la calidad de vida",
            "Incrementa las fluctuaciones de glucosa",
            "Permite un mejor control de la diabetes",
            "No tiene relación con los objetivos de glucosa"
          ],
          "correct": 2,
          "explanation": "Respuesta correcta: Permite un mejor control de la diabetes",
          "sources": [
            "ada5"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 63,
          "question": "Si se expresa en gramos de HC por unidad, ¿qué representa la relación insulina/HC?",
          "options": [
            "La dosis total diaria de insulina.",
            "Cuántos gramos de HC cubre aproximadamente una unidad de insulina rápida.",
            "La cantidad de agua que se debe beber.",
            "Un sistema para clasificar las insulinas basales."
          ],
          "correct": 1,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Cuántos gramos de HC cubre aproximadamente una unidad de insulina rápida.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 64,
          "question": "¿Cuál es la importancia del recuento de carbohidratos para personas con diabetes de tipo 1?",
          "options": [
            "Ayuda a administrar la insulina de manera efectiva en función de la cantidad de carbohidratos consumidos.",
            "Permite planificar una dieta sin restricciones.",
            "Es un método para aumentar el consumo de carbohidratos.",
            "Facilita la identificación de alimentos prohibidos."
          ],
          "correct": 0,
          "explanation": "Respuesta correcta: Ayuda a administrar la insulina de manera efectiva en función de la cantidad de carbohidratos consumidos.",
          "sources": [
            "ada5"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 65,
          "question": "¿Qué factores pueden hacer necesario revisar la relación insulina/HC con el equipo?",
          "options": [
            "Solo el día del mes.",
            "Únicamente el color de la pluma.",
            "Solo el precio de los alimentos.",
            "Los patrones de glucosa, la hora, la actividad, los cambios de sensibilidad y las circunstancias personales."
          ],
          "correct": 3,
          "sources": [
            "ucsf",
            "active"
          ],
          "explanation": "Respuesta correcta: Los patrones de glucosa, la hora, la actividad, los cambios de sensibilidad y las circunstancias personales.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 66,
          "question": "En un ejemplo teórico, si 1 unidad cubre 10 g de HC, ¿cuántas unidades cubrirían 45 g, sin corrección ni insulina rápida previa activa?",
          "options": [
            "3 unidades.",
            "5 unidades.",
            "4,5 unidades.",
            "6 unidades."
          ],
          "correct": 2,
          "explanation": "45 ÷ 10 = 4,5 unidades teóricas. La dosis real y su redondeo dependen de la pauta, la insulina activa y el dispositivo.",
          "sources": [
            "ucsf"
          ],
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 67,
          "question": "¿Qué expresa el factor de sensibilidad o de corrección de la insulina?",
          "options": [
            "Los HC que se pueden comer sin insulina.",
            "El tiempo que se tarda en comer.",
            "Cuántos mg/dl se estima que baja la glucosa con una unidad de insulina rápida.",
            "La cantidad de alimentos que se deben evitar."
          ],
          "correct": 2,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Cuántos mg/dl se estima que baja la glucosa con una unidad de insulina rápida.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 68,
          "question": "¿Cuál es la relación general entre el momento del día y los ratios de insulina/carbohidratos?",
          "options": [
            "Puede variar según la hora y la persona; no hay un patrón único para todo el mundo.",
            "Siempre es mayor por la tarde para todas las personas.",
            "Debe mantenerse igual aunque cambien los patrones de glucosa.",
            "Solo depende del nombre de la comida."
          ],
          "correct": 0,
          "sources": [
            "ucsf"
          ],
          "explanation": "Respuesta correcta: Puede variar según la hora y la persona; no hay un patrón único para todo el mundo.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 69,
          "question": "Durante o después del ejercicio, ¿cómo pueden cambiar las necesidades de insulina?",
          "options": [
            "Siempre aumentan y se debe subir la dosis sin comprobar nada.",
            "Pueden disminuir, pero dependen del ejercicio, la glucosa y la insulina activa; se sigue el plan individual.",
            "Se debe suspender toda la insulina basal.",
            "Nunca cambian."
          ],
          "correct": 1,
          "sources": [
            "active",
            "ada5"
          ],
          "explanation": "Respuesta correcta: Pueden disminuir, pero dependen del ejercicio, la glucosa y la insulina activa; se sigue el plan individual.",
          "topic": "Ratios, FSI e insulina activa"
        },
        {
          "id": 70,
          "question": "En un ejemplo, 3 unidades cubren 45 g de HC. ¿Cuál es la relación expresada en gramos de HC por unidad?",
          "options": [
            "5 g por unidad (1:5).",
            "30 g por unidad (1:30).",
            "15 g por unidad (1:15).",
            "45 g por unidad (1:45)."
          ],
          "correct": 2,
          "explanation": "45 ÷ 3 = 15 g por unidad. Se expresa la respuesta en la misma unidad para evitar opciones matemáticamente equivalentes.",
          "sources": [
            "ucsf"
          ],
          "topic": "Ratios, FSI e insulina activa"
        }
      ],
      "title": "Conteo de hidratos de carbono (HC)",
      "description": "Etiquetas, raciones, ratios y ejemplos de cálculo.",
      "pdf": "pdfs/diabetes/checklist-hidratos.pdf"
    }
  ]
};});
