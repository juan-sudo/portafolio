// Lenguajes del módulo Backend. Los niveles clásicos solo traen Python, PHP y Java;
// el nivel comparativo de este archivo muestra el mismo concepto en los nueve.
export const backendLanguages = [
  { key: 'python', label: 'Python' },
  { key: 'php', label: 'PHP' },
  { key: 'java', label: 'Java' },
  { key: 'javascript', label: 'JavaScript (Node.js)' },
  { key: 'go', label: 'Go' },
  { key: 'csharp', label: 'C#' },
  { key: 'ruby', label: 'Ruby' },
  { key: 'rust', label: 'Rust' },
  { key: 'kotlin', label: 'Kotlin' },
]

const sameOutput = (text) => Object.fromEntries(backendLanguages.map(({ key }) => [key, text]))

const NOTE = 'Python, PHP y JavaScript se ejecutan de verdad en el navegador; en los demás se muestra la salida esperada.'

export const backendCompareLevel = {
  level: 17,
  title: 'Todos los lenguajes, lado a lado',
  topics: [
    {
      title: 'Hola, mundo en 9 lenguajes',
      code: true,
      note: NOTE,
      python: 'print("Hola, mundo")',
      php: '<?php\necho "Hola, mundo";',
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hola, mundo");
    }
}`,
      javascript: 'console.log("Hola, mundo")',
      go: `package main

import "fmt"

func main() {
    fmt.Println("Hola, mundo")
}`,
      csharp: 'Console.WriteLine("Hola, mundo");',
      ruby: 'puts "Hola, mundo"',
      rust: `fn main() {
    println!("Hola, mundo");
}`,
      kotlin: `fun main() {
    println("Hola, mundo")
}`,
      output: sameOutput('Hola, mundo'),
      common: 'En todos se hace lo mismo: llamar a una instrucción de salida y pasarle un texto entre comillas dobles.',
      differences: `• Python, Ruby, PHP y JavaScript ejecutan el archivo de arriba abajo: una línea ya es un programa.
• Java, Go, Rust y Kotlin exigen un punto de entrada llamado main. Java además lo quiere dentro de una clase y Go dentro de un paquete.
• C# moderno acepta instrucciones sueltas, aunque por debajo también genera un main.
• El punto y coma es obligatorio en PHP, Java, C# y Rust; en Python, Go, Ruby y Kotlin no se escribe, y en JavaScript es opcional.
• En los siguientes temas se omite el main de Java, Go, Rust y Kotlin para ir directo al concepto.`,
    },
    {
      title: 'Cómo se ejecuta cada lenguaje',
      python: 'El intérprete CPython traduce tu código a bytecode y lo ejecuta línea a línea. No hay paso de compilación visible: escribes y ejecutas.',
      php: 'Se interpreta en cada petición web. OPcache guarda el código ya traducido para no repetir ese trabajo, y desde PHP 8 existe un compilador JIT opcional.',
      java: 'Se compila con javac a bytecode y la máquina virtual (JVM) lo ejecuta. El compilador JIT convierte en código nativo las partes que más se usan.',
      javascript: 'Node.js usa el motor V8 de Chrome, que compila el código con JIT mientras se ejecuta. Trabaja con un solo hilo y un bucle de eventos.',
      go: 'Se compila a un único binario nativo que ya incluye todo lo necesario, así que se despliega copiando un archivo. Tiene recolector de basura.',
      csharp: 'Se compila a un lenguaje intermedio (IL) que ejecuta el entorno .NET con JIT. También puede compilarse por adelantado a código nativo.',
      ruby: 'Lo ejecuta el intérprete oficial (CRuby) sobre su máquina virtual YARV. Desde Ruby 3 incluye el compilador YJIT para acelerar el código.',
      rust: 'Se compila a un binario nativo y no tiene recolector de basura: el compilador comprueba quién es dueño de cada dato (ownership) y libera la memoria solo.',
      kotlin: 'En backend se compila al mismo bytecode que Java y corre sobre la JVM, por eso puede usar cualquier biblioteca de Java.',
      common: 'Ninguno ejecuta tu texto tal cual: todos lo traducen antes a una forma intermedia o a código máquina. Y salvo Rust, todos liberan la memoria de forma automática con un recolector de basura.',
      differences: `• Binario nativo, sin instalar nada en el servidor: Go y Rust.
• Máquina virtual con JIT: Java y Kotlin (JVM), C# (.NET) y JavaScript (V8).
• Intérprete: Python, PHP y Ruby. Arrancan rápido y son cómodos para probar, pero suelen ser más lentos en cálculo intensivo.
• Los compilados detectan muchos errores antes de ejecutar; los interpretados los muestran al llegar a la línea que falla.`,
    },
    {
      title: 'Variables y tipado',
      code: true,
      note: NOTE,
      python: `nombre = "Ana"
edad = 25
edad = edad + 1
print(nombre, edad)`,
      php: `$nombre = "Ana";
$edad = 25;
$edad = $edad + 1;
echo "$nombre $edad";`,
      java: `String nombre = "Ana";
var edad = 25;
edad = edad + 1;
System.out.println(nombre + " " + edad);`,
      javascript: `const nombre = "Ana"
let edad = 25
edad = edad + 1
console.log(nombre, edad)`,
      go: `nombre := "Ana"
var edad int = 25
edad = edad + 1
fmt.Println(nombre, edad)`,
      csharp: `string nombre = "Ana";
var edad = 25;
edad = edad + 1;
Console.WriteLine($"{nombre} {edad}");`,
      ruby: `nombre = "Ana"
edad = 25
edad = edad + 1
puts "#{nombre} #{edad}"`,
      rust: `let nombre = "Ana";
let mut edad = 25;
edad = edad + 1;
println!("{} {}", nombre, edad);`,
      kotlin: `val nombre = "Ana"
var edad = 25
edad = edad + 1
println("$nombre $edad")`,
      output: sameOutput('Ana 26'),
      common: 'Una variable es un nombre que guarda un valor, y se asigna con el signo =. En todos existen los mismos tipos básicos: texto, enteros, decimales y booleanos.',
      differences: `• Tipado dinámico (el tipo va con el valor y puede cambiar): Python, PHP, JavaScript y Ruby.
• Tipado estático (el tipo se fija al compilar): Java, Go, C#, Rust y Kotlin. No hace falta escribirlo siempre: var, := , let y val lo deducen del valor.
• Inmutable por defecto: en Rust hay que pedir let mut para poder cambiarla; Kotlin distingue val (fija) de var, y JavaScript const de let.
• PHP marca las variables con $. Go no deja compilar si declaras una variable y no la usas.`,
    },
    {
      title: 'Texto e interpolación',
      code: true,
      note: NOTE,
      python: `nombre = "Ana"
edad = 25
print(f"{nombre} tiene {edad} años")
print(nombre.upper(), len(nombre))`,
      php: `$nombre = "Ana";
$edad = 25;
echo "$nombre tiene $edad años\\n";
echo strtoupper($nombre), " ", strlen($nombre);`,
      java: `String nombre = "Ana";
int edad = 25;
System.out.println(nombre + " tiene " + edad + " años");
System.out.println(nombre.toUpperCase() + " " + nombre.length());`,
      javascript: `const nombre = "Ana"
const edad = 25
console.log(\`\${nombre} tiene \${edad} años\`)
console.log(nombre.toUpperCase(), nombre.length)`,
      go: `nombre := "Ana"
edad := 25
fmt.Printf("%s tiene %d años\\n", nombre, edad)
fmt.Println(strings.ToUpper(nombre), len(nombre))`,
      csharp: `var nombre = "Ana";
var edad = 25;
Console.WriteLine($"{nombre} tiene {edad} años");
Console.WriteLine($"{nombre.ToUpper()} {nombre.Length}");`,
      ruby: `nombre = "Ana"
edad = 25
puts "#{nombre} tiene #{edad} años"
puts "#{nombre.upcase} #{nombre.length}"`,
      rust: `let nombre = "Ana";
let edad = 25;
println!("{nombre} tiene {edad} años");
println!("{} {}", nombre.to_uppercase(), nombre.len());`,
      kotlin: `val nombre = "Ana"
val edad = 25
println("$nombre tiene $edad años")
println("\${nombre.uppercase()} \${nombre.length}")`,
      output: sameOutput('Ana tiene 25 años\nANA 3'),
      common: 'Casi todos permiten meter una variable dentro del texto (interpolación) y traen operaciones listas para pasar a mayúsculas o medir la longitud.',
      differences: `• Cada uno marca la interpolación a su manera: f"{x}" en Python, "$x" en PHP y Kotlin, \`\${x}\` en JavaScript, $"{x}" en C#, "#{x}" en Ruby y "{x}" dentro de println! en Rust.
• Java concatena con + (o usa String.format) y Go usa verbos de formato como %s y %d.
• En PHP y Go las operaciones son funciones sueltas (strtoupper, strings.ToUpper); en el resto son métodos del texto (nombre.upper()).
• Cuidado con la longitud: len en Go, .len() en Rust y strlen en PHP cuentan bytes, no letras. Con "años" devuelven 5 y no 4, porque la ñ ocupa dos bytes en UTF-8.`,
    },
    {
      title: 'Condicionales',
      code: true,
      note: NOTE,
      python: `nota = 15
if nota >= 18:
    print("Excelente")
elif nota >= 11:
    print("Aprobado")
else:
    print("Desaprobado")`,
      php: `$nota = 15;
if ($nota >= 18) {
    echo "Excelente";
} elseif ($nota >= 11) {
    echo "Aprobado";
} else {
    echo "Desaprobado";
}`,
      java: `int nota = 15;
if (nota >= 18) {
    System.out.println("Excelente");
} else if (nota >= 11) {
    System.out.println("Aprobado");
} else {
    System.out.println("Desaprobado");
}`,
      javascript: `const nota = 15
if (nota >= 18) {
  console.log("Excelente")
} else if (nota >= 11) {
  console.log("Aprobado")
} else {
  console.log("Desaprobado")
}`,
      go: `nota := 15
if nota >= 18 {
    fmt.Println("Excelente")
} else if nota >= 11 {
    fmt.Println("Aprobado")
} else {
    fmt.Println("Desaprobado")
}`,
      csharp: `var nota = 15;
if (nota >= 18) {
    Console.WriteLine("Excelente");
} else if (nota >= 11) {
    Console.WriteLine("Aprobado");
} else {
    Console.WriteLine("Desaprobado");
}`,
      ruby: `nota = 15
if nota >= 18
  puts "Excelente"
elsif nota >= 11
  puts "Aprobado"
else
  puts "Desaprobado"
end`,
      rust: `let nota = 15;
let resultado = if nota >= 18 {
    "Excelente"
} else if nota >= 11 {
    "Aprobado"
} else {
    "Desaprobado"
};
println!("{resultado}");`,
      kotlin: `val nota = 15
val resultado = when {
    nota >= 18 -> "Excelente"
    nota >= 11 -> "Aprobado"
    else -> "Desaprobado"
}
println(resultado)`,
      output: sameOutput('Aprobado'),
      common: 'La lógica es idéntica en los nueve: se evalúan las condiciones en orden, se ejecuta la primera que se cumple y else recoge el resto. Los operadores de comparación (>=, ==, <) también son los mismos.',
      differences: `• Los bloques se delimitan con llaves en casi todos; Python usa la sangría y Ruby cierra con end.
• La condición lleva paréntesis en PHP, Java, JavaScript, C# y Kotlin; en Python, Go, Ruby y Rust no.
• La rama intermedia cambia de nombre: elif (Python), elseif (PHP), elsif (Ruby) y else if en los demás.
• En Rust y Kotlin el if devuelve un valor, por eso se puede asignar a una variable. Kotlin además ofrece when y Rust match para muchas ramas.
• Solo cuenta como condición un booleano en Java, Go, C#, Rust y Kotlin; Python, PHP, JavaScript y Ruby aceptan cualquier valor y deciden si es "verdadero".`,
    },
    {
      title: 'Bucles',
      code: true,
      note: NOTE,
      python: `for i in range(1, 4):
    print(i)

for nombre in ["Ana", "Luis"]:
    print(nombre)`,
      php: `for ($i = 1; $i <= 3; $i++) {
    echo $i, "\\n";
}

foreach (["Ana", "Luis"] as $nombre) {
    echo $nombre, "\\n";
}`,
      java: `for (int i = 1; i <= 3; i++) {
    System.out.println(i);
}

for (String nombre : List.of("Ana", "Luis")) {
    System.out.println(nombre);
}`,
      javascript: `for (let i = 1; i <= 3; i++) {
  console.log(i)
}

for (const nombre of ["Ana", "Luis"]) {
  console.log(nombre)
}`,
      go: `for i := 1; i <= 3; i++ {
    fmt.Println(i)
}

for _, nombre := range []string{"Ana", "Luis"} {
    fmt.Println(nombre)
}`,
      csharp: `for (var i = 1; i <= 3; i++) {
    Console.WriteLine(i);
}

foreach (var nombre in new[] { "Ana", "Luis" }) {
    Console.WriteLine(nombre);
}`,
      ruby: `(1..3).each do |i|
  puts i
end

["Ana", "Luis"].each do |nombre|
  puts nombre
end`,
      rust: `for i in 1..=3 {
    println!("{i}");
}

for nombre in ["Ana", "Luis"] {
    println!("{nombre}");
}`,
      kotlin: `for (i in 1..3) {
    println(i)
}

for (nombre in listOf("Ana", "Luis")) {
    println(nombre)
}`,
      output: sameOutput('1\n2\n3\nAna\nLuis'),
      common: 'Todos tienen dos formas de repetir: contar dentro de un rango y recorrer los elementos de una colección. También comparten break para salir y continue para saltar a la siguiente vuelta (en Ruby se llama next).',
      differences: `• El for clásico de tres partes (inicio; condición; paso) existe en PHP, Java, JavaScript, Go y C#. Python, Ruby, Rust y Kotlin recorren un rango.
• Ojo con el final del rango: range(1, 4) en Python y 1..4 en Rust no incluyen el 4; 1..3 en Ruby y Kotlin y 1..=3 en Rust sí incluyen el 3.
• Go solo tiene la palabra for: también hace de while (for condición { }).
• Para recorrer una colección: for in (Python, Rust, Kotlin), foreach (PHP, C#), for of (JavaScript), for : (Java), range (Go) y el método each con un bloque en Ruby.`,
    },
    {
      title: 'Funciones',
      code: true,
      note: NOTE,
      python: `def saludar(nombre, saludo="Hola"):
    return f"{saludo}, {nombre}"

print(saludar("Ana"))
print(saludar("Luis", "Buenos días"))`,
      php: `function saludar(string $nombre, string $saludo = "Hola"): string {
    return "$saludo, $nombre";
}

echo saludar("Ana"), "\\n";
echo saludar("Luis", "Buenos días");`,
      java: `static String saludar(String nombre) {
    return saludar(nombre, "Hola");
}

static String saludar(String nombre, String saludo) {
    return saludo + ", " + nombre;
}

System.out.println(saludar("Ana"));
System.out.println(saludar("Luis", "Buenos días"));`,
      javascript: `function saludar(nombre, saludo = "Hola") {
  return saludo + ", " + nombre
}

console.log(saludar("Ana"))
console.log(saludar("Luis", "Buenos días"))`,
      go: `func saludar(nombre, saludo string) string {
    return saludo + ", " + nombre
}

fmt.Println(saludar("Ana", "Hola"))
fmt.Println(saludar("Luis", "Buenos días"))`,
      csharp: `string Saludar(string nombre, string saludo = "Hola") {
    return $"{saludo}, {nombre}";
}

Console.WriteLine(Saludar("Ana"));
Console.WriteLine(Saludar("Luis", "Buenos días"));`,
      ruby: `def saludar(nombre, saludo = "Hola")
  "#{saludo}, #{nombre}"
end

puts saludar("Ana")
puts saludar("Luis", "Buenos días")`,
      rust: `fn saludar(nombre: &str, saludo: &str) -> String {
    format!("{saludo}, {nombre}")
}

println!("{}", saludar("Ana", "Hola"));
println!("{}", saludar("Luis", "Buenos días"));`,
      kotlin: `fun saludar(nombre: String, saludo: String = "Hola"): String {
    return "$saludo, $nombre"
}

println(saludar("Ana"))
println(saludar("Luis", "Buenos días"))`,
      output: sameOutput('Hola, Ana\nBuenos días, Luis'),
      common: 'Una función tiene nombre, recibe parámetros entre paréntesis y devuelve un resultado. Se llama igual en todos: nombre(argumentos).',
      differences: `• La palabra clave cambia: def (Python, Ruby), function (PHP, JavaScript), func (Go), fn (Rust), fun (Kotlin). Java y C# no usan ninguna: empiezan por el tipo que devuelven.
• Valores por defecto: los tienen Python, PHP, JavaScript, C#, Ruby y Kotlin. Java lo resuelve con sobrecarga (dos funciones con el mismo nombre); en Go y Rust hay que pasar siempre todos los argumentos.
• Los lenguajes estáticos obligan a declarar el tipo de cada parámetro y del resultado; en PHP y Python es opcional.
• Ruby y Rust devuelven la última expresión sin escribir return.
• Convención de nombres: snake_case en Python, Ruby y Rust; camelCase en PHP, Java, JavaScript, Go y Kotlin; PascalCase en C#.`,
    },
    {
      title: 'Listas y arreglos',
      code: true,
      note: NOTE,
      python: `numeros = [3, 1, 2]
numeros.append(5)
numeros.sort()
print(len(numeros), numeros[0], numeros[-1])`,
      php: `$numeros = [3, 1, 2];
$numeros[] = 5;
sort($numeros);
echo count($numeros), " ", $numeros[0], " ", end($numeros);`,
      java: `List<Integer> numeros = new ArrayList<>(List.of(3, 1, 2));
numeros.add(5);
Collections.sort(numeros);
System.out.println(numeros.size() + " " + numeros.get(0) + " " + numeros.get(numeros.size() - 1));`,
      javascript: `const numeros = [3, 1, 2]
numeros.push(5)
numeros.sort((a, b) => a - b)
console.log(numeros.length, numeros[0], numeros.at(-1))`,
      go: `numeros := []int{3, 1, 2}
numeros = append(numeros, 5)
slices.Sort(numeros)
fmt.Println(len(numeros), numeros[0], numeros[len(numeros)-1])`,
      csharp: `var numeros = new List<int> { 3, 1, 2 };
numeros.Add(5);
numeros.Sort();
Console.WriteLine($"{numeros.Count} {numeros[0]} {numeros[^1]}");`,
      ruby: `numeros = [3, 1, 2]
numeros << 5
numeros.sort!
puts "#{numeros.length} #{numeros.first} #{numeros.last}"`,
      rust: `let mut numeros = vec![3, 1, 2];
numeros.push(5);
numeros.sort();
println!("{} {} {}", numeros.len(), numeros[0], numeros[numeros.len() - 1]);`,
      kotlin: `val numeros = mutableListOf(3, 1, 2)
numeros.add(5)
numeros.sort()
println("\${numeros.size} \${numeros.first()} \${numeros.last()}")`,
      output: sameOutput('4 1 5'),
      common: 'Todos ofrecen una lista que crece sola, con las posiciones contadas desde 0 y acceso con corchetes. Agregar, ordenar y medir son operaciones que ya vienen incluidas.',
      differences: `• Agregar se llama distinto: append (Python, Go), push (JavaScript, Rust), add (Java, Kotlin), Add (C#), << (Ruby) y $lista[] = valor (PHP).
• En los lenguajes estáticos la lista guarda un solo tipo (List<Integer>, []int, Vec<i32>); en los dinámicos puede mezclar tipos.
• Trampa de JavaScript: sort() sin argumentos ordena como texto (10 iría antes que 2); por eso se le pasa la función de comparación.
• En Go, append devuelve la lista nueva y hay que volver a asignarla.
• El último elemento: numeros[-1] en Python, at(-1) en JavaScript, [^1] en C#, .last en Ruby y Kotlin; en Java, Go y Rust se calcula con el tamaño menos 1.
• El array de PHP es a la vez lista y diccionario.`,
    },
    {
      title: 'Diccionarios y mapas',
      code: true,
      note: NOTE,
      python: `precios = {"pan": 2, "leche": 5}
precios["cafe"] = 8
print(precios["leche"], len(precios))
if "pan" in precios:
    print("Hay pan")`,
      php: `$precios = ["pan" => 2, "leche" => 5];
$precios["cafe"] = 8;
echo $precios["leche"], " ", count($precios), "\\n";
if (array_key_exists("pan", $precios)) {
    echo "Hay pan";
}`,
      java: `Map<String, Integer> precios = new HashMap<>();
precios.put("pan", 2);
precios.put("leche", 5);
precios.put("cafe", 8);
System.out.println(precios.get("leche") + " " + precios.size());
if (precios.containsKey("pan")) {
    System.out.println("Hay pan");
}`,
      javascript: `const precios = new Map([["pan", 2], ["leche", 5]])
precios.set("cafe", 8)
console.log(precios.get("leche"), precios.size)
if (precios.has("pan")) {
  console.log("Hay pan")
}`,
      go: `precios := map[string]int{"pan": 2, "leche": 5}
precios["cafe"] = 8
fmt.Println(precios["leche"], len(precios))
if _, existe := precios["pan"]; existe {
    fmt.Println("Hay pan")
}`,
      csharp: `var precios = new Dictionary<string, int> { ["pan"] = 2, ["leche"] = 5 };
precios["cafe"] = 8;
Console.WriteLine($"{precios["leche"]} {precios.Count}");
if (precios.ContainsKey("pan")) {
    Console.WriteLine("Hay pan");
}`,
      ruby: `precios = { "pan" => 2, "leche" => 5 }
precios["cafe"] = 8
puts "#{precios["leche"]} #{precios.size}"
puts "Hay pan" if precios.key?("pan")`,
      rust: `let mut precios = HashMap::from([("pan", 2), ("leche", 5)]);
precios.insert("cafe", 8);
println!("{} {}", precios["leche"], precios.len());
if precios.contains_key("pan") {
    println!("Hay pan");
}`,
      kotlin: `val precios = mutableMapOf("pan" to 2, "leche" to 5)
precios["cafe"] = 8
println("\${precios["leche"]} \${precios.size}")
if ("pan" in precios) {
    println("Hay pan")
}`,
      output: sameOutput('5 3\nHay pan'),
      common: 'Es la misma estructura con nombres distintos: guarda pares clave → valor y encuentra un valor por su clave casi al instante. Es la forma natural de representar un registro o un JSON.',
      differences: `• Se llama dict en Python, array asociativo en PHP, Map en Java, JavaScript y Kotlin, map en Go, Dictionary en C#, Hash en Ruby y HashMap en Rust.
• Lo que pasa al pedir una clave que no existe es la diferencia más peligrosa: Python y C# lanzan un error; Rust detiene el programa si usas corchetes; Java, Kotlin y Ruby devuelven null o nil; JavaScript undefined; PHP null con una advertencia; y Go devuelve el valor cero (0), que puede confundirse con un dato real.
• Por eso Go usa la forma valor, existe := mapa[clave].
• En Go y Rust el orden al recorrerlo no está garantizado; en Python, PHP, JavaScript y Ruby se conserva el orden en que se insertó.`,
    },
    {
      title: 'Clases y objetos',
      code: true,
      note: NOTE,
      python: `class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio

    def con_descuento(self, porcentaje):
        return self.precio * (100 - porcentaje) // 100

teclado = Producto("Teclado", 100)
print(f"{teclado.nombre}: {teclado.con_descuento(20)}")`,
      php: `class Producto {
    public function __construct(
        public string $nombre,
        public int $precio,
    ) {}

    public function conDescuento(int $porcentaje): int {
        return intdiv($this->precio * (100 - $porcentaje), 100);
    }
}

$teclado = new Producto("Teclado", 100);
echo "{$teclado->nombre}: {$teclado->conDescuento(20)}";`,
      java: `record Producto(String nombre, int precio) {
    int conDescuento(int porcentaje) {
        return precio * (100 - porcentaje) / 100;
    }
}

var teclado = new Producto("Teclado", 100);
System.out.println(teclado.nombre() + ": " + teclado.conDescuento(20));`,
      javascript: `class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre
    this.precio = precio
  }

  conDescuento(porcentaje) {
    return this.precio * (100 - porcentaje) / 100
  }
}

const teclado = new Producto("Teclado", 100)
console.log(teclado.nombre + ": " + teclado.conDescuento(20))`,
      go: `type Producto struct {
    Nombre string
    Precio int
}

func (p Producto) ConDescuento(porcentaje int) int {
    return p.Precio * (100 - porcentaje) / 100
}

teclado := Producto{Nombre: "Teclado", Precio: 100}
fmt.Printf("%s: %d\\n", teclado.Nombre, teclado.ConDescuento(20))`,
      csharp: `var teclado = new Producto("Teclado", 100);
Console.WriteLine($"{teclado.Nombre}: {teclado.ConDescuento(20)}");

record Producto(string Nombre, int Precio) {
    public int ConDescuento(int porcentaje) {
        return Precio * (100 - porcentaje) / 100;
    }
}`,
      ruby: `class Producto
  attr_reader :nombre, :precio

  def initialize(nombre, precio)
    @nombre = nombre
    @precio = precio
  end

  def con_descuento(porcentaje)
    precio * (100 - porcentaje) / 100
  end
end

teclado = Producto.new("Teclado", 100)
puts "#{teclado.nombre}: #{teclado.con_descuento(20)}"`,
      rust: `struct Producto {
    nombre: String,
    precio: u32,
}

impl Producto {
    fn con_descuento(&self, porcentaje: u32) -> u32 {
        self.precio * (100 - porcentaje) / 100
    }
}

let teclado = Producto { nombre: String::from("Teclado"), precio: 100 };
println!("{}: {}", teclado.nombre, teclado.con_descuento(20));`,
      kotlin: `class Producto(val nombre: String, val precio: Int) {
    fun conDescuento(porcentaje: Int): Int {
        return precio * (100 - porcentaje) / 100
    }
}

val teclado = Producto("Teclado", 100)
println("\${teclado.nombre}: \${teclado.conDescuento(20)}")`,
      output: sameOutput('Teclado: 80'),
      common: 'La idea es la misma en todos: juntar los datos (nombre, precio) con las operaciones que trabajan sobre ellos, y usar el punto para acceder: objeto.metodo().',
      differences: `• Go y Rust no tienen clases ni herencia: definen un struct con los datos y le añaden métodos aparte. Para reutilizar código usan composición, interfaces (Go) y traits (Rust).
• Los demás tienen clases con herencia, y Java, C# y Kotlin ofrecen formas cortas para clases que solo guardan datos (record, data class).
• El objeto actual se nombra self en Python y Rust (y hay que escribirlo como parámetro), $this en PHP, this en Java, JavaScript, C# y Kotlin, y @atributo en Ruby.
• Crear un objeto lleva new en PHP, Java, JavaScript y C#; Python y Kotlin llaman a la clase como si fuera una función; Ruby usa Producto.new.
• Visibilidad: palabras public y private en PHP, Java, C# y Kotlin; en Go es pública si el nombre empieza con mayúscula; en Python es solo una convención (_nombre).
• En PHP el acceso es con -> en lugar de punto.`,
    },
    {
      title: 'Cuando no hay valor: null, nil, None y Option',
      code: true,
      note: NOTE,
      python: `usuarios = {1: "Ana"}
nombre = usuarios.get(2)
print(nombre if nombre is not None else "Invitado")`,
      php: `$usuarios = [1 => "Ana"];
$nombre = $usuarios[2] ?? null;
echo $nombre ?? "Invitado";`,
      java: `Map<Integer, String> usuarios = Map.of(1, "Ana");
Optional<String> nombre = Optional.ofNullable(usuarios.get(2));
System.out.println(nombre.orElse("Invitado"));`,
      javascript: `const usuarios = new Map([[1, "Ana"]])
const nombre = usuarios.get(2)
console.log(nombre ?? "Invitado")`,
      go: `usuarios := map[int]string{1: "Ana"}
nombre, existe := usuarios[2]
if !existe {
    nombre = "Invitado"
}
fmt.Println(nombre)`,
      csharp: `var usuarios = new Dictionary<int, string> { [1] = "Ana" };
string? nombre = usuarios.GetValueOrDefault(2);
Console.WriteLine(nombre ?? "Invitado");`,
      ruby: `usuarios = { 1 => "Ana" }
nombre = usuarios[2]
puts nombre || "Invitado"`,
      rust: `let usuarios = HashMap::from([(1, "Ana")]);
let nombre = usuarios.get(&2).copied().unwrap_or("Invitado");
println!("{nombre}");`,
      kotlin: `val usuarios = mapOf(1 to "Ana")
val nombre: String? = usuarios[2]
println(nombre ?: "Invitado")`,
      output: sameOutput('Invitado'),
      common: 'Todos necesitan una forma de decir "aquí no hay nada" (por ejemplo, un usuario que no existe) y una forma corta de poner un valor de reemplazo.',
      differences: `• El "nada" se llama None en Python, null en PHP, Java, JavaScript, C# y Kotlin, nil en Go y Ruby. JavaScript además tiene undefined.
• Rust no tiene null: usa el tipo Option, que es Some(valor) o None, y el compilador te obliga a tratar los dos casos.
• Kotlin y C# marcan en el tipo si algo puede ser nulo (String?) y avisan al compilar si lo usas sin comprobar. En Java se recomienda Optional, pero el null sigue existiendo y provoca el famoso NullPointerException.
• El operador de reemplazo: ?? en PHP, JavaScript y C#; ?: en Kotlin; || en Ruby; or en Python (cuidado: or y || también reemplazan 0 y el texto vacío).`,
    },
    {
      title: 'Manejo de errores',
      code: true,
      note: NOTE,
      python: `def dividir(a, b):
    if b == 0:
        raise ValueError("no se puede dividir entre cero")
    return a // b

try:
    print(dividir(10, 0))
except ValueError as error:
    print(f"Error: {error}")`,
      php: `function dividir(int $a, int $b): int {
    if ($b === 0) {
        throw new InvalidArgumentException("no se puede dividir entre cero");
    }
    return intdiv($a, $b);
}

try {
    echo dividir(10, 0);
} catch (InvalidArgumentException $error) {
    echo "Error: ", $error->getMessage();
}`,
      java: `static int dividir(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("no se puede dividir entre cero");
    }
    return a / b;
}

try {
    System.out.println(dividir(10, 0));
} catch (IllegalArgumentException error) {
    System.out.println("Error: " + error.getMessage());
}`,
      javascript: `function dividir(a, b) {
  if (b === 0) {
    throw new Error("no se puede dividir entre cero")
  }
  return a / b
}

try {
  console.log(dividir(10, 0))
} catch (error) {
  console.log("Error: " + error.message)
}`,
      go: `func dividir(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("no se puede dividir entre cero")
    }
    return a / b, nil
}

resultado, err := dividir(10, 0)
if err != nil {
    fmt.Println("Error:", err)
    return
}
fmt.Println(resultado)`,
      csharp: `int Dividir(int a, int b) {
    if (b == 0) {
        throw new ArgumentException("no se puede dividir entre cero");
    }
    return a / b;
}

try {
    Console.WriteLine(Dividir(10, 0));
} catch (ArgumentException error) {
    Console.WriteLine($"Error: {error.Message}");
}`,
      ruby: `def dividir(a, b)
  raise ArgumentError, "no se puede dividir entre cero" if b.zero?
  a / b
end

begin
  puts dividir(10, 0)
rescue ArgumentError => error
  puts "Error: #{error.message}"
end`,
      rust: `fn dividir(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err(String::from("no se puede dividir entre cero"));
    }
    Ok(a / b)
}

match dividir(10, 0) {
    Ok(resultado) => println!("{resultado}"),
    Err(error) => println!("Error: {error}"),
}`,
      kotlin: `fun dividir(a: Int, b: Int): Int {
    require(b != 0) { "no se puede dividir entre cero" }
    return a / b
}

try {
    println(dividir(10, 0))
} catch (error: IllegalArgumentException) {
    println("Error: \${error.message}")
}`,
      output: sameOutput('Error: no se puede dividir entre cero'),
      common: 'En todos, la función que detecta el problema lo avisa con un mensaje y quien la llamó decide qué hacer. El programa no se cae si el error se atiende.',
      differences: `• Hay dos familias. Excepciones: Python, PHP, Java, JavaScript, C#, Ruby y Kotlin lanzan el error (throw o raise) y lo atrapan más arriba con try/catch (try/except en Python, begin/rescue en Ruby).
• Errores como valores: Go devuelve el error como segundo resultado y se revisa con if err != nil; Rust devuelve un Result que es Ok o Err y se abre con match o con el operador ?.
• Con excepciones puedes olvidarte de atrapar un error y enterarte en producción; en Go y Rust el error está a la vista en la firma de la función.
• Java distingue excepciones comprobadas, que el compilador obliga a atrapar o declarar con throws. Kotlin y C# no las tienen.
• Sin la validación, dividir entre cero tampoco se comporta igual: en JavaScript 10 / 0 da Infinity en lugar de fallar.`,
    },
    {
      title: 'Transformar colecciones: filtrar, mapear y sumar',
      code: true,
      note: NOTE,
      python: `precios = [10, 25, 40]
total = sum(p * 2 for p in precios if p > 15)
print(total)`,
      php: `$precios = [10, 25, 40];
$caros = array_filter($precios, fn($p) => $p > 15);
$dobles = array_map(fn($p) => $p * 2, $caros);
echo array_sum($dobles);`,
      java: `List<Integer> precios = List.of(10, 25, 40);
int total = precios.stream()
    .filter(p -> p > 15)
    .mapToInt(p -> p * 2)
    .sum();
System.out.println(total);`,
      javascript: `const precios = [10, 25, 40]
const total = precios
  .filter((p) => p > 15)
  .map((p) => p * 2)
  .reduce((suma, p) => suma + p, 0)
console.log(total)`,
      go: `precios := []int{10, 25, 40}
total := 0
for _, p := range precios {
    if p > 15 {
        total += p * 2
    }
}
fmt.Println(total)`,
      csharp: `var precios = new[] { 10, 25, 40 };
var total = precios
    .Where(p => p > 15)
    .Select(p => p * 2)
    .Sum();
Console.WriteLine(total);`,
      ruby: `precios = [10, 25, 40]
total = precios.select { |p| p > 15 }.map { |p| p * 2 }.sum
puts total`,
      rust: `let precios = vec![10, 25, 40];
let total: i32 = precios.iter()
    .filter(|p| **p > 15)
    .map(|p| p * 2)
    .sum();
println!("{total}");`,
      kotlin: `val precios = listOf(10, 25, 40)
val total = precios
    .filter { it > 15 }
    .map { it * 2 }
    .sum()
println(total)`,
      output: sameOutput('130'),
      common: 'Las tres operaciones son universales: filtrar (quedarse con algunos), mapear (transformar cada uno) y reducir (juntarlos en un solo resultado). Casi todos permiten pasar una función anónima corta como argumento.',
      differences: `• Los nombres cambian: filter/map en Java, JavaScript, Rust y Kotlin; Where/Select en C# (LINQ); select/map en Ruby; array_filter/array_map en PHP.
• Python prefiere las comprensiones: la condición y la transformación se escriben dentro de una sola expresión.
• Go es la excepción a propósito: su estilo es escribir el bucle for de forma explícita.
• La función anónima se escribe distinto: lambda en Python, fn() => en PHP, -> en Java, => en JavaScript y C#, { |p| } en Ruby, |p| en Rust y { it } en Kotlin.
• En Java y Rust hay que pedir primero el flujo (.stream(), .iter()) y son perezosos: no calculan nada hasta la operación final.`,
    },
    {
      title: 'Convertir datos a JSON',
      code: true,
      note: NOTE,
      python: `import json

usuario = {"nombre": "Ana", "edad": 25}
print(json.dumps(usuario))`,
      php: `$usuario = ["nombre" => "Ana", "edad" => 25];
echo json_encode($usuario);`,
      java: `// Jackson (biblioteca externa)
record Usuario(String nombre, int edad) {}

var json = new ObjectMapper().writeValueAsString(new Usuario("Ana", 25));
System.out.println(json);`,
      javascript: `const usuario = { nombre: "Ana", edad: 25 }
console.log(JSON.stringify(usuario))`,
      go: `type Usuario struct {
    Nombre string \`json:"nombre"\`
    Edad   int    \`json:"edad"\`
}

datos, _ := json.Marshal(Usuario{Nombre: "Ana", Edad: 25})
fmt.Println(string(datos))`,
      csharp: `using System.Text.Json;

var usuario = new { nombre = "Ana", edad = 25 };
Console.WriteLine(JsonSerializer.Serialize(usuario));`,
      ruby: `require "json"

usuario = { nombre: "Ana", edad: 25 }
puts usuario.to_json`,
      rust: `// serde y serde_json (bibliotecas externas)
#[derive(Serialize)]
struct Usuario {
    nombre: String,
    edad: u32,
}

let usuario = Usuario { nombre: String::from("Ana"), edad: 25 };
println!("{}", serde_json::to_string(&usuario).unwrap());`,
      kotlin: `// kotlinx.serialization (biblioteca oficial aparte)
@Serializable
data class Usuario(val nombre: String, val edad: Int)

println(Json.encodeToString(Usuario("Ana", 25)))`,
      output: {
        ...sameOutput('{"nombre":"Ana","edad":25}'),
        python: '{"nombre": "Ana", "edad": 25}',
      },
      common: 'JSON es el idioma común del backend: da igual en qué lenguaje esté escrita una API, la respuesta que sale es el mismo texto. Todos convierten sus datos a JSON con una sola llamada.',
      differences: `• Viene incluido en Python, PHP, JavaScript, Go, C# y Ruby. En Java, Rust y Kotlin se añade una biblioteca (Jackson, serde, kotlinx.serialization).
• Los dinámicos convierten directamente un diccionario; los estáticos suelen definir antes un tipo con los campos, y a cambio validan la forma de los datos al leerlos.
• Go necesita etiquetas para elegir el nombre de cada campo, porque los campos públicos empiezan con mayúscula.
• Detalle visible en la salida: Python añade un espacio después de cada dos puntos y cada coma; los demás generan el texto compacto.`,
    },
    {
      title: 'Concurrencia: hacer dos cosas a la vez',
      code: true,
      note: 'JavaScript y PHP se ejecutan en el navegador; en los demás se muestra la salida esperada.',
      fixed: ['python'],
      python: `import asyncio

async def doblar(n):
    await asyncio.sleep(0.1)
    return n * 2

async def main():
    a, b = await asyncio.gather(doblar(1), doblar(2))
    print(a, b)

asyncio.run(main())`,
      php: `// PHP atiende cada petición en un proceso aparte:
// la concurrencia la pone el servidor (PHP-FPM), no tu código.
function doblar(int $n): int {
    return $n * 2;
}

echo doblar(1), " ", doblar(2);`,
      java: `static int doblar(int n) {
    return n * 2;
}

var a = CompletableFuture.supplyAsync(() -> doblar(1));
var b = CompletableFuture.supplyAsync(() -> doblar(2));
System.out.println(a.join() + " " + b.join());`,
      javascript: `async function doblar(n) {
  await new Promise((listo) => setTimeout(listo, 100))
  return n * 2
}

const [a, b] = await Promise.all([doblar(1), doblar(2)])
console.log(a, b)`,
      go: `func doblar(n int, canal chan int) {
    canal <- n * 2
}

a, b := make(chan int), make(chan int)
go doblar(1, a)
go doblar(2, b)
fmt.Println(<-a, <-b)`,
      csharp: `async Task<int> Doblar(int n) {
    await Task.Delay(100);
    return n * 2;
}

var resultados = await Task.WhenAll(Doblar(1), Doblar(2));
Console.WriteLine($"{resultados[0]} {resultados[1]}");`,
      ruby: `def doblar(n)
  n * 2
end

hilos = [1, 2].map { |n| Thread.new { doblar(n) } }
puts hilos.map(&:value).join(" ")`,
      rust: `fn doblar(n: i32) -> i32 {
    n * 2
}

let a = thread::spawn(|| doblar(1));
let b = thread::spawn(|| doblar(2));
println!("{} {}", a.join().unwrap(), b.join().unwrap());`,
      kotlin: `suspend fun doblar(n: Int): Int {
    delay(100)
    return n * 2
}

runBlocking {
    val a = async { doblar(1) }
    val b = async { doblar(2) }
    println("\${a.await()} \${b.await()}")
}`,
      output: sameOutput('2 4'),
      common: 'Un servidor atiende a muchos usuarios a la vez, y casi todo su tiempo se va esperando (a la base de datos, a otra API). Todos buscan lo mismo: aprovechar esa espera para avanzar con otra tarea y luego reunir los resultados.',
      differences: `• async/await sobre un bucle de eventos: JavaScript (un solo hilo), Python (asyncio) y C# (Task). Kotlin usa corrutinas, que son la misma idea.
• Go tiene las goroutines: con la palabra go lanzas una tarea muy ligera, y se comunican por canales. Es su punto más fuerte.
• Hilos del sistema: Java (hoy también hilos virtuales, muy baratos), Rust y Ruby. Rust comprueba al compilar que dos hilos no modifiquen el mismo dato a la vez.
• Paralelismo real limitado: Python y Ruby tienen un candado global (GIL) que deja ejecutar un solo hilo de código a la vez; sirven bien para esperas, no para cálculo en paralelo.
• PHP es el caso aparte: cada petición vive en su propio proceso y no comparte nada con las demás, lo que lo hace muy simple de razonar.`,
    },
    {
      title: 'Paquetes y herramientas',
      python: 'pip instala paquetes desde PyPI y venv aísla los de cada proyecto. Las dependencias se anotan en requirements.txt o pyproject.toml. Herramientas modernas como uv o Poetry lo hacen todo en una.',
      php: 'Composer instala paquetes desde Packagist y los guarda en la carpeta vendor. Las dependencias se anotan en composer.json.',
      java: 'Maven (pom.xml) y Gradle (build.gradle) descargan las bibliotecas desde Maven Central, compilan, prueban y empaquetan el proyecto en un .jar.',
      javascript: 'npm viene con Node.js: instala paquetes desde el registro de npm en la carpeta node_modules y anota las dependencias en package.json. Alternativas: pnpm y yarn.',
      go: 'Todo viene en el comando go: go mod init crea go.mod, go get añade dependencias, go build compila, go test prueba y go fmt da formato. No hay que instalar nada más.',
      csharp: 'El comando dotnet crea, compila, prueba y publica. Los paquetes se instalan desde NuGet y se anotan en el archivo .csproj.',
      ruby: 'Las bibliotecas se llaman gemas y se instalan con gem. Bundler lee el archivo Gemfile e instala las versiones exactas de cada proyecto.',
      rust: 'Cargo lo hace todo: crea el proyecto, descarga paquetes (crates) desde crates.io según Cargo.toml, compila, prueba y da formato.',
      kotlin: 'Usa Gradle, casi siempre con el archivo build.gradle.kts escrito en el propio Kotlin, y las mismas bibliotecas de Maven Central que Java.',
      common: 'El esquema se repite en los nueve: un archivo de texto en la raíz del proyecto lista las dependencias, un gestor las descarga de un registro público y un archivo de bloqueo (lock) fija las versiones exactas para que todos instalen lo mismo.',
      differences: `• Herramienta oficial única que hace todo (crear, compilar, probar, formatear): Go, Rust y C#.
• Varias herramientas que conviven y hay que elegir: Python (pip, Poetry, uv), JavaScript (npm, pnpm, yarn) y Java (Maven o Gradle).
• Las dependencias se guardan dentro del proyecto en PHP (vendor) y JavaScript (node_modules); en una caché compartida en Java, Go, Rust y C#.
• Python necesita un entorno virtual por proyecto para no mezclar versiones; en los demás el aislamiento viene resuelto.`,
    },
    {
      title: 'Un servidor web mínimo',
      code: true,
      fixed: ['python', 'php', 'javascript'],
      python: `from http.server import BaseHTTPRequestHandler, HTTPServer

class Manejador(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write("Hola desde Python".encode())

HTTPServer(("", 8000), Manejador).serve_forever()`,
      php: `<?php
// index.php
// Se inicia con: php -S localhost:8000
echo "Hola desde PHP";`,
      java: `var servidor = HttpServer.create(new InetSocketAddress(8000), 0);
servidor.createContext("/", peticion -> {
    byte[] cuerpo = "Hola desde Java".getBytes();
    peticion.sendResponseHeaders(200, cuerpo.length);
    peticion.getResponseBody().write(cuerpo);
    peticion.close();
});
servidor.start();`,
      javascript: `import { createServer } from "node:http"

createServer((peticion, respuesta) => {
  respuesta.end("Hola desde Node.js")
}).listen(8000)`,
      go: `http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hola desde Go")
})
http.ListenAndServe(":8000", nil)`,
      csharp: `// ASP.NET Core
var app = WebApplication.Create(args);
app.MapGet("/", () => "Hola desde C#");
app.Run("http://localhost:8000");`,
      ruby: `# Sinatra (gema externa)
require "sinatra"

set :port, 8000

get "/" do
  "Hola desde Ruby"
end`,
      rust: `// axum y tokio (bibliotecas externas)
#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "Hola desde Rust" }));
    let escucha = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(escucha, app).await.unwrap();
}`,
      kotlin: `// Ktor (framework de JetBrains)
fun main() {
    embeddedServer(Netty, port = 8000) {
        routing {
            get("/") { call.respondText("Hola desde Kotlin") }
        }
    }.start(wait = true)
}`,
      common: 'Los nueve hacen lo mismo: escuchan en un puerto (aquí el 8000), asocian una ruta ("/") con una función y esa función devuelve la respuesta. Al abrir http://localhost:8000 verías el saludo. Esta es la base sobre la que trabaja cualquier framework.',
      differences: `• Servidor HTTP incluido en el lenguaje: Go (listo para producción), Node.js, Python y Java (los dos últimos, pensados para pruebas).
• Necesitan un framework o biblioteca: C# (ASP.NET Core, oficial), Ruby (Sinatra o Rails), Rust (axum) y Kotlin (Ktor o Spring Boot).
• PHP funciona al revés: tu archivo no arranca ningún servidor ni tiene rutas; el servidor web lo ejecuta entero en cada petición y lo que imprime es la respuesta.
• En el trabajo real casi nadie usa el servidor mínimo: se elige un framework como Django o FastAPI, Laravel, Spring Boot, Express o NestJS, Gin, ASP.NET Core, Rails, Axum o Ktor.`,
    },
  ],
}

// El orden de values sigue el de languages. null: no aplica y no se muestra.
export const backendComparison = {
  languages: backendLanguages.map(({ label }) => label),
  rows: [
    {
      label: 'Cómo se ejecuta',
      values: [
        'Interpretado (CPython)',
        'Interpretado en cada petición web',
        'Compilado a bytecode, corre en la JVM',
        'Compilado con JIT por el motor V8',
        'Compilado a un binario nativo',
        'Compilado a IL, corre en .NET',
        'Interpretado (CRuby)',
        'Compilado a un binario nativo',
        'Compilado a bytecode, corre en la JVM',
      ],
    },
    {
      label: 'Tipado',
      values: [
        'Dinámico y fuerte; anotaciones opcionales',
        'Dinámico; tipos opcionales en funciones',
        'Estático',
        'Dinámico y débil; TypeScript añade tipos',
        'Estático',
        'Estático',
        'Dinámico y fuerte',
        'Estático y muy estricto',
        'Estático, con seguridad ante nulos',
      ],
    },
    {
      label: 'Gestión de memoria',
      values: [
        'Automática (recolector de basura)',
        'Automática; se libera al terminar la petición',
        'Automática (recolector de basura)',
        'Automática (recolector de basura)',
        'Automática (recolector de basura)',
        'Automática (recolector de basura)',
        'Automática (recolector de basura)',
        'Sin recolector: el compilador aplica las reglas de ownership',
        'Automática (recolector de basura)',
      ],
    },
    {
      label: 'Concurrencia',
      values: [
        'asyncio e hilos, limitados por el GIL',
        'Un proceso por petición',
        'Hilos e hilos virtuales',
        'Un hilo con bucle de eventos y async/await',
        'Goroutines y canales',
        'async/await con Task',
        'Hilos, limitados por el GVL',
        'Hilos y async, verificados al compilar',
        'Corrutinas',
      ],
    },
    {
      label: 'Curva de aprendizaje',
      values: ['Baja', 'Baja', 'Media', 'Baja', 'Baja a media', 'Media', 'Baja', 'Alta', 'Media'],
    },
    {
      label: 'Rendimiento típico',
      values: ['Medio', 'Medio', 'Alto', 'Medio a alto', 'Alto', 'Alto', 'Medio', 'Muy alto', 'Alto'],
    },
    {
      label: 'Frameworks frecuentes',
      values: [
        'Django, Flask, FastAPI',
        'Laravel, Symfony, WordPress',
        'Spring Boot, Quarkus',
        'Express, NestJS, Fastify',
        'Gin, Echo, biblioteca estándar',
        'ASP.NET Core',
        'Ruby on Rails, Sinatra',
        'Axum, Actix Web',
        'Ktor, Spring Boot',
      ],
    },
    {
      label: 'Gestor de paquetes',
      values: ['pip', 'Composer', 'Maven o Gradle', 'npm', 'go mod', 'NuGet', 'Bundler', 'Cargo', 'Gradle'],
    },
    {
      label: 'Usado en un proyecto real de Juan',
      values: [
        'SISGAT: cobranza municipal con Django y PostgreSQL',
        'Sistema de Recaudación Municipal (SRM), Municipalidad de Lucanas Puquio',
        'Módulo de Kardex con microservicios en Spring Boot',
        null, null, null, null, null, null,
      ],
    },
    {
      label: 'Cuándo elegirlo',
      values: [
        'Prototipos rápidos, APIs, automatización, ciencia de datos e IA',
        'Sitios web tradicionales, CMS y hosting compartido',
        'Sistemas grandes, banca, apps Android, equipos numerosos',
        'APIs y tiempo real cuando el equipo ya usa JavaScript en el frontend',
        'Microservicios, herramientas de nube y servicios con mucha concurrencia',
        'Sistemas empresariales y entornos Microsoft o Azure',
        'Startups y productos web que deben salir rápido',
        'Servicios donde el rendimiento y la seguridad de memoria son críticos',
        'Backend moderno sobre la JVM y apps Android',
      ],
    },
  ],
}
