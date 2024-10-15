import { useState } from "react";
import { EndpointFormArgs } from "../models/EndpointSectionArgs";

export const EndpointSection = (props: EndpointFormArgs): React.JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return(
    <>
      <section className="hero is-info is-clickable" onClick={() => { setExpanded(!expanded); }}>
        <div className="hero-body">
          <div className="title">{props.endpointName}</div>
          <div className="subtitle">{props.methods.join(", ")}</div>
        </div>        
      </section>
      {expanded? 
        <section className="section">
          {props.displayElement}
        </section>  
        : 
        <></>
      }
      
    </>
  );
}