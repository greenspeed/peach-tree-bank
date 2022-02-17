import { NoCommaPipe } from './no-comma.pipe';

describe('NoCommaPipe', () => {
  const pipe = new NoCommaPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform "5,000" to "5000"', () => {
    expect(pipe.transform('5,000')).toBe('5000');
  });

  it('transform "5,000.20" to "5000.20"', () => {
    expect(pipe.transform('5,000.20')).toBe('5000.20');
  });
});
