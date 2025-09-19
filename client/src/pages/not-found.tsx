
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="bg-black/40 border-brand-neon/30 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-brand-neon mb-4">404</div>
          <CardTitle className="text-2xl text-white">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-brand-neon hover:bg-brand-neon/80 text-black">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
