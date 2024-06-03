import {useQuery} from 'react-query';
import {supabase} from '@/lib/server/supabase';
import {IBookmark} from '@/type';

const fetchBookmarks = async () => {
  const response = await supabase.from('bookmark').select('*');
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
};

export function useGetBookmarks() {
  const {data, error, isLoading} = useQuery<IBookmark[], Error>(
    'bookmarks',
    fetchBookmarks,
  );
  return {data, error, isLoading};
}
