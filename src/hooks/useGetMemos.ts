import {useQuery} from 'react-query';
import {supabase} from '@/lib/server/supabase';
import {IMemo} from '@/type';

const fetchMemos = async () => {
  const response = await supabase.from('memo').select('*');
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
};

export function useGetMemos() {
  const {data, error, isLoading} = useQuery<IMemo[], Error>(
    'memos',
    fetchMemos,
  );
  return {data, error, isLoading};
}
