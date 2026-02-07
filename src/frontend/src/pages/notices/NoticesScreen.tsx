import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CircularsList from './CircularsList';
import HolidayList from './HolidayList';
import EventUpdatesList from './EventUpdatesList';

export default function NoticesScreen() {
    const [activeTab, setActiveTab] = useState('circulars');

    return (
        <div className="container mx-auto px-4 py-6 space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Notices & Announcements</h1>
                <p className="text-sm text-muted-foreground">Stay updated with school news</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="circulars">Circulars</TabsTrigger>
                    <TabsTrigger value="holidays">Holidays</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="circulars" className="mt-4">
                    <CircularsList />
                </TabsContent>
                <TabsContent value="holidays" className="mt-4">
                    <HolidayList />
                </TabsContent>
                <TabsContent value="events" className="mt-4">
                    <EventUpdatesList />
                </TabsContent>
            </Tabs>
        </div>
    );
}
