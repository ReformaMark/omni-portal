/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as chatSupport from "../chatSupport.js";
import type * as deal from "../deal.js";
import type * as http from "../http.js";
import type * as projects from "../projects.js";
import type * as property from "../property.js";
import type * as realty from "../realty.js";
import type * as statementOfAccount from "../statementOfAccount.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  chatSupport: typeof chatSupport;
  deal: typeof deal;
  http: typeof http;
  projects: typeof projects;
  property: typeof property;
  realty: typeof realty;
  statementOfAccount: typeof statementOfAccount;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
