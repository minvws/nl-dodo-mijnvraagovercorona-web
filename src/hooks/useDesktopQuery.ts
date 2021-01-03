import { useEffect, useState } from 'react';
import theme from 'utilities/styling/theme';

export const useDesktopQuery = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateWidth);
        updateWidth();

        return () => window.removeEventListener('resize', updateWidth);
    }, []);
    const firstBreakpointWidth = theme.breakpoints
        ? parseInt(theme.breakpoints[0].replace(/[^0-9.]/, '')) : 0;

    return width >= firstBreakpointWidth;
};
