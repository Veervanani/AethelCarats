import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { api } from '../services/api';
import { User as IUser } from '../types';
import { SessionTimeoutModal } from '../components/common/SessionTimeoutModal';

export type AuthModalMode = 'signin' | 'register' | 'forgot_password';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  isAuthModalOpen: boolean;
  authModalMode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  login: (credentials: { email: string; password: string }, rememberMe?: boolean) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: (reason?: string) => void;
  resetInactivityTimer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(() => {
    try {
      const stored = localStorage.getItem('app_user_profile');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('app_auth_token') || localStorage.getItem('admin_session_token') || null;
  });

  const [rememberMe, setRememberMeState] = useState<boolean>(() => {
    return localStorage.getItem('app_remember_me') === 'true';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('signin');

  // INACTIVITY TIMEOUT & WARNING MODAL STATE
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const lastActivityRef = useRef<number>(Date.now());
  const countdownIntervalRef = useRef<any>(null);

  const setRememberMe = (val: boolean) => {
    setRememberMeState(val);
    localStorage.setItem('app_remember_me', String(val));
  };

  useEffect(() => {
    const initAuth = async () => {
      const activeToken = localStorage.getItem('app_auth_token') || localStorage.getItem('admin_session_token');
      if (activeToken) {
        setToken(activeToken);
        try {
          const liveUser = await api.getCurrentUser();
          if (liveUser) {
            setUser(liveUser);
            localStorage.setItem('app_user_profile', JSON.stringify(liveUser));
          }
        } catch (e) {
          const storedUser = localStorage.getItem('app_user_profile');
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch (err) {
              setUser(null);
            }
          }
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const openAuthModal = (mode: AuthModalMode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = (newToken: string, newUser?: IUser, remember?: boolean) => {
    const userData = newUser || {
      id: 'usr_' + Date.now(),
      email: 'client@auroradiamonds.com',
      name: 'Valued Client',
      role: 'CUSTOMER',
    };

    const isRem = remember !== undefined ? remember : rememberMe;

    setToken(newToken);
    setUser(userData);
    setRememberMe(isRem);

    localStorage.setItem('app_auth_token', newToken);
    localStorage.setItem('app_user_profile', JSON.stringify(userData));
    localStorage.setItem('app_last_activity', String(Date.now()));
    lastActivityRef.current = Date.now();

    closeAuthModal();
  };

  const login = async (credentials: { email: string; password: string }, userRememberMe?: boolean) => {
    setIsLoading(true);
    const rem = userRememberMe !== undefined ? userRememberMe : rememberMe;
    try {
      const res = await api.login(credentials);
      if (res.token) {
        handleAuthSuccess(res.token, res.user, rem);
      } else {
        throw new Error('Invalid login credentials.');
      }
    } catch (err: any) {
      try {
        const adminRes = await api.adminLogin(credentials);
        if (adminRes.token) {
          localStorage.setItem('admin_session_token', adminRes.token);
          handleAuthSuccess(adminRes.token, adminRes.user || {
            id: 'admin_1',
            email: credentials.email,
            name: 'Atelier Admin',
            role: 'ADMIN',
          }, false); // Admin always strictly enforces 15-min inactivity timeout
          return;
        } else {
          throw new Error('Admin login failed.');
        }
      } catch (adminErr: any) {
        const message = err.response?.data?.message || adminErr.response?.data?.message || 'Invalid email or password.';
        throw new Error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string }) => {
    setIsLoading(true);
    try {
      const res = await api.register(data);
      if (res.token) {
        handleAuthSuccess(res.token, res.user, true);
      } else {
        throw new Error('Registration failed.');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed.';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (reason?: string) => {
    setToken(null);
    setUser(null);
    setIsWarningOpen(false);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    localStorage.removeItem('app_auth_token');
    localStorage.removeItem('app_user_profile');
    localStorage.removeItem('admin_session_token');
    localStorage.removeItem('app_last_activity');
    closeAuthModal();

    if (reason) {
      alert(reason);
    }
  };

  const resetInactivityTimer = () => {
    lastActivityRef.current = Date.now();
    localStorage.setItem('app_last_activity', String(Date.now()));
    if (isWarningOpen) {
      setIsWarningOpen(false);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }
  };

  // INACTIVITY MONITORING EFFECT
  useEffect(() => {
    if (!token || !user) {
      setIsWarningOpen(false);
      return;
    }

    const isAdmin = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';

    // Skip inactivity auto-logout only for non-admin customers who checked "Remember Me"
    if (!isAdmin && rememberMe) {
      return;
    }

    // Admin = 15 min total (840s warning, 900s logout)
    // Customer without Remember Me = 30 min total (1740s warning, 1800s logout)
    const warningMs = isAdmin ? 14 * 60 * 1000 : 29 * 60 * 1000;
    const timeoutMs = isAdmin ? 15 * 60 * 1000 : 30 * 60 * 1000;

    const handleUserActivity = () => {
      // Only reset activity if warning modal is not currently open
      if (!isWarningOpen) {
        lastActivityRef.current = Date.now();
      }
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    const checkInterval = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;

      if (elapsed >= timeoutMs) {
        clearInterval(checkInterval);
        logout(`For your security, your ${isAdmin ? 'admin' : ''} session has expired after ${isAdmin ? '15' : '30'} minutes of inactivity.`);
      } else if (elapsed >= warningMs && !isWarningOpen) {
        setIsWarningOpen(true);
        const remaining = Math.max(1, Math.ceil((timeoutMs - elapsed) / 1000));
        setSecondsRemaining(remaining);

        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = setInterval(() => {
          setSecondsRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(countdownIntervalRef.current);
              logout(`For your security, your ${isAdmin ? 'admin' : ''} session has expired after ${isAdmin ? '15' : '30'} minutes of inactivity.`);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }, 3000);

    return () => {
      activityEvents.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      clearInterval(checkInterval);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [token, user, rememberMe, isWarningOpen]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        rememberMe,
        setRememberMe,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        resetInactivityTimer,
      }}
    >
      {children}
      <SessionTimeoutModal
        isOpen={isWarningOpen}
        secondsRemaining={secondsRemaining}
        isAdmin={user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'}
        onExtendSession={resetInactivityTimer}
        onLogout={() => logout('You have logged out.')}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
