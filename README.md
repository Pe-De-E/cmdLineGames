# cmdGame

Eine Sammlung kleiner Spiele und Tools für die Kommandozeile, geschrieben in TypeScript.

## Voraussetzungen

- Node.js
- npm

## Installation

```bash
npm install
```

## Spiele & Tools

### Rock Paper Scissors

```bash
npm run rps -- <rock|paper|scissors>
```

**Beispiel:**
```bash
npm run rps -- rock
# You chose rock. Computer chose scissors. You win!
```

---

### Pig Latin Translator

```bash
npm run piglatin -- "Dein Satz hier"
```

**Beispiel:**
```bash
npm run piglatin -- "Hello World"
# Ellohay Orldway
```

---

### Caesar Cipher

```bash
npm run caesar -- "Dein Text" <Verschiebung>
```

**Beispiel:**
```bash
npm run caesar -- "hello world" 3
# khoor zruog
```

## Build

TypeScript nach JavaScript kompilieren (Output: `dist/`):

```bash
npm run build
```
