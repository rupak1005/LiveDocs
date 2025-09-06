import LandingPage from '@/components/LandingPage'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  
  // If user is not logged in, show landing page
  if (!clerkUser) {
    return <LandingPage />
  }
  
  // If user is logged in, redirect to dashboard
  redirect('/dashboard')
}

export default Home