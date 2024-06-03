import isValidUrl from '@/utils/isValidUrl';

const getHTML = async (url: string) => {
  if (!isValidUrl(url)) return;
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
export default getHTML;
