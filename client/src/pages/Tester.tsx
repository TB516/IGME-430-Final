import { EndpointSection } from "../components/EndpointSection";
import { EndpointTester } from "../components/EndpointTester";

export const Tester = () : React.JSX.Element => {
  
  return(
    <>
      <main>
        <EndpointSection 
          endpointName="/api/spells" 
          methods={["GET", "HEAD"]} 
          displayElement={<EndpointTester methods={["GET", "HEAD"]}></EndpointTester>}>
        </EndpointSection>
        <br></br>
        <EndpointSection 
          endpointName="/api/spells/reqs" 
          methods={["GET", "HEAD"]} 
          displayElement={<EndpointTester methods={["GET", "HEAD"]}></EndpointTester>}>
        </EndpointSection>
        <br></br>
        <EndpointSection 
          endpointName="/api/spells/sorceries" 
          methods={["GET", "HEAD"]} 
          displayElement={<EndpointTester methods={["GET", "HEAD"]}></EndpointTester>}>
        </EndpointSection>
        <br></br>
        <EndpointSection 
          endpointName="/api/spells/incantations" 
          methods={["GET", "HEAD"]} 
          displayElement={<EndpointTester methods={["GET", "HEAD"]}></EndpointTester>}>
        </EndpointSection>
        <br></br>
        <EndpointSection 
          endpointName="/api/spells/sorceries" 
          methods={["POST"]} 
          displayElement={<EndpointTester methods={["POST"]}></EndpointTester>}>
        </EndpointSection>
        <br></br>
        <EndpointSection 
          endpointName="/api/spells/incantations" 
          methods={["POST"]}
          displayElement={<EndpointTester methods={["POST"]}></EndpointTester>}>
        </EndpointSection>
      </main>
    </>
  );
};
