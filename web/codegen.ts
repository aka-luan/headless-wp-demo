import type { CodegenConfig } from "@graphql-codegen/cli";

// Generates types from the live WPGraphQL schema (introspection is on in local/development only).
// Run inside Docker so the CMS host resolves: `docker compose exec web npm run codegen`.
// Re-run whenever a field group changes. The output is committed so type-checks and
// production builds don't need a running CMS to compile.
const config: CodegenConfig = {
  schema: process.env.WP_GRAPHQL_URL ?? "http://cms.tagline.localhost/graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "src/lib/wp/__generated__/": {
      preset: "client",
      presetConfig: { fragmentMasking: false },
      config: {
        documentMode: "string",
        enumsAsTypes: true,
        useTypeImports: true,
        defaultScalarType: "unknown",
      },
    },
  },
};

export default config;
