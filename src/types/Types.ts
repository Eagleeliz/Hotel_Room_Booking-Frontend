export interface AuthState {
    user: null | any;
    token: string | null;
    isAuthenticated: boolean;
    userType: string | null;
}