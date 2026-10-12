// Nivel 9 · Clases
const r = String.raw
const b = '`'
const d = '$'

const AMBITOS = 'Después de la asignación local: spam de prueba\nDespués de cambiar la exterior: spam cambiado\nEn el ámbito global: spam global'
const LETRAS = 'a\nb\nc\nm\na\np\ns'

export default {
  'Nombres y objetos': {
    javascript: r`const a = [1, 2, 3]
const b = a          // b es otro nombre para el MISMO arreglo
b.push(4)
console.log(a)
console.log(a === b)

const c = [...a]     // una copia es otro arreglo
c.push(5)
console.log(a)
console.log(c)

function agregarCero(lista) {
  lista.push(0)      // la función modifica el arreglo original
}

agregarCero(a)
console.log(a)`,
    go: r`a := []int{1, 2, 3}
b := a // b apunta a los MISMOS datos
b[0] = 99
fmt.Println(a)

c := slices.Clone(a) // una copia tiene sus propios datos
c[0] = 1
fmt.Println(a)
fmt.Println(c)

func ponerCero(lista []int) {
    lista[0] = 0 // la función modifica los datos originales
}

ponerCero(a)
fmt.Println(a)`,
    csharp: r`var a = new List<int> { 1, 2, 3 };
var b = a;                  // b es otro nombre para la MISMA lista
b.Add(4);
Console.WriteLine(string.Join(", ", a));
Console.WriteLine(ReferenceEquals(a, b));

var c = new List<int>(a);   // una copia es otra lista
c.Add(5);
Console.WriteLine(string.Join(", ", a));
Console.WriteLine(string.Join(", ", c));

void AgregarCero(List<int> lista) {
    lista.Add(0);           // el método modifica la lista original
}

AgregarCero(a);
Console.WriteLine(string.Join(", ", a));`,
    ruby: r`a = [1, 2, 3]
b = a            # b es otro nombre para el MISMO arreglo
b << 4
p a
puts a.equal?(b)

c = a.dup        # una copia es otro arreglo
c << 5
p a
p c

def agregar_cero(lista)
  lista << 0     # el método modifica el arreglo original
end

agregar_cero(a)
p a`,
    rust: r`let mut a = vec![1, 2, 3];
// «let b = a» movería el vector a b, y a dejaría de existir.
// Para compartirlo se presta con una referencia:
let b = &mut a;
b.push(4);
println!("{:?}", a);

let mut c = a.clone();   // una copia es otro vector
c.push(5);
println!("{:?}", a);
println!("{:?}", c);

fn agregar_cero(lista: &mut Vec<i32>) {
    lista.push(0);       // &mut permite modificar el vector original
}

agregar_cero(&mut a);
println!("{:?}", a);`,
    kotlin: r`val a = mutableListOf(1, 2, 3)
val b = a                    // b es otro nombre para la MISMA lista
b.add(4)
println(a)
println(a === b)

val c = a.toMutableList()    // una copia es otra lista
c.add(5)
println(a)
println(c)

fun agregarCero(lista: MutableList<Int>) {
    lista.add(0)             // la función modifica la lista original
}

agregarCero(a)
println(a)`,
    output: {
      javascript: '[1,2,3,4]\ntrue\n[1,2,3,4]\n[1,2,3,4,5]\n[1,2,3,4,0]',
      go: '[99 2 3]\n[99 2 3]\n[1 2 3]\n[0 2 3]',
      csharp: '1, 2, 3, 4\nTrue\n1, 2, 3, 4\n1, 2, 3, 4, 5\n1, 2, 3, 4, 0',
      ruby: '[1, 2, 3, 4]\ntrue\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]\n[1, 2, 3, 4, 0]',
      rust: '[1, 2, 3, 4]\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]\n[1, 2, 3, 4, 0]',
      kotlin: '[1, 2, 3, 4]\ntrue\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]\n[1, 2, 3, 4, 0]',
    },
  },
  'Ámbitos y espacios de nombres': {
    javascript: 'Las variables declaradas con let y const viven solo dentro del bloque { } donde se crean. Una función ve las variables de las funciones que la contienen y las del módulo, y puede modificarlas directamente: no hace falta ninguna palabra como global o nonlocal.',
    go: 'Cada par de llaves abre un ámbito. Dentro de una función, := crea una variable nueva (aunque fuera exista otra con el mismo nombre) y = modifica la que ya existe. Fuera de las funciones, lo que se declara pertenece a todo el paquete.',
    csharp: 'Una variable local vive dentro del bloque { } donde se declara. No hay variables globales: lo compartido se guarda en campos de una clase, que pueden ser static si pertenecen a la clase y no a cada objeto.',
    ruby: 'Un método (def) no ve las variables locales de fuera: su ámbito empieza de cero. Los bloques sí las ven y pueden cambiarlas. El primer carácter indica el alcance: @variable es del objeto, @@variable de la clase y $variable es global.',
    rust: 'Una variable vive hasta la llave que cierra su bloque, y ahí se libera su memoria. Se puede volver a declarar con el mismo nombre (shadowing) y la nueva tapa a la anterior. No hay variables globales modificables sin usar unsafe.',
    kotlin: 'Una variable local vive dentro del bloque { } donde se declara. Las funciones anidadas y las lambdas ven las variables de la función que las contiene y pueden modificarlas. Lo declarado fuera de toda función pertenece al archivo y a su paquete.',
  },
  'Ejemplo de ámbitos: global y nonlocal': {
    javascript: r`let spam = 'spam global'

function pruebaAmbitos() {
  let spam = 'spam de prueba'

  function hacerLocal() {
    let spam = 'spam local'    // let crea OTRA variable, solo de esta función
  }

  function cambiarExterior() {
    spam = 'spam cambiado'     // sin let, modifica la variable de fuera
  }

  hacerLocal()
  console.log('Después de la asignación local:', spam)
  cambiarExterior()
  console.log('Después de cambiar la exterior:', spam)
}

pruebaAmbitos()
console.log('En el ámbito global:', spam)`,
    go: r`var spam = "spam global" // variable del paquete

func pruebaAmbitos() {
    spam := "spam de prueba"

    hacerLocal := func() {
        spam := "spam local" // := crea OTRA variable, solo de esta función
        _ = spam
    }

    cambiarExterior := func() {
        spam = "spam cambiado" // = modifica la variable de fuera
    }

    hacerLocal()
    fmt.Println("Después de la asignación local:", spam)
    cambiarExterior()
    fmt.Println("Después de cambiar la exterior:", spam)
}

pruebaAmbitos()
fmt.Println("En el ámbito global:", spam)`,
    csharp: r`string spam = "spam de prueba";

static void HacerLocal() {
    string spam = "spam local";   // una función static no ve las variables de fuera: esta es OTRA
}

void CambiarExterior() {
    spam = "spam cambiado";       // una función local normal sí modifica la variable de fuera
}

HacerLocal();
Console.WriteLine("Después de la asignación local: " + spam);
CambiarExterior();
Console.WriteLine("Después de cambiar la exterior: " + spam);`,
    ruby: r`$spam = 'spam global'   # $ marca una variable global
spam = 'spam de prueba'

def hacer_local
  spam = 'spam local'   # un método no ve las variables de fuera: esta es OTRA
end

cambiar_exterior = -> { spam = 'spam cambiado' }   # un bloque sí ve y modifica la de fuera

hacer_local
puts "Después de la asignación local: #{spam}"
cambiar_exterior.call
puts "Después de cambiar la exterior: #{spam}"
puts "En el ámbito global: #{$spam}"`,
    rust: r`let mut spam = "spam de prueba";

{
    let spam = "spam local";   // let crea OTRA variable, que solo vive dentro de este bloque
    let _ = spam;
}
println!("Después de la asignación local: {spam}");

let mut cambiar_exterior = || spam = "spam cambiado";   // un cierre puede modificar la de fuera
cambiar_exterior();
println!("Después de cambiar la exterior: {spam}");`,
    kotlin: r`var spam = "spam global"   // variable del archivo

fun pruebaAmbitos() {
    var spam = "spam de prueba"

    fun hacerLocal() {
        val spam = "spam local"    // val crea OTRA variable, solo de esta función
    }

    fun cambiarExterior() {
        spam = "spam cambiado"     // sin val, modifica la variable de fuera
    }

    hacerLocal()
    println("Después de la asignación local: $spam")
    cambiarExterior()
    println("Después de cambiar la exterior: $spam")
}

pruebaAmbitos()
println("En el ámbito global: $spam")`,
    output: {
      javascript: AMBITOS,
      go: AMBITOS,
      csharp: 'Después de la asignación local: spam de prueba\nDespués de cambiar la exterior: spam cambiado',
      ruby: AMBITOS,
      rust: 'Después de la asignación local: spam de prueba\nDespués de cambiar la exterior: spam cambiado',
      kotlin: AMBITOS,
    },
  },
  'Definir una clase': {
    javascript: r`/** Una clase de ejemplo. */
class MiClase {
  static i = 12345   // static: pertenece a la clase

  f() {
    return 'hola mundo'
  }
}

console.log(MiClase.i)     // atributo de la clase
const x = new MiClase()    // crear un objeto (instancia)
console.log(x.f())`,
    go: r`// Go no tiene clases: se define un tipo y se le añaden métodos
const I = 12345

type MiTipo struct{}

func (m MiTipo) F() string {
    return "hola mundo"
}

fmt.Println(I)
x := MiTipo{} // crear un valor de ese tipo
fmt.Println(x.F())`,
    csharp: r`Console.WriteLine(MiClase.I);   // constante de la clase
var x = new MiClase();          // crear un objeto (instancia)
Console.WriteLine(x.F());

/// <summary>Una clase de ejemplo.</summary>
class MiClase {
    public const int I = 12345;

    public string F() {
        return "hola mundo";
    }
}`,
    ruby: r`# Una clase de ejemplo.
class MiClase
  I = 12345

  def f
    'hola mundo'
  end
end

puts MiClase::I    # constante de la clase
x = MiClase.new    # crear un objeto (instancia)
puts x.f`,
    rust: r`// Rust no tiene clases: se define un struct y se le añaden métodos en un bloque impl
struct MiTipo;

impl MiTipo {
    const I: i32 = 12345;

    fn f(&self) -> &str {
        "hola mundo"
    }
}

println!("{}", MiTipo::I);   // constante del tipo
let x = MiTipo;              // crear un valor de ese tipo
println!("{}", x.f());`,
    kotlin: r`/** Una clase de ejemplo. */
class MiClase {
    fun f(): String {
        return "hola mundo"
    }

    companion object {
        const val I = 12345   // pertenece a la clase, no a cada objeto
    }
}

println(MiClase.I)
val x = MiClase()   // crear un objeto (instancia)
println(x.f())`,
  },
  'Crear objetos con __init__': {
    javascript: r`class Complejo {
  constructor(parteReal, parteImaginaria) {   // se ejecuta al crear el objeto
    this.r = parteReal
    this.i = parteImaginaria
  }
}

const x = new Complejo(3.0, -4.5)
console.log(x.r, x.i)`,
    go: r`type Complejo struct {
    R, I float64
}

// No hay constructores: por convención se escribe una función NuevoAlgo
func NuevoComplejo(parteReal, parteImaginaria float64) Complejo {
    return Complejo{R: parteReal, I: parteImaginaria}
}

x := NuevoComplejo(3.0, -4.5)
fmt.Println(x.R, x.I)`,
    csharp: r`var x = new Complejo(3.0, -4.5);
Console.WriteLine($"{x.R} {x.I}");

class Complejo {
    public double R, I;

    public Complejo(double parteReal, double parteImaginaria) {   // se ejecuta al crear el objeto
        R = parteReal;
        I = parteImaginaria;
    }
}`,
    ruby: r`class Complejo
  attr_reader :r, :i

  def initialize(parte_real, parte_imaginaria)   # se ejecuta al crear el objeto
    @r = parte_real
    @i = parte_imaginaria
  end
end

x = Complejo.new(3.0, -4.5)
puts "#{x.r} #{x.i}"`,
    rust: r`struct Complejo {
    r: f64,
    i: f64,
}

impl Complejo {
    // No hay constructores: por convención se escribe una función new
    fn new(parte_real: f64, parte_imaginaria: f64) -> Complejo {
        Complejo { r: parte_real, i: parte_imaginaria }
    }
}

let x = Complejo::new(3.0, -4.5);
println!("{:?} {:?}", x.r, x.i);`,
    kotlin: r`// El constructor va en la misma línea que el nombre de la clase
class Complejo(parteReal: Double, parteImaginaria: Double) {
    val r = parteReal
    val i = parteImaginaria
}

val x = Complejo(3.0, -4.5)
println("${d}{x.r} ${d}{x.i}")`,
    output: { javascript: '3 -4.5', go: '3 -4.5', csharp: '3 -4.5' },
  },
  'Objetos instancia': {
    javascript: r`const x = {}
x.contador = 1          // las propiedades se crean al asignarlas
while (x.contador < 10) {
  x.contador = x.contador * 2
}
console.log(x.contador)
delete x.contador       // y se pueden borrar
console.log('contador' in x)`,
    go: r`// Los campos de un struct son fijos: no se pueden añadir ni borrar al ejecutar
type MiTipo struct {
    Contador int
}

x := MiTipo{}
x.Contador = 1
for x.Contador < 10 {
    x.Contador = x.Contador * 2
}
fmt.Println(x.Contador)`,
    csharp: r`var x = new MiClase();
x.Contador = 1;
while (x.Contador < 10) {
    x.Contador = x.Contador * 2;
}
Console.WriteLine(x.Contador);

// Los campos de una clase son fijos: no se pueden añadir ni borrar al ejecutar
class MiClase {
    public int Contador;
}`,
    ruby: r`class MiClase
  attr_accessor :contador
end

x = MiClase.new
x.contador = 1          # la variable @contador se crea al asignarla
while x.contador < 10
  x.contador = x.contador * 2
end
puts x.contador
x.remove_instance_variable(:@contador)   # y se puede borrar
puts x.instance_variable_defined?(:@contador)`,
    rust: r`// Los campos de un struct son fijos: no se pueden añadir ni borrar al ejecutar
struct MiTipo {
    contador: i32,
}

let mut x = MiTipo { contador: 1 };
while x.contador < 10 {
    x.contador = x.contador * 2;
}
println!("{}", x.contador);`,
    kotlin: r`// Las propiedades de una clase son fijas: no se pueden añadir ni borrar al ejecutar
class MiClase {
    var contador = 0
}

val x = MiClase()
x.contador = 1
while (x.contador < 10) {
    x.contador = x.contador * 2
}
println(x.contador)`,
    output: { javascript: '16\nfalse', ruby: '16\nfalse' },
  },
  'Objetos método': {
    javascript: r`class MiClase {
  f() {
    return 'hola mundo'
  }
}

const x = new MiClase()
const xf = x.f.bind(x)   // guardar el método; bind conserva a qué objeto pertenece
for (let i = 0; i < 3; i++) {
  console.log(xf())
}`,
    go: r`type MiTipo struct{}

func (m MiTipo) F() string {
    return "hola mundo"
}

x := MiTipo{}
xf := x.F // guardar el método, sin llamarlo
for range 3 {
    fmt.Println(xf())
}`,
    csharp: r`var x = new MiClase();
Func<string> xf = x.F;   // guardar el método, sin llamarlo
for (int i = 0; i < 3; i++) {
    Console.WriteLine(xf());
}

class MiClase {
    public string F() => "hola mundo";
}`,
    ruby: r`class MiClase
  def f
    'hola mundo'
  end
end

x = MiClase.new
xf = x.method(:f)   # guardar el método, sin llamarlo
3.times do
  puts xf.call
end`,
    rust: r`struct MiTipo;

impl MiTipo {
    fn f(&self) -> &str {
        "hola mundo"
    }
}

let x = MiTipo;
let xf = MiTipo::f;   // guardar el método, sin llamarlo
for _ in 0..3 {
    println!("{}", xf(&x));   // x.f() es lo mismo que MiTipo::f(&x)
}`,
    kotlin: r`class MiClase {
    fun f() = "hola mundo"
}

val x = MiClase()
val xf = x::f   // guardar el método, sin llamarlo
repeat(3) {
    println(xf())
}`,
  },
  'Variables de clase y de instancia': {
    javascript: r`class Perro {
  static tipo = 'canino'      // de la clase: compartida por todos

  constructor(nombre) {
    this.nombre = nombre      // de la instancia: propia de cada perro
    this.trucos = []          // cada perro tiene su propio arreglo
  }

  agregarTruco(truco) {
    this.trucos.push(truco)
  }
}

const d = new Perro('Fido')
const e = new Perro('Buddy')
console.log(Perro.tipo)
console.log(d.nombre, e.nombre)

d.agregarTruco('dar la vuelta')
e.agregarTruco('hacerse el muerto')
console.log(d.trucos)
console.log(e.trucos)`,
    go: r`const Tipo = "canino" // del paquete: compartida por todos

type Perro struct {
    Nombre string   // propios de cada perro
    Trucos []string
}

// El receptor es un puntero (*Perro) para poder modificar al perro original
func (p *Perro) AgregarTruco(truco string) {
    p.Trucos = append(p.Trucos, truco)
}

d := Perro{Nombre: "Fido"}
e := Perro{Nombre: "Buddy"}
fmt.Println(Tipo)
fmt.Println(d.Nombre, e.Nombre)

d.AgregarTruco("dar la vuelta")
e.AgregarTruco("hacerse el muerto")
fmt.Println(d.Trucos)
fmt.Println(e.Trucos)`,
    csharp: r`var d = new Perro("Fido");
var e = new Perro("Buddy");
Console.WriteLine(Perro.Tipo);
Console.WriteLine($"{d.Nombre} {e.Nombre}");

d.AgregarTruco("dar la vuelta");
e.AgregarTruco("hacerse el muerto");
Console.WriteLine(string.Join(", ", d.Trucos));
Console.WriteLine(string.Join(", ", e.Trucos));

class Perro {
    public static string Tipo = "canino";   // static: compartida por todos

    public string Nombre;                   // propia de cada perro
    public List<string> Trucos = new();     // cada perro tiene su propia lista

    public Perro(string nombre) {
        Nombre = nombre;
    }

    public void AgregarTruco(string truco) {
        Trucos.Add(truco);
    }
}`,
    ruby: r`class Perro
  TIPO = 'canino'        # constante de la clase: compartida por todos

  attr_reader :nombre, :trucos

  def initialize(nombre)
    @nombre = nombre     # variable de instancia: propia de cada perro
    @trucos = []         # cada perro tiene su propio arreglo
  end

  def agregar_truco(truco)
    @trucos << truco
  end
end

d = Perro.new('Fido')
e = Perro.new('Buddy')
puts Perro::TIPO
puts "#{d.nombre} #{e.nombre}"

d.agregar_truco('dar la vuelta')
e.agregar_truco('hacerse el muerto')
p d.trucos
p e.trucos`,
    rust: r`struct Perro {
    nombre: String,        // propios de cada perro
    trucos: Vec<String>,
}

impl Perro {
    const TIPO: &'static str = "canino";   // del tipo: compartida por todos

    fn new(nombre: &str) -> Perro {
        Perro { nombre: nombre.to_string(), trucos: Vec::new() }
    }

    // &mut self permite modificar al perro
    fn agregar_truco(&mut self, truco: &str) {
        self.trucos.push(truco.to_string());
    }
}

let mut d = Perro::new("Fido");
let mut e = Perro::new("Buddy");
println!("{}", Perro::TIPO);
println!("{} {}", d.nombre, e.nombre);

d.agregar_truco("dar la vuelta");
e.agregar_truco("hacerse el muerto");
println!("{:?}", d.trucos);
println!("{:?}", e.trucos);`,
    kotlin: r`class Perro(val nombre: String) {        // propia de cada perro
    val trucos = mutableListOf<String>()   // cada perro tiene su propia lista

    fun agregarTruco(truco: String) {
        trucos.add(truco)
    }

    companion object {
        const val TIPO = "canino"          // de la clase: compartida por todos
    }
}

val d = Perro("Fido")
val e = Perro("Buddy")
println(Perro.TIPO)
println("${d}{d.nombre} ${d}{e.nombre}")

d.agregarTruco("dar la vuelta")
e.agregarTruco("hacerse el muerto")
println(d.trucos)
println(e.trucos)`,
    output: {
      javascript: 'canino\nFido Buddy\n["dar la vuelta"]\n["hacerse el muerto"]',
      go: 'canino\nFido Buddy\n[dar la vuelta]\n[hacerse el muerto]',
      csharp: 'canino\nFido Buddy\ndar la vuelta\nhacerse el muerto',
      ruby: 'canino\nFido Buddy\n["dar la vuelta"]\n["hacerse el muerto"]',
      rust: 'canino\nFido Buddy\n["dar la vuelta"]\n["hacerse el muerto"]',
      kotlin: 'canino\nFido Buddy\n[dar la vuelta]\n[hacerse el muerto]',
    },
  },
  'Cuidado con las variables de clase mutables': {
    javascript: r`class Perro {
  static trucos = []   // ¡error! un solo arreglo para TODOS los perros

  constructor(nombre) {
    this.nombre = nombre
  }

  agregarTruco(truco) {
    Perro.trucos.push(truco)
  }
}

const d = new Perro('Fido')
const e = new Perro('Buddy')
d.agregarTruco('dar la vuelta')
e.agregarTruco('hacerse el muerto')
console.log(Perro.trucos)   // los trucos de los dos perros quedaron mezclados`,
    go: r`var trucos []string // ¡error! una sola lista del paquete para TODOS los perros

type Perro struct {
    Nombre string
}

func (p Perro) AgregarTruco(truco string) {
    trucos = append(trucos, truco)
}

d := Perro{Nombre: "Fido"}
e := Perro{Nombre: "Buddy"}
d.AgregarTruco("dar la vuelta")
e.AgregarTruco("hacerse el muerto")
fmt.Println(trucos) // los trucos de los dos perros quedaron mezclados`,
    csharp: r`var d = new Perro("Fido");
var e = new Perro("Buddy");
d.AgregarTruco("dar la vuelta");
e.AgregarTruco("hacerse el muerto");
Console.WriteLine(string.Join(", ", Perro.Trucos));   // los trucos de los dos perros quedaron mezclados

class Perro {
    public static List<string> Trucos = new();   // ¡error! una sola lista para TODOS los perros

    public string Nombre;

    public Perro(string nombre) {
        Nombre = nombre;
    }

    public void AgregarTruco(string truco) {
        Trucos.Add(truco);
    }
}`,
    ruby: r`class Perro
  @@trucos = []   # ¡error! @@ es de la clase: un solo arreglo para TODOS los perros

  def initialize(nombre)
    @nombre = nombre
  end

  def agregar_truco(truco)
    @@trucos << truco
  end

  def trucos
    @@trucos
  end
end

d = Perro.new('Fido')
e = Perro.new('Buddy')
d.agregar_truco('dar la vuelta')
e.agregar_truco('hacerse el muerto')
p d.trucos   # ¡Fido también tiene el truco de Buddy!`,
    rust: r`// Rust hace difícil este error: una variable global modificable exige unsafe.
// Para compartir datos hay que pasarlos de forma explícita, y eso se ve en el código
struct Perro {
    nombre: String,
}

impl Perro {
    fn agregar_truco(&self, compartidos: &mut Vec<String>, truco: &str) {
        compartidos.push(format!("{}: {}", self.nombre, truco));
    }
}

let mut compartidos = Vec::new();
let d = Perro { nombre: String::from("Fido") };
let e = Perro { nombre: String::from("Buddy") };
d.agregar_truco(&mut compartidos, "dar la vuelta");
e.agregar_truco(&mut compartidos, "hacerse el muerto");
println!("{:?}", compartidos);`,
    kotlin: r`class Perro(val nombre: String) {
    fun agregarTruco(truco: String) {
        trucos.add(truco)
    }

    companion object {
        val trucos = mutableListOf<String>()   // ¡error! una sola lista para TODOS los perros
    }
}

val d = Perro("Fido")
val e = Perro("Buddy")
d.agregarTruco("dar la vuelta")
e.agregarTruco("hacerse el muerto")
println(Perro.trucos)   // los trucos de los dos perros quedaron mezclados`,
    output: {
      javascript: '["dar la vuelta","hacerse el muerto"]',
      go: '[dar la vuelta hacerse el muerto]',
      csharp: 'dar la vuelta, hacerse el muerto',
      ruby: '["dar la vuelta", "hacerse el muerto"]',
      rust: '["Fido: dar la vuelta", "Buddy: hacerse el muerto"]',
    },
  },
  'Observaciones sobre clases': {
    javascript: r`class Almacen {
  proposito = 'almacenamiento'   // valores iniciales de cada objeto
  region = 'oeste'
}

const a1 = new Almacen()
console.log(a1.proposito, a1.region)
const a2 = new Almacen()
a2.region = 'este'
console.log(a2.proposito, a2.region)
console.log(a1.region)   // a1 no cambió

class Bolsa {
  datos = []

  agregar(x) {
    this.datos.push(x)
  }

  agregarDosVeces(x) {
    this.agregar(x)   // un método llama a otro con this
    this.agregar(x)
  }
}

const bolsa = new Bolsa()
bolsa.agregarDosVeces('manzana')
console.log(bolsa.datos)`,
    go: r`type Almacen struct {
    Proposito, Region string
}

func NuevoAlmacen() Almacen {
    return Almacen{Proposito: "almacenamiento", Region: "oeste"} // valores iniciales
}

type Bolsa struct {
    Datos []string
}

func (b *Bolsa) Agregar(x string) {
    b.Datos = append(b.Datos, x)
}

func (b *Bolsa) AgregarDosVeces(x string) {
    b.Agregar(x) // un método llama a otro con el receptor
    b.Agregar(x)
}

a1 := NuevoAlmacen()
fmt.Println(a1.Proposito, a1.Region)
a2 := NuevoAlmacen()
a2.Region = "este"
fmt.Println(a2.Proposito, a2.Region)
fmt.Println(a1.Region) // a1 no cambió

bolsa := Bolsa{}
bolsa.AgregarDosVeces("manzana")
fmt.Println(bolsa.Datos)`,
    csharp: r`var a1 = new Almacen();
Console.WriteLine($"{a1.Proposito} {a1.Region}");
var a2 = new Almacen();
a2.Region = "este";
Console.WriteLine($"{a2.Proposito} {a2.Region}");
Console.WriteLine(a1.Region);   // a1 no cambió

var bolsa = new Bolsa();
bolsa.AgregarDosVeces("manzana");
Console.WriteLine(string.Join(", ", bolsa.Datos));

class Almacen {
    public string Proposito = "almacenamiento";   // valores iniciales de cada objeto
    public string Region = "oeste";
}

class Bolsa {
    public List<string> Datos = new();

    public void Agregar(string x) {
        Datos.Add(x);
    }

    public void AgregarDosVeces(string x) {
        Agregar(x);   // un método llama a otro; this es opcional
        Agregar(x);
    }
}`,
    ruby: r`class Almacen
  attr_accessor :proposito, :region

  def initialize
    @proposito = 'almacenamiento'   # valores iniciales de cada objeto
    @region = 'oeste'
  end
end

a1 = Almacen.new
puts "#{a1.proposito} #{a1.region}"
a2 = Almacen.new
a2.region = 'este'
puts "#{a2.proposito} #{a2.region}"
puts a1.region   # a1 no cambió

class Bolsa
  attr_reader :datos

  def initialize
    @datos = []
  end

  def agregar(x)
    @datos << x
  end

  def agregar_dos_veces(x)
    agregar(x)   # un método llama a otro; self es opcional
    agregar(x)
  end
end

bolsa = Bolsa.new
bolsa.agregar_dos_veces('manzana')
p bolsa.datos`,
    rust: r`struct Almacen {
    proposito: String,
    region: String,
}

impl Almacen {
    fn new() -> Almacen {
        // valores iniciales
        Almacen { proposito: String::from("almacenamiento"), region: String::from("oeste") }
    }
}

struct Bolsa {
    datos: Vec<String>,
}

impl Bolsa {
    fn agregar(&mut self, x: &str) {
        self.datos.push(x.to_string());
    }

    fn agregar_dos_veces(&mut self, x: &str) {
        self.agregar(x);   // un método llama a otro con self
        self.agregar(x);
    }
}

let a1 = Almacen::new();
println!("{} {}", a1.proposito, a1.region);
let mut a2 = Almacen::new();
a2.region = String::from("este");
println!("{} {}", a2.proposito, a2.region);
println!("{}", a1.region);   // a1 no cambió

let mut bolsa = Bolsa { datos: Vec::new() };
bolsa.agregar_dos_veces("manzana");
println!("{:?}", bolsa.datos);`,
    kotlin: r`class Almacen {
    val proposito = "almacenamiento"   // valores iniciales de cada objeto
    var region = "oeste"
}

val a1 = Almacen()
println("${d}{a1.proposito} ${d}{a1.region}")
val a2 = Almacen()
a2.region = "este"
println("${d}{a2.proposito} ${d}{a2.region}")
println(a1.region)   // a1 no cambió

class Bolsa {
    val datos = mutableListOf<String>()

    fun agregar(x: String) {
        datos.add(x)
    }

    fun agregarDosVeces(x: String) {
        agregar(x)   // un método llama a otro; this es opcional
        agregar(x)
    }
}

val bolsa = Bolsa()
bolsa.agregarDosVeces("manzana")
println(bolsa.datos)`,
    output: {
      javascript: 'almacenamiento oeste\nalmacenamiento este\noeste\n["manzana","manzana"]',
      go: 'almacenamiento oeste\nalmacenamiento este\noeste\n[manzana manzana]',
      csharp: 'almacenamiento oeste\nalmacenamiento este\noeste\nmanzana, manzana',
      ruby: 'almacenamiento oeste\nalmacenamiento este\noeste\n["manzana", "manzana"]',
      rust: 'almacenamiento oeste\nalmacenamiento este\noeste\n["manzana", "manzana"]',
    },
  },
  'Herencia': {
    javascript: r`class Animal {
  constructor(nombre) {
    this.nombre = nombre
  }

  hablar() {
    return '...'
  }

  presentarse() {
    return ${b}${d}{this.nombre} dice ${d}{this.hablar()}${b}
  }
}

class Perro extends Animal {   // Perro hereda de Animal
  hablar() {                   // y cambia (sobrescribe) este método
    return '¡Guau!'
  }
}

class Gato extends Animal {
  hablar() {
    return '¡Miau!'
  }
}

for (const animal of [new Perro('Fido'), new Gato('Michi'), new Animal('Genérico')]) {
  console.log(animal.presentarse())
}

console.log(new Perro('Rex') instanceof Animal)
console.log(Gato.prototype instanceof Animal)`,
    go: r`// Go no tiene herencia: una interfaz dice qué métodos debe tener un tipo,
// y cualquier tipo que los tenga la cumple sin declararlo
type Animal interface {
    Hablar() string
}

type Perro struct{ Nombre string }

func (p Perro) Hablar() string { return "¡Guau!" }

type Gato struct{ Nombre string }

func (g Gato) Hablar() string { return "¡Miau!" }

func presentar(nombre string, animal Animal) string {
    return nombre + " dice " + animal.Hablar()
}

fmt.Println(presentar("Fido", Perro{"Fido"}))
fmt.Println(presentar("Michi", Gato{"Michi"}))`,
    csharp: r`Animal[] animales = [new Perro("Fido"), new Gato("Michi"), new Animal("Genérico")];
foreach (var animal in animales) {
    Console.WriteLine(animal.Presentarse());
}

Console.WriteLine(new Perro("Rex") is Animal);
Console.WriteLine(typeof(Gato).IsSubclassOf(typeof(Animal)));

class Animal {
    public string Nombre;

    public Animal(string nombre) {
        Nombre = nombre;
    }

    public virtual string Hablar() => "...";   // virtual: se puede sobrescribir

    public string Presentarse() => $"{Nombre} dice {Hablar()}";
}

class Perro : Animal {   // Perro hereda de Animal
    public Perro(string nombre) : base(nombre) { }

    public override string Hablar() => "¡Guau!";   // y cambia este método
}

class Gato : Animal {
    public Gato(string nombre) : base(nombre) { }

    public override string Hablar() => "¡Miau!";
}`,
    ruby: r`class Animal
  def initialize(nombre)
    @nombre = nombre
  end

  def hablar
    '...'
  end

  def presentarse
    "#{@nombre} dice #{hablar}"
  end
end

class Perro < Animal   # Perro hereda de Animal
  def hablar           # y cambia (sobrescribe) este método
    '¡Guau!'
  end
end

class Gato < Animal
  def hablar
    '¡Miau!'
  end
end

[Perro.new('Fido'), Gato.new('Michi'), Animal.new('Genérico')].each do |animal|
  puts animal.presentarse
end

puts Perro.new('Rex').is_a?(Animal)
puts Gato < Animal`,
    rust: r`// Rust no tiene herencia: un trait reúne los métodos comunes
// y puede traer una versión por defecto de cada uno
trait Animal {
    fn nombre(&self) -> String;

    fn hablar(&self) -> String {
        String::from("...")
    }

    fn presentarse(&self) -> String {
        format!("{} dice {}", self.nombre(), self.hablar())
    }
}

struct Perro(String);
struct Gato(String);
struct Generico(String);

impl Animal for Perro {
    fn nombre(&self) -> String { self.0.clone() }
    fn hablar(&self) -> String { String::from("¡Guau!") }   // cambia la versión por defecto
}

impl Animal for Gato {
    fn nombre(&self) -> String { self.0.clone() }
    fn hablar(&self) -> String { String::from("¡Miau!") }
}

impl Animal for Generico {
    fn nombre(&self) -> String { self.0.clone() }
}

let animales: Vec<Box<dyn Animal>> = vec![
    Box::new(Perro(String::from("Fido"))),
    Box::new(Gato(String::from("Michi"))),
    Box::new(Generico(String::from("Genérico"))),
];
for animal in &animales {
    println!("{}", animal.presentarse());
}`,
    kotlin: r`// open permite heredar de la clase y sobrescribir el método
open class Animal(val nombre: String) {
    open fun hablar() = "..."

    fun presentarse() = "$nombre dice ${d}{hablar()}"
}

class Perro(nombre: String) : Animal(nombre) {   // Perro hereda de Animal
    override fun hablar() = "¡Guau!"             // y cambia este método
}

class Gato(nombre: String) : Animal(nombre) {
    override fun hablar() = "¡Miau!"
}

for (animal in listOf(Perro("Fido"), Gato("Michi"), Animal("Genérico"))) {
    println(animal.presentarse())
}

println(Perro("Rex") is Animal)
println(Animal::class.java.isAssignableFrom(Gato::class.java))`,
    output: {
      go: 'Fido dice ¡Guau!\nMichi dice ¡Miau!',
      csharp: 'Fido dice ¡Guau!\nMichi dice ¡Miau!\nGenérico dice ...\nTrue\nTrue',
      rust: 'Fido dice ¡Guau!\nMichi dice ¡Miau!\nGenérico dice ...',
    },
  },
  'Herencia múltiple': {
    javascript: r`// Una clase solo hereda de otra: para combinar comportamientos se usan mixins
const Volador = {
  moverse() {
    return 'volando'
  },
}

const Nadador = {
  moverse() {
    return 'nadando'
  },
  bucear() {
    return 'buceando'
  },
}

class Pato {}
Object.assign(Pato.prototype, Nadador, Volador)   // el último copiado gana: Volador

const pato = new Pato()
console.log(pato.moverse())
console.log(pato.bucear())`,
    go: r`type Volador struct{}

func (Volador) Moverse() string { return "volando" }

type Nadador struct{}

func (Nadador) Moverse() string { return "nadando" }
func (Nadador) Bucear() string  { return "buceando" }

// Pato incrusta los dos tipos y recibe sus métodos
type Pato struct {
    Volador
    Nadador
}

// Los dos tienen Moverse: Go obliga a decir cuál se usa
func (p Pato) Moverse() string { return p.Volador.Moverse() }

pato := Pato{}
fmt.Println(pato.Moverse())
fmt.Println(pato.Bucear())`,
    csharp: r`var pato = new Pato();
Console.WriteLine(pato.Moverse());
Console.WriteLine(pato.Bucear());

// Una clase solo hereda de otra, pero puede cumplir varias interfaces
interface IVolador {
    string Moverse();
}

interface INadador {
    string Moverse();
    string Bucear();
}

class Pato : IVolador, INadador {
    public string Moverse() => "volando";   // una sola implementación sirve a las dos
    public string Bucear() => "buceando";
}`,
    ruby: r`# Una clase solo hereda de otra: para combinar comportamientos se incluyen módulos
module Volador
  def moverse
    'volando'
  end
end

module Nadador
  def moverse
    'nadando'
  end

  def bucear
    'buceando'
  end
end

class Pato
  include Nadador
  include Volador   # el último incluido gana
end

pato = Pato.new
puts pato.moverse
puts pato.bucear
p Pato.ancestors.take(3)   # orden en que se buscan los métodos`,
    rust: r`trait Volador {
    fn moverse(&self) -> &str { "volando" }
}

trait Nadador {
    fn moverse(&self) -> &str { "nadando" }
    fn bucear(&self) -> &str { "buceando" }
}

struct Pato;

// Un tipo puede implementar todos los traits que quiera
impl Volador for Pato {}
impl Nadador for Pato {}

let pato = Pato;
// Los dos tienen moverse: Rust obliga a decir cuál se usa
println!("{}", Volador::moverse(&pato));
println!("{}", pato.bucear());`,
    kotlin: r`// Una clase solo hereda de otra, pero puede cumplir varias interfaces
interface Volador {
    fun moverse() = "volando"
}

interface Nadador {
    fun moverse() = "nadando"
    fun bucear() = "buceando"
}

class Pato : Volador, Nadador {
    // Los dos tienen moverse: Kotlin obliga a decir cuál se usa
    override fun moverse() = super<Volador>.moverse()
}

val pato = Pato()
println(pato.moverse())
println(pato.bucear())`,
    output: { ruby: 'volando\nbuceando\n[Pato, Volador, Nadador]' },
  },
  'Variables privadas': {
    javascript: r`class Cuenta {
  #saldo                    // # hace el campo privado de verdad

  constructor(saldo) {
    this._moneda = 'PEN'    // _ indica «uso interno», solo por convención
    this.#saldo = saldo
  }

  saldo() {
    return this.#saldo
  }
}

const c = new Cuenta(100)
console.log(c.saldo())
console.log(c._moneda)        // se puede leer, aunque no se debería
console.log(Object.keys(c))   // #saldo no aparece: desde fuera no existe`,
    go: r`type Cuenta struct {
    saldo int // minúscula: solo se puede usar dentro de este paquete
}

// Mayúscula: se puede usar desde cualquier paquete
func (c Cuenta) Saldo() int {
    return c.saldo
}

c := Cuenta{saldo: 100}
fmt.Println(c.Saldo())`,
    csharp: r`var c = new Cuenta(100);
Console.WriteLine(c.Saldo());
// Console.WriteLine(c.saldo);  ← no compila: es privado

class Cuenta {
    private int saldo;   // private: solo se puede usar dentro de la clase

    public Cuenta(int saldo) {
        this.saldo = saldo;
    }

    public int Saldo() => saldo;
}`,
    ruby: r`class Cuenta
  def initialize(saldo)
    @saldo = saldo   # las variables @ siempre son privadas del objeto
  end

  def saldo          # solo se puede leer a través de un método
    @saldo
  end
end

c = Cuenta.new(100)
puts c.saldo
puts c.respond_to?(:saldo=)   # no hay método para cambiarlo desde fuera`,
    rust: r`mod banco {
    pub struct Cuenta {
        saldo: i32,   // sin pub: privado fuera de este módulo
    }

    impl Cuenta {
        pub fn new(saldo: i32) -> Cuenta {
            Cuenta { saldo }
        }

        pub fn saldo(&self) -> i32 {
            self.saldo
        }
    }
}

let c = banco::Cuenta::new(100);
println!("{}", c.saldo());
// println!("{}", c.saldo);  ← no compila: el campo es privado`,
    kotlin: r`class Cuenta(private val saldo: Int) {   // private: solo se puede usar dentro de la clase
    fun saldo() = saldo
}

val c = Cuenta(100)
println(c.saldo())
// println(c.saldo)  ← no compila: es privado`,
    output: { javascript: '100\nPEN\n["_moneda"]', ruby: '100\nfalse' },
  },
  'Clases de datos': {
    javascript: r`// No hay clases de datos: el constructor y la comparación se escriben a mano
class Empleado {
  constructor(nombre, departamento, salario) {
    this.nombre = nombre
    this.departamento = departamento
    this.salario = salario
  }

  esIgual(otro) {
    return JSON.stringify(this) === JSON.stringify(otro)
  }
}

const juan = new Empleado('juan', 'laboratorio de cómputo', 1000)
console.log(juan.departamento)
console.log(juan.salario)
console.log(juan)
console.log(juan.esIgual(new Empleado('juan', 'laboratorio de cómputo', 1000)))`,
    go: r`type Empleado struct {
    Nombre       string
    Departamento string
    Salario      int
}

juan := Empleado{"juan", "laboratorio de cómputo", 1000}
fmt.Println(juan.Departamento)
fmt.Println(juan.Salario)
fmt.Printf("%+v\n", juan) // %+v muestra también el nombre de cada campo
// Los structs se comparan campo a campo con ==
fmt.Println(juan == Empleado{"juan", "laboratorio de cómputo", 1000})`,
    csharp: r`var juan = new Empleado("juan", "laboratorio de cómputo", 1000);
Console.WriteLine(juan.Departamento);
Console.WriteLine(juan.Salario);
Console.WriteLine(juan);   // record crea por nosotros el constructor, ToString y la comparación
Console.WriteLine(juan == new Empleado("juan", "laboratorio de cómputo", 1000));

record Empleado(string Nombre, string Departamento, int Salario);`,
    ruby: r`# Data.define crea por nosotros el constructor, inspect y la comparación
Empleado = Data.define(:nombre, :departamento, :salario)

juan = Empleado.new('juan', 'laboratorio de cómputo', 1000)
puts juan.departamento
puts juan.salario
p juan
puts juan == Empleado.new('juan', 'laboratorio de cómputo', 1000)`,
    rust: r`// derive genera por nosotros el formato de depuración y la comparación
#[derive(Debug, PartialEq)]
struct Empleado {
    nombre: String,
    departamento: String,
    salario: u32,
}

fn empleado(nombre: &str, departamento: &str, salario: u32) -> Empleado {
    Empleado { nombre: nombre.to_string(), departamento: departamento.to_string(), salario }
}

let juan = empleado("juan", "laboratorio de cómputo", 1000);
println!("{}", juan.departamento);
println!("{}", juan.salario);
println!("{:?}", juan);
println!("{}", juan == empleado("juan", "laboratorio de cómputo", 1000));`,
    kotlin: r`// data class crea por nosotros el constructor, toString y la comparación
data class Empleado(val nombre: String, val departamento: String, val salario: Int)

val juan = Empleado("juan", "laboratorio de cómputo", 1000)
println(juan.departamento)
println(juan.salario)
println(juan)
println(juan == Empleado("juan", "laboratorio de cómputo", 1000))`,
    output: {
      javascript: 'laboratorio de cómputo\n1000\n{"nombre":"juan","departamento":"laboratorio de cómputo","salario":1000}\ntrue',
      go: 'laboratorio de cómputo\n1000\n{Nombre:juan Departamento:laboratorio de cómputo Salario:1000}\ntrue',
      csharp: 'laboratorio de cómputo\n1000\nEmpleado { Nombre = juan, Departamento = laboratorio de cómputo, Salario = 1000 }\nTrue',
      ruby: 'laboratorio de cómputo\n1000\n#<data Empleado nombre="juan", departamento="laboratorio de cómputo", salario=1000>\ntrue',
      rust: 'laboratorio de cómputo\n1000\nEmpleado { nombre: "juan", departamento: "laboratorio de cómputo", salario: 1000 }\ntrue',
      kotlin: 'laboratorio de cómputo\n1000\nEmpleado(nombre=juan, departamento=laboratorio de cómputo, salario=1000)\ntrue',
    },
  },
  'Iteradores': {
    javascript: r`const s = 'abc'
const it = s[Symbol.iterator]()   // un iterador recorre una secuencia paso a paso
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
// it.next() devolvería { value: undefined, done: true }: ya no quedan elementos

/** Recorre una secuencia de atrás hacia adelante. */
class Reverso {
  constructor(datos) {
    this.datos = datos
    this.indice = datos.length
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    if (this.indice === 0) return { done: true }
    this.indice = this.indice - 1
    return { value: this.datos[this.indice], done: false }
  }
}

for (const letra of new Reverso('spam')) {
  console.log(letra)
}`,
    go: r`// Un iterador es una función que entrega los valores uno a uno con yield (Go 1.23)
func reverso(datos string) iter.Seq[string] {
    return func(yield func(string) bool) {
        for i := len(datos) - 1; i >= 0; i-- {
            if !yield(string(datos[i])) {
                return // quien recorre pidió parar
            }
        }
    }
}

for letra := range reverso("spam") {
    fmt.Println(letra)
}`,
    csharp: r`string s = "abc";
var it = s.GetEnumerator();   // un enumerador recorre una secuencia paso a paso
it.MoveNext();
Console.WriteLine(it.Current);
it.MoveNext();
Console.WriteLine(it.Current);
it.MoveNext();
Console.WriteLine(it.Current);
// it.MoveNext() devolvería false: ya no quedan elementos

foreach (var letra in new Reverso("spam")) {
    Console.WriteLine(letra);
}

/// <summary>Recorre una secuencia de atrás hacia adelante.</summary>
class Reverso : IEnumerable<char> {
    private readonly string datos;

    public Reverso(string datos) {
        this.datos = datos;
    }

    public IEnumerator<char> GetEnumerator() {
        for (int i = datos.Length - 1; i >= 0; i--) {
            yield return datos[i];
        }
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
}`,
    ruby: r`s = 'abc'
it = s.each_char   # un enumerador recorre una secuencia paso a paso
puts it.next
puts it.next
puts it.next
# it.next  ← quita el # para ver StopIteration: ya no quedan elementos

# Recorre una secuencia de atrás hacia adelante.
class Reverso
  include Enumerable   # con each, la clase gana map, select, sort y más

  def initialize(datos)
    @datos = datos
  end

  def each
    (@datos.length - 1).downto(0) { |indice| yield @datos[indice] }
  end
end

Reverso.new('spam').each do |letra|
  puts letra
end`,
    rust: r`let s = "abc";
let mut it = s.chars();   // un iterador recorre una secuencia paso a paso
println!("{}", it.next().unwrap());
println!("{}", it.next().unwrap());
println!("{}", it.next().unwrap());
// it.next() devolvería None: ya no quedan elementos

/// Recorre una secuencia de atrás hacia adelante.
struct Reverso {
    datos: Vec<char>,
}

impl Iterator for Reverso {
    type Item = char;

    fn next(&mut self) -> Option<char> {
        self.datos.pop()   // saca el último; None cuando se acaban
    }
}

for letra in (Reverso { datos: "spam".chars().collect() }) {
    println!("{letra}");
}`,
    kotlin: r`val s = "abc"
val it = s.iterator()   // un iterador recorre una secuencia paso a paso
println(it.next())
println(it.next())
println(it.next())
// it.next()  ← lanzaría un error: ya no quedan elementos

/** Recorre una secuencia de atrás hacia adelante. */
class Reverso(private val datos: String) : Iterator<Char> {
    private var indice = datos.length

    override fun hasNext() = indice > 0

    override fun next(): Char {
        indice = indice - 1
        return datos[indice]
    }
}

for (letra in Reverso("spam")) {
    println(letra)
}`,
    output: { javascript: LETRAS, csharp: LETRAS, ruby: LETRAS, rust: LETRAS, kotlin: LETRAS },
  },
  'Generadores': {
    javascript: r`function* reverso(datos) {   // el * indica que es un generador
  for (let indice = datos.length - 1; indice >= 0; indice--) {
    yield datos[indice]      // entrega un valor y se pausa hasta el siguiente
  }
}

for (const letra of reverso('golf')) {
  console.log(letra)
}

const gen = reverso('ok')
console.log(gen.next().value)
console.log(gen.next().value)`,
    go: r`func reverso(datos string) iter.Seq[string] {
    return func(yield func(string) bool) {
        for i := len(datos) - 1; i >= 0; i-- {
            if !yield(string(datos[i])) { // entrega un valor y espera al siguiente
                return
            }
        }
    }
}

for letra := range reverso("golf") {
    fmt.Println(letra)
}

siguiente, parar := iter.Pull(reverso("ok")) // Pull permite pedir los valores uno a uno
defer parar()
letra, _ := siguiente()
fmt.Println(letra)
letra, _ = siguiente()
fmt.Println(letra)`,
    csharp: r`IEnumerable<char> Reverso(string datos) {
    for (int indice = datos.Length - 1; indice >= 0; indice--) {
        yield return datos[indice];   // entrega un valor y se pausa hasta el siguiente
    }
}

foreach (var letra in Reverso("golf")) {
    Console.WriteLine(letra);
}

var gen = Reverso("ok").GetEnumerator();
gen.MoveNext();
Console.WriteLine(gen.Current);
gen.MoveNext();
Console.WriteLine(gen.Current);`,
    ruby: r`def reverso(datos)
  Enumerator.new do |salida|
    (datos.length - 1).downto(0) do |indice|
      salida << datos[indice]   # entrega un valor y se pausa hasta el siguiente
    end
  end
end

reverso('golf').each do |letra|
  puts letra
end

gen = reverso('ok')
puts gen.next
puts gen.next`,
    rust: r`// Rust aún no tiene generadores estables: se devuelve un iterador,
// que también es perezoso y calcula cada valor cuando se le pide
fn reverso(datos: &str) -> impl Iterator<Item = char> + '_ {
    datos.chars().rev()
}

for letra in reverso("golf") {
    println!("{letra}");
}

let mut generador = reverso("ok");
println!("{}", generador.next().unwrap());
println!("{}", generador.next().unwrap());`,
    kotlin: r`fun reverso(datos: String) = sequence {
    for (indice in datos.length - 1 downTo 0) {
        yield(datos[indice])   // entrega un valor y se pausa hasta el siguiente
    }
}

for (letra in reverso("golf")) {
    println(letra)
}

val gen = reverso("ok").iterator()
println(gen.next())
println(gen.next())`,
  },
  'Expresiones generadoras': {
    javascript: r`const cuadrados = Array.from({ length: 10 }, (_, i) => i * i)
console.log(cuadrados.reduce((suma, n) => suma + n, 0))             // suma de cuadrados

const xvec = [10, 20, 30]
const yvec = [7, 5, 3]
console.log(xvec.reduce((suma, x, i) => suma + x * yvec[i], 0))     // producto punto

const pagina = ['el gato come', 'el perro come pan']
console.log([...new Set(pagina.flatMap((linea) => linea.split(' ')))].sort())

const datos = 'golf'
console.log([...datos].reverse())`,
    go: r`// No hay expresiones generadoras: se escribe el bucle
suma := 0
for i := range 10 {
    suma += i * i // suma de cuadrados
}
fmt.Println(suma)

xvec := []int{10, 20, 30}
yvec := []int{7, 5, 3}
producto := 0
for i, x := range xvec {
    producto += x * yvec[i] // producto punto
}
fmt.Println(producto)`,
    csharp: r`Console.WriteLine(Enumerable.Range(0, 10).Sum(i => i * i));   // suma de cuadrados

int[] xvec = [10, 20, 30];
int[] yvec = [7, 5, 3];
Console.WriteLine(xvec.Zip(yvec, (x, y) => x * y).Sum());     // producto punto

string[] pagina = ["el gato come", "el perro come pan"];
var palabras = pagina.SelectMany(linea => linea.Split(' ')).Distinct().Order();
Console.WriteLine(string.Join(", ", palabras));

string datos = "golf";
Console.WriteLine(string.Join(", ", datos.Reverse()));
// LINQ es perezoso: no calcula nada hasta que se pide el resultado`,
    ruby: r`puts (0...10).sum { |i| i * i }              # suma de cuadrados

xvec = [10, 20, 30]
yvec = [7, 5, 3]
puts xvec.zip(yvec).sum { |x, y| x * y }     # producto punto

pagina = ['el gato come', 'el perro come pan']
p pagina.flat_map(&:split).uniq.sort

datos = 'golf'
p datos.chars.reverse
# .lazy convierte cualquier cadena de métodos en perezosa: (1..).lazy.map { ... }`,
    rust: r`println!("{}", (0..10).map(|i| i * i).sum::<i32>());   // suma de cuadrados

let xvec = [10, 20, 30];
let yvec = [7, 5, 3];
println!("{}", xvec.iter().zip(yvec.iter()).map(|(x, y)| x * y).sum::<i32>());   // producto punto

let pagina = ["el gato come", "el perro come pan"];
let palabras: BTreeSet<&str> = pagina.iter().flat_map(|linea| linea.split(' ')).collect();
println!("{:?}", palabras);

let datos = "golf";
println!("{:?}", datos.chars().rev().collect::<Vec<char>>());
// Los iteradores son perezosos: no calculan nada hasta sum o collect`,
    kotlin: r`println((0 until 10).sumOf { it * it })             // suma de cuadrados

val xvec = listOf(10, 20, 30)
val yvec = listOf(7, 5, 3)
println(xvec.zip(yvec).sumOf { (x, y) -> x * y })   // producto punto

val pagina = listOf("el gato come", "el perro come pan")
println(pagina.flatMap { it.split(" ") }.toSet().sorted())

val datos = "golf"
println(datos.reversed().toList())
// asSequence() vuelve perezosa la cadena: no calcula nada hasta el final`,
    output: {
      javascript: '285\n260\n["come","el","gato","pan","perro"]\n["f","l","o","g"]',
      go: '285\n260',
      csharp: '285\n260\ncome, el, gato, pan, perro\nf, l, o, g',
      ruby: '285\n260\n["come", "el", "gato", "pan", "perro"]\n["f", "l", "o", "g"]',
      rust: `285\n260\n{"come", "el", "gato", "pan", "perro"}\n['f', 'l', 'o', 'g']`,
    },
  },
  'Para leer más': {
    javascript: 'Clases en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes\nIteradores y generadores: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_generators',
    go: 'Métodos e interfaces en el recorrido por Go: https://go.dev/tour/methods/1\nIteradores con range: https://go.dev/blog/range-functions',
    csharp: 'Clases, structs y registros: https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/object-oriented/\nHerencia: https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/object-oriented/inheritance',
    ruby: 'Módulos y clases: https://docs.ruby-lang.org/en/master/syntax/modules_and_classes_rdoc.html\nMódulo Enumerable: https://docs.ruby-lang.org/en/master/Enumerable.html',
    rust: 'Structs en el libro de Rust: https://doc.rust-lang.org/book/ch05-00-structs.html\nTraits: https://doc.rust-lang.org/book/ch10-02-traits.html\nIteradores: https://doc.rust-lang.org/book/ch13-02-iterators.html',
    kotlin: 'Clases: https://kotlinlang.org/docs/classes.html\nHerencia: https://kotlinlang.org/docs/inheritance.html\nSecuencias: https://kotlinlang.org/docs/sequences.html',
  },
}
