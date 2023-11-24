import { buildLocalDateFromCurrentUTC, dateToNumber, getDate, getRandomID } from './helpers.functions';
import * as utils from './helpers.functions';

describe('Tests for helper functions', () => {
  let fixedDate: Date;

  beforeEach(() => {
    jasmine.clock().install();
    fixedDate = new Date('2023-11-19T12:34:56Z');
    jasmine.clock().mockDate(fixedDate);
    const offset = fixedDate.getTimezoneOffset();
    const minutes = fixedDate.getMinutes();
    fixedDate.setMinutes(minutes - offset);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('dateToNumber', () => {
    it('should return a number if an empty string is suplied', () => {
      expect(typeof dateToNumber('')).toBe('number');
    });

    it('should return a NaN if an invalid string is suplied', () => {
      expect(dateToNumber('today')).toBeNaN;
    });

    it('should return a number if a valid string with no separator is suplied', () => {
      expect(dateToNumber('20230513')).toBe(20230513);
    });

    it('should return a number without the dashes if a date with dashes is suplied', () => {
      expect(dateToNumber('2023-05-13')).toBe(20230513);
    });

    it('should return a NaN if a date with a different separator is suplied', () => {
      expect(dateToNumber('2023/05/13')).toBeNaN;
    });
  });

  describe('getRandomID', () => {
    it('should return a string', () => {
      expect(typeof getRandomID()).toBe('string');
    });
  });

  describe('buildLocalDateFromCurrentUTC', () => {
    it('should be a valid ISOString', () => {
      const validator = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+/;
      expect(typeof buildLocalDateFromCurrentUTC()).toBe('string');
      expect(buildLocalDateFromCurrentUTC()).toMatch(validator);
    });

    it('should return current date', () => {
      const date = buildLocalDateFromCurrentUTC();
      expect(date).toEqual(fixedDate.toISOString());
    });
  });

  describe('getDate', () => {
    it('should return a valid date', () => {
      const date = getDate();

      expect(typeof date).toBe('string');
      expect(date).toEqual('2023-11-19');
    });
  });

  describe('getDaysBetweenDates', () => {
    it('should return 0 days between two similar dates', () => {
        const daysBetween = utils.getDaysBetweenDates(20230215, 20230215)
        expect(daysBetween).toBe(0);
    });

    it('should return the actual days if range isnt bigger than 2', () => {
        const oneDaysBetween = utils.getDaysBetweenDates(20230218, 20230219)
        expect(oneDaysBetween).toBe(1);

        const twoDaysBetween = utils.getDaysBetweenDates(20230215, 20230217)
        expect(twoDaysBetween).toBe(2);
    })

    it('should return 2 days if range is larger than 2', () => {
        const XDaysBetween = utils.getDaysBetweenDates(20230215, 20230515)
        const YDaysBetween = utils.getDaysBetweenDates(20230219, 20230815)
        const ZDaysBetween = utils.getDaysBetweenDates(20010219, 20230815)
        expect(XDaysBetween).toBe(2);
        expect(YDaysBetween).toBe(2);
        expect(ZDaysBetween).toBe(2);
    })
  })
});
