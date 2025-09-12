import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { insertUserSchema, type InsertUser } from '@shared/schema';
import { UserPlus, Mail, User, Bell } from 'lucide-react';

interface UserRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletAddress: string;
  onRegister: (userData: InsertUser) => Promise<any>;
  isRegistering: boolean;
}

export function UserRegistrationDialog({ 
  open, 
  onOpenChange, 
  walletAddress, 
  onRegister, 
  isRegistering 
}: UserRegistrationDialogProps) {
  const { toast } = useToast();
  
  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema.extend({
      username: insertUserSchema.shape.username.min(3, 'Username must be at least 3 characters'),
    })),
    defaultValues: {
      username: '',
      walletAddress: walletAddress,
      email: '',
      isNotificationEnabled: true,
    },
  });

  const onSubmit = async (data: InsertUser) => {
    try {
      await onRegister(data);
      toast({
        title: "Registration Successful",
        description: "Your VeriFyz account has been created successfully!",
      });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-md border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-glow">
            <UserPlus className="h-5 w-5 text-primary" />
            Complete Your Registration
          </DialogTitle>
          <DialogDescription>
            Create your VeriFyz profile to start earning VFYZ tokens through proof of presence.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your username" 
                      {...field}
                      data-testid="input-username"
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Enter your email" 
                      {...field}
                      value={field.value || ''}
                      data-testid="input-email"
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isNotificationEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3 space-y-0">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Bell className="h-4 w-4" />
                      Email Notifications
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about rewards and token distributions
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      data-testid="switch-notifications"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <strong>Wallet Address:</strong><br />
              <code className="text-primary font-mono">{walletAddress}</code>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={isRegistering}
                className="flex-1"
                data-testid="button-register"
              >
                {isRegistering ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}