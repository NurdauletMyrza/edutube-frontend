import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchApiClient } from "@/shared/utils/apiClient";
import {
  aboutMeServerApiUrl,
  loginServerApiUrl,
  logoutServerApiUrl,
} from "@/shared/variables/serverApiUrls";
import {
  cabinetProfilePagePath,
  loginPagePath,
  mainPagePath,
} from "@/shared/variables/pagePaths";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";
import { useSnackbar } from "@/config/providers/SnackbarProvider/SnackbarProvider";
import {
  logoutCurrentUser,
  deleteCurrentUser,
} from "@/shared/utils/apiScripts";

// interface AuthContextType {
//   user: any;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// }
interface AuthContextType {
  user: any;
  reloadUser: () => Promise<void>;
  deleteUser: (password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const { setLoading } = useLoading();
//   const { push } = useRouter();
//
//   useEffect(() => {
//     async function fetchUserDetails() {
//       try {
//         const res = await fetchApiClient(aboutMeServerApiUrl);
//         if (res.ok) {
//           const data = await res.json();
//           setUser(data);
//         }
//       } catch (error) {
//         console.error("Ошибка загрузки пользователя:", error);
//       }
//       setLoading(false);
//     }
//
//     fetchUserDetails();
//   }, []);
//
//   async function login(email: string, password: string) {
//     setLoading(true);
//     try {
//       const res = await fetchApiClient(loginServerApiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//
//       if (!res.ok) throw new Error("Ошибка входа");
//
//       // Запрашиваем данные пользователя перед редиректом
//       const userRes = await fetchApiClient(aboutMeServerApiUrl);
//       if (userRes.ok) {
//         const userData = await userRes.json();
//         setUser(userData);
//       }
//
//       push(cabinetProfilePagePath); // Перенаправляем после успешного входа
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   async function logout() {
//     await fetchApiClient(logoutServerApiUrl, { method: "POST" });
//     setUser(null);
//     push(mainPagePath);
//   }
//
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { showSnackbar } = useSnackbar();
  const { push } = useRouter();
  const { setLoading } = useLoading();

  async function fetchUserDetails() {
    try {
      const res = await fetchApiClient(aboutMeServerApiUrl);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      showSnackbar("User details loading error", "error");
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function logoutUser() {
    setLoading(true);

    logoutCurrentUser()
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Account successfully sign out",
            "success"
          );
          setUser(null);
          push(loginPagePath);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Logout failed",
            "error"
          );
        }
      })
      .catch((error) => {
        showSnackbar(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function deleteUser(password: string) {
    setLoading(true);

    deleteCurrentUser(password)
      .then((data) => {
        if (data.ok) {
          showSnackbar(
            data["success"] ?? "Account successfully deleted",
            "success"
          );
          setUser(null);
          push(loginPagePath);
        } else {
          showSnackbar(
            data["error"] ??
              data["detail"] ??
              data["message"] ??
              "Account didn't deleted",
            "error"
          );
        }
      })
      .catch((error) => {
        showSnackbar(error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{ user, logoutUser, deleteUser, reloadUser: fetchUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
