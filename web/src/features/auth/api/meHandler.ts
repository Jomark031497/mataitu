const meHandler = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data));

  return data;
};

export default meHandler;
