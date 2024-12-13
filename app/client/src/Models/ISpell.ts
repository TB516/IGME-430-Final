import IData from './IData';

interface ISpell extends IData {
  m_image: string | undefined,
  m_description: string,
  m_effect: string,
  m_fp: string,
  m_slot: number,
  m_int: number,
  m_faith: number,
  m_arc: number,
  m_bonus: string | undefined,
  m_location: string | undefined,
  m_stamina: number,
}

export default ISpell;
