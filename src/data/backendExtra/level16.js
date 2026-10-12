// Nivel 16 · Ejercicios: resuelve y ejecuta
// Los ejercicios numéricos generados ya traen todos los lenguajes desde exerciseBank.js
const r = String.raw
const b = '`'
const d = '$'

const JS_ENTRADA = r`import { createInterface } from 'node:readline/promises'

const consola = createInterface({ input: process.stdin, output: process.stdout })`

const RUST_LEER = r`fn leer(mensaje: &str) -> String {
    print!("{mensaje}");
    io::stdout().flush().unwrap();
    let mut texto = String::new();
    io::stdin().read_line(&mut texto).unwrap();
    texto.trim().to_string()
}`

export default {
  '¿Número par o impar?': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
const numero = Number(await consola.question('Número: '))
consola.close()

if (numero % 2 === 0) {
  console.log(${b}${d}{numero} es par${b})
} else {
  console.log(${b}${d}{numero} es impar${b})
}`,
    go: r`var numero int
fmt.Print("Número: ")
fmt.Scan(&numero)

if numero%2 == 0 {
    fmt.Println(numero, "es par")
} else {
    fmt.Println(numero, "es impar")
}`,
    csharp: r`Console.Write("Número: ");
int numero = int.Parse(Console.ReadLine());

if (numero % 2 == 0) {
    Console.WriteLine($"{numero} es par");
} else {
    Console.WriteLine($"{numero} es impar");
}`,
    ruby: r`print 'Número: '
numero = gets.to_i

if numero.even?
  puts "#{numero} es par"
else
  puts "#{numero} es impar"
end`,
    rust: r`${RUST_LEER}

let numero: i32 = leer("Número: ").parse().unwrap();

if numero % 2 == 0 {
    println!("{numero} es par");
} else {
    println!("{numero} es impar");
}`,
    kotlin: r`print("Número: ")
val numero = readln().toInt()

if (numero % 2 == 0) {
    println("$numero es par")
} else {
    println("$numero es impar")
}`,
  },
  'Múltiplo de 3 y par': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
const numero = Number(await consola.question('Número: '))
consola.close()

if (numero % 3 === 0 && numero % 2 === 0) {
  console.log(${b}${d}{numero} cumple ambas condiciones${b})
} else {
  console.log(${b}${d}{numero} no cumple ambas condiciones${b})
}`,
    go: r`var numero int
fmt.Print("Número: ")
fmt.Scan(&numero)

if numero%3 == 0 && numero%2 == 0 {
    fmt.Println(numero, "cumple ambas condiciones")
} else {
    fmt.Println(numero, "no cumple ambas condiciones")
}`,
    csharp: r`Console.Write("Número: ");
int numero = int.Parse(Console.ReadLine());

if (numero % 3 == 0 && numero % 2 == 0) {
    Console.WriteLine($"{numero} cumple ambas condiciones");
} else {
    Console.WriteLine($"{numero} no cumple ambas condiciones");
}`,
    ruby: r`print 'Número: '
numero = gets.to_i

if numero % 3 == 0 && numero.even?
  puts "#{numero} cumple ambas condiciones"
else
  puts "#{numero} no cumple ambas condiciones"
end`,
    rust: r`${RUST_LEER}

let numero: i32 = leer("Número: ").parse().unwrap();

if numero % 3 == 0 && numero % 2 == 0 {
    println!("{numero} cumple ambas condiciones");
} else {
    println!("{numero} no cumple ambas condiciones");
}`,
    kotlin: r`print("Número: ")
val numero = readln().toInt()

if (numero % 3 == 0 && numero % 2 == 0) {
    println("$numero cumple ambas condiciones")
} else {
    println("$numero no cumple ambas condiciones")
}`,
  },
  'Comprobar si un número es divisor': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
const divisor = Number(await consola.question('Divisor: '))
const numero = Number(await consola.question('Número: '))
consola.close()

if (divisor === 0) {
  console.log('El divisor no puede ser cero')
} else if (numero % divisor === 0) {
  console.log(${b}${d}{divisor} divide a ${d}{numero}${b})
} else {
  console.log(${b}${d}{divisor} no divide a ${d}{numero}${b})
}`,
    go: r`var divisor, numero int
fmt.Print("Divisor: ")
fmt.Scan(&divisor)
fmt.Print("Número: ")
fmt.Scan(&numero)

if divisor == 0 {
    fmt.Println("El divisor no puede ser cero")
} else if numero%divisor == 0 {
    fmt.Println(divisor, "divide a", numero)
} else {
    fmt.Println(divisor, "no divide a", numero)
}`,
    csharp: r`Console.Write("Divisor: ");
int divisor = int.Parse(Console.ReadLine());
Console.Write("Número: ");
int numero = int.Parse(Console.ReadLine());

if (divisor == 0) {
    Console.WriteLine("El divisor no puede ser cero");
} else if (numero % divisor == 0) {
    Console.WriteLine($"{divisor} divide a {numero}");
} else {
    Console.WriteLine($"{divisor} no divide a {numero}");
}`,
    ruby: r`print 'Divisor: '
divisor = gets.to_i
print 'Número: '
numero = gets.to_i

if divisor == 0
  puts 'El divisor no puede ser cero'
elsif numero % divisor == 0
  puts "#{divisor} divide a #{numero}"
else
  puts "#{divisor} no divide a #{numero}"
end`,
    rust: r`${RUST_LEER}

let divisor: i32 = leer("Divisor: ").parse().unwrap();
let numero: i32 = leer("Número: ").parse().unwrap();

if divisor == 0 {
    println!("El divisor no puede ser cero");
} else if numero % divisor == 0 {
    println!("{divisor} divide a {numero}");
} else {
    println!("{divisor} no divide a {numero}");
}`,
    kotlin: r`print("Divisor: ")
val divisor = readln().toInt()
print("Número: ")
val numero = readln().toInt()

if (divisor == 0) {
    println("El divisor no puede ser cero")
} else if (numero % divisor == 0) {
    println("$divisor divide a $numero")
} else {
    println("$divisor no divide a $numero")
}`,
  },
  '¿El año es bisiesto?': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
const anio = Number(await consola.question('Año: '))
consola.close()

const esBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0
if (esBisiesto) {
  console.log(${b}${d}{anio} es bisiesto${b})
} else {
  console.log(${b}${d}{anio} no es bisiesto${b})
}`,
    go: r`var anio int
fmt.Print("Año: ")
fmt.Scan(&anio)

esBisiesto := (anio%4 == 0 && anio%100 != 0) || anio%400 == 0
if esBisiesto {
    fmt.Println(anio, "es bisiesto")
} else {
    fmt.Println(anio, "no es bisiesto")
}`,
    csharp: r`Console.Write("Año: ");
int anio = int.Parse(Console.ReadLine());

bool esBisiesto = (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0;
if (esBisiesto) {
    Console.WriteLine($"{anio} es bisiesto");
} else {
    Console.WriteLine($"{anio} no es bisiesto");
}`,
    ruby: r`print 'Año: '
anio = gets.to_i

es_bisiesto = (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0
if es_bisiesto
  puts "#{anio} es bisiesto"
else
  puts "#{anio} no es bisiesto"
end`,
    rust: r`${RUST_LEER}

let anio: i32 = leer("Año: ").parse().unwrap();

let es_bisiesto = (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0;
if es_bisiesto {
    println!("{anio} es bisiesto");
} else {
    println!("{anio} no es bisiesto");
}`,
    kotlin: r`print("Año: ")
val anio = readln().toInt()

val esBisiesto = (anio % 4 == 0 && anio % 100 != 0) || anio % 400 == 0
if (esBisiesto) {
    println("$anio es bisiesto")
} else {
    println("$anio no es bisiesto")
}`,
  },
  'Máximo común divisor': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
let a = Number(await consola.question('Primer número: '))
let b = Number(await consola.question('Segundo número: '))
consola.close()

while (b !== 0) {
  const resto = a % b
  a = b
  b = resto
}
console.log(${b}MCD: ${d}{a}${b})`,
    go: r`var a, b int
fmt.Print("Primer número: ")
fmt.Scan(&a)
fmt.Print("Segundo número: ")
fmt.Scan(&b)

for b != 0 {
    a, b = b, a%b
}
fmt.Println("MCD:", a)`,
    csharp: r`Console.Write("Primer número: ");
int a = int.Parse(Console.ReadLine());
Console.Write("Segundo número: ");
int b = int.Parse(Console.ReadLine());

while (b != 0) {
    (a, b) = (b, a % b);
}
Console.WriteLine($"MCD: {a}");`,
    ruby: r`print 'Primer número: '
a = gets.to_i
print 'Segundo número: '
b = gets.to_i

while b != 0
  a, b = b, a % b
end
puts "MCD: #{a}"
# Ruby ya lo trae incluido: 48.gcd(18)`,
    rust: r`${RUST_LEER}

let mut a: u32 = leer("Primer número: ").parse().unwrap();
let mut b: u32 = leer("Segundo número: ").parse().unwrap();

while b != 0 {
    (a, b) = (b, a % b);
}
println!("MCD: {a}");`,
    kotlin: r`print("Primer número: ")
var a = readln().toInt()
print("Segundo número: ")
var b = readln().toInt()

while (b != 0) {
    val resto = a % b
    a = b
    b = resto
}
println("MCD: $a")`,
  },
  'FizzBuzz': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
const n = Number(await consola.question('Hasta: '))
consola.close()

for (let i = 1; i <= n; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz')
  } else if (i % 3 === 0) {
    console.log('Fizz')
  } else if (i % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(i)
  }
}`,
    go: r`var n int
fmt.Print("Hasta: ")
fmt.Scan(&n)

for i := 1; i <= n; i++ {
    switch {
    case i%15 == 0:
        fmt.Println("FizzBuzz")
    case i%3 == 0:
        fmt.Println("Fizz")
    case i%5 == 0:
        fmt.Println("Buzz")
    default:
        fmt.Println(i)
    }
}`,
    csharp: r`Console.Write("Hasta: ");
int n = int.Parse(Console.ReadLine());

for (int i = 1; i <= n; i++) {
    if (i % 15 == 0) {
        Console.WriteLine("FizzBuzz");
    } else if (i % 3 == 0) {
        Console.WriteLine("Fizz");
    } else if (i % 5 == 0) {
        Console.WriteLine("Buzz");
    } else {
        Console.WriteLine(i);
    }
}`,
    ruby: r`print 'Hasta: '
n = gets.to_i

(1..n).each do |i|
  if i % 15 == 0
    puts 'FizzBuzz'
  elsif i % 3 == 0
    puts 'Fizz'
  elsif i % 5 == 0
    puts 'Buzz'
  else
    puts i
  end
end`,
    rust: r`${RUST_LEER}

let n: u32 = leer("Hasta: ").parse().unwrap();

for i in 1..=n {
    match (i % 3, i % 5) {
        (0, 0) => println!("FizzBuzz"),
        (0, _) => println!("Fizz"),
        (_, 0) => println!("Buzz"),
        _ => println!("{i}"),
    }
}`,
    kotlin: r`print("Hasta: ")
val n = readln().toInt()

for (i in 1..n) {
    println(
        when {
            i % 15 == 0 -> "FizzBuzz"
            i % 3 == 0 -> "Fizz"
            i % 5 == 0 -> "Buzz"
            else -> i
        }
    )
}`,
  },
  'Promedio de notas': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}
const texto = await consola.question('Notas: ')
consola.close()

const notas = texto.split(',').map(Number)
const suma = notas.reduce((total, nota) => total + nota, 0)
console.log(${b}Cantidad: ${d}{notas.length}${b})
console.log(${b}Promedio: ${d}{(suma / notas.length).toFixed(1)}${b})
console.log(${b}Más alta: ${d}{Math.max(...notas)}${b})
console.log(${b}Más baja: ${d}{Math.min(...notas)}${b})`,
    go: r`var texto string
fmt.Print("Notas: ")
fmt.Scan(&texto)

var notas []int
suma := 0
for _, parte := range strings.Split(texto, ",") {
    nota, _ := strconv.Atoi(parte)
    notas = append(notas, nota)
    suma += nota
}

fmt.Println("Cantidad:", len(notas))
fmt.Printf("Promedio: %.1f\n", float64(suma)/float64(len(notas)))
fmt.Println("Más alta:", slices.Max(notas))
fmt.Println("Más baja:", slices.Min(notas))`,
    csharp: r`Console.Write("Notas: ");
string texto = Console.ReadLine();

int[] notas = texto.Split(',').Select(int.Parse).ToArray();
Console.WriteLine($"Cantidad: {notas.Length}");
Console.WriteLine($"Promedio: {notas.Average():F1}");
Console.WriteLine($"Más alta: {notas.Max()}");
Console.WriteLine($"Más baja: {notas.Min()}");`,
    ruby: r`print 'Notas: '
texto = gets.chomp

notas = texto.split(',').map(&:to_i)
puts "Cantidad: #{notas.size}"
puts format('Promedio: %.1f', notas.sum.to_f / notas.size)
puts "Más alta: #{notas.max}"
puts "Más baja: #{notas.min}"`,
    rust: r`${RUST_LEER}

let texto = leer("Notas: ");
let notas: Vec<i32> = texto.split(',').map(|nota| nota.trim().parse().unwrap()).collect();
let suma: i32 = notas.iter().sum();

println!("Cantidad: {}", notas.len());
println!("Promedio: {:.1}", suma as f64 / notas.len() as f64);
println!("Más alta: {}", notas.iter().max().unwrap());
println!("Más baja: {}", notas.iter().min().unwrap());`,
    kotlin: r`print("Notas: ")
val texto = readln()

val notas = texto.split(",").map { it.toInt() }
println("Cantidad: ${d}{notas.size}")
println("Promedio: %.1f".format(notas.average()))
println("Más alta: ${d}{notas.max()}")
println("Más baja: ${d}{notas.min()}")`,
  },
  'Validar una edad': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}

function leerEdad(texto) {
  const edad = Number(texto)
  // Number() no lanza errores: hay que comprobar el resultado
  if (texto.trim() === '' || !Number.isInteger(edad)) {
    throw new Error(${b}«${d}{texto}» no es un número entero${b})
  }
  if (edad < 0 || edad > 120) {
    throw new Error(${b}${d}{edad} está fuera del rango de 0 a 120${b})
  }
  return edad
}

const texto = await consola.question('Edad: ')
consola.close()
try {
  const edad = leerEdad(texto)
  console.log(${b}Edad válida: ${d}{edad} años${b})
} catch (error) {
  console.log(${b}Error: ${d}{error.message}${b})
}`,
    go: r`// En Go la función devuelve la edad y un error, en lugar de lanzar una excepción
func leerEdad(texto string) (int, error) {
    edad, err := strconv.Atoi(texto)
    if err != nil {
        return 0, fmt.Errorf("«%s» no es un número entero", texto)
    }
    if edad < 0 || edad > 120 {
        return 0, fmt.Errorf("%d está fuera del rango de 0 a 120", edad)
    }
    return edad, nil
}

var texto string
fmt.Print("Edad: ")
fmt.Scan(&texto)

edad, err := leerEdad(texto)
if err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Printf("Edad válida: %d años\n", edad)
}`,
    csharp: r`int LeerEdad(string texto) {
    if (!int.TryParse(texto, out int edad)) {
        throw new ArgumentException($"«{texto}» no es un número entero");
    }
    if (edad < 0 || edad > 120) {
        throw new ArgumentException($"{edad} está fuera del rango de 0 a 120");
    }
    return edad;
}

Console.Write("Edad: ");
string texto = Console.ReadLine();
try {
    int edad = LeerEdad(texto);
    Console.WriteLine($"Edad válida: {edad} años");
} catch (ArgumentException error) {
    Console.WriteLine($"Error: {error.Message}");
}`,
    ruby: r`def leer_edad(texto)
  begin
    edad = Integer(texto)
  rescue ArgumentError
    raise ArgumentError, "«#{texto}» no es un número entero"
  end
  raise ArgumentError, "#{edad} está fuera del rango de 0 a 120" unless (0..120).cover?(edad)
  edad
end

print 'Edad: '
texto = gets.chomp
begin
  edad = leer_edad(texto)
  puts "Edad válida: #{edad} años"
rescue ArgumentError => error
  puts "Error: #{error.message}"
end`,
    rust: r`${RUST_LEER}

// En Rust la función devuelve un Result, en lugar de lanzar una excepción
fn leer_edad(texto: &str) -> Result<u32, String> {
    let edad: i32 = texto.parse().map_err(|_| format!("«{texto}» no es un número entero"))?;
    if !(0..=120).contains(&edad) {
        return Err(format!("{edad} está fuera del rango de 0 a 120"));
    }
    Ok(edad as u32)
}

let texto = leer("Edad: ");
match leer_edad(&texto) {
    Ok(edad) => println!("Edad válida: {edad} años"),
    Err(error) => println!("Error: {error}"),
}`,
    kotlin: r`fun leerEdad(texto: String): Int {
    val edad = texto.toIntOrNull()
        ?: throw IllegalArgumentException("«$texto» no es un número entero")
    require(edad in 0..120) { "$edad está fuera del rango de 0 a 120" }
    return edad
}

print("Edad: ")
val texto = readln()
try {
    val edad = leerEdad(texto)
    println("Edad válida: $edad años")
} catch (error: IllegalArgumentException) {
    println("Error: ${d}{error.message}")
}`,
  },
  'Lista de tareas con una clase': {
    jsFixed: true,
    javascript: r`${JS_ENTRADA}

class ListaDeTareas {
  tareas = []

  agregar(texto) {
    this.tareas.push({ texto, hecha: false })
  }

  completar(numero) {
    this.tareas[numero - 1].hecha = true
  }

  mostrar() {
    for (const tarea of this.tareas) {
      console.log(${b}[${d}{tarea.hecha ? 'x' : ' '}] ${d}{tarea.texto}${b})
    }
    const pendientes = this.tareas.filter((tarea) => !tarea.hecha).length
    console.log(${b}Pendientes: ${d}{pendientes}${b})
  }
}

const lista = new ListaDeTareas()
lista.agregar('Estudiar Python')
lista.agregar('Practicar PHP')
lista.agregar('Repasar Java')
lista.completar(Number(await consola.question('Tarea completada: ')))
consola.close()
lista.mostrar()`,
    go: r`type Tarea struct {
    Texto string
    Hecha bool
}

type ListaDeTareas struct {
    tareas []Tarea
}

func (l *ListaDeTareas) Agregar(texto string) {
    l.tareas = append(l.tareas, Tarea{Texto: texto})
}

func (l *ListaDeTareas) Completar(numero int) {
    l.tareas[numero-1].Hecha = true
}

func (l *ListaDeTareas) Mostrar() {
    pendientes := 0
    for _, tarea := range l.tareas {
        marca := " "
        if tarea.Hecha {
            marca = "x"
        } else {
            pendientes++
        }
        fmt.Printf("[%s] %s\n", marca, tarea.Texto)
    }
    fmt.Println("Pendientes:", pendientes)
}

lista := ListaDeTareas{}
lista.Agregar("Estudiar Python")
lista.Agregar("Practicar PHP")
lista.Agregar("Repasar Java")

var numero int
fmt.Print("Tarea completada: ")
fmt.Scan(&numero)
lista.Completar(numero)
lista.Mostrar()`,
    csharp: r`var lista = new ListaDeTareas();
lista.Agregar("Estudiar Python");
lista.Agregar("Practicar PHP");
lista.Agregar("Repasar Java");
Console.Write("Tarea completada: ");
lista.Completar(int.Parse(Console.ReadLine()));
lista.Mostrar();

class Tarea {
    public string Texto = "";
    public bool Hecha;
}

class ListaDeTareas {
    private readonly List<Tarea> tareas = new();

    public void Agregar(string texto) {
        tareas.Add(new Tarea { Texto = texto });
    }

    public void Completar(int numero) {
        tareas[numero - 1].Hecha = true;
    }

    public void Mostrar() {
        foreach (var tarea in tareas) {
            Console.WriteLine($"[{(tarea.Hecha ? "x" : " ")}] {tarea.Texto}");
        }
        Console.WriteLine($"Pendientes: {tareas.Count(tarea => !tarea.Hecha)}");
    }
}`,
    ruby: r`class ListaDeTareas
  def initialize
    @tareas = []
  end

  def agregar(texto)
    @tareas << { texto: texto, hecha: false }
  end

  def completar(numero)
    @tareas[numero - 1][:hecha] = true
  end

  def mostrar
    @tareas.each do |tarea|
      marca = tarea[:hecha] ? 'x' : ' '
      puts "[#{marca}] #{tarea[:texto]}"
    end
    pendientes = @tareas.count { |tarea| !tarea[:hecha] }
    puts "Pendientes: #{pendientes}"
  end
end

lista = ListaDeTareas.new
lista.agregar('Estudiar Python')
lista.agregar('Practicar PHP')
lista.agregar('Repasar Java')
print 'Tarea completada: '
lista.completar(gets.to_i)
lista.mostrar`,
    rust: r`${RUST_LEER}

struct Tarea {
    texto: String,
    hecha: bool,
}

struct ListaDeTareas {
    tareas: Vec<Tarea>,
}

impl ListaDeTareas {
    fn agregar(&mut self, texto: &str) {
        self.tareas.push(Tarea { texto: texto.to_string(), hecha: false });
    }

    fn completar(&mut self, numero: usize) {
        self.tareas[numero - 1].hecha = true;
    }

    fn mostrar(&self) {
        for tarea in &self.tareas {
            println!("[{}] {}", if tarea.hecha { "x" } else { " " }, tarea.texto);
        }
        let pendientes = self.tareas.iter().filter(|tarea| !tarea.hecha).count();
        println!("Pendientes: {pendientes}");
    }
}

let mut lista = ListaDeTareas { tareas: Vec::new() };
lista.agregar("Estudiar Python");
lista.agregar("Practicar PHP");
lista.agregar("Repasar Java");
lista.completar(leer("Tarea completada: ").parse().unwrap());
lista.mostrar();`,
    kotlin: r`class Tarea(val texto: String, var hecha: Boolean = false)

class ListaDeTareas {
    private val tareas = mutableListOf<Tarea>()

    fun agregar(texto: String) {
        tareas.add(Tarea(texto))
    }

    fun completar(numero: Int) {
        tareas[numero - 1].hecha = true
    }

    fun mostrar() {
        for (tarea in tareas) {
            println("[${d}{if (tarea.hecha) "x" else " "}] ${d}{tarea.texto}")
        }
        println("Pendientes: ${d}{tareas.count { !it.hecha }}")
    }
}

val lista = ListaDeTareas()
lista.agregar("Estudiar Python")
lista.agregar("Practicar PHP")
lista.agregar("Repasar Java")
print("Tarea completada: ")
lista.completar(readln().toInt())
lista.mostrar()`,
  },
  'Fuente y atribución de los ejercicios': {
    javascript: 'Las soluciones de JavaScript son adaptaciones para este curso; el manual original contiene soluciones en Python.',
    go: 'Las soluciones de Go son adaptaciones para este curso; el manual original contiene soluciones en Python.',
    csharp: 'Las soluciones de C# son adaptaciones para este curso; el manual original contiene soluciones en Python.',
    ruby: 'Las soluciones de Ruby son adaptaciones para este curso; el manual original contiene soluciones en Python.',
    rust: 'Las soluciones de Rust son adaptaciones para este curso; el manual original contiene soluciones en Python.',
    kotlin: 'Las soluciones de Kotlin son adaptaciones para este curso; el manual original contiene soluciones en Python.',
  },
}
