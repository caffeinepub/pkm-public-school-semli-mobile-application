import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/queries/auth';
import { useGetStudentProfile, useGetExamResults, useGetNotifications } from '../../hooks/queries/dashboard';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogIn, User, Award, Bell, TrendingUp } from 'lucide-react';

export default function DashboardScreen() {
    const { identity, login, loginStatus } = useInternetIdentity();
    const isAuthenticated = !!identity;
    const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
    const studentId = userProfile?.associatedStudentId;
    
    const { data: studentProfile, isLoading: studentLoading } = useGetStudentProfile(studentId || '');
    const { data: examResults, isLoading: resultsLoading } = useGetExamResults(studentId || '');
    const { data: notifications, isLoading: notificationsLoading } = useGetNotifications(
        identity?.getPrincipal().toString() || ''
    );

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-6">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <LogIn className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">Login Required</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Please login to access your dashboard
                        </p>
                        <Button onClick={login} disabled={loginStatus === 'logging-in'}>
                            {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (profileLoading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <LoadingSkeleton />
            </div>
        );
    }

    const recentResults = examResults?.slice(0, 5) || [];
    const unreadNotifications = notifications?.filter(n => !n.read) || [];

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {userProfile?.name || 'Student'}!</p>
            </div>

            {/* Profile Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/20 p-3">
                            <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>{userProfile?.name || 'Student'}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                                {userProfile?.role || 'Student'}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                {studentId && studentProfile && (
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Class</p>
                                <p className="font-medium">{studentProfile.className}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Student ID</p>
                                <p className="font-medium">{studentProfile.id}</p>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Performance Overview */}
            {studentId && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-chart-1" />
                            <CardTitle className="text-base">Performance Overview</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {resultsLoading ? (
                            <LoadingSkeleton count={2} />
                        ) : !recentResults || recentResults.length === 0 ? (
                            <EmptyState message="No exam results available" />
                        ) : (
                            <div className="space-y-3">
                                {recentResults.map((result, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-3">
                                            <Award className="h-4 w-4 text-accent" />
                                            <div>
                                                <p className="font-medium text-sm">{result.subject}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(result.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary">{Number(result.score)}</p>
                                            <p className="text-xs text-muted-foreground">/ {Number(result.total)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-chart-4" />
                            <CardTitle className="text-base">Notifications</CardTitle>
                        </div>
                        {unreadNotifications.length > 0 && (
                            <Badge variant="destructive">{unreadNotifications.length} new</Badge>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {notificationsLoading ? (
                        <LoadingSkeleton count={2} />
                    ) : !notifications || notifications.length === 0 ? (
                        <EmptyState message="No notifications" />
                    ) : (
                        <div className="space-y-2">
                            {notifications.slice(0, 5).map((notification, idx) => (
                                <div 
                                    key={idx} 
                                    className={`p-3 rounded-lg ${notification.read ? 'bg-muted/30' : 'bg-accent/10 border border-accent/20'}`}
                                >
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(notification.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Footer */}
            <footer className="text-center text-xs text-muted-foreground py-4">
                <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">caffeine.ai</a></p>
            </footer>
        </div>
    );
}
