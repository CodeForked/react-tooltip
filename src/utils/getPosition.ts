import { Offset, Place } from '../TooltipProps';

/**
 * Calculate the position of tooltip
 *
 * @params
 * - `e` {Event} the event of current mouse
 * - `target` {Element} the currentTarget of the event
 * - `node` {DOM} the react-tooltip object
 * - `place` {String} top / right / bottom / left
 * - `effect` {String} float / solid
 * - `offset` {Object} the offset to default position
 *
 * @return {Object}
 * - `isNewState` {Bool} required
 * - `newState` {Object}
 * - `position` {Object} {left: {Number}, top: {Number}}
 */
export default function (
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  target: HTMLElement,
  node: HTMLElement,
  place: Place,
  desiredPlace: Place,
  effect: string,
  offset: Offset
) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let { width: tipWidth, height: tipHeight } = getDimensions(node);
  const { width: targetWidth, height: targetHeight } = getDimensions(target);

  //tip is greater than window!!!!
  if (tipWidth > windowWidth) {
    const newWidth = windowWidth - 400;
    node.style.width = `${newWidth}px`;
    tipWidth = newWidth;
  }
  if (tipHeight > windowHeight) {
    node.style.height = `${windowHeight}px`;
    tipHeight = windowHeight;
  }

  const { mouseX, mouseY } = getCurrentOffset(e, target, effect);
  const defaultOffset = getDefaultPosition(
    effect,
    targetWidth,
    targetHeight,
    tipWidth,
    tipHeight
  );

  console.log(
    'tipWidth, tipHeight, targetWidth, targetHeight, windowWidth',
    tipWidth,
    tipHeight,
    targetWidth,
    targetHeight,
    window.innerWidth
  );

  const { extraOffsetX, extraOffsetY } = calculateOffset(offset);

  const { parentTop, parentLeft } = getParent(node);

  // Get the edge offset of the tooltip
  const getTipOffsetLeft = (place: Place) => {
    const offsetX = defaultOffset[place].l;
    return mouseX + offsetX + extraOffsetX;
  };
  const getTipOffsetRight = (place: Place) => {
    const offsetX = defaultOffset[place].r;
    return mouseX + offsetX + extraOffsetX;
  };
  const getTipOffsetTop = (place: Place) => {
    const offsetY = defaultOffset[place].t;
    return mouseY + offsetY + extraOffsetY;
  };
  const getTipOffsetBottom = (place: Place) => {
    const offsetY = defaultOffset[place].b;
    return mouseY + offsetY + extraOffsetY;
  };

  //
  // Functions to test whether the tooltip's sides are inside
  // the client window for a given orientation p
  //
  //  _____________
  // |             | <-- Right side
  // | p = 'left'  |\
  // |             |/  |\
  // |_____________|   |_\  <-- Mouse
  //      / \           |
  //       |
  //       |
  //  Bottom side
  //
  const outsideLeft = (p: Place) => getTipOffsetLeft(p) < 0;
  const outsideRight = (p: Place) => getTipOffsetRight(p) > windowWidth;
  const outsideTop = (p: Place) => getTipOffsetTop(p) < 0;
  const outsideBottom = (p: Place) => getTipOffsetBottom(p) > windowHeight;

  // Check whether the tooltip with orientation p is completely inside the client window
  const outside = (p: Place) =>
    outsideLeft(p) || outsideRight(p) || outsideTop(p) || outsideBottom(p);
  const inside = (p: Place) => !outside(p);

  const placesList: Place[] = ['top', 'bottom', 'left', 'right'];
  const insideList: Place[] = [];
  for (let i = 0; i < 4; i++) {
    const p = placesList[i];
    if (inside(p)) {
      insideList.push(p);
    }
  }

  let isNewState = false;
  let newPlace: Place;
  const shouldUpdatePlace = desiredPlace !== place;
  if (inside(desiredPlace) && shouldUpdatePlace) {
    isNewState = true;
    newPlace = desiredPlace;
  } else if (insideList.length > 0 && outside(desiredPlace) && outside(place)) {
    isNewState = true;
    newPlace = insideList[0];
  }

  if (isNewState) {
    return {
      isNewState: true,
      newState: { place: newPlace }
    };
  }

  return {
    isNewState: false,
    position: {
      left: parseInt((getTipOffsetLeft(place) - parentLeft).toString(), 10),
      top: parseInt((getTipOffsetTop(place) - parentTop).toString(), 10)
    }
  };
}

const getDimensions = (node: HTMLElement) => {
  const { height, width } = node.getBoundingClientRect();
  return {
    height: parseInt(height.toString(), 10),
    width: parseInt(width.toString(), 10)
  };
};

// Get current mouse offset
const getCurrentOffset = (e, currentTarget: HTMLElement, effect: string) => {
  const boundingClientRect = currentTarget.getBoundingClientRect();
  const targetTop = boundingClientRect.top;
  const targetLeft = boundingClientRect.left;
  const { width: targetWidth, height: targetHeight } =
    getDimensions(currentTarget);

  if (effect === 'float') {
    return {
      mouseX: e.clientX,
      mouseY: e.clientY
    };
  }
  return {
    mouseX: targetLeft + targetWidth / 2,
    mouseY: targetTop + targetHeight / 2
  };
};

type PositionType = {
  l: number;
  r: number;
  t: number;
  b: number;
};

// List all possibility of tooltip final offset
// This is useful in judging if it is necessary for tooltip to switch position when out of window
const getDefaultPosition = (
  effect: string,
  targetWidth: number,
  targetHeight: number,
  tipWidth: number,
  tipHeight: number
) => {
  let top: PositionType;
  let right: PositionType;
  let bottom: PositionType;
  let left: PositionType;
  const disToMouse = 3;
  const triangleHeight = 2;
  const cursorHeight = 12; // Optimize for float bottom only, cause the cursor will hide the tooltip

  if (effect === 'float') {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(tipHeight + disToMouse + triangleHeight),
      b: -disToMouse
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: disToMouse + cursorHeight,
      b: tipHeight + disToMouse + triangleHeight + cursorHeight
    };
    left = {
      l: -(tipWidth + disToMouse + triangleHeight),
      r: -disToMouse,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: disToMouse,
      r: tipWidth + disToMouse + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  } else if (effect === 'solid') {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(targetHeight / 2 + tipHeight + triangleHeight),
      b: -(targetHeight / 2)
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: targetHeight / 2,
      b: targetHeight / 2 + tipHeight + triangleHeight
    };
    left = {
      l: -(tipWidth + targetWidth / 2 + triangleHeight),
      r: -(targetWidth / 2),
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: targetWidth / 2,
      r: tipWidth + targetWidth / 2 + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  }

  return { top, bottom, left, right };
};

// Consider additional offset into position calculation
const calculateOffset = (offset: Offset) => {
  let extraOffsetX = 0;
  let extraOffsetY = 0;

  if (Object.prototype.toString.apply(offset) === '[object String]') {
    offset = JSON.parse(offset.toString().replace(/'/g, '"'));
  }
  for (const key in offset) {
    if (key === 'top') {
      extraOffsetY -= parseInt(offset[key].toString(), 10);
    } else if (key === 'bottom') {
      extraOffsetY += parseInt(offset[key].toString(), 10);
    } else if (key === 'left') {
      extraOffsetX -= parseInt(offset[key].toString(), 10);
    } else if (key === 'right') {
      extraOffsetX += parseInt(offset[key].toString(), 10);
    }
  }

  return { extraOffsetX, extraOffsetY };
};

// Get the offset of the parent elements
const getParent = (currentTarget: Element) => {
  let currentParent = currentTarget;
  while (currentParent) {
    const computedStyle = window.getComputedStyle(currentParent);
    // transform and will-change: transform change the containing block
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_Block
    if (
      computedStyle.getPropertyValue('transform') !== 'none' ||
      computedStyle.getPropertyValue('will-change') === 'transform'
    ) {
      break;
    }
    currentParent = currentParent.parentElement;
  }

  const parentTop = parseInt(
    (currentParent && currentParent.getBoundingClientRect().top.toString()) ||
      '0'
  );
  const parentLeft = parseInt(
    (currentParent && currentParent.getBoundingClientRect().left.toString()) ||
      '0'
  );

  return { parentTop, parentLeft };
};
