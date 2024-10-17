import { ISpell } from 'elden-ring-types';

const parseJson = (content: string) : ISpell => {
  try {
    return JSON.parse(content) as ISpell;
  } catch {
    return {} as ISpell;
  }
};

const parseUrlencoded = (content: string): ISpell => {
  const decodedBody = new URLSearchParams(content);
  const spell = {} as ISpell;

  spell.name = decodedBody.get('name')!;
  spell.image = decodedBody.get('image')!;
  spell.description = decodedBody.get('description')!;
  spell.type = decodedBody.get('type')!;
  spell.cost = Number.parseInt(decodedBody.get('cost')!, 10);
  spell.slots = Number.parseInt(decodedBody.get('slots')!, 10);
  spell.effects = decodedBody.get('string')!;
  spell.requires = [
    {
      name: 'Intelligence',
      amount: Number.parseInt(decodedBody.get('intReq')!, 10),
    },
    {
      name: 'Faith',
      amount: Number.parseInt(decodedBody.get('faithReq')!, 10),
    },
    {
      name: 'Arcane',
      amount: Number.parseInt(decodedBody.get('arcReq')!, 10),
    },
  ];

  return spell;
};

export { parseJson, parseUrlencoded };
