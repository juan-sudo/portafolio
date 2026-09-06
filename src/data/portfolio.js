import angularIcon from '../assets/angular.svg'
import javaIcon from '../assets/java.svg'
import mongoIcon from '../assets/mongo.svg'
import postgresqlIcon from '../assets/postgre12.svg'
import pythonIcon from '../assets/python.svg'
import reactIcon from '../assets/ireact.svg'
import springIcon from '../assets/sprint.svg'
import projectImage from '../assets/venta.jpg'
import projectImage1 from '../assets/sisgat.jpg'
import projectImage2 from '../assets/colegio.jpg'

export const profile = {
  name: 'Juan de la Cruz Huamani',
  role: 'Desarrollador Full Stack',
  description: 'Construyo aplicaciones web sólidas, rápidas y fáciles de usar, conectando interfaces cuidadas con arquitecturas backend escalables.',
  linkedin: 'https://www.linkedin.com/in/juan-de-la-cruz-huamani-b50649186/',
  facebook: 'https://www.facebook.com/juandelacruz.ncy?locale=es_LA',
  cv: 'https://drive.google.com/file/d/17aZ9GqQtS5wYPqSpMKcmbEKh0RxaB_m3/view?usp=sharing',
  whatsapp: '51955196507',
}

export const navigation = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Aprende', href: '#aprende' },
  { label: 'Contacto', href: '#contacto' },
]

export const experience = [
  {
    period: 'Mar. 2025 — Jun. 2026',
    company: 'Municipalidad Provincial de Lucanas Puquio',
    role: 'Desarrollador y Soporte de Sistemas',
    description: 'Soporte técnico y funcional del Sistema de Recaudación Municipal (SRM). Actualización e implementación de módulos, además del desarrollo y mantenimiento de funcionalidades.',
    technologies: ['PHP', 'Bootstrap', 'SRM', 'Soporte técnico'],
  },
  {
    period: 'Abr. 2024 — Sept. 2024',
    company: 'Krodam S.A.C.',
    role: 'Desarrollador Backend',
    description: 'Desarrollo del módulo de Gestión de Kardex bajo una arquitectura de microservicios, incluyendo su contenerización y gestión de tareas del proyecto.',
    technologies: ['Java 17', 'Spring Boot 3', 'MongoDB', 'Docker', 'Jira', 'Microservicios'],
  },
  {
    period: 'Jul. 2023 — Feb. 2024',
    company: 'Consorcio Gremcosur S.A.C.',
    role: 'Desarrollador Backend',
    description: 'Desarrollo del módulo de gestión de tienda para una plataforma marketplace, aplicando arquitectura hexagonal y controlando el flujo de tareas mediante GitHub.',
    technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL 14', 'GitHub', 'Arquitectura hexagonal'],
  },
  {
    period: 'Mar. 2022 — Abr. 2023',
    company: 'EdsinCloud E.I.R.L.',
    role: 'Desarrollador Full Stack',
    description: 'Desarrollo e implementación de una aplicación web y despliegue en servidores de la universidad mediante Debian y Docker. Implementación de interfaces con Pipes, interceptores y Guards, además del uso de librerías como SweetAlert2 y Bootstrap.',
    technologies: ['Java 8', 'Spring Boot', 'JPA', 'Angular 8', 'PostgreSQL', 'Docker', 'Debian'],
  },
  {
    period: 'Feb. 2020 — Nov. 2020',
    company: 'Digital Corp Perú S.A.C.',
    role: 'Soporte de Tecnología',
    description: 'Participación en una empresa peruana dedicada a brindar servicios y soluciones de tecnología, ingeniería y medio ambiente, comprometida con la entrega de resultados de alto nivel.',
    technologies: ['Tecnología', 'Soporte técnico', 'Ingeniería'],
  },
]

export const skills = [
  { name: 'Java', icon: javaIcon, category: 'Backend' },
  { name: 'Spring', icon: springIcon, category: 'Backend' },
  { name: 'Python', icon: pythonIcon, category: 'Backend' },
  { name: 'React', icon: reactIcon, category: 'Frontend' },
  { name: 'Angular', icon: angularIcon, category: 'Frontend' },
  { name: 'PostgreSQL', icon: postgresqlIcon, category: 'Datos' },
  { name: 'MongoDB', icon: mongoIcon, category: 'Datos' },
]

export const projects = [
  {
    title: 'Sistema de venta de pasajes turísticos',
    description: 'Aplicación para gestionar la venta y administración de pasajes turísticos desde una experiencia web centralizada.',
    image: projectImage,
    technologies: ['Java', 'Spring', 'React', 'PostgreSQL'],
    modules: ['Gestión de pasajes', 'Gestión de clientes', 'Gestión de rutas', 'Reportes de ventas'],
    plans: [
      { name: 'Básico', price: 'S/ 800', features: ['Catálogo de pasajes', 'Venta y facturación simple', 'Reportes básicos'] },
      { name: 'Estándar', price: 'S/ 1,500', highlighted: true, features: ['Todo lo del plan Básico', 'Gestión de clientes', 'Gestión de rutas', 'Reportes avanzados'] },
      { name: 'Premium', price: 'S/ 2,500', features: ['Todo lo del plan Estándar', 'Multi-sucursal', 'Integración de pagos online', 'Soporte prioritario'] },
    ],
    link:'',
  },
  {
    title: 'Sistema Integrado de Gestión de Administrativa (SISGAT)',
    description: 'Sistema para cobranza de impuestos, arbitrio municipal, cobranza de proveidos y gestion de cobranza de agua',
    image: projectImage1,
    technologies: ['Python', 'Django', 'React next', 'PostgreSQL', 'Docker'],
    modules: ['Cobranza de impuestos', 'Arbitrio municipal', 'Cobranza de proveídos', 'Gestión de cobranza de agua'],
    plans: [
      { name: 'Básico', price: 'S/ 1,200', features: ['Cobranza de impuestos', 'Registro de contribuyentes', 'Reportes básicos'] },
      { name: 'Estándar', price: 'S/ 2,200', highlighted: true, features: ['Todo lo del plan Básico', 'Arbitrio municipal', 'Cobranza de proveídos', 'Dashboard de recaudación'] },
      { name: 'Premium', price: 'S/ 3,500', features: ['Todo lo del plan Estándar', 'Gestión de cobranza de agua', 'Alertas y notificaciones', 'Soporte prioritario'] },
    ],
     link:'https://sisgat-frontend.onrender.com/login',
  },
  {
    title: 'Sistema Gestion de colegio',
    description: 'Sistema para gestionar la administración de un colegio, incluyendo la gestión de estudiantes, profesores y cursos.',
    image: projectImage2,
    technologies: ['Php', 'Laravel', 'Vue', 'PostgreSQL', 'Docker'],
    modules: ['Gestión de estudiantes', 'Gestión de profesores', 'Gestión de cursos', 'Gestión de matrículas'],
    plans: [
      { name: 'Básico', price: 'S/ 1,500', features: ['Inicio', 'Estudiantes', 'Cursos', 'Asistencia', 'Notas', 'Horarios', ] },
      { name: 'Estándar', price: 'S/ 2,800', highlighted: true, features: ['Todo lo del plan Básico','Reporte ', 'Mensaje de Asistencia '] },
      { name: 'Premium', price: 'S/ 4,500', features: ['Todo lo del plan Estándar', 'Contabilidad', 'Soporte prioritario','Varios sede' ] }
    ],
     link:'https://colegio-sistema-produccion.onrender.com/login',
  }


]

export const learningPath = [
  {
    level: 1,
    title: 'Fundamentos',
    comparative: true,
    topics: [
      {
        title: '¿Qué es la programación?',
        python: 'Escribir instrucciones claras y paso a paso, en una sintaxis simple y muy legible.',
        php: 'Escribir instrucciones que el servidor interpreta para generar páginas web dinámicas.',
        java: 'Escribir instrucciones que se compilan a bytecode y corren en la máquina virtual de Java (JVM).',
      },
      {
        title: 'Algoritmos y pensamiento lógico',
        python: 'El razonamiento no cambia entre lenguajes: primero el algoritmo, luego el código. Python es casi tan legible como el pseudocódigo.',
        php: 'Mismo proceso lógico; suele aplicarse a algoritmos ligados a una petición web, como validar un formulario.',
        java: 'Mismo proceso lógico, pero pensando también en clases y tipos desde el inicio, por ser fuertemente tipado.',
      },
      {
        title: 'Tu primer programa (Hola, mundo)',
        code: true,
        python: 'print("Hola, mundo")',
        php: '<?php\necho "Hola, mundo";',
        java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hola, mundo");\n  }\n}',
      },
      {
        title: 'Variables y tipos de datos',
        code: true,
        python: 'nombre = "Juan"\nedad = 25\naltura = 1.75',
        php: '$nombre = "Juan";\n$edad = 25;\n$altura = 1.75;',
        java: 'String nombre = "Juan";\nint edad = 25;\ndouble altura = 1.75;',
      },
      {
        title: 'Entrada y salida de datos',
        code: true,
        python: 'nombre = input("Tu nombre: ")\nprint("Hola,", nombre)',
        php: '$nombre = readline("Tu nombre: ");\necho "Hola, $nombre";',
        java: 'Scanner sc = new Scanner(System.in);\nString nombre = sc.nextLine();\nSystem.out.println("Hola, " + nombre);',
      },
      {
        title: 'Operadores básicos',
        code: true,
        python: 'suma = 5 + 3\nesIgual = (5 == 3)\nresto = 10 % 3',
        php: '$suma = 5 + 3;\n$esIgual = (5 == 3);\n$resto = 10 % 3;',
        java: 'int suma = 5 + 3;\nboolean esIgual = (5 == 3);\nint resto = 10 % 3;',
      },
    ],
  },
  {
    level: 2,
    title: 'Estructuras de control',
    comparative: true,
    topics: [
      {
        title: 'Condicionales (if/else)',
        code: true,
        python: 'edad = 18\nif edad >= 18:\n    print("Eres mayor de edad")\nelse:\n    print("Eres menor de edad")',
        php: '$edad = 18;\nif ($edad >= 18) {\n    echo "Eres mayor de edad";\n} else {\n    echo "Eres menor de edad";\n}',
        java: 'int edad = 18;\nif (edad >= 18) {\n    System.out.println("Eres mayor de edad");\n} else {\n    System.out.println("Eres menor de edad");\n}',
      },
      {
        title: 'Bucles (for/while)',
        code: true,
        python: 'for i in range(5):\n    print(i)',
        php: 'for ($i = 0; $i < 5; $i++) {\n    echo $i;\n}',
        java: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}',
      },
      {
        title: 'Listas y arreglos',
        code: true,
        python: 'frutas = ["manzana", "pera", "uva"]\nprint(frutas[0])',
        php: '$frutas = ["manzana", "pera", "uva"];\necho $frutas[0];',
        java: 'String[] frutas = {"manzana", "pera", "uva"};\nSystem.out.println(frutas[0]);',
      },
      {
        title: 'Funciones básicas',
        code: true,
        python: 'def saludar(nombre):\n    return "Hola, " + nombre\n\nprint(saludar("Ana"))',
        php: 'function saludar($nombre) {\n    return "Hola, " . $nombre;\n}\n\necho saludar("Ana");',
        java: 'static String saludar(String nombre) {\n    return "Hola, " + nombre;\n}\n\nSystem.out.println(saludar("Ana"));',
      },
    ],
  },
  {
    level: 3,
    title: 'Programación intermedia',
    comparative: true,
    topics: [
      {
        title: 'Cadenas de texto (strings)',
        code: true,
        python: 'nombre = "juan"\nprint(nombre.upper())\nprint(len(nombre))',
        php: '$nombre = "juan";\necho strtoupper($nombre);\necho strlen($nombre);',
        java: 'String nombre = "juan";\nSystem.out.println(nombre.toUpperCase());\nSystem.out.println(nombre.length());',
      },
      {
        title: 'Diccionarios y estructuras de datos',
        code: true,
        python: 'persona = {"nombre": "Ana", "edad": 25}\nprint(persona["nombre"])',
        php: '$persona = ["nombre" => "Ana", "edad" => 25];\necho $persona["nombre"];',
        java: 'Map<String, Object> persona = new HashMap<>();\npersona.put("nombre", "Ana");\nSystem.out.println(persona.get("nombre"));',
      },
      {
        title: 'Manejo de errores',
        code: true,
        python: 'try:\n    resultado = 10 / 0\nexcept ZeroDivisionError:\n    print("No se puede dividir entre 0")',
        php: 'try {\n    $resultado = 10 / 0;\n} catch (DivisionByZeroError $e) {\n    echo "No se puede dividir entre 0";\n}',
        java: 'try {\n    int resultado = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("No se puede dividir entre 0");\n}',
      },
      {
        title: 'Archivos (leer/escribir)',
        code: true,
        python: 'with open("datos.txt", "w") as f:\n    f.write("Hola mundo")',
        php: 'file_put_contents("datos.txt", "Hola mundo");',
        java: 'Files.writeString(Path.of("datos.txt"), "Hola mundo");',
      },
      {
        title: 'Módulos y librerías',
        code: true,
        python: 'import math\nprint(math.sqrt(16))',
        php: 'require "utilidades.php";\necho calcular(16);',
        java: 'import java.util.Scanner;\nScanner sc = new Scanner(System.in);',
      },
    ],
  },
  {
    level: 4,
    title: 'Proyectos guiados',
    comparative: true,
    topics: [
      {
        title: 'Calculadora',
        python: 'Con input() para leer números y operadores; operaciones directas con +, -, *, /.',
        php: 'Un formulario HTML que envía los valores; PHP los procesa y calcula el resultado.',
        java: 'Con Scanner para leer datos y una clase Calculadora con un método por operación.',
      },
      {
        title: 'Juego de adivinanza',
        python: 'random.randint(1, 100) genera el número secreto; un bucle while compara cada intento.',
        php: 'rand(1, 100) genera el número; cada intento se valida en una nueva petición del formulario.',
        java: 'La clase Random genera el número; un bucle while con Scanner compara los intentos.',
      },
      {
        title: 'Lista de tareas (To-Do)',
        python: 'Una lista de diccionarios en memoria, o guardada en un archivo JSON.',
        php: 'Se guarda en una base de datos; agregar o completar una tarea es una petición HTTP.',
        java: 'Una List<Tarea> con una clase Tarea, opcionalmente persistida con JPA.',
      },
      {
        title: 'Conversor de unidades',
        python: 'Funciones simples que reciben un valor y aplican la fórmula de conversión.',
        php: 'Un formulario web envía el valor y la unidad; PHP calcula y muestra el resultado.',
        java: 'Métodos estáticos por tipo de conversión, agrupados en una clase ConversorUtils.',
      },
      {
        title: 'Mini sistema de notas',
        python: 'Un diccionario de estudiante → notas, con una función para calcular el promedio.',
        php: 'Una tabla en base de datos con las notas por alumno, editable desde una vista web.',
        java: 'Una clase Estudiante con una lista de notas y un método para el promedio.',
      },
    ],
  },
  {
    level: 5,
    title: 'Siguientes pasos',
    comparative: true,
    topics: [
      {
        title: 'Programación orientada a objetos',
        code: true,
        python: 'class Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre',
        php: 'class Persona {\n    public $nombre;\n    function __construct($nombre) {\n        $this->nombre = $nombre;\n    }\n}',
        java: 'class Persona {\n    String nombre;\n    Persona(String nombre) {\n        this.nombre = nombre;\n    }\n}',
      },
      {
        title: 'Introducción a HTML/CSS',
        python: 'No es su terreno natural, pero genera HTML dinámico con motores de plantillas como Jinja2.',
        php: 'PHP nació para esto: mezcla HTML y lógica en el mismo archivo para generar páginas dinámicas.',
        java: 'Genera HTML desde el backend con motores de plantillas como Thymeleaf en apps Spring Boot.',
      },
      {
        title: 'Introducción a JavaScript',
        python: 'No corre en el navegador; JavaScript aporta la interactividad al HTML que Python genera.',
        php: 'PHP entrega el HTML desde el servidor; JavaScript se agrega aparte para el comportamiento en el navegador.',
        java: 'Tampoco corre en el navegador; se combina con JavaScript en el frontend de las apps que construye.',
      },
      {
        title: 'Bases de datos básicas',
        python: 'Se conecta con librerías como psycopg2 o el ORM de Django para hablar con PostgreSQL.',
        php: 'Usa PDO o mysqli para ejecutar consultas SQL directamente contra la base de datos.',
        java: 'Usa JDBC o un ORM como JPA/Hibernate para mapear las tablas a clases Java.',
      },
      {
        title: 'Recursos para seguir aprendiendo',
        python: 'Documentación oficial en python.org, y practicar con proyectos pequeños y retos de código.',
        php: 'Documentación oficial en php.net, y explorar Laravel para ver buenas prácticas en un framework real.',
        java: 'Documentación oficial de Oracle, y aprender Spring Boot para crear APIs y microservicios.',
      },
    ],
  },
]

export const languageComparison = {
  languages: ['PHP', 'Python', 'Java'],
  rows: [
    {
      label: 'Tipo de lenguaje',
      values: [
        'Script para web, interpretado',
        'Interpretado, multipropósito',
        'Compilado a bytecode (JVM), orientado a objetos',
      ],
    },
    {
      label: 'Tipado',
      values: ['Dinámico', 'Dinámico', 'Estático'],
    },
    {
      label: 'Curva de aprendizaje',
      values: ['Baja', 'Baja', 'Media'],
    },
    {
      label: 'Rendimiento típico',
      values: ['Medio', 'Medio', 'Alto'],
    },
    {
      label: 'Frameworks frecuentes',
      values: ['Laravel, WordPress', 'Django, Flask, FastAPI', 'Spring Boot, Quarkus'],
    },
    {
      label: 'Usado en un proyecto real de Juan',
      values: [
        'Sistema de Recaudación Municipal (SRM), Municipalidad de Lucanas Puquio',
        'SISGAT: cobranza municipal con Django y PostgreSQL',
        'Módulo de Kardex con microservicios en Spring Boot',
      ],
    },
    {
      label: 'Cuándo elegirlo',
      values: [
        'Sitios web tradicionales, CMS y hosting compartido',
        'Prototipos rápidos, APIs, automatización, ciencia de datos e IA',
        'Sistemas grandes, alta concurrencia, apps Android, equipos numerosos',
      ],
    },
  ],
}
