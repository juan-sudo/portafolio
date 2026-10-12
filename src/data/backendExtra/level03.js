// Nivel 3 · Estructuras de control
export default {
  'Condicionales (if/else)': {
    javascript: 'const edad = 18\nif (edad >= 18) {\n  console.log("Eres mayor de edad")\n} else {\n  console.log("Eres menor de edad")\n}',
    go: 'edad := 18\nif edad >= 18 {\n    fmt.Println("Eres mayor de edad")\n} else {\n    fmt.Println("Eres menor de edad")\n}',
    csharp: 'int edad = 18;\nif (edad >= 18) {\n    Console.WriteLine("Eres mayor de edad");\n} else {\n    Console.WriteLine("Eres menor de edad");\n}',
    ruby: 'edad = 18\nif edad >= 18\n  puts "Eres mayor de edad"\nelse\n  puts "Eres menor de edad"\nend',
    rust: 'let edad = 18;\nif edad >= 18 {\n    println!("Eres mayor de edad");\n} else {\n    println!("Eres menor de edad");\n}',
    kotlin: 'val edad = 18\nif (edad >= 18) {\n    println("Eres mayor de edad")\n} else {\n    println("Eres menor de edad")\n}',
  },
  'Bucles (for/while)': {
    javascript: 'for (let i = 0; i < 5; i++) {\n  console.log(i)\n}',
    go: 'for i := 0; i < 5; i++ {\n    fmt.Println(i)\n}',
    csharp: 'for (int i = 0; i < 5; i++) {\n    Console.WriteLine(i);\n}',
    ruby: '5.times do |i|\n  puts i\nend',
    rust: 'for i in 0..5 {\n    println!("{i}");\n}',
    kotlin: 'for (i in 0 until 5) {\n    println(i)\n}',
  },
  'Listas y arreglos': {
    javascript: 'const frutas = ["manzana", "pera", "uva"]\nconsole.log(frutas[0])',
    go: 'frutas := []string{"manzana", "pera", "uva"}\nfmt.Println(frutas[0])',
    csharp: 'string[] frutas = { "manzana", "pera", "uva" };\nConsole.WriteLine(frutas[0]);',
    ruby: 'frutas = ["manzana", "pera", "uva"]\nputs frutas[0]',
    rust: 'let frutas = ["manzana", "pera", "uva"];\nprintln!("{}", frutas[0]);',
    kotlin: 'val frutas = listOf("manzana", "pera", "uva")\nprintln(frutas[0])',
  },
  'Funciones básicas': {
    javascript: 'function saludar(nombre) {\n  return "Hola, " + nombre\n}\n\nconsole.log(saludar("Ana"))',
    go: 'func saludar(nombre string) string {\n    return "Hola, " + nombre\n}\n\nfmt.Println(saludar("Ana"))',
    csharp: 'string Saludar(string nombre) {\n    return "Hola, " + nombre;\n}\n\nConsole.WriteLine(Saludar("Ana"));',
    ruby: 'def saludar(nombre)\n  "Hola, " + nombre\nend\n\nputs saludar("Ana")',
    rust: 'fn saludar(nombre: &str) -> String {\n    format!("Hola, {nombre}")\n}\n\nprintln!("{}", saludar("Ana"));',
    kotlin: 'fun saludar(nombre: String): String {\n    return "Hola, " + nombre\n}\n\nprintln(saludar("Ana"))',
  },
}
