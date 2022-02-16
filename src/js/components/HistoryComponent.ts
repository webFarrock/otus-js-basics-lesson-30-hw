import { Component } from "../tools/Component";
import { IEvents } from "./IEvents";

export interface IHistoryComponentState {
  items: string[];
}
const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
const HISTORY_MAX_SIZE = 10;

export class HistoryComponent extends Component<IEvents, IHistoryComponentState> {
  get templateOptions() {
    return {
      history: this.state?.items || [],
    };
  }

  template = `
        <%if(history){%>
          <h2>История поиска</h2>
          <div class="list-group list-group--search-history">
              <%for(const item of history){%>
                <div class="js-history-city-name list-group-item list-group-item-action d-flex gap-3 py-3">
                    <div class="d-flex gap-2 w-100 justify-content-between">
                        <h6 class="mb-0"><%item%></h6>
                    </div>
                </div>
              <%}%> 
          </div>
        <%}%>
    `;

  protected onMount() {
    this.setState({ items: [...(this.state?.items || []), ...this.getSearchHistory()] });

    if (this.emitter) {
      this.emitter.on("city:change", (cityName: string): void => {
        this.addToHistory(cityName);
        this.setState({ items: this.getSearchHistory() });
      });
    }
  }

  addToHistory = (cityName: string): void => {
    const history = this.getSearchHistory();
    history.unshift(cityName);

    const newHistory = history.filter((value, index, self) => self.indexOf(value) === index).slice(0, HISTORY_MAX_SIZE);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  getSearchHistory = (): string[] => {
    let history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!history) {
      return [];
    }
    history = JSON.parse(history);

    return Array.isArray(history) ? history : [];
  };

  selectElem = (e: Event) => {
    if (this.emitter) {
      this.emitter.emit("city:change", (e.target as HTMLElement).innerText.trim());
    }
  };

  events = {
    "click@.js-history-city-name": this.selectElem,
  };
}
