import ISpell from '../ISpell';

const parseJson = (content: string) : ISpell => {
  return JSON.parse(content) as ISpell;
};

const parseUrlencoded = (content: string): ISpell => {
  return {} as ISpell;
};

export { parseJson, parseUrlencoded };
