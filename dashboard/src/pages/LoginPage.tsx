import { LogIn } from "lucide-react";
import { authClient } from "../lib/auth-client";

function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Login failed:", error);
      console.log("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body items-center text-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/20">
            <LogIn size={40} strokeWidth={2.5} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-base-content/60">
              Please sign in to access your dashboard
            </p>
          </div>

          <div className="w-full space-y-4 pt-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-lg w-full gap-3 font-semibold hover:bg-base-200 hover:text-base-content"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="pt-6 border-t border-base-300 w-full text-center">
            <p className="text-sm text-base-content/50">
              Admin Dashboard &bull; Secure Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
