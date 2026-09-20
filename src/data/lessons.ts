import type { Lesson } from '../shared/types';

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Hello, World!',
    emoji: '👋',
    description:
      'Every programmer starts here. Use the `print()` function to display text on the screen. Print the exact text: **Hello, World!**',
    starterCode: '# Write your first line of Python below\n',
    tests: [
      {
        description: 'Prints "Hello, World!"',
        testCode: '',
        expectedOutput: 'Hello, World!',
      },
    ],
    hints: [
      'Use the `print()` function with the text inside quotes.',
      'Try: `print("Hello, World!")`',
    ],
  },
  {
    id: 2,
    title: 'Variables',
    emoji: '📦',
    description:
      'Variables store data. Create a variable called `name` with your name as a string, then print a greeting like: **Hello, Alice!**',
    starterCode: '# Create a variable called name\nname = "Alice"\n\n# Print a greeting using the variable\n',
    tests: [
      {
        description: 'Prints "Hello, Alice!"',
        testCode: '',
        expectedOutput: 'Hello, Alice!',
      },
    ],
    hints: [
      'Make sure `name = "Alice"` and you print a greeting.',
      'Use an f-string: `print(f"Hello, {name}!")`',
    ],
  },
  {
    id: 3,
    title: 'Math & Numbers',
    emoji: '🔢',
    description:
      'Python is a great calculator! Define two variables `a = 15` and `b = 7`, then print their **sum**, **difference**, and **product** — each on a new line.',
    starterCode: 'a = 15\nb = 7\n\n# Print sum, difference, product\n',
    tests: [
      {
        description: 'Prints sum (22)',
        testCode: '',
        expectedOutput: '22\n8\n105',
      },
    ],
    hints: [
      'Use `print(a + b)` for the sum.',
      'Use `print(a - b)` for the difference, and `print(a * b)` for the product.',
    ],
  },
  {
    id: 4,
    title: 'String Reversal',
    emoji: '🔄',
    description:
      'Python strings support slicing. Write a function `reverse(s)` that returns the string reversed. When called with `"hello"` it should return `"olleh"`.',
    starterCode: 'def reverse(s):\n    # Return the reversed string\n    pass\n\nprint(reverse("hello"))\nprint(reverse("Python"))\n',
    tests: [
      {
        description: 'reverse("hello") returns "olleh"',
        testCode: '',
        expectedOutput: 'olleh\nnohtyP',
      },
    ],
    hints: [
      'Python slicing syntax: `s[start:stop:step]`',
      'A step of -1 reverses a string: `return s[::-1]`',
    ],
  },
  {
    id: 5,
    title: 'Lists',
    emoji: '📋',
    description:
      'Lists store multiple items. Create a list called `fruits` containing `"apple"`, `"banana"`, `"cherry"`, then print each item on its own line using a `for` loop.',
    starterCode: 'fruits = ["apple", "banana", "cherry"]\n\n# Loop through the list and print each item\n',
    tests: [
      {
        description: 'Prints each fruit on a new line',
        testCode: '',
        expectedOutput: 'apple\nbanana\ncherry',
      },
    ],
    hints: [
      'Use `for item in fruits:` to loop.',
      'Inside the loop, use `print(item)` to print each one.',
    ],
  },
  {
    id: 6,
    title: 'FizzBuzz',
    emoji: '🥤',
    description:
      'A classic! Print numbers **1 to 20**. But for multiples of 3 print `"Fizz"`, for multiples of 5 print `"Buzz"`, and for multiples of both print `"FizzBuzz"`.',
    starterCode: '# FizzBuzz from 1 to 20\nfor i in range(1, 21):\n    pass  # Replace this with your logic\n',
    tests: [
      {
        description: 'Correct FizzBuzz output for 1–20',
        testCode: '',
        expectedOutput:
          '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz',
      },
    ],
    hints: [
      'Check for FizzBuzz first (divisible by both 3 AND 5), then Fizz, then Buzz.',
      'Use the modulo operator `%`. For example: `if i % 3 == 0 and i % 5 == 0:`',
    ],
  },
  {
    id: 7,
    title: 'Functions',
    emoji: '⚙️',
    description:
      'Write a function `square(n)` that returns the square of a number. Then write `cube(n)` that returns the cube. Print `square(4)` and `cube(3)`.',
    starterCode: 'def square(n):\n    pass\n\ndef cube(n):\n    pass\n\nprint(square(4))\nprint(cube(3))\n',
    tests: [
      {
        description: 'square(4) = 16, cube(3) = 27',
        testCode: '',
        expectedOutput: '16\n27',
      },
    ],
    hints: [
      'To square: `return n ** 2` or `return n * n`',
      'To cube: `return n ** 3`',
    ],
  },
  {
    id: 8,
    title: 'While Loops',
    emoji: '🔁',
    description:
      'Use a `while` loop to calculate the sum of all numbers from **1 to 100** (inclusive) and print the result.',
    starterCode: 'total = 0\ni = 1\n\n# Use a while loop to sum 1 to 100\n\nprint(total)\n',
    tests: [
      {
        description: 'Sum of 1 to 100 = 5050',
        testCode: '',
        expectedOutput: '5050',
      },
    ],
    hints: [
      'Keep adding `i` to `total` and increment `i` by 1 each iteration.',
      'Stop the loop when `i > 100` using `while i <= 100:`',
    ],
  },
  {
    id: 9,
    title: 'Dictionaries',
    emoji: '📖',
    description:
      'A dictionary maps keys to values. Create a dict called `person` with keys `"name"` (value: `"Ada"`) and `"age"` (value: `42`). Print them like: `Ada is 42 years old.`',
    starterCode: 'person = {\n    "name": "Ada",\n    "age": 42\n}\n\n# Print the formatted string\n',
    tests: [
      {
        description: 'Prints "Ada is 42 years old."',
        testCode: '',
        expectedOutput: 'Ada is 42 years old.',
      },
    ],
    hints: [
      'Access values with `person["name"]` and `person["age"]`.',
      'Use an f-string: `print(f\'{person["name"]} is {person["age"]} years old.\')`',
    ],
  },
  {
    id: 10,
    title: 'Classes',
    emoji: '🐍',
    description:
      'Classes are blueprints for objects. Write a `Dog` class with a `name` attribute and a `bark()` method that returns `"Woof! My name is <name>."`. Create a Dog named `"Rex"` and print its bark.',
    starterCode: 'class Dog:\n    def __init__(self, name):\n        pass  # Store the name\n\n    def bark(self):\n        pass  # Return the bark string\n\nrex = Dog("Rex")\nprint(rex.bark())\n',
    tests: [
      {
        description: 'Dog("Rex").bark() returns correct string',
        testCode: '',
        expectedOutput: 'Woof! My name is Rex.',
      },
    ],
    hints: [
      'In `__init__`, store the name: `self.name = name`',
      'In `bark`, return: `return f"Woof! My name is {self.name}."`',
    ],
  },
];
