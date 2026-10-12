// Nivel 6 · Módulos
const r = String.raw
const b = '`'
const d = '$'

const FIB_1000 = '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 '
const FIB_500 = '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 '
const FIB_50 = '0 1 1 2 3 5 8 13 21 34 '
const SERIE = '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89'

const FIBO_JS = r`// Módulo con funciones de Fibonacci
export function fib(n) {
  let a = 0
  let b = 1
  let linea = ''
  while (a < n) {
    linea += a + ' '
    const siguiente = a + b
    a = b
    b = siguiente
  }
  console.log(linea)
}

export function fib2(n) {
  const resultado = []
  let a = 0
  let b = 1
  while (a < n) {
    resultado.push(a)
    const siguiente = a + b
    a = b
    b = siguiente
  }
  return resultado
}
`

const FIBO_GO = r`// Paquete con funciones de Fibonacci
package fibo

import "fmt"

// Los nombres que empiezan con mayúscula se pueden usar desde fuera
func Fib(n int) {
    a, b := 0, 1
    for a < n {
        fmt.Print(a, " ")
        a, b = b, a+b
    }
    fmt.Println()
}

func Fib2(n int) []int {
    var resultado []int
    a, b := 0, 1
    for a < n {
        resultado = append(resultado, a)
        a, b = b, a+b
    }
    return resultado
}
`

const FIBO_CS = r`// Clase estática con métodos de Fibonacci
public static class Fibo {
    public static void Fib(int n) {
        int a = 0, b = 1;
        while (a < n) {
            Console.Write(a + " ");
            (a, b) = (b, a + b);
        }
        Console.WriteLine();
    }

    public static List<int> Fib2(int n) {
        var resultado = new List<int>();
        int a = 0, b = 1;
        while (a < n) {
            resultado.Add(a);
            (a, b) = (b, a + b);
        }
        return resultado;
    }
}
`

const FIBO_RB = r`# Módulo con métodos de Fibonacci
module Fibo
  def self.fib(n)
    a, b = 0, 1
    while a < n
      print a, ' '
      a, b = b, a + b
    end
    puts
  end

  def self.fib2(n)
    resultado = []
    a, b = 0, 1
    while a < n
      resultado << a
      a, b = b, a + b
    end
    resultado
  end
end
`

const FIBO_RS = r`// Módulo con funciones de Fibonacci: pub las hace visibles desde fuera
pub fn fib(n: u32) {
    let (mut a, mut b) = (0, 1);
    while a < n {
        print!("{a} ");
        (a, b) = (b, a + b);
    }
    println!();
}

pub fn fib2(n: u32) -> Vec<u32> {
    let mut resultado = Vec::new();
    let (mut a, mut b) = (0, 1);
    while a < n {
        resultado.push(a);
        (a, b) = (b, a + b);
    }
    resultado
}
`

const FIBO_KT = r`// Objeto con funciones de Fibonacci
object Fibo {
    fun fib(n: Int) {
        var a = 0
        var b = 1
        while (a < n) {
            print("$a ")
            val siguiente = a + b
            a = b
            b = siguiente
        }
        println()
    }

    fun fib2(n: Int): List<Int> {
        val resultado = mutableListOf<Int>()
        var a = 0
        var b = 1
        while (a < n) {
            resultado.add(a)
            val siguiente = a + b
            a = b
            b = siguiente
        }
        return resultado
    }
}
`

const FIBO_FILES = {
  javascript: { 'fibo.js': FIBO_JS },
  go: { 'fibo/fibo.go': FIBO_GO },
  csharp: { 'Fibo.cs': FIBO_CS },
  ruby: { 'fibo.rb': FIBO_RB },
  rust: { 'src/fibo.rs': FIBO_RS },
  kotlin: { 'Fibo.kt': FIBO_KT },
}

export default {
  'Crear y usar un módulo': {
    jsFixed: true,
    files: FIBO_FILES,
    javascript: r`import * as fibo from './fibo.js'

fibo.fib(1000)
console.log(fibo.fib2(100).join(', '))

const fib = fibo.fib  // una función del módulo se puede guardar en una variable
fib(500)`,
    go: r`import "ejemplo/fibo" // ejemplo es el nombre del módulo en go.mod

fibo.Fib(1000)
fmt.Println(fibo.Fib2(100))

fib := fibo.Fib // una función del paquete se puede guardar en una variable
fib(500)`,
    csharp: r`// Las clases del mismo proyecto se ven entre sí sin importar nada
Fibo.Fib(1000);
Console.WriteLine(string.Join(", ", Fibo.Fib2(100)));
Console.WriteLine(typeof(Fibo).Name);

Action<int> fib = Fibo.Fib;  // un método se puede guardar en una variable
fib(500);`,
    ruby: r`require_relative 'fibo'

Fibo.fib(1000)
p Fibo.fib2(100)
puts Fibo.name

fib = Fibo.method(:fib)  # un método se puede guardar en una variable
fib.call(500)`,
    rust: r`mod fibo;  // carga el archivo src/fibo.rs

fibo::fib(1000);
println!("{:?}", fibo::fib2(100));

let fib = fibo::fib;  // una función del módulo se puede guardar en una variable
fib(500);`,
    kotlin: r`// Los archivos del mismo paquete se ven entre sí sin importar nada
Fibo.fib(1000)
println(Fibo.fib2(100))
println(Fibo::class.simpleName)

val fib = Fibo::fib  // una función se puede guardar en una variable
fib(500)`,
    output: {
      javascript: `${FIB_1000}\n${SERIE}\n${FIB_500}`,
      go: `${FIB_1000}\n[0 1 1 2 3 5 8 13 21 34 55 89]\n${FIB_500}`,
      csharp: `${FIB_1000}\n${SERIE}\nFibo\n${FIB_500}`,
      ruby: `${FIB_1000}\n[${SERIE}]\nFibo\n${FIB_500}`,
      rust: `${FIB_1000}\n[${SERIE}]\n${FIB_500}`,
      kotlin: `${FIB_1000}\n[${SERIE}]\nFibo\n${FIB_500}`,
    },
  },
  'Más sobre módulos: formas de importar': {
    jsFixed: true,
    files: {
      javascript: {
        'saludos.js': r`console.log('Cargando el módulo saludos...')  // solo la primera vez

export function hola(nombre) {
  return 'Hola, ' + nombre
}

export function adios(nombre) {
  return 'Adiós, ' + nombre
}
`,
      },
      go: {
        'saludos/saludos.go': r`package saludos

import "fmt"

// init se ejecuta una sola vez, al cargar el paquete
func init() {
    fmt.Println("Cargando el paquete saludos...")
}

func Hola(nombre string) string {
    return "Hola, " + nombre
}

func Adios(nombre string) string {
    return "Adiós, " + nombre
}
`,
      },
      csharp: {
        'Saludos/Textos.cs': r`namespace Saludos;

public static class Textos {
    // El constructor estático se ejecuta una sola vez, al usar la clase
    static Textos() {
        Console.WriteLine("Cargando la clase Textos...");
    }

    public static string Hola(string nombre) => "Hola, " + nombre;

    public static string Adios(string nombre) => "Adiós, " + nombre;
}
`,
      },
      ruby: {
        'saludos.rb': r`puts 'Cargando el archivo saludos...'  # solo la primera vez

module Saludos
  def self.hola(nombre)
    "Hola, #{nombre}"
  end

  def self.adios(nombre)
    "Adiós, #{nombre}"
  end
end
`,
      },
      rust: {
        'src/saludos.rs': r`pub fn hola(nombre: &str) -> String {
    format!("Hola, {nombre}")
}

pub fn adios(nombre: &str) -> String {
    format!("Adiós, {nombre}")
}
`,
      },
      kotlin: {
        'saludos/Saludos.kt': r`package saludos

fun hola(nombre: String) = "Hola, $nombre"

fun adios(nombre: String) = "Adiós, $nombre"
`,
      },
    },
    javascript: r`import * as saludos from './saludos.js'
import { adios } from './saludos.js'            // la segunda vez no se vuelve a cargar
import { hola as saludar } from './saludos.js'  // con otro nombre

console.log(saludos.hola('Ana'))
console.log(adios('Ana'))
console.log(saludar('Carla'))`,
    go: r`import (
    "ejemplo/saludos"
    s "ejemplo/saludos" // el mismo paquete, con otro nombre
)

fmt.Println(saludos.Hola("Ana"))
fmt.Println(saludos.Adios("Ana"))
fmt.Println(s.Hola("Luis"))
// Go no permite importar una sola función: siempre se usa paquete.Función`,
    csharp: r`using Saludos;                // todo el espacio de nombres
using static Saludos.Textos;  // los métodos de la clase, sin escribir su nombre
using S = Saludos.Textos;     // con otro nombre

Console.WriteLine(Textos.Hola("Ana"));
Console.WriteLine(Adios("Ana"));
Console.WriteLine(S.Hola("Luis"));`,
    ruby: r`require_relative 'saludos'
require_relative 'saludos'  # la segunda vez no se vuelve a cargar

puts Saludos.hola('Ana')
puts Saludos.adios('Ana')

S = Saludos  # con otro nombre
puts S.hola('Luis')`,
    rust: r`mod saludos;

use saludos::adios;            // una función concreta
use saludos as s;              // el módulo, con otro nombre
use saludos::hola as saludar;  // una función, con otro nombre

println!("{}", saludos::hola("Ana"));
println!("{}", adios("Ana"));
println!("{}", s::hola("Luis"));
println!("{}", saludar("Carla"));`,
    kotlin: r`import saludos.hola
import saludos.adios
import saludos.hola as saludar  // con otro nombre

println(hola("Ana"))
println(adios("Ana"))
println(saludar("Carla"))`,
    output: {
      javascript: 'Cargando el módulo saludos...\nHola, Ana\nAdiós, Ana\nHola, Carla',
      go: 'Cargando el paquete saludos...\nHola, Ana\nAdiós, Ana\nHola, Luis',
      csharp: 'Cargando la clase Textos...\nHola, Ana\nAdiós, Ana\nHola, Luis',
      ruby: 'Cargando el archivo saludos...\nHola, Ana\nAdiós, Ana\nHola, Luis',
      rust: 'Hola, Ana\nAdiós, Ana\nHola, Luis\nHola, Carla',
      kotlin: 'Hola, Ana\nAdiós, Ana\nHola, Carla',
    },
  },
  'Ejecutar módulos como programas': {
    jsFixed: true,
    files: {
      javascript: {
        'fibo.js': r`export function fib(n) {
  let a = 0
  let b = 1
  let linea = ''
  while (a < n) {
    linea += a + ' '
    const siguiente = a + b
    a = b
    b = siguiente
  }
  console.log(linea)
}

// Solo es verdadero si se ejecuta con: node fibo.js 50
if (import.meta.main) {
  fib(Number(process.argv[2]))
}
`,
      },
      go: {
        'fibo/fibo.go': r`package fibo

import "fmt"

func Fib(n int) {
    a, b := 0, 1
    for a < n {
        fmt.Print(a, " ")
        a, b = b, a+b
    }
    fmt.Println()
}
`,
        'cmd/fibo/main.go': r`// Un paquete main aparte convierte la biblioteca en un programa
package main

import (
    "os"
    "strconv"

    "ejemplo/fibo"
)

func main() {
    n, _ := strconv.Atoi(os.Args[1])
    fibo.Fib(n)
}
`,
      },
      csharp: {
        'Fibo.cs': r`public static class Fibo {
    public static void Fib(int n) {
        int a = 0, b = 1;
        while (a < n) {
            Console.Write(a + " ");
            (a, b) = (b, a + b);
        }
        Console.WriteLine();
    }
}
`,
      },
      ruby: {
        'fibo.rb': r`module Fibo
  def self.fib(n)
    a, b = 0, 1
    while a < n
      print a, ' '
      a, b = b, a + b
    end
    puts
  end
end

# Solo es verdadero si se ejecuta con: ruby fibo.rb 50
if __FILE__ == $0
  Fibo.fib(ARGV[0].to_i)
end
`,
      },
      rust: {
        'src/fibo.rs': r`pub fn fib(n: u32) {
    let (mut a, mut b) = (0, 1);
    while a < n {
        print!("{a} ");
        (a, b) = (b, a + b);
    }
    println!();
}
`,
      },
      kotlin: {
        'Fibo.kt': r`object Fibo {
    fun fib(n: Int) {
        var a = 0
        var b = 1
        while (a < n) {
            print("$a ")
            val siguiente = a + b
            a = b
            b = siguiente
        }
        println()
    }
}

// Solo se ejecuta si este archivo es el punto de entrada del programa
fun main(args: Array<String>) {
    Fibo.fib(args[0].toInt())
}
`,
      },
    },
    javascript: r`import { fib } from './fibo.js'  // al importarlo, el bloque final de fibo.js NO se ejecuta

fib(50)

// En la terminal, fibo.js también funciona solo:
// $ node fibo.js 50
// 0 1 1 2 3 5 8 13 21 34`,
    go: r`import "ejemplo/fibo"

fibo.Fib(50)

// El programa de cmd/fibo se ejecuta aparte:
// $ go run ./cmd/fibo 50
// 0 1 1 2 3 5 8 13 21 34`,
    csharp: r`// En C# el punto de entrada es uno por proyecto (Program.cs):
// para ejecutar Fibo por separado se crea otro proyecto que lo use
Fibo.Fib(50);`,
    ruby: r`require_relative 'fibo'  # al cargarlo, el bloque final de fibo.rb NO se ejecuta

Fibo.fib(50)

# En la terminal, fibo.rb también funciona solo:
# $ ruby fibo.rb 50
# 0 1 1 2 3 5 8 13 21 34`,
    rust: r`mod fibo;

fibo::fib(50);

// Cada archivo dentro de src/bin es un programa aparte con su propio main:
// $ cargo run --bin fibo 50`,
    kotlin: r`// Cualquier archivo con una función main se puede usar como punto de entrada
Fibo.fib(50)`,
    output: { javascript: FIB_50 },
  },
  'Dónde se buscan los módulos': {
    jsFixed: true,
    javascript: r`import { builtinModules } from 'node:module'

// Una ruta que empieza por ./ se busca junto al archivo;
// un nombre suelto se busca en las carpetas node_modules, subiendo hasta la raíz
console.log(process.cwd())
console.log(builtinModules.includes('fs'))  // fs viene dentro de Node.js`,
    go: r`// Go busca los paquetes en tres sitios: la biblioteca estándar (GOROOT),
// tu propio módulo (la carpeta con go.mod) y la caché de módulos descargados
fmt.Println(runtime.GOROOT())`,
    csharp: r`// .NET busca las bibliotecas (.dll) junto al programa compilado;
// los paquetes NuGet se copian ahí al compilar
Console.WriteLine(AppContext.BaseDirectory);`,
    ruby: r`# $LOAD_PATH es la lista de carpetas donde require busca, en orden
puts $LOAD_PATH.first
puts $LOAD_PATH.size > 1`,
    rust: r`// Los módulos propios se buscan dentro de src; las dependencias de Cargo.toml,
// en la caché de Cargo (~/.cargo/registry)
println!("{}", env!("CARGO_MANIFEST_DIR"));`,
    kotlin: r`// Como en Java, las clases se buscan en el classpath
println(System.getProperty("java.class.path"))`,
    output: {
      javascript: '/home/usuario/proyecto\ntrue',
      go: '/usr/local/go',
      csharp: '/home/usuario/proyecto/bin/Debug/net10.0/',
      ruby: '/usr/local/lib/ruby/site_ruby/3.4.0\ntrue',
      rust: '/home/usuario/proyecto',
    },
  },
  'Archivos «compilados»': {
    javascript: 'Node.js no guarda archivos compilados: el motor V8 compila el código en memoria cada vez que arranca. Lo que sí es habitual es un paso de construcción que convierte TypeScript en JavaScript dentro de una carpeta dist.',
    go: 'go build genera un único ejecutable con todo incluido. Los resultados intermedios se guardan en una caché (go env GOCACHE), así que la segunda compilación solo rehace lo que cambió.',
    csharp: 'dotnet build genera archivos .dll con código intermedio (IL) en la carpeta bin, y guarda los temporales en obj. El JIT de .NET los convierte en código nativo al ejecutarse.',
    ruby: 'Ruby compila cada archivo a bytecode en memoria al cargarlo y no deja archivos en el disco. Herramientas como Bootsnap (que usa Rails) guardan ese bytecode en caché para arrancar más rápido.',
    rust: 'cargo build deja el ejecutable y los resultados intermedios en la carpeta target. Solo recompila lo que cambió; con --release tarda más, pero el programa resultante es mucho más rápido.',
    kotlin: 'El compilador genera archivos .class con bytecode, los mismos que Java, y Gradle los guarda en la carpeta build. La JVM los convierte en código nativo mientras el programa corre.',
  },
  'Módulos estándar': {
    javascript: r`// Math viene incluido: no hace falta importarlo
console.log(Math.sqrt(16))
console.log(Math.PI.toFixed(4))

const numeros = [2, 4, 6, 8]
console.log(numeros.reduce((suma, n) => suma + n, 0) / numeros.length)  // no hay función de promedio

const dado = Math.floor(Math.random() * 6) + 1  // Math.random no admite semilla
console.log(dado >= 1 && dado <= 6)`,
    go: r`fmt.Println(math.Sqrt(16))
fmt.Printf("%.4f\n", math.Pi)

numeros := []float64{2, 4, 6, 8}
suma := 0.0
for _, n := range numeros {
    suma += n
}
fmt.Println(suma / float64(len(numeros))) // no hay función de promedio

dado := rand.IntN(6) + 1 // paquete math/rand/v2
fmt.Println(dado >= 1 && dado <= 6)`,
    csharp: r`Console.WriteLine(Math.Sqrt(16));
Console.WriteLine(Math.Round(Math.PI, 4));
Console.WriteLine(new[] { 2, 4, 6, 8 }.Average());

var azar = new Random(1);       // semilla fija: siempre sale la misma secuencia
int dado = azar.Next(1, 7);     // de 1 a 6
Console.WriteLine(dado >= 1 && dado <= 6);
Console.WriteLine(Environment.Version.Major >= 8);`,
    ruby: r`puts Math.sqrt(16)
puts Math::PI.round(4)
puts [2, 4, 6, 8].sum / 4.0

azar = Random.new(1)       # semilla fija: siempre sale la misma secuencia
dado = azar.rand(1..6)
puts dado.between?(1, 6)
puts RUBY_VERSION >= '3.0'`,
    rust: r`println!("{}", 16_f64.sqrt());
println!("{:.4}", std::f64::consts::PI);

let numeros = [2.0, 4.0, 6.0, 8.0];
let promedio = numeros.iter().sum::<f64>() / numeros.len() as f64;
println!("{promedio}");

// La biblioteca estándar no incluye números al azar:
// se añade el paquete rand con cargo add rand`,
    kotlin: r`println(sqrt(16.0))
println(round(PI * 10000) / 10000)
println(listOf(2, 4, 6, 8).average())

val azar = Random(1)           // semilla fija: siempre sale la misma secuencia
val dado = azar.nextInt(1, 7)  // de 1 a 6
println(dado in 1..6)`,
    output: {
      javascript: '4\n3.1416\n5\ntrue',
      go: '4\n3.1416\n5\ntrue',
      csharp: '4\n3.1416\n5\nTrue\nTrue',
      ruby: '4.0\n3.1416\n5.0\ntrue\ntrue',
      rust: '4\n3.1416\n5',
      kotlin: '4.0\n3.1416\n5.0\ntrue',
    },
  },
  'La función dir()': {
    jsFixed: true,
    files: FIBO_FILES,
    javascript: r`import * as fibo from './fibo.js'

// Object.keys lista lo que exporta un módulo
console.log(Object.keys(fibo))`,
    go: r`import (
    "reflect"

    "ejemplo/fibo"
)

// Go no puede listar un paquete al ejecutar: eso se consulta con  go doc ejemplo/fibo
// Con reflect sí se puede ver el tipo de cada función
fmt.Println(reflect.TypeOf(fibo.Fib))
fmt.Println(reflect.TypeOf(fibo.Fib2))`,
    csharp: r`using System.Reflection;

// Con reflexión se pueden listar los métodos de una clase
var metodos = typeof(Fibo)
    .GetMethods(BindingFlags.Public | BindingFlags.Static)
    .Select(metodo => metodo.Name)
    .Order();
Console.WriteLine(string.Join(", ", metodos));`,
    ruby: r`require_relative 'fibo'

# singleton_methods lista los métodos definidos con self.
p Fibo.singleton_methods.sort
p Fibo.respond_to?(:fib)`,
    rust: r`mod fibo;

// Rust no tiene reflexión: los nombres de un módulo no existen al ejecutar.
// Se consultan en la documentación que genera  cargo doc --open
println!("{}", std::any::type_name_of_val(&fibo::fib));`,
    kotlin: r`// Con reflexión se pueden listar los métodos de un objeto
println(Fibo::class.java.declaredMethods.map { it.name }.sorted())`,
    output: {
      javascript: "[ 'fib', 'fib2' ]",
      go: 'func(int)\nfunc(int) []int',
      csharp: 'Fib, Fib2',
      ruby: '[:fib, :fib2]\ntrue',
      rust: 'ejemplo::fibo::fib',
    },
  },
  'Paquetes': {
    jsFixed: true,
    files: {
      javascript: {
        'sonido/efectos/eco.js': r`export function filtroEco(entrada, { retardo = 0.7, atenuacion = 4 } = {}) {
  return ${b}${d}{entrada} con eco (retardo=${d}{retardo}, atenuación=${d}{atenuacion})${b}
}
`,
      },
      go: {
        'sonido/efectos/eco.go': r`// El paquete se llama como su carpeta
package efectos

import "fmt"

func FiltroEco(entrada string, retardo float64, atenuacion int) string {
    return fmt.Sprintf("%s con eco (retardo=%v, atenuación=%d)", entrada, retardo, atenuacion)
}
`,
      },
      csharp: {
        'Sonido/Efectos/Eco.cs': r`namespace Sonido.Efectos;

public static class Eco {
    public static string FiltroEco(string entrada, double retardo = 0.7, int atenuacion = 4) {
        return $"{entrada} con eco (retardo={retardo}, atenuación={atenuacion})";
    }
}
`,
      },
      ruby: {
        'sonido/efectos/eco.rb': r`module Sonido
  module Efectos
    module Eco
      def self.filtro_eco(entrada, retardo: 0.7, atenuacion: 4)
        "#{entrada} con eco (retardo=#{retardo}, atenuación=#{atenuacion})"
      end
    end
  end
end
`,
      },
      rust: {
        'src/sonido/mod.rs': 'pub mod efectos;\n',
        'src/sonido/efectos/mod.rs': 'pub mod eco;\n',
        'src/sonido/efectos/eco.rs': r`pub fn filtro_eco(entrada: &str, retardo: f64, atenuacion: u32) -> String {
    format!("{entrada} con eco (retardo={retardo}, atenuación={atenuacion})")
}
`,
      },
      kotlin: {
        'sonido/efectos/Eco.kt': r`package sonido.efectos

fun filtroEco(entrada: String, retardo: Double = 0.7, atenuacion: Int = 4): String {
    return "$entrada con eco (retardo=$retardo, atenuación=$atenuacion)"
}
`,
      },
    },
    javascript: r`import * as eco from './sonido/efectos/eco.js'
import { filtroEco } from './sonido/efectos/eco.js'

console.log(eco.filtroEco('voz.wav'))
console.log(filtroEco('voz.wav', { retardo: 0.5 }))`,
    go: r`import "ejemplo/sonido/efectos" // la ruta de carpetas dentro del módulo

fmt.Println(efectos.FiltroEco("voz.wav", 0.7, 4))
fmt.Println(efectos.FiltroEco("voz.wav", 0.5, 4))`,
    csharp: r`using Sonido.Efectos;

Console.WriteLine(Sonido.Efectos.Eco.FiltroEco("voz.wav"));  // con el nombre completo
Console.WriteLine(Eco.FiltroEco("voz.wav", retardo: 0.5));   // gracias al using`,
    ruby: r`require_relative 'sonido/efectos/eco'

puts Sonido::Efectos::Eco.filtro_eco('voz.wav')  # con el nombre completo

include Sonido::Efectos  # trae los nombres del módulo
puts Eco.filtro_eco('voz.wav', retardo: 0.5)`,
    rust: r`mod sonido;

use sonido::efectos::eco;

println!("{}", sonido::efectos::eco::filtro_eco("voz.wav", 0.7, 4));  // con la ruta completa
println!("{}", eco::filtro_eco("voz.wav", 0.5, 4));                   // gracias al use`,
    kotlin: r`import sonido.efectos.filtroEco

println(sonido.efectos.filtroEco("voz.wav"))    // con el nombre completo
println(filtroEco("voz.wav", retardo = 0.5))    // gracias al import`,
  },
  'Importar * desde un paquete': {
    jsFixed: true,
    files: {
      javascript: {
        'sonido/efectos/eco.js': "export const nombre = 'eco'\n",
        'sonido/efectos/envolvente.js': "export const nombre = 'envolvente'\n",
        'sonido/efectos/index.js': r`// El archivo index decide qué se ofrece hacia fuera
export * as eco from './eco.js'
export * as envolvente from './envolvente.js'
`,
      },
      go: {
        'sonido/efectos/eco.go': 'package efectos\n\nconst NombreEco = "eco"\n',
        'sonido/efectos/envolvente.go': 'package efectos\n\nconst NombreEnvolvente = "envolvente"\n',
      },
      csharp: {
        'Sonido/Efectos/Eco.cs': 'namespace Sonido.Efectos;\n\npublic static class Eco {\n    public const string Nombre = "eco";\n}\n',
        'Sonido/Efectos/Envolvente.cs': 'namespace Sonido.Efectos;\n\npublic static class Envolvente {\n    public const string Nombre = "envolvente";\n}\n',
      },
      ruby: {
        'sonido/efectos/eco.rb': "module Sonido\n  module Efectos\n    module Eco\n      NOMBRE = 'eco'\n    end\n  end\nend\n",
        'sonido/efectos/envolvente.rb': "module Sonido\n  module Efectos\n    module Envolvente\n      NOMBRE = 'envolvente'\n    end\n  end\nend\n",
      },
      rust: {
        'src/sonido/mod.rs': 'pub mod efectos;\n',
        'src/sonido/efectos/mod.rs': '// Solo lo marcado con pub se puede usar desde fuera\npub mod eco;\npub mod envolvente;\n',
        'src/sonido/efectos/eco.rs': 'pub const NOMBRE: &str = "eco";\n',
        'src/sonido/efectos/envolvente.rs': 'pub const NOMBRE: &str = "envolvente";\n',
      },
      kotlin: {
        'sonido/efectos/Eco.kt': 'package sonido.efectos\n\nobject Eco {\n    const val NOMBRE = "eco"\n}\n',
        'sonido/efectos/Envolvente.kt': 'package sonido.efectos\n\nobject Envolvente {\n    const val NOMBRE = "envolvente"\n}\n',
      },
    },
    javascript: r`import * as efectos from './sonido/efectos/index.js'

console.log(efectos.eco.nombre)
console.log(efectos.envolvente.nombre)`,
    go: r`import "ejemplo/sonido/efectos"

// Todos los archivos de una carpeta forman un solo paquete:
// se importa completo, nunca archivo por archivo
fmt.Println(efectos.NombreEco)
fmt.Println(efectos.NombreEnvolvente)`,
    csharp: r`using Sonido.Efectos;   // todas las clases públicas del espacio de nombres

Console.WriteLine(Eco.Nombre);
Console.WriteLine(Envolvente.Nombre);`,
    ruby: r`# Ruby no tiene import *: se cargan todos los archivos de la carpeta
Dir[File.join(__dir__, 'sonido/efectos/*.rb')].sort.each { |archivo| require archivo }

puts Sonido::Efectos::Eco::NOMBRE
puts Sonido::Efectos::Envolvente::NOMBRE`,
    rust: r`mod sonido;

use sonido::efectos::*;   // todo lo público del módulo

println!("{}", eco::NOMBRE);
println!("{}", envolvente::NOMBRE);`,
    kotlin: r`import sonido.efectos.*   // todo lo público del paquete

println(Eco.NOMBRE)
println(Envolvente.NOMBRE)`,
  },
  'Referencias dentro de un paquete': {
    jsFixed: true,
    files: {
      javascript: {
        'sonido/efectos/eco.js': "export function aplicar(senal) {\n  return senal + ' + eco'\n}\n",
        'sonido/filtros/ecualizador.js': "export function aplicar(senal) {\n  return senal + ' + ecualizador'\n}\n",
        'sonido/efectos/envolvente.js': r`import { aplicar as eco } from './eco.js'                         // . es la misma carpeta
import { aplicar as ecualizar } from '../filtros/ecualizador.js'  // .. sube una carpeta

export function aplicar(senal) {
  return ecualizar(eco(senal)) + ' + envolvente'
}
`,
      },
      go: {
        'sonido/efectos/eco.go': 'package efectos\n\nfunc Eco(senal string) string {\n    return senal + " + eco"\n}\n',
        'sonido/filtros/ecualizador.go': 'package filtros\n\nfunc Ecualizar(senal string) string {\n    return senal + " + ecualizador"\n}\n',
        'sonido/efectos/envolvente.go': r`package efectos

import "ejemplo/sonido/filtros" // otro paquete: siempre con la ruta completa

func Envolvente(senal string) string {
    // Eco está en el mismo paquete: no necesita import
    return filtros.Ecualizar(Eco(senal)) + " + envolvente"
}
`,
      },
      csharp: {
        'Sonido/Efectos/Eco.cs': 'namespace Sonido.Efectos;\n\npublic static class Eco {\n    public static string Aplicar(string senal) => senal + " + eco";\n}\n',
        'Sonido/Filtros/Ecualizador.cs': 'namespace Sonido.Filtros;\n\npublic static class Ecualizador {\n    public static string Aplicar(string senal) => senal + " + ecualizador";\n}\n',
        'Sonido/Efectos/Envolvente.cs': r`using Sonido.Filtros;   // otro espacio de nombres: hay que importarlo

namespace Sonido.Efectos;

public static class Envolvente {
    public static string Aplicar(string senal) {
        // Eco está en el mismo espacio de nombres: no necesita using
        return Ecualizador.Aplicar(Eco.Aplicar(senal)) + " + envolvente";
    }
}
`,
      },
      ruby: {
        'sonido/efectos/eco.rb': "module Sonido\n  module Efectos\n    module Eco\n      def self.aplicar(senal)\n        senal + ' + eco'\n      end\n    end\n  end\nend\n",
        'sonido/filtros/ecualizador.rb': "module Sonido\n  module Filtros\n    module Ecualizador\n      def self.aplicar(senal)\n        senal + ' + ecualizador'\n      end\n    end\n  end\nend\n",
        'sonido/efectos/envolvente.rb': r`require_relative 'eco'                     # misma carpeta
require_relative '../filtros/ecualizador'  # .. sube una carpeta

module Sonido
  module Efectos
    module Envolvente
      def self.aplicar(senal)
        Filtros::Ecualizador.aplicar(Eco.aplicar(senal)) + ' + envolvente'
      end
    end
  end
end
`,
      },
      rust: {
        'src/sonido/mod.rs': 'pub mod efectos;\npub mod filtros;\n',
        'src/sonido/efectos/mod.rs': 'pub mod eco;\npub mod envolvente;\n',
        'src/sonido/filtros/mod.rs': 'pub mod ecualizador;\n',
        'src/sonido/efectos/eco.rs': 'pub fn aplicar(senal: &str) -> String {\n    format!("{senal} + eco")\n}\n',
        'src/sonido/filtros/ecualizador.rs': 'pub fn aplicar(senal: &str) -> String {\n    format!("{senal} + ecualizador")\n}\n',
        'src/sonido/efectos/envolvente.rs': r`use super::eco;                          // super es el módulo que contiene a este
use crate::sonido::filtros::ecualizador;  // crate es la raíz del proyecto

pub fn aplicar(senal: &str) -> String {
    format!("{} + envolvente", ecualizador::aplicar(&eco::aplicar(senal)))
}
`,
      },
      kotlin: {
        'sonido/efectos/Eco.kt': 'package sonido.efectos\n\nfun eco(senal: String) = "$senal + eco"\n',
        'sonido/filtros/Ecualizador.kt': 'package sonido.filtros\n\nfun ecualizar(senal: String) = "$senal + ecualizador"\n',
        'sonido/efectos/Envolvente.kt': r`package sonido.efectos

import sonido.filtros.ecualizar   // otro paquete: hay que importarlo

// eco está en el mismo paquete: no necesita import
fun envolvente(senal: String) = ecualizar(eco(senal)) + " + envolvente"
`,
      },
    },
    javascript: r`import { aplicar } from './sonido/efectos/envolvente.js'

console.log(aplicar('voz'))`,
    go: r`import "ejemplo/sonido/efectos"

fmt.Println(efectos.Envolvente("voz"))`,
    csharp: r`using Sonido.Efectos;

Console.WriteLine(Envolvente.Aplicar("voz"));`,
    ruby: r`require_relative 'sonido/efectos/envolvente'

puts Sonido::Efectos::Envolvente.aplicar('voz')`,
    rust: r`mod sonido;

use sonido::efectos::envolvente;

println!("{}", envolvente::aplicar("voz"));`,
    kotlin: r`import sonido.efectos.envolvente

println(envolvente("voz"))`,
  },
  'Paquetes repartidos en varias carpetas': {
    javascript: 'El campo exports de package.json decide qué archivos ofrece un paquete y con qué ruta. En proyectos grandes, los workspaces de npm permiten tener varios paquetes en un mismo repositorio.',
    go: 'Un paquete es exactamente una carpeta: no puede repartirse en varias. Lo que sí puede crecer es el módulo, que agrupa muchos paquetes bajo un mismo go.mod.',
    csharp: 'Un espacio de nombres sí puede repartirse entre varias carpetas e incluso entre varios proyectos: es solo un nombre, no depende de dónde esté el archivo.',
    ruby: 'Un módulo se puede reabrir desde cualquier archivo: basta con volver a escribir module Sonido y añadir más contenido. Varias gemas pueden ampliar así el mismo módulo.',
    rust: 'Un módulo vive en un archivo o en una carpeta con su mod.rs. Para repartir un proyecto en varias carpetas se usa un workspace de Cargo, que reúne varios crates.',
    kotlin: 'Un paquete es solo un nombre: sus archivos pueden estar en varias carpetas o en varios módulos de Gradle, y todos se ven entre sí al compilar juntos.',
  },
  'Para leer más': {
    javascript: 'Módulos de JavaScript en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules\nMódulos ECMAScript en Node.js: https://nodejs.org/api/esm.html',
    go: 'Cómo escribir código Go (módulos y paquetes): https://go.dev/doc/code\nCrear un módulo: https://go.dev/doc/tutorial/create-module',
    csharp: 'Espacios de nombres: https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/types/namespaces\nDirectiva using: https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/keywords/using-directive',
    ruby: 'Módulos y clases: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html\nrequire y require_relative: https://docs.ruby-lang.org/en/master/Kernel.html',
    rust: 'Paquetes, crates y módulos en el libro de Rust: https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html',
    kotlin: 'Paquetes e importaciones: https://kotlinlang.org/docs/packages.html',
  },
}
