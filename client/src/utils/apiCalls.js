export const appPostRequest = async (url, payload) => {
  const token = localStorage.getItem("tkn");
  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers = { ...headers, authorization: `Bearer ${token}` };
  }

  const obj = {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, obj);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData);
  }

  return responseData;
};
