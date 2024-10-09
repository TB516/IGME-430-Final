import ISpell from '../ISpell';

const parseJson = (content: string) : ISpell => {
  return JSON.parse(content) as ISpell;
};

const parseUrlencoded = (content: string): ISpell => {
  // Look at demos
  return {} as ISpell;
};

export { parseJson, parseUrlencoded };
