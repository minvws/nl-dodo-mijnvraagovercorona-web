// the useUITheme hook kept failing the type checker
import theme from 'utilities/styling/theme';
import { useMediaQuery } from 'react-responsive';

export const useDesktopQuery = () => {
    const firstBreakpointWidth = theme.breakpoints ? theme.breakpoints[0] : 0;
    return useMediaQuery({
        query: `(min-width: ${firstBreakpointWidth})`
    });
};
