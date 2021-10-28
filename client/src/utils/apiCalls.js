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

export const appFetchCall = async (url) => {
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

export const appUpdateCall = async (url, body) => {
  const token = localStorage.getItem("tkn");
  const payload = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, payload);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData);
  }
  return responseData;
};

export const appDeleteCall = async (url) => {
  const token = localStorage.getItem("tkn");
  const obj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, obj);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
};
