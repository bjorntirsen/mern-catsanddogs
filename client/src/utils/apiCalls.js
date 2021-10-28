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

export const fetchProducts = async (url) => {
  const token = localStorage.getItem("tkn");
  const obj = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, obj);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const responseData = await response.json();

  return responseData;
};
