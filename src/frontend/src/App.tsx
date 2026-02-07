import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomeScreen from './pages/HomeScreen';
import EducationScreen from './pages/education/EducationScreen';
import DisciplineScreen from './pages/discipline/DisciplineScreen';
import SportsScreen from './pages/sports/SportsScreen';
import NoticesScreen from './pages/notices/NoticesScreen';
import DashboardScreen from './pages/dashboard/DashboardScreen';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import ProfileSetupDialog from './components/ProfileSetupDialog';

export type AppSection = 'home' | 'education' | 'discipline' | 'sports' | 'notices' | 'dashboard';

export default function App() {
    const [currentSection, setCurrentSection] = useState<AppSection>('home');

    const renderSection = () => {
        switch (currentSection) {
            case 'home':
                return <HomeScreen onNavigate={setCurrentSection} />;
            case 'education':
                return <EducationScreen />;
            case 'discipline':
                return <DisciplineScreen />;
            case 'sports':
                return <SportsScreen />;
            case 'notices':
                return <NoticesScreen />;
            case 'dashboard':
                return <DashboardScreen />;
            default:
                return <HomeScreen onNavigate={setCurrentSection} />;
        }
    };

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-1 pb-20 overflow-y-auto">
                    {renderSection()}
                </main>
                <BottomNav currentSection={currentSection} onNavigate={setCurrentSection} />
                <ProfileSetupDialog />
                <Toaster />
            </div>
        </ThemeProvider>
    );
}
