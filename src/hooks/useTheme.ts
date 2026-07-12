"use client";

import { useEffect } from "react";
import { useUIConfig } from "@/app/config/ui.config";
import { ThemeService } from "@/app/config/theme.service";

export const useTheme = () => {
  const uiConfig = useUIConfig();

  useEffect(() => {
    ThemeService.getInstance().applyTheme(uiConfig.config);
  }, [uiConfig.config]);

  return uiConfig;
};

export default useTheme;
