class GlobalStatesService {
  private _isSettingsPanelOpen: boolean = false;
  private _isCommentsPanelOpen: boolean = false;

  private _selectedCommentId: string | number | null = null;
  private _selectedCommentPosition: SelectedCommentPositionXY | null = null;

  private $setIsSettingsPanelOpen: any;
  private $setIsCommentsPanelOpen: any;
  private $setSelectedCommentId: any;
  private $setSelectedCommentPosition: any;

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

  public selectComment(id: string | number) {
    this._selectedCommentId = id;
    this.$setSelectedCommentId(this._selectedCommentId);
  }

  public deselectComment() {
    this._selectedCommentId = null;
    this.$setSelectedCommentId(this._selectedCommentId);

    this._selectedCommentPosition = null;
    this.$setSelectedCommentPosition(this._selectedCommentPosition);
  }

  public updateSelectedCommentPosition(position: SelectedCommentPositionXY) {
    this._selectedCommentPosition = position;
    this.$setSelectedCommentPosition(this._selectedCommentPosition);
  }

  public provideStates(states: States) {
    this.$setIsSettingsPanelOpen = states.setIsSettingsPanelOpen;
    this.$setIsCommentsPanelOpen = states.setIsCommentsPanelOpen;
    this.$setSelectedCommentId = states.setSelectedCommentId;
    this.$setSelectedCommentPosition = states.setSelectedCommentPosition;
  }

  public setInitalValues() {
    this.$setIsSettingsPanelOpen(this._isSettingsPanelOpen);
    this.$setIsCommentsPanelOpen(this._isCommentsPanelOpen);
    this.$setSelectedCommentId(this._selectedCommentId);
    this.$setSelectedCommentPosition(this._selectedCommentPosition);
  }

  public get selectedCommentId() {
    return this._selectedCommentId;
  }
}

interface States {
  setIsSettingsPanelOpen: any;
  setIsCommentsPanelOpen: any;
  setSelectedCommentId: any;
  setSelectedCommentPosition: any;
}

export interface SelectedCommentPositionXY {
  x: number;
  y: number;
}

export default GlobalStatesService;
