import { ISpell, IStatReq } from "elden-ring-types";
import { SpellForm } from "../components/SpellForm";
import { EndpointSection } from "../components/EndpointSection";

export const Tester = () : React.JSX.Element => {
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
    <>
      <main>
        <EndpointSection 
          endpointName="/api/getSpells" 
          methods={["GET", "HEAD"]} 
          display={<SpellForm method="GET" spell={blankSpell} ></SpellForm>}>
        </EndpointSection>
      </main>
    </>
  );
};
