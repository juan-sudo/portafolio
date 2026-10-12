// Nivel 4 · Más herramientas de control de flujo
const r = String.raw
const b = '`'
const d = '$'

const LORO = '-- Este loro no haría VOOM aunque le aplicaras cuatro millones voltios. ¡Está requetemuerto!'

export default {
  'La sentencia if': {
    jsFixed: true,
    javascript: r`import { createInterface } from "node:readline/promises"

const consola = createInterface({ input: process.stdin, output: process.stdout })
let x = Number(await consola.question("Escribe un número: "))
consola.close()

if (x < 0) {
  x = 0
  console.log("Era negativo, ahora es cero")
} else if (x === 0) {
  console.log("Cero")
} else if (x === 1) {
  console.log("Uno")
} else {
  console.log("Más")
}`,
    go: r`var x int
fmt.Print("Escribe un número: ")
fmt.Scan(&x)

if x < 0 {
    x = 0
    fmt.Println("Era negativo, ahora es cero")
} else if x == 0 {
    fmt.Println("Cero")
} else if x == 1 {
    fmt.Println("Uno")
} else {
    fmt.Println("Más")
}`,
    csharp: r`Console.Write("Escribe un número: ");
int x = int.Parse(Console.ReadLine());

if (x < 0) {
    x = 0;
    Console.WriteLine("Era negativo, ahora es cero");
} else if (x == 0) {
    Console.WriteLine("Cero");
} else if (x == 1) {
    Console.WriteLine("Uno");
} else {
    Console.WriteLine("Más");
}`,
    ruby: r`print "Escribe un número: "
x = gets.to_i

if x < 0
  x = 0
  puts "Era negativo, ahora es cero"
elsif x == 0
  puts "Cero"
elsif x == 1
  puts "Uno"
else
  puts "Más"
end`,
    rust: r`print!("Escribe un número: ");
io::stdout().flush().unwrap();
let mut entrada = String::new();
io::stdin().read_line(&mut entrada).unwrap();
let mut x: i32 = entrada.trim().parse().unwrap();

if x < 0 {
    x = 0;
    println!("Era negativo, ahora es cero");
} else if x == 0 {
    println!("Cero");
} else if x == 1 {
    println!("Uno");
} else {
    println!("Más");
}`,
    kotlin: r`print("Escribe un número: ")
var x = readln().toInt()

if (x < 0) {
    x = 0
    println("Era negativo, ahora es cero")
} else if (x == 0) {
    println("Cero")
} else if (x == 1) {
    println("Uno")
} else {
    println("Más")
}`,
  },
  'La sentencia for': {
    javascript: r`const palabras = ['gato', 'ventana', 'defenestrar']
for (const p of palabras) {
  console.log(p, p.length)
}`,
    go: r`palabras := []string{"gato", "ventana", "defenestrar"}
for _, p := range palabras {
    fmt.Println(p, len(p))
}`,
    csharp: r`string[] palabras = { "gato", "ventana", "defenestrar" };
foreach (var p in palabras) {
    Console.WriteLine($"{p} {p.Length}");
}`,
    ruby: r`palabras = ['gato', 'ventana', 'defenestrar']
palabras.each do |p|
  puts "#{p} #{p.length}"
end`,
    rust: r`let palabras = ["gato", "ventana", "defenestrar"];
for p in palabras {
    println!("{} {}", p, p.len());
}`,
    kotlin: r`val palabras = listOf("gato", "ventana", "defenestrar")
for (p in palabras) {
    println("$p ${d}{p.length}")
}`,
  },
  'Recorrer una colección y modificarla': {
    javascript: r`const usuarios = new Map([['Ana', 'activo'], ['Luis', 'inactivo'], ['Carla', 'activo']])

// Se recorre una copia para poder borrar del original
for (const [nombre, estado] of [...usuarios]) {
  if (estado === 'inactivo') {
    usuarios.delete(nombre)
  }
}

console.log(Object.fromEntries(usuarios))`,
    go: r`usuarios := map[string]string{"Ana": "activo", "Luis": "inactivo", "Carla": "activo"}

// En Go sí se puede borrar de un map mientras se recorre
for nombre, estado := range usuarios {
    if estado == "inactivo" {
        delete(usuarios, nombre)
    }
}

fmt.Println(usuarios)`,
    csharp: r`var usuarios = new Dictionary<string, string> {
    ["Ana"] = "activo", ["Luis"] = "inactivo", ["Carla"] = "activo",
};

// Se recorre una copia para poder borrar del original
foreach (var (nombre, estado) in usuarios.ToList()) {
    if (estado == "inactivo") {
        usuarios.Remove(nombre);
    }
}

Console.WriteLine(string.Join(", ", usuarios));`,
    ruby: r`usuarios = { 'Ana' => 'activo', 'Luis' => 'inactivo', 'Carla' => 'activo' }

# Se recorre una copia para poder borrar del original
usuarios.dup.each do |nombre, estado|
  usuarios.delete(nombre) if estado == 'inactivo'
end

p usuarios`,
    rust: r`let mut usuarios = BTreeMap::from([("Ana", "activo"), ("Luis", "inactivo"), ("Carla", "activo")]);

// El compilador no deja borrar mientras se recorre:
// retain conserva solo los que cumplen la condición
usuarios.retain(|_nombre, estado| *estado != "inactivo");

println!("{:?}", usuarios);`,
    kotlin: r`val usuarios = mutableMapOf("Ana" to "activo", "Luis" to "inactivo", "Carla" to "activo")

// Se recorre una copia para poder borrar del original
for ((nombre, estado) in usuarios.toMap()) {
    if (estado == "inactivo") {
        usuarios.remove(nombre)
    }
}

println(usuarios)`,
    output: {
      javascript: '{"Ana":"activo","Carla":"activo"}',
      go: 'map[Ana:activo Carla:activo]',
      csharp: '[Ana, activo], [Carla, activo]',
      ruby: '{"Ana" => "activo", "Carla" => "activo"}',
      rust: '{"Ana": "activo", "Carla": "activo"}',
    },
  },
  'La función range()': {
    javascript: r`// JavaScript no tiene range(): se escribe con un for clásico
function rango(inicio, fin, paso = 1) {
  const numeros = []
  for (let i = inicio; paso > 0 ? i < fin : i > fin; i += paso) {
    numeros.push(i)
  }
  return numeros
}

console.log(rango(0, 5).join(' '))
console.log(rango(5, 10))
console.log(rango(0, 10, 3))
console.log(rango(-10, -100, -30))

const frase = ['María', 'tenía', 'un', 'corderito']
frase.forEach((palabra, i) => console.log(i, palabra))`,
    go: r`for i := range 5 { // desde Go 1.22: de 0 a 4
    fmt.Print(i, " ")
}
fmt.Println()

for i := 5; i < 10; i++ {
    fmt.Print(i, " ")
}
fmt.Println()

for i := 0; i < 10; i += 3 {
    fmt.Print(i, " ")
}
fmt.Println()

for i := -10; i > -100; i -= 30 {
    fmt.Print(i, " ")
}
fmt.Println()

frase := []string{"María", "tenía", "un", "corderito"}
for i, palabra := range frase {
    fmt.Println(i, palabra)
}`,
    csharp: r`for (int i = 0; i < 5; i++) {
    Console.Write(i + " ");
}
Console.WriteLine();

Console.WriteLine(string.Join(", ", Enumerable.Range(5, 5)));  // desde 5, cinco números
Console.WriteLine(string.Join(", ", Enumerable.Range(0, 4).Select(i => i * 3)));
Console.WriteLine(string.Join(", ", Enumerable.Range(0, 3).Select(i => -10 - 30 * i)));

string[] frase = { "María", "tenía", "un", "corderito" };
for (int i = 0; i < frase.Length; i++) {
    Console.WriteLine($"{i} {frase[i]}");
}`,
    ruby: r`5.times { |i| print i, ' ' }
puts

p (5...10).to_a
p (0...10).step(3).to_a
p (-10).step(-99, -30).to_a

frase = ['María', 'tenía', 'un', 'corderito']
frase.each_with_index do |palabra, i|
  puts "#{i} #{palabra}"
end`,
    rust: r`for i in 0..5 {
    print!("{i} ");
}
println!();

println!("{:?}", (5..10).collect::<Vec<i32>>());
println!("{:?}", (0..10).step_by(3).collect::<Vec<i32>>());
println!("{:?}", (-70..=-10).rev().step_by(30).collect::<Vec<i32>>());

let frase = ["María", "tenía", "un", "corderito"];
for (i, palabra) in frase.iter().enumerate() {
    println!("{i} {palabra}");
}`,
    kotlin: r`for (i in 0 until 5) {
    print("$i ")
}
println()

println((5 until 10).toList())
println((0 until 10 step 3).toList())
println((-10 downTo -99 step 30).toList())

val frase = listOf("María", "tenía", "un", "corderito")
for ((i, palabra) in frase.withIndex()) {
    println("$i $palabra")
}`,
    output: {
      javascript: '0 1 2 3 4\n[5,6,7,8,9]\n[0,3,6,9]\n[-10,-40,-70]\n0 María\n1 tenía\n2 un\n3 corderito',
      go: '0 1 2 3 4 \n5 6 7 8 9 \n0 3 6 9 \n-10 -40 -70 \n0 María\n1 tenía\n2 un\n3 corderito',
      csharp: '0 1 2 3 4 \n5, 6, 7, 8, 9\n0, 3, 6, 9\n-10, -40, -70\n0 María\n1 tenía\n2 un\n3 corderito',
    },
  },
  'break: salir de un bucle': {
    javascript: r`for (let n = 2; n < 10; n++) {
  for (let x = 2; x < n; x++) {
    if (n % x === 0) {
      console.log(n + ' es igual a ' + x + ' * ' + n / x)
      break
    }
  }
}`,
    go: r`for n := 2; n < 10; n++ {
    for x := 2; x < n; x++ {
        if n%x == 0 {
            fmt.Printf("%d es igual a %d * %d\n", n, x, n/x)
            break
        }
    }
}`,
    csharp: r`for (int n = 2; n < 10; n++) {
    for (int x = 2; x < n; x++) {
        if (n % x == 0) {
            Console.WriteLine($"{n} es igual a {x} * {n / x}");
            break;
        }
    }
}`,
    ruby: r`(2...10).each do |n|
  (2...n).each do |x|
    if n % x == 0
      puts "#{n} es igual a #{x} * #{n / x}"
      break
    end
  end
end`,
    rust: r`for n in 2..10 {
    for x in 2..n {
        if n % x == 0 {
            println!("{n} es igual a {x} * {}", n / x);
            break;
        }
    }
}`,
    kotlin: r`for (n in 2 until 10) {
    for (x in 2 until n) {
        if (n % x == 0) {
            println("$n es igual a $x * ${d}{n / x}")
            break
        }
    }
}`,
  },
  'continue: pasar a la siguiente vuelta': {
    javascript: r`for (let num = 2; num < 10; num++) {
  if (num % 2 === 0) {
    console.log('Número par: ' + num)
    continue
  }
  console.log('Número impar: ' + num)
}`,
    go: r`for num := 2; num < 10; num++ {
    if num%2 == 0 {
        fmt.Println("Número par:", num)
        continue
    }
    fmt.Println("Número impar:", num)
}`,
    csharp: r`for (int num = 2; num < 10; num++) {
    if (num % 2 == 0) {
        Console.WriteLine($"Número par: {num}");
        continue;
    }
    Console.WriteLine($"Número impar: {num}");
}`,
    ruby: r`(2...10).each do |num|
  if num.even?
    puts "Número par: #{num}"
    next  # en Ruby, continue se llama next
  end
  puts "Número impar: #{num}"
end`,
    rust: r`for num in 2..10 {
    if num % 2 == 0 {
        println!("Número par: {num}");
        continue;
    }
    println!("Número impar: {num}");
}`,
    kotlin: r`for (num in 2 until 10) {
    if (num % 2 == 0) {
        println("Número par: $num")
        continue
    }
    println("Número impar: $num")
}`,
  },
  'else en los bucles': {
    javascript: r`// No existe for...else: se usa una variable que recuerda si hubo divisor
for (let n = 2; n < 10; n++) {
  let esPrimo = true
  for (let x = 2; x < n; x++) {
    if (n % x === 0) {
      console.log(n + ' es igual a ' + x + ' * ' + n / x)
      esPrimo = false
      break
    }
  }
  if (esPrimo) {
    console.log(n + ' es un número primo')
  }
}`,
    go: r`// No existe for...else: se usa una variable que recuerda si hubo divisor
for n := 2; n < 10; n++ {
    esPrimo := true
    for x := 2; x < n; x++ {
        if n%x == 0 {
            fmt.Println(n, "es igual a", x, "*", n/x)
            esPrimo = false
            break
        }
    }
    if esPrimo {
        fmt.Println(n, "es un número primo")
    }
}`,
    csharp: r`// No existe for...else: se usa una variable que recuerda si hubo divisor
for (int n = 2; n < 10; n++) {
    bool esPrimo = true;
    for (int x = 2; x < n; x++) {
        if (n % x == 0) {
            Console.WriteLine($"{n} es igual a {x} * {n / x}");
            esPrimo = false;
            break;
        }
    }
    if (esPrimo) {
        Console.WriteLine($"{n} es un número primo");
    }
}`,
    ruby: r`# No existe for...else: find devuelve el primer divisor, o nil si no hay
(2...10).each do |n|
  divisor = (2...n).find { |x| n % x == 0 }
  if divisor
    puts "#{n} es igual a #{divisor} * #{n / divisor}"
  else
    puts "#{n} es un número primo"
  end
end`,
    rust: r`// No existe for...else: find devuelve el primer divisor, o None si no hay
for n in 2..10 {
    match (2..n).find(|x| n % x == 0) {
        Some(x) => println!("{n} es igual a {x} * {}", n / x),
        None => println!("{n} es un número primo"),
    }
}`,
    kotlin: r`// No existe for...else: firstOrNull devuelve el primer divisor, o null si no hay
for (n in 2 until 10) {
    val divisor = (2 until n).firstOrNull { n % it == 0 }
    if (divisor != null) {
        println("$n es igual a $divisor * ${d}{n / divisor}")
    } else {
        println("$n es un número primo")
    }
}`,
  },
  'pass: un bloque que no hace nada': {
    javascript: r`class MiClaseVacia {}

function registrar(...args) {
  // ¡pendiente de implementar!
}

registrar('hola')
console.log('El programa sigue sin errores')`,
    go: r`type MiTipoVacio struct{}

func registrar(args ...string) {
    // ¡pendiente de implementar!
}

registrar("hola")
fmt.Println("El programa sigue sin errores")`,
    csharp: r`Registrar("hola");
Console.WriteLine("El programa sigue sin errores");

void Registrar(params string[] args) {
    // ¡pendiente de implementar!
}

class MiClaseVacia { }`,
    ruby: r`class MiClaseVacia
end

def registrar(*args)
  # ¡pendiente de implementar!
end

registrar('hola')
puts 'El programa sigue sin errores'`,
    rust: r`struct MiTipoVacio;

fn registrar(_args: &[&str]) {
    // ¡pendiente de implementar!
}

registrar(&["hola"]);
println!("El programa sigue sin errores");`,
    kotlin: r`class MiClaseVacia

fun registrar(vararg args: String) {
    // ¡pendiente de implementar!
}

registrar("hola")
println("El programa sigue sin errores")`,
  },
  'match: elegir según un valor': {
    javascript: r`function errorHttp(estado) {
  switch (estado) {
    case 400:
      return "Petición incorrecta"
    case 404:
      return "No encontrado"
    case 418:
      return "Soy una tetera"
    case 401:
    case 403:
      return "Sin permiso"
    default:
      return "Algo salió mal"
  }
}

console.log(errorHttp(404))
console.log(errorHttp(403))
console.log(errorHttp(500))`,
    go: r`func errorHTTP(estado int) string {
    switch estado {
    case 400:
        return "Petición incorrecta"
    case 404:
        return "No encontrado"
    case 418:
        return "Soy una tetera"
    case 401, 403:
        return "Sin permiso"
    default:
        return "Algo salió mal"
    }
}

fmt.Println(errorHTTP(404))
fmt.Println(errorHTTP(403))
fmt.Println(errorHTTP(500))`,
    csharp: r`string ErrorHttp(int estado) => estado switch {
    400 => "Petición incorrecta",
    404 => "No encontrado",
    418 => "Soy una tetera",
    401 or 403 => "Sin permiso",
    _ => "Algo salió mal",
};

Console.WriteLine(ErrorHttp(404));
Console.WriteLine(ErrorHttp(403));
Console.WriteLine(ErrorHttp(500));`,
    ruby: r`def error_http(estado)
  case estado
  when 400 then "Petición incorrecta"
  when 404 then "No encontrado"
  when 418 then "Soy una tetera"
  when 401, 403 then "Sin permiso"
  else "Algo salió mal"
  end
end

puts error_http(404)
puts error_http(403)
puts error_http(500)`,
    rust: r`fn error_http(estado: u16) -> &'static str {
    match estado {
        400 => "Petición incorrecta",
        404 => "No encontrado",
        418 => "Soy una tetera",
        401 | 403 => "Sin permiso",
        _ => "Algo salió mal",
    }
}

println!("{}", error_http(404));
println!("{}", error_http(403));
println!("{}", error_http(500));`,
    kotlin: r`fun errorHttp(estado: Int): String = when (estado) {
    400 -> "Petición incorrecta"
    404 -> "No encontrado"
    418 -> "Soy una tetera"
    401, 403 -> "Sin permiso"
    else -> "Algo salió mal"
}

println(errorHttp(404))
println(errorHttp(403))
println(errorHttp(500))`,
  },
  'match con patrones': {
    javascript: r`// JavaScript no compara patrones: se desarma el arreglo y se usan if
function describir([x, y]) {
  if (x === 0 && y === 0) return "Origen"
  if (x === 0) return "Sobre el eje Y, en " + y
  if (y === 0) return "Sobre el eje X, en " + x
  return "X=" + x + ", Y=" + y
}

console.log(describir([0, 0]))
console.log(describir([0, 5]))
console.log(describir([3, 4]))`,
    go: r`// Go no compara patrones: un switch sin valor evalúa condiciones
func describir(x, y int) string {
    switch {
    case x == 0 && y == 0:
        return "Origen"
    case x == 0:
        return fmt.Sprintf("Sobre el eje Y, en %d", y)
    case y == 0:
        return fmt.Sprintf("Sobre el eje X, en %d", x)
    default:
        return fmt.Sprintf("X=%d, Y=%d", x, y)
    }
}

fmt.Println(describir(0, 0))
fmt.Println(describir(0, 5))
fmt.Println(describir(3, 4))`,
    csharp: r`string Describir((int, int) punto) => punto switch {
    (0, 0) => "Origen",
    (0, var y) => $"Sobre el eje Y, en {y}",
    (var x, 0) => $"Sobre el eje X, en {x}",
    (var x, var y) => $"X={x}, Y={y}",
};

Console.WriteLine(Describir((0, 0)));
Console.WriteLine(Describir((0, 5)));
Console.WriteLine(Describir((3, 4)));`,
    ruby: r`def describir(punto)
  case punto
  in [0, 0] then "Origen"
  in [0, y] then "Sobre el eje Y, en #{y}"
  in [x, 0] then "Sobre el eje X, en #{x}"
  in [x, y] then "X=#{x}, Y=#{y}"
  end
end

puts describir([0, 0])
puts describir([0, 5])
puts describir([3, 4])`,
    rust: r`fn describir(punto: (i32, i32)) -> String {
    match punto {
        (0, 0) => String::from("Origen"),
        (0, y) => format!("Sobre el eje Y, en {y}"),
        (x, 0) => format!("Sobre el eje X, en {x}"),
        (x, y) => format!("X={x}, Y={y}"),
    }
}

println!("{}", describir((0, 0)));
println!("{}", describir((0, 5)));
println!("{}", describir((3, 4)));`,
    kotlin: r`fun describir(punto: Pair<Int, Int>): String {
    val (x, y) = punto
    return when {
        x == 0 && y == 0 -> "Origen"
        x == 0 -> "Sobre el eje Y, en $y"
        y == 0 -> "Sobre el eje X, en $x"
        else -> "X=$x, Y=$y"
    }
}

println(describir(Pair(0, 0)))
println(describir(Pair(0, 5)))
println(describir(Pair(3, 4)))`,
  },
  'Definir funciones': {
    javascript: r`/** Muestra la serie de Fibonacci menor que n. */
function fib(n) {
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

fib(2000)

/** Devuelve un arreglo con la serie de Fibonacci menor que n. */
function fib2(n) {
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

console.log(fib2(100))`,
    go: r`// fib muestra la serie de Fibonacci menor que n.
func fib(n int) {
    a, b := 0, 1
    for a < n {
        fmt.Print(a, " ")
        a, b = b, a+b
    }
    fmt.Println()
}

// fib2 devuelve la serie de Fibonacci menor que n.
func fib2(n int) []int {
    var resultado []int
    a, b := 0, 1
    for a < n {
        resultado = append(resultado, a)
        a, b = b, a+b
    }
    return resultado
}

fib(2000)
fmt.Println(fib2(100))`,
    csharp: r`Fib(2000);
Console.WriteLine(string.Join(", ", Fib2(100)));

/// <summary>Muestra la serie de Fibonacci menor que n.</summary>
void Fib(int n) {
    int a = 0, b = 1;
    while (a < n) {
        Console.Write(a + " ");
        (a, b) = (b, a + b);
    }
    Console.WriteLine();
}

/// <summary>Devuelve la serie de Fibonacci menor que n.</summary>
List<int> Fib2(int n) {
    var resultado = new List<int>();
    int a = 0, b = 1;
    while (a < n) {
        resultado.Add(a);
        (a, b) = (b, a + b);
    }
    return resultado;
}`,
    ruby: r`# Muestra la serie de Fibonacci menor que n.
def fib(n)
  a, b = 0, 1
  while a < n
    print a, ' '
    a, b = b, a + b
  end
  puts
end

fib(2000)

# Devuelve un arreglo con la serie de Fibonacci menor que n.
def fib2(n)
  resultado = []
  a, b = 0, 1
  while a < n
    resultado << a
    a, b = b, a + b
  end
  resultado
end

p fib2(100)`,
    rust: r`/// Muestra la serie de Fibonacci menor que n.
fn fib(n: u32) {
    let (mut a, mut b) = (0, 1);
    while a < n {
        print!("{a} ");
        (a, b) = (b, a + b);
    }
    println!();
}

/// Devuelve un vector con la serie de Fibonacci menor que n.
fn fib2(n: u32) -> Vec<u32> {
    let mut resultado = Vec::new();
    let (mut a, mut b) = (0, 1);
    while a < n {
        resultado.push(a);
        (a, b) = (b, a + b);
    }
    resultado
}

fib(2000);
println!("{:?}", fib2(100));`,
    kotlin: r`/** Muestra la serie de Fibonacci menor que n. */
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

/** Devuelve una lista con la serie de Fibonacci menor que n. */
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

fib(2000)
println(fib2(100))`,
    output: {
      javascript: '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 \n[0,1,1,2,3,5,8,13,21,34,55,89]',
      go: '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 \n[0 1 1 2 3 5 8 13 21 34 55 89]',
      csharp: '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 \n0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89',
    },
  },
  'Valores por defecto de los argumentos': {
    jsFixed: true,
    javascript: r`import { createInterface } from "node:readline/promises"

const consola = createInterface({ input: process.stdin, output: process.stdout })

async function preguntar(pregunta, intentos = 3, aviso = 'Responde s o n') {
  while (true) {
    const respuesta = await consola.question(pregunta)
    if (['s', 'si', 'sí'].includes(respuesta)) return true
    if (['n', 'no'].includes(respuesta)) return false
    intentos = intentos - 1
    if (intentos < 0) throw new Error('respuesta no válida')
    console.log(aviso)
  }
}

console.log(await preguntar('¿Guardar cambios? '))
consola.close()`,
    go: r`// Go no tiene valores por defecto: se pasan siempre todos los argumentos
func preguntar(pregunta string, intentos int, aviso string) bool {
    for {
        var respuesta string
        fmt.Print(pregunta)
        fmt.Scanln(&respuesta)
        switch respuesta {
        case "s", "si", "sí":
            return true
        case "n", "no":
            return false
        }
        intentos--
        if intentos < 0 {
            panic("respuesta no válida")
        }
        fmt.Println(aviso)
    }
}

fmt.Println(preguntar("¿Guardar cambios? ", 3, "Responde s o n"))`,
    csharp: r`bool Preguntar(string pregunta, int intentos = 3, string aviso = "Responde s o n") {
    while (true) {
        Console.Write(pregunta);
        string respuesta = Console.ReadLine();
        if (respuesta is "s" or "si" or "sí") return true;
        if (respuesta is "n" or "no") return false;
        intentos = intentos - 1;
        if (intentos < 0) throw new ArgumentException("respuesta no válida");
        Console.WriteLine(aviso);
    }
}

Console.WriteLine(Preguntar("¿Guardar cambios? "));`,
    ruby: r`def preguntar(pregunta, intentos = 3, aviso = 'Responde s o n')
  loop do
    print pregunta
    respuesta = gets.chomp
    return true if %w[s si sí].include?(respuesta)
    return false if %w[n no].include?(respuesta)
    intentos = intentos - 1
    raise ArgumentError, 'respuesta no válida' if intentos < 0
    puts aviso
  end
end

puts preguntar('¿Guardar cambios? ')`,
    rust: r`// Rust no tiene valores por defecto: se pasan siempre todos los argumentos
fn preguntar(pregunta: &str, mut intentos: i32, aviso: &str) -> bool {
    loop {
        print!("{pregunta}");
        io::stdout().flush().unwrap();
        let mut respuesta = String::new();
        io::stdin().read_line(&mut respuesta).unwrap();
        match respuesta.trim() {
            "s" | "si" | "sí" => return true,
            "n" | "no" => return false,
            _ => {}
        }
        intentos -= 1;
        if intentos < 0 {
            panic!("respuesta no válida");
        }
        println!("{aviso}");
    }
}

println!("{}", preguntar("¿Guardar cambios? ", 3, "Responde s o n"));`,
    kotlin: r`fun preguntar(pregunta: String, intentos: Int = 3, aviso: String = "Responde s o n"): Boolean {
    var restantes = intentos
    while (true) {
        print(pregunta)
        val respuesta = readln()
        if (respuesta in setOf("s", "si", "sí")) return true
        if (respuesta in setOf("n", "no")) return false
        restantes = restantes - 1
        if (restantes < 0) throw IllegalArgumentException("respuesta no válida")
        println(aviso)
    }
}

println(preguntar("¿Guardar cambios? "))`,
    output: { csharp: '¿Guardar cambios? quizás\nResponde s o n\n¿Guardar cambios? s\nTrue' },
  },
  'Cuidado con los valores por defecto': {
    javascript: r`// En JavaScript el valor por defecto se crea de nuevo en cada llamada
function agregar(elemento, lista = []) {
  lista.push(elemento)
  return lista
}

console.log(agregar(1))
console.log(agregar(2))
console.log(agregar(3))  // cada llamada recibe su propia lista`,
    go: r`// Go no tiene valores por defecto: una lista vacía se pasa como nil
func agregar(elemento int, lista []int) []int {
    return append(lista, elemento)
}

fmt.Println(agregar(1, nil))
fmt.Println(agregar(2, nil))
fmt.Println(agregar(3, nil)) // cada llamada crea su propia lista`,
    csharp: r`// El valor por defecto debe ser una constante: se usa null y se crea la lista dentro
List<int> Agregar(int elemento, List<int>? lista = null) {
    lista ??= new List<int>();
    lista.Add(elemento);
    return lista;
}

Console.WriteLine($"[{string.Join(", ", Agregar(1))}]");
Console.WriteLine($"[{string.Join(", ", Agregar(2))}]");
Console.WriteLine($"[{string.Join(", ", Agregar(3))}]");  // cada llamada recibe su propia lista`,
    ruby: r`# En Ruby el valor por defecto se crea de nuevo en cada llamada
def agregar(elemento, lista = [])
  lista << elemento
end

p agregar(1)
p agregar(2)
p agregar(3)  # cada llamada recibe su propia lista`,
    rust: r`// Rust no tiene valores por defecto: Option indica si se pasó una lista o no
fn agregar(elemento: i32, lista: Option<Vec<i32>>) -> Vec<i32> {
    let mut lista = lista.unwrap_or_default();
    lista.push(elemento);
    lista
}

println!("{:?}", agregar(1, None));
println!("{:?}", agregar(2, None));
println!("{:?}", agregar(3, None));  // cada llamada crea su propia lista`,
    kotlin: r`// En Kotlin el valor por defecto se crea de nuevo en cada llamada
fun agregar(elemento: Int, lista: MutableList<Int> = mutableListOf()): MutableList<Int> {
    lista.add(elemento)
    return lista
}

println(agregar(1))
println(agregar(2))
println(agregar(3))  // cada llamada recibe su propia lista`,
  },
  'Argumentos con nombre': {
    javascript: r`// No hay argumentos con nombre: se pasa un objeto y se desarma al recibirlo
function loro(voltaje, { estado = 'tieso', accion = 'voom', tipo = 'Azul Noruego' } = {}) {
  console.log(${b}-- Este loro no haría ${d}{accion} aunque le aplicaras ${d}{voltaje} voltios.${b})
  console.log(${b}-- Hermoso plumaje, el ${d}{tipo}. ¡Está ${d}{estado}!${b})
}

loro(1000)
loro(1000000, { accion: 'VOOOOOM' })
loro('mil', { estado: 'criando malvas' })`,
    go: r`// No hay argumentos con nombre ni por defecto: se usa un struct de opciones
type Opciones struct {
    Estado, Accion, Tipo string
}

func loro(voltaje any, o Opciones) {
    if o.Estado == "" {
        o.Estado = "tieso"
    }
    if o.Accion == "" {
        o.Accion = "voom"
    }
    if o.Tipo == "" {
        o.Tipo = "Azul Noruego"
    }
    fmt.Printf("-- Este loro no haría %s aunque le aplicaras %v voltios.\n", o.Accion, voltaje)
    fmt.Printf("-- Hermoso plumaje, el %s. ¡Está %s!\n", o.Tipo, o.Estado)
}

loro(1000, Opciones{})
loro(1000000, Opciones{Accion: "VOOOOOM"})
loro("mil", Opciones{Estado: "criando malvas"})`,
    csharp: r`void Loro(object voltaje, string estado = "tieso", string accion = "voom", string tipo = "Azul Noruego") {
    Console.WriteLine($"-- Este loro no haría {accion} aunque le aplicaras {voltaje} voltios.");
    Console.WriteLine($"-- Hermoso plumaje, el {tipo}. ¡Está {estado}!");
}

Loro(1000);
Loro(accion: "VOOOOOM", voltaje: 1000000);
Loro("mil", estado: "criando malvas");`,
    ruby: r`def loro(voltaje, estado: 'tieso', accion: 'voom', tipo: 'Azul Noruego')
  puts "-- Este loro no haría #{accion} aunque le aplicaras #{voltaje} voltios."
  puts "-- Hermoso plumaje, el #{tipo}. ¡Está #{estado}!"
end

loro(1000)
loro(1000000, accion: 'VOOOOOM')
loro('mil', estado: 'criando malvas')`,
    rust: r`// No hay argumentos con nombre ni por defecto: se usa un struct con Default
struct Opciones {
    estado: &'static str,
    accion: &'static str,
    tipo: &'static str,
}

impl Default for Opciones {
    fn default() -> Self {
        Opciones { estado: "tieso", accion: "voom", tipo: "Azul Noruego" }
    }
}

fn loro(voltaje: &str, o: Opciones) {
    println!("-- Este loro no haría {} aunque le aplicaras {} voltios.", o.accion, voltaje);
    println!("-- Hermoso plumaje, el {}. ¡Está {}!", o.tipo, o.estado);
}

loro("1000", Opciones::default());
loro("1000000", Opciones { accion: "VOOOOOM", ..Opciones::default() });
loro("mil", Opciones { estado: "criando malvas", ..Opciones::default() });`,
    kotlin: r`fun loro(voltaje: Any, estado: String = "tieso", accion: String = "voom", tipo: String = "Azul Noruego") {
    println("-- Este loro no haría $accion aunque le aplicaras $voltaje voltios.")
    println("-- Hermoso plumaje, el $tipo. ¡Está $estado!")
}

loro(1000)
loro(accion = "VOOOOOM", voltaje = 1000000)
loro("mil", estado = "criando malvas")`,
  },
  'Recibir argumentos con nombre libres': {
    javascript: r`// ...comentarios recoge los argumentos sobrantes; los datos con nombre van en un objeto
function tienda(tipo, datos, ...comentarios) {
  console.log(${b}-- ¿Tiene ${d}{tipo}?${b})
  console.log(${b}-- Lo siento, no nos queda ${d}{tipo}${b})
  for (const comentario of comentarios) {
    console.log(comentario)
  }
  console.log("-".repeat(20))
  for (const [clave, valor] of Object.entries(datos)) {
    console.log(${b}${d}{clave}: ${d}{valor}${b})
  }
}

tienda("queso", { vendedor: "Miguel", cliente: "Juan" },
  "Es muy líquido, señor.", "De verdad, muy líquido.")`,
    go: r`// comentarios ...string recoge los argumentos sobrantes; los datos van en un map
func tienda(tipo string, datos map[string]string, comentarios ...string) {
    fmt.Printf("-- ¿Tiene %s?\n", tipo)
    fmt.Printf("-- Lo siento, no nos queda %s\n", tipo)
    for _, comentario := range comentarios {
        fmt.Println(comentario)
    }
    fmt.Println(strings.Repeat("-", 20))
    // un map no guarda orden: se ordenan las claves para mostrarlas
    for _, clave := range slices.Sorted(maps.Keys(datos)) {
        fmt.Printf("%s: %s\n", clave, datos[clave])
    }
}

tienda("queso", map[string]string{"vendedor": "Miguel", "cliente": "Juan"},
    "Es muy líquido, señor.", "De verdad, muy líquido.")`,
    csharp: r`// params recoge los argumentos sobrantes; los datos con nombre van en un diccionario
void Tienda(string tipo, Dictionary<string, string> datos, params string[] comentarios) {
    Console.WriteLine($"-- ¿Tiene {tipo}?");
    Console.WriteLine($"-- Lo siento, no nos queda {tipo}");
    foreach (var comentario in comentarios) {
        Console.WriteLine(comentario);
    }
    Console.WriteLine(new string('-', 20));
    foreach (var (clave, valor) in datos) {
        Console.WriteLine($"{clave}: {valor}");
    }
}

Tienda("queso", new() { ["vendedor"] = "Miguel", ["cliente"] = "Juan" },
    "Es muy líquido, señor.", "De verdad, muy líquido.");`,
    ruby: r`def tienda(tipo, *comentarios, **datos)
  puts "-- ¿Tiene #{tipo}?"
  puts "-- Lo siento, no nos queda #{tipo}"
  comentarios.each { |comentario| puts comentario }
  puts "-" * 20
  datos.each { |clave, valor| puts "#{clave}: #{valor}" }
end

tienda("queso", "Es muy líquido, señor.", "De verdad, muy líquido.",
       vendedor: "Miguel", cliente: "Juan")`,
    rust: r`// No hay argumentos variables: se reciben una lista y una lista de pares
fn tienda(tipo: &str, comentarios: &[&str], datos: &[(&str, &str)]) {
    println!("-- ¿Tiene {tipo}?");
    println!("-- Lo siento, no nos queda {tipo}");
    for comentario in comentarios {
        println!("{comentario}");
    }
    println!("{}", "-".repeat(20));
    for (clave, valor) in datos {
        println!("{clave}: {valor}");
    }
}

tienda("queso", &["Es muy líquido, señor.", "De verdad, muy líquido."],
    &[("vendedor", "Miguel"), ("cliente", "Juan")]);`,
    kotlin: r`// vararg recoge los argumentos sobrantes; los datos con nombre van en un mapa
fun tienda(tipo: String, vararg comentarios: String, datos: Map<String, String>) {
    println("-- ¿Tiene $tipo?")
    println("-- Lo siento, no nos queda $tipo")
    for (comentario in comentarios) {
        println(comentario)
    }
    println("-".repeat(20))
    for ((clave, valor) in datos) {
        println("$clave: $valor")
    }
}

tienda("queso", "Es muy líquido, señor.", "De verdad, muy líquido.",
    datos = mapOf("vendedor" to "Miguel", "cliente" to "Juan"))`,
    output: {
      go: '-- ¿Tiene queso?\n-- Lo siento, no nos queda queso\nEs muy líquido, señor.\nDe verdad, muy líquido.\n--------------------\ncliente: Juan\nvendedor: Miguel',
    },
  },
  'Parámetros por posición o por nombre': {
    javascript: r`function normal(arg) {
  console.log(arg)
}

normal(2)  // JavaScript solo pasa los argumentos por posición`,
    go: r`func normal(arg int) {
    fmt.Println(arg)
}

normal(2) // Go solo pasa los argumentos por posición`,
    csharp: r`void Normal(int arg) {
    Console.WriteLine(arg);
}

Normal(2);       // por posición
Normal(arg: 2);  // por nombre`,
    ruby: r`def normal(arg)
  puts arg
end

normal(2)  # un parámetro normal de Ruby solo se pasa por posición`,
    rust: r`fn normal(arg: i32) {
    println!("{arg}");
}

normal(2);  // Rust solo pasa los argumentos por posición`,
    kotlin: r`fun normal(arg: Int) {
    println(arg)
}

normal(2)        // por posición
normal(arg = 2)  // por nombre`,
    output: { csharp: '2\n2', kotlin: '2\n2' },
  },
  'Parámetros solo por posición ( / )': {
    javascript: r`// En JavaScript todos los parámetros son solo por posición
function soloPosicion(arg) {
  console.log(arg)
}

soloPosicion(1)`,
    go: r`// En Go todos los parámetros son solo por posición
func soloPosicion(arg int) {
    fmt.Println(arg)
}

soloPosicion(1)`,
    csharp: r`// C# no puede prohibir el nombre: cualquier parámetro acepta las dos formas
void SoloPosicion(int arg) {
    Console.WriteLine(arg);
}

SoloPosicion(1);
// SoloPosicion(arg: 1);  ← también funcionaría`,
    ruby: r`# En Ruby un parámetro normal ya es solo por posición
def solo_posicion(arg)
  puts arg
end

solo_posicion(1)
# solo_posicion(arg: 1)  ← mostraría {arg: 1}: llega un Hash, no el número`,
    rust: r`// En Rust todos los parámetros son solo por posición
fn solo_posicion(arg: i32) {
    println!("{arg}");
}

solo_posicion(1);`,
    kotlin: r`// Kotlin no puede prohibir el nombre: cualquier parámetro acepta las dos formas
fun soloPosicion(arg: Int) {
    println(arg)
}

soloPosicion(1)
// soloPosicion(arg = 1)  ← también funcionaría`,
  },
  'Parámetros solo por nombre ( * )': {
    javascript: r`// Se recibe un objeto: así cada dato viaja con su nombre
function soloNombre({ arg }) {
  console.log(arg)
}

soloNombre({ arg: 3 })`,
    go: r`// Se recibe un struct: así cada dato viaja con su nombre
type Opciones struct {
    Arg int
}

func soloNombre(o Opciones) {
    fmt.Println(o.Arg)
}

soloNombre(Opciones{Arg: 3})`,
    csharp: r`// C# no puede obligar a usar el nombre, pero permite escribirlo
void SoloNombre(int arg) {
    Console.WriteLine(arg);
}

SoloNombre(arg: 3);`,
    ruby: r`# Los dos puntos convierten a arg en un parámetro solo por nombre
def solo_nombre(arg:)
  puts arg
end

solo_nombre(arg: 3)
# solo_nombre(3)  ← quita el # para ver el error`,
    rust: r`// Se recibe un struct: así cada dato viaja con su nombre
struct Opciones {
    arg: i32,
}

fn solo_nombre(o: Opciones) {
    println!("{}", o.arg);
}

solo_nombre(Opciones { arg: 3 });`,
    kotlin: r`// Kotlin no puede obligar a usar el nombre, pero permite escribirlo
fun soloNombre(arg: Int) {
    println(arg)
}

soloNombre(arg = 3)`,
  },
  'Ejemplos de funciones combinando parámetros': {
    javascript: r`// Los dos primeros van por posición y el último, con nombre dentro de un objeto
function combinado(soloPos, normal, { soloNombre }) {
  console.log(soloPos, normal, soloNombre)
}

combinado(1, 2, { soloNombre: 3 })`,
    go: r`type Opciones struct {
    SoloNombre int
}

// Los dos primeros van por posición y el último, con nombre dentro de un struct
func combinado(soloPos, normal int, o Opciones) {
    fmt.Println(soloPos, normal, o.SoloNombre)
}

combinado(1, 2, Opciones{SoloNombre: 3})`,
    csharp: r`void Combinado(int soloPos, int normal, int soloNombre) {
    Console.WriteLine($"{soloPos} {normal} {soloNombre}");
}

Combinado(1, 2, soloNombre: 3);
Combinado(1, normal: 2, soloNombre: 3);`,
    ruby: r`# Los dos primeros van por posición y el último, solo por nombre
def combinado(solo_pos, normal, solo_nombre:)
  puts "#{solo_pos} #{normal} #{solo_nombre}"
end

combinado(1, 2, solo_nombre: 3)`,
    rust: r`// En Rust todo va por posición: el orden es lo único que distingue los argumentos
fn combinado(solo_pos: i32, normal: i32, solo_nombre: i32) {
    println!("{solo_pos} {normal} {solo_nombre}");
}

combinado(1, 2, 3);`,
    kotlin: r`fun combinado(soloPos: Int, normal: Int, soloNombre: Int) {
    println("$soloPos $normal $soloNombre")
}

combinado(1, 2, soloNombre = 3)
combinado(1, normal = 2, soloNombre = 3)`,
    output: { csharp: '1 2 3\n1 2 3', kotlin: '1 2 3\n1 2 3' },
  },
  'Resumen: qué tipo de parámetro usar': {
    javascript: 'Todos los parámetros van por posición. Cuando una función tiene más de dos o tres, o varios son opcionales, recibe un objeto de opciones y desármalo en la firma: así cada dato lleva su nombre.',
    go: 'Todos los parámetros van por posición y son obligatorios. Si hay muchos u opcionales, agrúpalos en un struct de opciones: los campos que no se indican toman su valor cero.',
    csharp: 'Cualquier parámetro puede pasarse por posición o por nombre. Usa el nombre cuando aclara el significado (sobre todo con true, false o números sueltos) y valores por defecto para los opcionales.',
    ruby: 'Usa parámetros normales (por posición) para los datos principales y parámetros de palabra clave (nombre:) para las opciones: obligan a escribir el nombre y hacen la llamada más clara.',
    rust: 'Todos los parámetros van por posición y son obligatorios. Si hay muchos u opcionales, agrúpalos en un struct, con Default para los valores habituales.',
    kotlin: 'Cualquier parámetro puede pasarse por posición o por nombre. Usa el nombre cuando hay varios del mismo tipo o valores por defecto: evita confundir el orden.',
  },
  'Listas de argumentos de cualquier tamaño': {
    javascript: r`function concatenar(sep, ...partes) {
  return partes.join(sep)
}

console.log(concatenar('/', 'tierra', 'marte', 'venus'))
console.log(concatenar('.', 'tierra', 'marte', 'venus'))`,
    go: r`func concatenar(sep string, partes ...string) string {
    return strings.Join(partes, sep)
}

fmt.Println(concatenar("/", "tierra", "marte", "venus"))
fmt.Println(concatenar(".", "tierra", "marte", "venus"))`,
    csharp: r`string Concatenar(string sep, params string[] partes) {
    return string.Join(sep, partes);
}

Console.WriteLine(Concatenar("/", "tierra", "marte", "venus"));
Console.WriteLine(Concatenar(".", "tierra", "marte", "venus"));`,
    ruby: r`def concatenar(*partes, sep: '/')
  partes.join(sep)
end

puts concatenar('tierra', 'marte', 'venus')
puts concatenar('tierra', 'marte', 'venus', sep: '.')`,
    rust: r`// No hay argumentos variables: se recibe una lista (slice)
fn concatenar(partes: &[&str], sep: &str) -> String {
    partes.join(sep)
}

println!("{}", concatenar(&["tierra", "marte", "venus"], "/"));
println!("{}", concatenar(&["tierra", "marte", "venus"], "."));`,
    kotlin: r`fun concatenar(vararg partes: String, sep: String = "/"): String {
    return partes.joinToString(sep)
}

println(concatenar("tierra", "marte", "venus"))
println(concatenar("tierra", "marte", "venus", sep = "."))`,
  },
  'Desempaquetar una lista de argumentos': {
    javascript: r`function sumar(a, b) {
  return a + b
}

console.log(sumar(3, 6))
const args = [3, 6]
console.log(sumar(...args))  // ... reparte el arreglo

function loro({ voltaje, estado = 'tieso', accion = 'voom' }) {
  console.log(${b}-- Este loro no haría ${d}{accion} aunque le aplicaras ${d}{voltaje} voltios. ¡Está ${d}{estado}!${b})
}

const datos = { voltaje: 'cuatro millones', estado: 'requetemuerto', accion: 'VOOM' }
loro(datos)  // el objeto se desarma en la firma de la función`,
    go: r`func sumar(numeros ...int) int {
    total := 0
    for _, n := range numeros {
        total += n
    }
    return total
}

fmt.Println(sumar(3, 6))
args := []int{3, 6}
fmt.Println(sumar(args...)) // ... reparte el slice`,
    csharp: r`int Sumar(params int[] numeros) {
    return numeros.Sum();
}

Console.WriteLine(Sumar(3, 6));
int[] args = [3, 6];
Console.WriteLine(Sumar(args));  // un arreglo ocupa el lugar de los argumentos sueltos`,
    ruby: r`def sumar(a, b)
  a + b
end

puts sumar(3, 6)
args = [3, 6]
puts sumar(*args)  # * reparte el arreglo

def loro(voltaje:, estado: 'tieso', accion: 'voom')
  puts "-- Este loro no haría #{accion} aunque le aplicaras #{voltaje} voltios. ¡Está #{estado}!"
end

d = { voltaje: 'cuatro millones', estado: 'requetemuerto', accion: 'VOOM' }
loro(**d)  # ** reparte el hash`,
    rust: r`// No hay operador para repartir: se pasa la lista completa
fn sumar(numeros: &[i32]) -> i32 {
    numeros.iter().sum()
}

println!("{}", sumar(&[3, 6]));
let args = vec![3, 6];
println!("{}", sumar(&args));`,
    kotlin: r`fun sumar(vararg numeros: Int): Int {
    return numeros.sum()
}

println(sumar(3, 6))
val args = intArrayOf(3, 6)
println(sumar(*args))  // * reparte el arreglo`,
    output: {
      javascript: `9\n9\n${LORO}`,
      go: '9\n9',
      csharp: '9\n9',
      ruby: `9\n9\n${LORO}`,
      rust: '9\n9',
      kotlin: '9\n9',
    },
  },
  'Expresiones lambda': {
    javascript: r`function crearIncrementador(n) {
  return (x) => x + n
}

const f = crearIncrementador(42)
console.log(f(0))
console.log(f(1))

const pares = [[1, 'uno'], [2, 'dos'], [3, 'tres'], [4, 'cuatro']]
pares.sort((a, b) => a[1].localeCompare(b[1]))  // ordenar por el texto
console.log(pares)`,
    go: r`func crearIncrementador(n int) func(int) int {
    return func(x int) int { return x + n }
}

type Par struct {
    Numero int
    Texto  string
}

f := crearIncrementador(42)
fmt.Println(f(0))
fmt.Println(f(1))

pares := []Par{{1, "uno"}, {2, "dos"}, {3, "tres"}, {4, "cuatro"}}
slices.SortFunc(pares, func(a, b Par) int { // ordenar por el texto
    return strings.Compare(a.Texto, b.Texto)
})
fmt.Println(pares)`,
    csharp: r`Func<int, int> CrearIncrementador(int n) {
    return x => x + n;
}

var f = CrearIncrementador(42);
Console.WriteLine(f(0));
Console.WriteLine(f(1));

var pares = new List<(int, string)> { (1, "uno"), (2, "dos"), (3, "tres"), (4, "cuatro") };
pares.Sort((a, b) => string.CompareOrdinal(a.Item2, b.Item2));  // ordenar por el texto
Console.WriteLine(string.Join(", ", pares));`,
    ruby: r`def crear_incrementador(n)
  ->(x) { x + n }
end

f = crear_incrementador(42)
puts f.call(0)
puts f.call(1)

pares = [[1, 'uno'], [2, 'dos'], [3, 'tres'], [4, 'cuatro']]
pares.sort_by! { |par| par[1] }  # ordenar por el texto
p pares`,
    rust: r`fn crear_incrementador(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

let f = crear_incrementador(42);
println!("{}", f(0));
println!("{}", f(1));

let mut pares = vec![(1, "uno"), (2, "dos"), (3, "tres"), (4, "cuatro")];
pares.sort_by_key(|par| par.1);  // ordenar por el texto
println!("{:?}", pares);`,
    kotlin: r`fun crearIncrementador(n: Int): (Int) -> Int {
    return { x -> x + n }
}

val f = crearIncrementador(42)
println(f(0))
println(f(1))

val pares = mutableListOf(1 to "uno", 2 to "dos", 3 to "tres", 4 to "cuatro")
pares.sortBy { it.second }  // ordenar por el texto
println(pares)`,
    output: {
      javascript: '42\n43\n[[4,"cuatro"],[2,"dos"],[3,"tres"],[1,"uno"]]',
      go: '42\n43\n[{4 cuatro} {2 dos} {3 tres} {1 uno}]',
      csharp: '42\n43\n(4, cuatro), (2, dos), (3, tres), (1, uno)',
      ruby: '42\n43\n[[4, "cuatro"], [2, "dos"], [3, "tres"], [1, "uno"]]',
      rust: '42\n43\n[(4, "cuatro"), (2, "dos"), (3, "tres"), (1, "uno")]',
      kotlin: '42\n43\n[(4, cuatro), (2, dos), (3, tres), (1, uno)]',
    },
  },
  'Cadenas de documentación': {
    javascript: r`/**
 * No hace nada, pero lo documenta.
 *
 * De verdad, no hace nada.
 */
function miFuncion() {}

// JSDoc lo muestra el editor al pasar el cursor sobre la función
console.log("Los comentarios /** */ no se pueden leer al ejecutar")`,
    go: r`// miFuncion no hace nada, pero lo documenta.
//
// De verdad, no hace nada.
func miFuncion() {}

// El comentario empieza con el nombre de la función
fmt.Println("Los comentarios de documentación se leen con go doc, no al ejecutar")`,
    csharp: r`// Los comentarios /// generan la ayuda que muestra el editor
Console.WriteLine("Los comentarios /// no se pueden leer al ejecutar");

/// <summary>
/// No hace nada, pero lo documenta.
/// </summary>
/// <remarks>De verdad, no hace nada.</remarks>
void MiFuncion() { }`,
    ruby: r`# No hace nada, pero lo documenta.
#
# De verdad, no hace nada.
def mi_funcion
end

# RDoc y YARD generan la documentación a partir de estos comentarios
puts "Los comentarios de documentación se leen con ri, no al ejecutar"`,
    rust: r`/// No hace nada, pero lo documenta.
///
/// De verdad, no hace nada.
fn mi_funcion() {}

// cargo doc convierte los comentarios /// en páginas web
println!("Los comentarios /// se leen con cargo doc, no al ejecutar");`,
    kotlin: r`/**
 * No hace nada, pero lo documenta.
 *
 * De verdad, no hace nada.
 */
fun miFuncion() {}

// KDoc lo muestra el editor al pasar el cursor sobre la función
println("Los comentarios /** */ no se pueden leer al ejecutar")`,
    output: {
      go: 'Los comentarios de documentación se leen con go doc, no al ejecutar',
      csharp: 'Los comentarios /// no se pueden leer al ejecutar',
      ruby: 'Los comentarios de documentación se leen con ri, no al ejecutar',
      rust: 'Los comentarios /// se leen con cargo doc, no al ejecutar',
    },
  },
  'Anotaciones de tipo en las funciones': {
    javascript: r`/**
 * @param {string} jamon
 * @param {string} huevos
 * @returns {string}
 */
function f(jamon, huevos = 'huevos') {
  return jamon + ' y ' + huevos
}

console.log(f('jamón'))
// JavaScript no revisa los tipos: para eso existe TypeScript`,
    go: r`func f(jamon string, huevos string) string {
    return jamon + " y " + huevos
}

fmt.Println(f("jamón", "huevos"))
// Los tipos son obligatorios: f(1, 2) no compila`,
    csharp: r`string F(string jamon, string huevos = "huevos") {
    return jamon + " y " + huevos;
}

Console.WriteLine(F("jamón"));
// Los tipos son obligatorios: F(1, 2) no compila`,
    ruby: r`# Ruby no tiene anotaciones en el código: los tipos se describen
# aparte, en archivos RBS, o con herramientas como Sorbet
def f(jamon, huevos = 'huevos')
  jamon + ' y ' + huevos
end

puts f('jamón')`,
    rust: r`fn f(jamon: &str, huevos: &str) -> String {
    format!("{jamon} y {huevos}")
}

println!("{}", f("jamón", "huevos"));
// Los tipos son obligatorios: f(1, 2) no compila`,
    kotlin: r`fun f(jamon: String, huevos: String = "huevos"): String {
    return "$jamon y $huevos"
}

println(f("jamón"))
// Los tipos son obligatorios: f(1, 2) no compila`,
  },
  'Intermedio: estilo de código': {
    javascript: 'No hay una guía oficial única: lo habitual es dejar que Prettier dé el formato y ESLint avise de los errores. Sangría de 2 espacios, camelCase para variables y funciones, PascalCase para clases y const siempre que el valor no cambie. https://prettier.io/',
    go: 'El formato no se discute: el comando gofmt (o go fmt) lo aplica igual para todos, con tabuladores. Nombres en camelCase; si empiezan con mayúscula son públicos. Guía: https://go.dev/doc/effective_go',
    csharp: 'Sigue las convenciones de .NET: sangría de 4 espacios, PascalCase para clases, métodos y propiedades, camelCase para variables y parámetros, y dotnet format para aplicarlo. https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/coding-style/coding-conventions',
    ruby: 'Sigue la guía de estilo de la comunidad: sangría de 2 espacios, snake_case para métodos y variables, CamelCase para clases y sin paréntesis cuando no hacen falta. RuboCop la revisa por ti. https://rubystyle.guide/',
    rust: 'El comando cargo fmt aplica el formato oficial (4 espacios) y cargo clippy sugiere mejoras. snake_case para funciones y variables, CamelCase para tipos y MAYUSCULAS para constantes. https://doc.rust-lang.org/style-guide/',
    kotlin: 'Sigue las convenciones oficiales: sangría de 4 espacios, camelCase para funciones y variables, PascalCase para clases y val antes que var. ktlint lo revisa por ti. https://kotlinlang.org/docs/coding-conventions.html',
  },
  'Para leer más': {
    javascript: 'Funciones en la guía de MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions\nControl de flujo: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling',
    go: 'Control de flujo en el recorrido por Go: https://go.dev/tour/flowcontrol/1\nFunciones: https://go.dev/tour/basics/4',
    csharp: 'Instrucciones de selección e iteración: https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/statements/selection-statements\nMétodos: https://learn.microsoft.com/es-es/dotnet/csharp/programming-guide/classes-and-structs/methods',
    ruby: 'Control de flujo: https://docs.ruby-lang.org/en/master/syntax/control_expressions_rdoc.html\nMétodos y argumentos: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html',
    rust: 'Control de flujo en el libro de Rust: https://doc.rust-lang.org/book/ch03-05-control-flow.html\nFunciones: https://doc.rust-lang.org/book/ch03-03-how-functions-work.html',
    kotlin: 'Control de flujo: https://kotlinlang.org/docs/control-flow.html\nFunciones: https://kotlinlang.org/docs/functions.html',
  },
}
