import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RulesCodeScreen from './RulesCodeScreen';
import AttendanceScreen from './AttendanceScreen';
import BehaviorUpdatesScreen from './BehaviorUpdatesScreen';
import GuidelinesPoliciesScreen from './GuidelinesPoliciesScreen';

export default function DisciplineScreen() {
    const [activeTab, setActiveTab] = useState('rules');

    return (
        <div className="container mx-auto px-4 py-6 space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Discipline</h1>
                <p className="text-sm text-muted-foreground">School rules, attendance, and conduct</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="rules" className="text-xs">Rules</TabsTrigger>
                    <TabsTrigger value="attendance" className="text-xs">Attendance</TabsTrigger>
                    <TabsTrigger value="behavior" className="text-xs">Behavior</TabsTrigger>
                    <TabsTrigger value="guidelines" className="text-xs">Guidelines</TabsTrigger>
                </TabsList>
                <TabsContent value="rules" className="mt-4">
                    <RulesCodeScreen />
                </TabsContent>
                <TabsContent value="attendance" className="mt-4">
                    <AttendanceScreen />
                </TabsContent>
                <TabsContent value="behavior" className="mt-4">
                    <BehaviorUpdatesScreen />
                </TabsContent>
                <TabsContent value="guidelines" className="mt-4">
                    <GuidelinesPoliciesScreen />
                </TabsContent>
            </Tabs>
        </div>
    );
}
