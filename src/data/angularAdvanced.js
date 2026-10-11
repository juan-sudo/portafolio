// Angular 17 · niveles 12 a 17: Signals, rendimiento, pruebas, renderizado en servidor, i18n, seguridad y despliegue.

import { code, links, text } from './angularHelpers'

export const angularAdvancedLevels = [
  {
    level: 12,
    title: 'Signals',
    topics: [
      text(
        '¿Qué es un signal?',
        `Un signal es un envoltorio alrededor de un valor que avisa a quien lo usa cuando ese valor cambia. Puede contener cualquier cosa, desde un número hasta una estructura de datos compleja.

Su valor se lee siempre llamando a una función, y eso permite a Angular saber exactamente dónde se usa cada signal y actualizar solo lo necesario. Hay signals de escritura y de solo lectura.`,
      ),
      code(
        'Signals de escritura',
        `import { signal } from '@angular/core';

const contador = signal(0);

console.log(contador());          // 0: se lee llamándolo como función

contador.set(3);                  // asigna un valor nuevo
contador.update((n) => n + 1);    // calcula el nuevo a partir del anterior

console.log(contador());          // 4`,
        'Para arreglos y objetos crea siempre un valor nuevo: lista.update((actual) => [...actual, item]). Modificar el arreglo existente no notifica el cambio.',
      ),
      code(
        'Signals calculados con computed',
        `import { computed, signal } from '@angular/core';

const precio = signal(100);
const cantidad = signal(2);

const total = computed(() => precio() * cantidad());

console.log(total());   // 200
cantidad.set(3);
console.log(total());   // 300

// total.set(500);  ← error: un computed es de solo lectura`,
        'Un computed se evalúa de forma perezosa y guarda su resultado en memoria: no se calcula hasta que alguien lo lee y solo se recalcula cuando cambia alguno de los signals que usó.',
      ),
      code(
        'Signals en un componente',
        `import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>Productos: {{ cantidad() }}</p>
    <p>Total: {{ total() }}</p>
    <button (click)="agregar()">Agregar</button>
  \`,
})
export class CarritoComponent {
  precio = 25;
  cantidad = signal(0);
  total = computed(() => this.cantidad() * this.precio);

  agregar(): void {
    this.cantidad.update((n) => n + 1);
  }
}`,
        'Cuando un componente OnPush lee un signal en su plantilla, Angular lo registra como dependencia y actualiza el componente al cambiar el valor. Olvidar los paréntesis en la plantilla produce el aviso NG8109.',
      ),
      code(
        'Efectos',
        `import { effect, signal } from '@angular/core';

export class PreferenciasComponent {
  tema = signal('claro');

  constructor() {
    effect((alLimpiar) => {
      localStorage.setItem('tema', this.tema());
      console.log('Tema guardado:', this.tema());

      alLimpiar(() => console.log('Antes de la siguiente ejecución'));
    });
  }
}`,
        'Un efecto se ejecuta al menos una vez y de nuevo cada vez que cambia algún signal que leyó. Solo se puede crear en un contexto de inyección y se destruye con el componente. Úsalo para registrar datos, sincronizar con localStorage o dibujar en un canvas; no para copiar un signal a otro, para eso está computed. En Angular 17 effect() está en vista previa.',
      ),
      code(
        'Leer sin crear dependencia: untracked',
        `import { effect, untracked } from '@angular/core';

effect(() => {
  // Se vuelve a ejecutar cuando cambia usuario, pero no cuando cambia contador
  console.log('Usuario:', usuario(), 'Contador:', untracked(contador));
});`,
      ),
      code(
        'Inputs basados en signals',
        `import { Component, computed, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-saludo',
  standalone: true,
  template: '<p>{{ mensaje() }}</p>',
})
export class SaludoComponent {
  nombre = input.required<string>();            // obligatorio
  saludo = input('Hola');                       // opcional, con valor por defecto
  edad = input(0, { transform: numberAttribute });

  mensaje = computed(() => this.saludo() + ', ' + this.nombre());
}

<app-saludo nombre="Ana" [saludo]="'Buenos días'" />`,
        'input() devuelve un signal de solo lectura: el valor se lee con paréntesis y se puede usar en computed y effect, sin necesidad de ngOnChanges. Disponible desde Angular 17.1 en vista previa.',
      ),
      code(
        'Enlace bidireccional con model()',
        `import { Component, model } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  template: '<button (click)="incrementar()">{{ valor() }}</button>',
})
export class ContadorComponent {
  valor = model(0);

  incrementar(): void {
    this.valor.update((n) => n + 1);   // el padre recibe el nuevo valor
  }
}

<!-- padre: cantidad es un signal o una propiedad normal -->
<app-contador [(valor)]="cantidad" />`,
        'model() crea un input que el propio componente puede modificar, y genera por ti el output valorChange. Disponible desde Angular 17.2 en vista previa, igual que las consultas viewChild(), viewChildren() y contentChild() basadas en signals.',
      ),
      code(
        'Interoperabilidad con RxJS',
        `import { toObservable, toSignal } from '@angular/core/rxjs-interop';

export class BuscadorComponent {
  private servicio = inject(ProductosService);

  termino = signal('');

  // Signal → Observable
  private termino$ = toObservable(this.termino);

  // Observable → Signal
  resultados = toSignal(
    this.termino$.pipe(
      debounceTime(300),
      switchMap((texto) => this.servicio.buscar(texto)),
    ),
    { initialValue: [] },
  );
}`,
        'toSignal() se suscribe de inmediato y cancela la suscripción al destruirse el componente. Como un signal siempre tiene valor, indica initialValue; sin él, el valor es undefined hasta la primera emisión.',
      ),
      links('Guías de Signals', [
        ['Signals', 'guide/signals'],
        ['Inputs basados en signals', 'guide/signal-inputs'],
        ['Model inputs', 'guide/model-inputs'],
        ['Consultas basadas en signals', 'guide/signal-queries'],
        ['Interoperabilidad con RxJS', 'guide/rxjs-interop'],
      ]),
    ],
  },
  {
    level: 13,
    title: 'Detección de cambios y rendimiento',
    topics: [
      text(
        'Cómo funciona la detección de cambios',
        `La detección de cambios es el proceso con el que Angular comprueba si el estado de la aplicación cambió y si hay que actualizar el DOM. A grandes rasgos, recorre el árbol de componentes de arriba abajo.

Se ejecuta de forma automática gracias a Zone.js, que intercepta eventos del navegador, temporizadores y peticiones de red. Está muy optimizada, pero puede causar lentitud si se ejecuta con demasiada frecuencia o si las plantillas hacen cálculos costosos.`,
      ),
      code(
        'Saltarse subárboles con OnPush',
        `import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-fila-producto',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<td>{{ producto.nombre }}</td><td>{{ producto.precio }}</td>',
})
export class FilaProductoComponent {
  @Input({ required: true }) producto!: Producto;
}`,
        'Con OnPush, Angular solo revisa el componente y sus hijos cuando: recibe un @Input con una referencia nueva, se dispara un evento en su plantilla, emite un Observable usado con async, cambia un signal leído en la plantilla o se llama a markForCheck(). Por eso hay que pasar objetos nuevos en lugar de modificar los existentes.',
      ),
      code(
        'Evitar la contaminación de zonas',
        `import { NgZone, OnInit, inject } from '@angular/core';

export class GraficoComponent implements OnInit {
  private zona = inject(NgZone);

  ngOnInit(): void {
    // Esta librería usa temporizadores que no afectan a la interfaz
    this.zona.runOutsideAngular(() => {
      this.grafico = crearGrafico(this.elemento);
    });
  }

  alSeleccionar(punto: Punto): void {
    // Para volver a entrar cuando sí hay que actualizar la vista
    this.zona.run(() => (this.seleccionado = punto));
  }
}`,
        'Cada tarea asíncrona dentro de la zona de Angular dispara una detección de cambios. Si una librería de terceros crea temporizadores o escucha eventos continuamente, ejecútala fuera con runOutsideAngular().',
      ),
      code(
        'Cálculos lentos en la plantilla',
        `<!-- Mal: se recalcula en cada detección de cambios -->
<p>{{ calcularEstadisticas(ventas) }}</p>

<!-- Mejor: un pipe puro solo se ejecuta cuando cambia la entrada -->
<p>{{ ventas | estadisticas }}</p>

// O un signal calculado, que guarda su resultado
estadisticas = computed(() => calcular(this.ventas()));`,
        'Angular DevTools incluye un perfilador que muestra cuánto tarda cada ciclo de detección de cambios y qué componente lo provoca.',
      ),
      code(
        'Vistas diferibles con @defer',
        `@defer (on viewport) {
  <app-comentarios [productoId]="id" />
} @placeholder (minimum 500ms) {
  <p>Los comentarios aparecerán aquí.</p>
} @loading (after 100ms; minimum 1s) {
  <app-cargando />
} @error {
  <p>No se pudieron cargar los comentarios.</p>
}`,
        '@defer separa en otro archivo JavaScript los componentes, directivas y pipes standalone que contiene, y lo descarga más tarde. @placeholder se muestra antes de empezar, @loading mientras se descarga y @error si falla. En Angular 17 está en vista previa.',
      ),
      code(
        'Disparadores de @defer',
        `@defer (on idle) { ... }              <!-- por defecto: navegador inactivo -->
@defer (on viewport) { ... }          <!-- al entrar en la pantalla -->
@defer (on interaction) { ... }       <!-- al hacer clic o pulsar una tecla -->
@defer (on hover) { ... }             <!-- al pasar el ratón -->
@defer (on timer(5s)) { ... }         <!-- pasado un tiempo -->
@defer (on immediate) { ... }         <!-- en cuanto termina el renderizado -->
@defer (when estaListo) { ... }       <!-- cuando la condición es verdadera -->

<!-- Descargar antes, mostrar después -->
@defer (on interaction; prefetch on idle) {
  <app-calendario />
} @placeholder {
  <button>Abrir calendario</button>
}`,
        'Los disparadores viewport, interaction y hover observan el @placeholder, que debe tener un único elemento raíz, o un elemento indicado con una variable de plantilla.',
      ),
      code(
        'Optimizar imágenes con NgOptimizedImage',
        `import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  template: \`
    <!-- La imagen principal de la página: se carga con prioridad -->
    <img ngSrc="portada.jpg" width="1200" height="600" priority alt="Portada">

    <!-- El resto se carga de forma diferida automáticamente -->
    <img ngSrc="producto.jpg" width="400" height="300" alt="Teclado mecánico">

    <!-- Para que la imagen llene su contenedor -->
    <div style="position: relative; height: 200px">
      <img ngSrc="fondo.jpg" fill alt="">
    </div>
  \`,
})
export class GaleriaComponent {}`,
        'La directiva exige width y height (o fill) para evitar saltos de diseño, aplica lazy loading, genera srcset y avisa en la consola si la imagen más importante no lleva priority. Se usa ngSrc en lugar de src.',
      ),
      links('Guías de rendimiento', [
        ['Detección de cambios', 'guide/change-detection'],
        ['Contaminación de zonas', 'guide/change-detection-zone-pollution'],
        ['Cálculos lentos', 'guide/change-detection-slow-computations'],
        ['Saltarse subárboles', 'guide/change-detection-skipping-subtrees'],
        ['Vistas diferibles', 'guide/defer'],
        ['Optimización de imágenes', 'guide/image-directive'],
      ]),
    ],
  },
  {
    level: 14,
    title: 'Pruebas',
    topics: [
      code(
        'Ejecutar las pruebas',
        `$ ng test

Chrome: Executed 3 of 3 SUCCESS (0.135 secs / 0.205 secs)
TOTAL: 3 SUCCESS`,
        'Angular CLI instala y configura todo lo necesario para probar con Jasmine. ng test compila la aplicación en modo observación, lanza el ejecutor Karma en un navegador y repite las pruebas cada vez que guardas. Los archivos de prueba terminan en .spec.ts y van junto al archivo que prueban.',
      ),
      code(
        'Anatomía de una prueba',
        `describe('Calculadora', () => {
  let calculadora: Calculadora;

  beforeEach(() => {
    calculadora = new Calculadora();
  });

  it('suma dos números', () => {
    expect(calculadora.sumar(2, 3)).toBe(5);
  });

  it('lanza un error al dividir entre cero', () => {
    expect(() => calculadora.dividir(1, 0)).toThrowError();
  });
});`,
        'describe agrupa pruebas, beforeEach prepara cada una, it define un caso y expect comprueba el resultado.',
      ),
      code(
        'Probar un servicio con dependencias',
        `import { TestBed } from '@angular/core/testing';

describe('ProductosService', () => {
  let servicio: ProductosService;
  let registroEspia: jasmine.SpyObj<RegistroService>;

  beforeEach(() => {
    const espia = jasmine.createSpyObj('RegistroService', ['log']);

    TestBed.configureTestingModule({
      providers: [ProductosService, { provide: RegistroService, useValue: espia }],
    });

    servicio = TestBed.inject(ProductosService);
    registroEspia = TestBed.inject(RegistroService) as jasmine.SpyObj<RegistroService>;
  });

  it('registra cada consulta', () => {
    servicio.obtenerTodos();
    expect(registroEspia.log).toHaveBeenCalledTimes(1);
  });
});`,
        'TestBed crea un entorno de Angular para la prueba. La dependencia real se sustituye por un espía de Jasmine para probar el servicio de forma aislada.',
      ),
      code(
        'Probar un componente',
        `import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SaludoComponent', () => {
  let fixture: ComponentFixture<SaludoComponent>;
  let componente: SaludoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaludoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaludoComponent);
    componente = fixture.componentInstance;
  });

  it('muestra el nombre en el título', () => {
    componente.nombre = 'Ana';
    fixture.detectChanges();   // en las pruebas no es automático

    const titulo: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(titulo.textContent).toContain('Ana');
  });
});`,
        'Un componente standalone se añade en imports. El fixture da acceso a la instancia (componentInstance) y al DOM (nativeElement). Hay que llamar a detectChanges() para que la plantilla refleje los cambios.',
      ),
      code(
        'Simular la interacción del usuario',
        `import { By } from '@angular/platform-browser';

it('incrementa el contador al hacer clic', () => {
  fixture.detectChanges();

  const boton = fixture.debugElement.query(By.css('button'));
  boton.triggerEventHandler('click');
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('p').textContent).toContain('1');
});

it('emite el producto elegido', () => {
  let elegido: Producto | undefined;
  componente.seleccionado.subscribe((producto: Producto) => (elegido = producto));

  fixture.debugElement.query(By.css('li')).triggerEventHandler('click');

  expect(elegido).toEqual(componente.productos[0]);
});`,
        'debugElement y By.css funcionan en cualquier plataforma, también en el servidor. Un @Output se prueba suscribiéndose a él.',
      ),
      code(
        'Probar código asíncrono',
        `import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';

it('muestra el mensaje tras la espera', fakeAsync(() => {
  componente.cargarConRetraso();   // usa setTimeout de 1000 ms
  tick(1000);                      // adelanta el reloj simulado
  fixture.detectChanges();

  expect(componente.mensaje).toBe('Listo');
}));

it('carga los datos', waitForAsync(() => {
  fixture.detectChanges();
  fixture.whenStable().then(() => {
    fixture.detectChanges();
    expect(componente.productos.length).toBe(2);
  });
}));`,
        'fakeAsync permite escribir la prueba de forma lineal y controlar el tiempo con tick(). waitForAsync espera a que terminen las tareas asíncronas reales.',
      ),
      code(
        'Probar peticiones HTTP',
        `import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductosService', () => {
  let servicio: ProductosService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    servicio = TestBed.inject(ProductosService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());   // no deben quedar peticiones pendientes

  it('obtiene los productos', () => {
    const datos = [{ id: 1, nombre: 'Teclado', precio: 120 }];

    servicio.obtenerTodos().subscribe((productos) => expect(productos).toEqual(datos));

    const peticion = http.expectOne('/api/productos');
    expect(peticion.request.method).toBe('GET');
    peticion.flush(datos);          // responde con datos de prueba
  });
});`,
        'Ninguna petición sale a la red: HttpTestingController las captura para que compruebes la URL y el método y respondas con flush(). Para simular un fallo: peticion.flush(\'Error\', { status: 500, statusText: \'Server Error\' }).',
      ),
      code(
        'Probar pipes y directivas',
        `// Un pipe es una clase normal: no necesita TestBed
describe('PotenciaPipe', () => {
  const pipe = new PotenciaPipe();

  it('eleva al exponente indicado', () => {
    expect(pipe.transform(2, 10)).toBe(1024);
  });
});

// Una directiva se prueba con un componente de prueba que la usa
@Component({
  standalone: true,
  imports: [ResaltarDirective],
  template: '<p appResaltar="cyan">Texto</p>',
})
class PruebaComponent {}

it('pinta el fondo', () => {
  const fixture = TestBed.createComponent(PruebaComponent);
  fixture.detectChanges();
  const parrafo: HTMLElement = fixture.nativeElement.querySelector('p');
  expect(parrafo.style.backgroundColor).toBe('cyan');
});`,
      ),
      code(
        'Cobertura de código',
        `$ ng test --no-watch --code-coverage

=============================== Coverage summary ===============================
Statements   : 87.5% ( 42/48 )
Branches     : 75% ( 9/12 )
Functions    : 90% ( 18/20 )
Lines        : 88.37% ( 38/43 )
================================================================================`,
        'El informe detallado se genera en la carpeta coverage/. Puedes exigir un mínimo en karma.conf.js con la opción check de coverageReporter para que la compilación falle si la cobertura baja.',
      ),
      links('Guías de pruebas', [
        ['Introducción a las pruebas', 'guide/testing'],
        ['Probar servicios', 'guide/testing-services'],
        ['Fundamentos de pruebas de componentes', 'guide/testing-components-basics'],
        ['Escenarios de pruebas de componentes', 'guide/testing-components-scenarios'],
        ['Probar peticiones HTTP', 'guide/http-test-requests'],
        ['Cobertura de código', 'guide/testing-code-coverage'],
      ]),
    ],
  },
  {
    level: 15,
    title: 'Renderizado en servidor, hidratación y PWA',
    topics: [
      text(
        '¿Qué es el renderizado en el servidor?',
        `Con el renderizado en el servidor (SSR), la página se genera en el servidor y llega al navegador como HTML con su contenido inicial. Después se descarga el JavaScript y la aplicación se vuelve interactiva.

Ventajas frente al renderizado solo en el cliente: el usuario ve el contenido antes, mejoran las métricas Core Web Vitals y los buscadores pueden leer la página con más facilidad.`,
      ),
      code(
        'Activar SSR',
        `# En un proyecto nuevo
$ ng new mi-app --ssr

# En un proyecto existente
$ ng add @angular/ssr

mi-app/
├── server.ts                      ← servidor Node.js con Express
└── src/
    ├── main.server.ts             ← arranque de la aplicación en el servidor
    └── app/
        └── app.config.server.ts   ← proveedores del servidor`,
        'Tras ng build, la carpeta dist/ contiene una parte browser y otra server. El servidor se inicia con: node dist/mi-app/server/server.mjs.',
      ),
      code(
        'Hidratación',
        `// app.config.ts
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()],
};

<!-- Excluir un componente que manipula el DOM directamente -->
<app-grafico ngSkipHydration />`,
        'La hidratación reutiliza el HTML que envió el servidor en lugar de destruirlo y volver a crearlo: evita el parpadeo y conserva el estado. Exige que el DOM sea idéntico en servidor y cliente; si no lo es aparece el error NG0500. HttpClient reutiliza además las respuestas GET que ya se pidieron en el servidor.',
      ),
      code(
        'Código que solo funciona en el navegador',
        `import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  template: '<div #contenedor></div>',
})
export class MapaComponent {
  @ViewChild('contenedor') contenedor!: ElementRef<HTMLElement>;

  constructor() {
    // Solo se ejecuta en el navegador, después del renderizado
    afterNextRender(() => {
      const ancho = this.contenedor.nativeElement.offsetWidth;
      iniciarMapa(this.contenedor.nativeElement, ancho);
    });
  }
}`,
        'En el servidor no existen window, document, navigator ni localStorage. Usa afterRender() o afterNextRender() para el código que los necesita; ngOnInit() se ejecuta en ambos lados.',
      ),
      code(
        'Prerenderizado',
        `// angular.json → projects.mi-app.architect.build.options
"prerender": {
  "routesFile": "rutas.txt"
}

# rutas.txt: una ruta con parámetros por línea
/productos/1
/productos/2`,
        'El prerenderizado (SSG) genera el HTML durante la compilación y lo guarda como archivos estáticos, sin necesitar un servidor Node.js. Conviene cuando el contenido es igual para todos los usuarios. Las rutas sin parámetros se descubren solas.',
      ),
      code(
        'Convertir la aplicación en una PWA',
        `$ ng add @angular/pwa

CREATE ngsw-config.json
CREATE src/manifest.webmanifest
CREATE src/assets/icons/icon-192x192.png
UPDATE angular.json
UPDATE src/app/app.config.ts
UPDATE src/index.html`,
        'Un service worker es un script que actúa como proxy de red en el navegador: intercepta las peticiones y decide si responde desde la caché. Así la aplicación carga rápido y funciona sin conexión. Solo se activa en compilaciones de producción y sobre HTTPS o localhost.',
      ),
      code(
        'Avisar de una versión nueva',
        `import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActualizacionService {
  constructor(actualizaciones: SwUpdate) {
    actualizaciones.versionUpdates
      .pipe(filter((evento): evento is VersionReadyEvent => evento.type === 'VERSION_READY'))
      .subscribe(() => {
        if (confirm('Hay una versión nueva. ¿Recargar ahora?')) {
          document.location.reload();
        }
      });
  }
}`,
        'El service worker sirve la versión en caché y descarga la nueva en segundo plano. En ngsw-config.json se define qué archivos se guardan (assetGroups) y cómo se cachean las llamadas a la API (dataGroups).',
      ),
      code(
        'Trabajo pesado en un web worker',
        `$ ng generate web-worker app

// app.worker.ts
addEventListener('message', ({ data }) => {
  postMessage(calcularPrimos(data));
});

// en el componente
if (typeof Worker !== 'undefined') {
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => (this.resultado = data);
  worker.postMessage(1_000_000);
}`,
        'Un web worker ejecuta cálculos intensivos en otro hilo para no bloquear la interfaz. No tiene acceso al DOM y no existe en el servidor, por eso se comprueba antes si Worker está disponible.',
      ),
      links('Guías de renderizado y PWA', [
        ['Renderizado en el servidor', 'guide/ssr'],
        ['Hidratación', 'guide/hydration'],
        ['Prerenderizado', 'guide/prerendering'],
        ['Service workers', 'guide/service-worker-intro'],
        ['Configuración del service worker', 'guide/service-worker-config'],
        ['Web workers', 'guide/web-worker'],
      ]),
    ],
  },
  {
    level: 16,
    title: 'Internacionalización, animaciones, accesibilidad y seguridad',
    topics: [
      code(
        'Marcar textos para traducir',
        `$ ng add @angular/localize

<h1 i18n>Hola, mundo</h1>

<!-- significado | descripción @@identificador -->
<h1 i18n="cabecera|Saludo de bienvenida@@saludoInicio">Hola, mundo</h1>

<!-- Traducir un atributo -->
<img [src]="logo" i18n-title title="Logotipo de Angular">

// En el código TypeScript
titulo = $localize\`Bienvenido a la tienda\`;`,
        'La internacionalización (i18n) prepara la aplicación para varios idiomas; la localización crea la versión de cada uno. La descripción y el significado ayudan al traductor. Un identificador propio evita que el texto pierda su traducción si lo retocas.',
      ),
      code(
        'Plurales y alternativas',
        `<span i18n>
  Actualizado {minutos, plural,
    =0 {ahora mismo}
    =1 {hace un minuto}
    other {hace {{ minutos }} minutos}}
</span>

<span i18n>
  {genero, select, masculino {Invitado} femenino {Invitada} other {Persona invitada}}
</span>`,
        'Las expresiones ICU eligen el texto según un número (plural) o un valor (select). Cada idioma tiene sus propias categorías de plural.',
      ),
      code(
        'Extraer, traducir y compilar por idioma',
        `$ ng extract-i18n --output-path src/locale
# Crea src/locale/messages.xlf. Cópialo como messages.en.xlf y tradúcelo.

// angular.json
"i18n": {
  "sourceLocale": "es",
  "locales": {
    "en": { "translation": "src/locale/messages.en.xlf" }
  }
},
"architect": {
  "build": { "options": { "localize": true } }
}

$ ng build --localize
# dist/mi-app/browser/es/  y  dist/mi-app/browser/en/`,
        'Angular genera una copia de la aplicación por idioma con los textos ya sustituidos, de modo que la traducción no cuesta nada en tiempo de ejecución. Los pipes date, currency, number y percent usan el LOCALE_ID de cada copia.',
      ),
      code(
        'Animaciones',
        `// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';
providers: [provideAnimations()]

// panel.component.ts
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-panel',
  standalone: true,
  template: \`
    <button (click)="abierto = !abierto">Alternar</button>
    <div [@abrirCerrar]="abierto ? 'abierto' : 'cerrado'">Contenido</div>
  \`,
  animations: [
    trigger('abrirCerrar', [
      state('abierto', style({ height: '200px', opacity: 1 })),
      state('cerrado', style({ height: '100px', opacity: 0.6 })),
      transition('abierto => cerrado', [animate('1s')]),
      transition('cerrado => abierto', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class PanelComponent {
  abierto = true;
}`,
        'trigger nombra la animación, state define los estilos de cada estado y transition cómo se pasa de uno a otro. En la plantilla se enlaza con [@nombre]. provideAnimationsAsync() carga el módulo de animaciones de forma diferida.',
      ),
      code(
        'Animar la entrada y la salida de elementos',
        `animations: [
  trigger('aparecer', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-10px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'none' })),
    ]),
    transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
  ]),
]

@for (aviso of avisos; track aviso.id) {
  <div @aparecer>{{ aviso.texto }}</div>
}`,
        ':enter es un alias de void => * (el elemento se añade al DOM) y :leave de * => void (se elimina). Para secuencias complejas existen query(), stagger(), group() y sequence(), y animation() con useAnimation() para reutilizar animaciones.',
      ),
      code(
        'Accesibilidad',
        `<!-- Los atributos ARIA se enlazan con attr. -->
<button [attr.aria-label]="etiqueta" [attr.aria-expanded]="abierto">☰</button>

<!-- Prefiere elementos nativos antes que recrearlos con div -->
<button type="button" (click)="guardar()">Guardar</button>

<!-- El enlace activo se anuncia a los lectores de pantalla -->
<a routerLink="/inicio" routerLinkActive="activo" ariaCurrentWhenActive="page">Inicio</a>

// Tras navegar, lleva el foco al contenido principal
this.router.events
  .pipe(filter((evento) => evento instanceof NavigationEnd))
  .subscribe(() => document.querySelector<HTMLElement>('#contenido')?.focus());`,
        'Una aplicación accesible la pueden usar personas con discapacidad visual o motriz. La guía recomienda Angular Material y el paquete a11y del CDK, que incluye LiveAnnouncer para avisos y cdkTrapFocus para mantener el foco dentro de un diálogo.',
      ),
      text(
        'Seguridad: cómo previene Angular el XSS',
        `Un ataque de cross-site scripting (XSS) inyecta código malicioso en la página. Para impedirlo, Angular trata todos los valores como no confiables por defecto: cuando un valor llega al DOM mediante interpolación o un enlace de propiedad, atributo, clase o estilo, Angular lo sanea y lo escapa.

Las plantillas, en cambio, se consideran código de confianza. Por eso nunca debes construir una plantilla concatenando datos que escribió el usuario.

Angular reconoce varios contextos de seguridad: HTML, estilos, URL y URL de recursos. En cada uno aplica reglas distintas.`,
      ),
      code(
        'Saneamiento y valores de confianza',
        `<!-- La interpolación escapa el contenido: se ve como texto -->
<p>{{ htmlDelUsuario }}</p>

<!-- innerHTML interpreta el HTML, pero Angular elimina <script> y los atributos peligrosos -->
<p [innerHTML]="htmlDelUsuario"></p>

// Marcar como seguro un valor que TÚ controlas
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class VideoComponent {
  private sanitizer = inject(DomSanitizer);
  urlVideo: SafeResourceUrl;

  constructor() {
    const id = 'dQw4w9WgXcQ';   // validado, nunca texto libre del usuario
    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + id,
    );
  }
}

<iframe [src]="urlVideo"></iframe>`,
        'Los métodos bypassSecurityTrust… desactivan la protección para ese valor: úsalos solo con datos que controlas por completo. Evita manipular el DOM directamente con ElementRef.nativeElement, porque se salta el saneamiento.',
      ),
      text(
        'Buenas prácticas de seguridad',
        `Mantén Angular y sus dependencias actualizados: las versiones nuevas corrigen vulnerabilidades.
No modifiques tu copia de Angular.
Evita las API marcadas como «Security Risk» en la documentación.
Usa la compilación AOT, que es la opción por defecto, para impedir la inyección de plantillas.
Configura una política de seguridad de contenido (CSP) en el servidor.
Valida y autoriza siempre en el servidor: todo lo que corre en el navegador se puede manipular.
Protege las peticiones contra XSRF con el token que HttpClient envía automáticamente.`,
      ),
      links('Guías de i18n, animaciones, accesibilidad y seguridad', [
        ['Internacionalización', 'guide/i18n-overview'],
        ['Preparar un componente para traducir', 'guide/i18n-common-prepare'],
        ['Animaciones', 'guide/animations'],
        ['Transiciones y triggers', 'guide/transition-and-triggers'],
        ['Accesibilidad', 'guide/accessibility'],
        ['Seguridad', 'guide/security'],
      ]),
    ],
  },
  {
    level: 17,
    title: 'Compilación, despliegue y mantenimiento',
    topics: [
      code(
        'Compilar para producción',
        `$ ng build

Initial Chunk Files   | Names         |  Raw Size | Estimated Transfer Size
main-5XTQ2KPB.js      | main          | 210.45 kB |                57.12 kB
polyfills-LZBJRJJE.js | polyfills     |  32.69 kB |                10.59 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

Output location: dist/mi-app`,
        'La configuración de producción activa la compilación AOT, la minificación, la eliminación de código no usado y añade un hash al nombre de cada archivo para la caché. Los proyectos nuevos de Angular 17 usan el constructor application, basado en esbuild y Vite, y dejan el resultado en dist/mi-app/browser.',
      ),
      code(
        'Entornos de configuración',
        `$ ng generate environments

CREATE src/environments/environment.ts
CREATE src/environments/environment.development.ts
UPDATE angular.json

// src/environments/environment.ts (producción)
export const environment = {
  production: true,
  apiUrl: 'https://api.mitienda.com',
};

// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};

// en un servicio: importa siempre el archivo base
import { environment } from '../environments/environment';`,
        'El CLI sustituye el archivo según la configuración mediante fileReplacements en angular.json. Todo lo que pongas aquí termina en el JavaScript público: no guardes contraseñas ni claves secretas.',
      ),
      code(
        'Presupuestos de tamaño',
        `// angular.json → configurations.production
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kb",
    "maximumError": "1mb"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "2kb",
    "maximumError": "4kb"
  }
]`,
        'Si el paquete inicial supera el límite, ng build avisa o falla. Así detectas a tiempo una dependencia que hace crecer demasiado la aplicación.',
      ),
      code(
        'Desplegar la aplicación',
        `# Despliegue automático con un paquete del proveedor
$ ng add @angular/fire        # Firebase Hosting
$ ng deploy

# Despliegue manual: copia el resultado a tu servidor web
$ ng build
$ ng build --base-href /mi-app/      # si no se sirve desde la raíz

# nginx: devolver index.html en las rutas de la aplicación
location / {
  try_files $uri $uri/ /index.html;
}`,
        'Una aplicación con enrutamiento necesita que el servidor devuelva index.html para cualquier ruta que no sea un archivo; si no, al recargar /productos/5 aparece un error 404. El servidor de desarrollo de ng serve no debe usarse en producción.',
      ),
      text(
        'Compilación AOT y comprobación de plantillas',
        `El navegador no entiende las plantillas ni los decoradores de Angular: hay que compilarlos a JavaScript. La compilación anticipada (AOT) lo hace durante el build, y es la opción por defecto.

Ventajas: renderizado más rápido, menos peticiones, un paquete más pequeño porque no incluye el compilador, detección temprana de errores de plantilla y más seguridad.

Con strictTemplates en tsconfig.json, activado en los proyectos nuevos, Angular comprueba los tipos dentro de las plantillas igual que TypeScript lo hace en el código: tipos de los @Input, de $event y de las variables de @for.`,
      ),
      code(
        'Mantener Angular actualizado',
        `$ ng update
      Name                    Version                  Command to update
     ------------------------------------------------------------------------
      @angular/cli            17.0.0 -> 17.3.0         ng update @angular/cli
      @angular/core           17.0.0 -> 17.3.0         ng update @angular/core

$ ng update @angular/core@17 @angular/cli@17`,
        'ng update actualiza los paquetes y aplica migraciones automáticas al código. Angular publica una versión mayor cada seis meses; cada una recibe seis meses de soporte activo y doce de soporte a largo plazo. Sube de una versión mayor en una y sigue la guía de https://update.angular.io.',
      ),
      code(
        'NgModules en proyectos existentes',
        `// app.module.ts: la organización anterior a los componentes standalone
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, ListaComponent],   // lo que pertenece al módulo
  imports: [BrowserModule, FormsModule],          // otros módulos que necesita
  providers: [],                                  // servicios
  bootstrap: [AppComponent],                      // componente raíz
})
export class AppModule {}

# Migrar un proyecto a standalone
$ ng generate @angular/core:standalone`,
        'Un NgModule agrupa componentes, directivas y pipes relacionados. Los componentes standalone y los NgModules pueden convivir: un módulo puede importar un componente standalone y viceversa. La migración se hace en tres pasos: convertir las declaraciones, eliminar los módulos innecesarios y cambiar a bootstrapApplication.',
      ),
      code(
        'Crear una librería',
        `$ ng new mi-espacio --no-create-application
$ cd mi-espacio
$ ng generate library mi-lib

$ ng build mi-lib
$ cd dist/mi-lib
$ npm publish`,
        'Una librería es un proyecto de Angular que no se ejecuta por sí solo: se importa desde una aplicación. Sirve para compartir componentes y servicios entre proyectos. Lo que se exporta se declara en public-api.ts.',
      ),
      text(
        'Guía de estilo: convenciones principales',
        `Una cosa por archivo: un componente, un servicio o un pipe, y procura no pasar de 400 líneas.
Nombres de archivo en minúsculas con guiones y el tipo como sufijo: lista-productos.component.ts, productos.service.ts.
Nombres de clase en UpperCamelCase con el sufijo del tipo: ListaProductosComponent, ProductosService.
Selectores de componente con guiones y un prefijo propio: app-lista-productos. Selectores de directiva en lowerCamelCase: appResaltar.
Organiza las carpetas por funcionalidad, no por tipo de archivo.
Deja en el componente solo la lógica de la vista; el resto va en servicios.
Usa @Input() y @Output() en lugar de las propiedades inputs y outputs del decorador, y no pongas el prefijo «on» a los outputs.`,
      ),
      links('Guías de herramientas y mantenimiento', [
        ['Compilar y servir', 'guide/build'],
        ['Despliegue', 'guide/deployment'],
        ['Compilación AOT', 'guide/aot-compiler'],
        ['Mantenerse actualizado', 'guide/updating'],
        ['Migrar a standalone', 'guide/standalone-migration'],
        ['Librerías', 'guide/libraries'],
        ['Guía de estilo', 'guide/styleguide'],
        ['Angular DevTools', 'guide/devtools'],
      ]),
    ],
  },
]
