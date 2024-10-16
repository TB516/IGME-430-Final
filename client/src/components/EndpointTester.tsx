import { ISpell, IStatReq } from "elden-ring-types";
import { SpellForm } from "./SpellForm";
import { IEndpointTesterArgs } from "../models/IEndpointTesterArgs";
import React, { ChangeEvent, useState } from "react";

export const EndpointTester = (props: IEndpointTesterArgs): React.JSX.Element => {
  const [endpointContent, setEndpointContent] = useState('');
  const [requestMethod, setRequestMethod] = useState(props.methods[0]);
  
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
    cost: NaN,
    slots: NaN,
    effects: "",
    requires: blankStatReqs,
  } as ISpell;

  const handleClick = async (response: Promise<Response>) => {
    const responseData = await response;
    const jsonString = await responseData.text();

    setEndpointContent(
      `
      Status: ${responseData.status}\n
      Content-Length: ${responseData.headers.get('Content-Length')}\n
      ${requestMethod !== "HEAD"? `Response: ${jsonString}` : ""}
      `
    );
  };

  const handleRequestMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRequestMethod(e.currentTarget.value);
  };

  return(
    <div className="columns">
      <div className="firstColumn">
        <SpellForm endpoint={props.endpoint} method={requestMethod} spell={blankSpell} callback={handleClick}></SpellForm>
      </div>
      <div className="secondColumn field">
        <div>
          {
            props.methods.map((method: string, index: number) => (
              <label>
                {method}
                <input id={`${method}Radio`} type="radio" name="methodRadio" value={method} onChange={handleRequestMethodChange} defaultChecked={index === 0}></input>
              </label>
            ))
          }
        </div>
        <div>
          <label htmlFor="endpointResult" className="label">Endpoint Result</label>
          <textarea id="endpointResult" value={endpointContent}></textarea>
        </div>
      </div>
    </div>
  );
};
