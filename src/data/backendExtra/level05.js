// Nivel 5 · Estructuras de datos
const r = String.raw
const b = '`'
const d = '$'

const DATOS_5_LINEAS = 'galahad el puro\nrobin el valiente\n0 tic\n1 tac\n2 toe'

export default {
  'Más sobre listas': {
    javascript: r`const frutas = ['naranja', 'manzana', 'pera', 'plátano', 'kiwi', 'manzana', 'plátano']
console.log(frutas.filter((f) => f === 'manzana').length)
console.log(frutas.indexOf('plátano'))
console.log(frutas.indexOf('plátano', 4))  // buscar desde la posición 4
frutas.reverse()
console.log(frutas)
frutas.push('uva')
frutas.sort()
console.log(frutas)
console.log(frutas.pop())`,
    go: r`frutas := []string{"naranja", "manzana", "pera", "plátano", "kiwi", "manzana", "plátano"}
manzanas := 0
for _, f := range frutas {
    if f == "manzana" {
        manzanas++
    }
}
fmt.Println(manzanas)
fmt.Println(slices.Index(frutas, "plátano"))
fmt.Println(slices.Index(frutas[4:], "plátano") + 4) // buscar desde la posición 4
slices.Reverse(frutas)
fmt.Println(frutas)
frutas = append(frutas, "uva")
slices.Sort(frutas)
fmt.Println(frutas)
ultima := frutas[len(frutas)-1]
frutas = frutas[:len(frutas)-1]
fmt.Println(ultima)`,
    csharp: r`var frutas = new List<string> { "naranja", "manzana", "pera", "plátano", "kiwi", "manzana", "plátano" };
Console.WriteLine(frutas.Count(f => f == "manzana"));
Console.WriteLine(frutas.IndexOf("plátano"));
Console.WriteLine(frutas.IndexOf("plátano", 4));  // buscar desde la posición 4
frutas.Reverse();
Console.WriteLine(string.Join(", ", frutas));
frutas.Add("uva");
frutas.Sort();
Console.WriteLine(string.Join(", ", frutas));
var ultima = frutas[^1];
frutas.RemoveAt(frutas.Count - 1);
Console.WriteLine(ultima);`,
    ruby: r`frutas = ['naranja', 'manzana', 'pera', 'plátano', 'kiwi', 'manzana', 'plátano']
puts frutas.count('manzana')
puts frutas.index('plátano')
puts frutas[4..].index('plátano') + 4  # buscar desde la posición 4
frutas.reverse!
p frutas
frutas << 'uva'
frutas.sort!
p frutas
puts frutas.pop`,
    rust: r`let mut frutas = vec!["naranja", "manzana", "pera", "plátano", "kiwi", "manzana", "plátano"];
println!("{}", frutas.iter().filter(|f| **f == "manzana").count());
println!("{}", frutas.iter().position(|f| *f == "plátano").unwrap());
// buscar desde la posición 4
println!("{}", frutas.iter().skip(4).position(|f| *f == "plátano").unwrap() + 4);
frutas.reverse();
println!("{:?}", frutas);
frutas.push("uva");
frutas.sort();
println!("{:?}", frutas);
println!("{}", frutas.pop().unwrap());`,
    kotlin: r`val frutas = mutableListOf("naranja", "manzana", "pera", "plátano", "kiwi", "manzana", "plátano")
println(frutas.count { it == "manzana" })
println(frutas.indexOf("plátano"))
println(frutas.subList(4, frutas.size).indexOf("plátano") + 4)  // buscar desde la posición 4
frutas.reverse()
println(frutas)
frutas.add("uva")
frutas.sort()
println(frutas)
println(frutas.removeLast())`,
    output: {
      javascript: '2\n3\n6\n["plátano","manzana","kiwi","plátano","pera","manzana","naranja"]\n["kiwi","manzana","manzana","naranja","pera","plátano","plátano","uva"]\nuva',
      go: '2\n3\n6\n[plátano manzana kiwi plátano pera manzana naranja]\n[kiwi manzana manzana naranja pera plátano plátano uva]\nuva',
      csharp: '2\n3\n6\nplátano, manzana, kiwi, plátano, pera, manzana, naranja\nkiwi, manzana, manzana, naranja, pera, plátano, plátano, uva\nuva',
      ruby: '2\n3\n6\n["plátano", "manzana", "kiwi", "plátano", "pera", "manzana", "naranja"]\n["kiwi", "manzana", "manzana", "naranja", "pera", "plátano", "plátano", "uva"]\nuva',
      rust: '2\n3\n6\n["plátano", "manzana", "kiwi", "plátano", "pera", "manzana", "naranja"]\n["kiwi", "manzana", "manzana", "naranja", "pera", "plátano", "plátano", "uva"]\nuva',
      kotlin: '2\n3\n6\n[plátano, manzana, kiwi, plátano, pera, manzana, naranja]\n[kiwi, manzana, manzana, naranja, pera, plátano, plátano, uva]\nuva',
    },
  },
  'Usar listas como pilas': {
    javascript: r`// Pila: el último en entrar es el primero en salir
const pila = [3, 4, 5]
pila.push(6)
pila.push(7)
console.log(pila)
console.log(pila.pop())
console.log(pila)
console.log(pila.pop())
console.log(pila.pop())
console.log(pila)`,
    go: r`// Pila: el último en entrar es el primero en salir
func sacar(pila *[]int) int {
    ultimo := (*pila)[len(*pila)-1]
    *pila = (*pila)[:len(*pila)-1]
    return ultimo
}

pila := []int{3, 4, 5}
pila = append(pila, 6)
pila = append(pila, 7)
fmt.Println(pila)
fmt.Println(sacar(&pila))
fmt.Println(pila)
fmt.Println(sacar(&pila))
fmt.Println(sacar(&pila))
fmt.Println(pila)`,
    csharp: r`// Pila: el último en entrar es el primero en salir
var pila = new Stack<int>([3, 4, 5]);
pila.Push(6);
pila.Push(7);
Console.WriteLine(string.Join(", ", pila));  // se muestra desde la cima
Console.WriteLine(pila.Pop());
Console.WriteLine(string.Join(", ", pila));
Console.WriteLine(pila.Pop());
Console.WriteLine(pila.Pop());
Console.WriteLine(string.Join(", ", pila));`,
    ruby: r`# Pila: el último en entrar es el primero en salir
pila = [3, 4, 5]
pila.push(6)
pila.push(7)
p pila
puts pila.pop
p pila
puts pila.pop
puts pila.pop
p pila`,
    rust: r`// Pila: el último en entrar es el primero en salir
let mut pila = vec![3, 4, 5];
pila.push(6);
pila.push(7);
println!("{:?}", pila);
println!("{}", pila.pop().unwrap());
println!("{:?}", pila);
println!("{}", pila.pop().unwrap());
println!("{}", pila.pop().unwrap());
println!("{:?}", pila);`,
    kotlin: r`// Pila: el último en entrar es el primero en salir
val pila = mutableListOf(3, 4, 5)
pila.add(6)
pila.add(7)
println(pila)
println(pila.removeLast())
println(pila)
println(pila.removeLast())
println(pila.removeLast())
println(pila)`,
    output: {
      javascript: '[3,4,5,6,7]\n7\n[3,4,5,6]\n6\n5\n[3,4]',
      go: '[3 4 5 6 7]\n7\n[3 4 5 6]\n6\n5\n[3 4]',
      csharp: '7, 6, 5, 4, 3\n7\n6, 5, 4, 3\n6\n5\n4, 3',
    },
  },
  'Usar listas como colas': {
    javascript: r`// Cola: el primero en llegar es el primero en salir
const cola = ['Eric', 'Juan', 'Miguel']
cola.push('Teresa')        // llega Teresa
cola.push('Graciela')      // llega Graciela
console.log(cola.shift())  // sale el primero que llegó
console.log(cola.shift())
console.log(cola)`,
    go: r`// Cola: el primero en llegar es el primero en salir
cola := []string{"Eric", "Juan", "Miguel"}
cola = append(cola, "Teresa")   // llega Teresa
cola = append(cola, "Graciela") // llega Graciela

primero := cola[0] // sale el primero que llegó
cola = cola[1:]
fmt.Println(primero)

primero = cola[0]
cola = cola[1:]
fmt.Println(primero)
fmt.Println(cola)`,
    csharp: r`// Cola: el primero en llegar es el primero en salir
var cola = new Queue<string>(["Eric", "Juan", "Miguel"]);
cola.Enqueue("Teresa");            // llega Teresa
cola.Enqueue("Graciela");          // llega Graciela
Console.WriteLine(cola.Dequeue()); // sale el primero que llegó
Console.WriteLine(cola.Dequeue());
Console.WriteLine(string.Join(", ", cola));`,
    ruby: r`# Cola: el primero en llegar es el primero en salir
cola = ['Eric', 'Juan', 'Miguel']
cola.push('Teresa')    # llega Teresa
cola.push('Graciela')  # llega Graciela
puts cola.shift        # sale el primero que llegó
puts cola.shift
p cola`,
    rust: r`// Cola: el primero en llegar es el primero en salir
let mut cola = VecDeque::from(["Eric", "Juan", "Miguel"]);
cola.push_back("Teresa");                    // llega Teresa
cola.push_back("Graciela");                  // llega Graciela
println!("{}", cola.pop_front().unwrap());  // sale el primero que llegó
println!("{}", cola.pop_front().unwrap());
println!("{:?}", cola);`,
    kotlin: r`// Cola: el primero en llegar es el primero en salir
val cola = ArrayDeque(listOf("Eric", "Juan", "Miguel"))
cola.addLast("Teresa")      // llega Teresa
cola.addLast("Graciela")    // llega Graciela
println(cola.removeFirst()) // sale el primero que llegó
println(cola.removeFirst())
println(cola)`,
    output: {
      javascript: 'Eric\nJuan\n["Miguel","Teresa","Graciela"]',
      go: 'Eric\nJuan\n[Miguel Teresa Graciela]',
      csharp: 'Eric\nJuan\nMiguel, Teresa, Graciela',
      ruby: 'Eric\nJuan\n["Miguel", "Teresa", "Graciela"]',
      rust: 'Eric\nJuan\n["Miguel", "Teresa", "Graciela"]',
    },
  },
  'Comprensión de listas': {
    javascript: r`// No hay comprensiones: se usan map (transformar) y filter (filtrar)
const cuadrados = Array.from({ length: 10 }, (_, x) => x ** 2)
console.log(cuadrados)

const numeros = [-4, -2, 0, 2, 4]
console.log(numeros.map((x) => x * 2))         // transformar
console.log(numeros.filter((x) => x >= 0))     // filtrar
console.log(numeros.map((x) => Math.abs(x)))   // aplicar una función

const frutas = ['  plátano', '  mora ', 'maracuyá  ']
console.log(frutas.map((f) => f.trim()))`,
    go: r`// No hay comprensiones ni map/filter incluidos: se escribe el bucle
var cuadrados []int
for x := range 10 {
    cuadrados = append(cuadrados, x*x)
}
fmt.Println(cuadrados)

numeros := []int{-4, -2, 0, 2, 4}
var dobles, positivos []int
for _, x := range numeros {
    dobles = append(dobles, x*2) // transformar
    if x >= 0 {
        positivos = append(positivos, x) // filtrar
    }
}
fmt.Println(dobles)
fmt.Println(positivos)

frutas := []string{"  plátano", "  mora ", "maracuyá  "}
for i, f := range frutas {
    frutas[i] = strings.TrimSpace(f)
}
fmt.Println(frutas)`,
    csharp: r`// No hay comprensiones: LINQ usa Select (transformar) y Where (filtrar)
var cuadrados = Enumerable.Range(0, 10).Select(x => x * x);
Console.WriteLine(string.Join(", ", cuadrados));

int[] numeros = [-4, -2, 0, 2, 4];
Console.WriteLine(string.Join(", ", numeros.Select(x => x * 2)));   // transformar
Console.WriteLine(string.Join(", ", numeros.Where(x => x >= 0)));   // filtrar
Console.WriteLine(string.Join(", ", numeros.Select(Math.Abs)));     // aplicar una función

string[] frutas = ["  plátano", "  mora ", "maracuyá  "];
Console.WriteLine(string.Join(", ", frutas.Select(f => f.Trim())));`,
    ruby: r`# No hay comprensiones: se usan map (transformar) y select (filtrar)
cuadrados = (0...10).map { |x| x ** 2 }
p cuadrados

numeros = [-4, -2, 0, 2, 4]
p numeros.map { |x| x * 2 }       # transformar
p numeros.select { |x| x >= 0 }   # filtrar
p numeros.map(&:abs)              # aplicar un método

frutas = ['  plátano', '  mora ', 'maracuyá  ']
p frutas.map(&:strip)`,
    rust: r`// No hay comprensiones: se encadenan map (transformar) y filter (filtrar)
let cuadrados: Vec<i32> = (0..10).map(|x| x * x).collect();
println!("{:?}", cuadrados);

let numeros = [-4, -2, 0, 2, 4];
let dobles: Vec<i32> = numeros.iter().map(|x| x * 2).collect();            // transformar
let positivos: Vec<i32> = numeros.iter().copied().filter(|x| *x >= 0).collect();  // filtrar
let absolutos: Vec<i32> = numeros.iter().map(|x| x.abs()).collect();       // aplicar un método
println!("{:?}", dobles);
println!("{:?}", positivos);
println!("{:?}", absolutos);

let frutas = ["  plátano", "  mora ", "maracuyá  "];
let limpias: Vec<&str> = frutas.iter().map(|f| f.trim()).collect();
println!("{:?}", limpias);`,
    kotlin: r`// No hay comprensiones: se usan map (transformar) y filter (filtrar)
val cuadrados = (0 until 10).map { it * it }
println(cuadrados)

val numeros = listOf(-4, -2, 0, 2, 4)
println(numeros.map { it * 2 })       // transformar
println(numeros.filter { it >= 0 })   // filtrar
println(numeros.map { abs(it) })      // aplicar una función

val frutas = listOf("  plátano", "  mora ", "maracuyá  ")
println(frutas.map { it.trim() })`,
    output: {
      javascript: '[0,1,4,9,16,25,36,49,64,81]\n[-8,-4,0,4,8]\n[0,2,4]\n[4,2,0,2,4]\n["plátano","mora","maracuyá"]',
      go: '[0 1 4 9 16 25 36 49 64 81]\n[-8 -4 0 4 8]\n[0 2 4]\n[plátano mora maracuyá]',
      csharp: '0, 1, 4, 9, 16, 25, 36, 49, 64, 81\n-8, -4, 0, 4, 8\n0, 2, 4\n4, 2, 0, 2, 4\nplátano, mora, maracuyá',
      ruby: '[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n[-8, -4, 0, 4, 8]\n[0, 2, 4]\n[4, 2, 0, 2, 4]\n["plátano", "mora", "maracuyá"]',
      rust: '[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n[-8, -4, 0, 4, 8]\n[0, 2, 4]\n[4, 2, 0, 2, 4]\n["plátano", "mora", "maracuyá"]',
    },
  },
  'Comprensiones anidadas': {
    javascript: r`const matriz = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]

// Cambiar filas por columnas (trasponer)
console.log(matriz[0].map((_, i) => matriz.map((fila) => fila[i])))`,
    go: r`matriz := [][]int{
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12},
}

// Cambiar filas por columnas (trasponer)
traspuesta := make([][]int, 4)
for i := range 4 {
    for _, fila := range matriz {
        traspuesta[i] = append(traspuesta[i], fila[i])
    }
}
fmt.Println(traspuesta)`,
    csharp: r`int[][] matriz = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
];

// Cambiar filas por columnas (trasponer)
var traspuesta = Enumerable.Range(0, 4).Select(i => matriz.Select(fila => fila[i]));
Console.WriteLine(string.Join(" | ", traspuesta.Select(columna => string.Join(", ", columna))));`,
    ruby: r`matriz = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]

# Cambiar filas por columnas (trasponer)
p (0...4).map { |i| matriz.map { |fila| fila[i] } }
p matriz.transpose  # lo mismo, con un método ya hecho`,
    rust: r`let matriz = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
];

// Cambiar filas por columnas (trasponer)
let traspuesta: Vec<Vec<i32>> = (0..4)
    .map(|i| matriz.iter().map(|fila| fila[i]).collect())
    .collect();
println!("{:?}", traspuesta);`,
    kotlin: r`val matriz = listOf(
    listOf(1, 2, 3, 4),
    listOf(5, 6, 7, 8),
    listOf(9, 10, 11, 12),
)

// Cambiar filas por columnas (trasponer)
println((0 until 4).map { i -> matriz.map { fila -> fila[i] } })`,
    output: {
      javascript: '[[1,5,9],[2,6,10],[3,7,11],[4,8,12]]',
      go: '[[1 5 9] [2 6 10] [3 7 11] [4 8 12]]',
      csharp: '1, 5, 9 | 2, 6, 10 | 3, 7, 11 | 4, 8, 12',
      ruby: '[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]\n[[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]',
    },
  },
  'Desempaquetar dentro de listas': {
    javascript: r`const x = [1, 2, 3]
console.log([0, ...x, 4, 5, 6])  // ... reparte el arreglo

const listas = [[1, 2, 3], [4, 5, 6], [], [7], [8, 9]]
console.log(listas.flat())  // juntar todo en un solo arreglo`,
    go: r`x := []int{1, 2, 3}
todo := append([]int{0}, x...) // ... reparte el slice
todo = append(todo, 4, 5, 6)
fmt.Println(todo)

listas := [][]int{{1, 2, 3}, {4, 5, 6}, {}, {7}, {8, 9}}
fmt.Println(slices.Concat(listas...)) // juntar todo en un solo slice`,
    csharp: r`int[] x = [1, 2, 3];
int[] todo = [0, .. x, 4, 5, 6];  // .. reparte el arreglo
Console.WriteLine(string.Join(", ", todo));

int[][] listas = [[1, 2, 3], [4, 5, 6], [], [7], [8, 9]];
Console.WriteLine(string.Join(", ", listas.SelectMany(lista => lista)));  // juntar todo`,
    ruby: r`x = [1, 2, 3]
p [0, *x, 4, 5, 6]  # * reparte el arreglo

listas = [[1, 2, 3], [4, 5, 6], [], [7], [8, 9]]
p listas.flatten  # juntar todo en un solo arreglo`,
    rust: r`let x = vec![1, 2, 3];
let mut todo = vec![0];
todo.extend(&x);  // añade todos los elementos de x
todo.extend([4, 5, 6]);
println!("{:?}", todo);

let listas = vec![vec![1, 2, 3], vec![4, 5, 6], vec![], vec![7], vec![8, 9]];
println!("{:?}", listas.concat());  // juntar todo en un solo vector`,
    kotlin: r`val x = listOf(1, 2, 3)
println(listOf(0) + x + listOf(4, 5, 6))  // + une listas

val listas = listOf(listOf(1, 2, 3), listOf(4, 5, 6), listOf(), listOf(7), listOf(8, 9))
println(listas.flatten())  // juntar todo en una sola lista`,
    output: {
      javascript: '[0,1,2,3,4,5,6]\n[1,2,3,4,5,6,7,8,9]',
      go: '[0 1 2 3 4 5 6]\n[1 2 3 4 5 6 7 8 9]',
      csharp: '0, 1, 2, 3, 4, 5, 6\n1, 2, 3, 4, 5, 6, 7, 8, 9',
    },
  },
  'La instrucción del': {
    javascript: r`const a = [-1, 1, 66.25, 333, 333, 1234.5]
a.splice(0, 1)   // borrar por posición
console.log(a)
a.splice(2, 2)   // borrar un tramo: desde la posición 2, dos elementos
console.log(a)
a.length = 0     // vaciar el arreglo
console.log(a)`,
    go: r`a := []float64{-1, 1, 66.25, 333, 333, 1234.5}
a = slices.Delete(a, 0, 1) // borrar por posición
fmt.Println(a)
a = slices.Delete(a, 2, 4) // borrar un tramo
fmt.Println(a)
a = a[:0] // vaciar el slice
fmt.Println(a)`,
    csharp: r`var a = new List<double> { -1, 1, 66.25, 333, 333, 1234.5 };
a.RemoveAt(0);        // borrar por posición
Console.WriteLine($"[{string.Join(", ", a)}]");
a.RemoveRange(2, 2);  // borrar un tramo: desde la posición 2, dos elementos
Console.WriteLine($"[{string.Join(", ", a)}]");
a.Clear();            // vaciar la lista
Console.WriteLine($"[{string.Join(", ", a)}]");`,
    ruby: r`a = [-1, 1, 66.25, 333, 333, 1234.5]
a.delete_at(0)   # borrar por posición
p a
a.slice!(2, 2)   # borrar un tramo: desde la posición 2, dos elementos
p a
a.clear          # vaciar el arreglo
p a`,
    rust: r`let mut a = vec![-1.0, 1.0, 66.25, 333.0, 333.0, 1234.5];
a.remove(0);     // borrar por posición
println!("{:?}", a);
a.drain(2..4);   // borrar un tramo
println!("{:?}", a);
a.clear();       // vaciar el vector
println!("{:?}", a);
drop(a);         // liberar la variable
// println!("{:?}", a);  ← no compila: a ya no existe`,
    kotlin: r`val a = mutableListOf(-1.0, 1.0, 66.25, 333.0, 333.0, 1234.5)
a.removeAt(0)            // borrar por posición
println(a)
a.subList(2, 4).clear()  // borrar un tramo
println(a)
a.clear()                // vaciar la lista
println(a)`,
    output: {
      javascript: '[1,66.25,333,333,1234.5]\n[1,66.25,1234.5]\n[]',
      go: '[1 66.25 333 333 1234.5]\n[1 66.25 1234.5]\n[]',
      csharp: '[1, 66.25, 333, 333, 1234.5]\n[1, 66.25, 1234.5]\n[]',
      ruby: '[1, 66.25, 333, 333, 1234.5]\n[1, 66.25, 1234.5]\n[]',
    },
  },
  'Tuplas y secuencias': {
    javascript: r`// JavaScript no tiene tuplas: se usa un arreglo
const t = [12345, 54321, '¡hola!']
console.log(t[0])
console.log(t)

Object.freeze(t)  // así ya no se puede modificar
// t[0] = 88888  ← no cambia nada (y es un error en modo estricto)

const [x, y, z] = t  // desempaquetar
console.log(x, y, z)`,
    go: r`// Go no tiene tuplas: se usa un struct con campos
type Trio struct {
    A, B int
    C    string
}

t := Trio{12345, 54321, "¡hola!"}
fmt.Println(t.A)
fmt.Println(t)

x, y, z := t.A, t.B, t.C // asignar varios valores a la vez
fmt.Println(x, y, z)`,
    csharp: r`var t = (12345, 54321, "¡hola!");
Console.WriteLine(t.Item1);
Console.WriteLine(t);

var u = (t, (1, 2, 3, 4, 5));  // las tuplas se pueden anidar
Console.WriteLine(u);

var (x, y, z) = t;  // desempaquetar
Console.WriteLine($"{x} {y} {z}");`,
    ruby: r`# Ruby no tiene tuplas: se usa un arreglo congelado
t = [12345, 54321, '¡hola!'].freeze
puts t[0]
p t
# t[0] = 88888  ← quita el # para ver el error: está congelado

x, y, z = t  # desempaquetar
puts "#{x} #{y} #{z}"`,
    rust: r`let t = (12345, 54321, "¡hola!");
println!("{}", t.0);
println!("{:?}", t);

let u = (t, (1, 2, 3, 4, 5));  // las tuplas se pueden anidar
println!("{:?}", u);
// t.0 = 88888;  ← no compila: t no se declaró con mut

let (x, y, z) = t;  // desempaquetar
println!("{x} {y} {z}");`,
    kotlin: r`// Kotlin tiene Pair (dos valores) y Triple (tres)
val t = Triple(12345, 54321, "¡hola!")
println(t.first)
println(t)
// t.first = 88888  ← no compila: sus valores no cambian

val (x, y, z) = t  // desempaquetar
println("$x $y $z")`,
    output: {
      javascript: '12345\n[12345,54321,"¡hola!"]\n12345 54321 ¡hola!',
      go: '12345\n{12345 54321 ¡hola!}\n12345 54321 ¡hola!',
      csharp: '12345\n(12345, 54321, ¡hola!)\n((12345, 54321, ¡hola!), (1, 2, 3, 4, 5))\n12345 54321 ¡hola!',
      ruby: '12345\n[12345, 54321, "¡hola!"]\n12345 54321 ¡hola!',
      rust: '12345\n(12345, 54321, "¡hola!")\n((12345, 54321, "¡hola!"), (1, 2, 3, 4, 5))\n12345 54321 ¡hola!',
      kotlin: '12345\n(12345, 54321, ¡hola!)\n12345 54321 ¡hola!',
    },
  },
  'Conjuntos': {
    javascript: r`const cesta = new Set(['manzana', 'naranja', 'manzana', 'pera', 'naranja', 'plátano'])
// Un conjunto no se muestra ordenado: se pasa a arreglo y se ordena
console.log([...cesta].sort())   // sin repetidos
console.log(cesta.has('naranja'))
console.log(cesta.has('kiwi'))

const a = new Set('abracadabra')
const b = new Set('alacazam')
console.log([...a].sort())                           // letras únicas de a
console.log([...a].filter((x) => !b.has(x)).sort())  // en a pero no en b
console.log([...new Set([...a, ...b])].sort())       // en a, en b o en ambos
console.log([...a].filter((x) => b.has(x)).sort())   // en a y en b`,
    go: r`// Go no tiene conjuntos: se usa un map cuyas claves son los elementos
cesta := map[string]bool{}
for _, fruta := range []string{"manzana", "naranja", "manzana", "pera", "naranja", "plátano"} {
    cesta[fruta] = true
}

fmt.Println(slices.Sorted(maps.Keys(cesta))) // sin repetidos
fmt.Println(cesta["naranja"])
fmt.Println(cesta["kiwi"])

// La unión, la intersección y la diferencia se escriben con bucles`,
    csharp: r`var cesta = new HashSet<string> { "manzana", "naranja", "manzana", "pera", "naranja", "plátano" };
// Un conjunto no tiene orden: Order() solo es para mostrarlo ordenado
Console.WriteLine(string.Join(", ", cesta.Order()));   // sin repetidos
Console.WriteLine(cesta.Contains("naranja"));
Console.WriteLine(cesta.Contains("kiwi"));

var a = new HashSet<char>("abracadabra");
var b = new HashSet<char>("alacazam");
Console.WriteLine(string.Join(", ", a.Order()));               // letras únicas de a
Console.WriteLine(string.Join(", ", a.Except(b).Order()));     // en a pero no en b
Console.WriteLine(string.Join(", ", a.Union(b).Order()));      // en a, en b o en ambos
Console.WriteLine(string.Join(", ", a.Intersect(b).Order()));  // en a y en b`,
    ruby: r`cesta = Set['manzana', 'naranja', 'manzana', 'pera', 'naranja', 'plátano']
# Un conjunto no tiene orden: sort solo es para mostrarlo ordenado
p cesta.sort                  # sin repetidos
puts cesta.include?('naranja')
puts cesta.include?('kiwi')

a = Set.new('abracadabra'.chars)
b = Set.new('alacazam'.chars)
p a.sort        # letras únicas de a
p (a - b).sort  # en a pero no en b
p (a | b).sort  # en a, en b o en ambos
p (a & b).sort  # en a y en b`,
    rust: r`// BTreeSet mantiene los elementos ordenados; HashSet no tiene orden
let cesta = BTreeSet::from(["manzana", "naranja", "manzana", "pera", "naranja", "plátano"]);
println!("{:?}", cesta);                    // sin repetidos
println!("{}", cesta.contains("naranja"));
println!("{}", cesta.contains("kiwi"));

let a: BTreeSet<char> = "abracadabra".chars().collect();
let b: BTreeSet<char> = "alacazam".chars().collect();
println!("{:?}", a);                                        // letras únicas de a
println!("{:?}", a.difference(&b).collect::<Vec<_>>());     // en a pero no en b
println!("{:?}", a.union(&b).collect::<Vec<_>>());          // en a, en b o en ambos
println!("{:?}", a.intersection(&b).collect::<Vec<_>>());   // en a y en b`,
    kotlin: r`val cesta = setOf("manzana", "naranja", "manzana", "pera", "naranja", "plátano")
// sorted() solo es para mostrarlo ordenado
println(cesta.sorted())          // sin repetidos
println("naranja" in cesta)
println("kiwi" in cesta)

val a = "abracadabra".toSet()
val b = "alacazam".toSet()
println(a.sorted())                 // letras únicas de a
println((a - b).sorted())           // en a pero no en b
println((a union b).sorted())       // en a, en b o en ambos
println((a intersect b).sorted())   // en a y en b`,
    output: {
      javascript: '["manzana","naranja","pera","plátano"]\ntrue\nfalse\n["a","b","c","d","r"]\n["b","d","r"]\n["a","b","c","d","l","m","r","z"]\n["a","c"]',
      go: '[manzana naranja pera plátano]\ntrue\nfalse',
      csharp: 'manzana, naranja, pera, plátano\nTrue\nFalse\na, b, c, d, r\nb, d, r\na, b, c, d, l, m, r, z\na, c',
      ruby: '["manzana", "naranja", "pera", "plátano"]\ntrue\nfalse\n["a", "b", "c", "d", "r"]\n["b", "d", "r"]\n["a", "b", "c", "d", "l", "m", "r", "z"]\n["a", "c"]',
      rust: `{"manzana", "naranja", "pera", "plátano"}\ntrue\nfalse\n{'a', 'b', 'c', 'd', 'r'}\n['b', 'd', 'r']\n['a', 'b', 'c', 'd', 'l', 'm', 'r', 'z']\n['a', 'c']`,
    },
  },
  'Diccionarios': {
    javascript: r`const tel = new Map([['juan', 4098], ['ana', 4139]])
tel.set('guido', 4127)
console.log(Object.fromEntries(tel))
console.log(tel.get('juan'))
console.log(String(tel.get('irene')))  // undefined si la clave no existe
tel.delete('ana')
tel.set('irene', 4127)
console.log(Object.fromEntries(tel))
console.log([...tel.keys()])           // las claves, en orden de llegada
console.log([...tel.keys()].sort())    // las claves, ordenadas
console.log(tel.has('guido'))
console.log(!tel.has('juan'))`,
    go: r`tel := map[string]int{"juan": 4098, "ana": 4139}
tel["guido"] = 4127
fmt.Println(tel) // al mostrarlo, las claves salen ordenadas
fmt.Println(tel["juan"])
valor, existe := tel["irene"] // si no existe: valor cero y false
fmt.Println(valor, existe)
delete(tel, "ana")
tel["irene"] = 4127
fmt.Println(tel)
fmt.Println(slices.Sorted(maps.Keys(tel))) // las claves, ordenadas
_, hayGuido := tel["guido"]
fmt.Println(hayGuido)`,
    csharp: r`var tel = new Dictionary<string, int> { ["juan"] = 4098, ["ana"] = 4139 };
tel["guido"] = 4127;
Console.WriteLine(string.Join(", ", tel));
Console.WriteLine(tel["juan"]);
Console.WriteLine(tel.ContainsKey("irene"));  // tel["irene"] lanzaría un error
tel.Remove("ana");
tel["irene"] = 4127;
Console.WriteLine(string.Join(", ", tel.Keys.Order()));  // las claves, ordenadas
Console.WriteLine(tel.ContainsKey("guido"));
Console.WriteLine(!tel.ContainsKey("juan"));`,
    ruby: r`tel = { 'juan' => 4098, 'ana' => 4139 }
tel['guido'] = 4127
p tel
puts tel['juan']
p tel['irene']    # nil si la clave no existe
tel.delete('ana')
tel['irene'] = 4127
p tel
p tel.keys        # las claves, en orden de llegada
p tel.keys.sort   # las claves, ordenadas
puts tel.key?('guido')
puts !tel.key?('juan')`,
    rust: r`// BTreeMap mantiene las claves ordenadas; HashMap no tiene orden
let mut tel = BTreeMap::from([("juan", 4098), ("ana", 4139)]);
tel.insert("guido", 4127);
println!("{:?}", tel);
println!("{}", tel["juan"]);
println!("{:?}", tel.get("irene"));   // None si la clave no existe
tel.remove("ana");
tel.insert("irene", 4127);
println!("{:?}", tel);
println!("{:?}", tel.keys().collect::<Vec<_>>());  // las claves, ordenadas
println!("{}", tel.contains_key("guido"));
println!("{}", !tel.contains_key("juan"));`,
    kotlin: r`val tel = mutableMapOf("juan" to 4098, "ana" to 4139)
tel["guido"] = 4127
println(tel)
println(tel["juan"])
println(tel["irene"])        // null si la clave no existe
tel.remove("ana")
tel["irene"] = 4127
println(tel)
println(tel.keys.toList())   // las claves, en orden de llegada
println(tel.keys.sorted())   // las claves, ordenadas
println("guido" in tel)
println("juan" !in tel)`,
    output: {
      javascript: '{"juan":4098,"ana":4139,"guido":4127}\n4098\nundefined\n{"juan":4098,"guido":4127,"irene":4127}\n["juan","guido","irene"]\n["guido","irene","juan"]\ntrue\nfalse',
      go: 'map[ana:4139 guido:4127 juan:4098]\n4098\n0 false\nmap[guido:4127 irene:4127 juan:4098]\n[guido irene juan]\ntrue',
      csharp: '[juan, 4098], [ana, 4139], [guido, 4127]\n4098\nFalse\nguido, irene, juan\nTrue\nFalse',
      ruby: '{"juan" => 4098, "ana" => 4139, "guido" => 4127}\n4098\nnil\n{"juan" => 4098, "guido" => 4127, "irene" => 4127}\n["juan", "guido", "irene"]\n["guido", "irene", "juan"]\ntrue\nfalse',
      rust: '{"ana": 4139, "guido": 4127, "juan": 4098}\n4098\nNone\n{"guido": 4127, "irene": 4127, "juan": 4098}\n["guido", "irene", "juan"]\ntrue\nfalse',
    },
  },
  'Crear diccionarios': {
    javascript: r`console.log(Object.fromEntries([['ana', 4139], ['guido', 4127], ['juan', 4098]]))
console.log({ ana: 4139, guido: 4127, juan: 4098 })
console.log(Object.fromEntries([2, 4, 6].map((x) => [x, x ** 2])))

const impares = { 1: 1, 3: 9, 5: 25 }
const pares = { 2: 4, 4: 16, 6: 36 }
console.log({ ...impares, ...pares })  // unir: las claves numéricas quedan ordenadas`,
    go: r`fmt.Println(map[string]int{"ana": 4139, "guido": 4127, "juan": 4098})

cuadrados := map[int]int{}
for _, x := range []int{2, 4, 6} {
    cuadrados[x] = x * x
}
fmt.Println(cuadrados)

impares := map[int]int{1: 1, 3: 9, 5: 25}
maps.Copy(cuadrados, impares) // unir: copia las claves de impares
fmt.Println(cuadrados)`,
    csharp: r`var tel = new Dictionary<string, int> { ["ana"] = 4139, ["guido"] = 4127, ["juan"] = 4098 };
Console.WriteLine(string.Join(", ", tel));

int[] numeros = [2, 4, 6];
var pares = numeros.ToDictionary(x => x, x => x * x);
Console.WriteLine(string.Join(", ", pares));

var impares = new Dictionary<int, int> { [1] = 1, [3] = 9, [5] = 25 };
var todos = impares.Concat(pares).ToDictionary(par => par.Key, par => par.Value);  // unir
Console.WriteLine(string.Join(", ", todos));`,
    ruby: r`p [['ana', 4139], ['guido', 4127], ['juan', 4098]].to_h
p({ ana: 4139, guido: 4127, juan: 4098 })   # claves con símbolos
p [2, 4, 6].to_h { |x| [x, x ** 2] }

impares = { 1 => 1, 3 => 9, 5 => 25 }
pares = { 2 => 4, 4 => 16, 6 => 36 }
p impares.merge(pares)                      # unir`,
    rust: r`let tel = BTreeMap::from([("ana", 4139), ("guido", 4127), ("juan", 4098)]);
println!("{:?}", tel);

let pares: BTreeMap<i32, i32> = [2, 4, 6].into_iter().map(|x| (x, x * x)).collect();
println!("{:?}", pares);

let mut todos = BTreeMap::from([(1, 1), (3, 9), (5, 25)]);
todos.extend(pares);  // unir
println!("{:?}", todos);`,
    kotlin: r`println(mapOf("ana" to 4139, "guido" to 4127, "juan" to 4098))
println(listOf(2, 4, 6).associateWith { it * it })

val impares = mapOf(1 to 1, 3 to 9, 5 to 25)
val pares = mapOf(2 to 4, 4 to 16, 6 to 36)
println(impares + pares)  // unir`,
    output: {
      javascript: '{"ana":4139,"guido":4127,"juan":4098}\n{"ana":4139,"guido":4127,"juan":4098}\n{"2":4,"4":16,"6":36}\n{"1":1,"2":4,"3":9,"4":16,"5":25,"6":36}',
      go: 'map[ana:4139 guido:4127 juan:4098]\nmap[2:4 4:16 6:36]\nmap[1:1 2:4 3:9 4:16 5:25 6:36]',
      csharp: '[ana, 4139], [guido, 4127], [juan, 4098]\n[2, 4], [4, 16], [6, 36]\n[1, 1], [3, 9], [5, 25], [2, 4], [4, 16], [6, 36]',
      ruby: '{"ana" => 4139, "guido" => 4127, "juan" => 4098}\n{ana: 4139, guido: 4127, juan: 4098}\n{2 => 4, 4 => 16, 6 => 36}\n{1 => 1, 3 => 9, 5 => 25, 2 => 4, 4 => 16, 6 => 36}',
      rust: '{"ana": 4139, "guido": 4127, "juan": 4098}\n{2: 4, 4: 16, 6: 36}\n{1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36}',
    },
  },
  'Recorrer diccionarios y posiciones': {
    javascript: r`const caballeros = { galahad: 'el puro', robin: 'el valiente' }
for (const [nombre, apodo] of Object.entries(caballeros)) {
  console.log(nombre, apodo)
}

for (const [i, palabra] of ['tic', 'tac', 'toe'].entries()) {
  console.log(i, palabra)
}`,
    go: r`caballeros := map[string]string{"galahad": "el puro", "robin": "el valiente"}
// un map se recorre en orden aleatorio: se ordenan las claves
for _, nombre := range slices.Sorted(maps.Keys(caballeros)) {
    fmt.Println(nombre, caballeros[nombre])
}

for i, palabra := range []string{"tic", "tac", "toe"} {
    fmt.Println(i, palabra)
}`,
    csharp: r`var caballeros = new Dictionary<string, string> { ["galahad"] = "el puro", ["robin"] = "el valiente" };
foreach (var (nombre, apodo) in caballeros) {
    Console.WriteLine($"{nombre} {apodo}");
}

string[] palabras = ["tic", "tac", "toe"];
foreach (var (i, palabra) in palabras.Index()) {
    Console.WriteLine($"{i} {palabra}");
}`,
    ruby: r`caballeros = { 'galahad' => 'el puro', 'robin' => 'el valiente' }
caballeros.each do |nombre, apodo|
  puts "#{nombre} #{apodo}"
end

['tic', 'tac', 'toe'].each_with_index do |palabra, i|
  puts "#{i} #{palabra}"
end`,
    rust: r`let caballeros = BTreeMap::from([("galahad", "el puro"), ("robin", "el valiente")]);
for (nombre, apodo) in &caballeros {
    println!("{nombre} {apodo}");
}

for (i, palabra) in ["tic", "tac", "toe"].iter().enumerate() {
    println!("{i} {palabra}");
}`,
    kotlin: r`val caballeros = mapOf("galahad" to "el puro", "robin" to "el valiente")
for ((nombre, apodo) in caballeros) {
    println("$nombre $apodo")
}

for ((i, palabra) in listOf("tic", "tac", "toe").withIndex()) {
    println("$i $palabra")
}`,
    output: { javascript: DATOS_5_LINEAS },
  },
  'Recorrer dos listas a la vez': {
    javascript: r`const preguntas = ['nombre', 'misión', 'color favorito']
const respuestas = ['lancelot', 'el santo grial', 'azul']
// No hay zip: se usa la posición para leer la otra lista
preguntas.forEach((p, i) => {
  console.log(${b}¿Cuál es tu ${d}{p}? Es ${d}{respuestas[i]}.${b})
})`,
    go: r`preguntas := []string{"nombre", "misión", "color favorito"}
respuestas := []string{"lancelot", "el santo grial", "azul"}
// No hay zip: se usa la posición para leer la otra lista
for i, p := range preguntas {
    fmt.Printf("¿Cuál es tu %s? Es %s.\n", p, respuestas[i])
}`,
    csharp: r`string[] preguntas = ["nombre", "misión", "color favorito"];
string[] respuestas = ["lancelot", "el santo grial", "azul"];
foreach (var (p, r) in preguntas.Zip(respuestas)) {
    Console.WriteLine($"¿Cuál es tu {p}? Es {r}.");
}`,
    ruby: r`preguntas = ['nombre', 'misión', 'color favorito']
respuestas = ['lancelot', 'el santo grial', 'azul']
preguntas.zip(respuestas).each do |p, r|
  puts "¿Cuál es tu #{p}? Es #{r}."
end`,
    rust: r`let preguntas = ["nombre", "misión", "color favorito"];
let respuestas = ["lancelot", "el santo grial", "azul"];
for (p, r) in preguntas.iter().zip(respuestas.iter()) {
    println!("¿Cuál es tu {p}? Es {r}.");
}`,
    kotlin: r`val preguntas = listOf("nombre", "misión", "color favorito")
val respuestas = listOf("lancelot", "el santo grial", "azul")
for ((p, r) in preguntas.zip(respuestas)) {
    println("¿Cuál es tu $p? Es $r.")
}`,
  },
  'Recorrer al revés y en orden': {
    javascript: r`const impares = [1, 3, 5, 7, 9]
console.log(impares.toReversed().join(' '))

const cesta = ['manzana', 'naranja', 'manzana', 'pera', 'naranja', 'plátano']
console.log(cesta.toSorted().join(' '))             // toSorted no cambia el original
console.log([...new Set(cesta)].sort().join(' '))   // en orden y sin repetidos`,
    go: r`for i := 9; i >= 1; i -= 2 {
    fmt.Print(i, " ")
}
fmt.Println()

cesta := []string{"manzana", "naranja", "manzana", "pera", "naranja", "plátano"}
ordenada := slices.Sorted(slices.Values(cesta)) // una copia ordenada
fmt.Println(strings.Join(ordenada, " "))

sinRepetidos := slices.Compact(ordenada) // quita los repetidos consecutivos
fmt.Println(strings.Join(sinRepetidos, " "))`,
    csharp: r`for (int i = 9; i >= 1; i -= 2) {
    Console.Write(i + " ");
}
Console.WriteLine();

string[] cesta = ["manzana", "naranja", "manzana", "pera", "naranja", "plátano"];
Console.WriteLine(string.Join(" ", cesta.Order()));
Console.WriteLine(string.Join(" ", cesta.Distinct().Order()));  // en orden y sin repetidos`,
    ruby: r`puts 1.step(9, 2).to_a.reverse.join(' ')

cesta = ['manzana', 'naranja', 'manzana', 'pera', 'naranja', 'plátano']
puts cesta.sort.join(' ')
puts cesta.uniq.sort.join(' ')  # en orden y sin repetidos`,
    rust: r`for i in (1..10).step_by(2).rev() {
    print!("{i} ");
}
println!();

let cesta = ["manzana", "naranja", "manzana", "pera", "naranja", "plátano"];
let mut ordenada = cesta.to_vec();  // una copia para no cambiar el original
ordenada.sort();
println!("{}", ordenada.join(" "));

ordenada.dedup();  // quita los repetidos consecutivos
println!("{}", ordenada.join(" "));`,
    kotlin: r`for (i in 9 downTo 1 step 2) {
    print("$i ")
}
println()

val cesta = listOf("manzana", "naranja", "manzana", "pera", "naranja", "plátano")
println(cesta.sorted().joinToString(" "))
println(cesta.toSet().sorted().joinToString(" "))  // en orden y sin repetidos`,
    output: {
      javascript: '9 7 5 3 1\nmanzana manzana naranja naranja pera plátano\nmanzana naranja pera plátano',
      ruby: '9 7 5 3 1\nmanzana manzana naranja naranja pera plátano\nmanzana naranja pera plátano',
    },
  },
  'Recorrer sin modificar la lista original': {
    javascript: r`const datos = [56.2, NaN, 51.7, 55.3, 52.5, NaN, 47.8]
// Es más seguro crear un arreglo nuevo que borrar mientras se recorre
const filtrados = []
for (const valor of datos) {
  if (!Number.isNaN(valor)) {
    filtrados.push(valor)
  }
}
console.log(filtrados)`,
    go: r`datos := []float64{56.2, math.NaN(), 51.7, 55.3, 52.5, math.NaN(), 47.8}
// Es más seguro crear un slice nuevo que borrar mientras se recorre
var filtrados []float64
for _, valor := range datos {
    if !math.IsNaN(valor) {
        filtrados = append(filtrados, valor)
    }
}
fmt.Println(filtrados)`,
    csharp: r`double[] datos = [56.2, double.NaN, 51.7, 55.3, 52.5, double.NaN, 47.8];
// Es más seguro crear una lista nueva que borrar mientras se recorre
var filtrados = new List<double>();
foreach (var valor in datos) {
    if (!double.IsNaN(valor)) {
        filtrados.Add(valor);
    }
}
Console.WriteLine(string.Join(", ", filtrados));`,
    ruby: r`datos = [56.2, Float::NAN, 51.7, 55.3, 52.5, Float::NAN, 47.8]
# Es más seguro crear un arreglo nuevo que borrar mientras se recorre
filtrados = []
datos.each do |valor|
  filtrados << valor unless valor.nan?
end
p filtrados`,
    rust: r`let datos = [56.2, f64::NAN, 51.7, 55.3, 52.5, f64::NAN, 47.8];
// Es más seguro crear un vector nuevo que borrar mientras se recorre
let mut filtrados = Vec::new();
for valor in datos {
    if !valor.is_nan() {
        filtrados.push(valor);
    }
}
println!("{:?}", filtrados);`,
    kotlin: r`val datos = listOf(56.2, Double.NaN, 51.7, 55.3, 52.5, Double.NaN, 47.8)
// Es más seguro crear una lista nueva que borrar mientras se recorre
val filtrados = mutableListOf<Double>()
for (valor in datos) {
    if (!valor.isNaN()) {
        filtrados.add(valor)
    }
}
println(filtrados)`,
    output: {
      javascript: '[56.2,51.7,55.3,52.5,47.8]',
      go: '[56.2 51.7 55.3 52.5 47.8]',
      csharp: '56.2, 51.7, 55.3, 52.5, 47.8',
    },
  },
  'Más sobre condiciones': {
    javascript: r`const a = 1, b = 5, c = 10
console.log(a < b && b < c)       // no hay comparaciones encadenadas: se unen con &&
console.log(a < b && b === c)
console.log([1, 2, 3].includes(3))  // pertenencia
console.log(!(a > b))

const cadena1 = '', cadena2 = 'Trondheim', cadena3 = 'Hammer Dance'
const noVacia = cadena1 || cadena2 || cadena3  // el primer valor que no esté vacío
console.log(noVacia)

const n = cadena2.length
if (n > 5) {
  console.log(${b}«${d}{cadena2}» tiene ${d}{n} letras${b})
}`,
    go: r`a, b, c := 1, 5, 10
fmt.Println(a < b && b < c) // no hay comparaciones encadenadas: se unen con &&
fmt.Println(a < b && b == c)
fmt.Println(slices.Contains([]int{1, 2, 3}, 3)) // pertenencia
fmt.Println(!(a > b))

cadena1, cadena2, cadena3 := "", "Trondheim", "Hammer Dance"
noVacia := cmp.Or(cadena1, cadena2, cadena3) // el primer valor que no esté vacío
fmt.Println(noVacia)

if n := len(cadena2); n > 5 { // declarar dentro de la condición
    fmt.Printf("«%s» tiene %d letras\n", cadena2, n)
}`,
    csharp: r`int a = 1, b = 5, c = 10;
Console.WriteLine(a < b && b < c);   // no hay comparaciones encadenadas: se unen con &&
Console.WriteLine(a < b && b == c);
Console.WriteLine(new[] { 1, 2, 3 }.Contains(3));  // pertenencia
Console.WriteLine(!(a > b));

string cadena1 = "", cadena2 = "Trondheim", cadena3 = "Hammer Dance";
string noVacia = new[] { cadena1, cadena2, cadena3 }.First(cadena => cadena != "");
Console.WriteLine(noVacia);

if (cadena2.Length is var n && n > 5) {  // declarar dentro de la condición
    Console.WriteLine($"«{cadena2}» tiene {n} letras");
}`,
    ruby: r`a, b, c = 1, 5, 10
puts a < b && b < c         # no hay comparaciones encadenadas: se unen con &&
puts a < b && b == c
puts [1, 2, 3].include?(3)  # pertenencia
puts !(a > b)

cadena1, cadena2, cadena3 = '', 'Trondheim', 'Hammer Dance'
# ¡ojo! en Ruby el texto vacío cuenta como verdadero: || no sirve aquí
no_vacia = [cadena1, cadena2, cadena3].find { |cadena| !cadena.empty? }
puts no_vacia

if (n = cadena2.length) > 5  # asignar dentro de una condición
  puts "«#{cadena2}» tiene #{n} letras"
end`,
    rust: r`let (a, b, c) = (1, 5, 10);
println!("{}", a < b && b < c);   // no hay comparaciones encadenadas: se unen con &&
println!("{}", a < b && b == c);
println!("{}", [1, 2, 3].contains(&3));  // pertenencia
println!("{}", !(a > b));

let (cadena1, cadena2, cadena3) = ("", "Trondheim", "Hammer Dance");
// el primer valor que no esté vacío
let no_vacia = [cadena1, cadena2, cadena3].into_iter().find(|cadena| !cadena.is_empty()).unwrap();
println!("{no_vacia}");

let n = cadena2.chars().count();
if n > 5 {
    println!("«{cadena2}» tiene {n} letras");
}`,
    kotlin: r`val a = 1
val b = 5
val c = 10
println(a < b && b < c)         // no hay comparaciones encadenadas: se unen con &&
println(a < b && b == c)
println(3 in listOf(1, 2, 3))   // pertenencia
println(!(a > b))

val cadena1 = ""
val cadena2 = "Trondheim"
val cadena3 = "Hammer Dance"
val noVacia = listOf(cadena1, cadena2, cadena3).first { it.isNotEmpty() }
println(noVacia)

val n = cadena2.length
if (n > 5) {
    println("«$cadena2» tiene $n letras")
}`,
    output: { csharp: 'True\nFalse\nTrue\nTrue\nTrondheim\n«Trondheim» tiene 9 letras' },
  },
  'Comparar secuencias': {
    javascript: r`console.log('ABC' < 'C' && 'C' < 'Pascal' && 'Pascal' < 'Python')  // los textos sí se comparan letra a letra

// ¡Trampa! Al comparar arreglos, JavaScript los convierte antes en texto
console.log([1, 2, 3] < [1, 2, 4])   // compara "1,2,3" con "1,2,4"
console.log([2] < [10])              // compara "2" con "10": da false
console.log([1, 2, 3] === [1, 2, 3]) // false: son dos arreglos distintos`,
    go: r`// slices.Compare compara elemento a elemento: devuelve -1, 0 o 1
fmt.Println(slices.Compare([]int{1, 2, 3}, []int{1, 2, 4}) < 0)
fmt.Println("ABC" < "C" && "C" < "Pascal" && "Pascal" < "Python")
fmt.Println(slices.Compare([]int{1, 2, 3, 4}, []int{1, 2, 4}) < 0)
fmt.Println(slices.Compare([]int{1, 2}, []int{1, 2, -1}) < 0)
fmt.Println(slices.Equal([]int{1, 2, 3}, []int{1, 2, 3}))`,
    csharp: r`// Las tuplas se comparan elemento a elemento con CompareTo
Console.WriteLine((1, 2, 3).CompareTo((1, 2, 4)) < 0);
Console.WriteLine(string.CompareOrdinal("ABC", "C") < 0);
Console.WriteLine((1, 2, 3) == (1, 2, 3));
int[] primero = [1, 2, 3];
int[] segundo = [1, 2, 3];
Console.WriteLine(primero.SequenceEqual(segundo));  // == compararía si son el mismo arreglo`,
    ruby: r`# <=> compara elemento a elemento: devuelve -1, 0 o 1
puts(([1, 2, 3] <=> [1, 2, 4]) < 0)
puts 'ABC' < 'C' && 'C' < 'Pascal' && 'Pascal' < 'Python'
puts(([1, 2, 3, 4] <=> [1, 2, 4]) < 0)
puts(([1, 2] <=> [1, 2, -1]) < 0)
puts [1, 2, 3] == [1.0, 2.0, 3.0]`,
    rust: r`// Tuplas, arreglos y vectores se comparan elemento a elemento
println!("{}", (1, 2, 3) < (1, 2, 4));
println!("{}", [1, 2, 3] < [1, 2, 4]);
println!("{}", "ABC" < "C" && "C" < "Pascal" && "Pascal" < "Python");
println!("{}", vec![1, 2, 3, 4] < vec![1, 2, 4]);
println!("{}", vec![1, 2] < vec![1, 2, -1]);`,
    kotlin: r`// Los textos se comparan letra a letra; las listas solo admiten == y !=
println("ABC" < "C" && "C" < "Pascal" && "Pascal" < "Python")
println(listOf(1, 2, 3) == listOf(1, 2, 3))
println(Pair(1, 2) == Pair(1, 2))
println(listOf(1, 2, 3) == listOf(1, 2, 4))`,
    output: {
      javascript: 'true\ntrue\nfalse\nfalse',
      go: 'true\ntrue\ntrue\ntrue\ntrue',
      csharp: 'True\nTrue\nTrue\nTrue',
      ruby: 'true\ntrue\ntrue\ntrue\ntrue',
      rust: 'true\ntrue\ntrue\ntrue\ntrue',
      kotlin: 'true\ntrue\ntrue\nfalse',
    },
  },
  'Para leer más': {
    javascript: 'Colecciones indexadas (arreglos): https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Indexed_collections\nColecciones con clave (Map y Set): https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Keyed_collections',
    go: 'Slices y maps en el recorrido por Go: https://go.dev/tour/moretypes/7\nPaquete slices: https://pkg.go.dev/slices',
    csharp: 'Colecciones en .NET: https://learn.microsoft.com/es-es/dotnet/standard/collections/\nLINQ: https://learn.microsoft.com/es-es/dotnet/csharp/linq/',
    ruby: 'Clase Array: https://docs.ruby-lang.org/en/master/Array.html\nClase Hash: https://docs.ruby-lang.org/en/master/Hash.html',
    rust: 'Colecciones comunes en el libro de Rust: https://doc.rust-lang.org/book/ch08-00-common-collections.html',
    kotlin: 'Colecciones en Kotlin: https://kotlinlang.org/docs/collections-overview.html',
  },
}
