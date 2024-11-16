import Link from "next/link";
import SignupForm from "./signupForm";

export default function SignupPage() {
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm />
      <Link href="/auth/signin">Signin</Link>
    </div>
  );
}
