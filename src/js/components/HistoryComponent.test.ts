import { createNanoEvents } from "nanoevents";
import { IEvents } from "./IEvents";
import { HistoryComponent, IHistoryComponentState } from "./HistoryComponent";

const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

describe("HistoryComponent", () => {
  let el: HTMLDivElement;
  const emitter = createNanoEvents<IEvents>();

  beforeEach(() => {
    el = document.createElement("div");
    localStorage.clear();
  });

  it("render component with initial state", async () => {
    const items = ["element one", "element two", "element three"];
    const historyState: Partial<IHistoryComponentState> = { items };
    new HistoryComponent(el, historyState, emitter);

    await sleep(0);

    expect(el.querySelectorAll(".js-history-city-name")).toHaveLength(items.length);
    items.forEach((item) => {
      expect(el.innerHTML).toEqual(expect.stringContaining(item));
    });
  });

  it("reacts on change city", async () => {
    const items = ["new city one", "new city two"];
    const historyState: Partial<IHistoryComponentState> = {};
    new HistoryComponent(el, historyState, emitter);
    await sleep(0);

    expect(el.querySelectorAll(".js-history-city-name")).toHaveLength(0);

    items.forEach((item) => emitter.emit("city:change", item));

    await sleep(0);

    expect(el.querySelectorAll(".js-history-city-name")).toHaveLength(items.length);
    items.forEach((item) => {
      expect(el.innerHTML).toEqual(expect.stringContaining(item));
    });
  });
});
