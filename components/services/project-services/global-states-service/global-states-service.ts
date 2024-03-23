import CommentService, { Comment } from "../comment-service/comment-service";

class GlobalStatesService {
  private _isSettingsPanelOpen: boolean = false;
  private _isCommentsPanelOpen: boolean = false;
  private _isPaperOpen: boolean = false;
  private _isViewStateEditing: boolean = false;

  private _commentAdding: boolean = false;
  private _commentAwaitingSelection: boolean = false;
  private _commentPointSelected: boolean = false;
  private _commentAdjustingView: boolean = false;

  private _selectedCommentId: string | number | null = null;
  private _selectedCommentPosition: SelectedCommentPositionXY | null = null;
  private _selectedComment: Comment | null = null;

  private $setIsSettingsPanelOpen: any;
  private $setIsCommentsPanelOpen: any;
  private $setSelectedCommentId: any;
  private $setSelectedCommentPosition: any;
  private $setSelectedComment: any;
  private $setPaperOpen: any;
  private $setCommentAdding: any;
  private $setCommentAwaitingSelection: any;
  private $setCommentPointSelected: any;
  private $setCommentAdjustingView: any;
  private $setIsViewStateEditing: any;

  private _commentService: CommentService | undefined;

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

  public togglePaper(v?: boolean) {
    this._isPaperOpen = v !== undefined ? v : !this._isPaperOpen;
    this.$setPaperOpen(this._isPaperOpen);
  }

  public toggleCommentAdding(v?: boolean) {
    this._commentAdding = v !== undefined ? v : !this._commentAdding;

    if (!this._commentAdding) {
      this.toggleCommentAwaitingSelection(false);
      this.toggleCommentPointSelected(false);
      this.toggleCommentAdjustingView(false);
    }

    this.$setCommentAdding(v);
  }

  public toggleCommentAwaitingSelection(v?: boolean) {
    this._commentAwaitingSelection =
      v !== undefined ? v : !this._commentAwaitingSelection;

    this.$setCommentAwaitingSelection(v);
  }

  public toggleCommentPointSelected(v?: boolean) {
    this._commentPointSelected =
      v !== undefined ? v : !this._commentPointSelected;

    this.$setCommentPointSelected(v);
  }

  public toggleCommentAdjustingView(v?: boolean) {
    this._commentAdjustingView =
      v !== undefined ? v : !this._commentAdjustingView;

    this.$setCommentAdjustingView(v);
  }

  public toggleViewStateEditing(v?: boolean) {
    this._isViewStateEditing = v !== undefined ? v : !this._isViewStateEditing;

    this.$setIsViewStateEditing(this._isViewStateEditing);
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

    this._selectedComment = null;
    this.$setSelectedComment(this._selectedComment);
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
    this.$setSelectedComment = states.setSelectedComment;
    this.$setPaperOpen = states.setPaperOpen;
    this.$setCommentAdding = states.setCommentAdding;
    this.$setCommentAwaitingSelection = states.setCommentAwaitingSelection;
    this.$setCommentPointSelected = states.setCommentPointSelected;
    this.$setCommentAdjustingView = states.setCommentAdjustingView;
    this.$setIsViewStateEditing = states.setIsViewStateEditing;
  }

  public setInitalValues() {
    this.$setIsSettingsPanelOpen(this._isSettingsPanelOpen);
    this.$setIsCommentsPanelOpen(this._isCommentsPanelOpen);
    this.$setSelectedCommentId(this._selectedCommentId);
    this.$setSelectedCommentPosition(this._selectedCommentPosition);
    this.$setSelectedComment(this._selectedComment);

    this.$setPaperOpen(this._isPaperOpen);

    this.$setCommentAdding(this._commentAdding);
    this.$setCommentAwaitingSelection(this._commentAwaitingSelection);
    this.$setCommentPointSelected(this._commentPointSelected);
    this.$setCommentAdjustingView(this._commentAdjustingView);
    this.$setIsViewStateEditing(this._isViewStateEditing);
  }

  public get selectedCommentId() {
    return this._selectedCommentId;
  }

  public setSelectedComment(comment: Comment) {
    this._selectedComment = comment;
    this.$setSelectedComment({ ...this._selectedComment });
  }

  public provideCommentService(commentService: CommentService) {
    this._commentService = commentService;
  }
}

interface States {
  setIsSettingsPanelOpen: any;
  setIsCommentsPanelOpen: any;
  setSelectedCommentId: any;
  setSelectedCommentPosition: any;
  setSelectedComment: any;
  setPaperOpen: any;
  setCommentAdding: any;
  setCommentAwaitingSelection: any;
  setCommentPointSelected: any;
  setCommentAdjustingView: any;
  setIsViewStateEditing: any;
}

export interface SelectedCommentPositionXY {
  x: number;
  y: number;
}

export default GlobalStatesService;
