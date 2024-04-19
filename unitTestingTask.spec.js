const unitTestingTask = require('./unitTestingTask');

describe('unitTestingTask', () => {
  const mockDate = new Date(Date.parse('2020-06-12T12:01:24.125'));
  const morningDateMock = new Date(Date.parse('2020-06-12T09:01:24.125'));

  describe('throws an error', () => {
    it('if format argument is not of type string', () => {
      const expectedErrorMessage = 'Argument `format` must be a string';
      expect(() => unitTestingTask(null, mockDate)).toThrow(expectedErrorMessage);
    });

    it('if date argument is not of type Date or string', () => {
      const expectedErrorMessage =
        'Argument `date` must be instance of Date or Unix Timestamp or ISODate String';
      expect(() => unitTestingTask('YY', null)).toThrow(expectedErrorMessage);
    });
  });

  describe('properly formats the', () => {
    it.each([
      ['YYYY', mockDate, '2020'],
      ['YY', mockDate, '20'],
    ])('year', (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    });

    it.each([
      ['MMMM', mockDate, 'June'],
      ['MMM', mockDate, 'Jun'],
      ['M', mockDate, '6'],
    ])('month', (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    });

    it.each([
      ['DDD', mockDate, 'Friday'],
      ['DD', mockDate, 'Fri'],
      ['D', mockDate, 'Fr'],
      ['d', mockDate, '12'],
    ])('day', (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    });
  });

  describe('returns correct time format', () => {
    it('returns PM', () => {
      expect(unitTestingTask('A', mockDate)).toBe('PM');
    });

    it('returns pm', () => {
      expect(unitTestingTask('a', mockDate)).toBe('pm');
    });

    it('returns AM', () => {
      expect(unitTestingTask('A', morningDateMock)).toBe('AM');
    });

    it('returns am', () => {
      expect(unitTestingTask('a', morningDateMock)).toBe('am');
    });
  });

  describe('formats date and time values correctly', () => {
    it.each([
      ['f', mockDate, '125'],
      ['ff', mockDate, '125'],
      ['s', mockDate, '24'],
      ['ss', mockDate, '24'],
      ['m', mockDate, '1'],
      ['mm', mockDate, '01'],
      ['hh', mockDate, '12'],
      ['h', mockDate, '12'],
      ['H', mockDate, '12'],
      ['HH', mockDate, '12'],
      ['dd', mockDate, '12'],
      ['MM', mockDate, '06'],
    ])('returns correct value', (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    });
  });

  describe('language', () => {
    it('is en if the value is falsey', () => {
      expect(unitTestingTask.lang(undefined)).toBe('en');
    });

    it.each([
      ['en', null, 'en'],
      ['pl', {}, 'pl'],
      ['fr', {}, 'fr'],
      ['ru', {}, 'ru'],
      ['uk', {}, 'uk'],
      ['tt', {}, 'tt'],
    ])('is of the correct value based on parameters', (lang, options, expectedLang) => {
      expect(unitTestingTask.lang(lang, options)).toBe(expectedLang);
    });

    it('returns correct language', () => {
      expect(unitTestingTask.lang('pl', {})).toBe('pl');
    });
  });

  describe('time format', () => {
    it.each([
      ['ISODate', mockDate, '2020-06-12'],
      ['ISOTime', mockDate, '12:01:24'],
      ['ISODateTime', mockDate, '2020-06-12T12:01:24'],
    ])('returns correct format for values', (formatName, date, result) => {
      expect(unitTestingTask(formatName, date)).toBe(result);
    });
  });

  describe('time zones', () => {
    it.each([
      ['ZZ', mockDate, '+0200'],
      ['Z', mockDate, '+02:00'],
    ])('return the correct time zone for each value', (format, date, result) => {
      expect(unitTestingTask(format, date)).toBe(result);
    });
  });

  it('time stamp should return correct year', () => {
    const dateUnix = mockDate.getTime();
    expect(unitTestingTask('YYYY', dateUnix)).toBe('2020');
  });

  it('formatters() should return array of custom formats', () => {
    expect(unitTestingTask.formatters()).toBeInstanceOf(Array);
  });
});
