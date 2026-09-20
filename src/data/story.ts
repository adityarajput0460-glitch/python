import type { TestCase, StoryStageConfig, StoryDialogue, LessonStep } from '../shared/types';

// ─── Story Scene ─────────────────────────────────────────────────────────────
export interface StoryScene {
  id: number;
  title: string;
  location: string;
  emoji: string;
  narrative: string;
  challenge: string;
  starterCode: string;
  tests: TestCase[];
  successText: string;
  failureReaction: string;
  hint: string;
  stage: StoryStageConfig;
  dialogue: StoryDialogue;
}

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: 'The Dungeon Cell',
    location: 'Underground Dungeon',
    emoji: '⛓️',
    narrative:
      'You wake up in a dark stone cell. A red-coated dungeon guard paces outside your iron door. You need to cast your first voice spell to shout for help!',
    challenge:
      '🔮 Spell: Shout for help by printing the exact text **HELP!**',
    starterCode: '# Cast your voice spell\n',
    tests: [
      {
        description: 'Shouts "HELP!"',
        testCode: '',
        expectedOutput: 'HELP!',
      },
    ],
    successText:
      'Your voice echoes through the stone corridors! The guard stops in surprise and walks to your cell door.',
    failureReaction: 'Your spell fizzles into silence. The guard keeps pacing.',
    hint: 'Use print() with exact text: print("HELP!")',
    stage: {
      theme: 'dungeon',
      playerStart: { x: 15, y: 55 },
      playerPassTarget: { x: 70, y: 55 },
      npc: {
        id: 'guard',
        type: 'npc',
        label: 'Red Guard',
        emoji: '💂',
        x: 78,
        y: 55,
        color: 'red',
      },
      objective: {
        id: 'cell_door',
        type: 'door',
        label: 'Iron Cell Door',
        emoji: '🚪',
        x: 88,
        y: 55,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '💂 "Halt inmate! What is that noise in your cell?"',
      npcPassSpeech: '💂 "By Merlin\'s beard! You can speak magic words? Come out!"',
      npcFailSpeech: '💂 "Silence back there, or no bread for dinner!"',
      playerSpellSpeech: '🧙‍♂️ "HELP!"',
    },
  },
  {
    id: 2,
    title: "The Guard's Post",
    location: 'Guard Room',
    emoji: '💂',
    narrative:
      'The red guard unlocks your door. "State your identity, apprentice!" You must store your name in a variable and greet the guard properly.',
    challenge:
      '🔮 Spell: Create `name = "Alex"` and print: **Hello, my name is Alex.**',
    starterCode: '# Create name variable and greet the guard\nname = "Alex"\n',
    tests: [
      {
        description: 'Greets guard with variable name',
        testCode: '',
        expectedOutput: 'Hello, my name is Alex.',
      },
    ],
    successText:
      '"Alex!" The guard nods with respect. "You possess real talent. Let me open the royal treasury door for you."',
    failureReaction: '"That is not a proper greeting!" The guard raises his spear.',
    hint: 'print(f"Hello, my name is {name}.")',
    stage: {
      theme: 'vault',
      playerStart: { x: 20, y: 50 },
      playerPassTarget: { x: 75, y: 50 },
      npc: {
        id: 'captain',
        type: 'npc',
        label: 'Guard Captain',
        emoji: '👮',
        x: 50,
        y: 50,
        color: 'red',
      },
      objective: {
        id: 'vault_gate',
        type: 'door',
        label: 'Treasury Gate',
        emoji: '🏛️',
        x: 88,
        y: 50,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '👮 "Who goes there? State your name clearly!"',
      npcPassSpeech: '👮 "Welcome, Alex! The treasury lies ahead."',
      npcFailSpeech: '👮 "Impostor! State your name with a variable!"',
      playerSpellSpeech: '🧙‍♂️ "Hello, my name is Alex."',
    },
  },
  {
    id: 3,
    title: 'The Vault Lock',
    location: 'Royal Treasury',
    emoji: '💎',
    narrative:
      'The treasury vault is sealed with a magical red runes lock. A glowing riddle commands: "Combine the power of 15 and 7 to produce the key number!"',
    challenge: '🔮 Spell: Calculate `15 + 7` and print the resulting magic number.',
    starterCode: '# Calculate and print 15 + 7\n',
    tests: [
      {
        description: 'Prints correct sum (22)',
        testCode: '',
        expectedOutput: '22',
      },
    ],
    successText:
      'Rattling gears resonate as the vault door unlocks! Gold and ancient scrolls lie revealed.',
    failureReaction: 'Red sparks erupt from the lock! Wrong calculation.',
    hint: 'print(15 + 7)',
    stage: {
      theme: 'vault',
      playerStart: { x: 15, y: 55 },
      playerPassTarget: { x: 80, y: 55 },
      npc: {
        id: 'vault_sentinel',
        type: 'npc',
        label: 'Rune Sentinel',
        emoji: '🤖',
        x: 55,
        y: 55,
        color: 'red',
      },
      objective: {
        id: 'chest',
        type: 'treasure',
        label: 'Rune Vault',
        emoji: '💎',
        x: 88,
        y: 55,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '🤖 "RUNE SENTINEL ACTIVE. ENTER THE SUM OF 15 AND 7 TO PASS."',
      npcPassSpeech: '🤖 "CODE ACCEPTED: 22. ACCESS GRANTED."',
      npcFailSpeech: '🤖 "INCORRECT CODE. VAULT REMAINS LOCKED."',
      playerSpellSpeech: '🧙‍♂️ "22!"',
    },
  },
  {
    id: 4,
    title: 'The Mirror Password Encoder',
    location: 'Hall of Reflections',
    emoji: '🪞',
    narrative:
      'You stand in a hall of enchanted mirrors. The Mirror Specter guards the exit: "Only a true wizard who can reverse ANY secret word shall pass! Your code will be tested against 3 different passwords!"',
    challenge:
      '🔮 Spell: Write a function `reverse(s)` that returns any string `s` reversed.',
    starterCode: 'def reverse(s):\n    # Return reversed string\n    pass\n',
    tests: [
      {
        description: 'Test case 1: reverse("SPELL")',
        testCode: 'print(reverse("SPELL"))',
        expectedOutput: 'LLEPS',
      },
      {
        description: 'Test case 2: reverse("MAGIC")',
        testCode: 'print(reverse("MAGIC"))',
        expectedOutput: 'CIGAM',
      },
      {
        description: 'Test case 3: reverse("DRAGON")',
        testCode: 'print(reverse("DRAGON"))',
        expectedOutput: 'NOGARD',
      },
    ],
    successText:
      'The Specter bows! "Your reversal spell handles all passwords flawlessly!" The mirrors part into a hallway.',
    failureReaction: 'The mirrors glare red! Your function failed one of the password test cases.',
    hint: 'Return s[::-1] inside reverse(s)',
    stage: {
      theme: 'mirror_hall',
      playerStart: { x: 15, y: 50 },
      playerPassTarget: { x: 75, y: 50 },
      npc: {
        id: 'specter',
        type: 'npc',
        label: 'Mirror Specter',
        emoji: '👻',
        x: 50,
        y: 50,
        color: 'purple',
      },
      objective: {
        id: 'mirror_portal',
        type: 'door',
        label: 'Mirror Portal',
        emoji: '🪞',
        x: 85,
        y: 50,
        color: 'blue',
      },
    },
    dialogue: {
      npcGreeting: '👻 "Write a reverse(s) function that works for any password!"',
      npcPassSpeech: '👻 "Masterful! All 3 mirror passwords decoded!"',
      npcFailSpeech: '👻 "Your function failed the secret password test!"',
      playerSpellSpeech: '🧙‍♂️ "def reverse(s): return s[::-1]"',
    },
  },
  {
    id: 5,
    title: 'The Guardian Trio',
    location: 'Moonlit Garden',
    emoji: '🌙',
    narrative:
      'Three giant elemental guardians block the garden path: Stone, Ember, and Frost. You must loop through their list and call each one on a new line.',
    challenge:
      '🔮 Spell: Create `guardians = ["Stone", "Ember", "Frost"]` and print each guardian name.',
    starterCode: 'guardians = ["Stone", "Ember", "Frost"]\n# Loop and print each guardian\n',
    tests: [
      {
        description: 'Prints all 3 guardian names',
        testCode: '',
        expectedOutput: 'Stone\nEmber\nFrost',
      },
    ],
    successText:
      'Stone, Ember, and Frost bow in unison! "You know the ancient calling spell." They step aside.',
    failureReaction: 'The guardians raise their shields. "Speak all three of our names correctly!"',
    hint: 'for g in guardians: print(g)',
    stage: {
      theme: 'garden',
      playerStart: { x: 15, y: 55 },
      playerPassTarget: { x: 80, y: 55 },
      npc: {
        id: 'stone_golem',
        type: 'npc',
        label: 'Elemental Guardians',
        emoji: '🗿',
        x: 55,
        y: 55,
        color: 'red',
      },
      objective: {
        id: 'tower_gate',
        type: 'door',
        label: 'Tower Arch',
        emoji: '⛩️',
        x: 88,
        y: 55,
        color: 'green',
      },
    },
    dialogue: {
      npcGreeting: '🗿 "WE ARE STONE, EMBER, AND FROST. CALL US IN ORDER!"',
      npcPassSpeech: '🗿 "YOU SPEAK THE ANCIENT NAMES. PASS FRIEND!"',
      npcFailSpeech: '🗿 "YOU MISPRONOUNCED OUR GUARDIAN NAMES!"',
      playerSpellSpeech: '🧙‍♂️ "Stone! Ember! Frost!"',
    },
  },
  {
    id: 6,
    title: 'The Clock Tower Chimes',
    location: 'Midnight Tower',
    emoji: '🕰️',
    narrative:
      'The giant tower clock bell mechanism is broken. The red automaton mechanic grunts: "Fix the chime sequence from 1 to 20! Replace multiples of 3 with Fizz, 5 with Buzz, and both with FizzBuzz!"',
    challenge: '🔮 Spell: Generate the complete FizzBuzz sequence from 1 to 20.',
    starterCode: 'for i in range(1, 21):\n    pass  # Add FizzBuzz logic\n',
    tests: [
      {
        description: 'FizzBuzz 1 to 20 sequence',
        testCode: '',
        expectedOutput:
          '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz',
      },
    ],
    successText:
      'The tower bells chime in perfect magical rhythm! A spiral staircase descends to the library.',
    failureReaction: 'Clashing noises sound from the clockwork gears. Try again!',
    hint: 'Check i%3==0 and i%5==0 first for FizzBuzz',
    stage: {
      theme: 'tower',
      playerStart: { x: 15, y: 50 },
      playerPassTarget: { x: 75, y: 50 },
      npc: {
        id: 'clockwork_mechanic',
        type: 'npc',
        label: 'Clockwork Mechanic',
        emoji: '⚙️',
        x: 50,
        y: 50,
        color: 'red',
      },
      objective: {
        id: 'staircase',
        type: 'door',
        label: 'Stairway Door',
        emoji: '🌀',
        x: 85,
        y: 50,
        color: 'purple',
      },
    },
    dialogue: {
      npcGreeting: '⚙️ "The clock chimes are broken! Run FizzBuzz 1..20 to recalibrate!"',
      npcPassSpeech: '⚙️ "Clocks calibrated! Hear the majestic chime!"',
      npcFailSpeech: '⚙️ "Discordant chime detected! Check your modulo logic!"',
      playerSpellSpeech: '🧙‍♂️ "Calibrating chimes with FizzBuzz..."',
    },
  },
  {
    id: 7,
    title: 'The Multi-Power Spell Engine',
    location: 'Ancient Library',
    emoji: '📚',
    narrative:
      'The Library Spectre requires a mathematical function `square(n)` to power the arcane shield. Your function will be tested with multiple power levels (7, 12, and 0)!',
    challenge:
      '🔮 Spell: Write a function `square(n)` that returns the square of any number `n`.',
    starterCode: 'def square(n):\n    # Return n squared\n    pass\n',
    tests: [
      {
        description: 'Test case 1: square(7)',
        testCode: 'print(square(7))',
        expectedOutput: '49',
      },
      {
        description: 'Test case 2: square(12)',
        testCode: 'print(square(12))',
        expectedOutput: '144',
      },
      {
        description: 'Test case 3: square(0)',
        testCode: 'print(square(0))',
        expectedOutput: '0',
      },
    ],
    successText:
      'All 3 power levels charged! The Spectre opens the library secret passage.',
    failureReaction: 'The shield flickers and shuts down. Your square function failed a test case.',
    hint: 'Return n ** 2 or n * n',
    stage: {
      theme: 'library',
      playerStart: { x: 15, y: 55 },
      playerPassTarget: { x: 75, y: 55 },
      npc: {
        id: 'spectre_librarian',
        type: 'npc',
        label: 'Ghost Librarian',
        emoji: '🧙',
        x: 50,
        y: 55,
        color: 'purple',
      },
      objective: {
        id: 'secret_passage',
        type: 'door',
        label: 'Secret Passage',
        emoji: '🔮',
        x: 85,
        y: 55,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '🧙 "Write a square(n) function to charge all 3 power nodes!"',
      npcPassSpeech: '🧙 "Marvelous! 49, 144, and 0 all verified! Passage open!"',
      npcFailSpeech: '🧙 "Power node failed! Check your multiplication logic!"',
      playerSpellSpeech: '🧙‍♂️ "def square(n): return n * n"',
    },
  },
  {
    id: 8,
    title: 'The Bridge of Sums',
    location: 'River of Counting',
    emoji: '🌊',
    narrative:
      'A river of swirling mana blocks your path. A red river guardian demands: "Calculate the exact sum of all integers from 1 to 100 using a while loop to solidify the bridge!"',
    challenge:
      '🔮 Spell: Use a `while` loop to sum numbers from 1 to 100 and print the total.',
    starterCode: 'total = 0\ni = 1\n# Use a while loop to calculate total sum\nprint(total)\n',
    tests: [
      {
        description: 'Sum of 1..100 = 5050',
        testCode: '',
        expectedOutput: '5050',
      },
    ],
    successText:
      'Glowing mana stones form a solid bridge under your feet! You cross over to the Wizard\'s Sanctum.',
    failureReaction: 'The bridge remains water. Check your while loop condition and counter.',
    hint: 'while i <= 100: total += i; i += 1',
    stage: {
      theme: 'river',
      playerStart: { x: 10, y: 55 },
      playerPassTarget: { x: 80, y: 55 },
      npc: {
        id: 'river_guardian',
        type: 'npc',
        label: 'Mana Guardian',
        emoji: '🧜',
        x: 50,
        y: 55,
        color: 'blue',
      },
      objective: {
        id: 'mana_bridge',
        type: 'obstacle',
        label: 'Mana Bridge',
        emoji: '🌉',
        x: 88,
        y: 55,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '🧜 "Sum 1 to 100 with a while loop or sink into the mana river!"',
      npcPassSpeech: '🧜 "5050 is correct! The mana bridge solidifies!"',
      npcFailSpeech: '🧜 "Wrong sum! The waters churn with error!"',
      playerSpellSpeech: '🧙‍♂️ "Total sum is 5050!"',
    },
  },
  {
    id: 9,
    title: "The Archmage's Dictionary Cabinet",
    location: "Wizard's Sanctum",
    emoji: '🧙',
    narrative:
      'Inside the Sanctum, a locked cabinet holds the Dragon Slaying Orb. The cabinet spirit demands: "Create a dictionary called `tome` with title \'Arcane Secrets\' and author \'Merlin\', then print: **Arcane Secrets by Merlin**"',
    challenge:
      '🔮 Spell: Create `tome = {"title": "Arcane Secrets", "author": "Merlin"}` and print the formatted string.',
    starterCode: 'tome = {"title": "Arcane Secrets", "author": "Merlin"}\n# Print the title and author\n',
    tests: [
      {
        description: 'Prints "Arcane Secrets by Merlin"',
        testCode: '',
        expectedOutput: 'Arcane Secrets by Merlin',
      },
    ],
    successText:
      'The cabinet swings wide open! You claim the glowing Dragon Orb!',
    failureReaction: 'The cabinet locks tighter. Check dictionary key names.',
    hint: 'print(f\'{tome["title"]} by {tome["author"]}\')',
    stage: {
      theme: 'sanctum',
      playerStart: { x: 15, y: 50 },
      playerPassTarget: { x: 75, y: 50 },
      npc: {
        id: 'archmage_spirit',
        type: 'npc',
        label: 'Sanctum Spirit',
        emoji: '✨',
        x: 50,
        y: 50,
        color: 'purple',
      },
      objective: {
        id: 'orb_cabinet',
        type: 'treasure',
        label: 'Dragon Orb Cabinet',
        emoji: '🔮',
        x: 85,
        y: 50,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '✨ "Read the dictionary contents to unlock the Dragon Orb!"',
      npcPassSpeech: '✨ "Arcane Secrets by Merlin! The Orb is yours!"',
      npcFailSpeech: '✨ "Dictionary format mismatch!"',
      playerSpellSpeech: '🧙‍♂️ "Arcane Secrets by Merlin"',
    },
  },
  {
    id: 10,
    title: 'The Red Dragon Boss Battle',
    location: 'Mount Inferno',
    emoji: '🐉',
    narrative:
      'The giant Red Dragon blocks the mountain peak! To defeat the dragon, you must construct a `Dragon` class that can roar. Your Dragon class will be tested against 2 different dragon names ("Spark" and "Draco")!',
    challenge:
      '🔮 Spell: Write a `Dragon` class with `__init__(self, name)` and `roar()` returning "ROARRR! I am {name}!".',
    starterCode:
      'class Dragon:\n    def __init__(self, name):\n        self.name = name\n\n    def roar(self):\n        # Return ROARRR string\n        pass\n',
    tests: [
      {
        description: 'Dragon("Spark").roar()',
        testCode: 'print(Dragon("Spark").roar())',
        expectedOutput: 'ROARRR! I am Spark!',
      },
      {
        description: 'Dragon("Draco").roar()',
        testCode: 'print(Dragon("Draco").roar())',
        expectedOutput: 'ROARRR! I am Draco!',
      },
    ],
    successText:
      '🎉 VICTORY! Your dragons Spark and Draco unleash magnificent roars! The Red Dragon flees into the sky! You are the Supreme Python Wizard!',
    failureReaction: 'The Red Dragon breathes fire! Your Dragon class roar method failed.',
    hint: 'return f"ROARRR! I am {self.name}!" in roar()',
    stage: {
      theme: 'lair',
      playerStart: { x: 15, y: 55 },
      playerPassTarget: { x: 70, y: 55 },
      npc: {
        id: 'red_dragon',
        type: 'dragon',
        label: 'Red Boss Dragon',
        emoji: '🐉',
        x: 75,
        y: 45,
        color: 'red',
      },
      objective: {
        id: 'crown',
        type: 'treasure',
        label: 'Wizard Crown',
        emoji: '👑',
        x: 90,
        y: 55,
        color: 'gold',
      },
    },
    dialogue: {
      npcGreeting: '🐉 "ROARRR! WHO DARES CHALLENGE THE RED DRAGON OF MOUNT INFERNO?"',
      npcPassSpeech: '🐉 "IMPOSSIBLE! YOUR DRAGON ROARS ARE TOO POWERFUL! I FLEE!"',
      npcFailSpeech: '🐉 "MWAHAHA! YOUR CLASS HAD NO ROAR! DRAGON FIRE!"',
      playerSpellSpeech: '🧙‍♂️ "ROARRR! I am Spark!"',
    },
  },
];

export const LEARN_STEPS: Record<number, LessonStep[]> = {
  1: [
    {
      type: 'explain',
      heading: 'Introduction to print()',
      body: 'In Python, `print()` is the primary way to output text to the screen. You wrap any message in quotes inside the parentheses.',
      exampleCode: 'print("Hello, World!")',
      exampleOutput: 'Hello, World!',
    },
    {
      type: 'try',
      heading: 'Deep Dive — How print() Works',
      body: 'Why does quotes matter? Quotes tell Python that your text is a **String literal** (raw letters), not a variable or code command.',
      whyItHappened: 'When Python encounters `print("Hello")`:\n1. It reads `print` as a built-in function.\n2. It evaluates `"Hello"` as a text value.\n3. It sends `"Hello"` to standard output and automatically appends a newline `\\n`.',
      exerciseCode: '# Try changing the message\nprint("I am learning Python!")\n',
      exampleOutput: 'I am learning Python!',
      hint: 'You can use single quotes \' or double quotes " around your text.',
    },
    {
      type: 'check',
      heading: 'Challenge — Write Your First Code',
      body: 'Write a Python program that prints the exact phrase: **Hello, World!**',
      exerciseCode: '# Write your code below to meet the requirement\n',
      expectedOutput: 'Hello, World!',
      hint: 'print("Hello, World!")',
    },
  ],
  2: [
    {
      type: 'explain',
      heading: 'Understanding Variables',
      body: 'A **variable** is a named container that holds a value in computer memory. You assign values using the `=` operator.',
      exampleCode: 'name = "Alice"\nprint(f"Hello, {name}!")',
      exampleOutput: 'Hello, Alice!',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Memory & f-Strings',
      body: 'How does Python handle `name = "Alice"`? Python creates a string object `"Alice"` in memory and points the label `name` to it.',
      whyItHappened: 'Why f-strings work:\nThe `f"Hello, {name}!"` syntax tells Python to evaluate expressions inside `{}` before building the final string. If `name = "Alice"`, `{name}` is replaced by `"Alice"`.',
      exerciseCode: 'city = "London"\nprint(f"I live in {city}.")\n',
      exampleOutput: 'I live in London.',
      hint: 'Make sure your f-string starts with an `f` before the opening quote.',
    },
    {
      type: 'check',
      heading: 'Challenge — Store & Greet',
      body: 'Set variable `name = "Alice"` and print: **Hello, Alice!**',
      exerciseCode: 'name = "Alice"\n# Write code below to print the exact greeting\n',
      expectedOutput: 'Hello, Alice!',
      hint: 'print(f"Hello, {name}!")',
    },
  ],
  3: [
    {
      type: 'explain',
      heading: 'Python Math Operations',
      body: 'Python acts as a calculator. Operators include `+` (addition), `-` (subtraction), `*` (multiplication), and `/` (division).',
      exampleCode: 'print(15 + 7)',
      exampleOutput: '22',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Operator Precedence & Types',
      body: 'Python follows standard mathematical order of operations (PEMDAS). Division `/` always returns a float decimal (e.g. `10 / 2 = 5.0`).',
      whyItHappened: 'Why `15 + 7` evaluates to `22`:\nPython evaluates expressions from left to right. When it sees two numbers surrounding `+`, it performs integer addition and produces a single result before passing it to `print()`.',
      exerciseCode: 'a = 15\nb = 7\nprint(a + b)\nprint(a - b)\nprint(a * b)\n',
      exampleOutput: '22\n8\n105',
      hint: 'You can perform math directly inside print() or store results in variables first.',
    },
    {
      type: 'check',
      heading: 'Challenge — Three Calculations',
      body: 'With `a = 15` and `b = 7`, print their sum, difference, and product on separate lines.',
      exerciseCode: 'a = 15\nb = 7\n# Print sum, difference, and product\n',
      expectedOutput: '22\n8\n105',
      hint: 'Call print(a + b), print(a - b), and print(a * b)',
    },
  ],
  4: [
    {
      type: 'explain',
      heading: 'String Slicing & Reversal',
      body: 'Strings are sequences of characters. You can access parts or reverse them using slice syntax `s[start:stop:step]`.',
      exampleCode: 'word = "magic"\nprint(word[::-1])',
      exampleOutput: 'cigam',
    },
    {
      type: 'try',
      heading: 'Deep Dive — How Step -1 Reverses Strings',
      body: 'Why does `[::-1]` reverse a string? The third parameter `step` determines the direction of iteration.',
      whyItHappened: 'When step is `-1`, Python starts at the end of the string (index -1) and walks backwards character by character until it reaches the beginning. `"magic"` becomes `"cigam"`.',
      exerciseCode: 'def reverse(s):\n    return s[::-1]\n\nprint(reverse("hello"))\n',
      exampleOutput: 'olleh',
      hint: '`s[::-1]` is the fastest way to reverse any string in Python.',
    },
    {
      type: 'check',
      heading: 'Challenge — Reversal Function',
      body: 'Write a `reverse(s)` function and print `reverse("hello")` and `reverse("Python")` on separate lines.',
      exerciseCode: 'def reverse(s):\n    pass\n\nprint(reverse("hello"))\nprint(reverse("Python"))\n',
      expectedOutput: 'olleh\nnohtyP',
      hint: 'Inside reverse, return s[::-1]',
    },
  ],
  5: [
    {
      type: 'explain',
      heading: 'Lists and For Loops',
      body: 'A **list** holds multiple ordered items inside `[]`. A `for` loop iterates over each item in the list one at a time.',
      exampleCode: 'items = ["apple", "banana"]\nfor item in items:\n    print(item)',
      exampleOutput: 'apple\nbanana',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Loop Iteration Mechanics',
      body: 'How does a `for` loop work under the hood? Python creates an internal iterator.',
      whyItHappened: 'On each loop cycle:\n1. Python assigns the current list element to the loop variable (`fruit`).\n2. It executes the indented block of code.\n3. It moves to the next element until the list ends.',
      exerciseCode: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n',
      exampleOutput: 'apple\nbanana\ncherry',
      hint: 'Ensure your code inside the for loop is indented with 4 spaces.',
    },
    {
      type: 'check',
      heading: 'Challenge — Print Fruit List',
      body: 'Create `fruits = ["apple", "banana", "cherry"]` and print each item on its own line.',
      exerciseCode: 'fruits = ["apple", "banana", "cherry"]\n# Loop and print each fruit\n',
      expectedOutput: 'apple\nbanana\ncherry',
      hint: 'for fruit in fruits: print(fruit)',
    },
  ],
  6: [
    {
      type: 'explain',
      heading: 'Conditionals and FizzBuzz',
      body: 'Use `if`, `elif`, and `else` to control program flow based on conditions. The `%` (modulo) operator returns the remainder.',
      exampleCode: 'x = 15\nif x % 15 == 0:\n    print("FizzBuzz")',
      exampleOutput: 'FizzBuzz',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Why Order Matters in Conditionals',
      body: 'Why must `x % 15 == 0` be checked before `x % 3 == 0`?',
      whyItHappened: 'Python checks `if` statements sequentially. Since 15 is divisible by both 3 and 5, checking `x % 3 == 0` first would trigger "Fizz" and skip "FizzBuzz"! Checking the most specific condition first prevents logic errors.',
      exerciseCode: 'for i in range(1, 6):\n    if i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n',
      exampleOutput: '1\n2\nFizz\n4\nBuzz',
      hint: 'Modulo `%` returns 0 when a number is evenly divisible.',
    },
    {
      type: 'check',
      heading: 'Challenge — FizzBuzz 1 to 20',
      body: 'Print numbers 1 to 20 replacing multiples of 3 with "Fizz", 5 with "Buzz", and both with "FizzBuzz".',
      exerciseCode: 'for i in range(1, 21):\n    pass\n',
      expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz',
      hint: 'Check i%15==0 first, then i%3==0, then i%5==0, else print i',
    },
  ],
  7: [
    {
      type: 'explain',
      heading: 'Functions and Return Values',
      body: 'Functions are reusable code blocks defined with `def`. Use `return` to send a value back from the function.',
      exampleCode: 'def square(n):\n    return n * n\n\nprint(square(4))',
      exampleOutput: '16',
    },
    {
      type: 'try',
      heading: 'Deep Dive — return vs print()',
      body: 'What is the difference between `return` and `print()` inside a function?',
      whyItHappened: '`print()` only displays output on the screen. `return` hands the result back to the caller so it can be stored in variables or passed into other math equations. Without `return`, a function returns `None`.',
      exerciseCode: 'def square(n):\n    return n ** 2\n\ndef cube(n):\n    return n ** 3\n\nprint(square(4))\nprint(cube(3))\n',
      exampleOutput: '16\n27',
      hint: 'Use `return n ** 2` for square and `return n ** 3` for cube.',
    },
    {
      type: 'check',
      heading: 'Challenge — Write square() and cube()',
      body: 'Define `square(n)` and `cube(n)`. Print `square(4)` and `cube(3)` on separate lines.',
      exerciseCode: 'def square(n):\n    pass\n\ndef cube(n):\n    pass\n\nprint(square(4))\nprint(cube(3))\n',
      expectedOutput: '16\n27',
      hint: 'square returns n*n; cube returns n*n*n',
    },
  ],
  8: [
    {
      type: 'explain',
      heading: 'While Loops and Counters',
      body: 'A `while` loop continuously executes as long as its boolean condition remains `True`.',
      exampleCode: 'i = 1\nwhile i <= 3:\n    print(i)\n    i += 1',
      exampleOutput: '1\n2\n3',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Loop Termination & Accumulators',
      body: 'Why is `i += 1` critical in a while loop?',
      whyItHappened: 'Without updating `i`, the condition `i <= 3` remains `True` forever, creating an **infinite loop** that freezes execution! Incrementing `i` on each turn eventually makes the condition `False`, cleanly terminating the loop.',
      exerciseCode: 'total = 0\ni = 1\nwhile i <= 5:\n    total += i\n    i += 1\nprint(total)\n',
      exampleOutput: '15',
      hint: 'total += i adds the current counter value to your running sum.',
    },
    {
      type: 'check',
      heading: 'Challenge — Sum 1 to 100',
      body: 'Use a `while` loop to sum all numbers from 1 to 100 and print the final total.',
      exerciseCode: 'total = 0\ni = 1\n# Use a while loop to compute sum\nprint(total)\n',
      expectedOutput: '5050',
      hint: 'while i <= 100: total += i; i += 1',
    },
  ],
  9: [
    {
      type: 'explain',
      heading: 'Dictionaries (Key-Value Maps)',
      body: 'A **dictionary** maps unique keys to values using `{key: value}` pairs. Access values using `dict[key]`.',
      exampleCode: 'person = {"name": "Ada", "age": 42}\nprint(person["name"])',
      exampleOutput: 'Ada',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Key Lookups in O(1) Time',
      body: 'Why are dictionaries so powerful? They use a **hash table** internally.',
      whyItHappened: 'Instead of searching through elements sequentially like a list, Python computes a hash value for `"name"` and immediately retrieves `"Ada"` in instant constant time O(1).',
      exerciseCode: 'person = {"name": "Ada", "age": 42}\nprint(f\'{person["name"]} is {person["age"]} years old.\')\n',
      exampleOutput: 'Ada is 42 years old.',
      hint: 'When using dictionary keys inside an f-string, use single quotes inside double-quoted f-strings.',
    },
    {
      type: 'check',
      heading: 'Challenge — Person Greeting',
      body: 'Create `person = {"name": "Ada", "age": 42}` and print: **Ada is 42 years old.**',
      exerciseCode: 'person = {"name": "Ada", "age": 42}\n# Print the sentence\n',
      expectedOutput: 'Ada is 42 years old.',
      hint: 'print(f\'{person["name"]} is {person["age"]} years old.\')',
    },
  ],
  10: [
    {
      type: 'explain',
      heading: 'Classes and Objects (OOP)',
      body: 'A **class** is a blueprint. An **object** is an instance created from that blueprint. The `__init__` method initializes attributes.',
      exampleCode: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"Woof! My name is {self.name}."',
      exampleOutput: 'Woof! My name is Rex.',
    },
    {
      type: 'try',
      heading: 'Deep Dive — Understanding `self`',
      body: 'What is `self` in Python classes?',
      whyItHappened: '`self` represents the specific instance of the class being created or called. When you run `rex.bark()`, Python automatically passes `rex` as the `self` argument so the method knows which object\'s data to use.',
      exerciseCode: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"Woof! My name is {self.name}."\n\nrex = Dog("Rex")\nprint(rex.bark())\n',
      exampleOutput: 'Woof! My name is Rex.',
      hint: 'Always include `self` as the first parameter of class methods.',
    },
    {
      type: 'check',
      heading: 'Challenge — Dog Class Bark',
      body: 'Write a `Dog` class with `__init__(self, name)` and a `bark()` method returning "Woof! My name is {name}." Print `Dog("Rex").bark()`.',
      exerciseCode: 'class Dog:\n    def __init__(self, name):\n        pass\n\n    def bark(self):\n        pass\n\nrex = Dog("Rex")\nprint(rex.bark())\n',
      expectedOutput: 'Woof! My name is Rex.',
      hint: 'self.name = name; return f"Woof! My name is {self.name}."',
    },
  ],
};


