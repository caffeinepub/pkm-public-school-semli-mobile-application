import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { BRANDING } from '../constants/branding';

export default function Header() {
    const { identity, login, clear, loginStatus } = useInternetIdentity();
    const queryClient = useQueryClient();
    const isAuthenticated = !!identity;
    const isLoggingIn = loginStatus === 'logging-in';

    const handleAuth = async () => {
        if (isAuthenticated) {
            await clear();
            queryClient.clear();
        } else {
            try {
                await login();
            } catch (error: any) {
                console.error('Login error:', error);
                if (error.message === 'User is already authenticated') {
                    await clear();
                    setTimeout(() => login(), 300);
                }
            }
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <div className="container flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img 
                        src={BRANDING.logoPath}
                        alt={`${BRANDING.schoolName} Logo`}
                        className="h-8 w-8 object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold leading-none">{BRANDING.schoolName}</span>
                        <span className="text-xs text-muted-foreground leading-none mt-0.5">{BRANDING.location}</span>
                    </div>
                </div>
                <Button
                    onClick={handleAuth}
                    disabled={isLoggingIn}
                    size="sm"
                    variant={isAuthenticated ? 'outline' : 'default'}
                    className="gap-2"
                >
                    {isLoggingIn ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span className="hidden sm:inline">Logging in...</span>
                        </>
                    ) : isAuthenticated ? (
                        <>
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </>
                    ) : (
                        <>
                            <LogIn className="h-4 w-4" />
                            <span className="hidden sm:inline">Login</span>
                        </>
                    )}
                </Button>
            </div>
        </header>
    );
}
