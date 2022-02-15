import { Component } from "../tools/Component";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface iSearchComponentState {
  inputValue: string;
}

const MIN_INPUT_LENGTH = 3;
const INPUT_SELECTOR = ".js-search-input";
const SUBMIT_SELECTOR = ".js-search-submit";

export class SearchComponent extends Component<iSearchComponentState> {
  updFocusOnInput = (): void => {
    const reRendered = document.querySelector(INPUT_SELECTOR) as HTMLInputElement;
    reRendered.selectionStart = reRendered.selectionEnd = reRendered.value.length;
    reRendered.focus();
  };
  updInputValue = (e: Event): void => {
    const inputElem = e.target as HTMLInputElement;
    this.setState({ inputValue: inputElem.value });
    this.updFocusOnInput();
  };

  submit = (): void => {
    const input = document.querySelector(INPUT_SELECTOR) as HTMLInputElement;
    this.emitter?.emit("changeCity", input.value);

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

  render() {
    return `
        <div class="row">
            <h2>Введите адрес или город</h2>
            <div class="col pb-5">
                <input value="${
                  this.state?.inputValue || ""
                }" type="text" autofocus class="js-search-input form-control form-control--search-input float-start">
                <input class="js-search-submit btn btn-primary float-end" type="submit" ${
                  this.isBtnDisabled() ? "disabled" : "fake"
                } >
            </div>
        </div>
    `;
  }
}
