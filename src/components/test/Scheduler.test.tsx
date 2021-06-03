import { screen, render } from '@testing-library/react';
import Grid from '../Grid';

describe('Scheduler', () => {
  it('should schedular be in the document', async () => {
    render(<Grid duration={30} date={new Date()} view='week' />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
