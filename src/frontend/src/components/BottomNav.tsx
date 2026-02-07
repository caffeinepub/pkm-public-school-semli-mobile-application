import { Home, BookOpen, Shield, Trophy, Bell, LayoutDashboard } from 'lucide-react';
import { AppSection } from '../App';

interface BottomNavProps {
    currentSection: AppSection;
    onNavigate: (section: AppSection) => void;
}

export default function BottomNav({ currentSection, onNavigate }: BottomNavProps) {
    const navItems = [
        { id: 'home' as AppSection, label: 'Home', icon: Home },
        { id: 'education' as AppSection, label: 'Education', icon: BookOpen },
        { id: 'discipline' as AppSection, label: 'Discipline', icon: Shield },
        { id: 'sports' as AppSection, label: 'Sports', icon: Trophy },
        { id: 'notices' as AppSection, label: 'Notices', icon: Bell },
        { id: 'dashboard' as AppSection, label: 'Dashboard', icon: LayoutDashboard }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 safe-area-inset">
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-6 gap-1 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
