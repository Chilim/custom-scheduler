import { screen, render } from '@testing-library/react';
import Scheduler from '../Scheduler';

describe('Scheduler', () => {
  it('should schedular be in the document', async () => {
    render(<Scheduler />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
