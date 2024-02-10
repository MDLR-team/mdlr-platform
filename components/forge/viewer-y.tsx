import React from "react";

class ViewerY extends React.Component {
  private _viewer: any;
  private _container: any;

  // @ts-ignore
  props: Readonly<{
    onViewerCreated: (viewer: any) => void;
  }>;

  viewerEvent(event: any) {
    return new Promise((resolve, reject) => {
      const handler = (e: any) => {
        this._viewer.removeEventListener(event, handler);
        resolve(e);
      };

      this._viewer.addEventListener(event, handler);
    });
  }

  componentDidMount(): void {
    const Autodesk = (window as any).Autodesk;

    try {
      this._viewer = new Autodesk.Viewing.GuiViewer3D(this._container);

      this.props.onViewerCreated(this._viewer);
    } catch (error) {
      console.error("Viewer initialization failed:", error);
    }
  }

  componentWillUnmount(): void {
    try {
      if (this._viewer && this._viewer.finish) {
        this._viewer.finish();
        this._viewer = null;
      }
    } catch (error) {
      console.error("Viewer finish failed:", error);
    }
  }

  render() {
    if (this._viewer) {
      this._viewer.resize();
    }

    return (
      <div
        className="viewer"
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
        ref={(ref) => (this._container = ref)}
      />
    );
  }
}

export default ViewerY;
