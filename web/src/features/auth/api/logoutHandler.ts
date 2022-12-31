const logoutHandler = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(data), { cause: data });

  return data;
};

export default logoutHandler;
