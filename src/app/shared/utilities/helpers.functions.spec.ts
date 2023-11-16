import { dateToNumber, getRandomID } from './helpers.functions';

fdescribe('Tests for helper functions', () => {
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
  
});
