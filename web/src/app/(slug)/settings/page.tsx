import EmailForm from "@/components/UpdateUserForms/EmailForm";
import PasswordForm from "@/components/UpdateUserForms/PasswordForm";
import UserNameForm from "@/components/UpdateUserForms/UsernameForm";
import { useServerSession } from "@/hooks/useServerSession";
import { redirect } from "next/navigation";

export default async function Settings() {
  const user = await useServerSession();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>
        <div className="grid gap-5">
          <UserNameForm
            user={{
              username: user.username,
            }}
          />
          <EmailForm user={{ email: user.email }} />
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
