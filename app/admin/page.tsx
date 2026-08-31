import { dalRequireAdminRedirect } from '@/dal/helpers'
import AdminPage from './AdminPage';

export default async function page() {
   await dalRequireAdminRedirect();
   return <AdminPage />
}
