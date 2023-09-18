dev:
	npm run dev

build:
	npm run build

initialize:
	git init .
	npx create-next-app@latest frontend \
		--ts \
		--tailwind \
		--eslint \
		--app \
		--src-dir \
		--use-npm
	mv frontend/* .
	rm -rf frontend
