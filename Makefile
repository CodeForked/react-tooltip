NODE_BIN     = node_modules/.bin
EXAMPLE_DIST = example/dist
EXAMPLE_SRC  = example/src
STANDALONE   = standalone
SRC          = src
DIST         = dist
TEST         = test/*.spec.js

lint:
	@echo Linting...
	@$(NODE_BIN)/standard --verbose | $(NODE_BIN)/snazzy src/index.js

convertCSS:
	@echo Converting css...
	@node bin/transferSass.js

genStand:
	@echo Generating standard...
	@rm -rf $(STANDALONE) && mkdir $(STANDALONE)
	@$(NODE_BIN)/browserify -t babelify -t browserify-shim $(SRC)/index.js --standalone ReactTooltip -o $(STANDALONE)/react-tooltip.js
	@$(NODE_BIN)/browserify -t babelify -t browserify-shim $(SRC)/index.js --standalone ReactTooltip | $(NODE_BIN)/uglifyjs > $(STANDALONE)/react-tooltip.min.js

devJS:
	@$(NODE_BIN)/watchify -t babelify $(EXAMPLE_SRC)/index.js -o $(EXAMPLE_DIST)/index.js -dv

devCSS:
	@$(NODE_BIN)/node-sass $(EXAMPLE_SRC)/index.scss $(EXAMPLE_DIST)/index.css
	@$(NODE_BIN)/node-sass $(SRC)/index.scss $(EXAMPLE_DIST)/style.css
	@$(NODE_BIN)/node-sass -w $(EXAMPLE_SRC)/index.scss $(EXAMPLE_DIST)/index.css

deployExample:
	@$(NODE_BIN)/browserify -t [ babelify --presets  [@babel/preset-env @babel/react] ] $(EXAMPLE_SRC)/index.js -o $(EXAMPLE_DIST)/index.js -dv
	@$(NODE_BIN)/node-sass $(EXAMPLE_SRC)/index.scss $(EXAMPLE_DIST)/index.css
	@$(NODE_BIN)/node-sass $(SRC)/index.scss $(EXAMPLE_DIST)/style.css

devServer:
	@echo Listening 8888...
	@$(NODE_BIN)/http-server example -p 8888 -s

dev:
	@echo starting dev server...
	@rm -rf $(EXAMPLE_DIST)
	@mkdir -p $(EXAMPLE_DIST)
	@make convertCSS
	@$(NODE_BIN)/concurrently --kill-others "make devJS" "make devCSS" "make devServer"

deployJS:
	@echo Generating deploy JS files...
	@$(NODE_BIN)/babel $(SRC) --out-dir $(DIST)

unitTest:
	@echo Unit testing..
	@$(NODE_BIN)/mocha --require @babel/register $(TEST)	

deploy: lint
	@echo Deploy...
	@make unitTest 
	@rm -rf dist && mkdir dist
	@rm -rf $(EXAMPLE_DIST) && mkdir -p $(EXAMPLE_DIST)
	@make deployJS
	@make deployExample
	@make convertCSS
	@make genStand
	@echo success!

.PHONY: lint convertCSS genStand devJS devCSS devServer dev unitTest deployExample deployJS deployCSS deploy
	