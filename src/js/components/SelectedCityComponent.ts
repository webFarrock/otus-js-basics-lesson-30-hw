import { Component } from "../tools/Component";
import { createIconImage, getWeather } from "../services/weather";
import { createMapImage } from "../services/map";
import { IEvents } from "./IEvents";

export interface ISelectedCityComponentState {
  name: string;
  description: string;
  main: string;
  lat: number;
  lon: number;
  icon: string;
}

export class SelectedCityComponent extends Component<IEvents, ISelectedCityComponentState> {
  get templateOptions() {
    return {
      name: this.state?.name,
      main: this.state?.main,
      description: this.state?.description,
      mapImg: this.getMapImg(),
    };
  }

  template = `
        <%if(name){%>
            <h2>Выбранный город</h2>
            <p>
                <%name%>, <%main%> <%description%>
                ${this.getWeatherImg()}
            </p>
            <div><%mapImg%></div>
        <%}else{%>
            <h2>Город не выбран</h2>
        <%}%>
    `;

  getWeatherImg(): string {
    if (this.state?.icon) {
      return createIconImage(this.state.icon).outerHTML;
    }
    return "";
  }

  getMapImg(): string {
    if (this.state?.lat && this.state.lon) {
      return createMapImage(this.state.lat, this.state.lon).outerHTML;
    }
    return "";
  }

  protected onMount() {
    if (this.emitter) {
      this.emitter.on("city:change", (cityName: string): void => {
        if (cityName.length) {
          getWeather(cityName).then((weather) => {
            if (!weather) {
              alert(`Погода для "${cityName}" не найдена`);
              this.setState(Object.assign({}, this.getCleanState(), { name: cityName }));
              return;
            }
            const { name } = weather;
            const { description, icon, main } = weather.weather[0];
            const { lat, lon } = weather.coord;

            this.setState({ name, description, main, icon, lat, lon });
          });
        }
      });
    }
  }

  private getCleanState = () => {
    return {
      name: "",
      description: "",
      main: "",
      lat: 0,
      lon: 0,
      icon: "",
    };
  };
}
