# NousKun AI — Design System

The visual language of [nouskunai.com](https://www.nouskunai.com): colours, type, logo use, graphic patterns and motion. Use this whenever you design or build anything for NousKun AI — website pages, decks, social posts or ads.

Source of truth in code: `src/app/globals.css` (tokens) and `src/components/motion/*` (patterns).

---

## 1. Brand at a glance

- **Personality:** confident, direct, technical without jargon. Dark, calm surfaces with one electric blue.
- **Voice:** short, punchy headlines that end in a full stop. *"Three things. Done properly."* · *"Built for production. Not for slide decks."*
- **Signature idea:** the logo's **nodes** (the two dots on the N) — connection, systems, data moving between points. It shows up as dot grids, orbiting nodes and travelling pulses.

---

## 2. Logo

| Asset | File | Use on |
|---|---|---|
| Wordmark (light) | `public/brand/nouskun-wordmark.svg` · `-3000.png` | Dark backgrounds (default) |
| Wordmark (dark) | `public/brand/nouskun-wordmark-dark.svg` · `-3000.png` | Light backgrounds |
| Icon (N mark) | `public/brand/nouskun-icon.svg` · `-512.png` · `-1024.png` | Favicon, avatars, small spaces |
| App icon | `public/brand/nouskun-app-icon-1024.png` | App stores, social profile pictures |
| Icon on white | `public/brand/nouskun-icon-on-white-1024.png` | Documents, light UIs |
| Everything | `public/brand/nouskun-brand-kit.zip` | Sharing with designers / press |

**Wordmark:** `NOUSKŪN` in white (or ink `#0B0B0C` on light) + `AI` in wordmark blue `#307FFE`. Aspect ratio ≈ **7.16 : 1** (5728 × 800).

**Icon:** an N drawn as three rounded strokes (`#4D8EFF`, stroke width 16 on a 100-unit grid) with two dark node dots (`#121212`) at the top-left and bottom-right joints.

**Rules**
- Clear space around the wordmark: at least the height of the "Ū" bar on every side.
- Minimum size: wordmark 96 px wide on screen; icon 16 px.
- Don't recolour, stretch, outline, add shadows to, or re-type the logo. Always use the files above.
- In body copy, write the name as **NousKun AI** (the macron "Ū" belongs to the logo only).

---

## 3. Colour

### Core palette

| Token | Hex | Role |
|---|---|---|
| `ink` | `#08090B` | Page background |
| `ink-2` | `#0E1013` | Raised background (menus, preloader, form fields) |
| `surface` | `#121418` | Cards and panels |
| `line` | `rgba(255,255,255,0.08)` | Borders and dividers |
| `paper` | `#F3F1EC` | Primary text on dark · light panel background |
| `muted` | `#8B8F98` | Secondary text, captions |
| `brand` | `#4D8EFF` | Primary blue — buttons, icon, key highlights |
| `brand-soft` | `#9CC0FF` | Accent words in headlines, links, icons on dark |
| `brand-deep` | `#2563EB` | Gradient end, hover states, blue on light backgrounds |

### Supporting

| Use | Value |
|---|---|
| Wordmark "AI" blue | `#307FFE` (logo artwork only) |
| Success / "live" / "on shift" | `emerald-400` `#34D399` |
| Error | `red-400` `#F87171` |
| Ink on light surfaces | `#0B0B0C` |

### How to use it

- **About 90% dark neutrals, 10% blue.** Blue is for things that matter: the main button, one accent phrase per headline, live indicators.
- Text on dark: `paper` for headings and key text, `muted` for supporting copy. Never pure white for long text.
- Borders are always the low-contrast `line` colour — cards are separated by tone, not heavy outlines.
- Glows use `brand` at **10–25% opacity** with a very large blur (100–140 px).
- **Panel themes** (the stacked service cards) rotate through three looks:
  1. Dark — `surface` background, `paper` text, `brand-soft` accents
  2. Light — `paper` background, `ink` text, `brand-deep` accents
  3. Blue — gradient `brand → brand-deep`, white text, white buttons

---

## 4. Typography

| Role | Typeface | Notes |
|---|---|---|
| Headings + body | **Bricolage Grotesque** (Google Fonts, variable: `opsz`, `wdth`) | Loaded via `next/font` as `--font-bricolage` |
| Labels, numbers, tags | **Geist Mono** (Google Fonts) | `--font-geist-mono` — step counters, timelines, codes like `NK-01` |

### Scale

| Style | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Display (hero H1) | `clamp(2.6rem, 6vw, 4.75rem)` | 500 | −0.045em | 0.95 |
| Panel title | `clamp(2.25rem, 5.5vw, 4.5rem)` | 600 | −0.045em | 0.95 |
| Section H2 | `clamp(2.25rem, 5vw, 4rem)` | 500 | −0.04em | 1.0 |
| Scroll statement | `clamp(1.75rem, 4.2vw, 3.5rem)` | 500 | −0.03em | 1.12 |
| Card title | 20–24 px | 500 | −0.02em | 1.2 |
| Body large | 18 px | 400 | 0 | 1.6 |
| Body | 15–16 px | 400 | 0 | 1.6 |
| Label / mono | 11–13 px | 400 | 0 | 1.4 |

### Headline pattern

Two parts: a statement in `paper`, then an **accent phrase** in `brand-soft` at weight 300 (`.serif` class — named for history, it's the same typeface).

> **Three things.** *Done properly.*
> **Built for production.** *Not for slide decks.*
> **Scope. Build.** *Run.*

Keep headlines to 2–6 words per part and end them with a full stop.

---

## 5. Shape, spacing and depth

| Element | Value |
|---|---|
| Buttons, pills, tags, nav | Fully rounded (`rounded-full`) |
| Cards | 24 px radius (`rounded-3xl`) |
| Stacked panels | 36 px top corners (grows to 48 px as it recedes) |
| Inputs | 12 px radius |
| Content width | 1152 px max (`max-w-6xl`), 20 px side padding on mobile, 32 px on desktop |
| Section spacing | 96 px mobile / 128 px desktop vertical padding |
| Shadows | Soft and dark: `0 30px 80px -20px rgba(0,0,0,.6)`; blue glow for primary buttons: `0 10px 40px -10px rgba(77,142,255,.8)` |
| Glass | `rgba(14,16,19,.6)` + 14 px backdrop blur + `line` border (nav bar) |

---

## 6. Graphics and patterns

| Pattern | What it looks like | Where | Code |
|---|---|---|---|
| **Dot field** | Grid of tiny dots (22–26 px apart) rippling in a slow wave; dots near the cursor swell and turn blue | Hero background | `motion/DotField.tsx` |
| **Animated N mark** | Logo in a frosted glass tile; strokes draw in, light runs through the letter, node dots send out ripples, tilts with the mouse | Hero centrepiece | `home/HeroMark.tsx` |
| **Orbiting nodes** | Dashed orbit rings with service chips (WhatsApp, CRM, AI agent…) circling the N, linked by beams carrying data pulses | Hero | `home/HeroMark.tsx`, `.nk-beam` |
| **Film grain** | 3.5% opacity noise over the whole page | Global | `.grain` in `globals.css` |
| **Fine grid** | 64 px line grid at 4% white, faded out with a radial mask | Page headers, footer | `.bg-grid` |
| **Brand glow** | Large blurred blue ellipse behind key content | Hero, headers, pricing, footer | `bg-brand/15 blur-[130px]` |
| **Faint wordmark** | Giant wordmark at 5% opacity behind the hero; full-width gradient wordmark in the footer | Hero, footer | `Hero.tsx`, `Footer.tsx` |
| **Stacked panels** | Full-screen service panels stick to the top; each new one slides over the last, which shrinks to 90% and dims | Services (home + /services) | `home/StackedServices.tsx` |
| **Spotlight cards** | Soft blue light and a glowing border follow the cursor | Story page cards | `motion/SpotlightCard.tsx` |
| **ID badges** | Agent cards styled like staff badges: lanyard slot, gradient avatar, code (`NK-01`), green "On shift · 24/7" | Digital team section | `home/Workforce.tsx` |
| **Tilt cards** | 3D tilt toward the cursor with an accent-coloured glow | Case studies | `CaseStudyCard.tsx` |
| **Marquee** | Endless strip of tool names separated by small blue dots, fading at both edges | Under the hero | `motion/Marquee.tsx` |
| **Live mini-visuals** | Chat that types itself, growth chart that draws itself, website mockup that assembles | Service panels | `home/Visuals.tsx` |
| **Conic border** | Slowly rotating blue gradient border on the recommended plan | Pricing | `Pricing.tsx` |

Icons: [Lucide](https://lucide.dev), 14–20 px, 1.5–2 px stroke, coloured `brand-soft` on dark.

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| Standard ease | `cubic-bezier(0.22, 1, 0.36, 1)` | Almost everything — reveals, hovers, menus |
| Dramatic ease | `cubic-bezier(0.76, 0, 0.24, 1)` | Preloader wipe |
| Drawing ease | `cubic-bezier(0.65, 0, 0.35, 1)` | Logo strokes, counters, progress bars |
| Reveal | 0.9 s, rise 24 px + un-blur 8 px | Content entering the screen |
| Word reveal | Words rise from a mask, 0.06 s apart | Headlines |
| Hover | 0.3 s | Buttons, cards |
| Springs | stiffness 400 / damping 32 | Sliding tab highlights, nav hover pill |

**Signature sequences**
1. **Preloader** (first visit per session): N draws stroke by stroke → node dots pop → wordmark wipes in → counter 000→100 → screen wipes upward.
2. **Hero entrance** waits for the preloader, then headline words rise, the N draws in and the orbit nodes spring into place.
3. **Scroll-lit statement:** each word brightens from 15% to 100% as you scroll.
4. **Stacked services:** panels slide up and stack (see §6).

**Rules**
- Motion should explain or reward — never block reading. Content is always in the HTML.
- Everything respects the visitor's "reduce motion" setting: the preloader is skipped and animations are minimised.
- Long-running animations pause when off-screen.

---

## 8. Components

- **Primary button:** `brand` fill, white text, fully rounded, blue glow, light-sweep on hover, arrow nudges right.
- **Secondary button:** transparent with `line` border and glass blur; `paper` text.
- **Nav:** floating glass pill; wordmark left, links centre, "Book a call" (paper fill, ink text) right. Hides on scroll down, returns on scroll up.
- **Chips / tags:** fully rounded, `line` border, `muted` text; timeline chips use Geist Mono with a blue tint.
- **Form fields:** `ink` fill, `line` border, floating labels that shrink to small caps, blue focus border.
- **Eyebrow label:** short blue rule + small `muted` text above section titles (e.g. "— How we work").

---

## 9. Quick checklist

- [ ] Dark background, one blue accent per view
- [ ] Bricolage Grotesque for text, Geist Mono for labels and numbers
- [ ] Headline = statement + lighter blue accent phrase, ending in a full stop
- [ ] Rounded everything; borders at 8% white
- [ ] Logo from `public/brand/`, never retyped
- [ ] Motion uses the standard ease and respects reduced motion
