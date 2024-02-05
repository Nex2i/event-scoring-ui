import { createContext } from 'react';

type UserAgentInfo = {
  isMobile: boolean;
  isIos: boolean;
  userAgentName: string;
};

const userAgent = navigator.userAgent;

const detectMobile = (userAgent: string): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

const detectIos = (userAgent: string): boolean => {
  return /iPhone|iPad|iPod/i.test(userAgent);
};

export const initializeUserAgent: UserAgentInfo = {
  isMobile: detectMobile(userAgent),
  isIos: detectIos(userAgent),
  userAgentName: userAgent,
};

export const UserAgentContext = createContext<UserAgentInfo>(initializeUserAgent);
