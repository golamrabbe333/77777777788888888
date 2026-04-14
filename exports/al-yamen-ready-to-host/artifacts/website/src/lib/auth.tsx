import { createContext, useContext, ReactNode } from "react";
import { useGetMe, useLogout } from "@workspace/api-client-react";
import { useLocation } from "wouter";
type AuthUser = {
  id: number;
  username: string;
  name: string;
  role: string;
};

interface AuthContextType {
  user: AuthUser | undefined;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: user, isLoading, isError } = useGetMe({
    query: {
      retry: false,
    },
  });

  const logoutMutation = useLogout({
    mutation: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated and not already on login page
  if (isError && location !== "/") {
    setLocation("/");
    return null;
  }

  // Redirect to dashboard if authenticated and on login page
  if (user && location === "/") {
    setLocation("/dashboard");
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logout: () => logoutMutation.mutate({ data: undefined }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
