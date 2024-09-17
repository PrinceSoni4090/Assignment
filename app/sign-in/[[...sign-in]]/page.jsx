import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignIn afterSignInUrl="/dashboard" redirectUrl="/dashboard" />
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Demo Credentials:</h3>
        <p className="text-xs">Username: user1</p>
        <p className="text-xs">Password: user12345</p>
      </div>
    </div>
  );
}