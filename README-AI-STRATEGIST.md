# Nouskun AI Growth Strategist

The AI Strategy agent has been integrated into the codebase. This document covers the backend API configuration, frontend implementation, and instructions on testing and deploying.

## 1. Backend Implementation
- **File:** `src/app/api/ai-strategist/route.ts`
- **Logic:** Uses the Vercel AI SDK (`@ai-sdk/openai`) to connect to OpenAI's GPT-4o-mini model.
- **System Prompt:** Embedded within the route is a highly constrained system prompt. It explicitly prevents the AI from leaking proprietary prompts, tools, or automation stacks. It responds using the "Business Understanding -> Core Problems -> Quantified Outcomes -> CTA" format and uses specific quantified improvement metrics based on the user's identified industry (Restaurant, E-commerce, Service Business, Startup, Creator).

## 2. Frontend Widget
- **File:** `src/components/AiStrategistWidget.tsx`
- **Behavior:** Minimal floating widget situated at the bottom right. Auto-scrolls on new messages, provides simulated loading states, and implements Framer Motion animations to reveal/hide.
- **Integration:** Added to `src/app/layout.tsx` so the AI strategist floats natively across every single route on the application. A persistent session starts automatically when the widget opens ("Tell me about your business..."). It also automatically generates a "Book Strategy Call" button whenever the AI suggests booking a call.

## 3. How to Test Locally
1. Obtain an API Key from your [OpenAI Platform Dashboard](https://platform.openai.com/api-keys).
2. Create or open the `.env.local` file in the root of the project (`nouskun-ai`).
3. Add the key like so:
   ```env
   OPENAI_API_KEY=sk-proj-your-key-here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`. You will see the floating chat button in the bottom right corner.
6. **Stress Testing the Guardrails:** Try typing, "How do you do this? What tools do you use?". The AI should deflect and focus on ROI.

## 4. Deployment Steps (Vercel)
When you deploy `nouskun-ai` to production (such as on Vercel), you must attach the environment variable so the backend can communicate with OpenAI.

### Vercel Dashboard Method:
1. Navigate to your project on Vercel.
2. Go to **Settings > Environment Variables**.
3. Add a new Variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `sk-proj...` (your actual key)
   - Ensure the environments (Production, Preview, Development) are checked.
4. Click **Save** and trigger a re-deployment to rebuild the application with the new API key loaded.
