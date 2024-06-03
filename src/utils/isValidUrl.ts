const isValidUrl = (url: string) => {
  const pattern = new RegExp('^(http://|https://)');
  return pattern.test(url);
};

export default isValidUrl;
