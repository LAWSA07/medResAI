import supabase from './supabase';
const AuthService = {
    /**
     * Register a new user account
     */
    signup: async (data) => {
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });
        if (error) {
            throw error;
        }
    },
    /**
     * Login a user
     */
    login: async (data) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        if (error) {
            throw error;
        }
    },
    /**
     * Logout the current user
     */
    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
    },
    /**
     * Get the currently logged in user's information
     */
    getCurrentUser: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return null;
        }
        // Get additional user profile data from the profiles table
        const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        if (error && error.code !== 'PGRST116') { // PGRST116 is for "no rows returned"
            throw error;
        }
        return {
            id: user.id,
            email: user.email ?? '',
            name: profileData?.name,
            phone: profileData?.phone,
            organization: profileData?.organization,
            role: profileData?.role,
            is_profile_complete: Boolean(profileData?.is_profile_complete)
        };
    },
    /**
     * Check if the user is logged in
     */
    isLoggedIn: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session !== null;
    },
    /**
     * Update the user's profile
     */
    updateProfile: async (profileData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }
        const { error } = await supabase
            .from('profiles')
            .upsert({
            id: user.id,
            user_id: user.id,
            name: profileData.name,
            phone: profileData.phone || null,
            organization: profileData.organization,
            role: profileData.role,
            is_profile_complete: true,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
        if (error) {
            throw error;
        }
    }
};
export default AuthService;
