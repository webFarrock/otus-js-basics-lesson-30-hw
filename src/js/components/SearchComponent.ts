import { Component } from "../tools/Component";
import { IEvents } from "./IEvents";

export interface ISearchComponentState {
  inputValue: string;
}

const MIN_INPUT_LENGTH = 3;
const INPUT_SELECTOR = ".js-search-input";
const SUBMIT_SELECTOR = ".js-search-submit";

export class SearchComponent extends Component<IEvents, ISearchComponentState> {
  get templateOptions() {
    return {
      inputValue: this.state?.inputValue || "",
      isBtnDisabled: this.isBtnDisabled(),
    };
  }

  template = `
        <div class="row">
            <h2>Введите адрес или город</h2>
            <div class="col pb-5">
                <input value="<%inputValue%>" type="text" autofocus class="js-search-input form-control form-control--search-input float-start">
                <input class="js-search-submit btn btn-primary float-end" type="submit" 
                    <%if(isBtnDisabled){%>disabled<%}%>
                >
            </div>
        </div>
    `;

  private updFocusOnInput(): void {
    const reRendered = document.querySelector(INPUT_SELECTOR) as HTMLInputElement;
    reRendered.selectionStart = reRendered.selectionEnd = reRendered.value.length;
    reRendered.focus();
  }

  private updInputValue = (e: Event): void => {
    const inputElem = e.target as HTMLInputElement;
    this.setState({ inputValue: inputElem.value });
    this.updFocusOnInput();
  };

  private submit = (): void => {
    const input = document.querySelector(INPUT_SELECTOR) as HTMLInputElement;
    this.emitter?.emit("city:change", input.value);

    input.value = "";
    this.setState({ inputValue: "" });
    this.updFocusOnInput();
  };

  events = {
    [`click@${SUBMIT_SELECTOR}`]: this.submit,
    [`keyup@${INPUT_SELECTOR}`]: this.updInputValue,
  };

  private isBtnDisabled(): boolean {
    if (this.state?.inputValue && this.state?.inputValue.length) {
      return this.state.inputValue.length < MIN_INPUT_LENGTH;
    }

    return true;
  }
}
