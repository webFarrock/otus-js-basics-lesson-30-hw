import { ISelectedCityComponentState, SelectedCityComponent } from "./SelectedCityComponent";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));
describe("SelectedCityComponent", () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("render with initial state", async () => {
    const cityState: Partial<ISelectedCityComponentState> = {
      name: "someName",
      description: "someDescription",
      main: "someMain",
      lat: 14785645499,
      lon: 666687745457,
      icon: "someIcon",
    };
    new SelectedCityComponent(el, cityState);
    await sleep(0);

    expect(el.innerHTML).toEqual(expect.stringContaining("someName"));
    expect(el.innerHTML).toEqual(expect.stringContaining("someDescription"));
    expect(el.innerHTML).toEqual(expect.stringContaining("someMain"));

    const weatherImg = el.querySelector(".ico-image img") as HTMLImageElement;
    expect(weatherImg).toBeTruthy();
    expect(weatherImg.src).toEqual(expect.stringContaining(cityState.icon as string));

    const mapImg = el.querySelector(".map-image img") as HTMLImageElement;
    expect(mapImg).toBeTruthy();
    expect(mapImg.src).toEqual(expect.stringContaining(`${cityState.lat as number}`));
    expect(mapImg.src).toEqual(expect.stringContaining(`${cityState.lon as number}`));
  });
});
