import { EndpointDocumentation } from "../components/EndpointDocumentation";
import { EndpointSection } from "../components/EndpointSection";

export const Documentation = () : React.JSX.Element => {
  return(
    <main>
      <EndpointSection
      endpointName="api/spells"
      methods={['GET', 'HEAD']}
      displayElement={
        <EndpointDocumentation
        queryParams={{
          "name (optional)": "Spell name to filter by.",
          "cost (optional)": "Cost of spell to filter by.",
          "slots (optional)": "Number of slots a spell consumes to filter by."
        }}
        bodyFormats={undefined}
        bodyParams={undefined}
        returns="
        (GET) Stringified JSON array of spell objects. 
        (HEAD) Content length of get.
        400 (Invalid Query Param).
        415 (Method Not Supported).
        "
        examples={[
          {
            request: "/api/spells",
            body: undefined,
            result: "[\"spell1\", \"spell2\"...]",
          },
          {
            request: "/api/spells?name=spell3",
            body: undefined,
            result: "[\"spell3\", \"spell31\"...]",
          },
          {
            request: "/api/spells?cost=fish",
            body: undefined,
            result: "400 (Cost and Slots must be numbers)",
          },
        ]}
        >
        </EndpointDocumentation>
      }
      >
      </EndpointSection>

      <EndpointSection
      endpointName="api/spells/sorceries"
      methods={['GET', 'HEAD', 'POST', 'DELETE']}
      displayElement={
        <EndpointDocumentation
        queryParams={{
          "name (optional)": "Sorcery name to filter by.",
          "cost (optional)": "Cost of sorcery to filter by.",
          "slots (optional)": "Number of slots a sorcery consumes to filter by."
        }}
        bodyFormats={["application/json", "application/x-www-form-urlencoded"]}
        bodyParams={{
          "name": "Type: string - Name of the spell.",
          "image": "Type: string - Image link for the spell.",
          "description": "Type: string - Description of the spell.",
          "type": "Type: string - Type of the spell (should be same as endpoint type).",
          "cost": "Type: number - Cost of the spell.",
          "slots": "Type: number - Number of slots the spell takes up.",
          "effects": "Type: string - Effects the spell has.",
          "requires": "Type: Array - Array of objects, one for each of the three stats (Intelligence, Faith, Arcane) with each object storing the stat name and amount."
        }}
        returns="
        (GET) Stringified JSON array of spell objects, 400 if bad query params.
        (HEAD) Content length of GET.
        (POST) JSON object containing the posted spell, empty body if updating, 400 if invalid format/data.
        415 (Method Not Supported).
        "
        examples={[
          {
            request: "/api/sorceries",
            body: undefined,
            result: "[\"sorcery1\", \"sorcery2\"...]",
          },
          {
            request: "/api/sorceries?name=sorcery3",
            body: undefined,
            result: "[\"sorcery3\", \"sorcery31\"...]",
          },
          {
            request: "/api/sorceries?cost=fish",
            body: undefined,
            result: "400 (Cost and Slots must be numbers)",
          },
          {
            request: "api/spells/sorceries",
            body: '{"name": "Aspects Of The Crucible: Horns 2","image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}',
            result: '201 Created, body: {"name": "Aspects Of The Crucible: Horns 2","image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}'
          },
          {
            request: "api/spells/sorceries (updating)",
            body: '{"name": "Aspects Of The Crucible: Horns 2","image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}',
            result: '204 Updated'
          },
          {
            request: "api/spells/sorceries",
            body: '{image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}',
            result: '400 Error (Missing name)'
          },
          {
            request: "api/spells/sorceries",
            body: 'Application not sent as urlencoded or json',
            result: '415 Error (Unsupported media type)'
          },
        ]}
        >
        </EndpointDocumentation>
      }
      >
      </EndpointSection>

      <EndpointSection
      endpointName="api/spells/incantations"
      methods={['GET', 'HEAD', 'POST', 'DELETE']}
      displayElement={
        <EndpointDocumentation
        queryParams={{
          "name (optional)": "Incantation name to filter by.",
          "cost (optional)": "Cost of Incantation to filter by.",
          "slots (optional)": "Number of slots a Incantation consumes to filter by."
        }}
        bodyFormats={["application/json", "application/x-www-form-urlencoded"]}
        bodyParams={{
          "name": "Type: string - Name of the spell.",
          "image": "Type: string - Image link for the spell.",
          "description": "Type: string - Description of the spell.",
          "type": "Type: string - Type of the spell (should be same as endpoint type).",
          "cost": "Type: number - Cost of the spell.",
          "slots": "Type: number - Number of slots the spell takes up.",
          "effects": "Type: string - Effects the spell has.",
          "requires": "Type: Array - Array of objects, one for each of the three stats (Intelligence, Faith, Arcane) with each object storing the stat name and amount."
        }}        
        returns="
        (GET) Stringified JSON array of spell objects, 400 if bad query params.
        (HEAD) Content length of GET.
        (POST) JSON object containing the posted spell, empty body if updating, 400 if invalid format/data.
        415 (Method Not Supported).
        "        
        examples={[
          {
            request: "/api/incantations",
            body: undefined,
            result: "[\"Incantation1\", \"Incantation2\"...]",
          },
          {
            request: "/api/Incantations?name=incantation3",
            body: undefined,
            result: "[\"Incantation3\", \"Incantation31\"...]",
          },
          {
            request: "/api/incantations?cost=fish",
            body: undefined,
            result: "400 (Cost and Slots must be numbers)",
          },
          {
            request: "api/spells/incantations",
            body: '{"name": "Aspects Of The Crucible: Horns 2","image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}',
            result: '201 Created, body: {"name": "Aspects Of The Crucible: Horns 2","image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}'
          },
          {
            request: "api/spells/incantations (updating)",
            body: '{"name": "Aspects Of The Crucible: Horns 2","image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}',
            result: '204 Updated'
          },
          {
            request: "api/spells/incantations",
            body: '{image": "https://eldenring.fanapis.com/images/incantations/17f695ad891l0hynrxcposdnx7gy9h.png","description": "One of the ancient Erdtree incantations.","type": "Incantations","cost": 30,"slots": 1,"effects": "creates shoulder horn to gore foes from a low stance.","requires": [{"name": "Intelligence","amount": 0},{"name": "Faith","amount": 27},{"name": "Arcane","amount": 0}]}',
            result: '400 Error (Missing name)'
          },
          {
            request: "api/spells/incantations",
            body: 'Application not sent as urlencoded or json',
            result: '415 Error (Unsupported media type)'
          },
        ]}
        >
        </EndpointDocumentation>
      }
      >
      </EndpointSection>

      <EndpointSection
      endpointName="api/spells/reqs"
      methods={['GET', 'HEAD']}
      displayElement={
        <EndpointDocumentation
        queryParams={{
          "name (optional)": "Spell name to filter by.",
          "cost (optional)": "Cost of spell to filter by.",
          "slots (optional)": "Number of slots a spell consumes to filter by."
        }}
        bodyFormats={undefined}
        bodyParams={undefined}
        returns="
        (GET) Stringified JSON array of objects containing names and stat requirements as objects. 
        (HEAD) Content length of get.
        400 (Invalid Query Param).
        415 (Method Not Supported).
        "
        examples={[
          {
            request: "/api/spells/reqs",
            body: undefined,
            result: "[{name: \"name\", requires: [{ name: \"Int\", amount: 1 }]}...]",
          },
          {
            request: "/api/spells/reqs?name=spell3",
            body: undefined,
            result: "[{name: \"name3\", requires: [{ name31: \"Int\", amount: 1 }]}...]",
          },
          {
            request: "/api/spells/reqs?cost=fish",
            body: undefined,
            result: "400 (Cost and Slots must be numbers)",
          },
        ]}
        >
        </EndpointDocumentation>
      }
      >
      </EndpointSection>
    </main>
  );
};
