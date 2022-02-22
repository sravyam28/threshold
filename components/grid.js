import * as util from "../psychojs/src/util/index.js";
import * as visual from "../psychojs/src/visual/index.js";

import {
  degreesToPixels,
  pixelsToDegrees,
  getPixPerCm,
  getViewingDistanceCm,
  logger,
  XYPixOfXYDeg,
  XYDegOfXYPix,
} from "./utils.js";

/*
GRIDS. Participant page. 
For verification, provide optional grids over the whole screen. 
Each grid should be labeled  with numbers and units on the major axes.
The "cm" grid has cm units, origin in lower left, thick lines at
5 cm, and regular lines at 1 cm. The "deg" grid has deg units, 
origin at fixation, thick lines at 5 deg, and regular lines at 1 
deg. The "pix" grid has pix units, origin at lower left, thick 
lines at 500 pix, and regular lines at 100 pix.
*/
export class Grid {
  /**
   * Setup the grid.
   * @param {("px" | "cm" | "deg" | "none")} units Which type of grid should be shown.
   * @param {object} displayOptions Current values about the screen, trial, etc
   * @param {PsychoJS} psychoJS PsychoJS instance for the experiment
   */
  constructor(units, displayOptions, psychoJS) {
    this.units = units ? units : "none";
    this.displayOptions = displayOptions;
    this.psychoJS = psychoJS;
    this.visible = false;
    this.allGrids = {};
    this.lines = [];
    this.labels = [];
    this.opacity = 0.3;
    this.dimensions = this.psychoJS.window._size;
    this.gridkey = { key: ["`", "~"], code: "Backquote", keyCode: 192 };

    this.spawnGridStims();

    window.onkeydown = (e) => {
      if (
        e.code === this.gridkey.code ||
        this.gridkey.key.includes(e.key) ||
        e.keyCode === this.gridkey.keyCode
      )
        this.cycle();
    };
    // EXPERIMENTAL window.onresize = (e) => this.update();
    this._reflectVisibility();
  }

  /**
   * Re-spawn grids, given new `displayOptions` values (eg to reflect a new viewing distance)
   * and optionally change which is the current grid
   * @param {("px" | "cm" | "deg" | "none" | "disabled")} units The grid-type to set as current.
   * @param {object} displayOptions
   */
  update(units = undefined, displayOptions = undefined) {
    if (units) this.units = units;
    if (displayOptions) this.displayOptions = displayOptions;
    this.visible = this.units === "disabled" ? false : true;
    this._undraw();
    this.spawnGridStims();
    [this.lines, this.labels] = this.allGrids[this.units];
    this._reflectVisibility(); // Draw new stims if visible==true
  }

  /**
   * Grid ought to be shown.
   * Set `visibile` to reflect this desire, and call `_draw()` to draw the stims.
   */
  show() {
    this.visible = true;
    this._draw();
  }

  /**
   * Grid ought not be shown.
   * Set `visibile` to reflect this desire, and call `_undraw()` to remove the stims.
   */
  hide() {
    this.visible = false;
    this._undraw();
  }
  /**
   * Change to showing the grid corresponding to the next units
   * [Triggered on relevant keypress, ie tilde]
   */
  cycle() {
    this._undraw(true);
    this.units = this._cycleUnits(this.units);
    // this.spawnGridStims(this.units);
    [this.lines, this.labels] = this.allGrids[this.units];
    this._reflectVisibility();
  }

  /**
   * Generate the stims for the grid, and store in `this._allGridStims`.
   * Generates all three grids if now parameter is provided, or else just the provided unit's grid.
   * @param {("px" | "cm" | "deg" | "none")} units
   */
  spawnGridStims(units = undefined) {
    if (units) this.allGrids[units] = this._getGridStims(units);
    else
      for (const unit of ["px", "cm", "deg", "none", "disabled"]) {
        this.allGrids[unit] = this._getGridStims(unit);
      }
  }

  /**
   * Set autoDraw=false for all lines&labels of the current grid.
   */
  _undraw() {
    const stims = [...this.lines, ...this.labels];
    stims.forEach((s) => {
      if (s) s.setAutoDraw(false);
    });
  }

  /**
   * Set autoDraw=ture for all lines&labels of the current grid.
   */
  _draw() {
    const stims = [...this.lines, ...this.labels];
    stims.forEach((s) => {
      if (s) s.setAutoDraw(true);
    });
  }

  /**
   * Set autoDraw of all stims ot the current value of `visibile`,
   * ie `_draw` if `visible===true`, else `_undraw`
   */
  _reflectVisibility() {
    const stims = [...this.lines, ...this.labels];
    stims.forEach((s) => {
      if (s) s.setAutoDraw(this.visible);
    });
  }
  _getGridStims(units) {
    switch (units) {
      case "px":
        return this._getPixelGridStims();
      case "cm":
        return this._getCmGridStims();
      case "deg":
        return this._getDegGridStims();
      case "none":
        return [[], []];
      case "disabled":
        return [[], []];
    }
  }

  _getNumberOfGridLines = (units) => {
    this.dimensionsCm = this.dimensions.map(
      (dim) => dim / this.displayOptions.pixPerCm
    );
    // TODO generalize to fixation != [0,0]
    this.dimensionsDeg = [
      XYDegOfXYPix(
        [this.dimensions[0] / 2, this.displayOptions.fixationXYPix[1]],
        this.displayOptions
      )[0],
      XYDegOfXYPix(
        [this.displayOptions.fixationXYPix[0], this.dimensions[1] / 2],
        this.displayOptions
      )[1],
    ];
    // VERIFY why isn't this equivalent?
    // const oneCallDimensionsDeg = XYDegOfXYPix([this.dimensions[0]/2, this.dimensions[1]/2], this.displayOptions);
    switch (units) {
      case "px":
        return this.dimensions.map((dim) => Math.floor(dim / 100) + 1);
      case "cm":
        return this.dimensionsCm.map((dim) => Math.floor(dim / 1) + 1);
      case "deg":
        return this.dimensionsDeg.map((dim) => Math.floor(dim / 1) + 1);
    }
  };

  _gridStillValid(units) {
    // TODO implement checks to see if the stims need to be recalculated
    // so that grids can stay current with minimal computation
  }

  _cycleUnits(previousUnits) {
    switch (previousUnits) {
      case "none":
        return "px";
      case "px":
        return "cm";
      case "cm":
        return "deg";
      case "deg":
        return "none";
      case "disabled":
        return "disabled";
    }
    return "none";
  }

  _getPixelGridStims = () => {
    const spacing = 100;
    const origin = [
      -Math.round(this.dimensions[0] / 2),
      -Math.round(this.dimensions[1] / 2),
    ];
    const numberOfGridLines = this._getNumberOfGridLines("px");
    const [lines, labels] = [[], []];
    for (const region of ["vertical", "horizontal"]) {
      const nGridlines =
        region === "vertical" ? numberOfGridLines[0] : numberOfGridLines[1];
      for (let i = 0; i < nGridlines; i++) {
        const verticies =
          region === "vertical"
            ? [
                [
                  +(origin[0] + i * spacing),
                  +Math.round(this.dimensions[1] / 2),
                ],
                [
                  +(origin[0] + i * spacing),
                  -Math.round(this.dimensions[1] / 2),
                ],
              ]
            : [
                [
                  +Math.round(this.dimensions[0] / 2),
                  +(origin[1] + i * spacing),
                ],
                [
                  -Math.round(this.dimensions[0] / 2),
                  +(origin[1] + i * spacing),
                ],
              ];
        const pos =
          region === "vertical"
            ? [30 + origin[0] + i * spacing, origin[1] + 15]
            : [origin[0] + 25, 20 + origin[1] + i * spacing];
        const lineName = `${region}-grid-line-${i}`;
        lines.push(
          new visual.ShapeStim({
            name: lineName,
            win: this.psychoJS.window,
            units: "pix",
            lineWidth: i % 5 === 0 ? 5 : 2,
            lineColor: new util.Color("black"),
            fillColor: new util.Color("black"),
            opacity: this.opacity,
            vertices: verticies,
            depth: -1000,
            ori: 0.0,
            interpolate: false,
            size: 1,
          })
        );
        labels.push(
          new visual.TextStim({
            name: `${region}-grid-line-label-${i}`,
            win: this.psychoJS.window,
            text: `${spacing * i} pix`,
            font: "Arial",
            units: "pix",
            pos: pos,
            height: 15,
            ori: 0.0,
            color: new util.Color("black"),
            opacity: this.opacity,
            depth: 0.0,
          })
        );
      }
    }
    return [lines, labels];
  };

  _getCmGridStims = () => {
    const spacing = this.displayOptions.pixPerCm;
    const origin = [
      -Math.round(this.dimensions[0] / 2),
      -Math.round(this.dimensions[1] / 2),
    ];
    const numberOfGridLines = this._getNumberOfGridLines("cm");
    const [lines, labels] = [[], []];
    for (const region of ["vertical", "horizontal"]) {
      const nGridlines =
        region === "vertical" ? numberOfGridLines[0] : numberOfGridLines[1];
      for (let i = 0; i < nGridlines; i++) {
        const verticies =
          region === "vertical"
            ? [
                [
                  +(origin[0] + i * spacing),
                  +Math.round(this.dimensions[1] / 2),
                ],
                [
                  +(origin[0] + i * spacing),
                  -Math.round(this.dimensions[1] / 2),
                ],
              ]
            : [
                [
                  +Math.round(this.dimensions[0] / 2),
                  +(origin[1] + i * spacing),
                ],
                [
                  -Math.round(this.dimensions[0] / 2),
                  +(origin[1] + i * spacing),
                ],
              ];
        const pos =
          region === "vertical"
            ? [30 + origin[0] + i * spacing, origin[1] + 15]
            : [origin[0] + 25, 20 + origin[1] + i * spacing];
        lines.push(
          new visual.ShapeStim({
            name: `${region}-grid-line-${i}`,
            win: this.psychoJS.window,
            units: "pix",
            lineWidth: i % 5 === 0 ? 5 : 2,
            lineColor: new util.Color("blue"),
            fillColor: new util.Color("blue"),
            opacity: 1.0,
            vertices: verticies,
            depth: -1000,
            ori: 0.0,
            interpolate: false,
            size: 1,
          })
        );
        labels.push(
          new visual.TextStim({
            name: `${region}-grid-line-label-${i}`,
            win: this.psychoJS.window,
            text: `${i} cm`,
            font: "Arial",
            units: "pix",
            pos: pos,
            height: 15,
            ori: 0.0,
            color: new util.Color("black"),
            opacity: 1.0,
            depth: 0.0,
          })
        );
      }
    }
    return [lines, labels];
  };

  _getDegGridStims = () => {
    const origin = this.displayOptions.fixationXYPix;
    const numberOfGridLinesPerSide = this._getNumberOfGridLines("deg");
    const [lines, labels] = [[], []];
    const wPx = this.dimensions[0];
    const hPx = this.dimensions[1];
    const xPadding = 35;
    const yPadding = 10;
    for (const region of ["right", "left", "upper", "lower"]) {
      const nGridlines = ["right", "left"].includes(region)
        ? numberOfGridLinesPerSide[0]
        : numberOfGridLinesPerSide[1];
      for (let i = 0; i < nGridlines; i++) {
        let verticies, pos, x, y;
        switch (region) {
          case "right":
            x = XYPixOfXYDeg([i, origin[1]], this.displayOptions)[0];
            verticies = [
              [x, hPx / 2],
              [x, -hPx / 2],
            ];
            pos = [x + xPadding, -hPx / 2 + yPadding];
            logger;
            break;
          case "left":
            if (i === 0) continue;
            x = XYPixOfXYDeg([-i, origin[1]], this.displayOptions)[0];
            verticies = [
              [x, hPx / 2],
              [x, -hPx / 2],
            ];
            pos = [x + xPadding, -hPx / 2 + yPadding];
            break;
          case "upper":
            y = XYPixOfXYDeg([origin[0], i], this.displayOptions)[1];
            verticies = [
              [-wPx / 2, y],
              [wPx / 2, y],
            ];
            pos = [-wPx / 2 + xPadding, y + yPadding];
            break;
          case "lower":
            if (i === 0) continue;
            y = XYPixOfXYDeg([origin[0], -i], this.displayOptions)[1];
            verticies = [
              [-wPx / 2, y],
              [wPx / 2, y],
            ];
            pos = [-wPx / 2 + xPadding, y + yPadding];
            break;
        }
        logger("verticies", verticies);
        lines.push(
          new visual.ShapeStim({
            name: `${region}-grid-line-${i}`,
            win: this.psychoJS.window,
            units: "pix",
            lineWidth: i % 5 === 0 ? 5 : 2,
            lineColor: new util.Color("crimson"),
            fillColor: new util.Color("crimson"),
            opacity: this.opacity,
            vertices: verticies,
            depth: -1000,
            ori: 0.0,
            interpolate: false,
            size: 1,
          })
        );
        if (i % 5 === 0)
          labels.push(
            new visual.TextStim({
              name: `${region}-grid-line-label-${i}`,
              win: this.psychoJS.window,
              text: `${i} deg`,
              font: "Arial",
              units: "pix",
              pos: pos,
              height: Math.round(degreesToPixels(1, this.displayOptions)),
              ori: 0.0,
              color: new util.Color("black"),
              opacity: 1.0,
              depth: 0.0,
            })
          );
      }
    }
    return [lines, labels];
  };
}
