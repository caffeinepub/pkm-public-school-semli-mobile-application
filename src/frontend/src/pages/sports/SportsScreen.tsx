import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivitiesFacilitiesScreen from './ActivitiesFacilitiesScreen';
import TournamentsEventsList from './TournamentsEventsList';
import AchievementsGallery from './AchievementsGallery';
import FitnessTrainingScreen from './FitnessTrainingScreen';

export default function SportsScreen() {
    const [activeTab, setActiveTab] = useState('activities');

    return (
        <div className="container mx-auto px-4 py-6 space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Sports</h1>
                <p className="text-sm text-muted-foreground">Activities, events, and achievements</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="activities" className="text-xs">Activities</TabsTrigger>
                    <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
                    <TabsTrigger value="achievements" className="text-xs">Awards</TabsTrigger>
                    <TabsTrigger value="fitness" className="text-xs">Fitness</TabsTrigger>
                </TabsList>
                <TabsContent value="activities" className="mt-4">
                    <ActivitiesFacilitiesScreen />
                </TabsContent>
                <TabsContent value="events" className="mt-4">
                    <TournamentsEventsList />
                </TabsContent>
                <TabsContent value="achievements" className="mt-4">
                    <AchievementsGallery />
                </TabsContent>
                <TabsContent value="fitness" className="mt-4">
                    <FitnessTrainingScreen />
                </TabsContent>
            </Tabs>
        </div>
    );
}
