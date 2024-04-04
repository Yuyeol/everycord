import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';

import {createClient, SupabaseClient} from '@supabase/supabase-js';

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string,
);
