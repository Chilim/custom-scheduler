import { getWeekDates } from '../../utils/timeUtils';

const daysInWeek = 7;

describe('calendar utils', () => {
  it('should return dates of week from 24.05.2021 to 30.05.2021', () => {
    const currentDate = new Date('May 24 2021');
    const days = getWeekDates(currentDate, daysInWeek);
    const expectedResult = [
      {
        day: 'Mo',
        date: '24',
        month: 'Mai',
        year: '2021',
      },
      {
        day: 'Di',
        date: '25',
        month: 'Mai',
        year: '2021',
      },
      {
        day: 'Mi',
        date: '26',
        month: 'Mai',
        year: '2021',
      },
      {
        day: 'Do',
        date: '27',
        month: 'Mai',
        year: '2021',
      },
      {
        day: 'Fr',
        date: '28',
        month: 'Mai',
        year: '2021',
      },
      {
        day: 'Sa',
        date: '29',
        month: 'Mai',
        year: '2021',
      },
      {
        day: 'So',
        date: '30',
        month: 'Mai',
        year: '2021',
      },
    ];
    expect(days).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedResult[0]),
        expect.objectContaining(expectedResult[1]),
        expect.objectContaining(expectedResult[2]),
        expect.objectContaining(expectedResult[3]),
        expect.objectContaining(expectedResult[4]),
        expect.objectContaining(expectedResult[5]),
        expect.objectContaining(expectedResult[6]),
      ])
    );
  });

  it('should return dates of week from 28.12.2020 to 02.01.2021', () => {
    const currentDate = new Date('December 30 2020');
    const days = getWeekDates(currentDate, daysInWeek);
    const expectedResult = [
      {
        day: 'Mo',
        date: '28',
        month: 'Dezember',
        year: '2020',
      },
      {
        day: 'Di',
        date: '29',
        month: 'Dezember',
        year: '2020',
      },
      {
        day: 'Mi',
        date: '30',
        month: 'Dezember',
        year: '2020',
      },
      {
        day: 'Do',
        date: '31',
        month: 'Dezember',
        year: '2020',
      },
      {
        day: 'Fr',
        date: '1',
        month: 'Januar',
        year: '2021',
      },
      {
        day: 'Sa',
        date: '2',
        month: 'Januar',
        year: '2021',
      },
      {
        day: 'So',
        date: '3',
        month: 'Januar',
        year: '2021',
      },
    ];
    expect(days).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedResult[0]),
        expect.objectContaining(expectedResult[1]),
        expect.objectContaining(expectedResult[2]),
        expect.objectContaining(expectedResult[3]),
        expect.objectContaining(expectedResult[4]),
        expect.objectContaining(expectedResult[5]),
        expect.objectContaining(expectedResult[6]),
      ])
    );
  });
});
