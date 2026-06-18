# Smart School Website — Cursor Development Brief
## Full context for continuing this build consistently

---

## 1. PROJECT OVERVIEW

**What this is:**
Smart School is a government robotics education programme website for Nigerian primary and junior secondary school students (ages 8–14). It serves as both a public-facing programme introduction and a student resource hub — each session has a dedicated revision page with content, interactive quizzes, and navigation.

**Built by:** Emmanuel (Axora Labs) — Mechatronics Engineering student, FUTA
**Powered by:** Axora Labs — a student-led engineering organisation

**Live target:** GitHub Pages (static HTML — no frameworks, no build tools, no npm)

---

## 2. WHAT'S ALREADY BUILT

The following files exist and are complete. Do NOT redesign or restructure them — only extend:

```
smartschool/
  index.html          ✅ Landing page (complete)
  about.html          ✅ About the programme (complete)
  resources.html      ✅ Tools, cheat sheets, references (complete)
  glossary.html       ✅ A–W glossary with live search (complete)
  session1.html       ✅ Session 1 revision page (complete)
  css/
    styles.css        ✅ Full shared design system (complete)
  js/
    main.js           ✅ Shared JS — nav, quiz, circuit trace, scroll reveal (complete)
```

**Current session page status:**
```
  session2.html       ✅ Session 2 — Outputs & Actuators
  session3.html       ✅ Session 3 — Sensors & Inputs (coming soon shell)
  session4.html       ✅ Session 4 — Combining Inputs & Outputs (coming soon shell)
  session5.html       ✅ Session 5 — Project Day (coming soon shell)
```

---

## 3. DESIGN SYSTEM — READ THIS CAREFULLY

All design tokens are defined in `css/styles.css`. Never hardcode colours, fonts, or spacing. Always use CSS variables.

### Colour Tokens
```css
--ink:        #0D1117   /* deep black-blue — dark backgrounds, dark text */
--ink2:       #1C2333   /* slightly lighter dark */
--ink3:       #2D3748   /* body text on light bg */
--surface:    #F5F0E8   /* warm cream — section backgrounds */
--surface2:   #FDFCFA   /* near-white — page background */
--surface3:   #EDE8DF   /* slightly darker cream — hover states */
--teal:       #00C49A   /* primary accent — the signature colour */
--teal-dark:  #009E7C   /* teal hover/active state */
--teal-glow:  rgba(0, 196, 154, 0.15)
--copper:     #D4845A   /* warm secondary accent — session numbers, highlights */
--copper-lt:  #FDF0E8   /* copper light background */
--yellow:     #F5C842   /* tertiary accent — warnings, highlights */
--yellow-lt:  #FFFBEB
--muted:      #6B7A8D   /* secondary text */
--muted-lt:   #A0ADB8   /* placeholder text */
--white:      #FDFCFA   /* off-white */
--border:     rgba(0,0,0,0.08)
--border-dark:rgba(255,255,255,0.08)
```

### Typography
```css
--font-display: 'Space Grotesk', sans-serif  /* headings, labels, UI text */
--font-body:    'Inter', sans-serif           /* body copy, paragraphs */
--font-mono:    'Fira Code', monospace        /* code blocks */
```

Google Fonts import is already in `styles.css`. Do not add another import.

### Spacing & Shape
```css
--radius-sm:  8px
--radius:     14px
--radius-lg:  20px
--radius-xl:  28px
--max-w:      900px    /* max content width on all pages */
--nav-h:      64px     /* fixed nav height */
```

### Design Personality
- **Light pages** with a warm cream/white background — not stark white, not grey
- **Dark hero banners** on every page (ink background, teal accent)
- **Copper** is the accent for interactive/numbered elements (session badges, quiz numbers)
- **Teal** is for links, active states, highlights, and the circuit trace
- The overall feeling: clean, engineered, warm — like a well-made textbook, not a generic SaaS product

---

## 4. PAGE ANATOMY — EVERY PAGE FOLLOWS THIS STRUCTURE

```html
<body>
  <!-- 1. Nav placeholder (injected by JS) -->
  <div id="nav-placeholder"></div>
  <div class="nav-mobile" id="mobile-nav-placeholder"></div>

  <!-- 2. Page body wrapper -->
  <div class="page-body">

    <!-- 3. Dark banner (page-specific) -->
    <div class="page-banner"> ... </div>

    <!-- 4. Circuit trace (signature element) -->
    <div class="circuit-trace">
      <div class="circuit-trace-line"></div>
      <div class="circuit-trace-dot trace-dot-marker"></div>
      <!-- one dot per major section -->
    </div>

    <!-- 5. Page content -->
    ...

  </div>

  <!-- 6. Footer placeholder (injected by JS) -->
  <div id="footer-placeholder"></div>

  <!-- 7. Script -->
  <script src="js/main.js"></script>
  <script>
    document.getElementById('nav-placeholder').outerHTML = renderNav('dark');
    document.getElementById('footer-placeholder').outerHTML = renderFooter();
  </script>
</body>
```

**Nav theme:**
- `renderNav('dark')` — for pages with a dark hero (all current pages use this)
- `renderNav('light')` — for any future light-background pages

**Never** hardcode the nav or footer HTML directly in a page. They are always injected via `renderNav()` and `renderFooter()` from `main.js`.

---

## 5. SESSION PAGE ANATOMY — SPECIFIC PATTERN

Session pages (session1.html through session5.html) follow a stricter pattern:

```html
<!-- Banner with session number, title, status, tags -->
<div class="session-banner">
  <div class="session-banner-inner">
    <div class="session-breadcrumb"> Home / Session N </div>
    <div class="session-banner-meta">
      <span class="session-num-tag">Session 0N</span>
      <span class="session-status-tag">...</span>
    </div>
    <h1>Session Title</h1>
    <p>One-line description</p>
    <div class="session-banner-tags"> <!-- .tag elements --> </div>
  </div>
</div>

<!-- Progress bar — fill % = (session number / 5) * 100 -->
<div class="session-progress">
  <div class="session-progress-fill" style="width:N%"></div>
</div>
<div class="session-progress-label">
  <span>Session N of 5</span>
  <span>N% through the programme</span>
</div>

<!-- Circuit trace -->
...

<!-- Content -->
<div class="session-content">
  <!-- Concept sections with .concept-section -->
  <!-- Code blocks with .code-block -->
  <!-- Quiz section with .quiz-section -->
  <!-- Remember strip with .remember-strip -->
  <!-- Prev/Next nav with .session-nav -->
</div>
```

**Progress bar widths:**
- Session 1: 20%
- Session 2: 40%
- Session 3: 60%
- Session 4: 80%
- Session 5: 100%

---

## 6. SHARED CSS CLASSES — USE THESE, DON'T REINVENT

### Layout
```css
.section          /* max-width 900px, centered, 80px vertical padding */
.section.wide     /* max-width 1100px */
.section.tight    /* 48px vertical padding */
.page-body        /* padding-top: 64px (nav height) */
```

### Typography
```css
.eyebrow          /* small uppercase label above headings */
.display-title    /* large hero heading */
.section-title    /* section heading */
.section-sub      /* section subtitle/description */
```

### Components
```css
.card             /* white card with border, shadow, hover lift */
.btn              /* base button */
.btn-primary      /* teal filled button */
.btn-secondary    /* outlined button */
.btn-copper       /* copper filled button */
.btn-sm           /* smaller button variant */
.tag              /* small inline tag/badge */
.tag-digital      /* blue — for digital pin tags */
.tag-analog       /* purple — for analog/PWM tags */
.tag-output       /* copper — for output component tags */
.tag-input        /* blue — for input/sensor tags */
.session-pill     /* session status badge */
.pill-live        /* green — completed */
.pill-coming      /* grey — coming soon */
```

### Code Blocks
Always use this exact structure:
```html
<div class="code-block">
  <div class="code-bar">
    <div class="code-dots"><span></span><span></span><span></span></div>
    <span class="code-filename">filename.ino</span>
  </div>
  <pre> ... </pre>
</div>
```

Syntax highlighting classes for `<span>` inside `<pre>`:
```css
.ck   /* keyword — blue:   void, int, float, bool, #include */
.cf   /* function — yellow: setup, loop, digitalWrite, tone */
.cv   /* variable — light blue: ledPin, myServo, delayTime */
.cn   /* number — green:   1000, 255, 90 */
.cc   /* comment — grey+italic: // comment text */
.cs   /* string/value — orange: HIGH, LOW, OUTPUT, INPUT */
```

### Quiz
```html
<div class="quiz-item" data-correct="B">
  <div class="quiz-q">
    <span class="q-num">1</span> Question text here
  </div>
  <div class="quiz-options">
    <div class="quiz-option" data-value="A"><span class="opt-letter">A</span> Option A</div>
    <div class="quiz-option" data-value="B"><span class="opt-letter">B</span> Option B</div>
    <div class="quiz-option" data-value="C"><span class="opt-letter">C</span> Option C</div>
  </div>
  <button class="quiz-reveal-btn">Show answer</button>
  <div class="quiz-answer">✓ B — Explanation of why B is correct.</div>
</div>
```

The quiz JS logic in `main.js` handles everything automatically — clicking an option marks correct/wrong, reveal button shows the answer. Just use the correct data attributes.

### Scroll Reveal
Add `.reveal` to any element you want to animate in on scroll. Add `.reveal-delay-1`, `.reveal-delay-2`, `.reveal-delay-3` for staggered reveals in a group.

### Circuit Trace
The animated teal line on the left edge. Add `.trace-dot-marker` class to major section wrappers — the JS uses these to light up dots as the user scrolls.

### Prev/Next Navigation
```html
<div class="session-nav">
  <a href="sessionN.html" class="session-nav-card prev">
    <div class="nav-card-dir"><span class="arrow">←</span> Previous</div>
    <div class="nav-card-title">Session N — Title</div>
    <div class="nav-card-sub">Short description</div>
  </a>
  <a href="sessionN.html" class="session-nav-card next">
    <div class="nav-card-dir">Next <span class="arrow">→</span></div>
    <div class="nav-card-title">Session N — Title</div>
    <div class="nav-card-sub">Short description</div>
  </a>
</div>
```
Add `.locked` class to either card if that session doesn't exist yet — it disables pointer events and reduces opacity.

---

## 7. SESSION 2 — CONTENT SPEC

**File:** `session2.html`
**Title:** Outputs & Actuators
**Status:** Completed
**Progress bar:** 40%
**Tags:** Digital, Analog/PWM, Output

**Breadcrumb:** Home / Session 2
**Prev:** Session 1 — Introduction to Arduino
**Next:** Session 3 — Sensors & Inputs (locked — coming soon)

### Sections to build (in order):

**Section 1 — What is an Actuator?**
- Define actuator: any device that converts electricity into something physical
- Real-world examples: phone screen (light), speaker (sound), car engine (movement), phone vibration (movement)

**Section 2 — Digital vs Analog Output**
- Show the two number lines (reuse the same numlines/numline-card pattern from session1.html)
- Digital: 0 or 1 only — like a light switch
- Analog (PWM): 0 to 255 — like a dimmer switch
- analogWrite() only works on PWM pins marked with ~ : 3, 5, 6, 9, 10, 11

**Section 3 — The 8 Actuators in the Kit**
Show a grid of actuator cards. For each, show: name, emoji, digital/analog/PWM tags, one-sentence description, pin info.

| # | Name | Emoji | Type | Notes |
|---|------|-------|------|-------|
| 1 | External LED | 💡 | Digital / PWM | Needs 220Ω resistor |
| 2 | RGB LED | 🌈 | PWM ×3 | 3 PWM pins + GND, 3 resistors |
| 3 | Buzzer (Piezo) | 🔔 | Digital | No resistor needed |
| 4 | Servo Motor SG90 | ⚙️ | PWM | 3 wires: brown GND, red 5V, orange Signal |
| 5 | DC Motor | 🔄 | Analog speed | Needs L298N driver — Session 4/5 focus |
| 6 | LCD Screen 16×2 | 📺 | Digital | LiquidCrystal library, 6 pins |
| 7 | Relay Module | ⚡ | Digital | High voltage — handle carefully |
| 8 | Stepper Motor | 🌀 | Precise steps | ULN2003 driver |

**Section 4 — External LED (hands-on)**
Wiring table:
- Long leg (+) → Pin 7 via 220Ω resistor
- Short leg (–) → GND direct

Code:
```cpp
int ledPin = 7;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);  // LED ON
  delay(500);
  digitalWrite(ledPin, LOW);   // LED OFF
  delay(500);
}
```

**Section 5 — Buzzer**
Wiring table:
- + → Pin 8 direct
- – → GND direct

New functions to explain:
- `tone(pin, frequency)` — plays a sound
- `noTone(pin)` — stops the sound
- Frequency 262 = Middle C, 440 = A4, 1000 = high beep

Code:
```cpp
int buzzerPin = 8;

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  tone(buzzerPin, 1000);
  delay(500);
  noTone(buzzerPin);
  delay(500);
}
```

**Section 6 — Servo Motor**
Wiring table:
- Red → 5V
- Brown/Black → GND
- Orange/Yellow → Pin 9

Explain `#include` before showing code — "borrowing a toolkit someone else built."

Code:
```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  myServo.write(0);
  delay(1000);
  myServo.write(90);
  delay(1000);
  myServo.write(180);
  delay(1000);
}
```

**Section 7 — RGB LED**
Wiring table:
- Red leg → Pin 9 via 220Ω
- GND leg (longest) → GND direct
- Green leg → Pin 10 via 220Ω
- Blue leg → Pin 11 via 220Ω

Code (cycling through Red, Green, Yellow, Blue):
```cpp
int redPin   = 9;
int greenPin = 10;
int bluePin  = 11;

void setup() {
  pinMode(redPin,   OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin,  OUTPUT);
}

void loop() {
  // RED
  analogWrite(redPin, 255); analogWrite(greenPin, 0);   analogWrite(bluePin, 0);
  delay(1000);
  // GREEN
  analogWrite(redPin, 0);   analogWrite(greenPin, 255); analogWrite(bluePin, 0);
  delay(1000);
  // YELLOW
  analogWrite(redPin, 255); analogWrite(greenPin, 200); analogWrite(bluePin, 0);
  delay(1000);
  // BLUE
  analogWrite(redPin, 0);   analogWrite(greenPin, 0);   analogWrite(bluePin, 255);
  delay(1000);
}
```

**Quiz — minimum 8 questions covering:**
1. What is an actuator?
2. Which function controls analog output? (analogWrite)
3. What values does analogWrite accept? (0 to 255)
4. Which pins support PWM on the Uno? (3,5,6,9,10,11 — marked with ~)
5. What does tone() do?
6. What does #include do?
7. How do you tell a servo to go to 90 degrees? (myServo.write(90))
8. What three colours does an RGB LED contain?
9. Is a buzzer digital or analog?
10. What does noTone() do?

**Remember strip — 5 items:**
1. Actuators are output devices that do something physical
2. Digital = 2 values (0/1). Analog = 256 values (0–255)
3. analogWrite() only works on PWM pins (marked ~)
4. #include borrows a library — extra tools someone already built
5. tone(pin, frequency) makes sound. noTone(pin) stops it.

---

## 8. SESSIONS 3, 4, 5 — COMING SOON SHELLS

These pages don't have content yet. Build them as "coming soon" placeholder pages that:
- Follow the exact same page anatomy as session1/2
- Show the dark banner with session title and "Coming Soon" status tag
- Show the progress bar at the correct percentage (60%, 80%, 100%)
- Show a "This session hasn't happened yet" message in the content area
- Include a callout pointing back to the current latest session
- Include functional prev/next navigation (with appropriate locked states)
- Include the shared nav and footer

**Session 3:**
- Title: Sensors & Inputs
- Description: Ultrasonic sensor, IR sensor, buttons — reading the world and reacting to it.
- Tags: Input, Sensor, Digital
- Prev: Session 2 (active) | Next: Session 4 (locked)

**Session 4:**
- Title: Combining Inputs & Outputs
- Description: When a sensor triggers an actuator — building real reactive systems.
- Tags: Logic, if/else, Motors
- Prev: Session 3 (locked) | Next: Session 5 (locked)

**Session 5:**
- Title: Project Day 🤖
- Description: Design it. Build it. Demo it. The Elegoo Smart Car is yours to command.
- Tags: Final Project, Robot, Demo
- Prev: Session 4 (locked) | Next: none

---

## 9. WIRING TABLE PATTERN

Use this HTML structure for all wiring tables inside session pages:

```html
<div class="wire-table-wrap">
  <table class="wire-table">
    <thead>
      <tr>
        <th>Component Pin</th>
        <th>Connect To</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Long leg (+)</td>
        <td><code>Pin 7</code></td>
        <td>220Ω resistor in series</td>
      </tr>
    </tbody>
  </table>
</div>
```

Add this CSS to session2.html's `<style>` block (not to styles.css):

```css
.wire-table-wrap {
  overflow-x: auto;
  margin: 16px 0;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.wire-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.wire-table th {
  background: var(--surface);
  padding: 10px 16px;
  text-align: left;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}
.wire-table td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--ink3);
  font-size: 14px;
}
.wire-table tr:last-child td { border-bottom: none; }
.wire-table code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: rgba(0,196,154,0.08);
  color: var(--teal-dark);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}
```

---

## 10. ACTUATOR CARD PATTERN (for Section 3 of Session 2)

```html
<div class="actuator-grid">
  <div class="actuator-card">
    <div class="ac-emoji">💡</div>
    <div class="ac-body">
      <div class="ac-name">LED (External)</div>
      <div class="ac-tags">
        <span class="tag tag-output">Output</span>
        <span class="tag tag-digital">Digital</span>
        <span class="tag tag-analog">PWM</span>
      </div>
      <p class="ac-desc">Converts electricity into light. Can be ON/OFF (digital) or dimmed using analogWrite (PWM). Always needs a 220Ω resistor.</p>
      <p class="ac-pin">Pins: any digital pin (2–13) · Needs 220Ω resistor</p>
    </div>
  </div>
  <!-- repeat for each actuator -->
</div>
```

Add this CSS to session2.html's `<style>` block:

```css
.actuator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
  margin: 20px 0;
}
.actuator-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  gap: 14px;
  transition: border-color .2s, transform .2s;
}
.actuator-card:hover { border-color: rgba(0,196,154,0.3); transform: translateY(-2px); }
.ac-emoji { font-size: 28px; flex-shrink: 0; }
.ac-body { flex: 1; }
.ac-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
.ac-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
.ac-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 6px; }
.ac-pin { font-size: 12px; color: var(--muted-lt); font-style: italic; }
```

---

## 11. RULES FOR CURSOR — DO NOT BREAK THESE

1. **No frameworks.** No React, Vue, Tailwind, Bootstrap. Pure HTML, CSS, JS only.
2. **No external CSS beyond Google Fonts.** All styles go in `styles.css` or a page-level `<style>` block.
3. **No hardcoded nav or footer.** Always inject via `renderNav()` and `renderFooter()` from `main.js`.
4. **Always use CSS variables** from `:root` in `styles.css`. Never hardcode `#00C49A` — write `var(--teal)`.
5. **Always link** `css/styles.css` and `js/main.js` in every page.
6. **Add `.reveal` class** to major sections for scroll animation.
7. **Add `.trace-dot-marker` class** to section wrappers for circuit trace dots.
8. **Keep dark banners** on every page — the transition from dark hero to light content is intentional.
9. **Session pages use page-level `<style>` blocks** for page-specific CSS, not a new file.
10. **Keep the file structure flat** — all HTML files in the root `smartschool/` folder. No subfolders for pages.
11. **Quiz items must have** `data-correct="X"` on `.quiz-item` and `data-value="X"` on each `.quiz-option`. The JS handles the rest.
12. **Images are not used** anywhere in this project — all visuals are SVG, emoji, or CSS. Don't add `<img>` tags.

---

## 12. GITHUB PAGES DEPLOYMENT

When all pages are ready:

1. Create a new GitHub repo named `smartschool` (or `smart-school`)
2. Push all files — the root of the repo should contain `index.html`, all other `.html` files, `css/`, and `js/`
3. Go to repo Settings → Pages → Source: Deploy from branch → Branch: `main` → Folder: `/ (root)`
4. Site will be live at `https://yourusername.github.io/smartschool/`

No build step. No configuration. It just works.

---

## 13. QUICK REFERENCE — SESSION DETAILS

| Session | File | Title | Status | Progress | Prev | Next |
|---------|------|-------|--------|----------|------|------|
| 1 | session1.html | Introduction to Arduino | Completed | 20% | none (locked) | Session 2 |
| 2 | session2.html | Outputs & Actuators | Completed | 40% | Session 1 | Session 3 (locked) |
| 3 | session3.html | Sensors & Inputs | Coming Soon | 60% | Session 2 | Session 4 (locked) |
| 4 | session4.html | Combining Inputs & Outputs | Coming Soon | 80% | Session 3 (locked) | Session 5 (locked) |
| 5 | session5.html | Project Day | Coming Soon | 100% | Session 4 (locked) | none |

---

*This brief was written by Claude (Anthropic) as a handoff document for Cursor to continue the Smart School website build. All design decisions, component patterns, and content specs described here match what has already been built. Follow this document exactly to maintain consistency.*
