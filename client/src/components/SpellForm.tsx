import { useState } from "react";
import { SpellFormArgs } from "../models/SpellFormArgs";

export const SpellForm = (props: SpellFormArgs) : React.JSX.Element => {
  const [spell, setSpell] = useState(props.spell);


  const handleFormChangeString = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
    const key = e.currentTarget.name;
    const val = e.currentTarget.value;

    setSpell({...spell, [key]: val});
  };
  const handleFormChangeNumber = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
    const key = e.currentTarget.name;
    const val = Number.parseInt(e.currentTarget.value);

    setSpell({...spell, [key]: val});
  };
  const handleFormReqChange = (e: React.FormEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name;
    const val = e.currentTarget.value;
    let index = -1;

    switch (key){
      case "intReq":
        index = 0;
        break;
      case "faithReq":
        index = 1;
        break;
      case "arcReq":
        index = 2;
        break;
    }

    const updatedReqs = spell.requires;
    updatedReqs[index].amount = Number.parseInt(val, 10);

    setSpell({...spell, requires:updatedReqs});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (Number.isNaN(spell.cost)){
      setSpell({...spell, cost: 0});
    }
    if (Number.isNaN(spell.slots)){
      setSpell({...spell, slots: 0});
    }

    console.log(spell);
  };

  return(
    <form onSubmit={handleSubmit}>
      <div id="formNameGroup">
        <label htmlFor="nameInput">Spell Name:</label>
        <input 
          id="nameInput" 
          type="text" 
          name="name" 
          value={spell.name} 
          onChange={handleFormChangeString} 
        />
      </div>

      <div id="formImageGroup">
        <label htmlFor="imageInput">Spell Image Link:</label>
        <input 
          id="imageInput" 
          type="text" 
          name="image" 
          value={spell.image} 
          onChange={handleFormChangeString} 
          disabled={(props.method === "GET" || props.method === "Head")} />
      </div>

      <div id="formDescriptionGroup">
        <label htmlFor="descriptionInput">Spell Description:</label>
        <input 
          id="descriptionInput" 
          type="text" 
          name="description" 
          value={spell.description} 
          onChange={handleFormChangeString} 
          disabled={(props.method === "GET" || props.method === "Head")} />
      </div>

      <div id="formTypeGroup">
        <label htmlFor="typeInput">Spell Type:</label>
        <select id="typeInput" name="type" value={spell.type} onChange={handleFormChangeString} disabled={(props.method === "GET" || props.method === "Head")}>
          <option value="" defaultChecked disabled></option>
          <option value="Sorceries">Sorceries</option>
          <option value="Incantations">Incantations</option>
        </select>
      </div>

      <div id="formCostGroup">
        <label htmlFor="costInput">Spell Cost:</label>
        <input 
          id="costInput" 
          type="number" 
          name="cost"
          value={spell.cost}
          onChange={handleFormChangeNumber} 
        />
      </div>

      <div id="formSlotsGroup">
        <label htmlFor="slotsInput">Number of slots needed:</label>
        <input 
          id="slotsInput" 
          type="number" 
          name="slots" 
          value={spell.slots} 
          onChange={handleFormChangeNumber} 
        />
      </div>

      <div id="formEffectsGroup">
        <label htmlFor="effectsInput">Spell Effects:</label>
        <input 
          id="effectsInput" 
          type="text" 
          name="effects" 
          value={spell.effects} 
          onChange={handleFormChangeString} 
          disabled={(props.method === "GET" || props.method === "Head")} />
      </div>
      
      <div id="formRequiresGroup">
        <div id="intReqGroup">
          <label htmlFor="intReqInput">Spell Int Requirement:</label>
          <input 
            id="intReqInput" 
            type="number" 
            name="intReq" 
            value={spell.requires[0].amount} 
            onChange={handleFormReqChange} 
            disabled={(props.method === "GET" || props.method === "Head")} />
        </div>

        <div id="faithReqGroup">
          <label htmlFor="faithReqInput">Spell Faith Requirement:</label>
          <input 
            id="faithReqInput" 
            type="number" 
            name="faithReq" 
            value={spell.requires[1].amount} 
            onChange={handleFormReqChange} 
            disabled={(props.method === "GET" || props.method === "Head")} />
        </div>

        <div id="arcReqGroup">
          <label htmlFor="arcReqInput">Spell Arcane Requirement:</label>
          <input 
            id="arcReqInput" 
            type="number" 
            name="arcReq" 
            value={spell.requires[2].amount} 
            onChange={handleFormReqChange} 
            disabled={(props.method === "GET" || props.method === "Head")} />
        </div>
      </div>

      <input type="submit" />
    </form>
  );
};
