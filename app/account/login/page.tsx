import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function page() {
   const session = await getServerSession(authOptions);
   if (session?.user) redirect("/account");
   return <LoginForm />
}
