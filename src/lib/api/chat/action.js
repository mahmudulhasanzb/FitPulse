export const sendChatMessage = async (messages) => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || "Failed to get AI response");
    }

    return data;
  } catch (error) {
    console.error("Chat API fetch error:", error);
    throw error;
  }
};
