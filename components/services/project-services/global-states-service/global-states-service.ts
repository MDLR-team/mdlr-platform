class GlobalStatesService {
  private _isSettingsPanelOpen: boolean = false;
  private _isCommentsPanelOpen: boolean = false;

  private $setIsSettingsPanelOpen: any;
  private $setIsCommentsPanelOpen: any;

  constructor() {}

  public toggleSettingsPanel(v?: boolean) {
    this._isSettingsPanelOpen =
      v !== undefined ? v : !this._isSettingsPanelOpen;

    this.$setIsSettingsPanelOpen(this._isSettingsPanelOpen);
  }

  public toggleCommentsPanel(v?: boolean) {
    this._isCommentsPanelOpen =
      v !== undefined ? v : !this._isCommentsPanelOpen;

    this.$setIsCommentsPanelOpen(this._isCommentsPanelOpen);
  }

  public provideStates(states: States) {
    this.$setIsSettingsPanelOpen = states.setIsSettingsPanelOpen;
    this.$setIsCommentsPanelOpen = states.setIsCommentsPanelOpen;
  }

  public setInitalValues() {
    this.$setIsSettingsPanelOpen(this._isSettingsPanelOpen);
    this.$setIsCommentsPanelOpen(this._isCommentsPanelOpen);
  }
}

interface States {
  setIsSettingsPanelOpen: any;
  setIsCommentsPanelOpen: any;
}

export default GlobalStatesService;
