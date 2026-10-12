const practiceCases = [
  [18, 6],
  [45, 9],
  [72, 8],
  [125, 5],
  [240, 12],
  [999, 27],
  [64, 16],
]

const oneValueCases = [4, 15, 32, 100, 2024, 1900, 2000]

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)))
}

// La expresión de Java sirve para casi todos; aquí solo van las que cambian en cada lenguaje
const EXPRESSIONS = {
  javascript: {
    '(int) a % (int) b': 'Math.trunc(a) % Math.trunc(b)',
    '(int) valor % 5 == 0': 'Math.trunc(valor) % 5 === 0',
  },
  go: {
    '(int) a % (int) b': 'float64(int(a) % int(b))',
    'Math.max(a, b)': 'max(a, b)',
    'Math.min(a, b)': 'min(a, b)',
    '2 * Math.PI * valor': '2 * math.Pi * valor',
    '(int) valor % 5 == 0': 'int(valor)%5 == 0',
  },
  csharp: {
    'Math.max(a, b)': 'Math.Max(a, b)',
    'Math.min(a, b)': 'Math.Min(a, b)',
  },
  ruby: {
    '(int) a % (int) b': 'a.to_i % b.to_i',
    'Math.max(a, b)': '[a, b].max',
    'Math.min(a, b)': '[a, b].min',
    '2 * Math.PI * valor': '2 * Math::PI * valor',
    '(int) valor % 5 == 0': 'valor.to_i % 5 == 0',
  },
  rust: {
    '(int) a % (int) b': '(a as i64 % b as i64) as f64',
    '(a + b) / 2': '(a + b) / 2.0',
    'Math.max(a, b)': 'a.max(b)',
    'Math.min(a, b)': 'a.min(b)',
    '2 * (a + b)': '2.0 * (a + b)',
    'valor * 9 / 5 + 32': 'valor * 9.0 / 5.0 + 32.0',
    '2 * Math.PI * valor': '2.0 * std::f64::consts::PI * valor',
    'valor > 0': 'valor > 0.0',
    '(int) valor % 5 == 0': 'valor as i64 % 5 == 0',
  },
  kotlin: {
    '(int) a % (int) b': '(a.toInt() % b.toInt()).toDouble()',
    'Math.max(a, b)': 'maxOf(a, b)',
    'Math.min(a, b)': 'minOf(a, b)',
    '(int) valor % 5 == 0': 'valor.toInt() % 5 == 0',
  },
}

const RUST_READER = `fn leer(mensaje: &str) -> f64 {
    print!("{mensaje}");
    io::stdout().flush().unwrap();
    let mut texto = String::new();
    io::stdin().read_line(&mut texto).unwrap();
    texto.trim().parse().unwrap()
}`

// La misma solución en los demás lenguajes de backend
function extraSolutions(task, oneValue) {
  const expression = (language) => EXPRESSIONS[language][task.javaExpression] ?? task.javaExpression
  const inputs = oneValue ? [['valor', task.label]] : [['a', 'Primer valor'], ['b', 'Segundo valor']]
  const read = (line) => inputs.map(([name, label]) => line(name, label)).join('\n')
  const show = (number, yesNo) => (task.condition ? yesNo : number)

  return {
    javascript: [
      "import { createInterface } from 'node:readline/promises'",
      '',
      'const consola = createInterface({ input: process.stdin, output: process.stdout })',
      read((name, label) => `const ${name} = Number(await consola.question('${label}: '))`),
      'consola.close()',
      '',
      `const resultado = ${expression('javascript')}`,
      show("console.log('Resultado:', Number(resultado.toFixed(2)))", "console.log('Resultado:', resultado ? 'sí' : 'no')"),
    ].join('\n'),
    go: [
      `var ${inputs.map(([name]) => name).join(', ')} float64`,
      read((name, label) => `fmt.Print("${label}: ")\nfmt.Scan(&${name})`),
      '',
      `resultado := ${expression('go')}`,
      show('fmt.Printf("Resultado: %.2f\\n", resultado)', 'if resultado {\n    fmt.Println("Resultado: sí")\n} else {\n    fmt.Println("Resultado: no")\n}'),
    ].join('\n'),
    csharp: [
      read((name, label) => `Console.Write("${label}: ");\ndouble ${name} = double.Parse(Console.ReadLine());`),
      '',
      `${task.condition ? 'bool' : 'double'} resultado = ${expression('csharp')};`,
      show('Console.WriteLine($"Resultado: {resultado:F2}");', 'Console.WriteLine("Resultado: " + (resultado ? "sí" : "no"));'),
    ].join('\n'),
    ruby: [
      read((name, label) => `print '${label}: '\n${name} = gets.to_f`),
      '',
      `resultado = ${expression('ruby')}`,
      show("puts format('Resultado: %.2f', resultado)", "puts 'Resultado: ' + (resultado ? 'sí' : 'no')"),
    ].join('\n'),
    rust: [
      RUST_READER,
      '',
      read((name, label) => `let ${name} = leer("${label}: ");`),
      `let resultado = ${expression('rust')};`,
      show('println!("Resultado: {resultado:.2}");', 'println!("Resultado: {}", if resultado { "sí" } else { "no" });'),
    ].join('\n'),
    kotlin: [
      read((name, label) => `print("${label}: ")\nval ${name} = readln().toDouble()`),
      '',
      `val resultado = ${expression('kotlin')}`,
      show('println("Resultado: %.2f".format(resultado))', 'println("Resultado: " + if (resultado) "sí" else "no")'),
    ].join('\n'),
  }
}

function createNumericExercise(task, values, otherCases) {
  const oneValue = task.inputs === 1
  const [a, b] = values
  const pythonInputs = oneValue
    ? `valor = float(input('${task.label}: '))`
    : `a = float(input('Primer valor: '))\nb = float(input('Segundo valor: '))`
  const phpInputs = oneValue
    ? `$valor = (float) readline('${task.label}: ');`
    : `$a = (float) readline('Primer valor: ');\n$b = (float) readline('Segundo valor: ');`
  const javaInputs = oneValue
    ? `System.out.print("${task.label}: ");\ndouble valor = entrada.nextDouble();`
    : `System.out.print("Primer valor: ");\ndouble a = entrada.nextDouble();\nSystem.out.print("Segundo valor: ");\ndouble b = entrada.nextDouble();`
  const sampleInputs = oneValue ? [a] : [a, b]
  const result = task.calculate(a, b)
  const pyResult = task.condition ? (result ? "sí" : "no") : formatNumber(result)
  const phpResult = task.condition ? (result ? "sí" : "no") : formatNumber(result)
  const javaResult = task.condition ? (result ? "sí" : "no") : result.toFixed(2)
  const echoed = oneValue
    ? `${task.label}: ${a}`
    : `Primer valor: ${a}\nSegundo valor: ${b}`
  const solution = task.condition
    ? {
        python: `resultado = ${task.pythonExpression}\nprint('Resultado:', 'sí' if resultado else 'no')`,
        php: `$resultado = ${task.phpExpression};\necho 'Resultado: ', $resultado ? 'sí' : 'no';`,
        java: `boolean resultado = ${task.javaExpression};\nSystem.out.println("Resultado: " + (resultado ? "sí" : "no"));`,
      }
    : {
        python: `resultado = ${task.pythonExpression}\nprint(f'Resultado: {round(resultado, 2):g}')`,
        php: `$resultado = ${task.phpExpression};\necho 'Resultado: ', round($resultado, 2);`,
        java: `double resultado = ${task.javaExpression};\nSystem.out.printf(Locale.US, "Resultado: %.2f%n", resultado);`,
      }

  return {
    title: task.title,
    exercise: true,
    code: true,
    prompt: `${task.prompt} Caso de práctica: ${oneValue ? `valor ${a}` : `valores ${a} y ${b}`}.`,
    note: `Prueba también con: ${otherCases}. Cambia los datos de entrada y edita la solución: Python y PHP ejecutan el código; los demás lenguajes muestran una solución de referencia.`,
    python: `${pythonInputs}\n${solution.python}`,
    php: `${phpInputs}\n${solution.php}`,
    java: `import java.util.Scanner;\nimport java.util.Locale;\n\nScanner entrada = new Scanner(System.in);\n${javaInputs}\n${solution.java}`,
    ...extraSolutions(task, oneValue),
    output: {
      python: `${echoed}\nResultado: ${pyResult}`,
      php: `${echoed}\nResultado: ${phpResult}`,
      java: `${echoed}\nResultado: ${task.condition ? (result ? "sí" : "no") : javaResult}`,
      // JavaScript quita los ceros sobrantes, como Python; los demás muestran dos decimales, como Java
      javascript: `${echoed}\nResultado: ${pyResult}`,
      ...Object.fromEntries(['go', 'csharp', 'ruby', 'rust', 'kotlin'].map((language) => [
        language,
        `${echoed}\nResultado: ${task.condition ? (result ? "sí" : "no") : javaResult}`,
      ])),
    },
    stdin: sampleInputs.map(String),
    fixed: ["java", "javascript"],
  }
}

const tasks = [
  { title: "Sumar dos cantidades", prompt: "Lee dos cantidades y muestra su suma.", pythonExpression: "a + b", phpExpression: "$a + $b", javaExpression: "a + b", calculate: (a, b) => a + b },
  { title: "Restar dos cantidades", prompt: "Calcula cuánto queda al restar la segunda cantidad de la primera.", pythonExpression: "a - b", phpExpression: "$a - $b", javaExpression: "a - b", calculate: (a, b) => a - b },
  { title: "Multiplicar dos cantidades", prompt: "Calcula el producto de dos cantidades.", pythonExpression: "a * b", phpExpression: "$a * $b", javaExpression: "a * b", calculate: (a, b) => a * b },
  { title: "Dividir dos cantidades", prompt: "Calcula el cociente de dos cantidades; el segundo dato es distinto de cero.", pythonExpression: "a / b", phpExpression: "$a / $b", javaExpression: "a / b", calculate: (a, b) => a / b },
  { title: "Calcular el resto", prompt: "Encuentra el resto de dividir el primer entero entre el segundo.", pythonExpression: "int(a) % int(b)", phpExpression: "(int) $a % (int) $b", javaExpression: "(int) a % (int) b", calculate: (a, b) => a % b },
  { title: "Promediar dos valores", prompt: "Calcula la media aritmética de los dos datos.", pythonExpression: "(a + b) / 2", phpExpression: "($a + $b) / 2", javaExpression: "(a + b) / 2", calculate: (a, b) => (a + b) / 2 },
  { title: "Encontrar el mayor", prompt: "Muestra cuál de los dos valores es mayor, o el valor común si son iguales.", pythonExpression: "max(a, b)", phpExpression: "max($a, $b)", javaExpression: "Math.max(a, b)", calculate: (a, b) => Math.max(a, b) },
  { title: "Encontrar el menor", prompt: "Muestra cuál de los dos valores es menor.", pythonExpression: "min(a, b)", phpExpression: "min($a, $b)", javaExpression: "Math.min(a, b)", calculate: (a, b) => Math.min(a, b) },
  { title: "Calcular el área de un rectángulo", prompt: "Usa el ancho y el alto para calcular el área de un rectángulo.", pythonExpression: "a * b", phpExpression: "$a * $b", javaExpression: "a * b", calculate: (a, b) => a * b },
  { title: "Calcular el perímetro de un rectángulo", prompt: "Calcula el contorno de un rectángulo a partir de sus dos lados.", pythonExpression: "2 * (a + b)", phpExpression: "2 * ($a + $b)", javaExpression: "2 * (a + b)", calculate: (a, b) => 2 * (a + b) },
  { title: "Convertir Celsius a Fahrenheit", prompt: "Convierte una temperatura Celsius con la fórmula Fahrenheit = Celsius × 9/5 + 32.", inputs: 1, label: "Celsius", pythonExpression: "valor * 9 / 5 + 32", phpExpression: "$valor * 9 / 5 + 32", javaExpression: "valor * 9 / 5 + 32", calculate: (a) => a * 9 / 5 + 32 },
  { title: "Convertir pulgadas a milímetros", prompt: "Convierte pulgadas a milímetros; una pulgada equivale a 25,4 milímetros.", inputs: 1, label: "Pulgadas", pythonExpression: "valor * 25.4", phpExpression: "$valor * 25.4", javaExpression: "valor * 25.4", calculate: (a) => a * 25.4 },
  { title: "Calcular el área de un cuadrado", prompt: "Calcula el área de un cuadrado elevando la longitud de su lado al cuadrado.", inputs: 1, label: "Lado", pythonExpression: "valor ** 2", phpExpression: "$valor ** 2", javaExpression: "valor * valor", calculate: (a) => a ** 2 },
  { title: "Calcular el volumen de un cubo", prompt: "Calcula el volumen de un cubo a partir de la longitud de una arista.", inputs: 1, label: "Arista", pythonExpression: "valor ** 3", phpExpression: "$valor ** 3", javaExpression: "valor * valor * valor", calculate: (a) => a ** 3 },
  { title: "Calcular la circunferencia", prompt: "Calcula la longitud de una circunferencia con la fórmula 2 × π × radio.", inputs: 1, label: "Radio", pythonExpression: "2 * 3.141592653589793 * valor", phpExpression: "2 * M_PI * $valor", javaExpression: "2 * Math.PI * valor", calculate: (a) => 2 * Math.PI * a },
  { title: "Comprobar si es positivo", prompt: "Indica si el valor es mayor que cero.", inputs: 1, label: "Valor", condition: true, pythonExpression: "valor > 0", phpExpression: "$valor > 0", javaExpression: "valor > 0", calculate: (a) => a > 0 },
  { title: "Comprobar si es divisible entre cinco", prompt: "Indica si el entero es múltiplo de cinco.", inputs: 1, label: "Entero", condition: true, pythonExpression: "int(valor) % 5 == 0", phpExpression: "(int) $valor % 5 === 0", javaExpression: "(int) valor % 5 == 0", calculate: (a) => a % 5 === 0 },
  { title: "Calcular el precio con impuesto", prompt: "Calcula el precio final al sumar un impuesto del 18 % al precio base.", inputs: 1, label: "Precio", pythonExpression: "valor * 1.18", phpExpression: "$valor * 1.18", javaExpression: "valor * 1.18", calculate: (a) => a * 1.18 },
  { title: "Aplicar un descuento", prompt: "Calcula el precio final después de aplicar un descuento del 15 %.", inputs: 1, label: "Precio", pythonExpression: "valor * 0.85", phpExpression: "$valor * 0.85", javaExpression: "valor * 0.85", calculate: (a) => a * 0.85 },
  { title: "Sumar dos números y mostrar el doble", prompt: "Suma los dos datos y multiplica el resultado por dos.", pythonExpression: "2 * (a + b)", phpExpression: "2 * ($a + $b)", javaExpression: "2 * (a + b)", calculate: (a, b) => 2 * (a + b) },
]

// Orden de lo más simple a lo más elaborado: operaciones, fórmulas y comparaciones
const ORDER = [
  'Sumar dos cantidades', 'Restar dos cantidades', 'Multiplicar dos cantidades', 'Dividir dos cantidades',
  'Calcular el resto', 'Promediar dos valores', 'Sumar dos números y mostrar el doble',
  'Calcular el área de un rectángulo', 'Calcular el perímetro de un rectángulo', 'Calcular el área de un cuadrado',
  'Calcular el volumen de un cubo', 'Calcular la circunferencia', 'Convertir Celsius a Fahrenheit',
  'Convertir pulgadas a milímetros', 'Calcular el precio con impuesto', 'Aplicar un descuento',
  'Encontrar el mayor', 'Encontrar el menor', 'Comprobar si es positivo', 'Comprobar si es divisible entre cinco',
]

// Un ejercicio por tarea: el primer caso se usa como entrada y el resto queda como sugerencia
export const additionalExercises = ORDER.map((title) => {
  const task = tasks.find((candidate) => candidate.title === title)
  const cases = task.inputs === 1 ? oneValueCases.map((value) => [value]) : practiceCases
  const otherCases = cases.slice(1, 4).map((values) => values.join(' y ')).join('; ')
  return createNumericExercise(task, cases[0], otherCases)
})
