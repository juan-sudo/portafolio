// Nivel 8 · Errores y excepciones
const r = String.raw
const b = '`'
const d = '$'

const RETIRO = '70\nError: No puedes retirar 500: tu saldo es 100'
const VUELTAS = 'falló la operación | Ocurrió en la vuelta 1\nfalló la operación | Ocurrió en la vuelta 2\nfalló la operación | Ocurrió en la vuelta 3'

export default {
  'Errores de sintaxis': {
    javascript: r`if (true) console.log('Hola mundo'`,
    go: r`if true fmt.Println("Hola mundo")`,
    csharp: r`if (true) Console.WriteLine("Hola mundo")`,
    ruby: r`puts('Hola mundo'`,
    rust: r`if true println!("Hola mundo");`,
    kotlin: r`if (true) println("Hola mundo"`,
    output: {
      javascript: 'SyntaxError: missing ) after argument list',
      go: './main.go:8:10: syntax error: unexpected name fmt, expected { after if clause',
      csharp: 'Program.cs(1,42): error CS1002: ; expected',
      ruby: "main.rb:1: syntax errors found (SyntaxError)\n> 1 | puts('Hola mundo'\n    |                  ^ unexpected end-of-input; expected a `)` to close the arguments",
      rust: 'error: expected `{`, found `println`\n --> src/main.rs:2:13\n  |\n2 |     if true println!("Hola mundo");\n  |             ^^^^^^^ expected `{`',
      kotlin: "main.kt:2:35: error: expecting ')'\n    if (true) println(\"Hola mundo\"\n                                  ^",
    },
  },
  'Excepciones': {
    javascript: r`console.log('Antes del error')
const usuario = null
console.log(usuario.nombre)   // null no tiene propiedades
console.log('Esto ya no se ejecuta')

// Ojo: en JavaScript 1 / 0 no falla, da Infinity
// Prueba también, una por una:
// console.log(4 + spam * 3)   → ReferenceError
// console.log((5).toUpperCase())   → TypeError`,
    go: r`fmt.Println("Antes del error")
divisor := 0
fmt.Println(10 / divisor)
fmt.Println("Esto ya no se ejecuta")

// En Go, un fallo que detiene el programa se llama panic.
// Los errores normales no se lanzan: se devuelven como un valor`,
    csharp: r`Console.WriteLine("Antes del error");
int divisor = 0;
Console.WriteLine(10 / divisor);
Console.WriteLine("Esto ya no se ejecuta");

// Prueba también, una por una:
// string texto = null; Console.WriteLine(texto.Length);   → NullReferenceException
// Console.WriteLine(int.Parse("dos"));                    → FormatException`,
    ruby: r`puts 'Antes del error'
puts 10 * (1 / 0)
puts 'Esto ya no se ejecuta'

# Prueba también, una por una:
# puts 4 + spam * 3   → NameError
# puts '2' + 2        → TypeError`,
    rust: r`println!("Antes del error");
let divisor: i32 = "0".parse().unwrap();
println!("{}", 10 / divisor);
println!("Esto ya no se ejecuta");

// En Rust, un fallo que detiene el programa se llama panic.
// Los errores normales no se lanzan: se devuelven dentro de un Result`,
    kotlin: r`println("Antes del error")
val divisor = 0
println(10 / divisor)
println("Esto ya no se ejecuta")

// Prueba también, una por una:
// println("dos".toInt())           → NumberFormatException
// println(listOf(1, 2, 3)[5])      → IndexOutOfBoundsException`,
    output: {
      javascript: "Antes del error\nTypeError: Cannot read properties of null (reading 'nombre')",
      go: 'Antes del error\npanic: runtime error: integer divide by zero\n\ngoroutine 1 [running]:\nmain.main()\n\t/app/main.go:10 +0x1d\nexit status 2',
      csharp: 'Antes del error\nUnhandled exception. System.DivideByZeroException: Attempted to divide by zero.\n   at Program.<Main>$(String[] args) in Program.cs:line 3',
      ruby: "Antes del error\nmain.rb:2:in 'Integer#/': divided by 0 (ZeroDivisionError)\n\tfrom main.rb:2:in '<main>'",
      rust: "Antes del error\nthread 'main' panicked at src/main.rs:4:20:\nattempt to divide by zero\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace",
      kotlin: 'Antes del error\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat MainKt.main(main.kt:3)',
    },
  },
  'Manejar excepciones': {
    jsFixed: true,
    javascript: r`import { createInterface } from "node:readline/promises"

const consola = createInterface({ input: process.stdin, output: process.stdout })
let x
while (true) {
  x = Number(await consola.question('Escribe un número: '))
  // Number() no lanza ningún error: devuelve NaN si el texto no es un número
  if (!Number.isNaN(x)) break
  console.log('¡Uy! Eso no es un número válido. Intenta de nuevo...')
}
consola.close()

console.log('Escribiste', x)`,
    go: r`var x int
for {
    var texto string
    fmt.Print("Escribe un número: ")
    fmt.Scanln(&texto)

    // Atoi no lanza nada: devuelve el número y un error, que hay que revisar
    numero, err := strconv.Atoi(texto)
    if err == nil {
        x = numero
        break
    }
    fmt.Println("¡Uy! Eso no es un número válido. Intenta de nuevo...")
}

fmt.Println("Escribiste", x)`,
    csharp: r`int x;
while (true) {
    try {
        Console.Write("Escribe un número: ");
        x = int.Parse(Console.ReadLine());
        break;
    } catch (FormatException) {
        Console.WriteLine("¡Uy! Eso no es un número válido. Intenta de nuevo...");
    }
}

Console.WriteLine("Escribiste " + x);`,
    ruby: r`x = nil
loop do
  begin
    print 'Escribe un número: '
    x = Integer(gets.chomp)
    break
  rescue ArgumentError
    puts '¡Uy! Eso no es un número válido. Intenta de nuevo...'
  end
end

puts "Escribiste #{x}"`,
    rust: r`let x = loop {
    print!("Escribe un número: ");
    io::stdout().flush().unwrap();
    let mut texto = String::new();
    io::stdin().read_line(&mut texto).unwrap();

    // parse no lanza nada: devuelve un Result, que es Ok o Err
    match texto.trim().parse::<i32>() {
        Ok(numero) => break numero,
        Err(_) => println!("¡Uy! Eso no es un número válido. Intenta de nuevo..."),
    }
};

println!("Escribiste {x}");`,
    kotlin: r`var x: Int
while (true) {
    try {
        print("Escribe un número: ")
        x = readln().toInt()
        break
    } catch (error: NumberFormatException) {
        println("¡Uy! Eso no es un número válido. Intenta de nuevo...")
    }
}

println("Escribiste $x")`,
  },
  'Varias excepciones, as y else': {
    javascript: r`function dividir(a, b) {
  try {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Los dos valores deben ser números')
    }
    if (b === 0) throw new RangeError('división entre cero')
    console.log('Resultado:', a / b)
  } catch (error) {
    // Solo hay un catch: el tipo se distingue con instanceof
    if (error instanceof RangeError) {
      console.log('No se puede dividir entre cero:', error.message)
    } else if (error instanceof TypeError) {
      console.log(error.message)
    } else {
      throw error
    }
  }
}

dividir(10, 2)
dividir(10, 0)
dividir(10, 'dos')`,
    go: r`// Un error conocido se declara como variable para poder compararlo
var ErrDivisionEntreCero = errors.New("división entre cero")

func dividir(a, b int) (int, error) {
    if b == 0 {
        return 0, ErrDivisionEntreCero
    }
    return a / b, nil
}

func mostrar(a, b int) {
    resultado, err := dividir(a, b)
    if errors.Is(err, ErrDivisionEntreCero) {
        fmt.Println("No se puede dividir entre cero:", err)
        return
    }
    fmt.Println("Resultado:", resultado) // solo si no hubo error
}

mostrar(10, 2)
mostrar(10, 0)
// mostrar(10, "dos") no compila: los tipos se revisan antes de ejecutar`,
    csharp: r`void Dividir(object a, object b) {
    try {
        int resultado = (int)a / (int)b;
        Console.WriteLine($"Resultado: {resultado}");
    } catch (DivideByZeroException error) {   // la variable guarda la excepción
        Console.WriteLine("No se puede dividir entre cero: " + error.Message);
    } catch (InvalidCastException) {
        Console.WriteLine("Los dos valores deben ser números");
    }
}

Dividir(10, 2);
Dividir(10, 0);
Dividir(10, "dos");`,
    ruby: r`def dividir(a, b)
  resultado = a / b
rescue ZeroDivisionError => error   # => guarda la excepción en una variable
  puts "No se puede dividir entre cero: #{error.message}"
rescue TypeError
  puts 'Los dos valores deben ser números'
else
  puts "Resultado: #{resultado}"    # solo si no hubo error
end

dividir(10, 2)
dividir(10, 0)
dividir(10, 'dos')`,
    rust: r`fn dividir(a: &str, b: &str) -> Result<i32, String> {
    // ? devuelve el error enseguida si la conversión falla
    let a: i32 = a.parse().map_err(|_| "Los dos valores deben ser números")?;
    let b: i32 = b.parse().map_err(|_| "Los dos valores deben ser números")?;
    if b == 0 {
        return Err(String::from("No se puede dividir entre cero"));
    }
    Ok(a / b)
}

for (a, b) in [("10", "2"), ("10", "0"), ("10", "dos")] {
    match dividir(a, b) {
        Ok(resultado) => println!("Resultado: {resultado}"),   // solo si no hubo error
        Err(error) => println!("{error}"),
    }
}`,
    kotlin: r`fun dividir(a: Any, b: Any) {
    try {
        val resultado = (a as Int) / (b as Int)
        println("Resultado: $resultado")
    } catch (error: ArithmeticException) {   // la variable guarda la excepción
        println("No se puede dividir entre cero: ${d}{error.message}")
    } catch (error: ClassCastException) {
        println("Los dos valores deben ser números")
    }
}

dividir(10, 2)
dividir(10, 0)
dividir(10, "dos")`,
    output: {
      javascript: 'Resultado: 5\nNo se puede dividir entre cero: división entre cero\nLos dos valores deben ser números',
      go: 'Resultado: 5\nNo se puede dividir entre cero: división entre cero',
      csharp: 'Resultado: 5\nNo se puede dividir entre cero: Attempted to divide by zero.\nLos dos valores deben ser números',
      ruby: 'Resultado: 5\nNo se puede dividir entre cero: divided by 0\nLos dos valores deben ser números',
      rust: 'Resultado: 5\nNo se puede dividir entre cero\nLos dos valores deben ser números',
    },
  },
  'Lanzar excepciones': {
    javascript: r`function retirar(saldo, monto) {
  if (monto > saldo) {
    throw new Error(${b}No puedes retirar ${d}{monto}: tu saldo es ${d}{saldo}${b})
  }
  return saldo - monto
}

console.log(retirar(100, 30))
try {
  retirar(100, 500)
} catch (error) {
  console.log('Error:', error.message)
}

// throw dentro de catch vuelve a lanzar la excepción que se está manejando
try {
  throw new Error('Hola')
} catch (error) {
  console.log('¡Pasó una excepción!')
  throw error
}`,
    go: r`func retirar(saldo, monto int) (int, error) {
    if monto > saldo {
        return 0, fmt.Errorf("No puedes retirar %d: tu saldo es %d", monto, saldo)
    }
    return saldo - monto, nil
}

saldo, _ := retirar(100, 30)
fmt.Println(saldo)

if _, err := retirar(100, 500); err != nil {
    fmt.Println("Error:", err)
    // Para pasar el error a quien llamó a esta función se escribe: return err
}`,
    csharp: r`int Retirar(int saldo, int monto) {
    if (monto > saldo) {
        throw new ArgumentException($"No puedes retirar {monto}: tu saldo es {saldo}");
    }
    return saldo - monto;
}

Console.WriteLine(Retirar(100, 30));
try {
    Retirar(100, 500);
} catch (ArgumentException error) {
    Console.WriteLine("Error: " + error.Message);
}

// throw sin nada vuelve a lanzar la excepción que se está manejando
try {
    throw new InvalidOperationException("Hola");
} catch (InvalidOperationException) {
    Console.WriteLine("¡Pasó una excepción!");
    throw;
}`,
    ruby: r`def retirar(saldo, monto)
  raise ArgumentError, "No puedes retirar #{monto}: tu saldo es #{saldo}" if monto > saldo
  saldo - monto
end

puts retirar(100, 30)
begin
  retirar(100, 500)
rescue ArgumentError => error
  puts "Error: #{error.message}"
end

# raise sin nada vuelve a lanzar la excepción que se está manejando
begin
  raise NameError, 'Hola'
rescue NameError
  puts '¡Pasó una excepción!'
  raise
end`,
    rust: r`fn retirar(saldo: i32, monto: i32) -> Result<i32, String> {
    if monto > saldo {
        return Err(format!("No puedes retirar {monto}: tu saldo es {saldo}"));
    }
    Ok(saldo - monto)
}

println!("{}", retirar(100, 30).unwrap());

match retirar(100, 500) {
    Ok(saldo) => println!("{saldo}"),
    Err(error) => println!("Error: {error}"),
    // Para pasar el error a quien llamó a esta función se usa el operador ?
}`,
    kotlin: r`fun retirar(saldo: Int, monto: Int): Int {
    if (monto > saldo) {
        throw IllegalArgumentException("No puedes retirar $monto: tu saldo es $saldo")
    }
    return saldo - monto
}

println(retirar(100, 30))
try {
    retirar(100, 500)
} catch (error: IllegalArgumentException) {
    println("Error: ${d}{error.message}")
}

// throw dentro de catch vuelve a lanzar la excepción que se está manejando
try {
    throw IllegalStateException("Hola")
} catch (error: IllegalStateException) {
    println("¡Pasó una excepción!")
    throw error
}`,
    output: {
      javascript: `${RETIRO}\n¡Pasó una excepción!\nError: Hola`,
      go: RETIRO,
      csharp: `${RETIRO}\n¡Pasó una excepción!\nUnhandled exception. System.InvalidOperationException: Hola\n   at Program.<Main>$(String[] args) in Program.cs:line 17`,
      ruby: `${RETIRO}\n¡Pasó una excepción!\nmain.rb:15:in '<main>': Hola (NameError)`,
      rust: RETIRO,
      kotlin: `${RETIRO}\n¡Pasó una excepción!\nException in thread "main" java.lang.IllegalStateException: Hola\n\tat MainKt.main(main.kt:17)`,
    },
  },
  'Encadenar excepciones': {
    javascript: r`function abrirBaseDeDatos() {
  throw new Error('el servidor no responde')
}

try {
  try {
    abrirBaseDeDatos()
  } catch (exc) {
    // cause guarda la excepción original
    throw new Error('No se pudo abrir la base de datos', { cause: exc })
  }
} catch (error) {
  console.log('Error:', error.message)
  console.log('Causa:', error.cause.message)
}`,
    go: r`func abrirBaseDeDatos() error {
    return errors.New("el servidor no responde")
}

func iniciar() error {
    if err := abrirBaseDeDatos(); err != nil {
        // %w envuelve el error original dentro del nuevo
        return fmt.Errorf("no se pudo abrir la base de datos: %w", err)
    }
    return nil
}

err := iniciar()
fmt.Println("Error:", err)
fmt.Println("Causa:", errors.Unwrap(err))`,
    csharp: r`void AbrirBaseDeDatos() {
    throw new TimeoutException("el servidor no responde");
}

try {
    try {
        AbrirBaseDeDatos();
    } catch (TimeoutException exc) {
        // el segundo argumento guarda la excepción original
        throw new InvalidOperationException("No se pudo abrir la base de datos", exc);
    }
} catch (InvalidOperationException error) {
    Console.WriteLine("Error: " + error.Message);
    Console.WriteLine("Causa: " + error.InnerException.Message);
}`,
    ruby: r`def abrir_base_de_datos
  raise IOError, 'el servidor no responde'
end

begin
  begin
    abrir_base_de_datos
  rescue IOError
    # Ruby guarda sola la excepción original como causa
    raise RuntimeError, 'No se pudo abrir la base de datos'
  end
rescue RuntimeError => error
  puts "Error: #{error.message}"
  puts "Causa: #{error.cause.message}"
end`,
    rust: r`fn abrir_base_de_datos() -> Result<(), String> {
    Err(String::from("el servidor no responde"))
}

fn iniciar() -> Result<(), String> {
    // map_err añade contexto al error original antes de devolverlo con ?
    abrir_base_de_datos().map_err(|causa| format!("No se pudo abrir la base de datos: {causa}"))?;
    Ok(())
}

if let Err(error) = iniciar() {
    println!("Error: {error}");
}`,
    kotlin: r`fun abrirBaseDeDatos() {
    throw IOException("el servidor no responde")
}

try {
    try {
        abrirBaseDeDatos()
    } catch (exc: IOException) {
        // el segundo argumento guarda la excepción original
        throw RuntimeException("No se pudo abrir la base de datos", exc)
    }
} catch (error: RuntimeException) {
    println("Error: ${d}{error.message}")
    println("Causa: ${d}{error.cause?.message}")
}`,
    output: {
      go: 'Error: no se pudo abrir la base de datos: el servidor no responde\nCausa: el servidor no responde',
      rust: 'Error: No se pudo abrir la base de datos: el servidor no responde',
    },
  },
  'Excepciones propias': {
    javascript: r`/** Se lanza cuando no hay dinero suficiente. */
class SaldoInsuficienteError extends Error {
  constructor(saldo, monto) {
    super(${b}Saldo insuficiente: tienes ${d}{saldo} y quieres retirar ${d}{monto}${b})
    this.name = 'SaldoInsuficienteError'
    this.faltante = monto - saldo
  }
}

function retirar(saldo, monto) {
  if (monto > saldo) {
    throw new SaldoInsuficienteError(saldo, monto)
  }
  return saldo - monto
}

try {
  retirar(100, 250)
} catch (error) {
  console.log(error.message)
  console.log('Te faltan', error.faltante)
}`,
    go: r`// Cualquier tipo con un método Error() string sirve como error
type SaldoInsuficienteError struct {
    Saldo, Monto int
}

func (e *SaldoInsuficienteError) Error() string {
    return fmt.Sprintf("Saldo insuficiente: tienes %d y quieres retirar %d", e.Saldo, e.Monto)
}

func retirar(saldo, monto int) (int, error) {
    if monto > saldo {
        return 0, &SaldoInsuficienteError{saldo, monto}
    }
    return saldo - monto, nil
}

_, err := retirar(100, 250)
var insuficiente *SaldoInsuficienteError
if errors.As(err, &insuficiente) { // As comprueba si el error es de ese tipo
    fmt.Println(err)
    fmt.Println("Te faltan", insuficiente.Monto-insuficiente.Saldo)
}`,
    csharp: r`try {
    Retirar(100, 250);
} catch (SaldoInsuficienteException error) {
    Console.WriteLine(error.Message);
    Console.WriteLine("Te faltan " + error.Faltante);
}

int Retirar(int saldo, int monto) {
    if (monto > saldo) {
        throw new SaldoInsuficienteException(saldo, monto);
    }
    return saldo - monto;
}

/// <summary>Se lanza cuando no hay dinero suficiente.</summary>
class SaldoInsuficienteException : Exception {
    public int Faltante { get; }

    public SaldoInsuficienteException(int saldo, int monto)
        : base($"Saldo insuficiente: tienes {saldo} y quieres retirar {monto}") {
        Faltante = monto - saldo;
    }
}`,
    ruby: r`# Se lanza cuando no hay dinero suficiente.
class SaldoInsuficienteError < StandardError
  attr_reader :faltante

  def initialize(saldo, monto)
    super("Saldo insuficiente: tienes #{saldo} y quieres retirar #{monto}")
    @faltante = monto - saldo
  end
end

def retirar(saldo, monto)
  raise SaldoInsuficienteError.new(saldo, monto) if monto > saldo
  saldo - monto
end

begin
  retirar(100, 250)
rescue SaldoInsuficienteError => error
  puts error.message
  puts "Te faltan #{error.faltante}"
end`,
    rust: r`/// Se devuelve cuando no hay dinero suficiente.
struct SaldoInsuficiente {
    saldo: i32,
    monto: i32,
}

// Display define el mensaje que se muestra al imprimir el error
impl fmt::Display for SaldoInsuficiente {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Saldo insuficiente: tienes {} y quieres retirar {}", self.saldo, self.monto)
    }
}

fn retirar(saldo: i32, monto: i32) -> Result<i32, SaldoInsuficiente> {
    if monto > saldo {
        return Err(SaldoInsuficiente { saldo, monto });
    }
    Ok(saldo - monto)
}

if let Err(error) = retirar(100, 250) {
    println!("{error}");
    println!("Te faltan {}", error.monto - error.saldo);
}`,
    kotlin: r`/** Se lanza cuando no hay dinero suficiente. */
class SaldoInsuficienteException(saldo: Int, monto: Int) :
    Exception("Saldo insuficiente: tienes $saldo y quieres retirar $monto") {
    val faltante = monto - saldo
}

fun retirar(saldo: Int, monto: Int): Int {
    if (monto > saldo) {
        throw SaldoInsuficienteException(saldo, monto)
    }
    return saldo - monto
}

try {
    retirar(100, 250)
} catch (error: SaldoInsuficienteException) {
    println(error.message)
    println("Te faltan ${d}{error.faltante}")
}`,
  },
  'Acciones de limpieza: finally': {
    javascript: r`function dividir(x, y) {
  try {
    if (y === 0) throw new RangeError('división entre cero')
    console.log('El resultado es', x / y)
  } catch {
    console.log('¡División entre cero!')
  } finally {
    console.log('Ejecutando finally')   // se ejecuta siempre, haya error o no
  }
}

dividir(2, 1)
dividir(2, 0)

function saludar() {
  try {
    return 'Hola desde try'
  } finally {
    console.log('finally se ejecuta antes de salir de la función')
  }
}

console.log(saludar())`,
    go: r`// Go no tiene finally: defer deja una acción pendiente para cuando la función termine
func dividir(x, y int) {
    defer fmt.Println("Ejecutando defer") // se ejecuta siempre, haya error o no

    if y == 0 {
        fmt.Println("¡División entre cero!")
        return
    }
    fmt.Println("El resultado es", x/y)
}

func saludar() string {
    defer fmt.Println("defer se ejecuta antes de salir de la función")
    return "Hola desde la función"
}

dividir(2, 1)
dividir(2, 0)
fmt.Println(saludar())`,
    csharp: r`void Dividir(int x, int y) {
    try {
        Console.WriteLine("El resultado es " + x / y);
    } catch (DivideByZeroException) {
        Console.WriteLine("¡División entre cero!");
    } finally {
        Console.WriteLine("Ejecutando finally");   // se ejecuta siempre, haya error o no
    }
}

string Saludar() {
    try {
        return "Hola desde try";
    } finally {
        Console.WriteLine("finally se ejecuta antes de salir del método");
    }
}

Dividir(2, 1);
Dividir(2, 0);
Console.WriteLine(Saludar());`,
    ruby: r`def dividir(x, y)
  resultado = x / y
rescue ZeroDivisionError
  puts '¡División entre cero!'
else
  puts "El resultado es #{resultado}"
ensure
  puts 'Ejecutando ensure'   # se ejecuta siempre, haya error o no
end

dividir(2, 1)
dividir(2, 0)

def saludar
  return 'Hola desde el método'
ensure
  puts 'ensure se ejecuta antes de salir del método'
end

puts saludar`,
    rust: r`// Rust no tiene finally: el método drop se ejecuta solo cuando un valor deja de existir
struct Aviso;

impl Drop for Aviso {
    fn drop(&mut self) {
        println!("Ejecutando drop");   // se ejecuta siempre, haya error o no
    }
}

fn dividir(x: i32, y: i32) {
    let _aviso = Aviso;
    if y == 0 {
        println!("¡División entre cero!");
        return;
    }
    println!("El resultado es {}", x / y);
}

dividir(2, 1);
dividir(2, 0);`,
    kotlin: r`fun dividir(x: Int, y: Int) {
    try {
        println("El resultado es ${d}{x / y}")
    } catch (error: ArithmeticException) {
        println("¡División entre cero!")
    } finally {
        println("Ejecutando finally")   // se ejecuta siempre, haya error o no
    }
}

fun saludar(): String {
    try {
        return "Hola desde try"
    } finally {
        println("finally se ejecuta antes de salir de la función")
    }
}

dividir(2, 1)
dividir(2, 0)
println(saludar())`,
    output: {
      javascript: 'El resultado es 2\nEjecutando finally\n¡División entre cero!\nEjecutando finally\nfinally se ejecuta antes de salir de la función\nHola desde try',
      go: 'El resultado es 2\nEjecutando defer\n¡División entre cero!\nEjecutando defer\ndefer se ejecuta antes de salir de la función\nHola desde la función',
      ruby: 'El resultado es 2\nEjecutando ensure\n¡División entre cero!\nEjecutando ensure\nensure se ejecuta antes de salir del método\nHola desde el método',
      rust: 'El resultado es 2\nEjecutando drop\n¡División entre cero!\nEjecutando drop',
      kotlin: 'El resultado es 2\nEjecutando finally\n¡División entre cero!\nEjecutando finally\nfinally se ejecuta antes de salir de la función\nHola desde try',
    },
  },
  'Limpieza automática: with': {
    jsFixed: true,
    javascript: r`import { readFileSync, writeFileSync } from 'node:fs'

// Estas funciones abren el archivo, hacen su trabajo y lo cierran, incluso si hay un error
writeFileSync('mi_archivo.txt', 'línea 1\nlínea 2\n')

for (const linea of readFileSync('mi_archivo.txt', 'utf8').trimEnd().split('\n')) {
  console.log(linea)
}`,
    go: r`f, _ := os.Create("mi_archivo.txt")
f.WriteString("línea 1\nlínea 2\n")
f.Close()

f, _ = os.Open("mi_archivo.txt")
defer f.Close() // defer lo cerrará al salir, aunque ocurra un error

lector := bufio.NewScanner(f)
for lector.Scan() {
    fmt.Println(lector.Text())
}`,
    csharp: r`// using cierra el archivo al salir del bloque, aunque ocurra un error
using (var escritor = new StreamWriter("mi_archivo.txt")) {
    escritor.Write("línea 1\nlínea 2\n");
}

using (var lector = new StreamReader("mi_archivo.txt")) {
    string linea;
    while ((linea = lector.ReadLine()) != null) {
        Console.WriteLine(linea);
    }
}`,
    ruby: r`# El bloque cierra el archivo al terminar, aunque ocurra un error
File.open('mi_archivo.txt', 'w') do |f|
  f.write("línea 1\nlínea 2\n")
end

File.open('mi_archivo.txt') do |f|
  f.each_line { |linea| print linea }
end`,
    rust: r`{
    let mut f = File::create("mi_archivo.txt").unwrap();
    f.write_all("línea 1\nlínea 2\n".as_bytes()).unwrap();
}   // al cerrarse la llave, f deja de existir y el archivo se cierra solo

let f = File::open("mi_archivo.txt").unwrap();
for linea in BufReader::new(f).lines() {
    println!("{}", linea.unwrap());
}`,
    kotlin: r`// use cierra el archivo al salir del bloque, aunque ocurra un error
File("mi_archivo.txt").bufferedWriter().use { escritor ->
    escritor.write("línea 1\nlínea 2\n")
}

File("mi_archivo.txt").bufferedReader().use { lector ->
    lector.forEachLine { linea -> println(linea) }
}`,
  },
  'Varias excepciones a la vez': {
    javascript: r`function f() {
  const errores = [new RangeError('error 1'), new TypeError('error 2')]
  throw new AggregateError(errores, 'hubo problemas')   // agrupa varios errores en uno
}

try {
  f()
} catch (grupo) {
  for (const error of grupo.errors) {
    console.log(${b}Hubo un error ${d}{error.name}: ${d}{error.message}${b})
  }
}`,
    go: r`func f() error {
    // Join agrupa varios errores en uno solo
    return errors.Join(errors.New("error 1"), errors.New("error 2"))
}

if err := f(); err != nil {
    fmt.Println("Hubo problemas:")
    fmt.Println(err) // muestra cada error en una línea
}`,
    csharp: r`void F() {
    var errores = new Exception[] { new IOException("error 1"), new InvalidOperationException("error 2") };
    throw new AggregateException("hubo problemas", errores);   // agrupa varias excepciones en una
}

try {
    F();
} catch (AggregateException grupo) {
    foreach (var error in grupo.InnerExceptions) {
        Console.WriteLine($"Hubo un error {error.GetType().Name}: {error.Message}");
    }
}`,
    ruby: r`# Ruby no tiene grupos de excepciones: se guardan en un arreglo
tareas = [
  -> { raise IOError, 'error 1' },
  -> { raise ArgumentError, 'error 2' },
]

errores = []
tareas.each do |tarea|
  tarea.call
rescue StandardError => error
  errores << error
end

errores.each do |error|
  puts "Hubo un error #{error.class}: #{error.message}"
end`,
    rust: r`// No hay excepciones: los errores se juntan en un vector como cualquier otro dato
let resultados: Vec<Result<i32, String>> = vec![
    Ok(1),
    Err(String::from("error 1")),
    Err(String::from("error 2")),
];

let errores: Vec<String> = resultados.into_iter().filter_map(Result::err).collect();
for error in &errores {
    println!("Hubo un error: {error}");
}`,
    kotlin: r`fun f() {
    val principal = IllegalStateException("hubo problemas")
    // addSuppressed adjunta otras excepciones a la principal
    principal.addSuppressed(IOException("error 1"))
    principal.addSuppressed(IllegalStateException("error 2"))
    throw principal
}

try {
    f()
} catch (grupo: IllegalStateException) {
    for (error in grupo.suppressed) {
        println("Hubo un error ${d}{error::class.simpleName}: ${d}{error.message}")
    }
}`,
    output: {
      javascript: 'Hubo un error RangeError: error 1\nHubo un error TypeError: error 2',
      go: 'Hubo problemas:\nerror 1\nerror 2',
      csharp: 'Hubo un error IOException: error 1\nHubo un error InvalidOperationException: error 2',
      ruby: 'Hubo un error IOError: error 1\nHubo un error ArgumentError: error 2',
      rust: 'Hubo un error: error 1\nHubo un error: error 2',
    },
  },
  'Añadir notas a las excepciones': {
    javascript: r`function operacion() {
  throw new Error('falló la operación')
}

const errores = []
for (let i = 0; i < 3; i++) {
  try {
    operacion()
  } catch (error) {
    // Un error es un objeto: se le puede añadir una propiedad con más información
    error.nota = ${b}Ocurrió en la vuelta ${d}{i + 1}${b}
    errores.push(error)
  }
}

for (const error of errores) {
  console.log(error.message, '|', error.nota)
}`,
    go: r`func operacion() error {
    return errors.New("falló la operación")
}

var errores []error
for i := range 3 {
    if err := operacion(); err != nil {
        // %w envuelve el error original y permite añadirle contexto
        errores = append(errores, fmt.Errorf("%w | Ocurrió en la vuelta %d", err, i+1))
    }
}

for _, err := range errores {
    fmt.Println(err)
}`,
    csharp: r`void Operacion() {
    throw new InvalidOperationException("falló la operación");
}

var errores = new List<Exception>();
for (int i = 0; i < 3; i++) {
    try {
        Operacion();
    } catch (Exception error) {
        // Data es un diccionario para adjuntar información a la excepción
        error.Data["nota"] = $"Ocurrió en la vuelta {i + 1}";
        errores.Add(error);
    }
}

foreach (var error in errores) {
    Console.WriteLine($"{error.Message} | {error.Data["nota"]}");
}`,
    ruby: r`def operacion
  raise IOError, 'falló la operación'
end

errores = []
3.times do |i|
  operacion
rescue StandardError => error
  # Se guarda la excepción junto con la información adicional
  errores << [error, "Ocurrió en la vuelta #{i + 1}"]
end

errores.each do |error, nota|
  puts "#{error.message} | #{nota}"
end`,
    rust: r`fn operacion() -> Result<(), String> {
    Err(String::from("falló la operación"))
}

let mut errores = Vec::new();
for i in 0..3 {
    if let Err(error) = operacion() {
        // El error es un valor: se le añade contexto al guardarlo
        errores.push(format!("{error} | Ocurrió en la vuelta {}", i + 1));
    }
}

for error in &errores {
    println!("{error}");
}`,
    kotlin: r`fun operacion() {
    throw IOException("falló la operación")
}

val errores = mutableListOf<Pair<Exception, String>>()
for (i in 0 until 3) {
    try {
        operacion()
    } catch (error: Exception) {
        // Se guarda la excepción junto con la información adicional
        errores.add(error to "Ocurrió en la vuelta ${d}{i + 1}")
    }
}

for ((error, nota) in errores) {
    println("${d}{error.message} | $nota")
}`,
    output: { javascript: VUELTAS },
  },
  'Para leer más': {
    javascript: 'Control de flujo y manejo de errores en MDN: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Control_flow_and_error_handling\nObjeto Error: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Error',
    go: 'Manejo de errores en Go: https://go.dev/blog/error-handling-and-go\nTrabajar con errores (Is, As y %w): https://go.dev/blog/go1.13-errors',
    csharp: 'Excepciones y control de excepciones: https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/exceptions/',
    ruby: 'Excepciones: https://docs.ruby-lang.org/en/master/exceptions_md.html\nClase Exception: https://docs.ruby-lang.org/en/master/Exception.html',
    rust: 'Manejo de errores en el libro de Rust: https://doc.rust-lang.org/book/ch09-00-error-handling.html',
    kotlin: 'Excepciones: https://kotlinlang.org/docs/exceptions.html',
  },
}
