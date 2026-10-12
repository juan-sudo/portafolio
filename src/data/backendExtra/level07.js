// Nivel 7 · Entrada y salida
const r = String.raw
const b = '`'
const d = '$'

const TABLA = ' 1   1    1\n 2   4    8\n 3   9   27\n 4  16   64\n 5  25  125\n 6  36  216\n 7  49  343\n 8  64  512\n 9  81  729\n10 100 1000'
const AGENDA = 'Sjoerd     ==>       4127\nJack       ==>       4098\nDcab       ==>       7678'
const PI_LINEA = 'El valor de pi es aproximadamente 3.142.'
const LINEAS = 'Esta es la primera línea del archivo.\nSegunda línea del archivo\n2'

export default {
  'Mostrar valores: str() y repr()': {
    javascript: r`const s = 'Hola, mundo.'
console.log(String(s))
console.log(JSON.stringify(s))   // muestra el valor tal como se escribe en el código
console.log(String(1 / 7))

const x = 10 * 3.25
const y = 200 * 200
console.log('El valor de x es ' + x + ', y el de y es ' + y + '...')

const hola = 'hola, mundo\n'
console.log(JSON.stringify(hola))   // se ven los caracteres especiales, como \n
console.log(JSON.stringify([x, y, ['jamón', 'huevos']]))`,
    go: r`s := "Hola, mundo."
fmt.Println(s)
fmt.Printf("%q\n", s) // %q muestra el texto tal como se escribe en el código
fmt.Println(1.0 / 7)

x := 10 * 3.25
y := 200 * 200
fmt.Printf("El valor de x es %v, y el de y es %v...\n", x, y)

hola := "hola, mundo\n"
fmt.Printf("%q\n", hola) // se ven los caracteres especiales, como \n
fmt.Printf("%#v\n", []string{"jamón", "huevos"}) // %#v: el valor con su tipo`,
    csharp: r`string s = "Hola, mundo.";
Console.WriteLine(s.ToString());   // ToString convierte cualquier valor en texto
Console.WriteLine(1.0 / 7);

double x = 10 * 3.25;
int y = 200 * 200;
Console.WriteLine("El valor de x es " + x + ", y el de y es " + y + "...");
// C# no tiene un equivalente directo de repr(): el depurador muestra los valores con comillas`,
    ruby: r`s = 'Hola, mundo.'
puts s.to_s
puts s.inspect   # inspect muestra el valor tal como se escribe en el código
puts (1.0 / 7).to_s

x = 10 * 3.25
y = 200 * 200
puts 'El valor de x es ' + x.inspect + ', y el de y es ' + y.inspect + '...'

hola = "hola, mundo\n"
puts hola.inspect   # se ven los caracteres especiales, como \n
p [x, y, ['jamón', 'huevos']]   # p es lo mismo que puts con inspect`,
    rust: r`let s = "Hola, mundo.";
println!("{}", s);
println!("{:?}", s);   // {:?} muestra el valor tal como se escribe en el código
println!("{}", 1.0 / 7.0);

let x = 10.0 * 3.25;
let y = 200 * 200;
println!("El valor de x es {x}, y el de y es {y}...");

let hola = "hola, mundo\n";
println!("{:?}", hola);   // se ven los caracteres especiales, como \n
println!("{:?}", (x, y, ("jamón", "huevos")));`,
    kotlin: r`val s = "Hola, mundo."
println(s.toString())   // toString convierte cualquier valor en texto
println(1.0 / 7)

val x = 10 * 3.25
val y = 200 * 200
println("El valor de x es $x, y el de y es $y...")
println(listOf(x, y, listOf("jamón", "huevos")))`,
    output: {
      javascript: 'Hola, mundo.\n"Hola, mundo."\n0.14285714285714285\nEl valor de x es 32.5, y el de y es 40000...\n"hola, mundo\\n"\n[32.5,40000,["jamón","huevos"]]',
      go: 'Hola, mundo.\n"Hola, mundo."\n0.14285714285714285\nEl valor de x es 32.5, y el de y es 40000...\n"hola, mundo\\n"\n[]string{"jamón", "huevos"}',
      csharp: 'Hola, mundo.\n0.14285714285714285\nEl valor de x es 32.5, y el de y es 40000...',
      ruby: 'Hola, mundo.\n"Hola, mundo."\n0.14285714285714285\nEl valor de x es 32.5, y el de y es 40000...\n"hola, mundo\\n"\n[32.5, 40000, ["jamón", "huevos"]]',
      rust: 'Hola, mundo.\n"Hola, mundo."\n0.14285714285714285\nEl valor de x es 32.5, y el de y es 40000...\n"hola, mundo\\n"\n(32.5, 40000, ("jamón", "huevos"))',
    },
  },
  'Cadenas con formato (f-strings)': {
    javascript: r`console.log(${b}El valor de pi es aproximadamente ${d}{Math.PI.toFixed(3)}.${b})

const tabla = { Sjoerd: 4127, Jack: 4098, Dcab: 7678 }
for (const [nombre, telefono] of Object.entries(tabla)) {
  // padEnd y padStart rellenan hasta un ancho de 10 caracteres
  console.log(${b}${d}{nombre.padEnd(10)} ==> ${d}{String(telefono).padStart(10)}${b})
}

const animales = 'anguilas'
console.log(${b}Mi aerodeslizador está lleno de ${d}{animales}.${b})`,
    go: r`fmt.Printf("El valor de pi es aproximadamente %.3f.\n", math.Pi)

type Contacto struct {
    Nombre   string
    Telefono int
}
tabla := []Contacto{{"Sjoerd", 4127}, {"Jack", 4098}, {"Dcab", 7678}}
for _, c := range tabla {
    fmt.Printf("%-10s ==> %10d\n", c.Nombre, c.Telefono) // ancho de 10 caracteres
}

animales := "anguilas"
fmt.Printf("Mi aerodeslizador está lleno de %s.\n", animales)
fmt.Printf("Mi aerodeslizador está lleno de %q.\n", animales) // %q añade comillas`,
    csharp: r`Console.WriteLine($"El valor de pi es aproximadamente {Math.PI:F3}.");

var tabla = new Dictionary<string, int> { ["Sjoerd"] = 4127, ["Jack"] = 4098, ["Dcab"] = 7678 };
foreach (var (nombre, telefono) in tabla) {
    Console.WriteLine($"{nombre,-10} ==> {telefono,10}");   // ancho de 10 caracteres
}

string animales = "anguilas";
Console.WriteLine($"Mi aerodeslizador está lleno de {animales}.");`,
    ruby: r`puts "El valor de pi es aproximadamente #{Math::PI.round(3)}."

tabla = { 'Sjoerd' => 4127, 'Jack' => 4098, 'Dcab' => 7678 }
tabla.each do |nombre, telefono|
  puts "#{nombre.ljust(10)} ==> #{telefono.to_s.rjust(10)}"   # ancho de 10 caracteres
end

animales = 'anguilas'
puts "Mi aerodeslizador está lleno de #{animales}."
puts "Mi aerodeslizador está lleno de #{animales.inspect}."   # inspect añade comillas`,
    rust: r`println!("El valor de pi es aproximadamente {:.3}.", std::f64::consts::PI);

let tabla = [("Sjoerd", 4127), ("Jack", 4098), ("Dcab", 7678)];
for (nombre, telefono) in tabla {
    println!("{nombre:10} ==> {telefono:10}");   // ancho de 10 caracteres
}

let animales = "anguilas";
println!("Mi aerodeslizador está lleno de {animales}.");
println!("Mi aerodeslizador está lleno de {animales:?}.");   // :? añade comillas`,
    kotlin: r`println("El valor de pi es aproximadamente ${d}{round(PI * 1000) / 1000}.")

val tabla = mapOf("Sjoerd" to 4127, "Jack" to 4098, "Dcab" to 7678)
for ((nombre, telefono) in tabla) {
    // padEnd y padStart rellenan hasta un ancho de 10 caracteres
    println("${d}{nombre.padEnd(10)} ==> ${d}{telefono.toString().padStart(10)}")
}

val animales = "anguilas"
println("Mi aerodeslizador está lleno de $animales.")`,
    output: {
      go: `${PI_LINEA}\n${AGENDA}\nMi aerodeslizador está lleno de anguilas.\nMi aerodeslizador está lleno de "anguilas".`,
      ruby: `${PI_LINEA}\n${AGENDA}\nMi aerodeslizador está lleno de anguilas.\nMi aerodeslizador está lleno de "anguilas".`,
      rust: `${PI_LINEA}\n${AGENDA}\nMi aerodeslizador está lleno de anguilas.\nMi aerodeslizador está lleno de "anguilas".`,
    },
  },
  'El método format()': {
    javascript: r`// No hay format(): las plantillas con ${d}{} hacen ese trabajo
const comida = 'jamón'
const adjetivo = 'horrible'
console.log(${b}Este ${d}{comida} está ${d}{adjetivo}.${b})

for (let x = 1; x <= 10; x++) {
  const columnas = [String(x).padStart(2), String(x * x).padStart(3), String(x ** 3).padStart(4)]
  console.log(columnas.join(' '))
}`,
    go: r`fmt.Printf("Somos los %s que dicen \"%s!\"\n", "caballeros", "Ni")
fmt.Printf("%[1]s y %[2]s\n", "jamón", "huevos")
fmt.Printf("%[2]s y %[1]s\n", "jamón", "huevos") // el número elige el argumento

for x := 1; x <= 10; x++ {
    fmt.Printf("%2d %3d %4d\n", x, x*x, x*x*x)
}`,
    csharp: r`Console.WriteLine(string.Format("Somos los {0} que dicen \"{1}!\"", "caballeros", "Ni"));
Console.WriteLine(string.Format("{0} y {1}", "jamón", "huevos"));
Console.WriteLine(string.Format("{1} y {0}", "jamón", "huevos"));   // el número elige el argumento

for (int x = 1; x <= 10; x++) {
    Console.WriteLine($"{x,2} {x * x,3} {x * x * x,4}");
}`,
    ruby: r`puts format('Somos los %s que dicen "%s!"', 'caballeros', 'Ni')
puts format('%1$s y %2$s', 'jamón', 'huevos')
puts format('%2$s y %1$s', 'jamón', 'huevos')   # el número elige el argumento
puts format('Este %{comida} está %{adjetivo}.', comida: 'jamón', adjetivo: 'horrible')

(1..10).each do |x|
  puts format('%2d %3d %4d', x, x * x, x ** 3)
end`,
    rust: r`println!("Somos los {} que dicen \"{}!\"", "caballeros", "Ni");
println!("{0} y {1}", "jamón", "huevos");
println!("{1} y {0}", "jamón", "huevos");   // el número elige el argumento
println!("Este {comida} está {adjetivo}.", comida = "jamón", adjetivo = "horrible");

for x in 1..=10 {
    println!("{:2} {:3} {:4}", x, x * x, x * x * x);
}`,
    kotlin: r`println("Somos los %s que dicen \"%s!\"".format("caballeros", "Ni"))
println("%1\$s y %2\$s".format("jamón", "huevos"))
println("%2\$s y %1\$s".format("jamón", "huevos"))   // el número elige el argumento

for (x in 1..10) {
    println("%2d %3d %4d".format(x, x * x, x * x * x))
}`,
    output: {
      javascript: `Este jamón está horrible.\n${TABLA}`,
      go: `Somos los caballeros que dicen "Ni!"\njamón y huevos\nhuevos y jamón\n${TABLA}`,
      csharp: `Somos los caballeros que dicen "Ni!"\njamón y huevos\nhuevos y jamón\n${TABLA}`,
      ruby: `Somos los caballeros que dicen "Ni!"\njamón y huevos\nhuevos y jamón\nEste jamón está horrible.\n${TABLA}`,
      rust: `Somos los caballeros que dicen "Ni!"\njamón y huevos\nhuevos y jamón\nEste jamón está horrible.\n${TABLA}`,
      kotlin: `Somos los caballeros que dicen "Ni!"\njamón y huevos\nhuevos y jamón\n${TABLA}`,
    },
  },
  'Formato manual de cadenas': {
    javascript: r`for (let x = 1; x <= 10; x++) {
  // padStart alinea a la derecha
  console.log(String(x).padStart(2) + ' ' + String(x * x).padStart(3) + ' ' + String(x ** 3).padStart(4))
}

console.log('12'.padStart(5, '0'))                      // rellenar con ceros a la izquierda
console.log('hola'.padStart(7, '*').padEnd(10, '*'))    // centrar
console.log('[' + 'hola'.padEnd(8) + ']')`,
    go: r`for x := 1; x <= 10; x++ {
    fmt.Printf("%2d %3d %4d\n", x, x*x, x*x*x) // el número es el ancho: alinea a la derecha
}

fmt.Printf("%05d\n", 12)       // rellenar con ceros a la izquierda
fmt.Printf("%07.2f\n", -3.14)
fmt.Printf("[%-8s]\n", "hola") // el signo - alinea a la izquierda`,
    csharp: r`for (int x = 1; x <= 10; x++) {
    // PadLeft alinea a la derecha
    Console.WriteLine(x.ToString().PadLeft(2) + " " + (x * x).ToString().PadLeft(3) + " " + (x * x * x).ToString().PadLeft(4));
}

Console.WriteLine("12".PadLeft(5, '0'));                      // rellenar con ceros a la izquierda
Console.WriteLine((-3.14).ToString("000.00"));
Console.WriteLine("hola".PadLeft(7, '*').PadRight(10, '*'));  // centrar
Console.WriteLine("[" + "hola".PadRight(8) + "]");`,
    ruby: r`(1..10).each do |x|
  # rjust alinea a la derecha
  puts x.to_s.rjust(2) + ' ' + (x * x).to_s.rjust(3) + ' ' + (x ** 3).to_s.rjust(4)
end

puts '12'.rjust(5, '0')        # rellenar con ceros a la izquierda
puts 'hola'.center(10, '*')
puts '[' + 'hola'.ljust(8) + ']'`,
    rust: r`for x in 1..=10 {
    println!("{:>2} {:>3} {:>4}", x, x * x, x * x * x);   // > alinea a la derecha
}

println!("{:05}", 12);         // rellenar con ceros a la izquierda
println!("{:07.2}", -3.14);
println!("{:*^10}", "hola");   // ^ centra y * es el relleno
println!("[{:<8}]", "hola");   // < alinea a la izquierda`,
    kotlin: r`for (x in 1..10) {
    // padStart alinea a la derecha
    println(x.toString().padStart(2) + " " + (x * x).toString().padStart(3) + " " + (x * x * x).toString().padStart(4))
}

println("12".padStart(5, '0'))                      // rellenar con ceros a la izquierda
println("hola".padStart(7, '*').padEnd(10, '*'))    // centrar
println("[" + "hola".padEnd(8) + "]")`,
    output: {
      javascript: `${TABLA}\n00012\n***hola***\n[hola    ]`,
      go: `${TABLA}\n00012\n-003.14\n[hola    ]`,
      ruby: `${TABLA}\n00012\n***hola***\n[hola    ]`,
      kotlin: `${TABLA}\n00012\n***hola***\n[hola    ]`,
    },
  },
  'El formato antiguo con %': {
    javascript: r`// JavaScript no tiene el operador %: se usan toFixed y las plantillas
console.log(${b}El valor de pi es aproximadamente ${d}{Math.PI.toFixed(3)}.${b})

const nombre = 'Ana'
const edad = 25
console.log(${b}${d}{nombre} tiene ${d}{edad} años${b})`,
    go: r`// En Go los verbos con % son la forma normal de dar formato
fmt.Printf("El valor de pi es aproximadamente %5.3f.\n", math.Pi)
fmt.Printf("%s tiene %d años\n", "Ana", 25)`,
    csharp: r`// C# no usa %: los marcadores van entre llaves, con el formato tras los dos puntos
Console.WriteLine(string.Format("El valor de pi es aproximadamente {0:F3}.", Math.PI));
Console.WriteLine(string.Format("{0} tiene {1} años", "Ana", 25));`,
    ruby: r`puts 'El valor de pi es aproximadamente %5.3f.' % Math::PI
puts '%s tiene %d años' % ['Ana', 25]`,
    rust: r`// Rust no usa %: los marcadores van entre llaves, con el formato tras los dos puntos
println!("El valor de pi es aproximadamente {:5.3}.", std::f64::consts::PI);
println!("{} tiene {} años", "Ana", 25);`,
    kotlin: r`// format() usa los mismos códigos con % que Java
println("%s tiene %d años".format("Ana", 25))
println("El valor de pi es aproximadamente %5.3f.".format(Locale.US, PI))`,
    output: { kotlin: `Ana tiene 25 años\n${PI_LINEA}` },
  },
  'Leer y escribir archivos': {
    jsFixed: true,
    javascript: r`import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'

// writeFileSync crea el archivo (o borra lo anterior) y lo cierra al terminar
writeFileSync('archivo.txt', 'Primera línea\nSegunda línea\n')
process.stdout.write(readFileSync('archivo.txt', 'utf8'))

appendFileSync('archivo.txt', 'Tercera línea\n')   // agregar al final
process.stdout.write(readFileSync('archivo.txt', 'utf8'))`,
    go: r`// WriteFile crea el archivo (o borra lo anterior) y lo cierra al terminar
os.WriteFile("archivo.txt", []byte("Primera línea\nSegunda línea\n"), 0644)
contenido, _ := os.ReadFile("archivo.txt")
fmt.Print(string(contenido))

// Para agregar al final se abre con O_APPEND
f, _ := os.OpenFile("archivo.txt", os.O_APPEND|os.O_WRONLY, 0644)
f.WriteString("Tercera línea\n")
f.Close()

contenido, _ = os.ReadFile("archivo.txt")
fmt.Print(string(contenido))`,
    csharp: r`// WriteAllText crea el archivo (o borra lo anterior) y lo cierra al terminar
File.WriteAllText("archivo.txt", "Primera línea\nSegunda línea\n");
Console.Write(File.ReadAllText("archivo.txt"));

File.AppendAllText("archivo.txt", "Tercera línea\n");   // agregar al final
Console.Write(File.ReadAllText("archivo.txt"));`,
    ruby: r`File.open('archivo.txt', 'w') do |f|   # 'w': escribir (borra lo anterior)
  f.write("Primera línea\n")
  f.write("Segunda línea\n")
end   # el bloque cierra el archivo al terminar

print File.read('archivo.txt')

File.open('archivo.txt', 'a') do |f|   # 'a': agregar al final
  f.write("Tercera línea\n")
end

print File.read('archivo.txt')`,
    rust: r`// fs::write crea el archivo (o borra lo anterior) y lo cierra al terminar
fs::write("archivo.txt", "Primera línea\nSegunda línea\n").unwrap();
print!("{}", fs::read_to_string("archivo.txt").unwrap());

// Para agregar al final se abre con append(true)
let mut f = OpenOptions::new().append(true).open("archivo.txt").unwrap();
writeln!(f, "Tercera línea").unwrap();

print!("{}", fs::read_to_string("archivo.txt").unwrap());`,
    kotlin: r`val archivo = File("archivo.txt")

// writeText crea el archivo (o borra lo anterior) y lo cierra al terminar
archivo.writeText("Primera línea\nSegunda línea\n")
print(archivo.readText())

archivo.appendText("Tercera línea\n")   // agregar al final
print(archivo.readText())`,
  },
  'Métodos de los objetos archivo': {
    jsFixed: true,
    javascript: r`import { readFileSync, writeFileSync } from 'node:fs'

writeFileSync('archivo.txt', 'Esta es la primera línea del archivo.\nSegunda línea del archivo\n')

// Se lee todo el texto y se separa en líneas
const lineas = readFileSync('archivo.txt', 'utf8').trimEnd().split('\n')
for (const linea of lineas) {
  console.log(linea)
}
console.log(lineas.length)`,
    go: r`os.WriteFile("archivo.txt", []byte("Esta es la primera línea del archivo.\nSegunda línea del archivo\n"), 0644)

f, _ := os.Open("archivo.txt")
defer f.Close()

// Scanner lee el archivo línea por línea, sin cargarlo entero en memoria
lector := bufio.NewScanner(f)
total := 0
for lector.Scan() {
    fmt.Println(lector.Text())
    total++
}
fmt.Println(total)`,
    csharp: r`File.WriteAllText("archivo.txt", "Esta es la primera línea del archivo.\nSegunda línea del archivo\n");

// ReadLines lee el archivo línea por línea, sin cargarlo entero en memoria
int total = 0;
foreach (var linea in File.ReadLines("archivo.txt")) {
    Console.WriteLine(linea);
    total++;
}
Console.WriteLine(total);`,
    ruby: r`File.write('archivo.txt', "Esta es la primera línea del archivo.\nSegunda línea del archivo\n")

# foreach lee el archivo línea por línea, sin cargarlo entero en memoria
File.foreach('archivo.txt') do |linea|
  print linea
end
puts File.readlines('archivo.txt').size`,
    rust: r`fs::write("archivo.txt", "Esta es la primera línea del archivo.\nSegunda línea del archivo\n").unwrap();

// BufReader lee el archivo línea por línea, sin cargarlo entero en memoria
let archivo = File::open("archivo.txt").unwrap();
let mut total = 0;
for linea in BufReader::new(archivo).lines() {
    println!("{}", linea.unwrap());
    total += 1;
}
println!("{total}");`,
    kotlin: r`val archivo = File("archivo.txt")
archivo.writeText("Esta es la primera línea del archivo.\nSegunda línea del archivo\n")

// forEachLine lee el archivo línea por línea, sin cargarlo entero en memoria
archivo.forEachLine { linea ->
    println(linea)
}
println(archivo.readLines().size)`,
    output: { javascript: LINEAS, go: LINEAS, csharp: LINEAS, ruby: LINEAS, rust: LINEAS, kotlin: LINEAS },
  },
  'Guardar datos estructurados con JSON': {
    javascript: r`const x = [1, 'simple', 'lista']
console.log(JSON.stringify(x))   // de dato de JavaScript a texto JSON

const datos = { nombre: 'Ana', edad: 25, lenguajes: ['Python', 'PHP'] }
const texto = JSON.stringify(datos)   // este texto es lo que se guarda en un archivo

const leidos = JSON.parse(texto)      // de texto JSON a dato de JavaScript
console.log(leidos.lenguajes)
console.log(JSON.stringify(leidos) === texto)`,
    go: r`type Datos struct {
    Nombre    string   ${b}json:"nombre"${b}
    Edad      int      ${b}json:"edad"${b}
    Lenguajes []string ${b}json:"lenguajes"${b}
}

x, _ := json.Marshal([]any{1, "simple", "lista"})
fmt.Println(string(x)) // de dato de Go a texto JSON

datos := Datos{"Ana", 25, []string{"Python", "PHP"}}
texto, _ := json.Marshal(datos)
os.WriteFile("datos.json", texto, 0644) // guardar en un archivo

contenido, _ := os.ReadFile("datos.json")
var leidos Datos
json.Unmarshal(contenido, &leidos) // leer del archivo
fmt.Println(leidos.Lenguajes)
fmt.Println(reflect.DeepEqual(leidos, datos))`,
    csharp: r`using System.Text.Json;

Console.WriteLine(JsonSerializer.Serialize(new object[] { 1, "simple", "lista" }));   // de dato de C# a texto JSON

var datos = new Datos("Ana", 25, ["Python", "PHP"]);
File.WriteAllText("datos.json", JsonSerializer.Serialize(datos));                    // guardar en un archivo

var leidos = JsonSerializer.Deserialize<Datos>(File.ReadAllText("datos.json"));      // leer del archivo
Console.WriteLine(string.Join(", ", leidos.Lenguajes));
Console.WriteLine(leidos.Nombre == datos.Nombre && leidos.Edad == datos.Edad);

record Datos(string Nombre, int Edad, string[] Lenguajes);`,
    ruby: r`require 'json'

x = [1, 'simple', 'lista']
puts x.to_json   # de dato de Ruby a texto JSON

datos = { 'nombre' => 'Ana', 'edad' => 25, 'lenguajes' => ['Python', 'PHP'] }
File.write('datos.json', datos.to_json)         # guardar en un archivo

leidos = JSON.parse(File.read('datos.json'))    # leer del archivo
p leidos['lenguajes']
puts leidos == datos`,
    rust: r`// serde_json (biblioteca externa)
use serde_json::{json, Value};

let x = json!([1, "simple", "lista"]);
println!("{x}");   // de dato de Rust a texto JSON

let datos = json!({ "nombre": "Ana", "edad": 25, "lenguajes": ["Python", "PHP"] });
fs::write("datos.json", datos.to_string()).unwrap();   // guardar en un archivo

let texto = fs::read_to_string("datos.json").unwrap();
let leidos: Value = serde_json::from_str(&texto).unwrap();   // leer del archivo
println!("{}", leidos["lenguajes"]);
println!("{}", leidos == datos);`,
    kotlin: r`// kotlinx.serialization (biblioteca oficial aparte)
@Serializable
data class Datos(val nombre: String, val edad: Int, val lenguajes: List<String>)

println(Json.encodeToString(listOf("simple", "lista")))   // de dato de Kotlin a texto JSON

val datos = Datos("Ana", 25, listOf("Python", "PHP"))
File("datos.json").writeText(Json.encodeToString(datos))  // guardar en un archivo

val leidos = Json.decodeFromString<Datos>(File("datos.json").readText())   // leer del archivo
println(leidos.lenguajes)
println(leidos == datos)`,
    output: {
      javascript: '[1,"simple","lista"]\n["Python","PHP"]\ntrue',
      go: '[1,"simple","lista"]\n[Python PHP]\ntrue',
      csharp: '[1,"simple","lista"]\nPython, PHP\nTrue',
      ruby: '[1,"simple","lista"]\n["Python", "PHP"]\ntrue',
      rust: '[1,"simple","lista"]\n["Python","PHP"]\ntrue',
      kotlin: '["simple","lista"]\n[Python, PHP]\ntrue',
    },
  },
  'Para leer más': {
    javascript: 'Texto y plantillas en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Text_formatting\nArchivos en Node.js: https://nodejs.org/api/fs.html',
    go: 'Paquete fmt (formato): https://pkg.go.dev/fmt\nPaquete os (archivos): https://pkg.go.dev/os\nJSON en Go: https://go.dev/blog/json',
    csharp: 'Interpolación de cadenas: https://learn.microsoft.com/es-es/dotnet/csharp/language-reference/tokens/interpolated\nArchivos y secuencias: https://learn.microsoft.com/es-es/dotnet/standard/io/',
    ruby: 'Clase File: https://docs.ruby-lang.org/en/master/File.html\nFormato con format: https://docs.ruby-lang.org/en/master/format_specifications_rdoc.html',
    rust: 'Formato con std::fmt: https://doc.rust-lang.org/std/fmt/\nLeer un archivo, en el libro de Rust: https://doc.rust-lang.org/book/ch12-02-reading-a-file.html',
    kotlin: 'Plantillas de texto: https://kotlinlang.org/docs/strings.html#string-templates\nSerialización: https://kotlinlang.org/docs/serialization.html',
  },
}
