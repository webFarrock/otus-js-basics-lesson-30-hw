import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SearchComponent } from "./components/SearchComponent";
import { HistoryComponent, iHistoryComponentState } from "./components/HistoryComponent";
import { iSelectedCityComponentState, SelectedCityComponent } from "./components/SelectedCityComponent";
import { createNanoEvents, Emitter } from "nanoevents";
import { getCurrentCity } from "./services/city";
const emitter = createNanoEvents();

const searchComponentEl = document.getElementById("search-component") as HTMLElement;
const searchComponent = new SearchComponent(searchComponentEl, {}, emitter);

const selectedCityComponentEl = document.getElementById("selected-city-component") as HTMLElement;
const cityState: Partial<iSelectedCityComponentState> = {
  /*
  forecast: "test",
  name: "some city name",
  lat: 40,
  lon: 40,
  icon: "04d",
   */
};
const selectedCityComponent = new SelectedCityComponent(selectedCityComponentEl, cityState, emitter);

const historyComponentEl = document.getElementById("history-component") as HTMLElement;
const historyState: Partial<iHistoryComponentState> = {
  // items: ["one", "two", "three"],
};
const historyComponent = new HistoryComponent(historyComponentEl, historyState, emitter);

getCurrentCity().then((cityName) => {
  if (cityName) {
    emitter.emit("changeCity", cityName);
  }
});
