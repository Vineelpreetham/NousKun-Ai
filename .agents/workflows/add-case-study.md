---
description: Add a new case study to NousKūn AI after a client project is deployed
---

# Add Case Study After Client Deployment

> **STANDING RULE FOR THE AI AGENT:**
> After completing or deploying ANY project — whether it's under NousKūn AI, Lenscraft by AV, or any other client project — always ask the user:
>
> _"This project looks ready to ship! Would you like me to add a case study for this to your NousKūn AI website? It only takes a few minutes and keeps your proof of work current."_
>
> Do this proactively, without being asked. Do NOT skip this step just because the project is not in the nouskun-ai directory.

Run this workflow every time a client project is successfully completed or deployed. This keeps the NousKūn website's proof of work automatically up to date, regardless of which project the work was done in.

## Step 1: Collect Project Details

Before making any changes, gather the following information (ask the user if not provided):

- **Client name / alias** (use a pseudonym if the client wants privacy, e.g. "Nexora Legal")
- **Industry** (E-Commerce, SaaS, Restaurant, Real Estate, Legal Tech, etc.)
- **Service delivered** — one of: `ai` (AI & Automation), `web` (Intelligent Web), `saas` (SaaS using AI)
- **Duration** (how long the project took, e.g. "3 weeks")
- **The core challenge** (2-4 sentences: what problem did the client have before?)
- **What was built** (2-4 sentences: what system did NousKūn deliver?)
- **4 solution bullet points** (specific technical/strategic things that were done)
- **4 result metrics** — each with:
  - `metric`: the headline number (e.g. "41%", "3x", "₹2.4L", "0 hrs")
  - `value`: what it measures (e.g. "Revenue Recovery", "Leads Generated")
  - `description`: one short sentence explaining the result
- **Tags** (3-5 words/phrases relevant to what was built, e.g. "WhatsApp Automation", "Next.js", "GPT-4o")

## Step 2: Generate a Slug

Create a URL-friendly slug from the client alias + project type. Examples:
- `krave-ecommerce-ai-automation`
- `nexora-saas-mvp-build`
- `elara-restaurant-intelligence`

Rules: lowercase, hyphens only, no special characters, max 5 words.

## Step 3: Choose Visual Identity

Pick a `coverGradient` and `accentColor` that fits the industry:

| Industry | Suggested Gradient | Suggested Accent |
|---|---|---|
| E-Commerce / Retail | `from-orange-600/20 via-red-900/10 to-transparent` | `#f97316` |
| Legal / Finance | `from-violet-600/20 via-purple-900/10 to-transparent` | `#7c3aed` |
| Restaurant / F&B | `from-emerald-600/20 via-teal-900/10 to-transparent` | `#10b981` |
| SaaS / Tech | `from-blue-600/20 via-cyan-900/10 to-transparent` | `#06b6d4` |
| Real Estate | `from-amber-600/20 via-yellow-900/10 to-transparent` | `#f59e0b` |
| Healthcare | `from-rose-600/20 via-pink-900/10 to-transparent` | `#e11d48` |
| Education | `from-indigo-600/20 via-blue-900/10 to-transparent` | `#6366f1` |
| Creator / Brand | `from-fuchsia-600/20 via-purple-900/10 to-transparent` | `#a855f7` |

## Step 4: Add Entry to Case Studies Data File

Open `/Users/vineelpreetham/Documents/nouskun-ai/src/lib/case-studies.ts` and append a new entry to the `caseStudies` array. Follow this exact TypeScript structure:

```typescript
{
    slug: 'your-slug-here',
    title: 'Your Compelling Result-Focused Title',
    tagline: 'Short description of what was delivered for whom',
    industry: 'Industry Name',
    service: 'ai', // or 'web' or 'saas'
    serviceLabel: 'AI & Automation', // or 'Intelligent Web' or 'SaaS using AI'
    client: 'Client Name (Type)',
    duration: 'X weeks',
    challenge: 'Paragraph describing the problem they had before NousKūn.',
    solution: 'Paragraph describing what the NousKūn system does.',
    solutionPoints: [
        'Specific technical thing done 1',
        'Specific technical thing done 2',
        'Specific technical thing done 3',
        'Specific technical thing done 4',
    ],
    results: [
        { metric: 'XX%', value: 'Result Label', description: 'One sentence explaining this' },
        { metric: 'XXx', value: 'Result Label', description: 'One sentence explaining this' },
        { metric: '₹X.XL', value: 'Result Label', description: 'One sentence explaining this' },
        { metric: '0 hrs', value: 'Result Label', description: 'One sentence explaining this' },
    ],
    tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'],
    coverGradient: 'from-[color]-600/20 via-[color]-900/10 to-transparent',
    accentColor: '#hexcolor',
},
```

## Step 5: Verify the New Case Study Appears

1. Ensure `npm run dev` is running in `/Users/vineelpreetham/Documents/nouskun-ai`
2. Open `http://localhost:3000/case-studies` — new card should appear
3. Click the card — detail page at `/case-studies/[slug]` should load with all content
4. Test the filter tabs — make sure the new entry appears under the correct service category

## Step 6: Review for Website Tailoring Opportunities

After adding the case study, check if the new project opens up any of these tailoring opportunities:

- **New industry unlocked** (e.g. first healthcare client): Consider adding that industry to the `businessType` dropdown in `WhatsAppForm.tsx` and to the chatbot's `INDUSTRY CONDITIONAL LOGIC` in the API route
- **New service type or technology used**: Add it as a tag in `ServicesContent.tsx` if relevant
- **Exceptional results**: If the metrics are especially strong (e.g. 80%+ improvement), consider featuring the headline metric in the `Hero.tsx` or `ValueProposition.tsx` sections as social proof
- **New pricing tier justified**: If a large enterprise project was delivered, check if it validates a new pricing tier in `Pricing.tsx`

## Step 7: Update the Chatbot System Prompt (if new industry)

If the new project was in an industry not already covered in the chatbot, open:
`/Users/vineelpreetham/Documents/nouskun-ai/src/app/api/ai-strategist/route.ts`

Add a new line to the `INDUSTRY CONDITIONAL LOGIC` section:
```
- [New Industry]: [2-3 specific pain points and outcomes to mention]
```
