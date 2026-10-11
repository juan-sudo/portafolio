// Angular · temas del curso «Angular: De cero a experto» (edición 2025, Angular 19+) que amplían la documentación de la versión 17.
// Secciones 4 a 15: Angular moderno, GifsApp, CountryApp, pipes y formularios reactivos.

import { code, text } from './angularHelpers'

export const angularCourseModernLevels = [
  {
    title: 'Angular moderno: señales, zoneless y recursos',
    topics: [
      text(
        'Qué cambia después de Angular 17',
        `Las versiones 18, 19 y 20 mantienen todo lo anterior y consolidan el camino que empezó con Signals:

Los componentes son standalone por defecto: desde la versión 19 ya no hace falta escribir standalone: true.
input(), output(), model() y viewChild() sustituyen a los decoradores @Input, @Output y @ViewChild.
Zoneless: la aplicación puede funcionar sin Zone.js.
linkedSignal, resource y rxResource: nuevas piezas para estado derivado y datos asíncronos.

Los ejemplos de este nivel indican desde qué versión está disponible cada API.`,
      ),
      code(
        'Un contador con señales',
        `import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h1>Contador: {{ contador() }}</h1>
    <p>El doble: {{ doble() }}</p>
    <button (click)="cambiar(1)">+1</button>
    <button (click)="cambiar(-1)">-1</button>
    <button (click)="reiniciar()">Reiniciar</button>
  \`,
})
export class ContadorComponent {
  contador = signal(10);
  doble = computed(() => this.contador() * 2);

  cambiar(valor: number): void {
    this.contador.update((actual) => actual + valor);
  }

  reiniciar(): void {
    this.contador.set(10);
  }
}`,
        'Es el primer ejercicio del curso. Cuando la plantilla crezca, sepárala en un archivo .html con templateUrl: la lógica queda en la clase y el diseño en la plantilla.',
      ),
      code(
        'Angular sin Zone.js',
        `// app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};

// angular.json: quita zone.js de "polyfills"
// Terminal:    npm uninstall zone.js`,
        'Sin Zone.js, Angular ya no revisa toda la aplicación tras cada evento asíncrono: solo actualiza la vista cuando cambia una señal leída en la plantilla, se dispara un evento del template, emite el pipe async o se llama a markForCheck(). Una propiedad normal modificada dentro de un setTimeout ya no se refleja en pantalla: tiene que ser una señal. En Angular 18 y 19 la función se llama provideExperimentalZonelessChangeDetection(); desde la 20 tiene el nombre que ves aquí.',
      ),
      code(
        'output(): emitir valores al padre',
        `import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-agregar-personaje',
  template: \`
    <input [value]="nombre()" (input)="nombre.set($any($event.target).value)">
    <button (click)="agregar()">Agregar</button>
  \`,
})
export class AgregarPersonajeComponent {
  etiqueta = input('Nombre');
  nuevoPersonaje = output<string>();

  nombre = signal('');

  agregar(): void {
    if (!this.nombre().trim()) return;
    this.nuevoPersonaje.emit(this.nombre());
    this.nombre.set('');
  }
}

<!-- padre -->
<app-agregar-personaje (nuevoPersonaje)="agregarAlListado($event)" />`,
        'output() reemplaza a @Output() con EventEmitter. El padre lo escucha igual, con paréntesis. Disponible desde Angular 17.3.',
      ),
      code(
        'Efectos y LocalStorage',
        `import { Injectable, effect, signal } from '@angular/core';

const CLAVE = 'personajes';

function cargar(): Personaje[] {
  const guardado = localStorage.getItem(CLAVE);
  return guardado ? JSON.parse(guardado) : [];
}

@Injectable({ providedIn: 'root' })
export class PersonajesService {
  personajes = signal<Personaje[]>(cargar());

  guardar = effect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(this.personajes()));
  });

  agregar(personaje: Personaje): void {
    this.personajes.update((lista) => [...lista, personaje]);
  }
}`,
        'El efecto se ejecuta al crear el servicio y cada vez que cambia la señal personajes, así el almacenamiento siempre queda sincronizado. LocalStorage solo guarda texto: se convierte con JSON.stringify y JSON.parse.',
      ),
      code(
        'linkedSignal: una señal editable que depende de otra',
        `import { linkedSignal, signal } from '@angular/core';

const opciones = signal(['Terrestre', 'Aéreo', 'Marítimo']);

// Empieza en la primera opción y se reinicia cuando cambian las opciones
const elegida = linkedSignal(() => opciones()[0]);

elegida.set('Aéreo');                       // se puede escribir, a diferencia de computed
opciones.set(['Correo', 'Recojo en tienda']);
console.log(elegida());                     // 'Correo'

// Forma completa: decide con el valor anterior
const seleccion = linkedSignal<string[], string>({
  source: opciones,
  computation: (nuevas, anterior) =>
    anterior && nuevas.includes(anterior.value) ? anterior.value : nuevas[0],
});`,
        'computed es de solo lectura; linkedSignal calcula su valor inicial a partir de otra señal pero además admite set() y update(). Disponible desde Angular 19.',
      ),
      code(
        'resource: datos asíncronos como señales',
        `import { Component, resource, signal } from '@angular/core';

@Component({
  selector: 'app-usuario',
  template: \`
    @if (usuario.isLoading()) {
      <p>Cargando…</p>
    } @else if (usuario.error()) {
      <p>No se pudo cargar el usuario.</p>
    } @else if (usuario.hasValue()) {
      <h2>{{ usuario.value().name }}</h2>
    }
    <button (click)="id.update((n) => n + 1)">Siguiente</button>
    <button (click)="usuario.reload()">Recargar</button>
  \`,
})
export class UsuarioComponent {
  id = signal(1);

  usuario = resource({
    params: () => ({ id: this.id() }),
    loader: async ({ params, abortSignal }) => {
      const respuesta = await fetch('https://reqres.in/api/users/' + params.id, {
        signal: abortSignal,
      });
      return (await respuesta.json()).data;
    },
  });
}`,
        'Cada vez que cambia una señal usada en params, resource vuelve a ejecutar loader y cancela la petición anterior. Expone value(), isLoading(), error(), hasValue() y reload(). En Angular 19 la propiedad params se llamaba request; es una API experimental y puede cambiar.',
      ),
      code(
        'rxResource: lo mismo con Observables',
        `import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

export class PorCapitalComponent {
  private paises = inject(PaisesService);

  termino = signal('');

  resultado = rxResource({
    params: () => ({ termino: this.termino() }),
    stream: ({ params }) => {
      if (!params.termino) return of([]);
      return this.paises.buscarPorCapital(params.termino);
    },
  });
}

@for (pais of resultado.value() ?? []; track pais.codigo) {
  <li>{{ pais.nombre }}</li>
}`,
        'Úsalo cuando el servicio ya devuelve un Observable, como todos los que usan HttpClient. En Angular 19 las propiedades eran request y loader; en la 20 pasaron a llamarse params y stream.',
      ),
      code(
        'viewChild como señal',
        `import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-buscador',
  template: \`
    <input #campo placeholder="Buscar">
    <button (click)="enfocar()">Ir al buscador</button>
  \`,
})
export class BuscadorComponent {
  campo = viewChild<ElementRef<HTMLInputElement>>('campo');
  // campo = viewChild.required<ElementRef<HTMLInputElement>>('campo');

  enfocar(): void {
    this.campo()?.nativeElement.focus();
  }
}`,
        'viewChild() devuelve una señal con la referencia al elemento, que es undefined hasta que la vista existe. Con viewChild.required el tipo no incluye undefined. Disponible desde Angular 17.2.',
      ),
      code(
        'Transiciones entre páginas con View Transitions',
        `// app.config.ts
import { provideRouter, withViewTransitions } from '@angular/router';

providers: [provideRouter(routes, withViewTransitions())]

<!-- listado: la imagen pequeña -->
<img [src]="heroe.imagen" [style.view-transition-name]="'heroe-' + heroe.id">

<!-- detalle: la misma imagen, en grande, con el mismo nombre -->
<img [src]="heroe.imagen" [style.view-transition-name]="'heroe-' + heroe.id">`,
        'El router usa la API View Transitions del navegador para animar el cambio de ruta con un fundido. Si dos elementos de la página antigua y la nueva comparten view-transition-name, el navegador anima uno hasta convertirlo en el otro. Cada nombre debe ser único en la página.',
      ),
      code(
        'Alias de importación en TypeScript',
        `// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@compartido/*": ["src/app/compartido/*"],
      "@productos/*": ["src/app/productos/*"],
      "@entornos/*": ["src/environments/*"]
    }
  }
}

// Antes
import { Producto } from '../../../productos/interfaces/producto.interface';

// Después
import { Producto } from '@productos/interfaces/producto.interface';`,
        'Los alias evitan las rutas relativas largas y no se rompen al mover un archivo de carpeta.',
      ),
      code(
        'Tailwind CSS y DaisyUI en Angular',
        `$ npm install tailwindcss @tailwindcss/postcss postcss
$ npm install -D daisyui

// .postcssrc.json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}

/* src/styles.css */
@import "tailwindcss";
@plugin "daisyui";

<!-- en cualquier plantilla -->
<button class="btn btn-primary">Guardar</button>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">...</div>`,
        'Tailwind aporta clases utilitarias y DaisyUI componentes ya diseñados sobre ellas (botones, tablas, menús). El curso los usa en CountryApp y TesloShop. Esta es la instalación de Tailwind 4; la versión 3 se configura con tailwind.config.js.',
      ),
      code(
        'Rutas con hash para servidores estáticos',
        `// app.config.ts
import { provideRouter, withHashLocation } from '@angular/router';

providers: [provideRouter(routes, withHashLocation())]

// La URL pasa de  https://misitio.com/productos/5
//              a  https://misitio.com/#/productos/5`,
        'Con hash, el navegador nunca pide /productos/5 al servidor: solo pide index.html y Angular lee lo que hay después del #. Es la salida más simple cuando el hosting no permite redirigir todas las rutas a index.html, como GitHub Pages.',
      ),
    ],
  },
  {
    title: 'Proyecto GifsApp',
    topics: [
      text(
        'Qué se construye',
        `Un buscador de GIF con la API de Giphy: una página de tendencias con scroll infinito, un buscador y un menú lateral con el historial de búsquedas, que se conserva al recargar.

Con él se practican rutas hijas, variables de entorno, peticiones HTTP tipadas, mapeo de datos, caché en memoria, LocalStorage y referencias a elementos de la plantilla.`,
      ),
      text(
        'Pensar en componentes',
        `Antes de escribir código, mira el diseño y divídelo en piezas:

Páginas: ocupan toda la zona de contenido y están asociadas a una ruta (tendencias, búsqueda, historial).
Layout: la estructura que se repite, como el menú lateral más el <router-outlet>.
Componentes reutilizables: la lista de GIF y cada elemento de la lista.

Si un bloque se repite, tiene lógica propia o hace difícil leer la plantilla, conviene sacarlo a un componente. Organiza las carpetas por funcionalidad: gifs/pages, gifs/components, gifs/services, gifs/interfaces.`,
      ),
      code(
        'Layout con rutas hijas',
        `// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard/dashboard.component'),
    children: [
      { path: 'tendencias', loadComponent: () => import('./gifs/pages/tendencias/tendencias.component') },
      { path: 'buscar', loadComponent: () => import('./gifs/pages/buscar/buscar.component') },
      { path: 'historial/:termino', loadComponent: () => import('./gifs/pages/historial/historial.component') },
      { path: '**', redirectTo: 'tendencias' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

// dashboard.component.ts: export default permite omitir el .then()
@Component({
  imports: [RouterOutlet, MenuLateralComponent],
  template: \`
    <app-menu-lateral />
    <main><router-outlet /></main>
  \`,
})
export default class DashboardComponent {}`,
        'El menú lateral se dibuja una sola vez y solo cambia la zona del <router-outlet> interior.',
      ),
      code(
        'Clave de la API en las variables de entorno',
        `$ ng generate environments

// src/environments/environment.development.ts
export const environment = {
  production: false,
  giphyUrl: 'https://api.giphy.com/v1',
  giphyApiKey: 'TU_API_KEY',
};

// en el servicio
import { environment } from '@entornos/environment';`,
        'La clave se obtiene gratis en developers.giphy.com. Ten presente que cualquier valor de environment termina en el JavaScript que descarga el navegador: sirve para claves públicas como esta, nunca para secretos.',
      ),
      code(
        'Interfaces de la respuesta y mapeo',
        `// Lo que devuelve Giphy (solo lo que usamos)
export interface GiphyRespuesta {
  data: GiphyItem[];
}
export interface GiphyItem {
  id: string;
  title: string;
  images: { original: { url: string } };
}

// Lo que usa NUESTRA aplicación
export interface Gif {
  id: string;
  titulo: string;
  url: string;
}

export class GifMapper {
  static aGif(item: GiphyItem): Gif {
    return { id: item.id, titulo: item.title, url: item.images.original.url };
  }

  static aGifs(items: GiphyItem[]): Gif[] {
    return items.map(this.aGif);
  }
}`,
        'El mapper traduce la respuesta externa a un modelo propio. Si la API cambia un nombre, solo se toca el mapper y no todos los componentes. Para generar las interfaces a partir de un JSON de ejemplo puedes usar una herramienta como quicktype.',
      ),
      code(
        'Servicio: tendencias y búsqueda',
        `@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);

  tendencias = signal<Gif[]>([]);
  cargando = signal(false);

  constructor() {
    this.cargarTendencias();
  }

  cargarTendencias(): void {
    this.cargando.set(true);
    this.http
      .get<GiphyRespuesta>(environment.giphyUrl + '/gifs/trending', {
        params: { api_key: environment.giphyApiKey, limit: 20 },
      })
      .subscribe((respuesta) => {
        this.tendencias.set(GifMapper.aGifs(respuesta.data));
        this.cargando.set(false);
      });
  }

  buscar(termino: string): Observable<Gif[]> {
    return this.http
      .get<GiphyRespuesta>(environment.giphyUrl + '/gifs/search', {
        params: { api_key: environment.giphyApiKey, q: termino, limit: 20 },
      })
      .pipe(map((respuesta) => GifMapper.aGifs(respuesta.data)));
  }
}`,
        'El objeto params arma la cadena de consulta sin concatenar a mano. El componente solo lee la señal tendencias().',
      ),
      code(
        'Historial y caché de búsquedas',
        `export class GifsService {
  // 'gatos' → sus GIF ya descargados
  historial = signal<Record<string, Gif[]>>({});
  terminos = computed(() => Object.keys(this.historial()));

  buscar(termino: string): Observable<Gif[]> {
    const clave = termino.trim().toLowerCase();
    const enCache = this.historial()[clave];
    if (enCache) return of(enCache);

    return this.http.get<GiphyRespuesta>(/* ... */).pipe(
      map((respuesta) => GifMapper.aGifs(respuesta.data)),
      tap((gifs) => this.historial.update((actual) => ({ ...actual, [clave]: gifs }))),
    );
  }

  delHistorial(termino: string): Gif[] {
    return this.historial()[termino] ?? [];
  }
}`,
        'Si el término ya se buscó, se responde desde memoria con of() y no se gasta otra petición. tap ejecuta un efecto secundario sin alterar el valor que pasa por el Observable.',
      ),
      code(
        'Leer un argumento dinámico de la URL como señal',
        `// ruta: historial/:termino
import { toSignal } from '@angular/core/rxjs-interop';

export default class HistorialComponent {
  private servicio = inject(GifsService);

  termino = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['termino'] as string)),
  );

  gifs = computed(() => this.servicio.delHistorial(this.termino() ?? ''));
}

<!-- menú lateral -->
@for (termino of servicio.terminos(); track termino) {
  <a [routerLink]="['/dashboard/historial', termino]" routerLinkActive="activo">
    {{ termino }}
  </a>
}`,
        'Al pasar de un término a otro, Angular reutiliza el mismo componente: por eso el parámetro se lee como Observable y se convierte en señal, en lugar de leerlo una sola vez del snapshot.',
      ),
      code(
        'Scroll infinito',
        `export default class TendenciasComponent {
  servicio = inject(GifsService);
  contenedor = viewChild<ElementRef<HTMLDivElement>>('contenedor');

  alHacerScroll(): void {
    const div = this.contenedor()?.nativeElement;
    if (!div) return;

    // posición actual + alto visible + margen ≥ alto total
    const casiAlFinal = div.scrollTop + div.clientHeight + 300 >= div.scrollHeight;
    if (casiAlFinal) this.servicio.cargarSiguientePagina();
  }
}

<div #contenedor class="h-screen overflow-y-scroll" (scroll)="alHacerScroll()">
  ...
</div>

// en el servicio
private pagina = signal(0);

cargarSiguientePagina(): void {
  if (this.cargando()) return;          // evita peticiones duplicadas
  this.cargando.set(true);
  this.http.get<GiphyRespuesta>(url, { params: { /* ... */ offset: this.pagina() * 20 } })
    .subscribe((respuesta) => {
      this.tendencias.update((actual) => [...actual, ...GifMapper.aGifs(respuesta.data)]);
      this.pagina.update((n) => n + 1);
      this.cargando.set(false);
    });
}`,
        'El evento scroll se dispara decenas de veces por segundo: la comprobación de cargando impide lanzar varias peticiones para la misma página.',
      ),
      code(
        'Diseño masonry y posición del scroll',
        `// Agrupa los GIF de tres en tres para pintar columnas de distinta altura
grupos = computed(() => {
  const grupos: Gif[][] = [];
  for (let i = 0; i < this.tendencias().length; i += 3) {
    grupos.push(this.tendencias().slice(i, i + 3));
  }
  return grupos;
});

// Guardar la posición al salir y restaurarla al volver
@Injectable({ providedIn: 'root' })
export class ScrollService {
  posicionTendencias = signal(0);
}

export default class TendenciasComponent implements AfterViewInit {
  private scroll = inject(ScrollService);

  ngAfterViewInit(): void {
    const div = this.contenedor()?.nativeElement;
    if (div) div.scrollTop = this.scroll.posicionTendencias();
  }

  alHacerScroll(): void {
    // ...
    this.scroll.posicionTendencias.set(div.scrollTop);
  }
}`,
        'Como el servicio vive en la raíz, sobrevive a la navegación: al volver a la página, los GIF ya cargados y la posición siguen ahí.',
      ),
      text(
        'Depurar la aplicación',
        `Consola del navegador: console.log() y la pestaña Red para ver cada petición, sus parámetros y su respuesta.
Puntos de interrupción: en la pestaña Sources, o escribiendo debugger en el código, puedes detener la ejecución e inspeccionar las variables.
Angular DevTools: extensión del navegador que muestra el árbol de componentes, el valor de sus señales e inputs, y un perfilador de la detección de cambios.
En la plantilla: {{ valor | json }} muestra un objeto completo mientras desarrollas.

Los errores de Angular llevan un código (NG0201, NG8001…) que puedes buscar en la referencia de errores de la documentación.`,
      ),
    ],
  },
  {
    title: 'Proyecto CountryApp',
    topics: [
      text(
        'Qué se construye en CountryApp',
        `Una aplicación de una sola página (SPA) para consultar países con la API pública REST Countries: búsqueda por capital, por nombre y por región, y una página de detalle de cada país.

Con ella se practican los layouts, las tablas, el mapeo de datos, el manejo de errores, resource y rxResource, las búsquedas automáticas con debounce, la caché de resultados y los parámetros de consulta en la URL.`,
      ),
      code(
        'Estructura de carpetas y rutas',
        `src/app/
├── compartido/
│   ├── components/      ← pie de página, indicador de carga
│   └── pages/           ← inicio, no encontrado
└── paises/
    ├── components/      ← buscador, tabla, menú superior
    ├── interfaces/
    ├── layouts/
    ├── mappers/
    ├── pages/           ← por-capital, por-pais, por-region, pais
    ├── services/
    └── paises.routes.ts

// app.routes.ts
export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'paises', loadChildren: () => import('./paises/paises.routes') },
  { path: '**', redirectTo: '' },
];

// paises.routes.ts
export const paisesRoutes: Routes = [
  {
    path: '',
    component: PaisesLayoutComponent,
    children: [
      { path: 'por-capital', component: PorCapitalComponent },
      { path: 'por-pais', component: PorPaisComponent },
      { path: 'por-region', component: PorRegionComponent },
      { path: 'por/:codigo', component: PaisComponent },
      { path: '**', redirectTo: 'por-capital' },
    ],
  },
];
export default paisesRoutes;`,
        'Cada funcionalidad tiene su propio archivo de rutas y se carga de forma diferida con loadChildren.',
      ),
      code(
        'Componentes reutilizables: buscador y tabla',
        `@Component({
  selector: 'pais-buscador',
  template: \`
    <input class="input input-bordered" [placeholder]="textoAyuda()"
           #campo (keyup.enter)="buscar.emit(campo.value)">
    <button class="btn btn-primary" (click)="buscar.emit(campo.value)">Buscar</button>
  \`,
})
export class BuscadorComponent {
  textoAyuda = input('Buscar');
  buscar = output<string>();
}

@Component({
  selector: 'pais-tabla',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './tabla.component.html',
})
export class TablaComponent {
  paises = input.required<Pais[]>();
  cargando = input(false);
  mensajeError = input<string | null>(null);
}`,
        'Las tres páginas de búsqueda reutilizan los mismos dos componentes: solo cambian el texto de ayuda y la función que consulta.',
      ),
      code(
        'Mapear la respuesta y mostrar el nombre en español',
        `export interface Pais {
  codigo: string;
  bandera: string;
  nombre: string;
  capital: string;
  poblacion: number;
}

export class PaisMapper {
  static aPais(item: RESTCountry): Pais {
    return {
      codigo: item.cca2,
      bandera: item.flags.svg,
      nombre: item.translations['spa']?.common ?? item.name.common,
      capital: item.capital?.join(', ') ?? 'Sin capital',
      poblacion: item.population,
    };
  }

  static aPaises(items: RESTCountry[]): Pais[] {
    return items.map(PaisMapper.aPais);
  }
}

<!-- tabla.component.html -->
<td>{{ pais.poblacion | number }}</td>`,
        'La API devuelve el nombre en inglés y las traducciones aparte. El mapper elige la traducción al español y deja un valor por defecto cuando falta un dato.',
      ),
      code(
        'Servicio con manejo de excepciones',
        `const API = 'https://restcountries.com/v3.1';

@Injectable({ providedIn: 'root' })
export class PaisesService {
  private http = inject(HttpClient);

  buscarPorCapital(termino: string): Observable<Pais[]> {
    const consulta = termino.trim().toLowerCase();

    return this.http.get<RESTCountry[]>(API + '/capital/' + consulta).pipe(
      map((respuesta) => PaisMapper.aPaises(respuesta)),
      catchError((error) => {
        console.error('Error al buscar', error);
        return throwError(() => new Error('No se encontró un país con la capital ' + consulta));
      }),
    );
  }
}`,
        'Cuando no hay resultados la API responde 404. catchError lo convierte en un error con un mensaje pensado para el usuario, que la página puede mostrar tal cual.',
      ),
      code(
        'Mostrar los estados: cargando, error, vacío y datos',
        `<!-- por-capital.component.html -->
<pais-buscador textoAyuda="Buscar por capital" (buscar)="termino.set($event)" />

<pais-tabla
  [paises]="resultado.value() ?? []"
  [cargando]="resultado.isLoading()"
  [mensajeError]="resultado.error()?.message ?? null"
/>

<!-- tabla.component.html -->
@if (mensajeError()) {
  <tr><td colspan="6">{{ mensajeError() }}</td></tr>
} @else if (cargando()) {
  <tr><td colspan="6">Buscando…</td></tr>
} @else if (paises().length === 0) {
  <tr><td colspan="6">Escribe un término para buscar.</td></tr>
}

@for (pais of paises(); track pais.codigo; let i = $index) {
  <tr>
    <td>{{ i + 1 }}</td>
    <td><img [src]="pais.bandera" [alt]="'Bandera de ' + pais.nombre" width="40"></td>
    <td>{{ pais.nombre }}</td>
    <td><a [routerLink]="['/paises/por', pais.codigo]">Más información</a></td>
  </tr>
}`,
        'Una pantalla que consulta datos tiene cuatro estados y hay que diseñar los cuatro: mientras carga, cuando falla, cuando no hay resultados y cuando sí los hay.',
      ),
      code(
        'Búsqueda automática con debounce usando un efecto',
        `export class BuscadorComponent {
  buscar = output<string>();
  retraso = input(500);
  valorInicial = input('');

  texto = linkedSignal(() => this.valorInicial());

  constructor() {
    effect((alLimpiar) => {
      const valor = this.texto();

      const temporizador = setTimeout(() => this.buscar.emit(valor), this.retraso());

      // Si el usuario teclea de nuevo antes del plazo, se cancela el anterior
      alLimpiar(() => clearTimeout(temporizador));
    });
  }
}

<input [value]="texto()" (input)="texto.set($any($event.target).value)">`,
        'Debounce significa esperar a que el usuario deje de escribir antes de lanzar la petición. La función de limpieza del efecto cancela el temporizador pendiente cada vez que cambia el texto.',
      ),
      code(
        'Caché de resultados con Map',
        `export class PaisesService {
  private cacheCapital = new Map<string, Pais[]>();
  private cacheRegion = new Map<Region, Pais[]>();

  buscarPorCapital(termino: string): Observable<Pais[]> {
    const consulta = termino.trim().toLowerCase();

    if (this.cacheCapital.has(consulta)) {
      return of(this.cacheCapital.get(consulta)!);
    }

    return this.http.get<RESTCountry[]>(API + '/capital/' + consulta).pipe(
      map((respuesta) => PaisMapper.aPaises(respuesta)),
      tap((paises) => this.cacheCapital.set(consulta, paises)),
    );
  }
}`,
        'Map guarda pares clave–valor y es más cómodo que un objeto para comprobar si una clave existe. La caché dura mientras la pestaña esté abierta; al recargar se vacía.',
      ),
      code(
        'Conservar la búsqueda en los parámetros de consulta',
        `export class PorCapitalComponent {
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);

  // Al entrar: /paises/por-capital?termino=lima
  private inicial = this.ruta.snapshot.queryParamMap.get('termino') ?? '';
  termino = linkedSignal(() => this.inicial);

  resultado = rxResource({
    params: () => ({ termino: this.termino() }),
    stream: ({ params }) => {
      if (!params.termino) return of([]);

      // Actualiza la URL sin recargar la página
      this.router.navigate(['/paises/por-capital'], {
        queryParams: { termino: params.termino },
      });

      return this.servicio.buscarPorCapital(params.termino);
    },
  });
}`,
        'Con el término en la URL, el usuario puede recargar, usar el botón atrás o compartir el enlace sin perder la búsqueda.',
      ),
      code(
        'Validar los parámetros de consulta',
        `type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';

function validarRegion(valor: string): Region {
  const regiones: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };
  return regiones[valor.toLowerCase()] ?? 'Americas';
}

export class PorRegionComponent {
  private parametro = inject(ActivatedRoute).snapshot.queryParamMap.get('region') ?? '';
  region = linkedSignal<Region>(() => validarRegion(this.parametro));
}`,
        'Cualquiera puede escribir lo que quiera en la URL. Nunca confíes en un parámetro: compruébalo contra los valores permitidos y usa uno por defecto si no coincide.',
      ),
      code(
        'Página de detalle de un país',
        `export class PaisComponent {
  private servicio = inject(PaisesService);
  codigo = inject(ActivatedRoute).snapshot.params['codigo'] as string;

  pais = rxResource({
    params: () => ({ codigo: this.codigo }),
    stream: ({ params }) => this.servicio.buscarPorCodigo(params.codigo),
  });
}

@if (pais.isLoading()) {
  <app-cargando />
} @else if (pais.error()) {
  <app-no-encontrado />
} @else if (pais.value(); as datos) {
  <h1>{{ datos.nombre }}</h1>
  <img [src]="datos.bandera" [alt]="'Bandera de ' + datos.nombre">
  <p>Capital: {{ datos.capital }}</p>
  <p>Población: {{ datos.poblacion | number }}</p>
}`,
      ),
    ],
  },
  {
    title: 'Pipes en profundidad',
    topics: [
      code(
        'Cambiar el idioma de los pipes',
        `// app.config.ts
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
};

{{ fecha | date:'fullDate' }}          <!-- lunes, 15 de abril de 2024 -->
{{ fecha | date:'fullDate':'':'fr' }}  <!-- lundi 15 avril 2024 -->
{{ 1250.5 | currency:'EUR' }}          <!-- 1.250,50 € -->`,
        'Por defecto los pipes dan formato en inglés de Estados Unidos. LOCALE_ID cambia el idioma de toda la aplicación; el último parámetro de date, number, currency y percent lo cambia para un solo valor.',
      ),
      code(
        'Cambiar el locale de forma dinámica',
        `@Injectable({ providedIn: 'root' })
export class LocaleService {
  private actual = signal(localStorage.getItem('locale') ?? 'es');

  get locale(): string {
    return this.actual();
  }

  cambiar(locale: string): void {
    localStorage.setItem('locale', locale);
    this.actual.set(locale);
    window.location.reload();   // LOCALE_ID se lee una sola vez al arrancar
  }
}

// app.config.ts
{
  provide: LOCALE_ID,
  deps: [LocaleService],
  useFactory: (servicio: LocaleService) => servicio.locale,
}`,
        'El proveedor con useFactory calcula el valor a partir de un servicio. Como LOCALE_ID se resuelve al iniciar la aplicación, cambiar de idioma requiere recargar la página.',
      ),
      code(
        'I18nSelectPipe e I18nPluralPipe',
        `import { I18nPluralPipe, I18nSelectPipe } from '@angular/common';

export class ClientesComponent {
  genero = signal<'masculino' | 'femenino'>('femenino');
  invitacion = { masculino: 'invitarlo', femenino: 'invitarla' };

  clientes = signal(['Ana', 'Luis']);
  mapaClientes = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando',
  };
}

<p>Es un placer {{ genero() | i18nSelect:invitacion }} a nuestro evento.</p>
<p>Actualmente {{ clientes().length | i18nPlural:mapaClientes }}.</p>`,
        'i18nSelect elige un texto según un valor; i18nPlural, según una cantidad, y sustituye # por el número. Evitan llenar la plantilla de condiciones.',
      ),
      code(
        'SlicePipe, JsonPipe y KeyValuePipe',
        `clientes = ['Ana', 'Luis', 'Marta', 'Pedro', 'Eva'];
perfil = { nombre: 'Ana', edad: 28, ciudad: 'Lima' };

{{ clientes | slice:0:2 }}        <!-- Ana,Luis -->
{{ clientes | slice:1 }}          <!-- Luis,Marta,Pedro,Eva -->

<pre>{{ perfil | json }}</pre>   <!-- el objeto completo, con sangría -->

@for (dato of perfil | keyvalue; track dato.key) {
  <li>{{ dato.key | titlecase }}: {{ dato.value }}</li>
}`,
        'slice funciona como el método slice() de los arreglos y las cadenas. json es ideal para depurar. keyvalue convierte un objeto o un Map en una lista que se puede recorrer.',
      ),
      code(
        'AsyncPipe con promesas y observables',
        `import { AsyncPipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

export class AsincronoComponent {
  promesa: Promise<string> = new Promise((resolve) => {
    setTimeout(() => resolve('Tenemos datos de la promesa'), 3500);
  });

  contador$ = interval(2000).pipe(
    map((valor) => valor + 1),
    tap((valor) => console.log('tick', valor)),
  );
}

@if (promesa | async; as valor) {
  <p>{{ valor }}</p>
} @else {
  <p>Esperando…</p>
}

<p>Contador: {{ contador$ | async }}</p>`,
        'Mientras no llega el primer valor, async devuelve null: por eso se combina con @if. Cada | async crea su propia suscripción; si necesitas el valor en varios sitios, guárdalo con «as».',
      ),
      code(
        'Proyección de contenido para una tarjeta reutilizable',
        `@Component({
  selector: 'app-tarjeta',
  template: \`
    <section class="card">
      <h2>{{ titulo() }}</h2>
      <ng-content />
    </section>
  \`,
})
export class TarjetaComponent {
  titulo = input.required<string>();
}

<app-tarjeta titulo="DatePipe">
  <p>{{ hoy | date:'short' }}</p>
</app-tarjeta>

<app-tarjeta titulo="CurrencyPipe">
  <p>{{ 2567.5 | currency }}</p>
</app-tarjeta>`,
        'La tarjeta define el marco y cada uso decide qué va dentro.',
      ),
      code(
        'Pipe personalizado: alternar mayúsculas',
        `@Pipe({ name: 'toggleCase' })
export class ToggleCasePipe implements PipeTransform {
  transform(valor: string, mayusculas = true): string {
    return mayusculas ? valor.toUpperCase() : valor.toLowerCase();
  }
}

{{ nombre | toggleCase }}                <!-- ANA -->
{{ nombre | toggleCase:false }}          <!-- ana -->
{{ nombre | toggleCase:enMayusculas() }} <!-- depende de la señal -->`,
        'El argumento puede ser un valor fijo o una señal: cuando cambia, el pipe se vuelve a ejecutar.',
      ),
      code(
        'Pipes para traducir valores a texto y color',
        `export enum Color { rojo, negro, azul, verde }

export interface Heroe {
  nombre: string;
  puedeVolar: boolean;
  color: Color;
}

@Pipe({ name: 'puedeVolar' })
export class PuedeVolarPipe implements PipeTransform {
  transform(valor: boolean): 'Vuela' | 'No vuela' {
    return valor ? 'Vuela' : 'No vuela';
  }
}

@Pipe({ name: 'nombreColor' })
export class NombreColorPipe implements PipeTransform {
  transform(valor: Color): string {
    return Color[valor];   // 2 → 'azul'
  }
}

<td>{{ heroe.puedeVolar | puedeVolar }}</td>
<td [style.color]="heroe.color | nombreColor">{{ heroe.color | nombreColor | titlecase }}</td>`,
        'Un pipe mantiene fuera de la plantilla la lógica de presentación y se puede reutilizar en toda la aplicación.',
      ),
      code(
        'Pipes para ordenar y filtrar listas',
        `@Pipe({ name: 'ordenarPor' })
export class OrdenarPorPipe implements PipeTransform {
  transform(heroes: Heroe[], campo: keyof Heroe | null): Heroe[] {
    if (!campo) return heroes;

    // Copia: nunca ordenes el arreglo original
    return [...heroes].sort((a, b) => (a[campo] > b[campo] ? 1 : -1));
  }
}

@Pipe({ name: 'filtrar' })
export class FiltrarPipe implements PipeTransform {
  transform(heroes: Heroe[], texto: string): Heroe[] {
    const busqueda = texto.trim().toLowerCase();
    if (!busqueda) return heroes;
    return heroes.filter((heroe) => heroe.nombre.toLowerCase().includes(busqueda));
  }
}

@for (heroe of heroes() | filtrar:texto() | ordenarPor:campo(); track heroe.nombre) {
  <tr>...</tr>
}`,
        'La documentación de Angular advierte que filtrar y ordenar con pipes puede ser costoso en listas grandes. Para pocos elementos es cómodo; para muchos, calcula la lista con computed() en el componente.',
      ),
    ],
  },
  {
    title: 'Formularios reactivos en la práctica',
    topics: [
      code(
        'Utilidades compartidas para los errores',
        `export class FormUtils {
  static esInvalido(formulario: FormGroup, campo: string): boolean {
    const control = formulario.controls[campo];
    return !!control.errors && control.touched;
  }

  static mensajeDeError(formulario: FormGroup, campo: string): string | null {
    const errores = formulario.controls[campo]?.errors ?? {};

    for (const clave of Object.keys(errores)) {
      switch (clave) {
        case 'required': return 'Este campo es obligatorio';
        case 'minlength': return 'Mínimo ' + errores['minlength'].requiredLength + ' caracteres';
        case 'min': return 'El valor mínimo es ' + errores['min'].min;
        case 'email': return 'El correo no es válido';
        case 'pattern': return 'El formato no es válido';
      }
    }
    return null;
  }
}

// en el componente
formUtils = FormUtils;

@if (formUtils.esInvalido(formulario, 'nombre')) {
  <span class="error">{{ formUtils.mensajeDeError(formulario, 'nombre') }}</span>
}`,
        'Sin una utilidad común, cada formulario repetiría las mismas condiciones. Así los mensajes se definen una sola vez.',
      ),
      code(
        'Enviar, marcar los campos y reiniciar',
        `guardar(): void {
  if (this.formulario.invalid) {
    // Muestra todos los errores, aunque el usuario no haya tocado los campos
    this.formulario.markAllAsTouched();
    return;
  }

  console.log(this.formulario.value);

  this.formulario.reset({ precio: 0, existencias: 0 });
}`,
        'reset() limpia los valores y también el estado touched y dirty. Acepta los valores con los que debe quedar el formulario.',
      ),
      code(
        'Arreglos dinámicos: agregar y eliminar controles',
        `export class DinamicosComponent {
  private fb = inject(FormBuilder);

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    juegosFavoritos: this.fb.array(
      [['Zelda', Validators.required], ['Mario', Validators.required]],
      Validators.minLength(2),
    ),
  });

  nuevoJuego = new FormControl('', Validators.required);

  get juegosFavoritos(): FormArray {
    return this.formulario.get('juegosFavoritos') as FormArray;
  }

  agregar(): void {
    if (this.nuevoJuego.invalid) return;
    this.juegosFavoritos.push(this.fb.control(this.nuevoJuego.value, Validators.required));
    this.nuevoJuego.reset();
  }

  eliminar(indice: number): void {
    this.juegosFavoritos.removeAt(indice);
  }
}

<div formArrayName="juegosFavoritos">
  @for (juego of juegosFavoritos.controls; track $index; let i = $index) {
    <input [formControlName]="i">
    <button type="button" (click)="eliminar(i)">Eliminar</button>
  }
</div>

<input [formControl]="nuevoJuego" (keydown.enter)="agregar(); $event.preventDefault()">`,
        'El FormArray tiene su propio validador (al menos dos elementos) además del de cada control. Un mismo evento puede ejecutar varias sentencias separadas por punto y coma; aquí preventDefault evita que Enter envíe el formulario.',
      ),
      code(
        'Interruptores, casillas y botones de opción',
        `formulario = this.fb.group({
  genero: ['M', Validators.required],
  quiereNotificaciones: [true],
  aceptaCondiciones: [false, Validators.requiredTrue],
});

<label><input type="radio" value="M" formControlName="genero"> Masculino</label>
<label><input type="radio" value="F" formControlName="genero"> Femenino</label>

<label><input type="checkbox" formControlName="quiereNotificaciones"> Notificaciones</label>
<label><input type="checkbox" formControlName="aceptaCondiciones"> Acepto las condiciones</label>

guardar(): void {
  // Separa lo que no forma parte del modelo que se guarda
  const { aceptaCondiciones, ...persona } = this.formulario.value;
  console.log(persona);
}`,
        'Validators.requiredTrue exige que la casilla esté marcada; required no sirve porque false también es un valor.',
      ),
      code(
        'Validar contra expresiones regulares',
        `export class FormUtils {
  static patronNombre = '([a-zA-Z]+) ([a-zA-Z]+)';
  static patronCorreo = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\\\.[a-z]{2,4}$';
  static patronSinEspacios = '^[a-zA-Z0-9]+$';
}

formulario = this.fb.group({
  nombre: ['', [Validators.required, Validators.pattern(FormUtils.patronNombre)]],
  correo: ['', [Validators.required, Validators.pattern(FormUtils.patronCorreo)]],
  usuario: ['', [Validators.required, Validators.pattern(FormUtils.patronSinEspacios)]],
});`,
        'Validators.email acepta direcciones sin dominio de primer nivel, como ana@servidor. Un patrón propio permite ser más estricto.',
      ),
      code(
        'Validación personalizada síncrona',
        `export class FormUtils {
  static noEsStrider(control: AbstractControl): ValidationErrors | null {
    const valor = String(control.value ?? '').trim().toLowerCase();
    return valor === 'strider' ? { usuarioReservado: true } : null;
  }

  static camposIguales(campo1: string, campo2: string) {
    return (grupo: AbstractControl): ValidationErrors | null => {
      const valor1 = grupo.get(campo1)?.value;
      const valor2 = grupo.get(campo2)?.value;
      return valor1 === valor2 ? null : { camposDistintos: true };
    };
  }
}

formulario = this.fb.group(
  {
    usuario: ['', [Validators.required, FormUtils.noEsStrider]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
    repetirClave: ['', Validators.required],
  },
  { validators: [FormUtils.camposIguales('clave', 'repetirClave')] },
);

@if (formulario.hasError('camposDistintos') && formulario.get('repetirClave')?.touched) {
  <span class="error">Las contraseñas no coinciden.</span>
}`,
        'El error de un validador de grupo queda en el formulario, no en un campo: por eso se consulta con formulario.hasError().',
      ),
      code(
        'Validación asíncrona',
        `export class FormUtils {
  static async correoDisponible(control: AbstractControl): Promise<ValidationErrors | null> {
    const correo = control.value;

    // Simula una consulta al servidor
    await new Promise((resolve) => setTimeout(resolve, 2500));

    return correo === 'hola@mundo.com' ? { correoEnUso: true } : null;
  }
}

correo: [
  '',
  [Validators.required, Validators.pattern(FormUtils.patronCorreo)],   // síncronos
  [FormUtils.correoDisponible],                                         // asíncronos
],

@if (formulario.get('correo')?.pending) {
  <span>Comprobando disponibilidad…</span>
}`,
        'Los validadores asíncronos van en la tercera posición y solo se ejecutan cuando pasan los síncronos. Mientras responden, el control está en estado pending y el formulario no es válido.',
      ),
      code(
        'Selectores anidados: continente, país y fronteras',
        `export class SelectoresComponent {
  private servicio = inject(PaisesService);

  regiones = this.servicio.regiones;
  paises = signal<Pais[]>([]);
  fronteras = signal<Pais[]>([]);

  formulario = inject(FormBuilder).group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  alCambiar = effect((alLimpiar) => {
    const regionSub = this.formulario.get('region')!.valueChanges.pipe(
      tap(() => this.formulario.get('pais')!.setValue('')),
      tap(() => this.fronteras.set([])),
      switchMap((region) => this.servicio.porRegion(region ?? '')),
    ).subscribe((paises) => this.paises.set(paises));

    const paisSub = this.formulario.get('pais')!.valueChanges.pipe(
      tap(() => this.formulario.get('frontera')!.setValue('')),
      filter((codigo) => !!codigo),
      switchMap((codigo) => this.servicio.fronterasDe(codigo!)),
    ).subscribe((fronteras) => this.fronteras.set(fronteras));

    alLimpiar(() => {
      regionSub.unsubscribe();
      paisSub.unsubscribe();
    });
  });
}`,
        'Cada selector depende del anterior: al cambiar el primero se limpian los siguientes y se piden sus opciones. valueChanges notifica cada cambio y switchMap descarta la petición anterior si el usuario cambia de opinión rápido.',
      ),
    ],
  },
]
