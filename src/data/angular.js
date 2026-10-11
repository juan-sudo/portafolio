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
].map((level, index) => ({ ...level, level: index }))

export const angularModule = {
  id: 'angular',
  label: 'Angular',
  subtitle: 'Framework web de TypeScript · Angular 17 a 20',
  title: 'Construye aplicaciones web con TypeScript y Angular.',
  description: 'Aprende Angular desde TypeScript y el primer componente hasta enrutamiento, formularios, HTTP, Signals, pruebas, renderizado en servidor y despliegue. Los niveles 0 a 18 siguen la documentación oficial de Angular 17 (v17.angular.io); los niveles 19 a 28 siguen el temario del curso «Angular: De cero a experto» de Fernando Herrera (Angular 19+), con sus proyectos GifsApp, CountryApp, MapsApp y TesloShop. Los ejemplos muestran código de Angular como referencia: no se ejecutan en el navegador.',
  languages: [{ key: 'angular', label: 'Angular' }],
  levels: angularLevels,
  outputLabel: 'Resultado de ejemplo',
  comparison: angularComparison,
}
