export const stats = [
  { label: "Total Messages", value: "1,248", delta: "+12%", sub: "vs last month" },
  { label: "AI Success Rate", value: "96.2%", delta: "+1.4%", sub: "from baseline" },
  { label: "Unique Users", value: "87", delta: "+9", sub: "this month" },
  { label: "Avg Response", value: "1.4s", delta: "-0.3s", sub: "Groq optimised" },
];

// Fallback data — jab n8n na chale tab kaam aayega
export const fallbackConversations = [
  {
    id: 1, name: "Rahul Kumar", initials: "RK",
    phone: "+91 98765 43210",
    msg: "What are your business hours?",
    reply: "We're open Mon–Sat, 9 AM to 7 PM IST.",
    status: "sent", time: "2m ago", topic: "business hours"
  },
];