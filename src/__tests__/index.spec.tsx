/**
 * @jest-environment jsdom
 */
import ReactTooltip from '../index';
import { render, cleanup } from '@testing-library/react';
import forEach from 'mocha-each';
import { act } from 'react-dom/test-utils';

afterEach(() => {
  cleanup();
});

describe('Tooltip', () => {
  forEach([
    [
      { textColor: 'green', backgroundColor: 'red', arrowColor: 'blue' },
      {
        popupType: 'type-custom',
        textColor: 'green',
        background: 'red',
        arrowColor: 'blue'
      }
    ],
    [
      {
        textColor: 'green',
        backgroundColor: 'red',
        arrowColor: 'blue',
        borderColor: 'teal'
      },
      {
        popupType: 'type-custom',
        textColor: 'green',
        background: 'red',
        arrowColor: 'blue',
        borderColor: 'transparent'
      }
    ],
    [
      {
        textColor: 'green',
        backgroundColor: 'red',
        arrowColor: 'blue',
        border: true,
        borderColor: 'teal'
      },
      {
        popupType: 'type-custom',
        textColor: 'green',
        background: 'red',
        arrowColor: 'blue',
        borderColor: 'teal'
      }
    ],
    [
      {
        textColor: 'green',
        backgroundColor: 'red',
        arrowColor: 'blue',
        border: false,
        borderColor: 'teal'
      },
      {
        popupType: 'type-custom',
        textColor: 'green',
        background: 'red',
        arrowColor: 'blue'
      }
    ],
    [
      { textColor: 'teal', backgroundColor: 'orange' },
      { popupType: 'type-custom', textColor: 'teal', background: 'orange' }
    ],
    [
      { textColor: 'green', arrowColor: 'red' },
      {
        popupType: 'type-custom',
        textColor: 'green',
        background: '#222',
        arrowColor: 'red'
      }
    ],
    [
      { backgroundColor: 'green', arrowColor: 'yellow' },
      {
        popupType: 'type-custom',
        textColor: '#fff',
        background: 'green',
        arrowColor: 'yellow'
      }
    ],
    [
      { textColor: 'red' },
      { popupType: 'type-custom', textColor: 'red', background: '#222' }
    ],
    [
      { textColor: 'red', borderColor: 'pink' },
      { popupType: 'type-custom', textColor: 'red', background: '#222' }
    ],
    [
      { textColor: 'red', border: true, borderColor: 'pink' },
      {
        popupType: 'type-custom',
        textColor: 'red',
        background: '#222',
        borderColor: 'pink'
      }
    ],
    [
      { backgroundColor: 'red' },
      { popupType: 'type-custom', textColor: '#fff', background: 'red' }
    ],
    [
      { backgroundColor: 'red', borderColor: 'yellow' },
      { popupType: 'type-custom', textColor: '#fff', background: 'red' }
    ],
    [
      { backgroundColor: 'red', border: true, borderColor: 'yellow' },
      {
        popupType: 'type-custom',
        textColor: '#fff',
        background: 'red',
        borderColor: 'yellow'
      }
    ],
    [
      { arrowColor: 'red' },
      {
        popupType: 'type-custom',
        textColor: '#fff',
        background: '#222',
        arrowColor: 'red'
      }
    ],
    [
      { arrowColor: 'red', borderColor: 'green' },
      {
        popupType: 'type-custom',
        textColor: '#fff',
        background: '#222',
        arrowColor: 'red'
      }
    ],
    [
      { arrowColor: 'red', border: true, borderColor: 'green' },
      {
        popupType: 'type-custom',
        textColor: '#fff',
        background: '#222',
        arrowColor: 'red',
        borderColor: 'green'
      }
    ],
    [
      { borderColor: 'blue' },
      {
        popupType: 'type-dark',
        textColor: '#fff',
        background: '#222',
        arrowColor: '#222'
      }
    ],
    [
      { border: true, borderColor: 'blue' },
      {
        popupType: 'type-custom',
        textColor: '#fff',
        background: '#222',
        arrowColor: '#222',
        borderColor: 'blue'
      }
    ]
  ]).it('Popup color generation - show', (props, res) => {
    render(
      <span id="colorSpecInvoker" data-tip data-for="colorSpec">
        Invoker
      </span>
    );
    render(<ReactTooltip id="colorSpec" {...props} />);
    act(() => {
      document
        .getElementById('colorSpecInvoker')
        .dispatchEvent(new window.Event('mouseenter'));
    });

    const tooltip = document.getElementById('colorSpec');

    expect(tooltip.className).toMatch(
      new RegExp(
        '__react_component_tooltip [a-zA-Z0-9-]+ show' +
          (props.border ? ' border ' : ' ') +
          'place-top ' +
          res.popupType,
        'i'
      )
    );
    const uuid = tooltip.className.split(' ')[1];
    // TODO: incorrect type...
    const cssRules = (tooltip.firstElementChild as any).sheet.cssRules;
    const mainCssRule = cssRules.find(
      (rule) => rule.selectorText === `.${uuid}`
    ).style;

    // 'Text color'
    expect(mainCssRule.color).toBe(res.textColor);
    // 'Background color'
    expect(mainCssRule.background).toBe(res.background);
    // 'Border color'
    expect(mainCssRule.border).toBe(
      '1px solid ' + (res.borderColor ? res.borderColor : 'transparent')
    );

    const arrowPositions = ['top', 'bottom', 'left', 'right'];
    arrowPositions.forEach((pos) => {
      // pos + ' arrow color'
      expect(
        cssRules.find(
          (rule) => rule.selectorText === `.${uuid}.place-${pos}::after`
        ).style[`border-${pos}-color`]
      ).toBe(res.arrowColor ? res.arrowColor : res.background);
    });
  });
});
