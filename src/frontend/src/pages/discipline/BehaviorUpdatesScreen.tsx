import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, MessageSquare } from 'lucide-react';
import { EmptyState } from '../../components/QueryState';

export default function BehaviorUpdatesScreen() {
    const { identity, login, loginStatus } = useInternetIdentity();
    const isAuthenticated = !!identity;

    if (!isAuthenticated) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <LogIn className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Login Required</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Please login to view behavior updates
                    </p>
                    <Button onClick={login} disabled={loginStatus === 'logging-in'}>
                        {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return <EmptyState message="No behavior updates at this time" />;
}
