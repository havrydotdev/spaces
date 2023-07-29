export const registerUser = async (user: {
  username: string;
  password: string;
  name: string;
}): Promise<Response> => {
  const res = await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return res;
};
