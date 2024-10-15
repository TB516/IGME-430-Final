import { ISpell, IStatReq } from "elden-ring-types";
import { SpellForm } from "./SpellForm";
import { EndpointTesterArgs } from "../models/EndpointTesterArgs";

export const EndpointTester = (props: EndpointTesterArgs): React.JSX.Element => {
  const blankStatReqs = [
    {
      name: "Intelligence",
      amount: 0,
    },
    {
      name: "Faith",
      amount: 0,
    },
    {
      name: "Arcane",
      amount: 0,
    }
  ] as IStatReq[];

  const blankSpell = {
    name: "",
    image: "",
    description: "",
    type: "",
    cost: 0,
    slots: 0,
    effects: "",
    requires: blankStatReqs,
  } as ISpell;

  return(
    <div className="columns">
      <div className="firstColumn">
        <SpellForm method={props.method} spell={blankSpell}></SpellForm>
      </div>
      <div className="secondColumn field">
        <label htmlFor="endpointResult" className="label">Endpoint Result</label>
        <textarea id="endpointResult" className="endpointResultArea" disabled></textarea>
      </div>
    </div>
  );
};
