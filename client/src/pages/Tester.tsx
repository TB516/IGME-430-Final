import { ISpell, IStatReq } from "elden-ring-types";
import { SpellForm } from "../components/SpellForm";

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
        <SpellForm method={"POST"} spell={blankSpell} />
      </main>
    </>
  );
};
