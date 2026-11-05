import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function LogoutPage() {
  const cookieStore = cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

