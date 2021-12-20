import type { Provider, User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { supabase } from './client';

export const userStore = writable<User | null>(null);

supabase.auth.refreshSession();
supabase.auth.onAuthStateChange((event, session) => {
	console.log('auth state change', event, session);

	if (event == 'SIGNED_IN') {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	}
});

export async function signIn(provider: Provider) {
	const { user, session, error } = await supabase.auth.signIn({
		provider
	});
	console.log({ user, session, error });

	userStore.set(user);
}
export async function signout() {
	const { error } = await supabase.auth.signOut();
	console.log({ error });
}
