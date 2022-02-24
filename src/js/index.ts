import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchComponent } from "./components/SearchComponent";
import { HistoryComponent, IHistoryComponentState } from "./components/HistoryComponent";
import { ISelectedCityComponentState, SelectedCityComponent } from "./components/SelectedCityComponent";
import { createNanoEvents } from "nanoevents";
import { getCurrentCity } from "./services/city";
import { IEvents } from "./components/IEvents";

const emitter = createNanoEvents<IEvents>();

const searchComponentEl = document.getElementById("search-component") as HTMLElement;
new SearchComponent(searchComponentEl, {}, emitter);

const selectedCityComponentEl = document.getElementById("selected-city-component") as HTMLElement;
const cityState: Partial<ISelectedCityComponentState> = {};
new SelectedCityComponent(selectedCityComponentEl, cityState, emitter);

const historyComponentEl = document.getElementById("history-component") as HTMLElement;
const historyState: Partial<IHistoryComponentState> = {};
new HistoryComponent(historyComponentEl, historyState, emitter);

getCurrentCity().then((cityName) => {
  if (cityName) {
    emitter.emit("city:change", cityName);
  }
});
