// Angular · Bases de TypeScript. Temario tomado del curso «Angular: De cero a experto» (secciones 2 y 3).

import { code, text } from './angularHelpers'

export const angularTypescriptLevel = {
  title: 'Bases de TypeScript',
  topics: [
    text(
      '¿Qué es TypeScript y por qué Angular lo usa?',
      `TypeScript es JavaScript con tipos. Todo JavaScript válido es TypeScript válido; lo que se añade es la posibilidad de declarar qué tipo de dato guarda cada variable, qué recibe y qué devuelve cada función y qué forma tiene cada objeto. El navegador no entiende TypeScript: se compila a JavaScript antes de ejecutarse.

Angular lo usa porque detecta errores mientras escribes y no cuando el usuario ya está usando la aplicación, porque el editor puede autocompletar y refactorizar con seguridad, y porque los decoradores y la inyección de dependencias se apoyan en los tipos.`,
    ),
    text(
      'Mitos y realidades de Angular',
      `«Angular es muy difícil»: tiene más conceptos que otras opciones, pero todos los proyectos se organizan igual, así que lo aprendido en uno sirve en el siguiente.
«Angular es lento»: con Signals, la detección de cambios OnPush y las vistas diferibles, su rendimiento es comparable al de cualquier framework actual.
«Angular y AngularJS son lo mismo»: AngularJS (versión 1) es otro framework, ya sin soporte. Angular es la reescritura completa que empezó en la versión 2.
«Hay que usar NgModules»: desde la versión 17 los proyectos nuevos usan componentes standalone.
«Cada versión rompe todo»: ng update aplica migraciones automáticas y las versiones mayores salen cada seis meses con cambios graduales.`,
    ),
    code(
      'Tipos básicos',
      `let nombre: string = 'Ana';
let edad: number = 28;
let activo: boolean = true;

// TypeScript infiere el tipo a partir del valor inicial
let ciudad = 'Lima';
// ciudad = 10;   ← error: number no se puede asignar a string

// Un valor puede ser de varios tipos
let codigo: number | string = 123;
codigo = 'A-123';

const habilidades: string[] = ['HTML', 'CSS'];
const mezcla: (string | number)[] = ['uno', 2];`,
      'const declara una referencia que no se puede reasignar; let, una que sí. No hace falta anotar el tipo cuando TypeScript puede deducirlo.',
    ),
    code(
      'Objetos e interfaces',
      `interface Personaje {
  nombre: string;
  poder: number;
  habilidades: string[];
  ciudad?: string;          // opcional
}

const goku: Personaje = {
  nombre: 'Goku',
  poder: 9000,
  habilidades: ['Kamehameha'],
};

goku.ciudad = 'Monte Paoz';
// goku.edad = 30;   ← error: edad no existe en Personaje`,
      'Una interfaz describe la forma de un objeto. No genera código JavaScript: solo existe para que el compilador y el editor te ayuden. En Angular se usan para tipar las respuestas de una API.',
    ),
    code(
      'Funciones',
      `function sumar(a: number, b: number): number {
  return a + b;
}

const sumarFlecha = (a: number, b: number): number => a + b;

// Parámetro opcional y parámetro con valor por defecto
function multiplicar(numero: number, otro?: number, base: number = 2): number {
  return numero * base;
}

// Una función que no devuelve nada es void
function saludar(nombre: string): void {
  console.log('Hola ' + nombre);
}`,
      'Los parámetros opcionales (con ?) van siempre después de los obligatorios.',
    ),
    code(
      'Funciones con objetos como argumentos',
      `interface Personaje {
  nombre: string;
  vida: number;
  mostrarVida: () => void;
}

function curar(personaje: Personaje, cantidad: number): void {
  personaje.vida += cantidad;
}

const strider: Personaje = {
  nombre: 'Strider',
  vida: 50,
  mostrarVida() {
    console.log('Vida:', this.vida);
  },
};

curar(strider, 20);
strider.mostrarVida();   // Vida: 70`,
      'Los objetos se pasan por referencia: la función modifica el objeto original, no una copia.',
    ),
    code(
      'Desestructuración de objetos, arreglos y argumentos',
      `const reproductor = {
  volumen: 90,
  cancion: 'Mess',
  detalles: { autor: 'Ed Sheeran', anio: 2015 },
};

// Objetos: por nombre, con alias y anidado
const { volumen, cancion: titulo, detalles: { autor } } = reproductor;

// Arreglos: por posición; las comas saltan elementos
const personajes = ['Goku', 'Vegeta', 'Trunks'];
const [, , tercero = 'Nadie'] = personajes;

// Argumentos de una función
interface Producto { nombre: string; precio: number }

function calcularImpuesto({ precio }: Producto, tasa = 0.18): [number, number] {
  return [precio * tasa, precio * (1 + tasa)];
}

const [impuesto, total] = calcularImpuesto({ nombre: 'Teclado', precio: 100 });`,
      'Desestructurar es sacar valores de un objeto o arreglo a variables sueltas en una sola línea.',
    ),
    code(
      'Importaciones y exportaciones',
      `// producto.ts
export interface Producto {
  nombre: string;
  precio: number;
}

export function calcularTotal(productos: Producto[]): number {
  return productos.reduce((suma, producto) => suma + producto.precio, 0);
}

// carrito.ts
import { calcularTotal, type Producto } from './producto';

const carrito: Producto[] = [{ nombre: 'Mouse', precio: 40 }];
console.log(calcularTotal(carrito));`,
      'Cada archivo es un módulo: lo que no se exporta no existe fuera de él. Así es como Angular conecta componentes, servicios e interfaces.',
    ),
    code(
      'Clases y constructor',
      `class Persona {
  // Forma larga
  // public nombre: string;
  // private direccion: string;
  // constructor(nombre: string, direccion: string) {
  //   this.nombre = nombre;
  //   this.direccion = direccion;
  // }

  // Forma corta: el modificador declara y asigna la propiedad
  constructor(
    public nombre: string,
    private direccion: string = 'Sin dirección',
  ) {}

  presentarse(): string {
    return 'Soy ' + this.nombre;
  }
}

const ana = new Persona('Ana');
console.log(ana.presentarse());
// ana.direccion   ← error: es privada`,
      'public: accesible desde fuera. private: solo dentro de la clase. protected: en la clase y en las que la extienden. readonly: no se puede reasignar.',
    ),
    code(
      'Extender una clase y preferir la composición',
      `// Herencia: Heroe ES una Persona
class Heroe extends Persona {
  constructor(public alias: string, nombreReal: string) {
    super(nombreReal);   // obligatorio antes de usar this
  }
}

// Composición: Heroe TIENE una Persona
class HeroeCompuesto {
  constructor(
    public alias: string,
    public persona: Persona,
  ) {}
}

const tony = new Persona('Tony Stark', 'Nueva York');
const ironman = new HeroeCompuesto('Ironman', tony);`,
      'Con herencia, cualquier cambio en la clase padre afecta a todas las hijas. Con composición, las clases quedan desacopladas y son más fáciles de probar. Angular sigue esta idea: un componente recibe servicios, no los hereda.',
    ),
    code(
      'Genéricos',
      `function identidad<T>(valor: T): T {
  return valor;
}

const texto = identidad<string>('hola');    // string
const numero = identidad(100);              // number, inferido

interface Respuesta<T> {
  datos: T;
  total: number;
}

const respuesta: Respuesta<string[]> = { datos: ['a', 'b'], total: 2 };`,
      'Un genérico es un tipo que se decide al usar la función o la interfaz. Los verás constantemente en Angular: http.get<Producto[]>(), signal<number>(0), Observable<Usuario>.',
    ),
    code(
      'Decoradores',
      `function registrar<T extends new (...args: any[]) => any>(clase: T) {
  console.log('Clase registrada:', clase.name);
  return clase;
}

@registrar
class MiClase {
  propiedad = 'valor';
}

// Así es como Angular convierte una clase en algo más:
// @Component({...})  → componente
// @Injectable({...}) → servicio
// @Pipe({...})       → pipe
// @Directive({...})  → directiva`,
      'Un decorador es una función que recibe la clase (o una propiedad, o un método) y le añade información o comportamiento. En Angular casi nunca escribirás uno: usarás los que trae el framework.',
    ),
    code(
      'Encadenamiento opcional y valores nulos',
      `interface Pasajero {
  nombre: string;
  hijos?: string[];
}

const pasajero: Pasajero = { nombre: 'Luis' };

// Sin ?. esto lanzaría un error al leer length de undefined
const cantidad = pasajero.hijos?.length ?? 0;

// ! afirma que el valor existe: úsalo solo si estás seguro
const primero = pasajero.hijos![0];`,
      '?. devuelve undefined si lo que hay a su izquierda es null o undefined, en lugar de fallar. ?? da un valor alternativo solo ante null o undefined. También funcionan dentro de las plantillas de Angular.',
    ),
  ],
}
