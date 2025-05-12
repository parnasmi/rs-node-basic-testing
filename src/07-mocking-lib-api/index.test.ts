// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const actual = jest.requireActual('lodash');
  return {
    ...actual,
    throttle: (fn: any, _wait: number) => fn, // Replace throttle with identity function for testing
  };
});

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();
  const mockCreate = axios.create as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockReturnValue({ get: mockGet });
  });

  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: 'mocked data' });

    await throttledGetDataFromApi('/posts');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: 'mocked data' });

    await throttledGetDataFromApi('/todos/1');

    expect(mockGet).toHaveBeenCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    mockGet.mockResolvedValue({ data: { id: 1, title: 'test' } });

    const result = await throttledGetDataFromApi('/users/1');

    expect(result).toEqual({ id: 1, title: 'test' });
  });
});
