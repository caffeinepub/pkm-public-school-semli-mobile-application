import { AppSection } from '../App';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Shield, Trophy, Bell } from 'lucide-react';
import { BRANDING } from '../constants/branding';

interface HomeScreenProps {
    onNavigate: (section: AppSection) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
    const quickLinks = [
        {
            id: 'education' as AppSection,
            title: 'Education',
            description: 'Study materials & assignments',
            icon: BookOpen,
            color: 'bg-chart-1/10 text-chart-1'
        },
        {
            id: 'discipline' as AppSection,
            title: 'Discipline',
            description: 'Rules & attendance',
            icon: Shield,
            color: 'bg-chart-2/10 text-chart-2'
        },
        {
            id: 'sports' as AppSection,
            title: 'Sports',
            description: 'Activities & achievements',
            icon: Trophy,
            color: 'bg-chart-3/10 text-chart-3'
        },
        {
            id: 'notices' as AppSection,
            title: 'Notices',
            description: 'Announcements & events',
            icon: Bell,
            color: 'bg-chart-4/10 text-chart-4'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-card">
                <div className="absolute inset-0 opacity-10">
                    <img 
                        src="/assets/generated/pkm-hero-banner.dim_1200x600.png" 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <img 
                            src={BRANDING.logoPath}
                            alt={`${BRANDING.schoolName} Logo`}
                            className="h-16 w-16 object-contain bg-white/90 rounded-xl p-2"
                        />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">{BRANDING.schoolName}</h1>
                            <p className="text-sm opacity-90">{BRANDING.location}</p>
                        </div>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed max-w-2xl">
                        Welcome to our school community! We are committed to excellence in{' '}
                        <span className="font-semibold">Education</span>,{' '}
                        <span className="font-semibold">Discipline</span>, and{' '}
                        <span className="font-semibold">Sports</span> — building a foundation for lifelong success.
                    </p>
                </div>
            </div>

            {/* Quick Access */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Card
                                key={link.id}
                                className="cursor-pointer transition-all hover:shadow-card hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => onNavigate(link.id)}
                            >
                                <CardContent className="p-4 sm:p-6">
                                    <div className={`inline-flex rounded-xl p-3 mb-3 ${link.color}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-base mb-1">{link.title}</h3>
                                    <p className="text-xs text-muted-foreground">{link.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Values Section */}
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Our Core Values</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-chart-1/20 p-2 mt-0.5">
                                <BookOpen className="h-4 w-4 text-chart-1" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Education</h3>
                                <p className="text-xs text-muted-foreground">
                                    Fostering academic excellence and lifelong learning
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-chart-2/20 p-2 mt-0.5">
                                <Shield className="h-4 w-4 text-chart-2" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Discipline</h3>
                                <p className="text-xs text-muted-foreground">
                                    Building character through responsibility and respect
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-chart-3/20 p-2 mt-0.5">
                                <Trophy className="h-4 w-4 text-chart-3" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Sports</h3>
                                <p className="text-xs text-muted-foreground">
                                    Promoting physical fitness and teamwork
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <footer className="text-center text-xs text-muted-foreground py-4">
                <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">caffeine.ai</a></p>
            </footer>
        </div>
    );
}
