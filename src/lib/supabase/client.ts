import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdkatkscfovjjsrwkulb.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk3ODE0OSwiZXhwIjoxOTU0NTU0MTQ5fQ.jiRvsO-9qxXkkOVhjQhCbHeAW63GjG5tm4p9mi7IeO0';
export const supabase = createClient(supabaseUrl, supabaseKey);
