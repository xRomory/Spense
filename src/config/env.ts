import { z } from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default("http://localhost:3000"),
    APP_MOCK_API_PORT: z.string().optional().default("8080"),
  });

  const envVariables = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
    APP_URL: process.env.NEXT_PUBLIC_URL,
    APP_MOCK_API_PORT: process.env.NEXT_PUBLIC_MOCK_API_PORT
  };

  const parsedEnvVariables = EnvSchema.safeParse(envVariables);

  if(!parsedEnvVariables.success) {
    throw new Error(
      `Invalid env variable provided. The following variables are missing or invalid:
        ${Object.entries(z.treeifyError(parsedEnvVariables.error))
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
        }
      `,
    );
  }

  return parsedEnvVariables.data ?? {};
}

export const env = createEnv();