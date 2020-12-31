import { useThemeUI } from 'theme-ui';
import { useMediaQuery } from 'react-responsive';

export const useDesktopQuery = () => {
    const context = useThemeUI();
    return useMediaQuery({
        query: `(min-width: ${context.theme.breakpoints[0]})`});
};
