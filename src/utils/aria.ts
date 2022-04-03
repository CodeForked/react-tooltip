import { TooltipProps } from '../TooltipProps';

/**
 * Support aria- and role in ReactTooltip
 *
 * @params props {Object}
 * @return {Object}
 */
export function parseAria(props: TooltipProps): object {
  const ariaObj = {};
  Object.keys(props)
    .filter((prop) => {
      // aria-xxx and role is acceptable
      return /(^aria-\w+$|^role$)/.test(prop);
    })
    .forEach((prop) => {
      ariaObj[prop] = props[prop];
    });

  return ariaObj;
}
