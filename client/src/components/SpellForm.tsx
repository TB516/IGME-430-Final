import { SpellFormArgs } from "../models/SpellFormArgs";

export const SpellForm = (props: SpellFormArgs) : React.JSX.Element => {
  return(
    <form method={props.method}>
      <label htmlFor="spellName">Spell Name:</label>
      <input id="spellName" type="text" />
    </form>
  );
};
