import IQuery from './IQuery';

abstract class Query implements IQuery {
  protected m_name: RegExp | undefined;

  constructor(name?: string | string[]) {
    if (name === undefined) {
      this.m_name = undefined;
    } else if (Array.isArray(name)) {
      const phraseArray = name.map((phrase) => phrase.trim());

      // Escape special characters in each phrase to ensure exact matches
      const escapedPhrases = phraseArray.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

      // Join the phrases into a regex pattern with OR (`|`) between them
      const pattern = `^(${escapedPhrases.join('|')})$`;

      // Create and return a case-insensitive regex
      this.m_name = new RegExp(pattern, 'i');
    } else {
      this.m_name = new RegExp(name, 'i');
    }
  }

  public get name() : RegExp | undefined {
    return this.m_name;
  }
}

export default Query;
