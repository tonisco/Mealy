import { z } from "zod"

export const formatErrors = (
  errors: z.ZodFormattedError<Map<string, string>, string>,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        // eslint-disable-next-line no-underscore-dangle
        return `${name}: ${value._errors.join(", ")}\n`
      // eslint-disable-next-line no-useless-return, consistent-return
      return
    })
    .filter(Boolean)

const variables = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string(),
  JWT_SECRET: z.string(),

  API_URL: z.string().url().optional(),

  MAIL_OAUTH_REFRESH_TOKEN: z.string(),
  MAIL_OAUTH_CLIENT_SECRET: z.string(),
  MAIL_OAUTH_CLIENT_ID: z.string(),
  MAIL_USER: z.string(),
})

const getVariables = variables.safeParse(process.env)

if (!getVariables.success) {
  // eslint-disable-next-line no-console
  console.error(
    "Environment Variables missing:\n",
    ...formatErrors(getVariables.error.format()),
  )
  throw new Error("Invalid Environment Variables")
}

export const env = getVariables.data
