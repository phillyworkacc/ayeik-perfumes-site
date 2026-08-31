import { dalRequireAuthRedirect } from "@/dal/helpers";
import Account from "./Account";

export default async function AccountPage () {
   await dalRequireAuthRedirect();
   return <Account />
}
