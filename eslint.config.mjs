// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node, ...globals.jest },
		},
		extends: [js.configs.recommended],
		ignores: ["node_modules/", "dist/"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
	{
		files: ["**/*.json"],
		language: "json/json",
		extends: [json.configs.recommended],
		ignores: ["package-lock.json"],
	},
	eslintConfigPrettier,
]);
