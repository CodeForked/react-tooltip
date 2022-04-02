/* eslint-disable no-unused-vars, dot-notation */
import React from 'react';
import PropTypes from 'prop-types';
import CONSTANT from './constant';

/* Decorators */
import { bodyListener, findCustomEvents, getBody } from './decorators/bodyMode';
import { getMutationObserverClass } from './decorators/trackRemoval';

/* Utils */
import getPosition from './utils/getPosition';
import getTipContent from './utils/getTipContent';
import { parseAria } from './utils/aria';
import nodeListToArray from './utils/nodeListToArray';
import { generateUUID } from './utils/uuid';

/* CSS */
import baseCss from './index.scss';
import { generateTooltipStyle } from './decorators/styler';
import { BodyModeListener, CustomColor } from './types';
import { ReactTooltipProps } from './ReactTooltipProps';
import { checkStatus } from './decorators/customEvent';

const dispatchGlobalEvent = (eventName, opts) => {
  // Compatible with IE
  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
  // @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
  let event;

  if (typeof window.CustomEvent === 'function') {
    event = new window.CustomEvent(eventName, { detail: opts });
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, false, true, opts);
  }

  window.dispatchEvent(event);
};

const customListeners = {
  id: '9b69f92e-d3fe-498b-b1b4-c5e63a51b0cf',
  set(target, event, listener) {
    if (this.id in target) {
      const map = target[this.id];
      map[event] = listener;
    } else {
      // this is workaround for WeakMap, which is not supported in older browsers, such as IE
      Object.defineProperty(target, this.id, {
        configurable: true,
        value: { [event]: listener }
      });
    }
  },
  get(target, event) {
    const map = target[this.id];
    if (map !== undefined) {
      return map[event];
    }
  }
};

type TooltipState = {
  uuid: string;
  place: string;
  desiredPlace: string;
  type: string;
  effect: string;
  show: boolean;
  border: boolean;
  customColors: CustomColor;
  offset: string | object;
  padding: string;
  extraClass: string;
  html: boolean;
  delayHide: number;
  delayUpdate: number;
  delayShow: number;
  event: string;
  eventOff: string;
  currentEvent?: React.MouseEvent<HTMLElement>; // Current mouse event
  currentTarget: HTMLElement | EventTarget | null; // Current target of mouse event
  ariaProps: any; // aria- and role attributes
  isEmptyTip: boolean;
  disable: boolean;
  possibleCustomEvents: string;
  possibleCustomEventsOff: string;
  originTooltip?: string;
  isMultiline: boolean;
};

type GetContentFn = {
  (data: string): any;
};

export type GetContentTypes = GetContentFn | string;

class ReactTooltip extends React.Component<ReactTooltipProps, TooltipState> {
  mount: boolean;
  delayShowLoop?: NodeJS.Timeout;
  delayHideLoop?: NodeJS.Timeout;
  delayReshow?: NodeJS.Timeout;
  intervalUpdateContent?: NodeJS.Timer;
  tooltipRef?: HTMLElement;
  removalTracker?: MutationObserver;
  bodyModeListeners: BodyModeListener;

  static get propTypes() {
    return {
      uuid: PropTypes.string,
      children: PropTypes.any,
      place: PropTypes.string,
      type: PropTypes.string,
      effect: PropTypes.string,
      offset: PropTypes.object,
      padding: PropTypes.string,
      multiline: PropTypes.bool,
      border: PropTypes.bool,
      textColor: PropTypes.string,
      backgroundColor: PropTypes.string,
      borderColor: PropTypes.string,
      arrowColor: PropTypes.string,
      insecure: PropTypes.bool,
      class: PropTypes.string,
      className: PropTypes.string,
      id: PropTypes.string,
      html: PropTypes.bool,
      delayHide: PropTypes.number,
      delayUpdate: PropTypes.number,
      delayShow: PropTypes.number,
      event: PropTypes.string,
      eventOff: PropTypes.string,
      isCapture: PropTypes.bool,
      globalEventOff: PropTypes.string,
      getContent: PropTypes.any,
      afterShow: PropTypes.func,
      afterHide: PropTypes.func,
      overridePosition: PropTypes.func,
      disable: PropTypes.bool,
      scrollHide: PropTypes.bool,
      resizeHide: PropTypes.bool,
      wrapper: PropTypes.string,
      bodyMode: PropTypes.bool,
      possibleCustomEvents: PropTypes.string,
      possibleCustomEventsOff: PropTypes.string,
      clickable: PropTypes.bool
    };
  }

  static defaultProps = {
    insecure: true,
    resizeHide: true,
    wrapper: 'div',
    clickable: false
  };

  static supportedWrappers = ['div', 'span'];

  static displayName = 'ReactTooltip';

  constructor(props: ReactTooltipProps) {
    super(props);

    this.state = {
      uuid: props.uuid || generateUUID(),
      place: props.place || 'top', // Direction of tooltip
      desiredPlace: props.place || 'top',
      type: props.type || 'dark', // Color theme of tooltip
      effect: props.effect || 'float', // float or fixed
      show: false,
      border: false,
      customColors: {},
      offset: {},
      padding: props.padding,
      extraClass: '',
      html: false,
      delayUpdate: 0,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null, // Current mouse event
      currentTarget: null, // Current target of mouse event
      ariaProps: parseAria(props), // aria- and role attributes
      isEmptyTip: false,
      disable: false,
      possibleCustomEvents: props.possibleCustomEvents || '',
      possibleCustomEventsOff: props.possibleCustomEventsOff || '',
      originTooltip: null,
      isMultiline: false
    };

    this.bind([
      'showTooltip',
      'updateTooltip',
      'hideTooltip',
      'hideTooltipOnScroll',
      'getTooltipContent',
      'globalRebuild',
      'globalShow',
      'globalHide',
      'onWindowResize',
      'mouseOnToolTip'
    ]);

    this.mount = true;
    this.delayShowLoop = null;
    this.delayHideLoop = null;
    this.delayReshow = null;
    this.intervalUpdateContent = null;
    console.log('constructor');
  }

  /**
   * For unify the bind and unbind listener
   */
  bind(methodArray: any[]): void {
    methodArray.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  bindRemovalTracker() {
    const MutationObserver = getMutationObserverClass();
    if (MutationObserver == null) return;

    const observer = new MutationObserver((mutations) => {
      for (let m1 = 0; m1 < mutations.length; m1++) {
        const mutation = mutations[m1];
        for (let m2 = 0; m2 < mutation.removedNodes.length; m2++) {
          const element = mutation.removedNodes[m2];
          if (element === this.state.currentTarget) {
            this.hideTooltip();
            return;
          }
        }
      }
    });

    observer.observe(window.document, { childList: true, subtree: true });

    this.removalTracker = observer;
  }

  unbindRemovalTracker() {
    if (this.removalTracker) {
      this.removalTracker.disconnect();
      this.removalTracker = null;
    }
  }

  isCapture(currentTarget: HTMLElement) {
    return (
      (currentTarget &&
        currentTarget.getAttribute('data-iscapture') === 'true') ||
      this.props.isCapture ||
      false
    );
  }

  isBodyMode() {
    return !!this.props.bodyMode;
  }

  bindBodyListener(targetArray: any[]) {
    const { event, eventOff, possibleCustomEvents, possibleCustomEventsOff } =
      this.state;
    const body = getBody();

    const customEvents = findCustomEvents(targetArray, 'data-event');
    const customEventsOff = findCustomEvents(targetArray, 'data-event-off');

    if (event != null) customEvents[event] = true;
    if (eventOff != null) customEventsOff[eventOff] = true;
    possibleCustomEvents
      .split(' ')
      .forEach((event) => (customEvents[event] = true));
    possibleCustomEventsOff
      .split(' ')
      .forEach((event) => (customEventsOff[event] = true));

    this.unbindBodyListener(body);

    const listeners = (this.bodyModeListeners = {}) as BodyModeListener;
    if (event == null) {
      listeners.mouseover = bodyListener.bind(this, this.showTooltip, {});
      listeners.mousemove = bodyListener.bind(this, this.updateTooltip, {
        respectEffect: true
      });
      listeners.mouseout = bodyListener.bind(this, this.hideTooltip, {});
    }

    for (const event in customEvents) {
      listeners[event] = bodyListener.bind(
        this,
        (e) => {
          const targetEventOff =
            e.currentTarget.getAttribute('data-event-off') || eventOff;
          checkStatus.call(this, targetEventOff, e);
        },
        { customEvent: true }
      );
    }
    for (const event in customEventsOff) {
      listeners[event] = bodyListener.bind(this, this.hideTooltip, {
        customEvent: true
      });
    }
    for (const event in listeners) {
      body.addEventListener(event, listeners[event]);
    }
  }

  unbindBodyListener(body?) {
    body = body || getBody();

    const listeners = this.bodyModeListeners;
    for (const event in listeners) {
      body.removeEventListener(event, listeners[event]);
    }
  }

  getEffect(currentTarget: HTMLElement) {
    const dataEffect = currentTarget.getAttribute('data-effect');
    return dataEffect || this.props.effect || 'float';
  }

  componentDidMount() {
    const { resizeHide } = this.props;
    this.mount = true;

    this.bindListener(); // Bind listener for tooltip
    this.bindWindowEvents(resizeHide); // Bind global event for static method
    this.injectStyles(); // Inject styles for each DOM root having tooltip.
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { ariaProps } = prevState;
    const newAriaProps = parseAria(nextProps);
    const isChanged = Object.keys(newAriaProps).some((props) => {
      return newAriaProps[props] !== ariaProps[props];
    });
    if (!isChanged) {
      return null;
    }
    return {
      ...prevState,
      ariaProps: newAriaProps
    };
  }

  isCustomEvent(ele) {
    const { event } = this.state;
    return event || !!ele.getAttribute('data-event');
  }

  customBindListener(ele) {
    const { event, eventOff } = this.state;
    const dataEvent = ele.getAttribute('data-event') || event;
    const dataEventOff = ele.getAttribute('data-event-off') || eventOff;

    dataEvent.split(' ').forEach((event) => {
      ele.removeEventListener(event, customListeners.get(ele, event));
      const customListener = checkStatus.bind(this, dataEventOff);
      customListeners.set(ele, event, customListener);
      ele.addEventListener(event, customListener, false);
    });
    if (dataEventOff) {
      dataEventOff.split(' ').forEach((event) => {
        ele.removeEventListener(event, this.hideTooltip);
        ele.addEventListener(event, this.hideTooltip, false);
      });
    }
  }

  customUnbindListener(ele) {
    const { event, eventOff } = this.state;
    const dataEvent = event || ele.getAttribute('data-event');
    const dataEventOff = eventOff || ele.getAttribute('data-event-off');

    ele.removeEventListener(dataEvent, customListeners.get(ele, event));
    if (dataEventOff) ele.removeEventListener(dataEventOff, this.hideTooltip);
  }

  componentWillUnmount() {
    this.mount = false;

    this.clearTimer();

    this.unbindListener();
    this.removeScrollListener(this.state.currentTarget);
    this.unbindWindowEvents();
  }

  hide() {
    dispatchGlobalEvent(CONSTANT.GLOBAL.HIDE, this);
  }

  rebuild() {
    dispatchGlobalEvent(CONSTANT.GLOBAL.REBUILD, null);
  }

  show() {
    dispatchGlobalEvent(CONSTANT.GLOBAL.SHOW, this);
  }

  globalRebuild() {
    if (this.mount) {
      this.unbindListener();
      this.bindListener();
    }
  }

  globalShow(event) {
    if (this.mount) {
      const hasTarget =
        (event && event.detail && event.detail.target && true) || false;
      // Create a fake event, specific show will limit the type to `solid`
      // only `float` type cares e.clientX e.clientY
      this.showTooltip(
        {
          currentTarget: hasTarget && event.detail.target
        } as React.MouseEvent<HTMLElement>,
        true
      );
    }
  }

  globalHide(event) {
    if (this.mount) {
      const hasTarget =
        (event && event.detail && event.detail.target && true) || false;
      this.hideTooltip(
        { currentTarget: hasTarget && event.detail.target },
        hasTarget
      );
    }
  }

  bindWindowEvents(resizeHide) {
    // ReactTooltip.hide
    window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
    window.addEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide, false);

    // ReactTooltip.rebuild
    window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
    window.addEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild, false);

    // ReactTooltip.show
    window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
    window.addEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow, false);

    // Resize
    if (resizeHide) {
      window.removeEventListener('resize', this.onWindowResize);
      window.addEventListener('resize', this.onWindowResize, false);
    }
  }

  unbindWindowEvents() {
    window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
    window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
    window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    if (!this.mount) return;
    this.hideTooltip();
  }

  /* Look for the closest DOM root having tooltip and inject styles. */
  injectStyles() {
    const { tooltipRef } = this;
    if (!tooltipRef) {
      return;
    }

    let parentNode = tooltipRef.parentNode;
    while (parentNode.parentNode) {
      parentNode = parentNode.parentNode;
    }

    let domRoot;

    switch (parentNode.constructor.name) {
      case 'Document':
      case 'HTMLDocument':
      case undefined:
        domRoot = (parentNode as any).head;
        break;
      case 'ShadowRoot':
      default:
        domRoot = parentNode;
        break;
    }

    // Prevent styles duplication.
    if (!domRoot.querySelector('style[data-react-tooltip]')) {
      const style = document.createElement('style');
      style.textContent = baseCss;
      style.setAttribute('data-react-tooltip', 'true');

      domRoot.appendChild(style);
    }
  }

  /**
   * Return if the mouse is on the tooltip.
   * @returns {boolean} true - mouse is on the tooltip
   */
  mouseOnToolTip() {
    const { show } = this.state;

    if (show && this.tooltipRef) {
      /* old IE or Firefox work around */
      return this.tooltipRef.matches(':hover');
    }
    return false;
  }

  /**
   * Pick out corresponded target elements
   */
  getTargetArray(id) {
    let targetArray = [];
    let selector;
    if (!id) {
      selector = '[data-tip]:not([data-for])';
    } else {
      const escaped = id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      selector = `[data-tip][data-for="${escaped}"]`;
    }

    // Scan document for shadow DOM elements
    nodeListToArray(document.getElementsByTagName('*'))
      .filter((element) => element.shadowRoot)
      .forEach((element) => {
        targetArray = targetArray.concat(
          nodeListToArray(element.shadowRoot.querySelectorAll(selector))
        );
      });
    return targetArray.concat(
      nodeListToArray(document.querySelectorAll(selector))
    );
  }

  /**
   * Bind listener to the target elements
   * These listeners used to trigger showing or hiding the tooltip
   */
  bindListener() {
    const { id, globalEventOff, isCapture } = this.props;
    const targetArray = this.getTargetArray(id);
    console.log('bindListener');

    targetArray.forEach((target) => {
      if (target.getAttribute('currentItem') === null) {
        target.setAttribute('currentItem', 'false');
      }
      this.unbindBasicListener(target);
      if (this.isCustomEvent(target)) {
        this.customUnbindListener(target);
      }
    });

    if (this.isBodyMode()) {
      console.log('bindBodyListener');
      this.bindBodyListener(targetArray);
    } else {
      targetArray.forEach((target) => {
        const isCaptureMode = this.isCapture(target);
        const effect = this.getEffect(target);
        if (this.isCustomEvent(target)) {
          this.customBindListener(target);
          return;
        }

        target.addEventListener('mouseenter', this.showTooltip, isCaptureMode);
        target.addEventListener('focus', this.showTooltip, isCaptureMode);
        if (effect === 'float') {
          target.addEventListener(
            'mousemove',
            this.updateTooltip,
            isCaptureMode
          );
        }
        console.log('Add listeners for leave');
        target.addEventListener('mouseleave', this.hideTooltip, isCaptureMode);
        target.addEventListener('blur', this.hideTooltip, isCaptureMode);
      });
    }

    // Global event to hide tooltip
    if (globalEventOff) {
      window.removeEventListener(globalEventOff, this.hideTooltip);
      window.addEventListener(globalEventOff, this.hideTooltip, isCapture);
    }

    // Track removal of targetArray elements from DOM
    this.bindRemovalTracker();
  }

  /**
   * Unbind listeners on target elements
   */
  unbindListener() {
    const { id, globalEventOff } = this.props;
    if (this.isBodyMode()) {
      this.unbindBodyListener();
    } else {
      const targetArray = this.getTargetArray(id);
      targetArray.forEach((target) => {
        this.unbindBasicListener(target);
        if (this.isCustomEvent(target)) this.customUnbindListener(target);
      });
    }

    if (globalEventOff) {
      window.removeEventListener(globalEventOff, this.hideTooltip);
    }
    this.unbindRemovalTracker();
  }

  /**
   * Invoke this before bind listener and unmount the component
   * it is necessary to invoke this even when binding custom event
   * so that the tooltip can switch between custom and default listener
   */
  unbindBasicListener(target) {
    const isCaptureMode = this.isCapture(target);
    target.removeEventListener('mouseenter', this.showTooltip, isCaptureMode);
    target.removeEventListener('mousemove', this.updateTooltip, isCaptureMode);
    target.removeEventListener('mouseleave', this.hideTooltip, isCaptureMode);
  }

  getTooltipContent() {
    const { getContent, children } = this.props;

    // Generate tooltip content
    let content;
    if (getContent) {
      if (Array.isArray(getContent)) {
        content =
          getContent[0] &&
          (getContent[0] as GetContentFn)(this.state.originTooltip);
      } else {
        content = (getContent as GetContentFn)(this.state.originTooltip);
      }
    }

    return getTipContent(
      this.state.originTooltip,
      children,
      content,
      this.state.isMultiline
    );
  }

  isEmptyTip(placeholder) {
    return (
      (typeof placeholder === 'string' && placeholder === '') ||
      placeholder === null
    );
  }

  /**
   * When mouse enter, show the tooltip
   */
  showTooltip(e: React.MouseEvent<HTMLElement>, isGlobalCall) {
    if (!this.tooltipRef) {
      return;
    }

    if (isGlobalCall) {
      // Don't trigger other elements belongs to other ReactTooltip
      const targetArray = this.getTargetArray(this.props.id);
      const isMyElement = targetArray.some((ele) => ele === e.currentTarget);
      if (!isMyElement) return;
    }
    // Get the tooltip content
    // calculate in this phrase so that tip width height can be detected
    const { multiline, getContent } = this.props;
    const originTooltip = e.currentTarget.getAttribute('data-tip');
    const isMultiline =
      Boolean(e.currentTarget.getAttribute('data-multiline')) ||
      multiline ||
      false;

    // If it is focus event or called by ReactTooltip.show, switch to `solid` effect
    const switchToSolid = e instanceof window.FocusEvent || isGlobalCall;

    // if it needs to skip adding hide listener to scroll
    let scrollHide = true;
    if (e.currentTarget.getAttribute('data-scroll-hide')) {
      scrollHide = e.currentTarget.getAttribute('data-scroll-hide') === 'true';
    } else if (this.props.scrollHide != null) {
      scrollHide = this.props.scrollHide;
    }

    // adding aria-describedby to target to make tooltips read by screen readers
    if (e && e.currentTarget && e.currentTarget.setAttribute) {
      e.currentTarget.setAttribute(
        'aria-describedby',
        this.props.id || this.state.uuid
      );
    }

    // Make sure the correct place is set
    const desiredPlace =
      e.currentTarget.getAttribute('data-place') || this.props.place || 'top';
    const effect =
      (switchToSolid && 'solid') || this.getEffect(e.currentTarget);
    const offset =
      e.currentTarget.getAttribute('data-offset') || this.props.offset || {};
    const result = getPosition(
      e,
      e.currentTarget,
      this.tooltipRef,
      desiredPlace,
      desiredPlace,
      effect,
      offset
    );
    if (result.position && this.props.overridePosition) {
      result.position = this.props.overridePosition(
        result.position,
        e,
        e.currentTarget,
        this.tooltipRef,
        desiredPlace,
        desiredPlace,
        effect,
        offset
      );
    }

    const place = result.isNewState ? result.newState.place : desiredPlace;

    // To prevent previously created timers from triggering
    this.clearTimer();

    const target = e.currentTarget;

    const reshowDelay = this.state.show
      ? parseInt(target.getAttribute('data-delay-update')) ||
        this.props.delayUpdate
      : 0;

    const updateState = () => {
      this.setState(
        {
          originTooltip: originTooltip,
          isMultiline: isMultiline,
          desiredPlace: desiredPlace,
          place: place,
          type: target.getAttribute('data-type') || this.props.type || 'dark',
          customColors: {
            text:
              target.getAttribute('data-text-color') ||
              this.props.textColor ||
              null,
            background:
              target.getAttribute('data-background-color') ||
              this.props.backgroundColor ||
              null,
            border:
              target.getAttribute('data-border-color') ||
              this.props.borderColor ||
              null,
            arrow:
              target.getAttribute('data-arrow-color') ||
              this.props.arrowColor ||
              null
          },
          effect: effect,
          offset: offset,
          padding: target.getAttribute('data-padding') || this.props.padding,
          html:
            (target.getAttribute('data-html')
              ? target.getAttribute('data-html') === 'true'
              : this.props.html) || false,
          delayShow:
            parseInt(target.getAttribute('data-delay-show')) ||
            this.props.delayShow ||
            0,
          delayHide:
            parseInt(target.getAttribute('data-delay-hide')) ||
            this.props.delayHide ||
            0,
          delayUpdate:
            parseInt(target.getAttribute('data-delay-update')) ||
            this.props.delayUpdate ||
            0,
          border:
            (target.getAttribute('data-border')
              ? target.getAttribute('data-border') === 'true'
              : this.props.border) || false,
          extraClass:
            target.getAttribute('data-class') ||
            this.props.class ||
            this.props.className ||
            '',
          disable:
            (target.getAttribute('data-tip-disable')
              ? target.getAttribute('data-tip-disable') === 'true'
              : this.props.disable) || false,
          currentTarget: target
        },
        () => {
          if (scrollHide) {
            this.addScrollListener(this.state.currentTarget);
          }

          this.updateTooltip(e);

          if (getContent && Array.isArray(getContent)) {
            this.intervalUpdateContent = setInterval(() => {
              if (this.mount) {
                const { getContent } = this.props;
                const placeholder = getTipContent(
                  originTooltip,
                  '',
                  getContent[0](),
                  isMultiline
                );
                const isEmptyTip = this.isEmptyTip(placeholder);
                this.setState({ isEmptyTip });
                this.updatePosition();
              }
            }, parseInt(getContent[1] as string));
          }
        }
      );
    };

    // If there is no delay call immediately, don't allow events to get in first.
    if (reshowDelay) {
      this.delayReshow = setTimeout(updateState, reshowDelay);
    } else {
      updateState();
    }
  }

  /**
   * When mouse hover, update tool tip
   */
  updateTooltip(e: React.MouseEvent<HTMLElement>) {
    const { delayShow, disable } = this.state;
    const { afterShow } = this.props;
    const placeholder = this.getTooltipContent();
    const eventTarget = e.currentTarget || e.target;

    // Check if the mouse is actually over the tooltip, if so don't hide the tooltip
    if (this.mouseOnToolTip()) {
      return;
    }

    // if the tooltip is empty, disable the tooltip
    if (this.isEmptyTip(placeholder) || disable) {
      return;
    }

    const delayTime = !this.state.show ? parseInt(delayShow.toString(), 10) : 0;

    const updateState = () => {
      if (
        (Array.isArray(placeholder) && placeholder.length > 0) ||
        placeholder
      ) {
        const isInvisible = !this.state.show;
        this.setState(
          {
            currentEvent: e,
            currentTarget: eventTarget,
            show: true
          },
          () => {
            this.updatePosition(() => {
              if (isInvisible && afterShow) {
                afterShow(e);
              }
            });
          }
        );
      }
    };

    if (this.delayShowLoop) {
      clearTimeout(this.delayShowLoop);
    }
    if (delayTime) {
      this.delayShowLoop = setTimeout(updateState, delayTime);
    } else {
      this.delayShowLoop = null;
      updateState();
    }
  }

  /*
   * If we're mousing over the tooltip remove it when we leave.
   */
  listenForTooltipExit() {
    const { show } = this.state;

    if (show && this.tooltipRef) {
      this.tooltipRef.addEventListener('mouseleave', this.hideTooltip);
    }
  }

  removeListenerForTooltipExit() {
    const { show } = this.state;

    if (show && this.tooltipRef) {
      this.tooltipRef.removeEventListener('mouseleave', this.hideTooltip);
    }
  }

  /**
   * When mouse leave, hide tooltip
   */
  hideTooltip(e?, hasTarget?, options = { isScroll: false }) {
    console.log('hideTooltip');
    const { disable } = this.state;
    const { isScroll } = options;
    const delayHide = isScroll ? 0 : this.state.delayHide;
    const { afterHide } = this.props;
    const placeholder = this.getTooltipContent();
    if (!this.mount) return;
    if (this.isEmptyTip(placeholder) || disable) return; // if the tooltip is empty, disable the tooltip
    if (hasTarget) {
      // Don't trigger other elements belongs to other ReactTooltip
      const targetArray = this.getTargetArray(this.props.id);
      const isMyElement = targetArray.some((ele) => ele === e.currentTarget);
      if (!isMyElement || !this.state.show) return;
    }

    // clean up aria-describedby when hiding tooltip
    if (e && e.currentTarget && e.currentTarget.removeAttribute) {
      e.currentTarget.removeAttribute('aria-describedby');
    }

    const resetState = () => {
      const isVisible = this.state.show;
      // Check if the mouse is actually over the tooltip, if so don't hide the tooltip
      if (this.mouseOnToolTip()) {
        this.listenForTooltipExit();
        return;
      }

      this.removeListenerForTooltipExit();

      this.setState({ show: false }, () => {
        this.removeScrollListener(this.state.currentTarget);
        if (isVisible && afterHide) {
          afterHide(e);
        }
      });
    };

    this.clearTimer();
    if (delayHide) {
      this.delayHideLoop = setTimeout(
        resetState,
        parseInt(delayHide.toString(), 10)
      );
    } else {
      resetState();
    }
  }

  /**
   * When scroll, hide tooltip
   */

  // TODO: This signature is it even valid, it should only have one param???
  // hideTooltipOnScroll = (event: Event, hasTarget: boolean)  => {
  hideTooltipOnScroll = (event: Event) => {
    this.hideTooltip(event, null, { isScroll: true });
  };

  // addEventListener(type: "scroll", listener: (this: Window, ev: Event) => any, options?: boolean | AddEventListenerOptions): void

  /**
   * Add scroll event listener when tooltip show
   * automatically hide the tooltip when scrolling
   */
  addScrollListener(currentTarget) {
    const isCaptureMode = this.isCapture(currentTarget);
    window.addEventListener('scroll', this.hideTooltipOnScroll, isCaptureMode);
  }

  removeScrollListener(currentTarget) {
    const isCaptureMode = this.isCapture(currentTarget);
    window.removeEventListener(
      'scroll',
      this.hideTooltipOnScroll,
      isCaptureMode
    );
  }

  // Calculation the position
  updatePosition(callbackAfter?) {
    const { currentEvent, currentTarget, place, desiredPlace, effect, offset } =
      this.state;
    const node = this.tooltipRef;
    const result = getPosition(
      currentEvent,
      currentTarget,
      node,
      place,
      desiredPlace,
      effect,
      offset
    );
    if (result.position && this.props.overridePosition) {
      result.position = this.props.overridePosition(
        result.position,
        currentEvent,
        currentTarget,
        node,
        place,
        desiredPlace,
        effect,
        offset
      );
    }

    if (result.isNewState) {
      // Switch to reverse placement
      return this.setState(result.newState, () => {
        this.updatePosition(callbackAfter);
      });
    }

    callbackAfter();

    // Set tooltip position
    node.style.left = result.position.left + 'px';
    node.style.top = result.position.top + 'px';
  }

  /**
   * CLear all kinds of timeout of interval
   */
  clearTimer() {
    if (this.delayShowLoop) {
      clearTimeout(this.delayShowLoop);
      this.delayShowLoop = null;
    }
    if (this.delayHideLoop) {
      clearTimeout(this.delayHideLoop);
      this.delayHideLoop = null;
    }
    if (this.delayReshow) {
      clearTimeout(this.delayReshow);
      this.delayReshow = null;
    }
    if (this.intervalUpdateContent) {
      clearInterval(this.intervalUpdateContent);
      this.intervalUpdateContent = null;
    }
  }

  hasCustomColors() {
    return Boolean(
      Object.keys(this.state.customColors).find(
        (color) => color !== 'border' && this.state.customColors[color]
      ) ||
        (this.state.border && this.state.customColors['border'])
    );
  }

  render() {
    const { extraClass, html, ariaProps, disable, uuid } = this.state;
    const content = this.getTooltipContent();
    const isEmptyTip = this.isEmptyTip(content);
    const style = generateTooltipStyle(
      this.state.uuid,
      this.state.customColors,
      this.state.type,
      this.state.border,
      this.state.padding
    );

    const tooltipClass =
      '__react_component_tooltip' +
      ` ${this.state.uuid}` +
      (this.state.show && !disable && !isEmptyTip ? ' show' : '') +
      (this.state.border ? ' border' : '') +
      ` place-${this.state.place}` + // top, bottom, left, right
      ` type-${this.hasCustomColors() ? 'custom' : this.state.type}` + // dark, success, warning, error, info, light, custom
      (this.props.delayUpdate ? ' allow_hover' : '') +
      (this.props.clickable ? ' allow_click' : '');

    let Wrapper = this.props.wrapper;

    if (ReactTooltip.supportedWrappers.indexOf(Wrapper) < 0) {
      Wrapper = ReactTooltip.defaultProps.wrapper;
    }

    const wrapperClassName = [tooltipClass, extraClass]
      .filter(Boolean)
      .join(' ');

    if (html) {
      const htmlContent = `${content}\n<style aria-hidden="true">${style}</style>`;

      return (
        <Wrapper
          className={`${wrapperClassName}`}
          id={this.props.id || uuid}
          ref={(ref) => (this.tooltipRef = ref)}
          {...ariaProps}
          data-id="tooltip"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    } else {
      return (
        <Wrapper
          className={`${wrapperClassName}`}
          id={this.props.id || uuid}
          {...ariaProps}
          ref={(ref) => (this.tooltipRef = ref)}
          data-id="tooltip"
        >
          <style
            dangerouslySetInnerHTML={{ __html: style }}
            aria-hidden="true"
          />
          {content}
        </Wrapper>
      );
    }
  }
}

export default ReactTooltip;
