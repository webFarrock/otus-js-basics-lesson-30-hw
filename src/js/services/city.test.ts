import axios from "axios";
import { getCurrentCity, GEO_JS_GET_PATH } from "./city";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("city", () => {
  it("getCurrentCity", async () => {
    const expectedCity = "London";
    const resp = { data: { city: expectedCity } };

    mockedAxios.get.mockResolvedValue(resp);
    const result = await getCurrentCity();
    expect(result).toEqual(expectedCity);
    expect(mockedAxios.get).toHaveBeenCalledWith(GEO_JS_GET_PATH);
  });
});
