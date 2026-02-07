import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/queries/auth';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ProfileSetupDialog() {
    const { identity } = useInternetIdentity();
    const isAuthenticated = !!identity;
    const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
    const saveProfile = useSaveCallerUserProfile();
    
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);

    const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

    useEffect(() => {
        setOpen(showProfileSetup);
    }, [showProfileSetup]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Please enter your name');
            return;
        }

        try {
            await saveProfile.mutateAsync({
                name: name.trim(),
                role: 'student',
                associatedStudentId: undefined
            });
            toast.success('Profile created successfully!');
            setOpen(false);
        } catch (error) {
            console.error('Profile save error:', error);
            toast.error('Failed to save profile. Please try again.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Welcome to PKM Public School!</DialogTitle>
                        <DialogDescription>
                            Please enter your name to complete your profile setup.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="mt-2"
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={saveProfile.isPending}>
                            {saveProfile.isPending ? 'Saving...' : 'Continue'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
