export default <T = any>(...args: any[]): Promise<T> =>
  // @ts-ignore
  fetch(...args).then((res) => (res.json() as unknown) as T);
