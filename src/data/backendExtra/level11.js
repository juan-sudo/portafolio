// Nivel 11 · Recorrido avanzado por la biblioteca estándar
const r = String.raw
const b = '`'
const d = '$'

export default {
  'Formato y plantillas de texto': {
    javascript: r`const texto = 'Los datos se entienden mejor cuando se presentan con claridad.'
// No hay función para ajustar párrafos: una expresión regular corta en el último espacio antes de 24
console.log(texto.replace(/(.{1,24})(\s+|$)/g, '$1\n').trimEnd())

const nombre = 'Ana'
console.log(${b}Hola, ${d}{nombre}${b})   // las plantillas separan el texto de los valores`,
    go: r`func ajustar(texto string, ancho int) string {
    var lineas []string
    linea := ""
    for _, palabra := range strings.Fields(texto) {
        if linea != "" && len(linea)+1+len(palabra) > ancho {
            lineas = append(lineas, linea)
            linea = ""
        }
        if linea != "" {
            linea += " "
        }
        linea += palabra
    }
    return strings.Join(append(lineas, linea), "\n")
}

fmt.Println(ajustar("Los datos se entienden mejor cuando se presentan con claridad.", 24))

// text/template separa el texto de los valores que se insertan
plantilla := template.Must(template.New("saludo").Parse("Hola, {{.Nombre}}\n"))
plantilla.Execute(os.Stdout, map[string]string{"Nombre": "Ana"})`,
    csharp: r`using System.Text.RegularExpressions;

string texto = "Los datos se entienden mejor cuando se presentan con claridad.";
// No hay función para ajustar párrafos: una expresión regular corta en el último espacio antes de 24
Console.WriteLine(Regex.Replace(texto, @"(.{1,24})(\s+|$)", "$1\n").TrimEnd());

string nombre = "Ana";
Console.WriteLine($"Hola, {nombre}");   // la interpolación separa el texto de los valores`,
    ruby: r`texto = 'Los datos se entienden mejor cuando se presentan con claridad.'
# No hay método para ajustar párrafos: una expresión regular corta en el último espacio antes de 24
puts texto.gsub(/(.{1,24})(\s+|$)/, "\\1\n")

puts format('Hola, %{nombre}', nombre: 'Ana')   # la plantilla separa el texto de los valores`,
    rust: r`fn ajustar(texto: &str, ancho: usize) -> String {
    let mut lineas: Vec<String> = Vec::new();
    let mut linea = String::new();
    for palabra in texto.split_whitespace() {
        if !linea.is_empty() && linea.chars().count() + 1 + palabra.chars().count() > ancho {
            lineas.push(linea);
            linea = String::new();
        }
        if !linea.is_empty() {
            linea.push(' ');
        }
        linea.push_str(palabra);
    }
    lineas.push(linea);
    lineas.join("\n")
}

println!("{}", ajustar("Los datos se entienden mejor cuando se presentan con claridad.", 24));

let nombre = "Ana";
println!("Hola, {nombre}");   // el formato separa el texto de los valores`,
    kotlin: r`val texto = "Los datos se entienden mejor cuando se presentan con claridad."
// No hay función para ajustar párrafos: una expresión regular corta en el último espacio antes de 24
println(texto.replace(Regex("""(.{1,24})(\s+|$)"""), "$1\n").trimEnd())

val nombre = "Ana"
println("Hola, $nombre")   // las plantillas separan el texto de los valores`,
  },
  'Empaquetar datos binarios': {
    javascript: r`const registro = new ArrayBuffer(6)       // 2 bytes para el id y 4 para la cantidad
const vista = new DataView(registro)
vista.setUint16(0, 7)                     // DataView usa orden big-endian por defecto
vista.setUint32(2, 300)

const hex = [...new Uint8Array(registro)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
console.log(hex)
console.log(vista.getUint16(0), vista.getUint32(2))`,
    go: r`registro := make([]byte, 6) // 2 bytes para el id y 4 para la cantidad
binary.BigEndian.PutUint16(registro[0:], 7)
binary.BigEndian.PutUint32(registro[2:], 300)

fmt.Printf("%x\n", registro)
fmt.Println(binary.BigEndian.Uint16(registro[0:]), binary.BigEndian.Uint32(registro[2:]))`,
    csharp: r`using System.Buffers.Binary;

byte[] registro = new byte[6];   // 2 bytes para el id y 4 para la cantidad
BinaryPrimitives.WriteUInt16BigEndian(registro.AsSpan(0), 7);
BinaryPrimitives.WriteUInt32BigEndian(registro.AsSpan(2), 300);

Console.WriteLine(Convert.ToHexString(registro).ToLower());
ushort id = BinaryPrimitives.ReadUInt16BigEndian(registro.AsSpan(0));
uint cantidad = BinaryPrimitives.ReadUInt32BigEndian(registro.AsSpan(2));
Console.WriteLine($"{id} {cantidad}");`,
    ruby: r`# n: entero de 2 bytes y N: entero de 4 bytes, ambos big-endian
registro = [7, 300].pack('nN')
id, cantidad = registro.unpack('nN')
puts registro.unpack1('H*')
puts "#{id} #{cantidad}"`,
    rust: r`let mut registro = Vec::new();
registro.extend(7u16.to_be_bytes());     // to_be_bytes: orden big-endian
registro.extend(300u32.to_be_bytes());

let hex: String = registro.iter().map(|byte| format!("{byte:02x}")).collect();
println!("{hex}");

let id = u16::from_be_bytes([registro[0], registro[1]]);
let cantidad = u32::from_be_bytes(registro[2..6].try_into().unwrap());
println!("{id} {cantidad}");`,
    kotlin: r`// ByteBuffer usa orden big-endian por defecto
val registro = ByteBuffer.allocate(6).putShort(7).putInt(300)

println(registro.array().joinToString("") { "%02x".format(it) })
println("${d}{registro.getShort(0)} ${d}{registro.getInt(2)}")`,
  },
  'Tareas en segundo plano': {
    javascript: r`const resultado = []

// JavaScript trabaja con un solo hilo: las tareas lentas se escriben como funciones async
async function tarea() {
  await new Promise((listo) => setTimeout(listo, 10))   // simula una espera
  resultado.push('archivo listo')
}

await tarea()
console.log(resultado[0])
// Para cálculo pesado en paralelo, Node.js ofrece worker_threads`,
    go: r`canal := make(chan string)

// go lanza la función en segundo plano; el canal devuelve el resultado
go func() {
    canal <- "archivo listo"
}()

fmt.Println(<-canal) // espera hasta que llegue un valor`,
    csharp: r`var resultado = new List<string>();

var hilo = new Thread(() => resultado.Add("archivo listo"));
hilo.Start();
hilo.Join();   // espera a que el hilo termine
Console.WriteLine(resultado[0]);
// En código nuevo se prefiere Task.Run con await`,
    ruby: r`resultado = []

hilo = Thread.new { resultado << 'archivo listo' }
hilo.join   # espera a que el hilo termine
puts resultado[0]
# Queue ayuda a coordinar varios hilos`,
    rust: r`// spawn lanza el cierre en otro hilo; su valor de retorno se recoge con join
let hilo = thread::spawn(|| String::from("archivo listo"));

let resultado = hilo.join().unwrap();   // espera a que el hilo termine
println!("{resultado}");
// Para pasar mensajes entre hilos están los canales de std::sync::mpsc`,
    kotlin: r`val resultado = mutableListOf<String>()

val hilo = thread { resultado.add("archivo listo") }
hilo.join()   // espera a que el hilo termine
println(resultado[0])
// En código nuevo se prefieren las corrutinas (launch y async)`,
  },
  'Registrar eventos': {
    javascript: r`// console distingue niveles: debug, info, warn y error
console.warn('WARNING: queda poco espacio en disco')
console.error('ERROR: no se pudo guardar el archivo')
// En un servidor real se usa una biblioteca como pino o winston, que filtra por nivel`,
    go: r`// log/slog viene incluido y registra con niveles: Debug, Info, Warn y Error
fmt.Println(slog.LevelWarn)
fmt.Println(slog.LevelError)
// slog.Warn("queda poco espacio", "libre_mb", 120) añade datos con nombre al mensaje`,
    csharp: r`using Microsoft.Extensions.Logging;

// Niveles: Trace, Debug, Information, Warning, Error y Critical
Console.WriteLine(LogLevel.Warning);
Console.WriteLine(LogLevel.Error);
// En ASP.NET Core se recibe un ILogger y se llama a logger.LogWarning("...")`,
    ruby: r`require 'logger'

# Logger viene incluido. Niveles: DEBUG, INFO, WARN, ERROR y FATAL
registro = Logger.new($stdout)
registro.formatter = proc { |nivel, _hora, _programa, mensaje| "#{nivel}: #{mensaje}\n" }
registro.warn('queda poco espacio en disco')
registro.error('no se pudo guardar el archivo')`,
    rust: r`// log (biblioteca externa): define los niveles Trace, Debug, Info, Warn y Error
println!("{}", log::Level::Warn);
println!("{}", log::Level::Error);
// Se usa con macros como warn!("queda poco espacio") y un paquete que decide dónde escribir`,
    kotlin: r`// La JVM incluye java.util.logging; en proyectos reales se usa SLF4J con Logback
println(Level.WARNING)
println(Level.SEVERE)`,
    output: {
      javascript: 'WARNING: queda poco espacio en disco\nERROR: no se pudo guardar el archivo',
      go: 'WARN\nERROR',
      csharp: 'Warning\nError',
      ruby: 'WARN: queda poco espacio en disco\nERROR: no se pudo guardar el archivo',
      rust: 'WARN\nERROR',
    },
  },
  'Referencias débiles': {
    javascript: r`class Producto {}

const producto = new Producto()
const referencia = new WeakRef(producto)       // no impide que el recolector lo libere
console.log(referencia.deref() === producto)   // deref devuelve el objeto, o undefined si ya no existe`,
    go: r`type Producto struct{}

producto := &Producto{}
referencia := weak.Make(producto)           // paquete weak, desde Go 1.24
fmt.Println(referencia.Value() == producto) // Value devuelve el puntero, o nil si ya no existe`,
    csharp: r`var producto = new Producto();
var referencia = new WeakReference<Producto>(producto);   // no impide que el recolector lo libere
// TryGetTarget devuelve false si el objeto ya no existe
Console.WriteLine(referencia.TryGetTarget(out var mismo) && ReferenceEquals(mismo, producto));

class Producto { }`,
    ruby: r`require 'weakref'

class Producto
end

producto = Producto.new
referencia = WeakRef.new(producto)   # no impide que el recolector lo libere
puts referencia.weakref_alive?       # false cuando el objeto ya no existe`,
    rust: r`struct Producto;

// Rc cuenta cuántos dueños tiene un valor; Weak lo observa sin contar como dueño
let producto = Rc::new(Producto);
let referencia: Weak<Producto> = Rc::downgrade(&producto);
println!("{}", referencia.upgrade().is_some());   // upgrade devuelve None si ya se liberó`,
    kotlin: r`class Producto

val producto = Producto()
val referencia = WeakReference(producto)   // no impide que el recolector lo libere
println(referencia.get() === producto)     // get devuelve null si el objeto ya no existe`,
    output: { csharp: 'True' },
  },
  'Colas, heaps y listas compactas': {
    javascript: r`const cola = ['tarea 1', 'tarea 2']
console.log(cola.shift())   // sale el primero que llegó

// No hay heap incluido: para pocos datos basta con ordenar y sacar el primero
const puntajes = [30, 10, 20]
puntajes.sort((a, b) => a - b)
console.log(puntajes.shift())`,
    go: r`cola := []string{"tarea 1", "tarea 2"}
fmt.Println(cola[0]) // sale el primero que llegó
cola = cola[1:]

// El paquete container/heap ofrece un heap; para pocos datos basta con el mínimo
puntajes := []int{30, 10, 20}
fmt.Println(slices.Min(puntajes))`,
    csharp: r`var cola = new Queue<string>(["tarea 1", "tarea 2"]);
Console.WriteLine(cola.Dequeue());   // sale el primero que llegó

// PriorityQueue entrega siempre el elemento de menor prioridad
var puntajes = new PriorityQueue<int, int>();
foreach (var puntaje in new[] { 30, 10, 20 }) {
    puntajes.Enqueue(puntaje, puntaje);
}
Console.WriteLine(puntajes.Dequeue());`,
    ruby: r`cola = ['tarea 1', 'tarea 2']
puts cola.shift   # sale el primero que llegó

# No hay heap incluido: min encuentra el menor sin ordenar toda la lista
puntajes = [30, 10, 20]
puts puntajes.min`,
    rust: r`let mut cola = VecDeque::from(["tarea 1", "tarea 2"]);
println!("{}", cola.pop_front().unwrap());   // sale el primero que llegó

// BinaryHeap entrega el mayor; Reverse invierte el orden para obtener el menor
let mut puntajes = BinaryHeap::from([Reverse(30), Reverse(10), Reverse(20)]);
println!("{}", puntajes.pop().unwrap().0);`,
    kotlin: r`val cola = ArrayDeque(listOf("tarea 1", "tarea 2"))
println(cola.removeFirst())   // sale el primero que llegó

// PriorityQueue entrega siempre el menor elemento
val puntajes = PriorityQueue(listOf(30, 10, 20))
println(puntajes.poll())`,
  },
  'Aritmética decimal precisa': {
    javascript: r`// No hay tipo decimal: el dinero se guarda en céntimos, como número entero
const precioEnCentimos = 70
const totalEnCentimos = Math.round(precioEnCentimos * 105 / 100)
console.log((totalEnCentimos / 100).toFixed(2))

console.log(0.1 + 0.2 === 0.3)   // false: por esto no se usan decimales binarios para dinero`,
    go: r`// No hay tipo decimal incluido: el dinero se guarda en céntimos, como número entero
precioEnCentimos := 70
totalEnCentimos := (precioEnCentimos*105 + 50) / 100 // +50 redondea al céntimo más cercano
fmt.Printf("%d.%02d\n", totalEnCentimos/100, totalEnCentimos%100)

a, b := 0.1, 0.2
fmt.Println(a+b == 0.3) // false: por esto no se usan decimales binarios para dinero`,
    csharp: r`// decimal es un tipo incluido, pensado para dinero: la m final marca el literal
decimal precio = 0.70m;
decimal total = precio * 1.05m;
Console.WriteLine(Math.Round(total, 2));
Console.WriteLine(0.1m * 10 == 1.0m);`,
    ruby: r`require 'bigdecimal'

# BigDecimal se construye desde texto, no desde un Float
precio = BigDecimal('0.70')
total = precio * BigDecimal('1.05')
puts total.round(2).to_s('F')
puts BigDecimal('0.1') * 10 == BigDecimal('1.0')`,
    rust: r`// rust_decimal (biblioteca externa)
use rust_decimal_macros::dec;

let precio = dec!(0.70);
let total = precio * dec!(1.05);
println!("{}", total.round_dp(2));
println!("{}", dec!(0.1) * dec!(10) == dec!(1.0));`,
    kotlin: r`// BigDecimal se construye desde texto, no desde un Double
val precio = BigDecimal("0.70")
val total = precio * BigDecimal("1.05")
println(total.setScale(2, RoundingMode.HALF_EVEN))
println((BigDecimal("0.1") * BigDecimal(10)).compareTo(BigDecimal("1.0")) == 0)`,
    output: { javascript: '0.74\nfalse', go: '0.74\nfalse', csharp: '0.74\nTrue' },
  },
  'Para leer más': {
    javascript: 'WeakRef en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/WeakRef\nHilos en Node.js: https://nodejs.org/api/worker_threads.html',
    go: 'Concurrencia en el recorrido por Go: https://go.dev/tour/concurrency/1\nRegistro estructurado con slog: https://go.dev/blog/slog',
    csharp: 'Programación asincrónica: https://learn.microsoft.com/es-es/dotnet/csharp/asynchronous-programming/\nRegistro en .NET: https://learn.microsoft.com/es-es/dotnet/core/extensions/logging',
    ruby: 'Clase Thread: https://docs.ruby-lang.org/en/master/Thread.html\nLogger: https://docs.ruby-lang.org/en/master/Logger.html',
    rust: 'Concurrencia sin miedo, en el libro de Rust: https://doc.rust-lang.org/book/ch16-00-concurrency.html\nPunteros inteligentes (Rc y Weak): https://doc.rust-lang.org/book/ch15-00-smart-pointers.html',
    kotlin: 'Corrutinas: https://kotlinlang.org/docs/coroutines-overview.html',
  },
}
