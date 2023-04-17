export const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validateUsername = (username: string) => {
  return /^[a-z0-9]+$/i.test(username);
};

export const validateImageURL = (url: string) => {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
};
