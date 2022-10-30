export const sequentialPromiseResolver = async <T extends unknown[]>(tasks: T) => {
  const results: Awaited<T[number]>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const task of tasks) {
    // eslint-disable-next-line no-await-in-loop
    results.push((await task) as Awaited<T[number]>);
  }

  return results;
};
