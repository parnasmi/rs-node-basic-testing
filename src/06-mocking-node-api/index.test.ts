// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockJoin = path.join as jest.Mock;
  const mockExistsSync = fs.existsSync as jest.Mock;
  const mockReadFile = fsPromises.readFile as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    mockJoin.mockReturnValue('/full/path/to/file');
    mockExistsSync.mockReturnValue(false);

    await readFileAsynchronously('myFile.txt');

    expect(mockJoin).toHaveBeenCalledWith(expect.any(String), 'myFile.txt');
  });

  test('should return null if file does not exist', async () => {
    mockJoin.mockReturnValue('/path/to/file');
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('file.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    mockJoin.mockReturnValue('/path/to/file');
    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from('Hello World'));

    const result = await readFileAsynchronously('file.txt');
    expect(result).toBe('Hello World');
  });
});
