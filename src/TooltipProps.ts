import React, { ReactNode } from 'react';
import { GetContentTypes } from './ReactTooltip';

export interface Offset {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}

export type EventFunc = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;

export type Effect = 'float' | 'solid';
export type Place = 'top' | 'right' | 'bottom' | 'left';
export type Type = 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light';
export type Wrapper = 'div' | 'span';

export type TooltipProps = {
  uuid?: string;
  children?: ReactNode;
  // Placement of tooltip
  place?: Place;
  // Tooltip styling theme
  type?: Type;
  // Behavior of tooltip
  effect?: Effect;
  // Global tooltip offset, e.g., offset={{ top: 10, left: 5 }}
  offset?: Offset;
  padding?: string;
  multiline?: boolean;
  border?: boolean;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  arrowColor?: string;
  insecure?: boolean;
  class?: string;
  className?: string;
  id?: string;
  html?: boolean;
  delayHide?: number;
  delayUpdate?: number;
  delayShow?: number;
  event?: string;
  eventOff?: string;
  isCapture?: boolean;
  globalEventOff?: string;
  getContent?: GetContentTypes | GetContentTypes[];
  afterShow?: EventFunc;
  afterHide?: EventFunc;
  overridePosition?(
    position: { left: number; top: number },
    currentEvent: React.MouseEvent<HTMLElement, MouseEvent>,
    currentTarget: EventTarget,
    // node is the ref argument, and the wrapper
    // is restricted to: div | span
    refNode: null | HTMLDivElement | HTMLSpanElement,
    place: Place,
    desiredPlace: Place,
    effect: Effect,
    offset: Offset
  ): { left: number; top: number };
  disable?: boolean;
  scrollHide?: boolean;
  resizeHide?: boolean;
  wrapper?: Wrapper;
  bodyMode?: boolean;
  possibleCustomEvents?: string;
  possibleCustomEventsOff?: string;
  clickable?: boolean;
  // Aria role for the tooltip
  role?: string;
};
