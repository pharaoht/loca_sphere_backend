const OpenAI = require('openai');
const checkAvailabilitySkill = require('./skills/agent.skills');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function runAgent({ message }) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
            You are an assistant for a rental booking app.
            Only help with checking availability.
            If you do not know listingId and dates, ask for them.
        `
      },
      { role: "user", content: message }
    ]
  })
}