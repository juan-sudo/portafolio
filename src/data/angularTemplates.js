// Angular 17 · niveles 2 a 6: plantillas, control de flujo, comunicación entre componentes, pipes y directivas.

import { code, links, text } from './angularHelpers'

export const angularTemplateLevels = [
  {
    level: 2,
    title: 'Plantillas y enlace de datos',
    topics: [
      text(
        'Qué es una plantilla',
        `Una plantilla es un fragmento de HTML que describe cómo se muestra un componente. Además del HTML normal, admite la sintaxis de Angular: interpolación, enlaces de propiedades y eventos, directivas, pipes y bloques de control de flujo.

Casi todo el HTML es válido, salvo la etiqueta <script>, que Angular ignora para evitar ataques de inyección.`,
      ),
      code(
        'Interpolación de texto',
        `<!-- producto.component.html -->
<h3>{{ nombre }}</h3>
<p>Precio con IGV: {{ precio * 1.18 }}</p>
<p>{{ obtenerDescripcion() }}</p>
<p>{{ 'Stock: ' + stock }}</p>`,
        'Angular evalúa la expresión entre llaves dobles, la convierte en texto y actualiza la pantalla cuando el valor cambia. Las expresiones deben ser rápidas y sin efectos secundarios: no se permiten asignaciones (=, +=), new, ni encadenar con punto y coma.',
      ),
      code(
        'Enlace de propiedades con corchetes',
        `<img [src]="urlImagen" [alt]="nombre">
<button [disabled]="!formularioValido">Guardar</button>
<app-detalle [producto]="productoActual" />

<!-- Sin corchetes es un texto fijo, no una expresión -->
<app-detalle titulo="Detalle del producto" />`,
        'Los corchetes le dicen a Angular que evalúe el lado derecho como una expresión y la asigne a la propiedad del elemento, componente o directiva. Los datos fluyen en una sola dirección: de la clase a la plantilla.',
      ),
      code(
        'Enlace de atributos',
        `<!-- colspan y aria-* son atributos, no propiedades del DOM -->
<td [attr.colspan]="columnas">Total</td>
<button [attr.aria-label]="accion">X</button>

<!-- Si la expresión es null o undefined, el atributo se elimina -->
<a [attr.target]="externo ? '_blank' : null" href="/ayuda">Ayuda</a>`,
        'Usa enlace de propiedades siempre que puedas. Recurre a [attr.nombre] cuando el elemento no tenga una propiedad equivalente, como ocurre con ARIA y SVG.',
      ),
      code(
        'Enlace de clases y estilos',
        `<!-- Una clase: se añade si la expresión es verdadera -->
<div [class.activo]="estaActivo">Menú</div>

<!-- Varias clases: cadena, arreglo u objeto -->
<div [class]="{ activo: estaActivo, deshabilitado: !habilitado }">Menú</div>

<!-- Un estilo, con unidad opcional -->
<div [style.width.px]="ancho">Barra</div>
<div [style.background-color]="color">Caja</div>

<!-- Varios estilos -->
<div [style]="{ width: '100px', height: '50px' }">Caja</div>`,
        'Para que Angular detecte el cambio al enlazar un objeto o arreglo, debes crear uno nuevo: modificar una propiedad del mismo objeto no actualiza las clases ni los estilos.',
      ),
      code(
        'Enlace de eventos con paréntesis',
        `<!-- plantilla -->
<button (click)="guardar()">Guardar</button>
<input (input)="alEscribir($event)">
<input (keydown.enter)="buscar()">
<input (keydown.shift.t)="abrirPestana()">

// clase
alEscribir(evento: Event): void {
  const valor = (evento.target as HTMLInputElement).value;
  console.log(valor);
}`,
        'Entre paréntesis va el nombre del evento y a la derecha la sentencia que se ejecuta. $event contiene el objeto del evento del DOM. Angular permite filtrar por tecla o combinación directamente en el nombre del evento.',
      ),
      code(
        'Enlace bidireccional con [(ngModel)]',
        `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="termino" placeholder="Buscar">
    <p>Buscas: {{ termino }}</p>
  \`,
})
export class BuscadorComponent {
  termino = '';
}`,
        'La sintaxis [( )], llamada «banana en una caja», combina un enlace de propiedad y uno de evento: la clase actualiza el campo y el campo actualiza la clase. ngModel pertenece a FormsModule; sin importarlo aparece un error.',
      ),
      code(
        'Enlace bidireccional entre componentes',
        `// contador.component.ts
@Component({
  selector: 'app-contador',
  standalone: true,
  template: \`
    <button (click)="cambiar(-1)">-</button>
    {{ valor }}
    <button (click)="cambiar(1)">+</button>
  \`,
})
export class ContadorComponent {
  @Input() valor = 0;
  @Output() valorChange = new EventEmitter<number>();

  cambiar(delta: number): void {
    this.valor += delta;
    this.valorChange.emit(this.valor);
  }
}

<!-- componente padre -->
<app-contador [(valor)]="cantidad" />`,
        'Para que [(valor)] funcione, el @Output debe llamarse igual que el @Input más el sufijo Change. Es una forma abreviada de [valor]="cantidad" (valorChange)="cantidad = $event".',
      ),
      code(
        'Variables de referencia de plantilla',
        `<input #telefono placeholder="Número de teléfono">
<button (click)="llamar(telefono.value)">Llamar</button>

<!-- Sobre un componente, la variable apunta a su instancia -->
<app-contador #contador />
<p>Valor actual: {{ contador.valor }}</p>

<!-- Con un valor, apunta a la directiva exportada con ese nombre -->
<form #formulario="ngForm" (ngSubmit)="enviar(formulario)">...</form>`,
        'Una variable declarada con # sirve en cualquier parte de la misma plantilla, pero no fuera de un bloque @if o @for si se declaró dentro de él.',
      ),
      text(
        'Resumen de la sintaxis de enlace',
        `{{ valor }}: interpolación, de la clase a la plantilla.
[propiedad]="valor": enlace de propiedad, de la clase a la plantilla.
[attr.nombre]="valor": enlace de atributo.
[class.nombre]="condicion" y [style.propiedad]="valor": clases y estilos.
(evento)="manejador()": enlace de evento, de la plantilla a la clase.
[(propiedad)]="valor": enlace bidireccional.
#variable: referencia a un elemento, componente o directiva.`,
      ),
      links('Guías de plantillas', [
        ['Interpolación', 'guide/interpolation'],
        ['Entender los enlaces', 'guide/binding-overview'],
        ['Enlace de propiedades', 'guide/property-binding'],
        ['Enlace de clases y estilos', 'guide/class-binding'],
        ['Enlace de eventos', 'guide/event-binding'],
        ['Enlace bidireccional', 'guide/two-way-binding'],
        ['Variables de plantilla', 'guide/template-reference-variables'],
      ]),
    ],
  },
  {
    level: 3,
    title: 'Control de flujo y directivas integradas',
    topics: [
      text(
        'Dos formas de controlar lo que se muestra',
        `Angular 17 incorpora bloques de control de flujo en la propia plantilla: @if, @for y @switch. Forman parte del lenguaje de plantillas, así que no hay que importar nada. En la versión 17 están en vista previa para desarrolladores.

La forma anterior son las directivas estructurales *ngIf, *ngFor y *ngSwitch, que siguen funcionando y verás en mucho código existente.`,
      ),
      code(
        'Mostrar contenido con @if',
        `@if (usuario) {
  <p>Hola, {{ usuario.nombre }}</p>
} @else if (cargando) {
  <p>Cargando…</p>
} @else {
  <button (click)="iniciarSesion()">Iniciar sesión</button>
}

<!-- Guardar el resultado en una variable -->
@if (usuario.perfil.ajustes.fechaInicio; as fecha) {
  {{ fecha }}
}`,
        'El contenido de la rama que no se cumple no existe en el DOM: Angular lo crea y lo destruye, no lo oculta.',
      ),
      code(
        'Repetir contenido con @for',
        `<ul>
  @for (producto of productos; track producto.id) {
    <li>{{ $index + 1 }}. {{ producto.nombre }}</li>
  } @empty {
    <li>No hay productos.</li>
  }
</ul>`,
        'track es obligatorio: indica cómo identificar cada elemento para reutilizar su parte del DOM cuando la lista cambia. Usa una propiedad única como el id; si la lista nunca cambia de orden puedes usar track $index. El bloque @empty se muestra cuando la colección está vacía.',
      ),
      code(
        'Variables disponibles dentro de @for',
        `@for (tarea of tareas; track tarea.id; let i = $index, ultima = $last) {
  <p [class.par]="$even">
    {{ i }} de {{ $count }}: {{ tarea.titulo }}
    @if (!ultima) { <hr> }
  </p>
}`,
        '$index: posición actual. $count: total de elementos. $first y $last: si es el primero o el último. $even y $odd: si la posición es par o impar. Puedes darles otro nombre con let.',
      ),
      code(
        'Elegir entre varias opciones con @switch',
        `@switch (pedido.estado) {
  @case ('pendiente') {
    <span>Pendiente de pago</span>
  }
  @case ('enviado') {
    <span>En camino</span>
  }
  @default {
    <span>Estado desconocido</span>
  }
}`,
        'La comparación se hace con ===. No hay caída entre casos, así que no se necesita break.',
      ),
      code(
        'La forma anterior: *ngIf y *ngFor',
        `import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgIf, NgFor],
  template: \`
    <p *ngIf="usuario; else invitado">Hola, {{ usuario.nombre }}</p>
    <ng-template #invitado><p>Hola, invitado</p></ng-template>

    <li *ngFor="let producto of productos; let i = index; trackBy: porId">
      {{ i }}: {{ producto.nombre }}
    </li>
  \`,
})
export class ListaComponent {
  porId(indice: number, producto: Producto): number {
    return producto.id;
  }
}`,
        'El asterisco es una abreviatura: Angular envuelve el elemento en un <ng-template>. Para migrar un proyecto a la sintaxis nueva: ng generate @angular/core:control-flow.',
      ),
      code(
        'Agrupar sin añadir elementos: ng-container',
        `<p>
  Bienvenido
  <ng-container *ngIf="usuario">
    de nuevo, <strong>{{ usuario.nombre }}</strong>
  </ng-container>
</p>`,
        '<ng-container> no genera ninguna etiqueta en el DOM. Sirve cuando necesitas aplicar una directiva estructural sin añadir un <div> o <span> que rompa los estilos.',
      ),
      code(
        'NgClass y NgStyle',
        `import { NgClass, NgStyle } from '@angular/common';

<!-- con imports: [NgClass, NgStyle] en el componente -->
<div [ngClass]="{ guardado: guardado, error: tieneError }">Estado</div>
<div [ngClass]="esEspecial ? 'especial' : ''">Oferta</div>

<div [ngStyle]="{ 'font-size.px': tamano, color: color }">Texto</div>`,
        'NgClass añade o quita varias clases a la vez y NgStyle varios estilos. Para una sola clase o un solo estilo basta con [class.nombre] y [style.propiedad], sin importar nada.',
      ),
      links('Guías de control de flujo y directivas integradas', [
        ['Control de flujo integrado', 'guide/control_flow'],
        ['Directivas integradas', 'guide/built-in-directives'],
        ['Directivas estructurales', 'guide/structural-directives'],
      ]),
    ],
  },
  {
    level: 4,
    title: 'Comunicación entre componentes',
    topics: [
      code(
        'Pasar datos del padre al hijo con @Input',
        `// hijo: detalle-producto.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  template: '<p>Producto: {{ nombre }}</p>',
})
export class DetalleProductoComponent {
  @Input() nombre = '';
}

<!-- padre -->
<app-detalle-producto [nombre]="productoActual" />`,
        '@Input() marca una propiedad que el componente padre puede asignar. El hijo no debe modificar directamente los datos del padre.',
      ),
      code(
        'Inputs obligatorios, con alias y con transformación',
        `import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';

export class TarjetaComponent {
  @Input({ required: true }) titulo!: string;

  @Input({ alias: 'tamano' }) tamanoInterno = 'mediano';

  // <app-tarjeta deshabilitada /> pasa a ser true
  @Input({ transform: booleanAttribute }) deshabilitada = false;

  // <app-tarjeta columnas="3" /> pasa a ser el número 3
  @Input({ transform: numberAttribute }) columnas = 1;
}`,
        'Con required: true, el compilador muestra un error si el padre no pasa el valor. transform convierte el valor recibido antes de asignarlo.',
      ),
      code(
        'Enviar eventos del hijo al padre con @Output',
        `// hijo
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nuevo-item',
  standalone: true,
  template: \`
    <input #campo>
    <button (click)="agregar(campo.value)">Agregar</button>
  \`,
})
export class NuevoItemComponent {
  @Output() itemAgregado = new EventEmitter<string>();

  agregar(valor: string): void {
    this.itemAgregado.emit(valor);
  }
}

<!-- padre -->
<app-nuevo-item (itemAgregado)="items.push($event)" />`,
        'El hijo emite con emit() y el padre escucha con la sintaxis de enlace de eventos. $event contiene el valor emitido.',
      ),
      code(
        'Reaccionar a los cambios de un input',
        `import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class HistorialComponent implements OnChanges {
  @Input() version = 0;
  cambios: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const cambio = changes['version'];
    if (cambio && !cambio.firstChange) {
      this.cambios.push(cambio.previousValue + ' → ' + cambio.currentValue);
    }
  }
}`,
        'ngOnChanges() recibe los valores anterior y actual de cada @Input que cambió. Otra opción para un solo input es declararlo con un setter.',
      ),
      code(
        'Acceder al hijo desde la clase con @ViewChild',
        `import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CronometroComponent } from './cronometro.component';

@Component({
  standalone: true,
  imports: [CronometroComponent],
  template: \`
    <button (click)="iniciar()">Iniciar</button>
    <app-cronometro />
  \`,
})
export class PanelComponent implements AfterViewInit {
  @ViewChild(CronometroComponent) cronometro!: CronometroComponent;

  ngAfterViewInit(): void {
    // A partir de aquí el hijo ya existe
  }

  iniciar(): void {
    this.cronometro.iniciar();
  }
}`,
        'La referencia no está disponible en el constructor ni en ngOnInit(): se asigna antes de ngAfterViewInit(). @ViewChildren devuelve una QueryList con todos los que coincidan.',
      ),
      code(
        'Proyección de contenido con ng-content',
        `// tarjeta.component.ts
@Component({
  selector: 'app-tarjeta',
  standalone: true,
  template: \`
    <header><ng-content select="[titulo]" /></header>
    <section><ng-content /></section>
  \`,
})
export class TarjetaComponent {}

<!-- uso -->
<app-tarjeta>
  <h2 titulo>Oferta de la semana</h2>
  <p>Todo con 20 % de descuento.</p>
</app-tarjeta>`,
        '<ng-content> marca dónde se inserta el contenido que el padre escribe entre las etiquetas del componente. Con select eliges qué parte va en cada ranura; el <ng-content> sin select recibe todo lo demás.',
      ),
      code(
        'Comunicación a través de un servicio',
        `import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MisionService {
  private anunciada = new Subject<string>();
  anunciada$ = this.anunciada.asObservable();

  anunciar(mision: string): void {
    this.anunciada.next(mision);
  }
}`,
        'Cuando dos componentes no son padre e hijo directos, comparten un servicio: uno llama a anunciar() y el otro se suscribe a anunciada$.',
      ),
      code(
        'Cargar componentes de forma dinámica',
        `import { NgComponentOutlet } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgComponentOutlet],
  template: \`
    <ng-container *ngComponentOutlet="anuncio.componente; inputs: anuncio.datos" />
    <button (click)="siguiente()">Siguiente anuncio</button>
  \`,
})
export class BannerComponent {
  anuncios = [
    { componente: OfertaComponent, datos: { titulo: 'Oferta' } },
    { componente: NoticiaComponent, datos: { titulo: 'Novedad' } },
  ];
  indice = 0;

  get anuncio() {
    return this.anuncios[this.indice];
  }

  siguiente(): void {
    this.indice = (this.indice + 1) % this.anuncios.length;
  }
}`,
        'NgComponentOutlet crea en tiempo de ejecución el componente que le indiques. Es útil cuando no sabes de antemano qué componente mostrar, como en un banner rotativo.',
      ),
      links('Guías de comunicación entre componentes', [
        ['Inputs y outputs', 'guide/inputs-outputs'],
        ['Interacción entre componentes', 'guide/component-interaction'],
        ['Proyección de contenido', 'guide/content-projection'],
        ['Componentes dinámicos', 'guide/dynamic-component-loader'],
      ]),
    ],
  },
  {
    level: 5,
    title: 'Pipes',
    topics: [
      text(
        '¿Qué es un pipe?',
        `Un pipe es una función que se usa en la plantilla para transformar un valor antes de mostrarlo: dar formato a fechas, monedas, porcentajes o texto. Se escribe con la barra vertical: {{ valor | nombreDelPipe }}.

El valor original no cambia; solo cambia lo que se ve en pantalla.`,
      ),
      code(
        'Pipes integrados',
        `import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, UpperCasePipe } from '@angular/common';

<!-- con esos pipes en imports -->
<p>{{ nombre | uppercase }}</p>          <!-- ANA -->
<p>{{ fecha | date }}</p>                <!-- Apr 15, 2024 -->
<p>{{ precio | currency }}</p>           <!-- $1,250.50 -->
<p>{{ 3.14159 | number }}</p>            <!-- 3.142 -->
<p>{{ 0.259 | percent }}</p>             <!-- 26% -->`,
        'Otros pipes integrados: lowercase, titlecase, json, slice, keyvalue, async e i18nPlural. Todos están en @angular/common; el formato depende de la configuración regional de la aplicación.',
      ),
      code(
        'Parámetros y pipes encadenados',
        `<p>{{ fecha | date:'dd/MM/yyyy' }}</p>              <!-- 15/04/2024 -->
<p>{{ fecha | date:'fullDate' | uppercase }}</p>    <!-- MONDAY, APRIL 15, 2024 -->
<p>{{ precio | currency:'PEN':'symbol':'1.2-2' }}</p>
<p>{{ 3.14159 | number:'1.0-2' }}</p>               <!-- 3.14 -->`,
        'Los parámetros van separados por dos puntos. Al encadenar, la salida de un pipe es la entrada del siguiente. El formato numérico es minEnteros.minDecimales-maxDecimales.',
      ),
      code(
        'Precedencia del pipe en las expresiones',
        `<!-- El pipe tiene más precedencia que el operador ternario -->
<!-- Esto aplica uppercase solo a 'no': -->
{{ activo ? 'sí' : 'no' | uppercase }}

<!-- Con paréntesis se aplica al resultado completo -->
{{ (activo ? 'sí' : 'no') | uppercase }}`,
        'Ante la duda, usa paréntesis.',
      ),
      code(
        'Crear un pipe propio',
        `import { Pipe, PipeTransform } from '@angular/core';

// Uso: {{ 2 | potencia:10 }}  →  1024
@Pipe({
  name: 'potencia',
  standalone: true,
})
export class PotenciaPipe implements PipeTransform {
  transform(valor: number, exponente = 1): number {
    return Math.pow(valor, exponente);
  }
}`,
        'Genera uno con ng generate pipe potencia. El primer argumento de transform() es el valor de la izquierda de la barra; los demás son los parámetros. Recuerda añadirlo en imports del componente que lo use.',
      ),
      code(
        'Pipes puros e impuros',
        `@Pipe({
  name: 'soloActivos',
  standalone: true,
  pure: false,   // se ejecuta en cada ciclo de detección de cambios
})
export class SoloActivosPipe implements PipeTransform {
  transform(usuarios: Usuario[]): Usuario[] {
    return usuarios.filter((usuario) => usuario.activo);
  }
}`,
        'Por defecto un pipe es puro: solo se vuelve a ejecutar cuando cambia el valor primitivo o la referencia del objeto. Hacer push() a un arreglo no lo dispara. Un pipe impuro sí lo detecta, pero se ejecuta muchísimas veces: suele ser mejor crear un arreglo nuevo.',
      ),
      code(
        'El pipe async',
        `import { AsyncPipe } from '@angular/common';
import { Observable, interval, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: '<p>Hora: {{ hora$ | async }}</p>',
})
export class RelojComponent {
  hora$: Observable<string> = interval(1000).pipe(
    map(() => new Date().toLocaleTimeString()),
  );
}`,
        'async se suscribe al Observable o a la Promise, muestra el último valor emitido y cancela la suscripción cuando el componente se destruye. Evita tener que suscribirte y desuscribirte a mano.',
      ),
      links('Guías de pipes', [
        ['Entender los pipes', 'guide/pipes-overview'],
        ['Usar un pipe en una plantilla', 'guide/pipe-template'],
        ['Parámetros y pipes encadenados', 'guide/pipes-transform-data'],
        ['Precedencia', 'guide/pipe-precedence'],
      ]),
    ],
  },
  {
    level: 6,
    title: 'Directivas propias',
    topics: [
      text(
        'Tipos de directivas',
        `Una directiva es una clase que añade comportamiento a los elementos de la plantilla. Hay tres tipos:

Componentes: directivas que tienen plantilla.
Directivas de atributo: cambian la apariencia o el comportamiento de un elemento, componente u otra directiva.
Directivas estructurales: cambian la estructura del DOM añadiendo o quitando elementos.`,
      ),
      code(
        'Crear una directiva de atributo',
        `$ ng generate directive resaltar

// resaltar.directive.ts
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
  standalone: true,
})
export class ResaltarDirective {
  private elemento = inject(ElementRef);

  constructor() {
    this.elemento.nativeElement.style.backgroundColor = 'yellow';
  }
}

<!-- uso, con ResaltarDirective en imports -->
<p appResaltar>Este párrafo queda resaltado.</p>`,
        'Los corchetes del selector indican que se aplica como atributo. ElementRef da acceso al elemento del DOM anfitrión a través de nativeElement.',
      ),
      code(
        'Responder a eventos del usuario',
        `import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appResaltar]', standalone: true })
export class ResaltarDirective {
  private elemento = inject(ElementRef);

  @HostListener('mouseenter') alEntrar(): void {
    this.pintar('yellow');
  }

  @HostListener('mouseleave') alSalir(): void {
    this.pintar('');
  }

  private pintar(color: string): void {
    this.elemento.nativeElement.style.backgroundColor = color;
  }
}`,
        '@HostListener suscribe un método a un evento del elemento anfitrión y cancela la suscripción al destruir la directiva.',
      ),
      code(
        'Pasar valores a una directiva',
        `@Directive({ selector: '[appResaltar]', standalone: true })
export class ResaltarDirective {
  @Input() appResaltar = '';
  @Input() colorPorDefecto = 'yellow';

  // ...usa this.appResaltar || this.colorPorDefecto
}

<p [appResaltar]="color" colorPorDefecto="violet">Resaltado configurable</p>`,
        'Si el @Input se llama igual que el selector, se aplica la directiva y se le pasa el valor en un solo atributo.',
      ),
      code(
        'Crear una directiva estructural',
        `import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

// Lo contrario de ngIf: muestra el contenido cuando la condición es falsa
@Directive({ selector: '[appSalvoQue]', standalone: true })
export class SalvoQueDirective {
  private plantilla = inject(TemplateRef<unknown>);
  private contenedor = inject(ViewContainerRef);
  private mostrado = false;

  @Input() set appSalvoQue(condicion: boolean) {
    if (!condicion && !this.mostrado) {
      this.contenedor.createEmbeddedView(this.plantilla);
      this.mostrado = true;
    } else if (condicion && this.mostrado) {
      this.contenedor.clear();
      this.mostrado = false;
    }
  }
}

<p *appSalvoQue="estaOculto">Se muestra porque estaOculto es falso.</p>`,
        'TemplateRef representa el contenido del <ng-template> y ViewContainerRef el lugar donde se inserta. El asterisco hace que Angular envuelva el elemento en un <ng-template> automáticamente.',
      ),
      code(
        'Evitar que Angular procese un elemento',
        `<p>Angular evalúa esto: {{ 1 + 1 }}</p>
<p ngNonBindable>Esto se muestra tal cual: {{ 1 + 1 }}</p>`,
        'ngNonBindable desactiva la interpolación, las directivas y los enlaces dentro del elemento. Es útil para mostrar ejemplos de código.',
      ),
      code(
        'API de composición de directivas',
        `@Component({
  selector: 'app-menu',
  standalone: true,
  template: '<ng-content />',
  hostDirectives: [
    {
      directive: ComportamientoMenuDirective,
      inputs: ['menuId: id'],
      outputs: ['menuCerrado: cerrado'],
    },
  ],
})
export class MenuComponent {}

<app-menu id="principal" (cerrado)="registrar()" />`,
        'hostDirectives aplica directivas al elemento anfitrión de un componente desde su propia clase, para reutilizar comportamiento sin herencia. Solo admite directivas standalone, y sus inputs y outputs no se exponen salvo que los listes.',
      ),
      links('Guías de directivas', [
        ['Directivas de atributo', 'guide/attribute-directives'],
        ['Directivas estructurales', 'guide/structural-directives'],
        ['API de composición de directivas', 'guide/directive-composition-api'],
      ]),
    ],
  },
]
