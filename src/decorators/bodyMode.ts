function makeProxy(e: { [x: string]: any }): { [x: string]: any } {
  const proxy = {};
  for (const key in e) {
    if (typeof e[key] === 'function') {
      proxy[key] = e[key].bind(e);
    } else {
      proxy[key] = e[key];
    }
  }
  return proxy;
}

export const bodyListener = function (callback, options, e) {
  const { respectEffect = false, customEvent = false } = options;
  const { id } = this.props;

  const tip = e.target.getAttribute('data-tip') || null;
  const forId = e.target.getAttribute('data-for') || null;

  const target = e.target;
  if (this.isCustomEvent(target) && !customEvent) {
    return;
  }

  const isTargetBelongsToTooltip =
    (id == null && forId == null) || forId === id;

  if (
    tip != null &&
    (!respectEffect || this.getEffect(target) === 'float') &&
    isTargetBelongsToTooltip
  ) {
    const proxy = makeProxy(e);
    proxy.currentTarget = target;
    callback(proxy);
  }
};

export const findCustomEvents = (targetArray: any[], dataAttribute: string) => {
  const events = {};
  targetArray.forEach((target) => {
    const event = target.getAttribute(dataAttribute);
    if (event) event.split(' ').forEach((event) => (events[event] = true));
  });

  return events;
};

export const getBody = () => document.getElementsByTagName('body')[0];
