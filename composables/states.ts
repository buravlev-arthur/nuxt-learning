export const useCount = () => useState<number>('count', () => Math.round(Math.random() * 1000));
