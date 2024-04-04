import {useState, useEffect} from 'react';
import {supabase} from '@/lib/server/supabase';
import {IMemo} from '@/type';

export function useGetMemos() {
  const [memos, setMemos] = useState<IMemo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMemos() {
      try {
        setLoading(true);
        const response = await supabase.from('memo').select('*');

        if (response.error) {
          throw response.error;
        }

        setMemos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemos();
  }, []);

  return {memos, loading};
}
