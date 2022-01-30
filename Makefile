#usage
dependency:
		npm ci

#dev
serve:
		npm run build --watch

lint:
		npx eslint .

lint_fix:
		npx eslint . --fix

build:
		rm -rf dist
		NODE_ENV=production npx webpack
