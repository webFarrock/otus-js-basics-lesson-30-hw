import { ISearchComponentState, SearchComponent } from "./SearchComponent";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

describe("SearchComponent", () => {
  let el: HTMLDivElement;

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("render with initial state btn enabled", async () => {
    const searchState: Partial<ISearchComponentState> = {
      inputValue: "some input value for enabled button",
    };

    new SearchComponent(el, searchState);
    await sleep(10);

    const input = el.querySelector("input[type='text']") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toEqual(searchState.inputValue as string);

    const btn = el.querySelector("input[type=submit]") as HTMLInputElement;
    expect(btn).toBeTruthy();
    expect(btn.disabled).toBeFalsy();
  });

  it("render with initial state btn disabled", async () => {
    const searchState: Partial<ISearchComponentState> = {
      inputValue: "",
    };

    const searchComponent = new SearchComponent(el, searchState);
    await sleep(0);

    const input = el.querySelector("input[type=text]") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toEqual(searchState.inputValue as string);

    const btn = el.querySelector("input[type=submit]") as HTMLInputElement;
    expect(btn).toBeTruthy();
    expect(btn.disabled).toBeTruthy();
  });
});
