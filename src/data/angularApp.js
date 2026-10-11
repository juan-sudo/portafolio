// Angular 17 · niveles 7 a 11: servicios, enrutamiento, formularios, HTTP y observables.

import { code, links, text } from './angularHelpers'

export const angularAppLevels = [
  {
    level: 7,
    title: 'Servicios e inyección de dependencias',
    topics: [
      text(
        '¿Qué es la inyección de dependencias?',
        `Una dependencia es un servicio u objeto que una clase necesita para hacer su trabajo. La inyección de dependencias (DI) es un patrón en el que la clase pide sus dependencias a una fuente externa en lugar de crearlas ella misma.

En Angular intervienen dos papeles: el consumidor (quien pide la dependencia) y el proveedor (quien sabe crearla). Entre ambos está el inyector, que busca la dependencia, la crea si aún no existe y la guarda para reutilizarla.`,
      ),
      code(
        'Crear un servicio',
        `$ ng generate service productos

// productos.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private productos = ['Teclado', 'Mouse', 'Monitor'];

  obtenerTodos(): string[] {
    return this.productos;
  }
}`,
        'Un servicio es una clase con un propósito concreto y bien definido: obtener datos, validar, registrar mensajes. providedIn: \'root\' crea una única instancia compartida por toda la aplicación y permite eliminar el servicio del paquete final si nadie lo usa.',
      ),
      code(
        'Inyectar un servicio en un componente',
        `import { Component, inject } from '@angular/core';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  template: \`
    @for (producto of productos; track producto) {
      <li>{{ producto }}</li>
    }
  \`,
})
export class ListaComponent {
  // Opción 1: la función inject()
  private servicio = inject(ProductosService);

  // Opción 2: el constructor
  // constructor(private servicio: ProductosService) {}

  productos = this.servicio.obtenerTodos();
}`,
        'El componente delega el acceso a los datos en el servicio y se ocupa solo de mostrarlos. Así el servicio se puede reutilizar y sustituir por uno falso en las pruebas.',
      ),
      code(
        'Un servicio que depende de otro',
        `@Injectable({ providedIn: 'root' })
export class RegistroService {
  log(mensaje: string): void {
    console.log(mensaje);
  }
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private registro = inject(RegistroService);

  obtenerTodos(): string[] {
    this.registro.log('Consultando productos');
    return ['Teclado', 'Mouse'];
  }
}`,
        'Angular resuelve la cadena completa: al pedir ProductosService crea antes RegistroService.',
      ),
      code(
        'Dónde se puede proveer un servicio',
        `// 1. En la raíz: una instancia para toda la aplicación
@Injectable({ providedIn: 'root' })
export class SesionService {}

// 2. En la configuración de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [SesionService],
};

// 3. En un componente: una instancia nueva por cada componente
@Component({
  selector: 'app-editor',
  standalone: true,
  template: '...',
  providers: [BorradorService],
})
export class EditorComponent {}`,
        'Un servicio provisto en un componente vive y muere con él, y lo comparten sus hijos. Es la forma de aislar estado entre varias instancias del mismo componente.',
      ),
      code(
        'Definir proveedores: useClass, useValue, useFactory, useExisting',
        `providers: [
  // Entrega otra clase cuando se pide Registro
  { provide: Registro, useClass: RegistroMejorado },

  // Reutiliza una instancia ya registrada con otro token
  { provide: RegistroAntiguo, useExisting: Registro },

  // Entrega un valor fijo
  { provide: API_URL, useValue: 'https://api.ejemplo.com' },

  // Crea el valor con una función
  {
    provide: ProductosService,
    useFactory: () => new ProductosService(inject(Registro), esAdministrador()),
  },
]`,
        'provide es el token con el que se pide la dependencia; la segunda propiedad indica cómo se crea. Escribir solo la clase equivale a { provide: Clase, useClass: Clase }.',
      ),
      code(
        'InjectionToken para valores que no son clases',
        `// app.config.ts
import { InjectionToken } from '@angular/core';

export interface Configuracion {
  apiUrl: string;
  titulo: string;
}

export const CONFIGURACION = new InjectionToken<Configuracion>('configuracion');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: CONFIGURACION, useValue: { apiUrl: '/api', titulo: 'Mi tienda' } },
  ],
};

// en un servicio o componente
private config = inject(CONFIGURACION);`,
        'Las interfaces de TypeScript no existen en tiempo de ejecución, así que no sirven como token. InjectionToken crea un token único y con tipo para objetos, cadenas o funciones.',
      ),
      code(
        'Contexto de inyección',
        `import { Injector, inject, runInInjectionContext } from '@angular/core';

export class PanelComponent {
  private inyector = inject(Injector);   // correcto: inicializador de campo

  cargar(): void {
    // inject() aquí, sin más, lanza el error NG0203
    runInInjectionContext(this.inyector, () => {
      const servicio = inject(ProductosService);
      servicio.obtenerTodos();
    });
  }
}`,
        'inject() solo funciona dentro de un contexto de inyección: el constructor, los inicializadores de campos, las funciones factory de un proveedor y las funciones del router como guards y resolvers. Fuera de ahí se usa runInInjectionContext().',
      ),
      text(
        'Inyectores jerárquicos',
        `Angular tiene dos jerarquías de inyectores:

EnvironmentInjector: configurado con providedIn o con el arreglo providers de la aplicación y de las rutas.
ElementInjector: se crea en cada elemento del DOM; se configura con providers o viewProviders en @Component y @Directive.

Al pedir una dependencia, Angular busca primero en el ElementInjector del componente y sube por sus padres; si no la encuentra, sigue en los EnvironmentInjector. Si nadie la provee, lanza el error NG0201.

Modificadores de la búsqueda: optional (devuelve null si no existe), self (solo en el propio elemento), skipSelf (empieza en el padre) y host (se detiene en el componente anfitrión). Ejemplo: inject(Registro, { optional: true }).`,
      ),
      links('Guías de inyección de dependencias', [
        ['Entender la inyección de dependencias', 'guide/dependency-injection'],
        ['Crear un servicio inyectable', 'guide/creating-injectable-service'],
        ['Definir proveedores', 'guide/dependency-injection-providers'],
        ['Contexto de inyección', 'guide/dependency-injection-context'],
        ['Inyectores jerárquicos', 'guide/hierarchical-dependency-injection'],
      ]),
    ],
  },
  {
    level: 8,
    title: 'Enrutamiento y navegación',
    topics: [
      text(
        '¿Qué hace el router?',
        `En una aplicación de una sola página (SPA) el navegador no pide una página nueva al servidor: lo que cambia es qué componentes se muestran. Angular Router interpreta la URL del navegador como una instrucción para mostrar una vista u otra.

Así el usuario puede usar los botones de atrás y adelante, guardar una dirección en favoritos y compartir un enlace a una pantalla concreta.`,
      ),
      code(
        'Definir las rutas',
        `// app.routes.ts
import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, title: 'Inicio' },
  { path: 'productos', component: ProductosComponent, title: 'Productos' },
  { path: 'catalogo', redirectTo: 'productos', pathMatch: 'full' },
  { path: '**', component: NoEncontradoComponent },
];

// app.config.ts
providers: [provideRouter(routes)]`,
        'El orden importa: el router usa la primera ruta que coincide, así que las más específicas van primero y el comodín ** al final, para la página 404. title fija el título de la pestaña.',
      ),
      code(
        'Mostrar la ruta activa y enlazar entre páginas',
        `import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: \`
    <nav>
      <a routerLink="/" routerLinkActive="activo"
         [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
      <a routerLink="/productos" routerLinkActive="activo"
         ariaCurrentWhenActive="page">Productos</a>
    </nav>
    <router-outlet />
  \`,
})
export class AppComponent {}`,
        '<router-outlet> es el hueco donde aparece el componente de la ruta actual. routerLink navega sin recargar la página, a diferencia de href. routerLinkActive añade una clase CSS cuando el enlace corresponde a la ruta activa.',
      ),
      code(
        'Rutas con parámetros',
        `// app.routes.ts
{ path: 'productos/:id', component: DetalleComponent }

<!-- enlace -->
<a [routerLink]="['/productos', producto.id]">{{ producto.nombre }}</a>

// detalle.component.ts
import { ActivatedRoute } from '@angular/router';

export class DetalleComponent {
  private ruta = inject(ActivatedRoute);

  // El valor en el momento de crear el componente
  id = Number(this.ruta.snapshot.paramMap.get('id'));

  // O como Observable, si el parámetro cambia sin destruir el componente
  id$ = this.ruta.paramMap.pipe(map((params) => Number(params.get('id'))));
}`,
        'Los parámetros de ruta siempre llegan como texto. queryParamMap da acceso a los parámetros de consulta (?orden=precio).',
      ),
      code(
        'Recibir los parámetros como @Input',
        `// app.config.ts
import { provideRouter, withComponentInputBinding } from '@angular/router';

providers: [provideRouter(routes, withComponentInputBinding())]

// detalle.component.ts — ruta: productos/:id
export class DetalleComponent {
  @Input() id = '';          // parámetro de ruta
  @Input() orden = '';       // ?orden=precio
}`,
        'Con withComponentInputBinding() el router asigna los parámetros de ruta, los de consulta y los datos estáticos o resueltos a los @Input con el mismo nombre.',
      ),
      code(
        'Navegar desde el código',
        `import { Router } from '@angular/router';

export class FormularioComponent {
  private router = inject(Router);

  guardar(): void {
    // ...guardar los datos
    this.router.navigate(['/productos', 42], {
      queryParams: { guardado: true },
    });
  }

  cancelar(): void {
    this.router.navigateByUrl('/productos');
  }
}`,
        'navigate() recibe un arreglo de segmentos; navigateByUrl() una URL completa. Ambos devuelven una Promise que indica si la navegación tuvo éxito.',
      ),
      code(
        'Rutas anidadas',
        `export const routes: Routes = [
  {
    path: 'cuenta',
    component: CuentaComponent,   // su plantilla tiene un <router-outlet />
    children: [
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      { path: 'perfil', component: PerfilComponent },      // /cuenta/perfil
      { path: 'pedidos', component: PedidosComponent },    // /cuenta/pedidos
    ],
  },
];

<!-- cuenta.component.html: los enlaces relativos no llevan barra inicial -->
<a routerLink="perfil">Perfil</a>
<a routerLink="pedidos">Pedidos</a>
<router-outlet />`,
        'Las rutas hijas se muestran en el <router-outlet> del componente padre, que mantiene su propio encabezado o menú.',
      ),
      code(
        'Carga diferida de rutas',
        `export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'tienda',
    loadChildren: () =>
      import('./tienda/tienda.routes').then((m) => m.TIENDA_ROUTES),
  },
];`,
        'Con la carga diferida (lazy loading), el código de esa sección se descarga solo cuando el usuario entra en ella, lo que reduce el tamaño del paquete inicial. loadComponent carga un componente y loadChildren un conjunto de rutas.',
      ),
      code(
        'Proteger rutas con guards',
        `// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (ruta, estado) => {
  const sesion = inject(SesionService);
  const router = inject(Router);

  return sesion.estaAutenticado()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { volver: estado.url } });
};

// app.routes.ts
{ path: 'admin', component: AdminComponent, canActivate: [authGuard] }`,
        'Un guard devuelve true para permitir la navegación, false para cancelarla o un UrlTree para redirigir. Otros guards: canActivateChild, canDeactivate (por ejemplo, avisar de cambios sin guardar) y canMatch. Un guard solo mejora la experiencia: la seguridad real se aplica en el servidor.',
      ),
      code(
        'Cargar datos antes de mostrar la ruta',
        `// producto.resolver.ts
import { ResolveFn } from '@angular/router';

export const productoResolver: ResolveFn<Producto> = (ruta) => {
  const id = Number(ruta.paramMap.get('id'));
  return inject(ProductosService).obtener(id);
};

// app.routes.ts
{
  path: 'productos/:id',
  component: DetalleComponent,
  resolve: { producto: productoResolver },
}

// detalle.component.ts
producto = inject(ActivatedRoute).snapshot.data['producto'] as Producto;`,
        'El router espera a que el resolver termine antes de activar la ruta, así el componente recibe los datos ya listos.',
      ),
      links('Guías de enrutamiento', [
        ['Visión general', 'guide/routing-overview'],
        ['Tareas comunes de enrutamiento', 'guide/router'],
        ['Tutorial: enrutamiento en una SPA', 'guide/router-tutorial'],
        ['Carga diferida', 'guide/lazy-loading-ngmodules'],
        ['Referencia del router', 'guide/router-reference'],
      ]),
    ],
  },
  {
    level: 9,
    title: 'Formularios',
    topics: [
      text(
        'Dos formas de construir formularios',
        `Formularios reactivos: el modelo del formulario se define de forma explícita en la clase del componente. Son más escalables, reutilizables y fáciles de probar. Elígelos cuando los formularios son una parte importante de la aplicación.

Formularios basados en plantilla: el modelo se crea de forma implícita con directivas en la plantilla. Son rápidos de escribir para formularios sencillos, como una suscripción a un boletín, pero escalan peor.

Ambos comparten las mismas clases base: FormControl (un campo), FormGroup (un grupo de campos), FormArray (una lista de campos) y ControlValueAccessor (el puente con el elemento del DOM).`,
      ),
      code(
        'Formulario basado en plantilla',
        `import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: \`
    <form #formulario="ngForm" (ngSubmit)="enviar(formulario)">
      <input name="nombre" [(ngModel)]="modelo.nombre" required #nombre="ngModel">
      @if (nombre.invalid && (nombre.dirty || nombre.touched)) {
        <p class="error">El nombre es obligatorio.</p>
      }
      <button type="submit" [disabled]="formulario.invalid">Enviar</button>
    </form>
  \`,
})
export class ContactoComponent {
  modelo = { nombre: '' };

  enviar(formulario: NgForm): void {
    console.log(formulario.value);
  }
}`,
        'Cada campo con ngModel necesita el atributo name. Angular añade al elemento las clases ng-valid o ng-invalid, ng-pristine o ng-dirty y ng-untouched o ng-touched, que puedes usar en el CSS.',
      ),
      code(
        'Un control reactivo',
        `import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <input [formControl]="nombre">
    <p>Valor: {{ nombre.value }}</p>
    <button (click)="nombre.setValue('Ana')">Poner Ana</button>
  \`,
})
export class NombreComponent {
  nombre = new FormControl('');
}`,
        'El control vive en la clase y la plantilla solo se enlaza a él con [formControl]. setValue() cambia el valor desde el código.',
      ),
      code(
        'Agrupar controles con FormGroup',
        `export class PerfilComponent {
  perfil = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    direccion: new FormGroup({
      calle: new FormControl(''),
      ciudad: new FormControl(''),
    }),
  });

  enviar(): void {
    console.log(this.perfil.value);
  }

  rellenar(): void {
    // patchValue cambia solo algunos campos; setValue exige todos
    this.perfil.patchValue({ nombre: 'Ana', direccion: { ciudad: 'Lima' } });
  }
}

<form [formGroup]="perfil" (ngSubmit)="enviar()">
  <input formControlName="nombre">
  <input formControlName="correo">
  <div formGroupName="direccion">
    <input formControlName="calle">
    <input formControlName="ciudad">
  </div>
  <button type="submit" [disabled]="!perfil.valid">Guardar</button>
</form>`,
      ),
      code(
        'FormBuilder y FormArray',
        `import { FormArray, FormBuilder, Validators } from '@angular/forms';

export class PerfilComponent {
  private fb = inject(FormBuilder);

  perfil = this.fb.group({
    nombre: ['', Validators.required],
    telefonos: this.fb.array([this.fb.control('')]),
  });

  get telefonos(): FormArray {
    return this.perfil.get('telefonos') as FormArray;
  }

  agregarTelefono(): void {
    this.telefonos.push(this.fb.control(''));
  }
}

<div formArrayName="telefonos">
  @for (telefono of telefonos.controls; track $index) {
    <input [formControlName]="$index">
  }
</div>
<button type="button" (click)="agregarTelefono()">Añadir teléfono</button>`,
        'FormBuilder ahorra escribir new FormControl y new FormGroup una y otra vez. FormArray maneja una cantidad variable de controles sin nombre.',
      ),
      code(
        'Validar los datos',
        `perfil = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  correo: ['', [Validators.required, Validators.email]],
  edad: [18, [Validators.min(18), Validators.max(99)]],
});

get nombre() {
  return this.perfil.get('nombre');
}

<input formControlName="nombre">
@if (nombre?.invalid && (nombre?.dirty || nombre?.touched)) {
  @if (nombre?.hasError('required')) {
    <p class="error">El nombre es obligatorio.</p>
  }
  @if (nombre?.hasError('minlength')) {
    <p class="error">Debe tener al menos 3 caracteres.</p>
  }
}`,
        'Validadores integrados: required, requiredTrue, email, min, max, minLength, maxLength y pattern. Se comprueba dirty o touched para no mostrar errores antes de que el usuario toque el campo.',
      ),
      code(
        'Validadores propios y entre campos',
        `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador de un campo
export function nombreProhibido(patron: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>
    patron.test(control.value) ? { nombreProhibido: { value: control.value } } : null;
}

// Validador de grupo: compara dos campos
export const clavesIguales: ValidatorFn = (grupo) =>
  grupo.get('clave')?.value === grupo.get('repetir')?.value
    ? null
    : { clavesDistintas: true };

registro = this.fb.group(
  {
    usuario: ['', nombreProhibido(/admin/i)],
    clave: [''],
    repetir: [''],
  },
  { validators: clavesIguales },
);`,
        'Un validador devuelve null si el valor es válido o un objeto con el error. Los validadores asíncronos devuelven una Promise o un Observable y sirven, por ejemplo, para comprobar en el servidor si un nombre de usuario ya existe.',
      ),
      code(
        'Formularios con tipos estrictos',
        `const correo = new FormControl('ana@ejemplo.com');
// Tipo: FormControl<string | null>. reset() lo deja en null.

const nombre = new FormControl('', { nonNullable: true });
// Tipo: FormControl<string>. reset() vuelve a ''.

const login = new FormGroup({
  correo: new FormControl('', { nonNullable: true }),
  clave: new FormControl('', { nonNullable: true }),
});

login.value;          // Partial<{ correo: string; clave: string }>
login.getRawValue();  // { correo: string; clave: string }

// Con FormBuilder
const fb = inject(NonNullableFormBuilder);`,
        'Desde Angular 14 los formularios reactivos tienen tipos estrictos por defecto. value puede omitir los controles deshabilitados; getRawValue() los incluye siempre.',
      ),
      code(
        'Reaccionar a los cambios del formulario',
        `export class BuscadorComponent {
  termino = new FormControl('', { nonNullable: true });

  constructor() {
    this.termino.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((valor) => this.buscar(valor));

    this.termino.statusChanges.subscribe((estado) => console.log(estado));
  }
}

// Validar al salir del campo en lugar de en cada tecla
nombre = new FormControl('', { updateOn: 'blur' });`,
        'valueChanges emite cada vez que cambia el valor y statusChanges cada vez que cambia la validez (VALID, INVALID, PENDING, DISABLED).',
      ),
      links('Guías de formularios', [
        ['Introducción a los formularios', 'guide/forms-overview'],
        ['Formularios reactivos', 'guide/reactive-forms'],
        ['Formularios con tipos estrictos', 'guide/typed-forms'],
        ['Validar formularios', 'guide/form-validation'],
        ['Formularios dinámicos', 'guide/dynamic-form'],
        ['Formulario basado en plantilla', 'guide/forms'],
      ]),
    ],
  },
  {
    level: 10,
    title: 'Comunicación con el servidor: HttpClient',
    topics: [
      text(
        '¿Qué ofrece HttpClient?',
        `La mayoría de aplicaciones necesitan hablar con un servidor por HTTP para descargar o enviar datos. Angular incluye HttpClient en @angular/common/http, que ofrece:

Respuestas con tipos de TypeScript.
Manejo de errores simplificado.
Interceptores de peticiones y respuestas.
Utilidades para escribir pruebas.

Todos sus métodos devuelven un Observable de RxJS.`,
      ),
      code(
        'Configurar HttpClient',
        `// app.config.ts
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // provideHttpClient(withFetch())  ← usa la API fetch; recomendado con SSR
  ],
};`,
        'Sin provideHttpClient(), inyectar HttpClient produce el error NG0201: No provider for HttpClient.',
      ),
      code(
        'Pedir datos con GET',
        `import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);
  private url = '/api/productos';

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.url + '/' + id);
  }
}

// en el componente
productos$ = inject(ProductosService).obtenerTodos();

@for (producto of productos$ | async; track producto.id) {
  <li>{{ producto.nombre }}</li>
}`,
        'La petición no se envía hasta que alguien se suscribe: con subscribe() o con el pipe async. El tipo entre <> solo informa a TypeScript; no valida lo que responde el servidor.',
      ),
      code(
        'Enviar datos: POST, PUT y DELETE',
        `crear(producto: Omit<Producto, 'id'>): Observable<Producto> {
  return this.http.post<Producto>(this.url, producto);
}

actualizar(producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(this.url + '/' + producto.id, producto);
}

eliminar(id: number): Observable<void> {
  return this.http.delete<void>(this.url + '/' + id);
}

// en el componente: sin subscribe() no se envía nada
this.servicio.eliminar(id).subscribe(() => this.recargar());`,
        'El cuerpo se envía como JSON. Un error frecuente es llamar a delete() o post() sin suscribirse: la petición nunca sale.',
      ),
      code(
        'Parámetros de consulta y cabeceras',
        `import { HttpHeaders, HttpParams } from '@angular/common/http';

buscar(termino: string, pagina: number): Observable<Producto[]> {
  const params = new HttpParams()
    .set('q', termino.trim())
    .set('pagina', pagina);

  const headers = new HttpHeaders({ 'Accept-Language': 'es' });

  // GET /api/productos?q=teclado&pagina=2
  return this.http.get<Producto[]>(this.url, { params, headers });
}`,
        'HttpParams y HttpHeaders son inmutables: set() devuelve un objeto nuevo, por eso se encadenan las llamadas.',
      ),
      code(
        'Manejar los errores',
        `import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

obtenerTodos(): Observable<Producto[]> {
  return this.http.get<Producto[]>(this.url).pipe(
    retry(3),                        // reintenta hasta 3 veces
    catchError(this.manejarError),
  );
}

private manejarError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('Error de red o del cliente:', error.error);
  } else {
    console.error('El servidor respondió', error.status, error.error);
  }
  return throwError(() => new Error('No se pudo completar la operación.'));
}`,
        'status 0 indica que la petición no llegó a completarse: sin conexión, CORS o un error en el cliente. Cualquier otro código es la respuesta de error del servidor. Devuelve al componente un mensaje pensado para el usuario.',
      ),
      code(
        'Interceptores',
        `// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (peticion, next) => {
  const token = inject(SesionService).token();

  // Las peticiones son inmutables: se clonan para modificarlas
  const conToken = peticion.clone({
    setHeaders: { Authorization: 'Bearer ' + token },
  });

  return next(conToken);
};

// app.config.ts
provideHttpClient(withInterceptors([authInterceptor, registroInterceptor]))`,
        'Un interceptor examina o transforma todas las peticiones salientes y sus respuestas. Se ejecutan en el orden en que se registran. Usos habituales: añadir el token de autenticación, registrar tiempos, caché y manejo global de errores.',
      ),
      code(
        'Pasar metadatos a los interceptores',
        `import { HttpContext, HttpContextToken } from '@angular/common/http';

export const REINTENTOS = new HttpContextToken<number>(() => 3);

// Al hacer la petición
this.http.get('/api/informe', {
  context: new HttpContext().set(REINTENTOS, 5),
});

// En el interceptor
export const reintentoInterceptor: HttpInterceptorFn = (peticion, next) =>
  next(peticion).pipe(retry(peticion.context.get(REINTENTOS)));`,
        'HttpContext transporta datos que no se envían al servidor y que los interceptores pueden leer para decidir cómo tratar esa petición concreta.',
      ),
      code(
        'Seguir el progreso de una subida',
        `import { HttpEventType } from '@angular/common/http';

subir(archivo: File): void {
  this.http
    .post('/api/archivos', archivo, { reportProgress: true, observe: 'events' })
    .subscribe((evento) => {
      if (evento.type === HttpEventType.UploadProgress && evento.total) {
        this.progreso = Math.round((100 * evento.loaded) / evento.total);
      }
      if (evento.type === HttpEventType.Response) {
        this.progreso = 100;
      }
    });
}`,
        'observe: \'events\' entrega todos los eventos de la petición en lugar de solo el cuerpo de la respuesta. observe: \'response\' entrega la respuesta completa, con cabeceras y código de estado.',
      ),
      text(
        'Protección contra XSRF',
        `En un ataque de falsificación de petición en sitios cruzados (XSRF o CSRF), una página maliciosa hace que el navegador del usuario autenticado envíe peticiones a tu servidor sin que él lo sepa.

HttpClient incluye una defensa: lee un token de la cookie XSRF-TOKEN y lo envía en la cabecera X-XSRF-TOKEN en las peticiones que modifican datos hacia el mismo origen. Como solo el código de tu dominio puede leer esa cookie, el servidor sabe que la petición es legítima.

El servidor debe generar la cookie y verificar la cabecera. Los nombres se cambian con withXsrfConfiguration({ cookieName, headerName }).`,
      ),
      links('Guías de HttpClient', [
        ['Entender la comunicación HTTP', 'guide/understanding-communicating-with-http'],
        ['Configuración', 'guide/http-setup-server-communication'],
        ['Pedir datos', 'guide/http-request-data-from-server'],
        ['Manejar errores', 'guide/http-handle-request-errors'],
        ['Enviar datos', 'guide/http-send-data-to-server'],
        ['Interceptores', 'guide/http-intercept-requests-and-responses'],
        ['Protección XSRF', 'guide/http-security-xsrf-protection'],
      ]),
    ],
  },
  {
    level: 11,
    title: 'Observables y RxJS',
    topics: [
      text(
        '¿Qué es un Observable?',
        `Un Observable representa una secuencia de valores que llegan a lo largo del tiempo: las teclas que pulsa un usuario, la respuesta de una petición HTTP, un temporizador. Sigue el patrón observador: un sujeto mantiene una lista de observadores y les avisa cuando hay novedades.

Un Observable es declarativo: no hace nada hasta que alguien se suscribe. El suscriptor recibe notificaciones hasta que la secuencia termina o hasta que cancela la suscripción.`,
      ),
      code(
        'Crear un Observable y suscribirse',
        `import { Observable, of } from 'rxjs';

const numeros$ = of(1, 2, 3);

const suscripcion = numeros$.subscribe({
  next: (valor) => console.log('Valor:', valor),
  error: (error) => console.error('Error:', error),
  complete: () => console.log('Terminó'),
});

// Un Observable hecho a mano
const reloj$ = new Observable<number>((observador) => {
  const id = setInterval(() => observador.next(Date.now()), 1000);
  return () => clearInterval(id);   // se ejecuta al cancelar la suscripción
});

suscripcion.unsubscribe();`,
        'El observador puede definir tres manejadores: next (obligatorio, un valor nuevo), error (la secuencia falló y termina) y complete (terminó sin errores). Por convención, las variables que guardan un Observable acaban en $.',
      ),
      code(
        'Operadores de RxJS',
        `import { filter, map, of } from 'rxjs';

of(1, 2, 3, 4, 5)
  .pipe(
    filter((n) => n % 2 !== 0),   // deja pasar los impares
    map((n) => n * n),            // los eleva al cuadrado
  )
  .subscribe((valor) => console.log(valor));

// 1
// 9
// 25`,
        'Un operador es una función que recibe un Observable y devuelve otro. pipe() los encadena. Los más usados: map, filter, tap, switchMap, mergeMap, concatMap, debounceTime, distinctUntilChanged, catchError, retry y takeUntil.',
      ),
      code(
        'Búsqueda mientras el usuario escribe',
        `export class BuscadorComponent {
  private servicio = inject(ProductosService);
  termino = new FormControl('', { nonNullable: true });

  resultados$ = this.termino.valueChanges.pipe(
    map((texto) => texto.trim()),
    filter((texto) => texto.length >= 2),
    debounceTime(300),            // espera a que deje de escribir
    distinctUntilChanged(),       // ignora si el texto no cambió
    switchMap((texto) => this.servicio.buscar(texto)),
  );
}`,
        'switchMap cancela la petición anterior cuando llega un término nuevo, así nunca se muestra una respuesta antigua que llegó tarde.',
      ),
      code(
        'Subject y BehaviorSubject',
        `import { BehaviorSubject, Subject } from 'rxjs';

// Subject: emite a todos los suscriptores a partir del momento en que se suscriben
const clics = new Subject<string>();
clics.subscribe((id) => console.log('A:', id));
clics.next('boton-1');

// BehaviorSubject: guarda el último valor y lo entrega al suscribirse
@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items = new BehaviorSubject<string[]>([]);
  items$ = this.items.asObservable();

  agregar(item: string): void {
    this.items.next([...this.items.value, item]);
  }
}`,
        'Expón solo el Observable con asObservable() para que únicamente el servicio pueda emitir valores.',
      ),
      code(
        'Cancelar las suscripciones',
        `import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class PanelComponent {
  private destroyRef = inject(DestroyRef);

  constructor() {
    // En el constructor no necesita argumentos
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe((n) => console.log(n));
  }

  ngOnInit(): void {
    // Fuera del contexto de inyección se le pasa el DestroyRef
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((n) => console.log(n));
  }
}`,
        'Una suscripción que no se cancela sigue viva después de destruir el componente y provoca fugas de memoria. Con el pipe async en la plantilla no hace falta cancelar nada.',
      ),
      text(
        'Dónde usa Angular los Observables',
        `HttpClient: cada petición devuelve un Observable.
Router: Router.events y los parámetros de ActivatedRoute.
Formularios reactivos: valueChanges y statusChanges.
EventEmitter: la clase de los @Output extiende Subject de RxJS.
Pipe async: se suscribe a un Observable desde la plantilla.

Frente a una Promise: el Observable no empieza hasta que te suscribes, puede emitir muchos valores, se puede cancelar y se transforma con operadores. Una Promise se ejecuta al crearla, entrega un solo valor y no se cancela.`,
      ),
      links('Guías de observables', [
        ['Visión general de observables', 'guide/observables'],
        ['La librería RxJS', 'guide/rx-library'],
        ['Observables en Angular', 'guide/observables-in-angular'],
        ['Uso práctico', 'guide/practical-observable-usage'],
        ['Comparación con otras técnicas', 'guide/comparing-observables'],
      ]),
    ],
  },
]
