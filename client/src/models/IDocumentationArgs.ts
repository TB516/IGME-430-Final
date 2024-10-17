import { IDocExample } from "./IDocExample";

export interface IDocumentationArgs{
  queryParams: Record<string, string> | undefined,
  bodyParams: Record<string, string> | undefined,
  bodyFormats: string[] | undefined,
  returns: string,
  examples: IDocExample[]
};