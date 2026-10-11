// Angular · temas del curso «Angular: De cero a experto» (edición 2025, Angular 19+).
// Secciones 16 a 22: ciclo de vida, mapas, tienda, paginación, autenticación, panel administrativo y despliegue.

import { code, text } from './angularHelpers'

export const angularCourseProjectLevels = [
  {
    title: 'Ciclo de vida en la práctica',
    topics: [
      code(
        'Registrar todos los hooks para ver su orden',
        `const registrar = (...mensajes: string[]) =>
  console.log(mensajes[0], 'color: #bada55', mensajes.slice(1).join(', '));

export class InicioComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() { registrar('%cconstructor'); }
  ngOnInit() { registrar('%cngOnInit'); }
  ngOnChanges() { registrar('%cngOnChanges'); }
  ngDoCheck() { registrar('%cngDoCheck'); }
  ngAfterContentInit() { registrar('%cngAfterContentInit'); }
  ngAfterContentChecked() { registrar('%cngAfterContentChecked'); }
  ngAfterViewInit() { registrar('%cngAfterViewInit'); }
  ngAfterViewChecked() { registrar('%cngAfterViewChecked'); }
  ngOnDestroy() { registrar('%cngOnDestroy'); }
}`,
        'Abre la consola, navega a la página y sal de ella: verás el orden real. ngOnChanges() no aparece si el componente no tiene inputs.',
      ),
      text(
        'Para qué sirve cada hook en el día a día',
        `constructor: inyectar dependencias e inicializar señales. Todavía no hay inputs ni vista.
ngOnInit: lanzar la primera petición de datos y crear suscripciones.
ngOnChanges: reaccionar cuando el padre cambia un input.
ngAfterViewInit: trabajar con elementos de la plantilla, como iniciar un mapa o un gráfico.
ngOnDestroy: cancelar suscripciones, temporizadores y listeners.

Los hooks DoCheck y los que terminan en Checked se ejecutan en cada ciclo de detección de cambios: evita ponerles lógica.`,
      ),
      code(
        'El ciclo de vida sin Zone.js',
        `export class InicioComponent {
  propiedadNormal = 'Ana';
  propiedadSenal = signal('Ana');

  cambiarNormal(): void {
    // Se ve porque el clic es un evento de la plantilla
    this.propiedadNormal = 'Luis';
  }

  constructor() {
    setTimeout(() => {
      this.propiedadNormal = 'Marta';     // en zoneless NO actualiza la pantalla
      this.propiedadSenal.set('Marta');   // sí la actualiza
    }, 2000);
  }
}`,
        'Con Zone.js, los hooks Checked saltan tras cada temporizador o petición. En modo zoneless solo cuando Angular sabe que algo cambió. La regla práctica: todo el estado que se muestra en pantalla debe ser una señal.',
      ),
      code(
        'ngOnChanges y la alternativa con señales',
        `@Component({ selector: 'app-titulo', template: '<h1>{{ titulo() }}</h1>' })
export class TituloComponent implements OnChanges {
  titulo = input.required<string>();

  ngOnChanges(changes: SimpleChanges): void {
    for (const nombre in changes) {
      const cambio = changes[nombre];
      console.log(nombre, cambio.previousValue, '→', cambio.currentValue);
    }
  }

  // Con inputs de señal, un efecto o un computed hacen lo mismo
  registro = effect(() => console.log('Nuevo título:', this.titulo()));
  enMayusculas = computed(() => this.titulo().toUpperCase());
}`,
        'ngOnChanges() sigue funcionando con input(). Aun así, con señales casi nunca hace falta: computed para derivar un valor y effect para ejecutar algo cuando cambia.',
      ),
      code(
        'Liberar recursos con efectos y ngOnDestroy',
        `export class RelojComponent implements OnDestroy {
  segundos = signal(0);
  private intervalo = setInterval(() => this.segundos.update((n) => n + 1), 1000);

  // El efecto se destruye solo; su función de limpieza corre antes
  registro = effect((alLimpiar) => {
    console.log('Segundos:', this.segundos());
    alLimpiar(() => console.log('Limpieza del efecto'));
  });

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}`,
      ),
    ],
  },
  {
    title: 'Mapas con Mapbox',
    topics: [
      text(
        'Qué se construye en MapsApp',
        `Una aplicación con tres pantallas: un mapa a pantalla completa con control de zoom, un mapa con marcadores que se crean al hacer clic y se listan en un panel, y un listado de propiedades donde cada una muestra un minimapa.

Se usa Mapbox GL JS, una librería de mapas que no está hecha para Angular. Es un buen ejemplo de cómo integrar cualquier librería de JavaScript que necesita un elemento del DOM.`,
      ),
      code(
        'Instalar Mapbox y guardar la clave',
        `$ npm install mapbox-gl

/* src/styles.css */
@import 'mapbox-gl/dist/mapbox-gl.css';

// src/environments/environment.ts
export const environment = {
  mapboxKey: 'pk.TU_TOKEN_PUBLICO',
};`,
        'El token público se obtiene en account.mapbox.com. En Mapbox puedes restringirlo a las URL de tu sitio para que nadie más lo use.',
      ),
      code(
        'Generar los environments desde un archivo .env',
        `# .env  (no se sube al repositorio)
MAPBOX_KEY=pk.TU_TOKEN_PUBLICO

// scripts/set-envs.js
const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

if (!process.env.MAPBOX_KEY) {
  throw new Error('MAPBOX_KEY no está definida');
}

const contenido =
  'export const environment = {\\n' +
  "  mapboxKey: '" + process.env.MAPBOX_KEY + "',\\n" +
  '};\\n';

mkdirSync('./src/environments', { recursive: true });
writeFileSync('./src/environments/environment.ts', contenido);
writeFileSync('./src/environments/environment.development.ts', contenido);

// package.json
"scripts": {
  "set-envs": "node ./scripts/set-envs.js",
  "start": "npm run set-envs && ng serve",
  "build": "npm run set-envs && ng build"
}`,
        'Así la carpeta environments no se versiona y el servicio de hosting inyecta la clave como variable de entorno al compilar. Requiere: npm install -D dotenv.',
      ),
      code(
        'Mostrar un mapa a pantalla completa',
        `import mapboxgl from 'mapbox-gl';
import { environment } from '@entornos/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mapa-completo',
  template: '<div #mapa class="mapa"></div>',
  styles: ['.mapa { width: 100vw; height: calc(100vh - 64px); }'],
})
export class MapaCompletoComponent implements AfterViewInit {
  contenedor = viewChild.required<ElementRef<HTMLDivElement>>('mapa');
  mapa = signal<mapboxgl.Map | null>(null);

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.contenedor().nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-77.0428, -12.0464],   // [longitud, latitud]
      zoom: 12,
    });

    this.mapa.set(mapa);
  }
}`,
        'El mapa se crea en ngAfterViewInit() porque antes el <div> no existe. Mapbox usa el orden longitud, latitud, al revés que Google Maps. El contenedor necesita un alto definido o el mapa no se ve.',
      ),
      code(
        'Controlar el zoom y leer la posición central',
        `export class MapaCompletoComponent {
  zoom = signal(12);
  centro = signal({ lng: -77.0428, lat: -12.0464 });

  // Señal → mapa
  sincronizarZoom = effect(() => {
    this.mapa()?.setZoom(this.zoom());
  });

  private escucharMapa(mapa: mapboxgl.Map): void {
    // Mapa → señales
    mapa.on('zoomend', () => this.zoom.set(mapa.getZoom()));
    mapa.on('moveend', () => this.centro.set(mapa.getCenter()));

    mapa.addControl(new mapboxgl.FullscreenControl());
    mapa.addControl(new mapboxgl.NavigationControl());
    mapa.addControl(new mapboxgl.ScaleControl());
  }
}

<input type="range" min="0" max="20" [value]="zoom()"
       (input)="zoom.set(+$any($event.target).value)">
<span>Zoom: {{ zoom() | number:'1.2-2' }}</span>
<span>Lng: {{ centro().lng | number:'1.5-5' }}, Lat: {{ centro().lat | number:'1.5-5' }}</span>`,
        'La sincronización va en los dos sentidos: el control deslizante cambia la señal y el efecto mueve el mapa; al usar la rueda del ratón, el evento del mapa actualiza la señal.',
      ),
      code(
        'Marcadores dinámicos',
        `interface Marcador {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

export class MarcadoresComponent {
  marcadores = signal<Marcador[]>([]);

  private escucharMapa(mapa: mapboxgl.Map): void {
    mapa.on('click', (evento) => this.crearMarcador(evento.lngLat));
  }

  crearMarcador(posicion: mapboxgl.LngLat): void {
    const mapa = this.mapa();
    if (!mapa) return;

    // Color al azar en hexadecimal
    const color = '#xxxxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16));

    const mapboxMarker = new mapboxgl.Marker({ color, draggable: true })
      .setLngLat(posicion)
      .addTo(mapa);

    this.marcadores.update((lista) => [{ id: crypto.randomUUID(), mapboxMarker }, ...lista]);
  }
}`,
        'draggable permite arrastrar el marcador. Se guarda la instancia de Mapbox para poder moverla, leer su posición o eliminarla más tarde.',
      ),
      code(
        'Listar, volar hacia un marcador y eliminarlo',
        `irA(posicion: mapboxgl.LngLatLike): void {
  this.mapa()?.flyTo({ center: posicion, zoom: 15 });
}

eliminar(marcador: Marcador): void {
  marcador.mapboxMarker.remove();   // lo quita del mapa
  this.marcadores.update((lista) => lista.filter((m) => m.id !== marcador.id));
}

@for (marcador of marcadores(); track marcador.id) {
  <li (click)="irA(marcador.mapboxMarker.getLngLat())"
      (dblclick)="eliminar(marcador)">
    {{ marcador.mapboxMarker.getLngLat() | json }}
  </li>
}`,
        'Hay que hacer las dos cosas: quitar el marcador del mapa y quitarlo de la señal. Si solo se actualiza la señal, el marcador sigue dibujado.',
      ),
      code(
        'Varios minimapas en una misma página',
        `@Component({
  selector: 'app-mini-mapa',
  template: '<div #mapa style="width: 100%; height: 260px"></div>',
})
export class MiniMapaComponent implements AfterViewInit {
  contenedor = viewChild.required<ElementRef<HTMLDivElement>>('mapa');
  posicion = input.required<{ lng: number; lat: number }>();
  zoom = input(14);

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.contenedor().nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.posicion(),
      zoom: this.zoom(),
      interactive: false,          // no se puede mover ni hacer zoom
    });

    new mapboxgl.Marker().setLngLat(this.posicion()).addTo(mapa);
  }
}

@for (casa of casas(); track casa.id) {
  <article>
    <h3>{{ casa.titulo }}</h3>
    <app-mini-mapa [posicion]="casa.posicion" />
  </article>
}`,
        'Cada instancia del componente crea su propio mapa usando su propia referencia de plantilla, así no chocan entre sí. Con clases responsive de Tailwind (grid-cols-1 md:grid-cols-3) el listado se adapta al móvil.',
      ),
    ],
  },
  {
    title: 'Proyecto TesloShop: catálogo y paginación',
    topics: [
      text(
        'Qué se construye en TesloShop',
        `Una tienda de ropa con dos partes: la tienda pública (listado de productos, filtro por género y página de producto) y un panel administrativo protegido para crear y editar productos y subir sus imágenes.

El frontend consume una API REST con autenticación por JWT. Es el proyecto que junta todo: rutas con layouts, HttpClient, pipes propios, formularios reactivos, interceptores, guards, caché y despliegue.`,
      ),
      code(
        'Rutas: tienda, autenticación y panel',
        `// app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [noAutenticadoGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    canMatch: [esAdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('./tienda/tienda.routes'),
  },
];

// tienda.routes.ts
export const tiendaRoutes: Routes = [
  {
    path: '',
    component: TiendaLayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'genero/:genero', component: GeneroComponent },
      { path: 'producto/:idSlug', component: ProductoComponent },
      { path: '**', component: NoEncontradoComponent },
    ],
  },
];
export default tiendaRoutes;`,
        'La ruta vacía va al final porque coincide con todo. canMatch decide si el bloque de rutas existe para ese usuario antes incluso de descargar su código.',
      ),
      code(
        'Fuentes personalizadas y animación de entrada',
        `<!-- src/index.html -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap" rel="stylesheet">

/* src/styles.css */
@import "tailwindcss";
@plugin "daisyui";

@theme {
  --font-montserrat: "Montserrat Alternates", sans-serif;
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

<h1 class="font-montserrat text-2xl">Teslo | Shop</h1>
<article class="card animate-fadeIn">...</article>`,
        'Una animación CSS sencilla al aparecer las tarjetas hace que la carga se sienta más suave, sin necesidad del módulo de animaciones de Angular.',
      ),
      code(
        'Servicio de productos con parámetros',
        `const baseUrl = environment.baseUrl;

interface Opciones {
  limite?: number;
  desplazamiento?: number;
  genero?: string;
}

export interface RespuestaProductos {
  count: number;
  pages: number;
  products: Producto[];
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);

  obtenerProductos(opciones: Opciones = {}): Observable<RespuestaProductos> {
    const { limite = 9, desplazamiento = 0, genero = '' } = opciones;

    return this.http.get<RespuestaProductos>(baseUrl + '/products', {
      params: { limit: limite, offset: desplazamiento, gender: genero },
    });
  }

  obtenerPorSlug(idSlug: string): Observable<Producto> {
    return this.http.get<Producto>(baseUrl + '/products/' + idSlug);
  }
}`,
        'La URL del backend va en environment.baseUrl: http://localhost:3000/api en desarrollo y la dirección real en producción.',
      ),
      code(
        'Pipe para la imagen del producto',
        `@Pipe({ name: 'imagenProducto' })
export class ImagenProductoPipe implements PipeTransform {
  transform(valor: null | string | string[]): string {
    if (valor === null) return './assets/images/sin-imagen.jpg';

    // Vista previa local de un archivo recién elegido
    if (typeof valor === 'string' && valor.startsWith('blob:')) return valor;

    if (typeof valor === 'string') return baseUrl + '/files/product/' + valor;

    const primera = valor.at(0);
    return primera ? baseUrl + '/files/product/' + primera : './assets/images/sin-imagen.jpg';
  }
}

<img [src]="producto().images | imagenProducto" [alt]="producto().title">`,
        'El backend devuelve solo el nombre del archivo. El pipe construye la URL completa y pone una imagen de relleno cuando el producto no tiene ninguna.',
      ),
      code(
        'Página de producto y carrusel de imágenes',
        `$ npm install swiper

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-carrusel',
  imports: [ImagenProductoPipe],
  template: \`
    <div class="swiper" #swiper>
      <div class="swiper-wrapper">
        @for (imagen of imagenes(); track imagen) {
          <div class="swiper-slide"><img [src]="imagen | imagenProducto"></div>
        }
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  \`,
})
export class CarruselComponent implements AfterViewInit {
  imagenes = input.required<string[]>();
  elemento = viewChild.required<ElementRef<HTMLDivElement>>('swiper');

  ngAfterViewInit(): void {
    new Swiper(this.elemento().nativeElement, {
      modules: [Navigation, Pagination],
      loop: true,
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
  }
}`,
        'Mismo patrón que con Mapbox: una librería externa que se inicializa sobre un elemento del DOM en ngAfterViewInit().',
      ),
      code(
        'Productos por género con el parámetro de la ruta',
        `export class GeneroComponent {
  private servicio = inject(ProductosService);

  genero = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['genero'] as string)),
  );

  productos = rxResource({
    params: () => ({ genero: this.genero() }),
    stream: ({ params }) => this.servicio.obtenerProductos({ genero: params.genero }),
  });
}

<a routerLink="/genero/men" routerLinkActive="activo">Hombres</a>
<a routerLink="/genero/women" routerLinkActive="activo">Mujeres</a>
<a routerLink="/genero/kid" routerLinkActive="activo">Niños</a>`,
        'Al cambiar de /genero/men a /genero/women el componente no se destruye: la señal del parámetro cambia y rxResource vuelve a pedir los datos.',
      ),
      code(
        'Componente de paginación',
        `@Component({
  selector: 'app-paginacion',
  imports: [RouterLink],
  template: \`
    <div class="join">
      @for (pagina of paginas(); track pagina) {
        <a class="join-item btn" [class.btn-primary]="pagina === actual()"
           [routerLink]="[]" [queryParams]="{ pagina: pagina }">
          {{ pagina }}
        </a>
      }
    </div>
  \`,
})
export class PaginacionComponent {
  total = input(0);
  actual = input(1);

  paginas = computed(() => Array.from({ length: this.total() }, (_, i) => i + 1));
}`,
        'routerLink con un arreglo vacío mantiene la ruta actual y solo cambia el parámetro de consulta: /productos?pagina=3.',
      ),
      code(
        'Servicio de paginación y carga con rxResource',
        `@Injectable({ providedIn: 'root' })
export class PaginacionService {
  private ruta = inject(ActivatedRoute);

  paginaActual = toSignal(
    this.ruta.queryParamMap.pipe(
      map((params) => Number(params.get('pagina') ?? 1)),
      map((pagina) => (Number.isNaN(pagina) || pagina < 1 ? 1 : pagina)),
    ),
    { initialValue: 1 },
  );
}

export class InicioComponent {
  paginacion = inject(PaginacionService);

  productos = rxResource({
    params: () => ({ pagina: this.paginacion.paginaActual() - 1 }),
    stream: ({ params }) =>
      this.servicio.obtenerProductos({ desplazamiento: params.pagina * 9 }),
  });
}

<app-paginacion [total]="productos.value()?.pages ?? 0" [actual]="paginacion.paginaActual()" />`,
        'La página vive en la URL, el servicio la convierte en una señal validada y la página la usa para calcular el desplazamiento. Al pulsar otro número cambia la URL, cambia la señal y se recargan los productos.',
      ),
      code(
        'Caché de listados y de productos',
        `export class ProductosService {
  private cacheListados = new Map<string, RespuestaProductos>();
  private cacheProducto = new Map<string, Producto>();

  obtenerProductos(opciones: Opciones = {}): Observable<RespuestaProductos> {
    const { limite = 9, desplazamiento = 0, genero = '' } = opciones;
    const clave = limite + '-' + desplazamiento + '-' + genero;

    if (this.cacheListados.has(clave)) return of(this.cacheListados.get(clave)!);

    return this.http
      .get<RespuestaProductos>(baseUrl + '/products', { params: { /* ... */ } })
      .pipe(tap((respuesta) => this.cacheListados.set(clave, respuesta)));
  }
}`,
        'La clave combina todos los parámetros que cambian el resultado. Una caché sin caducidad puede mostrar datos viejos: hay que actualizarla o vaciarla cuando se crea o edita un producto.',
      ),
    ],
  },
  {
    title: 'Autenticación y autorización',
    topics: [
      text(
        'Autenticación frente a autorización',
        `Autenticación: saber quién es el usuario. Se resuelve con un inicio de sesión que devuelve un token.
Autorización: saber qué puede hacer ese usuario. Se resuelve con roles o permisos.

El flujo con JWT: el usuario envía correo y contraseña, el servidor responde con sus datos y un token firmado, el frontend guarda el token y lo envía en la cabecera Authorization de cada petición.

Todo lo que hace el frontend (ocultar botones, bloquear rutas) es solo experiencia de usuario. Quien de verdad autoriza es el servidor, que debe validar el token y el rol en cada petición.`,
      ),
      code(
        'Formulario de inicio de sesión',
        `export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  hayError = signal(false);

  formulario = inject(FormBuilder).nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
  });

  entrar(): void {
    if (this.formulario.invalid) {
      this.mostrarError();
      return;
    }

    const { correo, clave } = this.formulario.getRawValue();

    this.auth.iniciarSesion(correo, clave).subscribe((autenticado) => {
      if (autenticado) this.router.navigateByUrl('/');
      else this.mostrarError();
    });
  }

  private mostrarError(): void {
    this.hayError.set(true);
    setTimeout(() => this.hayError.set(false), 2000);
  }
}`,
        'El mensaje de error es el mismo para un correo inexistente que para una contraseña incorrecta: así no se revela qué cuentas existen.',
      ),
      code(
        'AuthService: estado de la sesión',
        `type EstadoAuth = 'comprobando' | 'autenticado' | 'no-autenticado';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _estado = signal<EstadoAuth>('comprobando');
  private _usuario = signal<Usuario | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  usuario = computed(() => this._usuario());
  token = computed(() => this._token());
  esAdmin = computed(() => this._usuario()?.roles.includes('admin') ?? false);

  estado = computed<EstadoAuth>(() => {
    if (this._estado() === 'comprobando') return 'comprobando';
    return this._usuario() ? 'autenticado' : 'no-autenticado';
  });

  iniciarSesion(correo: string, clave: string): Observable<boolean> {
    return this.http
      .post<RespuestaAuth>(baseUrl + '/auth/login', { email: correo, password: clave })
      .pipe(
        map((respuesta) => this.alAutenticar(respuesta)),
        catchError(() => this.alFallar()),
      );
  }
}`,
        'Las señales privadas solo las modifica el servicio; hacia fuera se exponen computed de solo lectura. El tercer estado, comprobando, evita mostrar la pantalla de login durante un instante al recargar.',
      ),
      code(
        'Éxito, fallo, comprobar la sesión y cerrarla',
        `export class AuthService {
  private alAutenticar({ user, token }: RespuestaAuth): boolean {
    this._usuario.set(user);
    this._token.set(token);
    this._estado.set('autenticado');
    localStorage.setItem('token', token);
    return true;
  }

  private alFallar(): Observable<boolean> {
    this.cerrarSesion();
    return of(false);
  }

  // Al recargar: ¿el token guardado sigue siendo válido?
  comprobarEstado(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      this.cerrarSesion();
      return of(false);
    }

    return this.http.get<RespuestaAuth>(baseUrl + '/auth/check-status').pipe(
      map((respuesta) => this.alAutenticar(respuesta)),
      catchError(() => this.alFallar()),
    );
  }

  cerrarSesion(): void {
    this._usuario.set(null);
    this._token.set(null);
    this._estado.set('no-autenticado');
    localStorage.removeItem('token');
  }
}`,
        'Iniciar sesión, registrarse y comprobar el estado terminan igual, así que comparten las dos funciones privadas: es el principio DRY, no te repitas. Guardar el token en LocalStorage es sencillo, pero cualquier script que se cuele por XSS puede leerlo; una cookie HttpOnly lo evita.',
      ),
      code(
        'Comprobar la sesión al arrancar y mostrar el usuario',
        `export class AuthService {
  // Se ejecuta al crear el servicio y deja el resultado disponible como recurso
  comprobacion = rxResource({
    stream: () => this.comprobarEstado(),
  });
}

<!-- menú superior -->
@if (auth.estado() === 'autenticado') {
  <span>{{ auth.usuario()?.fullName }}</span>
  @if (auth.esAdmin()) {
    <a routerLink="/admin">Panel</a>
  }
  <button (click)="auth.cerrarSesion()">Salir</button>
} @else if (auth.estado() === 'no-autenticado') {
  <a routerLink="/auth/login">Ingresar</a>
  <a routerLink="/auth/registro">Crear cuenta</a>
} @else {
  <span>…</span>
}`,
      ),
      code(
        'Interceptor que añade el token',
        `// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (peticion, next) => {
  const token = inject(AuthService).token();
  if (!token) return next(peticion);

  const conToken = peticion.clone({
    headers: peticion.headers.append('Authorization', 'Bearer ' + token),
  });

  return next(conToken);
};

// app.config.ts
provideHttpClient(withFetch(), withInterceptors([authInterceptor]))`,
        'Sin el interceptor habría que añadir la cabecera a mano en cada petición. Con él, ningún servicio necesita saber que existe un token.',
      ),
      code(
        'Guards: solo para invitados y solo para administradores',
        `import { firstValueFrom } from 'rxjs';

export const noAutenticadoGuard: CanMatchFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Espera a saber si el token guardado es válido
  const autenticado = await firstValueFrom(auth.comprobarEstado());

  if (autenticado) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};

export const esAdminGuard: CanMatchFn = async () => {
  const auth = inject(AuthService);
  await firstValueFrom(auth.comprobarEstado());
  return auth.esAdmin();
};`,
        'El primero impide que alguien con sesión vuelva al login; el segundo cierra el panel a quien no es administrador. firstValueFrom convierte el Observable en una Promise para poder usar await.',
      ),
      code(
        'Pantalla de registro',
        `export class AuthService {
  registrar(nombre: string, correo: string, clave: string): Observable<boolean> {
    return this.http
      .post<RespuestaAuth>(baseUrl + '/auth/register', {
        fullName: nombre,
        email: correo,
        password: clave,
      })
      .pipe(
        map((respuesta) => this.alAutenticar(respuesta)),
        catchError(() => this.alFallar()),
      );
  }
}

formulario = this.fb.nonNullable.group({
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  correo: ['', [Validators.required, Validators.email]],
  clave: ['', [Validators.required, Validators.minLength(6)]],
});`,
        'Es la tarea de la sección: el registro reutiliza casi todo lo del inicio de sesión y, si sale bien, deja al usuario ya autenticado.',
      ),
    ],
  },
  {
    title: 'Panel administrativo, archivos y despliegue',
    topics: [
      code(
        'Layout del panel y sus rutas',
        `// admin.routes.ts
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'productos', component: ProductosAdminComponent },
      { path: 'productos/:id', component: ProductoAdminComponent },
      { path: '**', redirectTo: 'productos' },
    ],
  },
];
export default adminRoutes;

<!-- admin-layout.component.html -->
<aside>
  <p>{{ auth.usuario()?.fullName }}</p>
  <a routerLink="/admin/productos" routerLinkActive="activo">Productos</a>
  <a routerLink="/">Volver a la tienda</a>
  <button (click)="auth.cerrarSesion()">Cerrar sesión</button>
</aside>
<main><router-outlet /></main>`,
        'El panel tiene su propio layout, distinto al de la tienda, y todo el bloque queda protegido por esAdminGuard.',
      ),
      code(
        'Tabla de productos paginada',
        `export class ProductosAdminComponent {
  private servicio = inject(ProductosService);
  paginacion = inject(PaginacionService);

  porPagina = signal(10);

  productos = rxResource({
    params: () => ({
      pagina: this.paginacion.paginaActual() - 1,
      limite: this.porPagina(),
    }),
    stream: ({ params }) =>
      this.servicio.obtenerProductos({
        limite: params.limite,
        desplazamiento: params.pagina * params.limite,
      }),
  });
}

<select (change)="porPagina.set(+$any($event.target).value)">
  <option value="10">10</option>
  <option value="20">20</option>
</select>

<a class="btn" [routerLink]="['/admin/productos', 'nuevo']">Nuevo producto</a>`,
        'Se reutilizan el servicio, la paginación y el pipe de imagen de la tienda. La ruta /admin/productos/nuevo usa el mismo componente de edición con un identificador especial.',
      ),
      code(
        'Cargar el producto y redirigir si no existe',
        `export class ProductoAdminComponent {
  private servicio = inject(ProductosService);
  private router = inject(Router);

  id = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['id'] as string)));

  producto = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.servicio.obtenerPorId(params.id ?? 'nuevo'),
  });

  redirigir = effect(() => {
    if (this.producto.error()) this.router.navigateByUrl('/admin/productos');
  });
}

// en el servicio
obtenerPorId(id: string): Observable<Producto> {
  if (id === 'nuevo') return of(productoVacio);
  return this.http.get<Producto>(baseUrl + '/products/' + id);
}`,
        'Para «nuevo» el servicio devuelve un producto vacío, así el formulario es el mismo al crear y al editar.',
      ),
      code(
        'Formulario del producto',
        `export class DetalleProductoComponent implements OnInit {
  producto = input.required<Producto>();
  private fb = inject(FormBuilder);

  tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  formulario = this.fb.group({
    title: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.patronSlug)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[] as string[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  ngOnInit(): void {
    // El backend guarda las etiquetas como arreglo; el formulario, como texto
    this.formulario.reset({
      ...this.producto(),
      tags: this.producto().tags.join(', '),
    });
  }
}`,
        'El formulario se rellena en ngOnInit() porque en el constructor el input todavía no tiene valor.',
      ),
      code(
        'Botones de selección múltiple',
        `alternarTalla(talla: string): void {
  const actuales = this.formulario.value.sizes ?? [];

  const nuevas = actuales.includes(talla)
    ? actuales.filter((t) => t !== talla)
    : [...actuales, talla];

  this.formulario.patchValue({ sizes: nuevas });
}

@for (talla of tallas; track talla) {
  <button type="button" class="btn"
          [class.btn-secondary]="formulario.value.sizes?.includes(talla)"
          (click)="alternarTalla(talla)">
    {{ talla }}
  </button>
}`,
        'No todos los campos son un <input>: aquí los botones leen y escriben el control con patchValue(). type="button" evita que envíen el formulario.',
      ),
      code(
        'Crear o actualizar y mantener la caché al día',
        `// componente
async guardar(): Promise<void> {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  const valores = this.formulario.getRawValue();
  const datos: Partial<Producto> = {
    ...valores,
    tags: valores.tags?.toLowerCase().split(',').map((tag) => tag.trim()) ?? [],
  } as Partial<Producto>;

  if (this.producto().id === 'nuevo') {
    const creado = await firstValueFrom(this.servicio.crear(datos));
    this.router.navigate(['/admin/productos', creado.id]);
  } else {
    await firstValueFrom(this.servicio.actualizar(this.producto().id, datos));
  }

  this.guardado.set(true);
  setTimeout(() => this.guardado.set(false), 3000);
}

// servicio
actualizar(id: string, datos: Partial<Producto>): Observable<Producto> {
  return this.http
    .patch<Producto>(baseUrl + '/products/' + id, datos)
    .pipe(tap((producto) => this.actualizarCache(producto)));
}

private actualizarCache(producto: Producto): void {
  this.cacheProducto.set(producto.id, producto);

  this.cacheListados.forEach((respuesta) => {
    respuesta.products = respuesta.products.map((actual) =>
      actual.id === producto.id ? producto : actual,
    );
  });
}`,
        'Sin actualizar la caché, al volver al listado se vería el producto antiguo. El aviso de «guardado» que desaparece solo le confirma al usuario que la acción funcionó.',
      ),
      code(
        'Seleccionar imágenes y mostrar una vista previa',
        `export class DetalleProductoComponent {
  imagenesTemporales = signal<string[]>([]);
  archivos: FileList | undefined;

  alElegirArchivos(evento: Event): void {
    const archivos = (evento.target as HTMLInputElement).files;
    this.archivos = archivos ?? undefined;

    const urls = Array.from(archivos ?? []).map((archivo) => URL.createObjectURL(archivo));
    this.imagenesTemporales.set(urls);
  }
}

<input type="file" multiple accept="image/*" (change)="alElegirArchivos($event)">

@for (imagen of imagenesTemporales(); track imagen) {
  <img [src]="imagen" alt="Vista previa" class="w-24 h-24 object-cover">
}`,
        'URL.createObjectURL() genera una dirección temporal (blob:) que apunta al archivo en la memoria del navegador, de modo que se ve antes de subirlo.',
      ),
      code(
        'Subir las imágenes al servidor',
        `// servicio
subirImagen(archivo: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', archivo);

  return this.http
    .post<{ fileName: string }>(baseUrl + '/files/product', formData)
    .pipe(map((respuesta) => respuesta.fileName));
}

subirImagenes(archivos?: FileList): Observable<string[]> {
  if (!archivos) return of([]);
  return forkJoin(Array.from(archivos).map((archivo) => this.subirImagen(archivo)));
}

actualizar(id: string, datos: Partial<Producto>, archivos?: FileList): Observable<Producto> {
  const imagenesActuales = datos.images ?? [];

  return this.subirImagenes(archivos).pipe(
    map((nuevas) => ({ ...datos, images: [...imagenesActuales, ...nuevas] })),
    switchMap((conImagenes) => this.http.patch<Producto>(baseUrl + '/products/' + id, conImagenes)),
    tap((producto) => this.actualizarCache(producto)),
  );
}`,
        'Los archivos se envían como FormData, no como JSON; no fijes Content-Type a mano, el navegador lo pone con su delimitador. forkJoin lanza todas las subidas en paralelo y emite cuando terminan todas. Primero se suben las imágenes y después se guarda el producto con sus nombres.',
      ),
      text(
        'Plan de despliegue',
        `Son tres piezas y se despliegan en este orden:

1. Base de datos: aprovisiona una base PostgreSQL gestionada y copia su cadena de conexión.
2. Backend: sube el código a un repositorio de GitHub y conéctalo a un servicio como Render. Configura ahí las variables de entorno: conexión a la base de datos, secreto del JWT y puerto. Pruébalo con una petición antes de seguir.
3. Frontend: pon la URL pública del backend en el environment de producción, compila y publica los archivos estáticos.

Revisa que el backend permita por CORS el dominio del frontend y que ambos usen HTTPS.`,
      ),
      code(
        'Compilar y publicar la aplicación de Angular',
        `// src/environments/environment.ts
export const environment = {
  production: true,
  baseUrl: 'https://mi-backend.onrender.com/api',
};

$ ng build
# Resultado en dist/teslo-shop/browser

# Netlify: archivo public/_redirects para que funcionen las rutas al recargar
/*    /index.html    200

# GitHub Pages: la aplicación vive en una subcarpeta
$ ng build --base-href /nombre-del-repositorio/`,
        'En Netlify basta arrastrar la carpeta browser o conectar el repositorio con el comando de build y esa carpeta como directorio de publicación. Si el hosting no permite redirigir rutas, usa withHashLocation().',
      ),
    ],
  },
]
