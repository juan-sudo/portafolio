// Nivel 10 · Recorrido por la biblioteca estándar
const r = String.raw
const b = '`'

const RUTA = 'informe.txt\n.txt\nproyectos'
const AVISO = 'Aviso: archivo no encontrado'

export default {
  'Sistema operativo y archivos': {
    jsFixed: true,
    javascript: r`import path from 'node:path'

const ruta = 'proyectos/informe.txt'
console.log(path.basename(ruta))
console.log(path.extname(ruta))
console.log(path.dirname(ruta))
// Para copiar, mover o borrar archivos se usa node:fs (copyFileSync, renameSync, rmSync)`,
    go: r`ruta := "proyectos/informe.txt"
fmt.Println(filepath.Base(ruta))
fmt.Println(filepath.Ext(ruta))
fmt.Println(filepath.Dir(ruta))
// Para renombrar o borrar archivos se usa el paquete os (os.Rename, os.Remove)`,
    csharp: r`string ruta = "proyectos/informe.txt";
Console.WriteLine(Path.GetFileName(ruta));
Console.WriteLine(Path.GetExtension(ruta));
Console.WriteLine(Path.GetDirectoryName(ruta));
// Para copiar, mover o borrar archivos se usa la clase File (File.Copy, File.Move, File.Delete)`,
    ruby: r`ruta = 'proyectos/informe.txt'
puts File.basename(ruta)
puts File.extname(ruta)
puts File.dirname(ruta)
# Para copiar, mover o borrar archivos se usa FileUtils (cp, mv, rm)`,
    rust: r`let ruta = Path::new("proyectos/informe.txt");
println!("{}", ruta.file_name().unwrap().to_string_lossy());
println!("{}", ruta.extension().unwrap().to_string_lossy());
println!("{}", ruta.parent().unwrap().display());
// Para copiar, mover o borrar archivos se usa std::fs (copy, rename, remove_file)`,
    kotlin: r`val ruta = File("proyectos/informe.txt")
println(ruta.name)
println(ruta.extension)
println(ruta.parent)
// Para copiar o borrar archivos se usan sus métodos (copyTo, delete)`,
    output: { javascript: RUTA, go: RUTA, csharp: RUTA, ruby: RUTA },
  },
  'Buscar archivos con patrones': {
    javascript: r`const archivos = ['app.py', 'datos.csv', 'prueba.py']
console.log(archivos.filter((nombre) => nombre.endsWith('.py')))
// En Node.js, fs.globSync('*.py') busca archivos reales en una carpeta`,
    go: r`archivos := []string{"app.py", "datos.csv", "prueba.py"}
var encontrados []string
for _, nombre := range archivos {
    if coincide, _ := filepath.Match("*.py", nombre); coincide {
        encontrados = append(encontrados, nombre)
    }
}
fmt.Println(encontrados)
// filepath.Glob("*.py") busca archivos reales en una carpeta`,
    csharp: r`string[] archivos = ["app.py", "datos.csv", "prueba.py"];
Console.WriteLine(string.Join(", ", archivos.Where(nombre => nombre.EndsWith(".py"))));
// Directory.GetFiles(".", "*.py") busca archivos reales en una carpeta`,
    ruby: r`archivos = ['app.py', 'datos.csv', 'prueba.py']
p archivos.select { |nombre| File.fnmatch('*.py', nombre) }
# Dir.glob('*.py') busca archivos reales en una carpeta`,
    rust: r`let archivos = ["app.py", "datos.csv", "prueba.py"];
let encontrados: Vec<&str> = archivos.into_iter().filter(|nombre| nombre.ends_with(".py")).collect();
println!("{:?}", encontrados);
// La biblioteca estándar no trae patrones con *: se añade el paquete glob`,
    kotlin: r`val archivos = listOf("app.py", "datos.csv", "prueba.py")
println(archivos.filter { it.endsWith(".py") })
// File(".").listFiles { archivo -> archivo.extension == "py" } busca archivos reales`,
    output: {
      javascript: '["app.py","prueba.py"]',
      go: '[app.py prueba.py]',
      csharp: 'app.py, prueba.py',
      ruby: '["app.py", "prueba.py"]',
      rust: '["app.py", "prueba.py"]',
    },
  },
  'Argumentos de línea de comandos': {
    jsFixed: true,
    javascript: r`// Al ejecutar: node resumen.js uno.txt dos.txt
// process.argv empieza con la ruta de node y la del archivo
console.log(process.argv.slice(2))
// Para opciones como --lineas 5 existe util.parseArgs`,
    go: r`// Simulamos los argumentos de: resumen uno.txt dos.txt
os.Args = []string{"resumen", "uno.txt", "dos.txt"}
fmt.Println(os.Args[1:])
// Para opciones como -lineas 5 existe el paquete flag`,
    csharp: r`// Al ejecutar: dotnet run -- uno.txt dos.txt
// args ya viene sin el nombre del programa
Console.WriteLine(string.Join(", ", args));
// Para opciones como --lineas 5 existe el paquete System.CommandLine`,
    ruby: r`# Simulamos los argumentos de: ruby resumen.rb uno.txt dos.txt
ARGV.replace(['uno.txt', 'dos.txt'])
p ARGV
# Para opciones como --lineas 5 existe OptionParser`,
    rust: r`// Al ejecutar: cargo run -- uno.txt dos.txt
// skip(1) salta el nombre del programa
let argumentos: Vec<String> = env::args().skip(1).collect();
println!("{:?}", argumentos);
// Para opciones como --lineas 5 se usa el paquete clap`,
    kotlin: r`// Al ejecutar el programa con: uno.txt dos.txt
// args ya viene sin el nombre del programa
fun main(args: Array<String>) {
    println(args.toList())
}`,
    output: {
      javascript: "[ 'uno.txt', 'dos.txt' ]",
      go: '[uno.txt dos.txt]',
      csharp: 'uno.txt, dos.txt',
      ruby: '["uno.txt", "dos.txt"]',
      rust: '["uno.txt", "dos.txt"]',
    },
  },
  'Mensajes de error y salida': {
    javascript: r`// console.error escribe en la salida de errores, separada de la normal
console.error('Aviso: archivo no encontrado')
// En Node.js, process.exit(1) termina el programa con un código de error`,
    go: r`// os.Stderr es la salida de errores, separada de la normal
fmt.Fprintln(os.Stderr, "Aviso: archivo no encontrado")
// os.Exit(1) termina el programa con un código de error`,
    csharp: r`// Console.Error es la salida de errores, separada de la normal
Console.Error.WriteLine("Aviso: archivo no encontrado");
// Environment.Exit(1) termina el programa con un código de error`,
    ruby: r`# warn escribe en la salida de errores, separada de la normal
warn 'Aviso: archivo no encontrado'
# exit(1) termina el programa con un código de error`,
    rust: r`// eprintln! escribe en la salida de errores, separada de la normal
eprintln!("Aviso: archivo no encontrado");
// std::process::exit(1) termina el programa con un código de error`,
    kotlin: r`// System.err es la salida de errores, separada de la normal
System.err.println("Aviso: archivo no encontrado")
// exitProcess(1) termina el programa con un código de error`,
    output: { javascript: AVISO, go: AVISO, csharp: AVISO, ruby: AVISO, rust: AVISO, kotlin: AVISO },
  },
  'Buscar y reemplazar con expresiones regulares': {
    javascript: r`const frase = 'el gato y el perro'
console.log(frase.match(/\b\w+/g))   // la g final busca todas las coincidencias
console.log(frase.replace(/\bperro\b/, 'conejo'))`,
    go: r`frase := "el gato y el perro"
palabras := regexp.MustCompile(${b}\b\w+${b})
fmt.Println(palabras.FindAllString(frase, -1)) // -1: todas las coincidencias
fmt.Println(regexp.MustCompile(${b}\bperro\b${b}).ReplaceAllString(frase, "conejo"))`,
    csharp: r`using System.Text.RegularExpressions;

string frase = "el gato y el perro";
Console.WriteLine(string.Join(", ", Regex.Matches(frase, @"\b\w+").Select(coincidencia => coincidencia.Value)));
Console.WriteLine(Regex.Replace(frase, @"\bperro\b", "conejo"));`,
    ruby: r`frase = 'el gato y el perro'
p frase.scan(/\b\w+/)   # scan devuelve todas las coincidencias
puts frase.sub(/\bperro\b/, 'conejo')`,
    rust: r`// regex (biblioteca externa)
use regex::Regex;

let frase = "el gato y el perro";
let palabras: Vec<&str> = Regex::new(r"\b\w+").unwrap().find_iter(frase).map(|m| m.as_str()).collect();
println!("{:?}", palabras);
println!("{}", Regex::new(r"\bperro\b").unwrap().replace(frase, "conejo"));`,
    kotlin: r`val frase = "el gato y el perro"
println(Regex("""\b\w+""").findAll(frase).map { it.value }.toList())
println(frase.replace(Regex("""\bperro\b"""), "conejo"))`,
    output: {
      javascript: '["el","gato","y","el","perro"]\nel gato y el conejo',
      go: '[el gato y el perro]\nel gato y el conejo',
      csharp: 'el, gato, y, el, perro\nel gato y el conejo',
      ruby: '["el", "gato", "y", "el", "perro"]\nel gato y el conejo',
      rust: '["el", "gato", "y", "el", "perro"]\nel gato y el conejo',
    },
  },
  'Matemáticas, azar y estadísticas': {
    javascript: r`const notas = [12, 15, 18]
console.log(Math.round(Math.sqrt(81)))

// No hay módulo de estadística: la media y la mediana se calculan a mano
const media = notas.reduce((suma, nota) => suma + nota, 0) / notas.length
console.log(media)

const ordenadas = notas.toSorted((a, b) => a - b)
console.log(ordenadas[Math.floor(ordenadas.length / 2)])`,
    go: r`notas := []float64{12, 15, 18}
fmt.Println(math.Sqrt(81))

// No hay paquete de estadística: la media y la mediana se calculan a mano
suma := 0.0
for _, nota := range notas {
    suma += nota
}
fmt.Println(suma / float64(len(notas)))

slices.Sort(notas)
fmt.Println(notas[len(notas)/2])`,
    csharp: r`int[] notas = [12, 15, 18];
Console.WriteLine(Math.Sqrt(81));
Console.WriteLine(notas.Average());

// No hay función de mediana: se ordena y se toma el valor central
Console.WriteLine(notas.Order().ElementAt(notas.Length / 2));`,
    ruby: r`notas = [12, 15, 18]
puts Math.sqrt(81).round
puts notas.sum / notas.size

# No hay método de mediana: se ordena y se toma el valor central
puts notas.sort[notas.size / 2]`,
    rust: r`let mut notas = [12.0, 15.0, 18.0];
println!("{}", 81_f64.sqrt());

// No hay módulo de estadística: la media y la mediana se calculan a mano
let media = notas.iter().sum::<f64>() / notas.len() as f64;
println!("{media}");

notas.sort_by(|a, b| a.total_cmp(b));
println!("{}", notas[notas.len() / 2]);`,
    kotlin: r`val notas = listOf(12, 15, 18)
println(sqrt(81.0).roundToInt())
println(notas.average())

// No hay función de mediana: se ordena y se toma el valor central
println(notas.sorted()[notas.size / 2])`,
    output: {
      javascript: '9\n15\n15',
      go: '9\n15\n15',
      csharp: '9\n15\n15',
      ruby: '9\n15\n15',
      rust: '9\n15\n15',
    },
  },
  'Acceso a internet y URL': {
    javascript: r`const url = new URL('https://ejemplo.com/buscar?q=python')
console.log(url.protocol.replace(':', ''))
console.log(url.host)
console.log(url.pathname)
// fetch(url) descarga el recurso: viene incluido en el navegador y en Node.js`,
    go: r`direccion, _ := url.Parse("https://ejemplo.com/buscar?q=python")
fmt.Println(direccion.Scheme)
fmt.Println(direccion.Host)
fmt.Println(direccion.Path)
// http.Get(...) descarga el recurso: el paquete net/http viene incluido`,
    csharp: r`var url = new Uri("https://ejemplo.com/buscar?q=python");
Console.WriteLine(url.Scheme);
Console.WriteLine(url.Host);
Console.WriteLine(url.AbsolutePath);
// HttpClient descarga recursos: viene incluido en .NET`,
    ruby: r`require 'uri'

url = URI.parse('https://ejemplo.com/buscar?q=python')
puts url.scheme
puts url.host
puts url.path
# Net::HTTP.get(url) descarga el recurso: viene incluido en Ruby`,
    rust: r`// url (biblioteca externa)
use url::Url;

let direccion = Url::parse("https://ejemplo.com/buscar?q=python").unwrap();
println!("{}", direccion.scheme());
println!("{}", direccion.host_str().unwrap());
println!("{}", direccion.path());
// Para descargar recursos se usa el paquete reqwest`,
    kotlin: r`val url = URI("https://ejemplo.com/buscar?q=python")
println(url.scheme)
println(url.host)
println(url.path)
// java.net.http.HttpClient descarga recursos: viene incluido en la JVM`,
  },
  'Fechas y horas': {
    javascript: r`const fecha = new Date(2026, 9, 10)   // ¡ojo! los meses empiezan en 0: 9 es octubre
console.log(fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }))

const MILISEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000
console.log((new Date(2026, 9, 17) - fecha) / MILISEGUNDOS_POR_DIA)`,
    go: r`fecha := time.Date(2026, time.October, 10, 0, 0, 0, 0, time.UTC)
// El formato se escribe con una fecha de referencia: 02/01/2006
fmt.Println(fecha.Format("02/01/2006"))

otra := time.Date(2026, time.October, 17, 0, 0, 0, 0, time.UTC)
fmt.Println(otra.Sub(fecha).Hours() / 24)`,
    csharp: r`var fecha = new DateOnly(2026, 10, 10);
Console.WriteLine(fecha.ToString("dd'/'MM'/'yyyy"));
Console.WriteLine(new DateOnly(2026, 10, 17).DayNumber - fecha.DayNumber);`,
    ruby: r`require 'date'

fecha = Date.new(2026, 10, 10)
puts fecha.strftime('%d/%m/%Y')
puts (Date.new(2026, 10, 17) - fecha).to_i`,
    rust: r`// chrono (biblioteca externa)
use chrono::NaiveDate;

let fecha = NaiveDate::from_ymd_opt(2026, 10, 10).unwrap();
println!("{}", fecha.format("%d/%m/%Y"));

let otra = NaiveDate::from_ymd_opt(2026, 10, 17).unwrap();
println!("{}", (otra - fecha).num_days());`,
    kotlin: r`val fecha = LocalDate.of(2026, 10, 10)
println(fecha.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
println(ChronoUnit.DAYS.between(fecha, LocalDate.of(2026, 10, 17)))`,
  },
  'Comprimir datos': {
    jsFixed: true,
    javascript: r`import { deflateSync, inflateSync } from 'node:zlib'

const texto = 'comprimir datos repetidos '.repeat(20)
const comprimido = deflateSync(texto)
console.log(inflateSync(comprimido).toString() === texto)
console.log(comprimido.length < texto.length)`,
    go: r`texto := bytes.Repeat([]byte("comprimir datos repetidos "), 20)

var comprimido bytes.Buffer
escritor := gzip.NewWriter(&comprimido)
escritor.Write(texto)
escritor.Close()
tamano := comprimido.Len()

lector, _ := gzip.NewReader(&comprimido)
original, _ := io.ReadAll(lector)
fmt.Println(bytes.Equal(original, texto))
fmt.Println(tamano < len(texto))`,
    csharp: r`using System.IO.Compression;

byte[] texto = System.Text.Encoding.UTF8.GetBytes(string.Concat(Enumerable.Repeat("comprimir datos repetidos ", 20)));

using var salida = new MemoryStream();
using (var gzip = new GZipStream(salida, CompressionMode.Compress)) {
    gzip.Write(texto);
}
byte[] comprimido = salida.ToArray();

using var entrada = new GZipStream(new MemoryStream(comprimido), CompressionMode.Decompress);
using var original = new MemoryStream();
entrada.CopyTo(original);
Console.WriteLine(original.ToArray().SequenceEqual(texto));
Console.WriteLine(comprimido.Length < texto.Length);`,
    ruby: r`require 'zlib'

texto = 'comprimir datos repetidos ' * 20
comprimido = Zlib::Deflate.deflate(texto)
puts Zlib::Inflate.inflate(comprimido).force_encoding('UTF-8') == texto
puts comprimido.bytesize < texto.bytesize`,
    rust: r`// flate2 (biblioteca externa)
use flate2::{read::ZlibDecoder, write::ZlibEncoder, Compression};

let texto = "comprimir datos repetidos ".repeat(20);

let mut codificador = ZlibEncoder::new(Vec::new(), Compression::default());
codificador.write_all(texto.as_bytes()).unwrap();
let comprimido = codificador.finish().unwrap();

let mut original = String::new();
ZlibDecoder::new(&comprimido[..]).read_to_string(&mut original).unwrap();
println!("{}", original == texto);
println!("{}", comprimido.len() < texto.len());`,
    kotlin: r`val texto = "comprimir datos repetidos ".repeat(20).toByteArray()

val salida = ByteArrayOutputStream()
GZIPOutputStream(salida).use { it.write(texto) }
val comprimido = salida.toByteArray()

val original = GZIPInputStream(comprimido.inputStream()).readBytes()
println(original.contentEquals(texto))
println(comprimido.size < texto.size)`,
    output: { javascript: 'true\ntrue', go: 'true\ntrue', ruby: 'true\ntrue', rust: 'true\ntrue' },
  },
  'Medir el rendimiento': {
    javascript: r`let a = 1
let b = 2

const inicio = performance.now()   // milisegundos, con decimales
for (let i = 0; i < 1000; i++) {
  const t = a
  a = b
  b = t
}
const duracion = performance.now() - inicio
console.log(duracion >= 0)
// Mide antes de optimizar: el motor reordena y simplifica el código por su cuenta`,
    go: r`a, b := 1, 2

inicio := time.Now()
for range 1000 {
    a, b = b, a
}
duracion := time.Since(inicio)
fmt.Println(duracion >= 0)
// Para medir de verdad se escriben funciones Benchmark y se ejecuta: go test -bench=.`,
    csharp: r`using System.Diagnostics;

int a = 1, b = 2;

var reloj = Stopwatch.StartNew();
for (int i = 0; i < 1000; i++) {
    (a, b) = (b, a);
}
reloj.Stop();
Console.WriteLine(reloj.Elapsed >= TimeSpan.Zero);
// Para medir de verdad se usa el paquete BenchmarkDotNet`,
    ruby: r`require 'benchmark'

a, b = 1, 2
duracion = Benchmark.realtime do
  1000.times { a, b = b, a }
end
puts duracion >= 0
# Benchmark.bm compara varias alternativas en una tabla`,
    rust: r`let (mut a, mut b) = (1, 2);

let inicio = Instant::now();
for _ in 0..1000 {
    (a, b) = (b, a);
}
let duracion = inicio.elapsed();
println!("{}", duracion >= Duration::ZERO);
// Para medir de verdad se usa el paquete criterion y se compila con --release`,
    kotlin: r`var a = 1
var b = 2

val duracion = measureNanoTime {
    repeat(1000) {
        val t = a
        a = b
        b = t
    }
}
println(duracion >= 0)
// Para medir de verdad se usa la biblioteca kotlinx-benchmark`,
    output: { csharp: 'True' },
  },
  'Comprobar la calidad con pruebas': {
    javascript: r`function promedio(valores) {
  return valores.reduce((suma, valor) => suma + valor, 0) / valores.length
}

// Una prueba compara el resultado real con el esperado
console.log(promedio([2, 4, 6]) === 4)

// Node.js trae su propio ejecutor de pruebas (se lanza con: node --test)
// import test from 'node:test'
// import assert from 'node:assert'
// test('promedio', () => assert.equal(promedio([2, 4, 6]), 4))`,
    go: r`func promedio(valores []float64) float64 {
    suma := 0.0
    for _, valor := range valores {
        suma += valor
    }
    return suma / float64(len(valores))
}

// Una prueba compara el resultado real con el esperado
fmt.Println(promedio([]float64{2, 4, 6}) == 4)

// Las pruebas van en un archivo promedio_test.go y se lanzan con: go test
// func TestPromedio(t *testing.T) {
//     if promedio([]float64{2, 4, 6}) != 4 {
//         t.Error("el promedio debería ser 4")
//     }
// }`,
    csharp: r`double Promedio(double[] valores) => valores.Sum() / valores.Length;

// Una prueba compara el resultado real con el esperado
Console.WriteLine(Promedio([2, 4, 6]) == 4);

// Las pruebas van en un proyecto aparte (xUnit) y se lanzan con: dotnet test
// [Fact]
// public void PromedioDeTresNumeros() => Assert.Equal(4, Calculo.Promedio([2, 4, 6]));`,
    ruby: r`def promedio(valores)
  valores.sum.to_f / valores.size
end

# Una prueba compara el resultado real con el esperado
puts promedio([2, 4, 6]) == 4.0

# Ruby incluye Minitest: las pruebas se lanzan con: ruby promedio_test.rb
# require 'minitest/autorun'
# class PromedioTest < Minitest::Test
#   def test_promedio
#     assert_equal 4.0, promedio([2, 4, 6])
#   end
# end`,
    rust: r`fn promedio(valores: &[f64]) -> f64 {
    valores.iter().sum::<f64>() / valores.len() as f64
}

// Una prueba compara el resultado real con el esperado
println!("{}", promedio(&[2.0, 4.0, 6.0]) == 4.0);

// Las pruebas se escriben en el mismo archivo y se lanzan con: cargo test
// #[test]
// fn promedio_de_tres_numeros() {
//     assert_eq!(promedio(&[2.0, 4.0, 6.0]), 4.0);
// }`,
    kotlin: r`fun promedio(valores: List<Int>) = valores.average()

// Una prueba compara el resultado real con el esperado
println(promedio(listOf(2, 4, 6)) == 4.0)

// Las pruebas van en la carpeta src/test y se lanzan con: ./gradlew test
// @Test
// fun promedioDeTresNumeros() = assertEquals(4.0, promedio(listOf(2, 4, 6)))`,
    output: { csharp: 'True' },
  },
  'Módulos para intercambiar datos': {
    javascript: r`const datos = { nombre: 'Ana', edad: 25 }
const texto = JSON.stringify(datos)
const recuperado = JSON.parse(texto)
console.log(recuperado.nombre)

// No hay lector de CSV incluido: para datos sencillos basta con split
const filas = ['nombre,edad', 'Ana,25'].map((linea) => linea.split(','))
console.log(filas[1])`,
    go: r`texto, _ := json.Marshal(map[string]any{"nombre": "Ana", "edad": 25})
var recuperado map[string]any
json.Unmarshal(texto, &recuperado)
fmt.Println(recuperado["nombre"])

lector := csv.NewReader(strings.NewReader("nombre,edad\nAna,25"))
filas, _ := lector.ReadAll()
fmt.Println(filas[1])
// También vienen incluidos encoding/xml y database/sql`,
    csharp: r`using System.Text.Json;

string texto = JsonSerializer.Serialize(new { nombre = "Ana", edad = 25 });
var recuperado = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(texto);
Console.WriteLine(recuperado["nombre"]);

// No hay lector de CSV incluido: para datos sencillos basta con Split
string[] filas = ["nombre,edad", "Ana,25"];
Console.WriteLine(string.Join(", ", filas[1].Split(',')));`,
    ruby: r`require 'json'
require 'csv'

datos = { 'nombre' => 'Ana', 'edad' => 25 }
texto = datos.to_json
recuperado = JSON.parse(texto)
puts recuperado['nombre']

p CSV.parse("nombre,edad\nAna,25")[1]
# También vienen incluidos YAML y, como gemas oficiales, REXML y SQLite3`,
    rust: r`// serde_json (biblioteca externa)
use serde_json::{json, Value};

let texto = json!({ "nombre": "Ana", "edad": 25 }).to_string();
let recuperado: Value = serde_json::from_str(&texto).unwrap();
println!("{}", recuperado["nombre"].as_str().unwrap());

// Para CSV de verdad se usa el paquete csv; para datos sencillos basta con split
let fila: Vec<&str> = "Ana,25".split(',').collect();
println!("{:?}", fila);`,
    kotlin: r`// kotlinx.serialization (biblioteca oficial aparte)
val texto = Json.encodeToString(mapOf("nombre" to "Ana", "edad" to "25"))
val recuperado = Json.decodeFromString<Map<String, String>>(texto)
println(recuperado["nombre"])

// No hay lector de CSV incluido: para datos sencillos basta con split
val filas = listOf("nombre,edad", "Ana,25").map { it.split(",") }
println(filas[1])`,
    output: {
      javascript: 'Ana\n["Ana","25"]',
      go: 'Ana\n[Ana 25]',
      csharp: 'Ana\nAna, 25',
      ruby: 'Ana\n["Ana", "25"]',
      rust: 'Ana\n["Ana", "25"]',
      kotlin: 'Ana\n[Ana, 25]',
    },
  },
  'Para leer más': {
    javascript: 'Módulos incluidos en Node.js: https://nodejs.org/api/\nObjetos incluidos en JavaScript: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects',
    go: 'Biblioteca estándar de Go: https://pkg.go.dev/std',
    csharp: 'Biblioteca de clases de .NET: https://learn.microsoft.com/es-es/dotnet/standard/class-library-overview\nExplorador de API: https://learn.microsoft.com/es-es/dotnet/api/',
    ruby: 'Biblioteca estándar de Ruby: https://docs.ruby-lang.org/en/master/standard_library_md.html',
    rust: 'Biblioteca estándar de Rust: https://doc.rust-lang.org/std/\nPaquetes de la comunidad: https://crates.io/',
    kotlin: 'Biblioteca estándar de Kotlin: https://kotlinlang.org/api/core/kotlin-stdlib/',
  },
}
