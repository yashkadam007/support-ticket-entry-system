
import { redirect } from 'next/navigation';
export default function Home({ params }) {
    redirect('/support-agents');
}