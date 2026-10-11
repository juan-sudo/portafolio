// Ruta de aprendizaje de Angular. Combina la documentación oficial de la versión 17 (https://v17.angular.io/docs)
// con el temario del curso «Angular: De cero a experto» de Fernando Herrera (edición 2025, Angular 19+).
// Los ejemplos muestran código real de Angular como referencia; no se ejecutan en el navegador.

import { code, links, text } from './angularHelpers'
import { angularTemplateLevels } from './angularTemplates'
import { angularAppLevels } from './angularApp'
import { angularAdvancedLevels } from './angularAdvanced'
import { angularTypescriptLevel } from './angularTypescript'
import { angularCourseModernLevels } from './angularCourseModern'
import { angularCourseProjectLevels } from './angularCourseProjects'

const angularBasicLevels = [
  {
    level: 0,
    title: 'Primeros pasos',
    topics: [
      text(
        '¿Qué es Angular?',
        `Angular es una plataforma de desarrollo construida sobre TypeScript. Incluye un framework basado en componentes para crear aplicaciones web escalables, un conjunto de librerías integradas (enrutamiento, formularios, comunicación cliente-servidor y más) y herramientas para desarrollar, compilar, probar y actualizar tu código.

Sirve tanto para proyectos de una sola persona como para aplicaciones empresariales. Esta ruta sigue Angular 17.`,
      ),
      text(
        'Las piezas de una aplicación Angular',
        `Componentes: los bloques con los que se arma la interfaz. Cada uno es una clase TypeScript con un decorador @Component, una plantilla HTML y estilos.

Plantillas: HTML ampliado con la sintaxis de Angular para mostrar datos y responder a eventos.

Inyección de dependencias: permite declarar qué necesita una clase (por ejemplo, un servicio) y Angular se encarga de crearlo y entregarlo.

Librerías propias: Angular Router, Angular Forms, HttpClient, Animations, PWA y Schematics.`,
      ),
      code(
        'Requisitos: Node.js y npm',
        `$ node --version
v20.11.0

$ npm --version
10.2.4`,
        'Angular 17 necesita una versión LTS activa o de mantenimiento de Node.js: 18.13 o posterior, o 20.9 o posterior. npm se instala junto con Node.js. Conviene conocer antes JavaScript, HTML y CSS; TypeScript ayuda, pero no es obligatorio para empezar.',
      ),
      code(
        'Instalar Angular CLI',
        `$ npm install -g @angular/cli@17

$ ng version
Angular CLI: 17.x`,
        'Angular CLI es la herramienta de línea de comandos para crear proyectos, generar código, probar, compilar y desplegar. En Windows, PowerShell bloquea por defecto los scripts de npm; la guía indica ejecutar: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned.',
      ),
      code(
        'Crear el primer proyecto',
        `$ ng new mi-app
? Which stylesheet format would you like to use? CSS
? Do you want to enable Server-Side Rendering (SSR)? No

$ cd mi-app
$ ng serve --open`,
        'ng new crea el espacio de trabajo, una aplicación inicial e instala los paquetes de npm. ng serve compila, levanta el servidor de desarrollo en http://localhost:4200 y recarga la página cada vez que guardas un archivo.',
      ),
      code(
        'Estructura del proyecto',
        `mi-app/
├── angular.json        ← configuración del CLI: build, serve, test
├── package.json        ← dependencias de npm
├── tsconfig.json       ← configuración de TypeScript
└── src/
    ├── index.html      ← la página que se sirve al navegador
    ├── main.ts         ← punto de entrada: arranca la aplicación
    ├── styles.css      ← estilos globales
    ├── assets/         ← imágenes y archivos estáticos
    └── app/
        ├── app.component.ts     ← lógica del componente raíz
        ├── app.component.html   ← su plantilla
        ├── app.component.css    ← sus estilos
        ├── app.component.spec.ts← sus pruebas
        ├── app.config.ts        ← proveedores de la aplicación
        └── app.routes.ts        ← rutas`,
        'Desde Angular 17, ng new genera una aplicación con componentes standalone: no hay app.module.ts.',
      ),
      code(
        'Cómo arranca la aplicación',
        `// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};`,
        'bootstrapApplication() crea el componente raíz y lo coloca en la etiqueta <app-root> de index.html. En appConfig se registran los servicios globales: router, HttpClient, animaciones, etc.',
      ),
      code(
        'Comandos de Angular CLI que más usarás',
        `$ ng serve                       # servidor de desarrollo
$ ng generate component saludo   # crea un componente (alias: ng g c saludo)
$ ng generate service datos      # crea un servicio
$ ng test                        # pruebas unitarias
$ ng build                       # compila para producción en dist/
$ ng add @angular/material       # agrega una librería y la configura
$ ng update                      # actualiza Angular y sus dependencias`,
        'ng generate también crea directivas, pipes, guards, interfaces, enums, clases y librerías. Añade --dry-run para ver qué archivos se crearían sin escribir nada.',
      ),
      links('Guías de primeros pasos', [
        ['¿Qué es Angular?', 'guide/what-is-angular'],
        ['Configurar el entorno local', 'guide/setup-local'],
        ['Estructura de archivos', 'guide/file-structure'],
        ['Referencia del CLI', 'cli'],
        ['Tutorial: tu primera aplicación', 'tutorial/first-app'],
      ]),
    ],
  },
  {
    level: 1,
    title: 'Componentes',
    topics: [
      text(
        '¿Qué es un componente?',
        `Un componente controla una parte de la pantalla. Toda aplicación Angular tiene al menos uno: el componente raíz. Cada componente tiene:

Una clase TypeScript con los datos y el comportamiento.
Una plantilla HTML que declara lo que se muestra.
Un selector CSS que indica cómo se usa en otra plantilla.
Opcionalmente, estilos CSS que solo se aplican a su plantilla.`,
      ),
      code(
        'Crear un componente con el CLI',
        `$ ng generate component lista-productos

CREATE src/app/lista-productos/lista-productos.component.css
CREATE src/app/lista-productos/lista-productos.component.html
CREATE src/app/lista-productos/lista-productos.component.spec.ts
CREATE src/app/lista-productos/lista-productos.component.ts`,
        'El CLI crea una carpeta con el nombre del componente y cuatro archivos: la clase, la plantilla, los estilos y las pruebas.',
      ),
      code(
        'El decorador @Component',
        `import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css',
})
export class ListaProductosComponent {
  titulo = 'Productos';
}`,
        'selector: la etiqueta con la que se usa el componente. templateUrl y styleUrl apuntan a archivos; también existen template y styles para escribirlos dentro del decorador. Un mismo componente no puede usar template y templateUrl a la vez.',
      ),
      code(
        'Plantilla y estilos dentro del componente',
        `@Component({
  selector: 'app-saludo',
  standalone: true,
  template: \`
    <h1>Hola, {{ nombre }}</h1>
    <p>Bienvenido a Angular</p>
  \`,
  styles: ['h1 { font-weight: normal; }'],
})
export class SaludoComponent {
  nombre = 'Ana';
}`,
        'Las comillas invertidas permiten escribir la plantilla en varias líneas. Usa plantillas en línea solo cuando son cortas.',
      ),
      code(
        'Componentes standalone y cómo usar uno dentro de otro',
        `import { Component } from '@angular/core';
import { SaludoComponent } from './saludo/saludo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SaludoComponent],
  template: \`
    <app-saludo />
    <app-saludo />
  \`,
})
export class AppComponent {}`,
        'Un componente standalone no pertenece a ningún NgModule: declara en imports todo lo que su plantilla utiliza (otros componentes, directivas y pipes). Si olvidas importarlo, el compilador avisa con NG8001: no es un elemento conocido.',
      ),
      code(
        'Estilos del componente y el selector :host',
        `/* saludo.component.css */
:host {
  display: block;
  border: 1px solid #ccc;
}

:host(.activo) {
  border-color: steelblue;
}

h1 {
  color: steelblue;   /* solo afecta a los h1 de ESTE componente */
}`,
        'Los estilos de un componente no se filtran al resto de la página. :host selecciona el elemento anfitrión del propio componente, es decir, la etiqueta <app-saludo>.',
      ),
      code(
        'Encapsulación de la vista',
        `import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  template: '<h2>Tarjeta</h2>',
  styles: ['h2 { color: green; }'],
  encapsulation: ViewEncapsulation.Emulated,   // valor por defecto
})
export class TarjetaComponent {}`,
        'Emulated: Angular reescribe los selectores para que los estilos solo afecten a este componente. ShadowDom: usa el Shadow DOM nativo del navegador. None: los estilos se vuelven globales y afectan a toda la página.',
      ),
      code(
        'Ciclo de vida de un componente',
        `import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({ selector: 'app-reloj', standalone: true, template: '{{ hora }}' })
export class RelojComponent implements OnInit, OnDestroy {
  hora = '';
  private intervalo?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    // Se ejecuta una vez, después de recibir los primeros @Input
    this.intervalo = setInterval(() => {
      this.hora = new Date().toLocaleTimeString();
    }, 1000);
  }

  ngOnDestroy(): void {
    // Justo antes de destruir el componente: libera recursos
    clearInterval(this.intervalo);
  }
}`,
        'Usa el constructor solo para inicializar propiedades simples; la lógica de carga va en ngOnInit(). Limpia en ngOnDestroy() temporizadores y suscripciones para evitar fugas de memoria.',
      ),
      text(
        'Orden de los hooks del ciclo de vida',
        `ngOnChanges(): cuando cambia el valor de un @Input. Se llama antes de ngOnInit() y en cada cambio posterior.
ngOnInit(): una sola vez, tras el primer ngOnChanges().
ngDoCheck(): en cada ciclo de detección de cambios.
ngAfterContentInit(): una vez, después de proyectar el contenido externo.
ngAfterContentChecked(): tras revisar el contenido proyectado.
ngAfterViewInit(): una vez, cuando la vista del componente y las de sus hijos están listas.
ngAfterViewChecked(): tras revisar la vista del componente y sus hijos.
ngOnDestroy(): justo antes de destruir el componente.

Evita lógica pesada en ngDoCheck() y en los hooks Checked, porque se ejecutan muchísimas veces.`,
      ),
      links('Guías de componentes', [
        ['Visión general de componentes', 'guide/component-overview'],
        ['Componentes standalone', 'guide/standalone-components'],
        ['Ciclo de vida', 'guide/lifecycle-hooks'],
        ['Encapsulación de la vista', 'guide/view-encapsulation'],
        ['Estilos de componentes', 'guide/component-styles'],
      ]),
    ],
  },
]

const angularComparison = {
  title: 'Angular, React o Vue: ¿cuál conviene usar?',
  languages: ['Angular', 'React', 'Vue'],
  rows: [
    { label: 'Qué es', values: ['Plataforma completa: framework, router, formularios, HTTP y CLI', 'Librería para construir interfaces; el resto se elige aparte', 'Framework progresivo con router y estado oficiales opcionales'] },
    { label: 'Lenguaje', values: ['TypeScript', 'JavaScript o TypeScript con JSX', 'JavaScript o TypeScript con plantillas HTML'] },
    { label: 'Plantillas', values: ['HTML con sintaxis propia: {{ }}, [prop], (evento), @if, @for', 'JSX: HTML escrito dentro de JavaScript', 'HTML con directivas: v-if, v-for, v-model'] },
    { label: 'Reactividad', values: ['Detección de cambios con Zone.js y Signals', 'Estado con hooks y re-renderizado', 'Sistema reactivo con ref y reactive'] },
    { label: 'Inyección de dependencias', values: ['Integrada en el framework', 'No tiene; se usa Context o librerías', 'provide / inject sencillo'] },
    { label: 'Curva de aprendizaje', values: ['Alta: muchos conceptos desde el inicio', 'Media', 'Baja a media'] },
    { label: 'Cuándo elegirlo', values: ['Aplicaciones grandes y equipos que quieren una estructura única', 'Interfaces flexibles y ecosistema muy amplio', 'Proyectos pequeños o medianos y adopción gradual'] },
  ],
}

const angularInterviewLevel = {
  title: 'Entrevista técnica Angular',
  interview: true,
  examCount: 10,
  topics: [
    text(
      'Diseño de componentes standalone',
      `En Angular moderno, los componentes standalone declaran en imports las directivas, pipes y componentes que usan sus plantillas. bootstrapApplication inicia la aplicación sin un NgModule raíz; los proveedores globales se configuran en app.config.ts. Antes de Angular 19, standalone debía declararse explícitamente; en Angular 19 pasó a ser el valor predeterminado.`,
    ),
    text(
      'Comunicación entre componentes',
      `Un componente padre entrega datos al hijo con inputs y recibe notificaciones con outputs. Angular moderno ofrece las funciones input() y output(), además de los decoradores @Input y @Output. Para datos derivados de un input signal se puede usar computed(); un servicio compartido es más apropiado para estado compartido que no pertenece a una única relación padre-hijo.`,
    ),
    text(
      'Signals y estado derivado',
      `signal() crea un valor reactivo que se lee invocándolo y se actualiza con set() o update(). computed() deriva un valor y se recalcula según las señales leídas. effect() está pensado para sincronizar señales con efectos externos; no conviene usarlo para copiar estado derivado, porque computed() expresa esa relación directamente.`,
    ),
    text(
      'Detección de cambios y OnPush',
      `ChangeDetectionStrategy.OnPush reduce comprobaciones innecesarias. Angular comprueba el componente, entre otros casos, cuando cambia un input, ocurre un evento en su vista, una señal leída por la plantilla cambia o se marca explícitamente para comprobación. Mutar un objeto conservando la misma referencia puede no comunicar un cambio de input; se prefieren actualizaciones inmutables.`,
    ),
    text(
      'Observables y RxJS en interfaces',
      `Un Observable puede emitir cero, uno o muchos valores a lo largo del tiempo; una Promise resuelve una sola vez. async pipe se suscribe y cancela la suscripción con la vista. Para componer flujos, switchMap cambia a la operación más reciente y cancela la suscripción anterior; es útil en búsquedas para evitar mostrar respuestas obsoletas.`,
    ),
    text(
      'Inyección de dependencias y alcance',
      `providedIn: 'root' registra normalmente un servicio compartido en el inyector raíz. Declarar un proveedor en un componente crea una instancia dentro de su ámbito, disponible para ese componente y sus descendientes, y puede producir instancias separadas. El alcance debe elegirse según quién comparte el estado y durante cuánto tiempo debe vivir.`,
    ),
    text(
      'Enrutamiento, carga diferida y guards',
      `Angular Router asocia rutas con componentes o con carga diferida mediante loadComponent o loadChildren. Un guard puede permitir o impedir navegación, pero no sustituye la autorización del servidor: el backend debe validar permisos en cada operación protegida. La carga diferida separa código para reducir lo descargado al inicio.`,
    ),
    text(
      'Formularios reactivos y validación',
      `Los formularios reactivos modelan controles y validadores explícitamente en TypeScript; son útiles cuando la validación es dinámica o compleja. Un validador devuelve null si el valor es válido o un objeto de errores si no lo es. Las reglas del cliente mejoran la experiencia, pero las entradas también deben validarse en el servidor.`,
    ),
    text(
      'Peticiones HTTP, errores e interceptores',
      `HttpClient devuelve Observables y permite componer la petición con operadores RxJS. Los interceptores pueden aplicar políticas transversales como encabezados o registro; los errores se manejan explícitamente, por ejemplo con catchError. No se deben ocultar errores de autorización o red convirtiéndolos en respuestas que aparenten éxito.`,
    ),
    text(
      'Ciclo de vida y limpieza',
      `ngOnInit se ejecuta una vez después de inicializar los inputs; ngOnChanges responde a cambios de inputs y ngOnDestroy se ejecuta antes de destruir el componente. Las suscripciones manuales y temporizadores deben cancelarse al dejar de necesitarlos. async pipe o takeUntilDestroyed ayudan a vincular la limpieza al ciclo de vida.`,
    ),
    text(
      'Rendimiento de listas y plantillas',
      `En una lista con @for, track debe identificar de forma estable cada elemento, por ejemplo por id; así Angular puede reutilizar nodos cuando la colección cambia. En versiones anteriores se utilizaba trackBy con *ngFor. Evita cálculos costosos repetidos en plantillas y usa carga diferida para rutas o recursos grandes cuando sea apropiado.`,
    ),
    text(
      'Seguridad, SSR y pruebas',
      `Angular escapa valores interpolados en la plantilla para reducir riesgos de XSS; no se debe confiar contenido con bypassSecurityTrust... sin una fuente realmente confiable. En SSR, el servidor genera HTML inicial y la hidratación conecta esa vista en el navegador. Las pruebas deben comprobar comportamiento observable y aislar dependencias, no depender solo de detalles internos.`,
    ),
  ],
}

// Primero la documentación oficial (con TypeScript tras los primeros pasos) y luego los temas y proyectos del curso
const angularLevels = [
  angularBasicLevels[0],
  angularTypescriptLevel,
  ...angularBasicLevels.slice(1),
  ...angularTemplateLevels,
  ...angularAppLevels,
  ...angularAdvancedLevels,
  ...angularCourseModernLevels,
  ...angularCourseProjectLevels,
  angularInterviewLevel,
].map((level, index) => ({ ...level, level: index }))

export const angularModule = {
  id: 'angular',
  label: 'Angular',
  subtitle: 'Framework web de TypeScript · Angular 17 a 20',
  title: 'Construye aplicaciones web con TypeScript y Angular.',
  description: 'Aprende Angular desde TypeScript y el primer componente hasta enrutamiento, formularios, HTTP, Signals, pruebas, renderizado en servidor y despliegue. Los niveles iniciales siguen la documentación oficial de Angular 17 (v17.angular.io); los siguientes siguen el temario del curso «Angular: De cero a experto» de Fernando Herrera (Angular 19+), con sus proyectos GifsApp, CountryApp, MapsApp y TesloShop. La ruta termina con un nivel de preparación para entrevistas cuyo examen genera preguntas nuevas con IA. Los ejemplos muestran código de Angular como referencia: no se ejecutan en el navegador.',
  languages: [{ key: 'angular', label: 'Angular' }],
  levels: angularLevels,
  outputLabel: 'Resultado de ejemplo',
  comparison: angularComparison,
}
