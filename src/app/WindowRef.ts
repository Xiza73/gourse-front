import { Injectable } from '@angular/core';

function _window() : any {
  // return the global native browser window object
  return window;
}

function _stripe() : any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowRef {
  get nativeWindow() : any {
    return _window();
  }

  stripe = (_: string) => _stripe()
}
