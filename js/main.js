(function(){
  var $=function(id){return document.getElementById(id)};
  // Recorrido del Ciclo 1
  var M=[
    {m:"Oct. 2026",c:"var(--magenta)",n:[{code:"Fuentes",ic:"i-book",done:1,t:"Revisión de fuentes secundarias",d:"Estadísticas oficiales y estudios con poblaciones parecidas. Es la base de esta entrega.",img:"img/FUENTES.webp"}]},
    {m:"Nov. 2026",c:"var(--orange)",n:[{code:"DOC-01",ic:"i-doc",t:"Revisión documental",d:"PEI, malla curricular, plan de área, guías de aprendizaje, material de formación y de apoyo, y manual de convivencia. Se hace con la carta de presentación del proyecto.",img:"img/DOC-01.webp"}]},
    {m:"Dic. 2026",c:"var(--teal)",n:[{code:"Aval",ic:"i-check",t:"Aval del Comité de Ética",d:"Previsto para diciembre. Es condición para aplicar los instrumentos con participantes.",img:"img/AVAL.webp"},{code:"ENT-01",ic:"i-chat",t:"Entrevista semiestructurada con docentes",d:"Primera semana de diciembre, con los dos docentes de 4.º y 5.º, una vez se cuente con el aval.",img:"img/ENT-01.webp"}]},
    {m:"Ene. 2027",c:"#4777bd",n:[{code:"OBS-01",ic:"i-eye",t:"Observación de clases y condiciones TIC",d:"Tercera y cuarta semana de enero: dos o tres clases por grupo participante.",img:"img/OBS-01.webp"},{code:"GFE-01",ic:"i-group",t:"Grupo focal con estudiantes",d:"Tercera y cuarta semana de enero, con los 12 estudiantes sorteados de cada grupo y su consentimiento y asentimiento firmados.",img:"img/GFE-01.webp"},{code:"SIN-01",ic:"i-layers",t:"Síntesis y arquetipos",d:"Con los datos de la sede, las proto-personas se reemplazan por arquetipos con su mapa de empatía y su POV.",img:"img/SIN-01.webp"}]}
  ];
  var flat=[];
  $("months").innerHTML=M.map(function(mo){return '<div class="month" style="--mc:'+mo.c+'"><span class="ml">'+mo.m+'</span><div class="nodes">'+mo.n.map(function(x){var i=flat.length;flat.push(Object.assign({c:mo.c,m:mo.m},x));return '<button class="node'+(x.done?' done':'')+'" data-i="'+i+'" aria-pressed="false"><span class="circ"><svg class="ic"><use href="#'+x.ic+'"/></svg></span><span class="code">'+x.code+'</span></button>'}).join("")+'</div></div>'}).join("");
  function showN(i){var x=flat[i];
    document.querySelectorAll(".node").forEach(function(b){b.setAttribute("aria-pressed",+b.dataset.i===i)});
    $("ndetail").innerHTML=(x.img?'<img src="'+x.img+'" alt="">':'<span style="grid-row:1/3;width:64px;height:64px;border-radius:50%;background:'+x.c+';display:grid;place-items:center;color:#fff"><svg class="ic" style="width:32px;height:32px"><use href="#'+x.ic+'"/></svg></span>')+'<h3>'+x.m+' · '+x.t+'</h3><p>'+x.d+(x.done?' <b style="color:var(--onink)">Realizado.</b>':'')+'</p>';}
  document.querySelectorAll(".node").forEach(function(b){b.addEventListener("click",function(){showN(+b.dataset.i)})});
  showN(0);

  // Barras
  var des=[["Nacional 2022",75,0],["Nacional 2023",84,0],["Sector oficial",88,0],["Sector no oficial",65,1],["Zona rural",91,0],["Zona urbana",81,1]];
  var tic=[["Sedes rurales con equipos",80.8,1],["Sedes rurales con internet",48.2,0],["Sedes oficiales con equipos",83.4,1],["Sedes oficiales con internet",56.2,0],["5.º sin computador",39,0],["5.º sin internet",24,0]];
  function fmt(v){return (v%1?v.toFixed(1):String(v)).replace(".",",")+" %"}
  function bars(id,data){$(id).innerHTML=data.map(function(d){return '<div class="bar"><span>'+d[0]+'</span><div class="track"><div class="fill'+(d[2]?' alt':'')+'" style="width:'+d[1]+'%"></div></div><b>'+fmt(d[1])+'</b></div>'}).join("")}
  bars("bars-des",des);bars("bars-tic",tic);
  var tabs=[["t-des","p-des"],["t-tic","p-tic"]];
  tabs.forEach(function(t){$(t[0]).addEventListener("click",function(){tabs.forEach(function(u){var on=u[0]===t[0];$(u[0]).setAttribute("aria-selected",on);$(u[1]).hidden=!on})})});

  // Voces
  var quotes=[
    ["Escribieron los conceptos en el tablero y los estudiantes procedían a escribirlos en sus cuadernos","Observación de aulas de primaria en Quibdó · Pinilla Marín (2023, p. 22)"],
    ["Cada niño interpreta un papel, el cual se puede intercambiar para que éstos tengan la oportunidad de ubicarse y aprender desde diferentes perspectivas","Docente entrevistada · Carrascal-Hernández et al. (2022, p. 115)"],
    ["Es elegir y ser elegido","Así resumen algunos docentes la formación política · Pérez-Vargas et al. (2025, p. 7)"],
    ["Las noticias de otro país","Donde niños de 5.º de Huila y Nariño decían haber visto a personas indígenas · Ortiz Gil et al. (2022, p. 144)"],
    ["Entre más conocían más curiosidad sentían","Sobre niños que aprendieron con actividades, juegos y diálogos · Ortiz Gil et al. (2022, p. 148)"]
  ];
  var qi=0,dots=$("q-dots");dots.innerHTML=quotes.map(function(){return "<span></span>"}).join("");
  function showQ(){$("q-text").textContent=quotes[qi][0];$("q-who").textContent=quotes[qi][1];Array.prototype.forEach.call(dots.children,function(s,i){s.className=i===qi?"on":""})}
  $("q-prev").onclick=function(){qi=(qi+quotes.length-1)%quotes.length;showQ()};
  $("q-next").onclick=function(){qi=(qi+1)%quotes.length;showQ()};
  showQ();

  // Proto-personas
  var D='<span class="tag d">D</span>',S='<span class="tag s">S</span>';
  var P=[
    {tab:"Mariana · 5.º",pic:"img/pp-mariana.webp",name:"Mariana, 10 años",role:"Estudiante de 5.º · sede A",
     facts:["Comparte con su familia el único celular de la casa y no tiene computador "+S+". En el país, el 39 % de los estudiantes de 5.º no tiene computador "+D,"Participa más cuando la clase tiene juegos o trabajo en grupo "+S,"Ha visto a personas indígenas solo en televisión y cree que viven lejos "+S+", como los niños del estudio de Ortiz Gil et al. (2022) "+D,"Motivación: elegir por sí misma (autonomía) y estar con su grupo (relación) "+S],
     dice:["Pregunta si la actividad cuenta para la nota "+S,"Niños de su edad, en otra región, dijeron haber visto a personas indígenas en “las noticias de otro país” "+D],
     piensa:["Ciudadanía es saber quién es el personero "+S,"Si respondo distinto, me equivoco "+S],
     hace:["Copia del tablero lo que escribe la docente "+S,"Se anima cuando hay un reto en grupo "+S],
     siente:["Aburrimiento en la explicación larga "+S,"Entusiasmo cuando puede decidir "+S],
     pain:"Copiar definiciones que no usa; temor a equivocarse.",gain:"Ver qué pasa con lo que decide y comentarlo con su grupo."},
    {tab:"Julián · 4.º",pic:"img/pp-julian.webp",name:"Julián, 9 años",role:"Estudiante de 4.º · sede A",
     facts:["Lee más despacio que la mayoría y prefiere escuchar las instrucciones "+S,"Le cuesta hablar frente a un grupo de unos 38 compañeros "+S+" "+D,"No tiene internet en casa "+S+". En el país, el 24 % de los estudiantes de 5.º está en esa situación "+D,"Se concentra cuando el reto está a su medida y se rinde si es muy difícil (teoría del flujo) "+S],
     dice:["Casi no opina en voz alta; responde si le preguntan directamente "+S],
     piensa:["Los demás leen más rápido que yo "+S,"Quiero terminar sin que me apuren "+S],
     hace:["Se demora en los textos largos "+S,"Trabaja mejor en pareja que frente al grupo "+S],
     siente:["Nervios cuando lo pasan al frente "+S,"Orgullo cuando logra algo solo "+S],
     pain:"Textos largos sin apoyo de audio; exponerse ante el grupo.",gain:"Escuchar la historia, avanzar a su ritmo y decidir con un compañero."},
    {tab:"Claudia · docente",pic:"img/pp-claudia.webp",name:"Claudia",role:"Docente de 4.º · sede A",
     facts:["Orienta la formación ciudadana en grupos de unos 38 estudiantes "+D,"Explica con el tablero y el texto guía, como en las aulas descritas por Pinilla Marín (2023) "+S,"Valora el juego de roles, aunque lo usa poco por tiempo "+S,"La sede tiene internet "+D+", pero no sabe si la conexión aguanta una clase completa "+S],
     dice:["Una docente de otro estudio explicó que en el juego de roles “cada niño interpreta un papel” para aprender “desde diferentes perspectivas” "+D,"Algunos docentes resumen la formación política como “elegir y ser elegido” "+D],
     piensa:["No me alcanza el tiempo para el plan de área "+S,"¿Cómo sé qué razonan mis estudiantes? "+S],
     hace:["Planea con el texto guía "+S,"Evita la sala de informática cuando falla la red "+S],
     siente:["Interés por estrategias activas "+S,"Inseguridad ante recursos que no conoce "+S],
     pain:"Herramientas que fallan sin conexión o que suman trabajo.",gain:"Un recurso que funcione con los equipos de la sede y le muestre las razones de sus estudiantes."}
  ];
  var pt=$("ptabs"),pv=$("pview");
  pt.innerHTML=P.map(function(p,i){return '<button class="pill" role="tab" aria-selected="'+(i===0)+'">'+p.tab+'</button>'}).join("");
  function li(a){return "<ul>"+a.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul>"}
  function q(t,a,c){return '<div class="quad'+(c?' '+c:'')+'"><h5>'+t+'</h5>'+li(a)+'</div>'}
  function showP(i){var p=P[i];Array.prototype.forEach.call(pt.children,function(b,j){b.setAttribute("aria-selected",j===i)});
    pv.innerHTML='<div class="pcard"><img class="pp-pic" src="'+p.pic+'" alt="Ilustración de '+p.name.split(',')[0]+'"><span class="role">Proto-persona · nombre ficticio</span><h5>'+p.name+'</h5><span class="role">'+p.role+'</span>'+li(p.facts)+'</div>'+
    '<div class="emap">'+q("Dice",p.dice)+q("Piensa",p.piensa)+q("Hace",p.hace)+q("Siente",p.siente)+q("Dolores",[p.pain],"pain")+q("Ganancias",[p.gain],"gain")+'</div>'}
  Array.prototype.forEach.call(pt.children,function(b,i){b.addEventListener("click",function(){showP(i)})});
  showP(0);

  // Journey
  var J=[
    {n:"Llega y oye el tema",e:0,does:"Se sienta con su grupo; la docente anuncia el tema (gobierno escolar).",thinks:"¿Otra vez el personero?",opp:"Abrir con una situación de su barrio o su colegio."},
    {n:"Explicación en el tablero",e:-1,does:"Escucha una explicación larga de conceptos.",thinks:"Esto me lo tengo que aprender.",opp:"Cambiar la definición por una pregunta sin respuesta única."},
    {n:"Copia en el cuaderno",e:-2,does:"Copia definiciones del tablero.",thinks:"¿Para qué me sirve esto?",opp:"Registrar decisiones en lugar de copiar definiciones."},
    {n:"Actividad o reto",e:2,does:"Discute un caso con su grupo cuando la docente lo propone.",thinks:"Yo haría otra cosa, porque…",opp:"Mostrar varias perspectivas antes de decidir."},
    {n:"Cierre y evaluación",e:-1,does:"Responde preguntas de selección sobre los conceptos.",thinks:"Ojalá haya acertado.",opp:"Retroalimentar las razones, no solo los aciertos."},
    {n:"Después, en casa",e:-1,does:"Hace la tarea en el cuaderno; no tiene computador.",thinks:"No puedo buscar más.",opp:"Que la práctica ocurra en el aula, sin depender de la casa."}
  ];
  var mid=80,step=28,xs=J.map(function(_,i){return 53+i*106.8});function y(e){return mid-e*step}
  var g='<line x1="10" x2="630" y1="'+mid+'" y2="'+mid+'" stroke="#bdb3cf" stroke-dasharray="5 5"/>'+
    '<text x="12" y="'+(y(2)+5)+'" fill="#5f5670" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="14">+</text>'+
    '<text x="12" y="'+(y(-2)+5)+'" fill="#5f5670" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="14">−</text>'+
    '<path d="M'+xs.map(function(x,i){return x+" "+y(J[i].e)}).join(" L")+'" fill="none" stroke="#2a2340" stroke-width="3.5" stroke-linejoin="round"/>';
  xs.forEach(function(x,i){g+='<circle cx="'+x+'" cy="'+y(J[i].e)+'" r="9" fill="'+(J[i].e<0?'#e5485c':(J[i].e>0?'#0f7c72':'#ef8f2a'))+'" stroke="#fffaf0" stroke-width="3" data-i="'+i+'" style="cursor:pointer"/>'});
  $("jsvg").innerHTML=g;
  var jph=$("jph"),jd=$("jdetail");
  jph.innerHTML=J.map(function(p,i){return '<button class="jbtn" aria-pressed="'+(i===2)+'">'+p.n+'</button>'}).join("");
  function showJ(i){Array.prototype.forEach.call(jph.children,function(b,j){b.setAttribute("aria-pressed",j===i)});var p=J[i];
    jd.innerHTML='<div><h5>Hace</h5>'+p.does+'</div><div><h5>Piensa</h5>'+p.thinks+'</div><div><h5>Oportunidad</h5>'+p.opp+'</div>'}
  Array.prototype.forEach.call(jph.children,function(b,i){b.addEventListener("click",function(){showJ(i)})});
  $("jsvg").addEventListener("click",function(ev){var i=ev.target.getAttribute&&ev.target.getAttribute("data-i");if(i!==null&&i!==undefined)showJ(+i)});
  showJ(2);

  // Insights
  var I=[
    {t:"Los estudiantes aprenden a reconocer normas e instituciones, pero tienen pocas ocasiones de tomar posición y justificarla.",lvl:"Dato nacional",q:"¿Cómo podríamos lograr que los estudiantes de 4.º y 5.º tomen posición y la justifiquen ante situaciones de su vida diaria durante la clase?",p:1},
    {t:"Los niños no indígenas suelen ver a los pueblos originarios como lejanos; su curiosidad crece cuando aprenden con juegos y diálogos.",lvl:"Dato de otra región",q:"¿Cómo podríamos despertar la curiosidad de los estudiantes por las maneras en que otros pueblos deciden los asuntos comunes?",p:1},
    {t:"En las sedes oficiales hay más equipos que conexión estable; lo que dependa de internet en clase puede fallar.",lvl:"Dato nacional",q:"¿Cómo podríamos asegurar que la práctica en el aula continúe aunque la conexión falle?",p:1},
    {t:"Las decisiones con consecuencias y la narrativa sostienen el interés más que los premios.",lvl:"Antecedentes y teoría",q:"¿Cómo podríamos mantener el interés de los estudiantes en la actividad sin depender de premios externos?",p:1},
    {t:"La docente quiere estrategias activas, pero teme que un recurso nuevo le quite tiempo y no sabe qué razonan sus estudiantes.",lvl:"Supuesto",q:"¿Cómo podríamos ayudar a la docente a conocer las razones de sus estudiantes sin sumar trabajo a su clase?",p:0},
    {t:"En un mismo grupo hay niños que leen despacio, otros que no hablan en público y pocos equipos para todos.",lvl:"Supuesto",q:"¿Cómo podríamos lograr que cada estudiante encuentre un reto a su medida, lea rápido o despacio?",p:0}
  ];
  var il=$("ins");
  il.innerHTML=I.map(function(x,i){return '<button class="ins" aria-expanded="'+(i===0)+'"><span class="n">I'+(i+1)+'</span><span class="t">'+x.t+'</span><span class="lvl">'+x.lvl+'</span><span class="hmw"'+(i===0?'':' hidden')+'><small>'+(x.p?'★ Priorizada · ':'')+'¿Cómo podríamos…?</small>'+x.q+'</span></button>'}).join("");
  Array.prototype.forEach.call(il.children,function(b){b.addEventListener("click",function(){var h=b.querySelector(".hmw");h.hidden=!h.hidden;b.setAttribute("aria-expanded",!h.hidden)})});
})();
