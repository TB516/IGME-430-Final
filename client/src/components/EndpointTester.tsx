import { ISpell, IStatReq } from "elden-ring-types";
import { SpellForm } from "./SpellForm";
import { IEndpointTesterArgs } from "../models/IEndpointTesterArgs";

export const EndpointTester = (props: IEndpointTesterArgs): React.JSX.Element => {
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

  const handleClick = () => {

  };

  return(
    <div className="columns">
      <div className="firstColumn">
        <SpellForm method={props.method} spell={blankSpell} callback={handleClick}></SpellForm>
      </div>
      <div className="secondColumn field">
        <label htmlFor="endpointResult" className="label">Endpoint Result</label>
        <textarea id="endpointResult" className="endpointResultArea" disabled></textarea>
      </div>
    </div>
  );
};
