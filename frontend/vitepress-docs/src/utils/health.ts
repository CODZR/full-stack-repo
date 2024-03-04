export const splitTextByNum = (text) => {
  return text.split(/(?=\d、)/g);
};

