import { shallow, configure } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { useExecutionDataView } from "@gooddata/sdk-ui";
import CalculationOverview from "../CalculationOverview";


configure({ adapter: new Adapter() });
jest.mock("@gooddata/sdk-ui", () => ({
    useExecutionDataView: jest.fn(),
}));
describe("<CalculationOverview />", () => {
    const mockUseExecutionDataView = useExecutionDataView as jest.MockedFunction<any>;
    // @ts-ignore
    test("It should mount", () => {
        mockUseExecutionDataView.mockImplementation(() => jest.fn());
        const component = shallow(
            <CalculationOverview filters={[]} />,
        );
        expect(component.length).toBe(1);
    });

});
