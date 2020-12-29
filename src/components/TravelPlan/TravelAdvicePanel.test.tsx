import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TravelAdvicePanel from './TravelAdvicePanel';

test('TravelAdvicePanel should display title and subheading', () => {
    const title = 'Title';
    const subHeading = 'Sub-Heading';
    render(<TravelAdvicePanel title={title} subHeading={subHeading} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
});
