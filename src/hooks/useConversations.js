import { useState, useEffect } from "react";
import { fallbackConversations } from "../data/dummy";

const N8N_URL = import.meta.env.VITE_N8N_URL;

function getInitials(name = "") {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function mapRow(row, i) {
  return {
    id:       row.id       || (999 - i),
    name:     row.name     || "Unknown",
    initials: getInitials(row.name),
    phone:    row.phone    || "—",
    msg:      row.message  || "—",
    reply:    row.ai_reply || "—",
    status:   row.status   || "sent",
    time:     row.timestamp|| "—",
    topic:    row.topic    || "general",
  };
}

export function useConversations() {
  const [data, setData]       = useState(fallbackConversations);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(N8N_URL);
      if (!res.ok) throw new Error("n8n ne error diya");
      const json = await res.json();
      const rows = Array.isArray(json) ? json : json.data || [];
      setData(rows.map(mapRow));
      setError(null);
    } catch (err) {
      console.warn("n8n offline, using fallback data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // Har 30 second mein auto-refresh
    const timer = setInterval(fetchData, 30000);
    return () => clearInterval(timer);
  }, []);

  return { data, loading, error, refetch: fetchData };
}