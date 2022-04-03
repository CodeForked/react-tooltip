# [4.3.0-alpha.1](https://github.com/CodeForked/react-tooltip/compare/v4.2.21...v4.3.0-alpha.1) (2022-04-03)


### Bug Fixes

* **aftershow:** call afterShow only after state has fully updated ([54752e8](https://github.com/CodeForked/react-tooltip/commit/54752e81093f4c41bae1b49f7de65f28cf54df1a))
* effect and type not properly applied at first render ([a8d0e51](https://github.com/CodeForked/react-tooltip/commit/a8d0e51dd5dc0eb85d985232da90d54fd031ae4b))
* performance issue caused by excessive use of clearTimeout/Interval ([22aea50](https://github.com/CodeForked/react-tooltip/commit/22aea5086db47727feae609bb7a6f8e269b7f2de))
* set aria-describedby value wrong when custom id ([a04d26c](https://github.com/CodeForked/react-tooltip/commit/a04d26cc0639054b474ca8b373c95a09b199973a))


### Features

* **component:** adding "padding" property to customize padding style ([9ae765a](https://github.com/CodeForked/react-tooltip/commit/9ae765a3cc38b36ce5ea77edd8fcc0f7bd9646a6))
* convert to typescript ([dc547c1](https://github.com/CodeForked/react-tooltip/commit/dc547c18a0aa202468f77ac5def6f9c982d50068))

# [4.3.0-alpha.1](https://github.com/CodeForked/react-tooltip/compare/v4.2.21...v4.3.0-alpha.1) (2022-04-03)

### Bug Fixes

- **aftershow:** call afterShow only after state has fully updated ([54752e8](https://github.com/CodeForked/react-tooltip/commit/54752e81093f4c41bae1b49f7de65f28cf54df1a))
- effect and type not properly applied at first render ([a8d0e51](https://github.com/CodeForked/react-tooltip/commit/a8d0e51dd5dc0eb85d985232da90d54fd031ae4b))
- performance issue caused by excessive use of clearTimeout/Interval ([22aea50](https://github.com/CodeForked/react-tooltip/commit/22aea5086db47727feae609bb7a6f8e269b7f2de))
- set aria-describedby value wrong when custom id ([a04d26c](https://github.com/CodeForked/react-tooltip/commit/a04d26cc0639054b474ca8b373c95a09b199973a))
- add aria hidden attribute to style tag ([#703](https://github.com/CodeForked/react-tooltip/issues/703)) ([d60c2b7](https://github.com/CodeForked/react-tooltip/commit/d60c2b703a949fbe48e8acf56e741ffbfef233f6))
- **aftershow:** call afterShow only after state has fully updated ([54752e8](https://github.com/CodeForked/react-tooltip/commit/54752e81093f4c41bae1b49f7de65f28cf54df1a))
- **aphrodite_jss_deprecation:** aphrodite_jss replaced with custom solution ([fcdf7f1](https://github.com/CodeForked/react-tooltip/commit/fcdf7f156a665c2028d4db635b4ac9996bf44b29))
- **aphrodite_jss_deprecation:** aphrodite_jss replaced with custom solution ([92fcf5b](https://github.com/CodeForked/react-tooltip/commit/92fcf5bc62e39c27809b280c7ae095a2a9f12857))
- **build:** removing single quotes on cpy for windows shell ([#632](https://github.com/CodeForked/react-tooltip/issues/632)) ([9c280af](https://github.com/CodeForked/react-tooltip/commit/9c280af1bd651de42cd6d4417169db84534ba4ab))
- **colors:** allow customizable text, background, border, arrow colors ([9a85253](https://github.com/CodeForked/react-tooltip/commit/9a85253a902bcccb530483d66023f11ed6ee7221))
- **compability:** add polyfill and change styles ([#706](https://github.com/CodeForked/react-tooltip/issues/706)) ([b6e9a1c](https://github.com/CodeForked/react-tooltip/commit/b6e9a1cae81885890a791b1c31c218b6f78cb67c))
- deleting warning in peer dependencies ([f30ae74](https://github.com/CodeForked/react-tooltip/commit/f30ae74ce911599fb5b4b3aaec05a1f264654092))
- do not delay show if tooltip is already shown ([#676](https://github.com/CodeForked/react-tooltip/issues/676)) ([e8b9d84](https://github.com/CodeForked/react-tooltip/commit/e8b9d84c68e31a112d2ffcdfc5b322d4ec87ff8a))
- **domexception:** revert previous changed for unexpected behavior ([85e38bb](https://github.com/CodeForked/react-tooltip/commit/85e38bbdcf7a60588924aae12fbc1da35af85de4)), closes [#667](https://github.com/CodeForked/react-tooltip/issues/667)
- effect and type not properly applied at first render ([a8d0e51](https://github.com/CodeForked/react-tooltip/commit/a8d0e51dd5dc0eb85d985232da90d54fd031ae4b))
- **event:** expose the original event to `afterShow` and `afterHide` ([e2f973e](https://github.com/CodeForked/react-tooltip/commit/e2f973e35e7e329b3f012ca79744a4745ad200f9))
- **example:** 'made dev' works again, small fixes. ([7b286bb](https://github.com/CodeForked/react-tooltip/commit/7b286bbbc8853568ca8e9897235a2de2f202ff55)), closes [#328](https://github.com/CodeForked/react-tooltip/issues/328) [#341](https://github.com/CodeForked/react-tooltip/issues/341)
- **example:** <p> warning from react, make text match code. ([7c4c979](https://github.com/CodeForked/react-tooltip/commit/7c4c97904572b37d0fbf675d855ad6600004d54e))
- **examples:** add SVG example ([72a98d7](https://github.com/CodeForked/react-tooltip/commit/72a98d7fb15b9ff6b058bb8b158d112d7ea81316))
- fix ie edge CustomEvent bug ([#567](https://github.com/CodeForked/react-tooltip/issues/567)) ([b7f04f7](https://github.com/CodeForked/react-tooltip/commit/b7f04f767e66df3e3f2d9d85a482e4b3d8c2d1c2)), closes [#498](https://github.com/CodeForked/react-tooltip/issues/498)
- **getPosition Util:** Remove shouldUpdatePlace check from position check ([1f8a054](https://github.com/CodeForked/react-tooltip/commit/1f8a0542435003a11a8c6931431d393c0a350332)), closes [#574](https://github.com/CodeForked/react-tooltip/issues/574)
- **getposition:** properly determine parents with will-change: transform ([3a76250](https://github.com/CodeForked/react-tooltip/commit/3a76250a228d1a37bb9a8e56e7738954777dc2dd))
- **getPosition:** updated getPosition to fix 'maximum update depth' ([8fda305](https://github.com/CodeForked/react-tooltip/commit/8fda3058b880eff6771a1ef1537013ae18996fe4))
- **githubPage:** updating github page build in travis ([87b810a](https://github.com/CodeForked/react-tooltip/commit/87b810a5d0e4caf8fec6503e1bdfa7e765885d9b))
- **html:** remove sanitize-html-react, reduce package size ([177ac11](https://github.com/CodeForked/react-tooltip/commit/177ac1166a9b07953d8e2ad6e70ae4c01d00f3e2)), closes [#429](https://github.com/CodeForked/react-tooltip/issues/429)
- **index.js:** add missing argument so tooltip hides. ([4d3661b](https://github.com/CodeForked/react-tooltip/commit/4d3661b21e992a361f8df9a63cca4bea634611bf))
- **index.js:** fix exception when testing with Jest ([#682](https://github.com/CodeForked/react-tooltip/issues/682)) ([f885f1f](https://github.com/CodeForked/react-tooltip/commit/f885f1f97541954e7f6d8060ddda2a8f1ceb2876))
- **index.js:** fix state initialization ([69dea07](https://github.com/CodeForked/react-tooltip/commit/69dea07559f4eb5f03b05116f2e8a574917b61dd))
- **index.js:** Replaced the deprecated `componentWillReceiveProps`. ([80b71ed](https://github.com/CodeForked/react-tooltip/commit/80b71edf184bfa688cac0686c20e387768e3cbf1))
- **index.js:** Use correct orientation when mouse enters ([4a0da8b](https://github.com/CodeForked/react-tooltip/commit/4a0da8b4f6ad27810f10370bf1d3b129b0e5050b)), closes [#388](https://github.com/CodeForked/react-tooltip/issues/388)
- install dependencies in example travis ([7ba8b28](https://github.com/CodeForked/react-tooltip/commit/7ba8b28f672b2ca3fc9f5fbe860ec975f10fa0bb))
- **isCapture:** better guard that preserves logic ([28b8493](https://github.com/CodeForked/react-tooltip/commit/28b84938c9fc7da12d5936c687c3d391817fbd1c))
- **isCapture:** guard use of currentTarget ([4f89a2d](https://github.com/CodeForked/react-tooltip/commit/4f89a2d685889785bf62e71f737c45d9d55b1e48))
- **lint:** styles are now linted with stylelint ([3c17198](https://github.com/CodeForked/react-tooltip/commit/3c17198fa9ce04c8fa07858f4544af21c07d2104))
- made it possible to pass uuid instead of generating one internally ([#583](https://github.com/CodeForked/react-tooltip/issues/583)) ([083edfb](https://github.com/CodeForked/react-tooltip/commit/083edfb91d532d5880562c0510845081ef7463b0)), closes [#580](https://github.com/CodeForked/react-tooltip/issues/580)
- mark prop-types and uuid as external to avoid bundling them ([#582](https://github.com/CodeForked/react-tooltip/issues/582)) ([fb60855](https://github.com/CodeForked/react-tooltip/commit/fb6085598d0249f35a505edee6904fd79a5f8b5e))
- modifying example ([9dc0b2e](https://github.com/CodeForked/react-tooltip/commit/9dc0b2ec74ae62270e50c692bce2614bfd61eacf))
- **no_var:** no vars allowed ([c591804](https://github.com/CodeForked/react-tooltip/commit/c591804d028ca086f226ee43ef9a0a8e525c1bfc))
- **overridePosition:** providing currentEvent in overridePosition ([#563](https://github.com/CodeForked/react-tooltip/issues/563)) ([3e75a09](https://github.com/CodeForked/react-tooltip/commit/3e75a098a2ab2ad08ac1965440d6b236aad21a5f)), closes [#513](https://github.com/CodeForked/react-tooltip/issues/513)
- performance issue caused by excessive use of clearTimeout/Interval ([22aea50](https://github.com/CodeForked/react-tooltip/commit/22aea5086db47727feae609bb7a6f8e269b7f2de))
- providing currentTarget in overridePosition ([#564](https://github.com/CodeForked/react-tooltip/issues/564)) ([22c3bac](https://github.com/CodeForked/react-tooltip/commit/22c3bacfea3746b4b3aeeb39ccdc7559148811e0))
- **pr:** package.json fix; refactoring to exclude dependencies ([fdc17d4](https://github.com/CodeForked/react-tooltip/commit/fdc17d44f1b22f640f7a87ffdf515e72035ef78a))
- release event listners ([#534](https://github.com/CodeForked/react-tooltip/issues/534)) ([7cc1203](https://github.com/CodeForked/react-tooltip/commit/7cc12039a1646cc19b063f80382c661a6d7ef2ec))
- **selector:** Add support for shadow DOM elements ([99be4d1](https://github.com/CodeForked/react-tooltip/commit/99be4d17b77e7f9cc8a74b818dacbf6b41f33dcf))
- **selector:** lint fixes ([873c2a8](https://github.com/CodeForked/react-tooltip/commit/873c2a8be03dc59dec712f09b04fe88edddcf1ca))
- set aria-describedby value wrong when custom id ([a04d26c](https://github.com/CodeForked/react-tooltip/commit/a04d26cc0639054b474ca8b373c95a09b199973a))
- **showtooltip:** check if tooltipRef is undefined ([#623](https://github.com/CodeForked/react-tooltip/issues/623)) ([f63eab2](https://github.com/CodeForked/react-tooltip/commit/f63eab2ccca5ef1182e9e7c3e1271165fd4e5b4a))
- skip warning in example ([a555060](https://github.com/CodeForked/react-tooltip/commit/a555060cd9e208e5af64148f8d8e84523a5d785e))
- **src/index.js:** add accessibility support for tabbing ([#695](https://github.com/CodeForked/react-tooltip/issues/695)) ([ae936a5](https://github.com/CodeForked/react-tooltip/commit/ae936a5275ee4a2cf32a84dbf8dc004e20b748e1))
- **src/index.js:** hide tooltip if blurred (tabbed out) ([#699](https://github.com/CodeForked/react-tooltip/issues/699)) ([e0a2a1d](https://github.com/CodeForked/react-tooltip/commit/e0a2a1d0351491396defc528f253f80c7806bf42))
- **src/index.js:** Overwrite `delayHide` on scroll ([7a2d0b3](https://github.com/CodeForked/react-tooltip/commit/7a2d0b365e0fd901b3b15b2a154a99b76f78d9ef)), closes [#474](https://github.com/CodeForked/react-tooltip/issues/474)
- **staticMethods:** fixing IE event bug ([#569](https://github.com/CodeForked/react-tooltip/issues/569)) ([9acc591](https://github.com/CodeForked/react-tooltip/commit/9acc5919de80208da98893d9f2fc32bd0a261410))
- string into example ([356821b](https://github.com/CodeForked/react-tooltip/commit/356821b1be23321bea29be1e6895595a753881c0))
- **style injection:** change style injection default root ([a00c5b7](https://github.com/CodeForked/react-tooltip/commit/a00c5b76c4e7fb56f27461c34ed3511b45ba8236)), closes [#665](https://github.com/CodeForked/react-tooltip/issues/665)
- **styles:** add styles for shadow dom ([00d1539](https://github.com/CodeForked/react-tooltip/commit/00d1539f427fc06f154fcbd19b83fd236c801917)), closes [#597](https://github.com/CodeForked/react-tooltip/issues/597)
- **styles:** change style injection way ([#668](https://github.com/CodeForked/react-tooltip/issues/668)) ([1e10cce](https://github.com/CodeForked/react-tooltip/commit/1e10ccee4f79f27b98c53632412b81fbc890c9a7)), closes [#650](https://github.com/CodeForked/react-tooltip/issues/650)
- **tooltip:** sanitize HTML to prevent XSS ([182df11](https://github.com/CodeForked/react-tooltip/commit/182df112be16720d238daae177af451525dcf8f7))
- **type:** added role property to types ([#679](https://github.com/CodeForked/react-tooltip/issues/679)) ([9b49395](https://github.com/CodeForked/react-tooltip/commit/9b493958d20cbaa18c2e494c5d0ca30a32aa05bf))
- **type:** Fix global method parameter type ([#585](https://github.com/CodeForked/react-tooltip/issues/585)) ([5e2b8db](https://github.com/CodeForked/react-tooltip/commit/5e2b8db3a196f2ebd413c5f43a433e187255cf19))
- **types:** adding types filename to package ([#579](https://github.com/CodeForked/react-tooltip/issues/579)) ([05d8de2](https://github.com/CodeForked/react-tooltip/commit/05d8de2043f938c83750010c897d09ee05e6cbe2))
- **types:** adding typescript d.ts file into dist ([e6300f7](https://github.com/CodeForked/react-tooltip/commit/e6300f75e47b57fc11efbeadb858111b1cfc54df)), closes [#579](https://github.com/CodeForked/react-tooltip/issues/579)
- update uuid module ([d937e59](https://github.com/CodeForked/react-tooltip/commit/d937e59be19dd53abb2c8087ef333c906131382e))
- updating styles using transferSas ([f2f7804](https://github.com/CodeForked/react-tooltip/commit/f2f78043556c284ff134b9b32424758257d7a6b7))
- using css into example ([7d343af](https://github.com/CodeForked/react-tooltip/commit/7d343af41b6eb6413f8dc7375b3d6391152e3778))
- using sass styles with rollup ([bb6fe48](https://github.com/CodeForked/react-tooltip/commit/bb6fe48ed3ed0bc42588422d2985812a4bebe95a))
- **uuid:** Use uuid package for unique class names ([#566](https://github.com/CodeForked/react-tooltip/issues/566)) ([c2c2243](https://github.com/CodeForked/react-tooltip/commit/c2c2243f2c6770dfc9f4099b28c5e46348caaea5))
- validate lint in pretest ([ad7add0](https://github.com/CodeForked/react-tooltip/commit/ad7add0460325b5c425cd477930f5d9b0d6ffbc3))

- Merge pull request #550 from wwayne/refactoring ([4609833](https://github.com/CodeForked/react-tooltip/commit/4609833b80bf25559857de00101c7ea37230267d)), closes [#550](https://github.com/CodeForked/react-tooltip/issues/550)

### Features

- **component:** adding "padding" property to customize padding style ([9ae765a](https://github.com/CodeForked/react-tooltip/commit/9ae765a3cc38b36ce5ea77edd8fcc0f7bd9646a6))
- convert to typescript ([dc547c1](https://github.com/CodeForked/react-tooltip/commit/dc547c18a0aa202468f77ac5def6f9c982d50068))
- adding typescript type defs ([#571](https://github.com/CodeForked/react-tooltip/issues/571)) ([cb2b921](https://github.com/CodeForked/react-tooltip/commit/cb2b921acf25f180d18f55f90a0375ca941fdf16))
- **clickable-prop:** add clickable prop ([a75b2be](https://github.com/CodeForked/react-tooltip/commit/a75b2be335defd49b9a72d9b70ebe8ffd97494d3)), closes [#417](https://github.com/CodeForked/react-tooltip/issues/417)
- **component:** adding "padding" property to customize padding style ([9ae765a](https://github.com/CodeForked/react-tooltip/commit/9ae765a3cc38b36ce5ea77edd8fcc0f7bd9646a6))
- convert to typescript ([dc547c1](https://github.com/CodeForked/react-tooltip/commit/dc547c18a0aa202468f77ac5def6f9c982d50068))
- getContent(dataTip) ([8bfbfc9](https://github.com/CodeForked/react-tooltip/commit/8bfbfc960bdc62e716fd2d3f0ec6bb8c54edf01e))
- **getContent:** update Travis, trigger semantic-release ([9617267](https://github.com/CodeForked/react-tooltip/commit/9617267c3cadd1361a32b3f900e02fc994211682))
- **overridePosition:** Add "overridePosition" property to handle border cases and customize position ([ccb8b58](https://github.com/CodeForked/react-tooltip/commit/ccb8b58a6762f3393f7d71c157c64ae24a81674c))
- **overridePosition:** Added example ([7df8454](https://github.com/CodeForked/react-tooltip/commit/7df845437bb8a8b4cb12e47537d5889ae0352b97))
- Small bug fix to previous commit ([19a8a67](https://github.com/CodeForked/react-tooltip/commit/19a8a6709c8034f27c80df172c9d2e616227f258))
- The only way to support styling react-tooltips with a strict csp is to inject the style.css di ([cf105a1](https://github.com/CodeForked/react-tooltip/commit/cf105a17665136c28eadf06e9dd4c421dac1040d)), closes [#340](https://github.com/CodeForked/react-tooltip/issues/340)
- **tooltip:** Add ability to hover on tooltip. Provide optional delay of updating so if the mouse p ([79342ce](https://github.com/CodeForked/react-tooltip/commit/79342cec63d7c5e8b429dd1917396177b1e8ab09))

### Performance Improvements

- **Use sanitize-html-react instead of sanitize-html to avoid useless server side dependencies:** Us ([4b84caa](https://github.com/CodeForked/react-tooltip/commit/4b84caa096f7c562a8374abf63b23794124cd8fe)), closes [#424](https://github.com/CodeForked/react-tooltip/issues/424)

### BREAKING CHANGES

- Updating readme for demo

## [4.2.21](https://github.com/wwayne/react-tooltip/compare/v4.2.20...v4.2.21) (2021-05-28)

### Bug Fixes

- **compability:** add polyfill and change styles ([#706](https://github.com/wwayne/react-tooltip/issues/706)) ([b6e9a1c](https://github.com/wwayne/react-tooltip/commit/b6e9a1c))

## [4.2.20](https://github.com/wwayne/react-tooltip/compare/v4.2.19...v4.2.20) (2021-05-28)

### Bug Fixes

- add aria hidden attribute to style tag ([#703](https://github.com/wwayne/react-tooltip/issues/703)) ([d60c2b7](https://github.com/wwayne/react-tooltip/commit/d60c2b7))

## [4.2.19](https://github.com/wwayne/react-tooltip/compare/v4.2.18...v4.2.19) (2021-05-06)

### Bug Fixes

- **src/index.js:** hide tooltip if blurred (tabbed out) ([#699](https://github.com/wwayne/react-tooltip/issues/699)) ([e0a2a1d](https://github.com/wwayne/react-tooltip/commit/e0a2a1d))

## [4.2.18](https://github.com/wwayne/react-tooltip/compare/v4.2.17...v4.2.18) (2021-04-25)

### Bug Fixes

- **src/index.js:** add accessibility support for tabbing ([#695](https://github.com/wwayne/react-tooltip/issues/695)) ([ae936a5](https://github.com/wwayne/react-tooltip/commit/ae936a5))

## [4.2.17](https://github.com/wwayne/react-tooltip/compare/v4.2.16...v4.2.17) (2021-03-26)

### Bug Fixes

- **type:** added role property to types ([#679](https://github.com/wwayne/react-tooltip/issues/679)) ([9b49395](https://github.com/wwayne/react-tooltip/commit/9b49395))

## [4.2.16](https://github.com/wwayne/react-tooltip/compare/v4.2.15...v4.2.16) (2021-03-26)

### Bug Fixes

- **index.js:** fix exception when testing with Jest ([#682](https://github.com/wwayne/react-tooltip/issues/682)) ([f885f1f](https://github.com/wwayne/react-tooltip/commit/f885f1f))

## [4.2.15](https://github.com/wwayne/react-tooltip/compare/v4.2.14...v4.2.15) (2021-02-26)

### Bug Fixes

- do not delay show if tooltip is already shown ([#676](https://github.com/wwayne/react-tooltip/issues/676)) ([e8b9d84](https://github.com/wwayne/react-tooltip/commit/e8b9d84))

## [4.2.14](https://github.com/wwayne/react-tooltip/compare/v4.2.13...v4.2.14) (2021-02-16)

### Bug Fixes

- **styles:** change style injection way ([#668](https://github.com/wwayne/react-tooltip/issues/668)) ([1e10cce](https://github.com/wwayne/react-tooltip/commit/1e10cce)), closes [#650](https://github.com/wwayne/react-tooltip/issues/650)

## [4.2.13](https://github.com/wwayne/react-tooltip/compare/v4.2.12...v4.2.13) (2021-01-15)

### Bug Fixes

- **domexception:** revert previous changed for unexpected behavior ([85e38bb](https://github.com/wwayne/react-tooltip/commit/85e38bb)), closes [#667](https://github.com/wwayne/react-tooltip/issues/667)

## [4.2.12](https://github.com/wwayne/react-tooltip/compare/v4.2.11...v4.2.12) (2021-01-14)

### Bug Fixes

- **style injection:** change style injection default root ([a00c5b7](https://github.com/wwayne/react-tooltip/commit/a00c5b7)), closes [#665](https://github.com/wwayne/react-tooltip/issues/665)

## [4.2.11](https://github.com/wwayne/react-tooltip/compare/v4.2.10...v4.2.11) (2020-11-22)

### Bug Fixes

- **styles:** add styles for shadow dom ([00d1539](https://github.com/wwayne/react-tooltip/commit/00d1539)), closes [#597](https://github.com/wwayne/react-tooltip/issues/597)

## [4.2.10](https://github.com/wwayne/react-tooltip/compare/v4.2.9...v4.2.10) (2020-09-14)

### Bug Fixes

- **build:** removing single quotes on cpy for windows shell ([#632](https://github.com/wwayne/react-tooltip/issues/632)) ([9c280af](https://github.com/wwayne/react-tooltip/commit/9c280af))

## [4.2.9](https://github.com/wwayne/react-tooltip/compare/v4.2.8...v4.2.9) (2020-08-27)

### Bug Fixes

- **getposition:** properly determine parents with will-change: transform ([3a76250](https://github.com/wwayne/react-tooltip/commit/3a76250))

## [4.2.8](https://github.com/wwayne/react-tooltip/compare/v4.2.7...v4.2.8) (2020-08-06)

### Bug Fixes

- **showtooltip:** check if tooltipRef is undefined ([#623](https://github.com/wwayne/react-tooltip/issues/623)) ([f63eab2](https://github.com/wwayne/react-tooltip/commit/f63eab2))

## Change Log

### v3.9.0 (2018/11/07 00:43 +00:00)

- [#452](https://github.com/wwayne/react-tooltip/pull/452) docs(README.md): Updates demo url (@tjFogarty)
- [#439](https://github.com/wwayne/react-tooltip/pull/439) added support for passing options to sanitizeHtml (@icheishvili)
- [#433](https://github.com/wwayne/react-tooltip/pull/433) Use capture mode with globalEventOff (@apandichi)

### v3.8.4 (2018/09/12 18:00 +00:00)

- [#428](https://github.com/wwayne/react-tooltip/pull/428) fix(example): <p> warning from react, make text match code. (@aronhelser)

### v3.8.3 (2018/09/12 13:47 +00:00)

- [#426](https://github.com/wwayne/react-tooltip/pull/426) perf(Use sanitize-html-react instead of sanitize-html) (@jgerlier)
- [#425](https://github.com/wwayne/react-tooltip/pull/425) fix(index.js): fix state initialization (@MtBlue81)

### v3.8.2 (2018/09/11 17:55 +00:00)

- [#413](https://github.com/wwayne/react-tooltip/pull/413) fix(index.js): Use correct orientation when mouse enters (@an4ger)

### v3.8.1 (2018/09/06 14:07 +00:00)

- [#422](https://github.com/wwayne/react-tooltip/pull/422) fix(tooltip): sanitize HTML to prevent XSS (@wichniowski)

### v3.7.0 (2018/09/03 15:13 +00:00)

- [#416](https://github.com/wwayne/react-tooltip/pull/416) feat(mouseover): Add ability to hover on tooltip. (@RobertGary1)
- [#414](https://github.com/wwayne/react-tooltip/pull/414) Fixed jsdoc return typos (@AlexanderEllis)
- [#399](https://github.com/wwayne/react-tooltip/pull/399) Fixes Typos (@jstettner)
- [#391](https://github.com/wwayne/react-tooltip/pull/391) fix(positioning): make sure tooltip is oriented correctly when close to edge (@hassanbot)

### v3.6.1 (2018/06/05 13:46 +00:00)

- [#389](https://github.com/wwayne/react-tooltip/pull/389) fix(isCapture): guard use of currentTarget (@aronhelser)
- [#384](https://github.com/wwayne/react-tooltip/pull/384) Detach custom event listener (@P0lip)

### v3.6.0 (2018/05/15 18:03 +00:00)

- [#360](https://github.com/wwayne/react-tooltip/pull/360) Compute or enrich tip content (@austil)

### v3.5.1 (2018/05/03 18:11 +00:00)

- [#380](https://github.com/wwayne/react-tooltip/pull/380) fix(examples): add SVG example (@P0lip)
- [#379](https://github.com/wwayne/react-tooltip/pull/379) ci(gh-pages): Allow travis to publish new examples to github (@aronhelser)
- [#366](https://github.com/wwayne/react-tooltip/pull/366) Make getPosition() calculate offsets correctly for svg elements (@P0lip)
- [#310](https://github.com/wwayne/react-tooltip/pull/310) Update position with content (@stefanhayden)
- [#368](https://github.com/wwayne/react-tooltip/pull/368) Fix issue where tooltip won't show for adjacent elements. (@tishihar94)
- [#376](https://github.com/wwayne/react-tooltip/pull/376) Add displayName (@clehnert-psl)
- [#375](https://github.com/wwayne/react-tooltip/pull/375) test(scrolling): Add example showing tooltip inside scrolling div (@aronhelser)

### v3.5.0 (2018/04/11 18:04 +00:00)

- [#281](https://github.com/wwayne/react-tooltip/pull/281) Get tooltip content dynamically in the render method (@alfonsomunozpomer)

### v3.4.3 (2018/04/11 15:14 +00:00)

- [#207](https://github.com/wwayne/react-tooltip/pull/207) Return tooltip to original position when possible (@hassanbot)
- [#301](https://github.com/wwayne/react-tooltip/pull/301) insert css as first to allow easy css styling without important (@roblan)

### 3.4.2 (2018/04/09 18:58 +00:00)

- [#373](https://github.com/wwayne/react-tooltip/pull/373) fix(example): 'made dev' works again, small fixes. (@aronhelser)
- [#337](https://github.com/wwayne/react-tooltip/pull/337) Fix README show tip usage error (@sivagao)
- [#359](https://github.com/wwayne/react-tooltip/pull/359) License should use H2 as the previous sections do (@konekoya)

### 3.4.1 (2018/04/05 17:24 +00:00)

- [#369](https://github.com/wwayne/react-tooltip/pull/369) fix(index.js): add missing argument so tooltip hides. (@aronhelser)
- [#372](https://github.com/wwayne/react-tooltip/pull/372) Travis: update node version to fix travis build. (@aronhelser)

### 3.4.0 (2017/10/16 13:39 +00:00)

- [#321](https://github.com/wwayne/react-tooltip/pull/321) React 16 support (@mikecousins)

### 3.3.1 (2017/10/05 05:08 +00:00)

- [#292](https://github.com/wwayne/react-tooltip/pull/292) Fix typo (@piperchester)

### 3.3.0 (2017/04/14 03:34 +00:00)

- [#287](https://github.com/wwayne/react-tooltip/pull/287) Use prop-types package instead of React.PropTypes (@ssilve1989)

### 3.2.10 (2017/03/28 20:41 +00:00)

- [#278](https://github.com/wwayne/react-tooltip/pull/278) Make MutationObserver-based removal tracking (@huumanoid)
- [#272](https://github.com/wwayne/react-tooltip/pull/272) Fix wrapper tag (@huumanoid)
- [#259](https://github.com/wwayne/react-tooltip/pull/259) Track removal of DOM elements (@antoniogiordano)
- [#270](https://github.com/wwayne/react-tooltip/pull/270) Fix typos and improve for clarity (@theholla)

### 3.2.9 (2017/03/20 15:41 +00:00)

- [#236](https://github.com/wwayne/react-tooltip/pull/236) escape backslash in getTargetArray method (@rnons)

### 3.2.7 (2017/02/17 07:24 +00:00)

- [#262](https://github.com/wwayne/react-tooltip/pull/262) Fix nodelist converte in safari (@wwayne)
- [#260](https://github.com/wwayne/react-tooltip/pull/260) Fix NodeList to Array convertion (@huumanoid)

### 3.2.6 (2017/02/08 12:34 +00:00)

- [#255](https://github.com/wwayne/react-tooltip/pull/255) (fix) Remove console logs (@flexpert)
- [#254](https://github.com/wwayne/react-tooltip/pull/254) Add support for className prop (@jonbeller)

### 3.2.4 (2017/02/07 03:57 +00:00)

- [#251](https://github.com/wwayne/react-tooltip/pull/251) Dropfen dynamic wrapper (@dropfen)

### 3.2.3 (2017/01/30 03:00 +00:00)

- [#247](https://github.com/wwayne/react-tooltip/pull/247) Fix delayHide issue #246 (@huumanoid)
- [#238](https://github.com/wwayne/react-tooltip/pull/238) Update README.md (@nikbelikov)
- [#233](https://github.com/wwayne/react-tooltip/pull/233) Added more syntax highlighting (@oyeanuj)
- [#229](https://github.com/wwayne/react-tooltip/pull/229) Replaced Object.keys(...) by Object.getOwnPropertyNames(...) (@gauthierj)

### 3.2.2 (2016/11/23 08:23 +00:00)

- [#220](https://github.com/wwayne/react-tooltip/pull/220) Use parameter 'useCapture' for remove listener if it is registered as… (@achernetsky)
- [#223](https://github.com/wwayne/react-tooltip/pull/223) Fix/security csp style src (@briantrice)
- [#216](https://github.com/wwayne/react-tooltip/pull/216) Fix fire of global show event for IE (@SubVersive)

### 3.2.1 (2016/09/30 09:51 +00:00)

- [#202](https://github.com/wwayne/react-tooltip/pull/202) Hide tooltip when getContent return null or undefined, same for empty… (@wwayne)
- [#201](https://github.com/wwayne/react-tooltip/pull/201) Hide tooltip if the tip is empty or disabled (@wwayne)

### 3.2.0 (2016/09/30 01:10 +00:00)

- [#200](https://github.com/wwayne/react-tooltip/pull/200) Remove countTransform because the way of transform calculation is cha… (@wwayne)
- [#195](https://github.com/wwayne/react-tooltip/pull/195) Use node parent when calculating offset (@iamdoron)

### 3.1.8 (2016/09/14 13:37 +00:00)

- [#194](https://github.com/wwayne/react-tooltip/pull/194) Add resizeHide option (@wwayne)
- [#193](https://github.com/wwayne/react-tooltip/pull/193) hide specific tooltip (@wwayne)
- [#192](https://github.com/wwayne/react-tooltip/pull/192) Create scroll hide option (@wwayne)

### 3.1.7 (2016/09/07 00:46 +00:00)

- [#187](https://github.com/wwayne/react-tooltip/pull/187) Add disable option (@wwayne)
- [#183](https://github.com/wwayne/react-tooltip/pull/183) Remove react-dom from Bower dependencies (@mikkopiu)

### 3.1.6 (2016/08/19 02:07 +00:00)

- [#181](https://github.com/wwayne/react-tooltip/pull/181) Judge if the component has been mounted mount in getContent #180 (@wwayne)
- [#179](https://github.com/wwayne/react-tooltip/pull/179) Add bower.json (@mikkopiu)

### 3.1.5 (2016/08/04 10:43 +00:00)

- [#176](https://github.com/wwayne/react-tooltip/pull/176) Support ReactTooltip.show() #47 (@wwayne)
- [#174](https://github.com/wwayne/react-tooltip/pull/174) Factor transform in css into position calculation #152 (@wwayne)

### 3.1.4 (2016/08/03 13:52 +00:00)

- [#173](https://github.com/wwayne/react-tooltip/pull/173) Add new attribute afterShow and afterHide (@wwayne)
- [#172](https://github.com/wwayne/react-tooltip/pull/172) Add support for aria- and role props #159 (@wwayne)

### 3.1.3 (2016/08/01 23:53 +00:00)

- [#164](https://github.com/wwayne/react-tooltip/pull/164) Fix for delayShwo #163 (@wwayne)

### 3.1.2 (2016/07/30 01:38 +00:00)

- [#162](https://github.com/wwayne/react-tooltip/pull/162) Fix for #158, getposition error (@wwayne)

### 3.1.1 (2016/07/27 13:03 +00:00)

- [#151](https://github.com/wwayne/react-tooltip/pull/151) Update postion calculation so that it can calculate continous tootlip (@wwayne)

### 3.1.0 (2016/07/27 08:49 +00:00)

- [#149](https://github.com/wwayne/react-tooltip/pull/149) Update algorithm for get positon to fix the shake problem #146 (@wwayne)
- [#145](https://github.com/wwayne/react-tooltip/pull/145) fix typo (@meandavejustice)

### 3.0.13 (2016/07/14 09:53 +00:00)

- [#136](https://github.com/wwayne/react-tooltip/pull/136) Check if current element is under transform (@CremaFR)
- [#135](https://github.com/wwayne/react-tooltip/pull/135) Transform 3d (@wwayne)

### 3.0.10 (2016/07/12 00:28 +00:00)

- [#132](https://github.com/wwayne/react-tooltip/pull/132) Make getContent to support dynamical generate content while hover (@wwayne)
- [#131](https://github.com/wwayne/react-tooltip/pull/131) Add possibility to recalculate content on show tooltip (@pokidovea)
- [#128](https://github.com/wwayne/react-tooltip/pull/128) Correct Typos in README.md (@gottsohn)

### 3.0.7 (2016/06/24 13:58 +00:00)

- [#124](https://github.com/wwayne/react-tooltip/pull/124) Consider both vertical and horizontal into place re-calculation (@wwayne)

### 3.0.6 (2016/06/23 01:08 +00:00)

- [#122](https://github.com/wwayne/react-tooltip/pull/122) Fixed "Wrong query selector for data-tip #121" (@neciu)

### 3.0.5 (2016/06/21 00:32 +00:00)

- [#120](https://github.com/wwayne/react-tooltip/pull/120) Fix custom event with specific id (@wwayne)

### 3.0.4 (2016/06/17 10:28 +00:00)

- [#117](https://github.com/wwayne/react-tooltip/pull/117) Improve deploy process (@wwayne)

### 3.0.0 (2016/06/16 12:39 +00:00)

- [#115](https://github.com/wwayne/react-tooltip/pull/115) Improve structure (@wwayne)
- [#106](https://github.com/wwayne/react-tooltip/pull/106) Workaround for fixed elements inside transformed elements (@nd0ut)

### 2.0.3 (2016/06/01 13:45 +00:00)

- [#112](https://github.com/wwayne/react-tooltip/pull/112) Add custom event to hide tooltip (@wwayne)
- [#103](https://github.com/wwayne/react-tooltip/pull/103) Allow user to specify separate off event for the tooltip (@ondy1985)

### 2.0.2 (2016/05/19 10:01 +00:00)

- [#104](https://github.com/wwayne/react-tooltip/pull/104) Ensure data-html is converted to bool type (@antoniodgonzalez)

### 2.0.1 (2016/05/14 00:32 +00:00)

- [#102](https://github.com/wwayne/react-tooltip/pull/102) Clear hide timeout on component unmount (@oluckyman)
- [#100](https://github.com/wwayne/react-tooltip/pull/100) correct spelling error (@SashaBayan)
- [#99](https://github.com/wwayne/react-tooltip/pull/99) Simplify setting Sstate in the showTooltip (@Kiwka)

### 2.0.0 (2016/04/29 01:07 +00:00)

- [#96](https://github.com/wwayne/react-tooltip/pull/96) New attribute isCapture, deprecate eventPropagationMode (@wwayne)

### 1.2.1 (2016/04/23 00:16 +00:00)

- [#95](https://github.com/wwayne/react-tooltip/pull/95) Added ability to change event propagation mode from default "bubble" to "capture" (@aweber1)
- [#93](https://github.com/wwayne/react-tooltip/pull/93) Upgrade classnames to `^2.2.0` (@petrbrzek)
- [#92](https://github.com/wwayne/react-tooltip/pull/92) Update peer dependencies to support react / react-dom >= 15.0.0 (@cchamberlain)

### v1.1.3 (2016/03/10 12:57 +00:00)

- [#84](https://github.com/wwayne/react-tooltip/pull/84) Add logic to handle outside cases for solid tooltips #83 (@andrejunges)
- [#81](https://github.com/wwayne/react-tooltip/pull/81) Fix typo (@robzolkos)

### v1.1.2 (2016/02/15 12:31 +00:00)

- [#79](https://github.com/wwayne/react-tooltip/pull/79) Require the non-minified dist build in index (@idan)
- [#73](https://github.com/wwayne/react-tooltip/pull/73) Clear timeout when unmounting. (@joelburget)
- [#72](https://github.com/wwayne/react-tooltip/pull/72) clearing delayShowLoop-Timeout when component will unmount (@dsumer)

### v1.0.0 (2016/01/10 02:16 +00:00)

- [#68](https://github.com/wwayne/react-tooltip/pull/68) better fix for Maximum call stack size exceeded (@enjalot)
- [#62](https://github.com/wwayne/react-tooltip/pull/62) Fixes IE's lacking event constructor (@mikkelvagn)
- [#54](https://github.com/wwayne/react-tooltip/pull/54) New Feature: watchWindow (@Sly777)
- [#55](https://github.com/wwayne/react-tooltip/pull/55) Add support for borders (@ahstro)
- [#1](https://github.com/wwayne/react-tooltip/pull/1) New Feature: watchWindow (@Sly777)

### v0.9.0 (2015/11/26 14:09 +00:00)

- [#53](https://github.com/wwayne/react-tooltip/pull/53) New Feature, Fixes (@Sly777)

### v0.5.0 (2015/09/13 00:55 +00:00)

- [#36](https://github.com/wwayne/react-tooltip/pull/36) also babelify and move style.js to dist (@conorhastings)
- [#34](https://github.com/wwayne/react-tooltip/pull/34) avoid getBoundingClientRect() to be called twice (@ruffle1986)

### v0.3.7 (2015/08/18 13:44 +00:00)

- [#26](https://github.com/wwayne/react-tooltip/pull/26) Add editorconfig and eslinter to project (@johnamiahford)

### v0.3.5 (2015/08/02 10:58 +00:00)

- [#22](https://github.com/wwayne/react-tooltip/pull/22) Convert ReactTooltip to es6 class (@johnamiahford)
- [#19](https://github.com/wwayne/react-tooltip/pull/19) remove querySelector and use findDOMNode instead (@bezreyhan)

### v0.3.0 (2015/06/17 08:46 +00:00)

- [#15](https://github.com/wwayne/react-tooltip/pull/15) Adding support for server-side rendering (@bluejamesbond)
- [#8](https://github.com/wwayne/react-tooltip/pull/8) Change curly brackets to quotes (single) (@af7)
- [#6](https://github.com/wwayne/react-tooltip/pull/6) Fix bug with mouse hover triggerring on tooltip children (@tom-s)
- [#5](https://github.com/wwayne/react-tooltip/pull/5) fixed classnames require call (@mciparelli)
