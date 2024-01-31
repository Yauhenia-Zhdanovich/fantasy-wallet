import { FirstLetterPipe } from './first-letter.pipe';

describe('FirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstLetterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the first letter of a string', () => {
    const pipe = new FirstLetterPipe();
    expect(pipe.transform('Hello')).toBe('H');
  });

  it('should return empty string', () => {
    const pipe = new FirstLetterPipe();
    expect(pipe.transform('')).toBe('');
  });
});
