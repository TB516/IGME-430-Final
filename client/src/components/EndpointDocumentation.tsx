import { IDocExample } from "../models/IDocExample";
import { IDocumentationArgs } from "../models/IDocumentationArgs";

export const EndpointDocumentation = (props: IDocumentationArgs): React.JSX.Element => {
  return(
    <div>
      <section className="section">
        <h4>Query Params</h4>
        {
          props.queryParams ?
          <div>
            {
              Object.keys(props.queryParams).map((paramKey: string) => (
                <p>
                  <h5>{paramKey}</h5> - <span>{props.queryParams![paramKey]}</span>
                </p>
              ))
            }
          </div>
          :
          <span>None</span>
        }
      </section>
      <section className="section">
        <h4>Supported Body Formats</h4>
        {
          props.bodyFormats ?
          <div>
            {
              props.bodyFormats.map((format: string) => (
                <div>{format}</div>
              ))
            }
          </div>
          :
          <span>None</span>
        }
      </section>
      <section className="section">
        <h4>Body Params</h4>
        {
          props.bodyParams ?
          <div>
            {
              Object.keys(props.bodyParams).map((paramKey: string) => (
                <p>
                  <h5>{paramKey}</h5> - <span>{props.bodyParams![paramKey]}</span>
                </p>
              ))
            }
          </div>
          :
          <span>None</span>
        }
      </section>
      <section className="section">
        <h4>Returns</h4>
        <div>{props.returns}</div>
      </section>
      <section className="section">
        <h4>Examples</h4>
        <div>
        {
          props.examples.map((example: IDocExample) => (
            <section className="section">
              <div>
                Request: {example.request}
              </div>
              <br></br>
              {
                example.body ? 
                <div>
                  Body: {example.body}
                </div>
                :
                <div>Body: None</div>
              }
              <br></br>
              <div>
                Result: {example.result}
              </div>
            </section>
          ))
        }
        </div>
        
      </section>
    </div>
  );
};