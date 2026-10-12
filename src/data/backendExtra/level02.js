// Nivel 2 · Introducción informal
const r = String.raw
const b = '`'

const NUMEROS = '4\n20\n5\n1.6\n5\n2\n25'

export default {
  'Usar el lenguaje como calculadora': {
    javascript: r`console.log(2 + 2)
console.log(50 - 5 * 6)
console.log((50 - 5 * 6) / 4)
console.log(8 / 5)              // la división siempre da decimal
console.log(Math.floor(17 / 3)) // división entera
console.log(17 % 3)             // resto
console.log(5 ** 2)             // potencia`,
    go: r`fmt.Println(2 + 2)
fmt.Println(50 - 5*6)
fmt.Println((50 - 5*6) / 4.0)
fmt.Println(8 / 5.0)
fmt.Println(17 / 3)         // entre enteros, la división es entera
fmt.Println(17 % 3)         // resto
fmt.Println(math.Pow(5, 2)) // potencia`,
    csharp: r`Console.WriteLine(2 + 2);
Console.WriteLine(50 - 5 * 6);
Console.WriteLine((50 - 5 * 6) / 4.0);
Console.WriteLine(8 / 5.0);
Console.WriteLine(17 / 3);  // entre enteros, la división es entera
Console.WriteLine(17 % 3);  // resto
Console.WriteLine(Math.Pow(5, 2));  // potencia`,
    ruby: r`puts 2 + 2
puts 50 - 5 * 6
puts (50 - 5 * 6) / 4.0
puts 8 / 5.0
puts 17 / 3   # entre enteros, la división es entera
puts 17 % 3   # resto
puts 5 ** 2   # potencia`,
    rust: r`println!("{}", 2 + 2);
println!("{}", 50 - 5 * 6);
println!("{}", (50 - 5 * 6) as f64 / 4.0);
println!("{}", 8.0 / 5.0);
println!("{}", 17 / 3);       // entre enteros, la división es entera
println!("{}", 17 % 3);       // resto
println!("{}", 5_i32.pow(2)); // potencia`,
    kotlin: r`println(2 + 2)
println(50 - 5 * 6)
println((50 - 5 * 6) / 4.0)
println(8 / 5.0)
println(17 / 3)  // entre enteros, la división es entera
println(17 % 3)  // resto
println(Math.pow(5.0, 2.0))  // potencia`,
    output: { javascript: NUMEROS, go: NUMEROS, csharp: NUMEROS, rust: NUMEROS, ruby: '4\n20\n5.0\n1.6\n5\n2\n25' },
  },
  'Guardar resultados en variables': {
    javascript: r`const ancho = 20
const alto = 5 * 9
console.log(ancho * alto)

const impuesto = 12.5 / 100
const precio = 100.50
console.log(precio * impuesto)
console.log(precio + precio * impuesto)`,
    go: r`ancho := 20
alto := 5 * 9
fmt.Println(ancho * alto)

impuesto := 12.5 / 100
precio := 100.50
fmt.Println(precio * impuesto)
fmt.Println(precio + precio*impuesto)`,
    csharp: r`int ancho = 20;
int alto = 5 * 9;
Console.WriteLine(ancho * alto);

double impuesto = 12.5 / 100;
double precio = 100.50;
Console.WriteLine(precio * impuesto);
Console.WriteLine(precio + precio * impuesto);`,
    ruby: r`ancho = 20
alto = 5 * 9
puts ancho * alto

impuesto = 12.5 / 100
precio = 100.50
puts precio * impuesto
puts precio + precio * impuesto`,
    rust: r`let ancho = 20;
let alto = 5 * 9;
println!("{}", ancho * alto);

let impuesto = 12.5 / 100.0;
let precio = 100.50;
println!("{}", precio * impuesto);
println!("{}", precio + precio * impuesto);`,
    kotlin: r`val ancho = 20
val alto = 5 * 9
println(ancho * alto)

val impuesto = 12.5 / 100
val precio = 100.50
println(precio * impuesto)
println(precio + precio * impuesto)`,
  },
  'Usar una variable que no existe': {
    javascript: r`const n = 5
console.log(m)`,
    go: r`n := 5
fmt.Println(m)`,
    csharp: r`int n = 5;
Console.WriteLine(m);`,
    ruby: r`n = 5
puts m`,
    rust: r`let n = 5;
println!("{}", m);`,
    kotlin: r`val n = 5
println(m)`,
    output: {
      javascript: 'ReferenceError: m is not defined',
      go: './main.go:8:2: declared and not used: n\n./main.go:9:14: undefined: m',
      csharp: "Program.cs(2,19): error CS0103: The name 'm' does not exist in the current context",
      ruby: "main.rb:2:in '<main>': undefined local variable or method 'm' for main (NameError)",
      rust: 'error[E0425]: cannot find value `m` in this scope\n --> src/main.rs:3:20\n  |\n3 |     println!("{}", m);\n  |                    ^ help: a local variable with a similar name exists: `n`',
      kotlin: "main.kt:3:13: error: unresolved reference 'm'.\n    println(m)\n            ^",
    },
  },
  'Escribir texto': {
    javascript: r`console.log('Hola mundo')
console.log('Él dijo "hola"')
console.log('Primera línea.\nSegunda línea.')
console.log(String.raw${b}C:\carpeta\nombre${b})  // String.raw: texto sin escapes`,
    go: r`fmt.Println("Hola mundo")
fmt.Println("Él dijo \"hola\"")
fmt.Println("Primera línea.\nSegunda línea.")
fmt.Println(${b}C:\carpeta\nombre${b}) // entre acentos graves: texto sin escapes`,
    csharp: r`Console.WriteLine("Hola mundo");
Console.WriteLine("Él dijo \"hola\"");
Console.WriteLine("Primera línea.\nSegunda línea.");
Console.WriteLine(@"C:\carpeta\nombre");  // @: texto sin escapes`,
    ruby: r`puts 'Hola mundo'
puts 'Él dijo "hola"'
puts "Primera línea.\nSegunda línea."
puts 'C:\carpeta\nombre'  # comillas simples: texto sin escapes`,
    rust: r`println!("Hola mundo");
println!("Él dijo \"hola\"");
println!("Primera línea.\nSegunda línea.");
println!(r"C:\carpeta\nombre");  // r: texto sin escapes`,
    kotlin: r`println("Hola mundo")
println("Él dijo \"hola\"")
println("Primera línea.\nSegunda línea.")
println("""C:\carpeta\nombre""")  // triple comilla: texto sin escapes`,
  },
  'Unir y repetir texto': {
    javascript: r`console.log('ja'.repeat(3) + '!')
const lenguaje = 'Java' + 'Script'
console.log('Hola, ' + lenguaje)`,
    go: r`fmt.Println(strings.Repeat("ja", 3) + "!")
lenguaje := "G" + "o"
fmt.Println("Hola, " + lenguaje)`,
    csharp: r`Console.WriteLine(string.Concat(Enumerable.Repeat("ja", 3)) + "!");
string lenguaje = "C" + "#";
Console.WriteLine("Hola, " + lenguaje);`,
    ruby: r`puts 'ja' * 3 + '!'
lenguaje = 'Ru' 'by'  # textos juntos se unen solos
puts 'Hola, ' + lenguaje`,
    rust: r`println!("{}", "ja".repeat(3) + "!");
let lenguaje = String::from("Ru") + "st";
println!("Hola, {lenguaje}");`,
    kotlin: r`println("ja".repeat(3) + "!")
val lenguaje = "Kot" + "lin"
println("Hola, " + lenguaje)`,
    output: {
      javascript: 'jajaja!\nHola, JavaScript',
      go: 'jajaja!\nHola, Go',
      csharp: 'jajaja!\nHola, C#',
      ruby: 'jajaja!\nHola, Ruby',
      rust: 'jajaja!\nHola, Rust',
      kotlin: 'jajaja!\nHola, Kotlin',
    },
  },
  'Posiciones y cortes de un texto': {
    javascript: r`const palabra = 'Python'
console.log(palabra[0])           // primera letra
console.log(palabra.at(-1))       // última letra
console.log(palabra.slice(0, 2))  // de la 0 a la 1
console.log(palabra.slice(2, 5))  // de la 2 a la 4
console.log(palabra.slice(0, 2) + palabra.slice(2))
console.log(palabra.length)`,
    go: r`palabra := "Python"
fmt.Println(string(palabra[0]))              // primera letra
fmt.Println(string(palabra[len(palabra)-1])) // última letra
fmt.Println(palabra[0:2])                    // de la 0 a la 1
fmt.Println(palabra[2:5])                    // de la 2 a la 4
fmt.Println(palabra[:2] + palabra[2:])
fmt.Println(len(palabra))`,
    csharp: r`string palabra = "Python";
Console.WriteLine(palabra[0]);     // primera letra
Console.WriteLine(palabra[^1]);    // última letra
Console.WriteLine(palabra[0..2]);  // de la 0 a la 1
Console.WriteLine(palabra[2..5]);  // de la 2 a la 4
Console.WriteLine(palabra[..2] + palabra[2..]);
Console.WriteLine(palabra.Length);`,
    ruby: r`palabra = 'Python'
puts palabra[0]      # primera letra
puts palabra[-1]     # última letra
puts palabra[0...2]  # de la 0 a la 1
puts palabra[2...5]  # de la 2 a la 4
puts palabra[...2] + palabra[2..]
puts palabra.length`,
    rust: r`let palabra = "Python";
println!("{}", palabra.chars().next().unwrap());  // primera letra
println!("{}", palabra.chars().last().unwrap());  // última letra
println!("{}", &palabra[0..2]);                   // de la 0 a la 1
println!("{}", &palabra[2..5]);                   // de la 2 a la 4
println!("{}{}", &palabra[..2], &palabra[2..]);
println!("{}", palabra.len());`,
    kotlin: r`val palabra = "Python"
println(palabra[0])               // primera letra
println(palabra.last())           // última letra
println(palabra.substring(0, 2))  // de la 0 a la 1
println(palabra.substring(2, 5))  // de la 2 a la 4
println(palabra.take(2) + palabra.drop(2))
println(palabra.length)`,
  },
  '¿Se puede cambiar una letra?': {
    javascript: r`const palabra = 'Python'
// palabra[0] = 'J'  ← no da error, pero tampoco cambia nada
const nueva = 'J' + palabra.slice(1)
console.log(nueva)`,
    go: r`palabra := "Python"
// palabra[0] = 'J'  ← no compila
nueva := "J" + palabra[1:]
fmt.Println(nueva)`,
    csharp: r`string palabra = "Python";
// palabra[0] = 'J';  ← no compila
string nueva = "J" + palabra[1..];
Console.WriteLine(nueva);`,
    ruby: r`palabra = +'Python'
palabra[0] = 'J'  # en Ruby sí se puede: los textos son modificables
puts palabra`,
    rust: r`let palabra = "Python";
// un &str no se puede modificar: se construye un texto nuevo
let nueva = format!("J{}", &palabra[1..]);
println!("{nueva}");`,
    kotlin: r`val palabra = "Python"
// palabra[0] = 'J'  ← no compila
val nueva = "J" + palabra.substring(1)
println(nueva)`,
  },
  'Listas': {
    javascript: r`const cuadrados = [1, 4, 9, 16, 25]
console.log(cuadrados[0])
console.log(cuadrados.slice(-3))  // los 3 últimos
console.log(cuadrados.concat([36, 49]))`,
    go: r`cuadrados := []int{1, 4, 9, 16, 25}
fmt.Println(cuadrados[0])
fmt.Println(cuadrados[len(cuadrados)-3:]) // los 3 últimos
fmt.Println(append(cuadrados, 36, 49))`,
    csharp: r`int[] cuadrados = [1, 4, 9, 16, 25];
Console.WriteLine(cuadrados[0]);
Console.WriteLine(string.Join(", ", cuadrados[^3..]));  // los 3 últimos
int[] todos = [.. cuadrados, 36, 49];
Console.WriteLine(string.Join(", ", todos));`,
    ruby: r`cuadrados = [1, 4, 9, 16, 25]
puts cuadrados[0]
p cuadrados[-3..]  # los 3 últimos
p cuadrados + [36, 49]`,
    rust: r`let cuadrados = vec![1, 4, 9, 16, 25];
println!("{}", cuadrados[0]);
println!("{:?}", &cuadrados[cuadrados.len() - 3..]);  // los 3 últimos
let todos = [cuadrados, vec![36, 49]].concat();
println!("{:?}", todos);`,
    kotlin: r`val cuadrados = listOf(1, 4, 9, 16, 25)
println(cuadrados[0])
println(cuadrados.takeLast(3))  // los 3 últimos
println(cuadrados + listOf(36, 49))`,
    output: {
      javascript: '1\n[9,16,25]\n[1,4,9,16,25,36,49]',
      go: '1\n[9 16 25]\n[1 4 9 16 25 36 49]',
      csharp: '1\n9, 16, 25\n1, 4, 9, 16, 25, 36, 49',
    },
  },
  'Modificar una lista': {
    javascript: r`const cubos = [1, 8, 27, 65, 125]  // ¡65 está mal!
cubos[3] = 64
cubos.push(216)
console.log(cubos)

const letras = ['a', 'b', 'c', 'd', 'e']
letras.splice(1, 2, 'B', 'C')  // desde la posición 1, cambia 2
console.log(letras)
console.log(letras.length)`,
    go: r`cubos := []int{1, 8, 27, 65, 125} // ¡65 está mal!
cubos[3] = 64
cubos = append(cubos, 216)
fmt.Println(cubos)

letras := []string{"a", "b", "c", "d", "e"}
copy(letras[1:3], []string{"B", "C"})
fmt.Println(letras)
fmt.Println(len(letras))`,
    csharp: r`var cubos = new List<int> { 1, 8, 27, 65, 125 };  // ¡65 está mal!
cubos[3] = 64;
cubos.Add(216);
Console.WriteLine(string.Join(", ", cubos));

var letras = new List<string> { "a", "b", "c", "d", "e" };
letras[1] = "B";
letras[2] = "C";
Console.WriteLine(string.Join(", ", letras));
Console.WriteLine(letras.Count);`,
    ruby: r`cubos = [1, 8, 27, 65, 125]  # ¡65 está mal!
cubos[3] = 64
cubos << 216
p cubos

letras = ['a', 'b', 'c', 'd', 'e']
letras[1..2] = ['B', 'C']
p letras
puts letras.length`,
    rust: r`let mut cubos = vec![1, 8, 27, 65, 125];  // ¡65 está mal!
cubos[3] = 64;
cubos.push(216);
println!("{:?}", cubos);

let mut letras = vec!["a", "b", "c", "d", "e"];
letras[1] = "B";
letras[2] = "C";
println!("{:?}", letras);
println!("{}", letras.len());`,
    kotlin: r`val cubos = mutableListOf(1, 8, 27, 65, 125)  // ¡65 está mal!
cubos[3] = 64
cubos.add(216)
println(cubos)

val letras = mutableListOf("a", "b", "c", "d", "e")
letras[1] = "B"
letras[2] = "C"
println(letras)
println(letras.size)`,
    output: {
      javascript: '[1,8,27,64,125,216]\n["a","B","C","d","e"]\n5',
      go: '[1 8 27 64 125 216]\n[a B C d e]\n5',
      csharp: '1, 8, 27, 64, 125, 216\na, B, C, d, e\n5',
      ruby: '[1, 8, 27, 64, 125, 216]\n["a", "B", "C", "d", "e"]\n5',
      rust: '[1, 8, 27, 64, 125, 216]\n["a", "B", "C", "d", "e"]\n5',
    },
  },
  'Listas dentro de listas': {
    javascript: r`const x = [['a', 'b', 'c'], [1, 2, 3]]
console.log(x[0])
console.log(x[0][1])`,
    go: r`x := [][]any{{"a", "b", "c"}, {1, 2, 3}}
fmt.Println(x[0])
fmt.Println(x[0][1])`,
    csharp: r`object[][] x = [["a", "b", "c"], [1, 2, 3]];
Console.WriteLine(string.Join(", ", x[0]));
Console.WriteLine(x[0][1]);`,
    ruby: r`x = [['a', 'b', 'c'], [1, 2, 3]]
p x[0]
puts x[0][1]`,
    rust: r`// en Rust todos los elementos deben ser del mismo tipo
let x = vec![vec!["a", "b", "c"], vec!["1", "2", "3"]];
println!("{:?}", x[0]);
println!("{}", x[0][1]);`,
    kotlin: r`val x = listOf(listOf("a", "b", "c"), listOf(1, 2, 3))
println(x[0])
println(x[0][1])`,
    output: {
      javascript: '["a","b","c"]\nb',
      go: '[a b c]\nb',
      csharp: 'a, b, c\nb',
      ruby: '["a", "b", "c"]\nb',
      rust: '["a", "b", "c"]\nb',
    },
  },
  'Primer programa: la serie de Fibonacci': {
    javascript: r`let a = 0
let b = 1
while (a < 10) {
  console.log(a)
  const siguiente = a + b
  a = b
  b = siguiente
}`,
    go: r`a, b := 0, 1
for a < 10 {
    fmt.Println(a)
    a, b = b, a+b
}`,
    csharp: r`int a = 0, b = 1;
while (a < 10) {
    Console.WriteLine(a);
    (a, b) = (b, a + b);
}`,
    ruby: r`a, b = 0, 1
while a < 10
  puts a
  a, b = b, a + b
end`,
    rust: r`let (mut a, mut b) = (0, 1);
while a < 10 {
    println!("{a}");
    (a, b) = (b, a + b);
}`,
    kotlin: r`var a = 0
var b = 1
while (a < 10) {
    println(a)
    val siguiente = a + b
    a = b
    b = siguiente
}`,
  },
  'Controlar cómo se imprime': {
    javascript: r`const i = 256 * 256
console.log('El valor de i es', i)

let a = 0
let b = 1
let serie = ''
while (a < 1000) {
  serie += a + ','  // console.log siempre salta de línea: se junta el texto antes
  const siguiente = a + b
  a = b
  b = siguiente
}
console.log(serie)`,
    go: r`i := 256 * 256
fmt.Println("El valor de i es", i)

a, b := 0, 1
for a < 1000 {
    fmt.Print(a, ",") // Print no salta de línea
    a, b = b, a+b
}`,
    csharp: r`int i = 256 * 256;
Console.WriteLine("El valor de i es " + i);

int a = 0, b = 1;
while (a < 1000) {
    Console.Write(a + ",");  // Write no salta de línea
    (a, b) = (b, a + b);
}`,
    ruby: r`i = 256 * 256
puts "El valor de i es #{i}"

a, b = 0, 1
while a < 1000
  print a, ','  # print no salta de línea
  a, b = b, a + b
end`,
    rust: r`let i = 256 * 256;
println!("El valor de i es {i}");

let (mut a, mut b) = (0, 1);
while a < 1000 {
    print!("{a},");  // print! no salta de línea
    (a, b) = (b, a + b);
}`,
    kotlin: r`val i = 256 * 256
println("El valor de i es $i")

var a = 0
var b = 1
while (a < 1000) {
    print("$a,")  // print no salta de línea
    val siguiente = a + b
    a = b
    b = siguiente
}`,
  },
  'Para leer más': {
    javascript: 'Guía de JavaScript en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide\nAprende Node.js: https://nodejs.org/es/learn',
    go: 'Un recorrido por Go, con los mismos temas paso a paso: https://go.dev/tour/',
    csharp: 'Paseo por C#: https://learn.microsoft.com/es-es/dotnet/csharp/tour-of-csharp/',
    ruby: 'Ruby en 20 minutos: https://www.ruby-lang.org/es/documentation/quickstart/',
    rust: 'El libro de Rust, capítulo «Conceptos comunes de programación»: https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html',
    kotlin: 'Recorrido por Kotlin: https://kotlinlang.org/docs/kotlin-tour-welcome.html',
  },
}
