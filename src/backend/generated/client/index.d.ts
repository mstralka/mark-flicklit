
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Author
 * 
 */
export type Author = $Result.DefaultSelection<Prisma.$AuthorPayload>
/**
 * Model Work
 * 
 */
export type Work = $Result.DefaultSelection<Prisma.$WorkPayload>
/**
 * Model AuthorWork
 * 
 */
export type AuthorWork = $Result.DefaultSelection<Prisma.$AuthorWorkPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model UserInteraction
 * 
 */
export type UserInteraction = $Result.DefaultSelection<Prisma.$UserInteractionPayload>
/**
 * Model RecommendationScore
 * 
 */
export type RecommendationScore = $Result.DefaultSelection<Prisma.$RecommendationScorePayload>
/**
 * Model WorkSimilarity
 * 
 */
export type WorkSimilarity = $Result.DefaultSelection<Prisma.$WorkSimilarityPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserStatus: {
  Active: 'Active',
  Inactive: 'Inactive'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

}

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Authors
 * const authors = await prisma.author.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Authors
   * const authors = await prisma.author.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.author`: Exposes CRUD operations for the **Author** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authors
    * const authors = await prisma.author.findMany()
    * ```
    */
  get author(): Prisma.AuthorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.work`: Exposes CRUD operations for the **Work** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Works
    * const works = await prisma.work.findMany()
    * ```
    */
  get work(): Prisma.WorkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authorWork`: Exposes CRUD operations for the **AuthorWork** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthorWorks
    * const authorWorks = await prisma.authorWork.findMany()
    * ```
    */
  get authorWork(): Prisma.AuthorWorkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userInteraction`: Exposes CRUD operations for the **UserInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInteractions
    * const userInteractions = await prisma.userInteraction.findMany()
    * ```
    */
  get userInteraction(): Prisma.UserInteractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recommendationScore`: Exposes CRUD operations for the **RecommendationScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecommendationScores
    * const recommendationScores = await prisma.recommendationScore.findMany()
    * ```
    */
  get recommendationScore(): Prisma.RecommendationScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workSimilarity`: Exposes CRUD operations for the **WorkSimilarity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkSimilarities
    * const workSimilarities = await prisma.workSimilarity.findMany()
    * ```
    */
  get workSimilarity(): Prisma.WorkSimilarityDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Author: 'Author',
    Work: 'Work',
    AuthorWork: 'AuthorWork',
    User: 'User',
    UserProfile: 'UserProfile',
    UserInteraction: 'UserInteraction',
    RecommendationScore: 'RecommendationScore',
    WorkSimilarity: 'WorkSimilarity'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "author" | "work" | "authorWork" | "user" | "userProfile" | "userInteraction" | "recommendationScore" | "workSimilarity"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Author: {
        payload: Prisma.$AuthorPayload<ExtArgs>
        fields: Prisma.AuthorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          findFirst: {
            args: Prisma.AuthorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          findMany: {
            args: Prisma.AuthorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          create: {
            args: Prisma.AuthorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          createMany: {
            args: Prisma.AuthorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          delete: {
            args: Prisma.AuthorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          update: {
            args: Prisma.AuthorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          deleteMany: {
            args: Prisma.AuthorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          upsert: {
            args: Prisma.AuthorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          aggregate: {
            args: Prisma.AuthorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthor>
          }
          groupBy: {
            args: Prisma.AuthorGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorCountAggregateOutputType> | number
          }
        }
      }
      Work: {
        payload: Prisma.$WorkPayload<ExtArgs>
        fields: Prisma.WorkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          findFirst: {
            args: Prisma.WorkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          findMany: {
            args: Prisma.WorkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>[]
          }
          create: {
            args: Prisma.WorkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          createMany: {
            args: Prisma.WorkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>[]
          }
          delete: {
            args: Prisma.WorkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          update: {
            args: Prisma.WorkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          deleteMany: {
            args: Prisma.WorkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>[]
          }
          upsert: {
            args: Prisma.WorkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPayload>
          }
          aggregate: {
            args: Prisma.WorkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWork>
          }
          groupBy: {
            args: Prisma.WorkGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkCountArgs<ExtArgs>
            result: $Utils.Optional<WorkCountAggregateOutputType> | number
          }
        }
      }
      AuthorWork: {
        payload: Prisma.$AuthorWorkPayload<ExtArgs>
        fields: Prisma.AuthorWorkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorWorkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorWorkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>
          }
          findFirst: {
            args: Prisma.AuthorWorkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorWorkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>
          }
          findMany: {
            args: Prisma.AuthorWorkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>[]
          }
          create: {
            args: Prisma.AuthorWorkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>
          }
          createMany: {
            args: Prisma.AuthorWorkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthorWorkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>[]
          }
          delete: {
            args: Prisma.AuthorWorkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>
          }
          update: {
            args: Prisma.AuthorWorkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>
          }
          deleteMany: {
            args: Prisma.AuthorWorkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorWorkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthorWorkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>[]
          }
          upsert: {
            args: Prisma.AuthorWorkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorWorkPayload>
          }
          aggregate: {
            args: Prisma.AuthorWorkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthorWork>
          }
          groupBy: {
            args: Prisma.AuthorWorkGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorWorkGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorWorkCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorWorkCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      UserInteraction: {
        payload: Prisma.$UserInteractionPayload<ExtArgs>
        fields: Prisma.UserInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>
          }
          findFirst: {
            args: Prisma.UserInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>
          }
          findMany: {
            args: Prisma.UserInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>[]
          }
          create: {
            args: Prisma.UserInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>
          }
          createMany: {
            args: Prisma.UserInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>[]
          }
          delete: {
            args: Prisma.UserInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>
          }
          update: {
            args: Prisma.UserInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>
          }
          deleteMany: {
            args: Prisma.UserInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>[]
          }
          upsert: {
            args: Prisma.UserInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInteractionPayload>
          }
          aggregate: {
            args: Prisma.UserInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInteraction>
          }
          groupBy: {
            args: Prisma.UserInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<UserInteractionCountAggregateOutputType> | number
          }
        }
      }
      RecommendationScore: {
        payload: Prisma.$RecommendationScorePayload<ExtArgs>
        fields: Prisma.RecommendationScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecommendationScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecommendationScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>
          }
          findFirst: {
            args: Prisma.RecommendationScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecommendationScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>
          }
          findMany: {
            args: Prisma.RecommendationScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>[]
          }
          create: {
            args: Prisma.RecommendationScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>
          }
          createMany: {
            args: Prisma.RecommendationScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecommendationScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>[]
          }
          delete: {
            args: Prisma.RecommendationScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>
          }
          update: {
            args: Prisma.RecommendationScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>
          }
          deleteMany: {
            args: Prisma.RecommendationScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecommendationScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecommendationScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>[]
          }
          upsert: {
            args: Prisma.RecommendationScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecommendationScorePayload>
          }
          aggregate: {
            args: Prisma.RecommendationScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecommendationScore>
          }
          groupBy: {
            args: Prisma.RecommendationScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecommendationScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecommendationScoreCountArgs<ExtArgs>
            result: $Utils.Optional<RecommendationScoreCountAggregateOutputType> | number
          }
        }
      }
      WorkSimilarity: {
        payload: Prisma.$WorkSimilarityPayload<ExtArgs>
        fields: Prisma.WorkSimilarityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkSimilarityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkSimilarityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>
          }
          findFirst: {
            args: Prisma.WorkSimilarityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkSimilarityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>
          }
          findMany: {
            args: Prisma.WorkSimilarityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>[]
          }
          create: {
            args: Prisma.WorkSimilarityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>
          }
          createMany: {
            args: Prisma.WorkSimilarityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkSimilarityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>[]
          }
          delete: {
            args: Prisma.WorkSimilarityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>
          }
          update: {
            args: Prisma.WorkSimilarityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>
          }
          deleteMany: {
            args: Prisma.WorkSimilarityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkSimilarityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkSimilarityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>[]
          }
          upsert: {
            args: Prisma.WorkSimilarityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkSimilarityPayload>
          }
          aggregate: {
            args: Prisma.WorkSimilarityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkSimilarity>
          }
          groupBy: {
            args: Prisma.WorkSimilarityGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkSimilarityGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkSimilarityCountArgs<ExtArgs>
            result: $Utils.Optional<WorkSimilarityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    author?: AuthorOmit
    work?: WorkOmit
    authorWork?: AuthorWorkOmit
    user?: UserOmit
    userProfile?: UserProfileOmit
    userInteraction?: UserInteractionOmit
    recommendationScore?: RecommendationScoreOmit
    workSimilarity?: WorkSimilarityOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AuthorCountOutputType
   */

  export type AuthorCountOutputType = {
    works: number
  }

  export type AuthorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    works?: boolean | AuthorCountOutputTypeCountWorksArgs
  }

  // Custom InputTypes
  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorCountOutputType
     */
    select?: AuthorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeCountWorksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWorkWhereInput
  }


  /**
   * Count Type WorkCountOutputType
   */

  export type WorkCountOutputType = {
    authors: number
    userInteractions: number
    recommendationScores: number
    sourceWorkSimilarities: number
    targetWorkSimilarities: number
  }

  export type WorkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authors?: boolean | WorkCountOutputTypeCountAuthorsArgs
    userInteractions?: boolean | WorkCountOutputTypeCountUserInteractionsArgs
    recommendationScores?: boolean | WorkCountOutputTypeCountRecommendationScoresArgs
    sourceWorkSimilarities?: boolean | WorkCountOutputTypeCountSourceWorkSimilaritiesArgs
    targetWorkSimilarities?: boolean | WorkCountOutputTypeCountTargetWorkSimilaritiesArgs
  }

  // Custom InputTypes
  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkCountOutputType
     */
    select?: WorkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountAuthorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWorkWhereInput
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountUserInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInteractionWhereInput
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountRecommendationScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationScoreWhereInput
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountSourceWorkSimilaritiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkSimilarityWhereInput
  }

  /**
   * WorkCountOutputType without action
   */
  export type WorkCountOutputTypeCountTargetWorkSimilaritiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkSimilarityWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    interactions: number
    recommendationScores: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interactions?: boolean | UserCountOutputTypeCountInteractionsArgs
    recommendationScores?: boolean | UserCountOutputTypeCountRecommendationScoresArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInteractionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecommendationScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationScoreWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Author
   */

  export type AggregateAuthor = {
    _count: AuthorCountAggregateOutputType | null
    _avg: AuthorAvgAggregateOutputType | null
    _sum: AuthorSumAggregateOutputType | null
    _min: AuthorMinAggregateOutputType | null
    _max: AuthorMaxAggregateOutputType | null
  }

  export type AuthorAvgAggregateOutputType = {
    id: number | null
  }

  export type AuthorSumAggregateOutputType = {
    id: number | null
  }

  export type AuthorMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    openLibraryId: string | null
    name: string | null
    personalName: string | null
    birthDate: string | null
    deathDate: string | null
    bio: string | null
    alternateNames: string | null
    location: string | null
    easternOrder: boolean | null
    wikipedia: string | null
    links: string | null
  }

  export type AuthorMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    openLibraryId: string | null
    name: string | null
    personalName: string | null
    birthDate: string | null
    deathDate: string | null
    bio: string | null
    alternateNames: string | null
    location: string | null
    easternOrder: boolean | null
    wikipedia: string | null
    links: string | null
  }

  export type AuthorCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    openLibraryId: number
    name: number
    personalName: number
    birthDate: number
    deathDate: number
    bio: number
    alternateNames: number
    location: number
    easternOrder: number
    wikipedia: number
    links: number
    _all: number
  }


  export type AuthorAvgAggregateInputType = {
    id?: true
  }

  export type AuthorSumAggregateInputType = {
    id?: true
  }

  export type AuthorMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    openLibraryId?: true
    name?: true
    personalName?: true
    birthDate?: true
    deathDate?: true
    bio?: true
    alternateNames?: true
    location?: true
    easternOrder?: true
    wikipedia?: true
    links?: true
  }

  export type AuthorMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    openLibraryId?: true
    name?: true
    personalName?: true
    birthDate?: true
    deathDate?: true
    bio?: true
    alternateNames?: true
    location?: true
    easternOrder?: true
    wikipedia?: true
    links?: true
  }

  export type AuthorCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    openLibraryId?: true
    name?: true
    personalName?: true
    birthDate?: true
    deathDate?: true
    bio?: true
    alternateNames?: true
    location?: true
    easternOrder?: true
    wikipedia?: true
    links?: true
    _all?: true
  }

  export type AuthorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Author to aggregate.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authors
    **/
    _count?: true | AuthorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorMaxAggregateInputType
  }

  export type GetAuthorAggregateType<T extends AuthorAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthor[P]>
      : GetScalarType<T[P], AggregateAuthor[P]>
  }




  export type AuthorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWhereInput
    orderBy?: AuthorOrderByWithAggregationInput | AuthorOrderByWithAggregationInput[]
    by: AuthorScalarFieldEnum[] | AuthorScalarFieldEnum
    having?: AuthorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorCountAggregateInputType | true
    _avg?: AuthorAvgAggregateInputType
    _sum?: AuthorSumAggregateInputType
    _min?: AuthorMinAggregateInputType
    _max?: AuthorMaxAggregateInputType
  }

  export type AuthorGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    openLibraryId: string | null
    name: string
    personalName: string | null
    birthDate: string | null
    deathDate: string | null
    bio: string | null
    alternateNames: string | null
    location: string | null
    easternOrder: boolean | null
    wikipedia: string | null
    links: string | null
    _count: AuthorCountAggregateOutputType | null
    _avg: AuthorAvgAggregateOutputType | null
    _sum: AuthorSumAggregateOutputType | null
    _min: AuthorMinAggregateOutputType | null
    _max: AuthorMaxAggregateOutputType | null
  }

  type GetAuthorGroupByPayload<T extends AuthorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorGroupByOutputType[P]>
        }
      >
    >


  export type AuthorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    name?: boolean
    personalName?: boolean
    birthDate?: boolean
    deathDate?: boolean
    bio?: boolean
    alternateNames?: boolean
    location?: boolean
    easternOrder?: boolean
    wikipedia?: boolean
    links?: boolean
    works?: boolean | Author$worksArgs<ExtArgs>
    _count?: boolean | AuthorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    name?: boolean
    personalName?: boolean
    birthDate?: boolean
    deathDate?: boolean
    bio?: boolean
    alternateNames?: boolean
    location?: boolean
    easternOrder?: boolean
    wikipedia?: boolean
    links?: boolean
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    name?: boolean
    personalName?: boolean
    birthDate?: boolean
    deathDate?: boolean
    bio?: boolean
    alternateNames?: boolean
    location?: boolean
    easternOrder?: boolean
    wikipedia?: boolean
    links?: boolean
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    name?: boolean
    personalName?: boolean
    birthDate?: boolean
    deathDate?: boolean
    bio?: boolean
    alternateNames?: boolean
    location?: boolean
    easternOrder?: boolean
    wikipedia?: boolean
    links?: boolean
  }

  export type AuthorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "openLibraryId" | "name" | "personalName" | "birthDate" | "deathDate" | "bio" | "alternateNames" | "location" | "easternOrder" | "wikipedia" | "links", ExtArgs["result"]["author"]>
  export type AuthorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    works?: boolean | Author$worksArgs<ExtArgs>
    _count?: boolean | AuthorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AuthorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AuthorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AuthorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Author"
    objects: {
      works: Prisma.$AuthorWorkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      openLibraryId: string | null
      name: string
      personalName: string | null
      birthDate: string | null
      deathDate: string | null
      bio: string | null
      alternateNames: string | null
      location: string | null
      easternOrder: boolean | null
      wikipedia: string | null
      links: string | null
    }, ExtArgs["result"]["author"]>
    composites: {}
  }

  type AuthorGetPayload<S extends boolean | null | undefined | AuthorDefaultArgs> = $Result.GetResult<Prisma.$AuthorPayload, S>

  type AuthorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorCountAggregateInputType | true
    }

  export interface AuthorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Author'], meta: { name: 'Author' } }
    /**
     * Find zero or one Author that matches the filter.
     * @param {AuthorFindUniqueArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorFindUniqueArgs>(args: SelectSubset<T, AuthorFindUniqueArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Author that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorFindUniqueOrThrowArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Author that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindFirstArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorFindFirstArgs>(args?: SelectSubset<T, AuthorFindFirstArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Author that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindFirstOrThrowArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authors
     * const authors = await prisma.author.findMany()
     * 
     * // Get first 10 Authors
     * const authors = await prisma.author.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorWithIdOnly = await prisma.author.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorFindManyArgs>(args?: SelectSubset<T, AuthorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Author.
     * @param {AuthorCreateArgs} args - Arguments to create a Author.
     * @example
     * // Create one Author
     * const Author = await prisma.author.create({
     *   data: {
     *     // ... data to create a Author
     *   }
     * })
     * 
     */
    create<T extends AuthorCreateArgs>(args: SelectSubset<T, AuthorCreateArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Authors.
     * @param {AuthorCreateManyArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const author = await prisma.author.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorCreateManyArgs>(args?: SelectSubset<T, AuthorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authors and returns the data saved in the database.
     * @param {AuthorCreateManyAndReturnArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const author = await prisma.author.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authors and only return the `id`
     * const authorWithIdOnly = await prisma.author.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthorCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Author.
     * @param {AuthorDeleteArgs} args - Arguments to delete one Author.
     * @example
     * // Delete one Author
     * const Author = await prisma.author.delete({
     *   where: {
     *     // ... filter to delete one Author
     *   }
     * })
     * 
     */
    delete<T extends AuthorDeleteArgs>(args: SelectSubset<T, AuthorDeleteArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Author.
     * @param {AuthorUpdateArgs} args - Arguments to update one Author.
     * @example
     * // Update one Author
     * const author = await prisma.author.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorUpdateArgs>(args: SelectSubset<T, AuthorUpdateArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Authors.
     * @param {AuthorDeleteManyArgs} args - Arguments to filter Authors to delete.
     * @example
     * // Delete a few Authors
     * const { count } = await prisma.author.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorDeleteManyArgs>(args?: SelectSubset<T, AuthorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authors
     * const author = await prisma.author.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorUpdateManyArgs>(args: SelectSubset<T, AuthorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors and returns the data updated in the database.
     * @param {AuthorUpdateManyAndReturnArgs} args - Arguments to update many Authors.
     * @example
     * // Update many Authors
     * const author = await prisma.author.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authors and only return the `id`
     * const authorWithIdOnly = await prisma.author.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthorUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Author.
     * @param {AuthorUpsertArgs} args - Arguments to update or create a Author.
     * @example
     * // Update or create a Author
     * const author = await prisma.author.upsert({
     *   create: {
     *     // ... data to create a Author
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Author we want to update
     *   }
     * })
     */
    upsert<T extends AuthorUpsertArgs>(args: SelectSubset<T, AuthorUpsertArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorCountArgs} args - Arguments to filter Authors to count.
     * @example
     * // Count the number of Authors
     * const count = await prisma.author.count({
     *   where: {
     *     // ... the filter for the Authors we want to count
     *   }
     * })
    **/
    count<T extends AuthorCountArgs>(
      args?: Subset<T, AuthorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorAggregateArgs>(args: Subset<T, AuthorAggregateArgs>): Prisma.PrismaPromise<GetAuthorAggregateType<T>>

    /**
     * Group by Author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorGroupByArgs['orderBy'] }
        : { orderBy?: AuthorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Author model
   */
  readonly fields: AuthorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Author.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    works<T extends Author$worksArgs<ExtArgs> = {}>(args?: Subset<T, Author$worksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Author model
   */
  interface AuthorFieldRefs {
    readonly id: FieldRef<"Author", 'Int'>
    readonly createdAt: FieldRef<"Author", 'DateTime'>
    readonly updatedAt: FieldRef<"Author", 'DateTime'>
    readonly openLibraryId: FieldRef<"Author", 'String'>
    readonly name: FieldRef<"Author", 'String'>
    readonly personalName: FieldRef<"Author", 'String'>
    readonly birthDate: FieldRef<"Author", 'String'>
    readonly deathDate: FieldRef<"Author", 'String'>
    readonly bio: FieldRef<"Author", 'String'>
    readonly alternateNames: FieldRef<"Author", 'String'>
    readonly location: FieldRef<"Author", 'String'>
    readonly easternOrder: FieldRef<"Author", 'Boolean'>
    readonly wikipedia: FieldRef<"Author", 'String'>
    readonly links: FieldRef<"Author", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Author findUnique
   */
  export type AuthorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author findUniqueOrThrow
   */
  export type AuthorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author findFirst
   */
  export type AuthorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authors.
     */
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author findFirstOrThrow
   */
  export type AuthorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authors.
     */
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author findMany
   */
  export type AuthorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Authors to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author create
   */
  export type AuthorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The data needed to create a Author.
     */
    data: XOR<AuthorCreateInput, AuthorUncheckedCreateInput>
  }

  /**
   * Author createMany
   */
  export type AuthorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authors.
     */
    data: AuthorCreateManyInput | AuthorCreateManyInput[]
  }

  /**
   * Author createManyAndReturn
   */
  export type AuthorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * The data used to create many Authors.
     */
    data: AuthorCreateManyInput | AuthorCreateManyInput[]
  }

  /**
   * Author update
   */
  export type AuthorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The data needed to update a Author.
     */
    data: XOR<AuthorUpdateInput, AuthorUncheckedUpdateInput>
    /**
     * Choose, which Author to update.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author updateMany
   */
  export type AuthorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authors.
     */
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyInput>
    /**
     * Filter which Authors to update
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to update.
     */
    limit?: number
  }

  /**
   * Author updateManyAndReturn
   */
  export type AuthorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * The data used to update Authors.
     */
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyInput>
    /**
     * Filter which Authors to update
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to update.
     */
    limit?: number
  }

  /**
   * Author upsert
   */
  export type AuthorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The filter to search for the Author to update in case it exists.
     */
    where: AuthorWhereUniqueInput
    /**
     * In case the Author found by the `where` argument doesn't exist, create a new Author with this data.
     */
    create: XOR<AuthorCreateInput, AuthorUncheckedCreateInput>
    /**
     * In case the Author was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorUpdateInput, AuthorUncheckedUpdateInput>
  }

  /**
   * Author delete
   */
  export type AuthorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter which Author to delete.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author deleteMany
   */
  export type AuthorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authors to delete
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to delete.
     */
    limit?: number
  }

  /**
   * Author.works
   */
  export type Author$worksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    where?: AuthorWorkWhereInput
    orderBy?: AuthorWorkOrderByWithRelationInput | AuthorWorkOrderByWithRelationInput[]
    cursor?: AuthorWorkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthorWorkScalarFieldEnum | AuthorWorkScalarFieldEnum[]
  }

  /**
   * Author without action
   */
  export type AuthorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
  }


  /**
   * Model Work
   */

  export type AggregateWork = {
    _count: WorkCountAggregateOutputType | null
    _avg: WorkAvgAggregateOutputType | null
    _sum: WorkSumAggregateOutputType | null
    _min: WorkMinAggregateOutputType | null
    _max: WorkMaxAggregateOutputType | null
  }

  export type WorkAvgAggregateOutputType = {
    id: number | null
  }

  export type WorkSumAggregateOutputType = {
    id: number | null
  }

  export type WorkMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    openLibraryId: string | null
    title: string | null
    subtitle: string | null
    description: string | null
    firstPublishDate: string | null
    firstSentence: string | null
    subjects: string | null
    subjectPlaces: string | null
    subjectTimes: string | null
    subjectPeople: string | null
    originalLanguages: string | null
    otherTitles: string | null
  }

  export type WorkMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    openLibraryId: string | null
    title: string | null
    subtitle: string | null
    description: string | null
    firstPublishDate: string | null
    firstSentence: string | null
    subjects: string | null
    subjectPlaces: string | null
    subjectTimes: string | null
    subjectPeople: string | null
    originalLanguages: string | null
    otherTitles: string | null
  }

  export type WorkCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    openLibraryId: number
    title: number
    subtitle: number
    description: number
    firstPublishDate: number
    firstSentence: number
    subjects: number
    subjectPlaces: number
    subjectTimes: number
    subjectPeople: number
    originalLanguages: number
    otherTitles: number
    _all: number
  }


  export type WorkAvgAggregateInputType = {
    id?: true
  }

  export type WorkSumAggregateInputType = {
    id?: true
  }

  export type WorkMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    openLibraryId?: true
    title?: true
    subtitle?: true
    description?: true
    firstPublishDate?: true
    firstSentence?: true
    subjects?: true
    subjectPlaces?: true
    subjectTimes?: true
    subjectPeople?: true
    originalLanguages?: true
    otherTitles?: true
  }

  export type WorkMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    openLibraryId?: true
    title?: true
    subtitle?: true
    description?: true
    firstPublishDate?: true
    firstSentence?: true
    subjects?: true
    subjectPlaces?: true
    subjectTimes?: true
    subjectPeople?: true
    originalLanguages?: true
    otherTitles?: true
  }

  export type WorkCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    openLibraryId?: true
    title?: true
    subtitle?: true
    description?: true
    firstPublishDate?: true
    firstSentence?: true
    subjects?: true
    subjectPlaces?: true
    subjectTimes?: true
    subjectPeople?: true
    originalLanguages?: true
    otherTitles?: true
    _all?: true
  }

  export type WorkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Work to aggregate.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Works
    **/
    _count?: true | WorkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkMaxAggregateInputType
  }

  export type GetWorkAggregateType<T extends WorkAggregateArgs> = {
        [P in keyof T & keyof AggregateWork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWork[P]>
      : GetScalarType<T[P], AggregateWork[P]>
  }




  export type WorkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkWhereInput
    orderBy?: WorkOrderByWithAggregationInput | WorkOrderByWithAggregationInput[]
    by: WorkScalarFieldEnum[] | WorkScalarFieldEnum
    having?: WorkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkCountAggregateInputType | true
    _avg?: WorkAvgAggregateInputType
    _sum?: WorkSumAggregateInputType
    _min?: WorkMinAggregateInputType
    _max?: WorkMaxAggregateInputType
  }

  export type WorkGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    openLibraryId: string | null
    title: string
    subtitle: string | null
    description: string | null
    firstPublishDate: string | null
    firstSentence: string | null
    subjects: string | null
    subjectPlaces: string | null
    subjectTimes: string | null
    subjectPeople: string | null
    originalLanguages: string | null
    otherTitles: string | null
    _count: WorkCountAggregateOutputType | null
    _avg: WorkAvgAggregateOutputType | null
    _sum: WorkSumAggregateOutputType | null
    _min: WorkMinAggregateOutputType | null
    _max: WorkMaxAggregateOutputType | null
  }

  type GetWorkGroupByPayload<T extends WorkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkGroupByOutputType[P]>
            : GetScalarType<T[P], WorkGroupByOutputType[P]>
        }
      >
    >


  export type WorkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    firstPublishDate?: boolean
    firstSentence?: boolean
    subjects?: boolean
    subjectPlaces?: boolean
    subjectTimes?: boolean
    subjectPeople?: boolean
    originalLanguages?: boolean
    otherTitles?: boolean
    authors?: boolean | Work$authorsArgs<ExtArgs>
    userInteractions?: boolean | Work$userInteractionsArgs<ExtArgs>
    recommendationScores?: boolean | Work$recommendationScoresArgs<ExtArgs>
    sourceWorkSimilarities?: boolean | Work$sourceWorkSimilaritiesArgs<ExtArgs>
    targetWorkSimilarities?: boolean | Work$targetWorkSimilaritiesArgs<ExtArgs>
    _count?: boolean | WorkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["work"]>

  export type WorkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    firstPublishDate?: boolean
    firstSentence?: boolean
    subjects?: boolean
    subjectPlaces?: boolean
    subjectTimes?: boolean
    subjectPeople?: boolean
    originalLanguages?: boolean
    otherTitles?: boolean
  }, ExtArgs["result"]["work"]>

  export type WorkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    firstPublishDate?: boolean
    firstSentence?: boolean
    subjects?: boolean
    subjectPlaces?: boolean
    subjectTimes?: boolean
    subjectPeople?: boolean
    originalLanguages?: boolean
    otherTitles?: boolean
  }, ExtArgs["result"]["work"]>

  export type WorkSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    openLibraryId?: boolean
    title?: boolean
    subtitle?: boolean
    description?: boolean
    firstPublishDate?: boolean
    firstSentence?: boolean
    subjects?: boolean
    subjectPlaces?: boolean
    subjectTimes?: boolean
    subjectPeople?: boolean
    originalLanguages?: boolean
    otherTitles?: boolean
  }

  export type WorkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "openLibraryId" | "title" | "subtitle" | "description" | "firstPublishDate" | "firstSentence" | "subjects" | "subjectPlaces" | "subjectTimes" | "subjectPeople" | "originalLanguages" | "otherTitles", ExtArgs["result"]["work"]>
  export type WorkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authors?: boolean | Work$authorsArgs<ExtArgs>
    userInteractions?: boolean | Work$userInteractionsArgs<ExtArgs>
    recommendationScores?: boolean | Work$recommendationScoresArgs<ExtArgs>
    sourceWorkSimilarities?: boolean | Work$sourceWorkSimilaritiesArgs<ExtArgs>
    targetWorkSimilarities?: boolean | Work$targetWorkSimilaritiesArgs<ExtArgs>
    _count?: boolean | WorkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Work"
    objects: {
      authors: Prisma.$AuthorWorkPayload<ExtArgs>[]
      userInteractions: Prisma.$UserInteractionPayload<ExtArgs>[]
      recommendationScores: Prisma.$RecommendationScorePayload<ExtArgs>[]
      sourceWorkSimilarities: Prisma.$WorkSimilarityPayload<ExtArgs>[]
      targetWorkSimilarities: Prisma.$WorkSimilarityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      openLibraryId: string | null
      title: string
      subtitle: string | null
      description: string | null
      firstPublishDate: string | null
      firstSentence: string | null
      subjects: string | null
      subjectPlaces: string | null
      subjectTimes: string | null
      subjectPeople: string | null
      originalLanguages: string | null
      otherTitles: string | null
    }, ExtArgs["result"]["work"]>
    composites: {}
  }

  type WorkGetPayload<S extends boolean | null | undefined | WorkDefaultArgs> = $Result.GetResult<Prisma.$WorkPayload, S>

  type WorkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkCountAggregateInputType | true
    }

  export interface WorkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Work'], meta: { name: 'Work' } }
    /**
     * Find zero or one Work that matches the filter.
     * @param {WorkFindUniqueArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkFindUniqueArgs>(args: SelectSubset<T, WorkFindUniqueArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Work that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkFindUniqueOrThrowArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Work that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkFindFirstArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkFindFirstArgs>(args?: SelectSubset<T, WorkFindFirstArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Work that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkFindFirstOrThrowArgs} args - Arguments to find a Work
     * @example
     * // Get one Work
     * const work = await prisma.work.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Works that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Works
     * const works = await prisma.work.findMany()
     * 
     * // Get first 10 Works
     * const works = await prisma.work.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workWithIdOnly = await prisma.work.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkFindManyArgs>(args?: SelectSubset<T, WorkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Work.
     * @param {WorkCreateArgs} args - Arguments to create a Work.
     * @example
     * // Create one Work
     * const Work = await prisma.work.create({
     *   data: {
     *     // ... data to create a Work
     *   }
     * })
     * 
     */
    create<T extends WorkCreateArgs>(args: SelectSubset<T, WorkCreateArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Works.
     * @param {WorkCreateManyArgs} args - Arguments to create many Works.
     * @example
     * // Create many Works
     * const work = await prisma.work.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkCreateManyArgs>(args?: SelectSubset<T, WorkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Works and returns the data saved in the database.
     * @param {WorkCreateManyAndReturnArgs} args - Arguments to create many Works.
     * @example
     * // Create many Works
     * const work = await prisma.work.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Works and only return the `id`
     * const workWithIdOnly = await prisma.work.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Work.
     * @param {WorkDeleteArgs} args - Arguments to delete one Work.
     * @example
     * // Delete one Work
     * const Work = await prisma.work.delete({
     *   where: {
     *     // ... filter to delete one Work
     *   }
     * })
     * 
     */
    delete<T extends WorkDeleteArgs>(args: SelectSubset<T, WorkDeleteArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Work.
     * @param {WorkUpdateArgs} args - Arguments to update one Work.
     * @example
     * // Update one Work
     * const work = await prisma.work.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkUpdateArgs>(args: SelectSubset<T, WorkUpdateArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Works.
     * @param {WorkDeleteManyArgs} args - Arguments to filter Works to delete.
     * @example
     * // Delete a few Works
     * const { count } = await prisma.work.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkDeleteManyArgs>(args?: SelectSubset<T, WorkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Works.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Works
     * const work = await prisma.work.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkUpdateManyArgs>(args: SelectSubset<T, WorkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Works and returns the data updated in the database.
     * @param {WorkUpdateManyAndReturnArgs} args - Arguments to update many Works.
     * @example
     * // Update many Works
     * const work = await prisma.work.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Works and only return the `id`
     * const workWithIdOnly = await prisma.work.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Work.
     * @param {WorkUpsertArgs} args - Arguments to update or create a Work.
     * @example
     * // Update or create a Work
     * const work = await prisma.work.upsert({
     *   create: {
     *     // ... data to create a Work
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Work we want to update
     *   }
     * })
     */
    upsert<T extends WorkUpsertArgs>(args: SelectSubset<T, WorkUpsertArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Works.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkCountArgs} args - Arguments to filter Works to count.
     * @example
     * // Count the number of Works
     * const count = await prisma.work.count({
     *   where: {
     *     // ... the filter for the Works we want to count
     *   }
     * })
    **/
    count<T extends WorkCountArgs>(
      args?: Subset<T, WorkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Work.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkAggregateArgs>(args: Subset<T, WorkAggregateArgs>): Prisma.PrismaPromise<GetWorkAggregateType<T>>

    /**
     * Group by Work.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkGroupByArgs['orderBy'] }
        : { orderBy?: WorkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Work model
   */
  readonly fields: WorkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Work.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authors<T extends Work$authorsArgs<ExtArgs> = {}>(args?: Subset<T, Work$authorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userInteractions<T extends Work$userInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, Work$userInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recommendationScores<T extends Work$recommendationScoresArgs<ExtArgs> = {}>(args?: Subset<T, Work$recommendationScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sourceWorkSimilarities<T extends Work$sourceWorkSimilaritiesArgs<ExtArgs> = {}>(args?: Subset<T, Work$sourceWorkSimilaritiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    targetWorkSimilarities<T extends Work$targetWorkSimilaritiesArgs<ExtArgs> = {}>(args?: Subset<T, Work$targetWorkSimilaritiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Work model
   */
  interface WorkFieldRefs {
    readonly id: FieldRef<"Work", 'Int'>
    readonly createdAt: FieldRef<"Work", 'DateTime'>
    readonly updatedAt: FieldRef<"Work", 'DateTime'>
    readonly openLibraryId: FieldRef<"Work", 'String'>
    readonly title: FieldRef<"Work", 'String'>
    readonly subtitle: FieldRef<"Work", 'String'>
    readonly description: FieldRef<"Work", 'String'>
    readonly firstPublishDate: FieldRef<"Work", 'String'>
    readonly firstSentence: FieldRef<"Work", 'String'>
    readonly subjects: FieldRef<"Work", 'String'>
    readonly subjectPlaces: FieldRef<"Work", 'String'>
    readonly subjectTimes: FieldRef<"Work", 'String'>
    readonly subjectPeople: FieldRef<"Work", 'String'>
    readonly originalLanguages: FieldRef<"Work", 'String'>
    readonly otherTitles: FieldRef<"Work", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Work findUnique
   */
  export type WorkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where: WorkWhereUniqueInput
  }

  /**
   * Work findUniqueOrThrow
   */
  export type WorkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where: WorkWhereUniqueInput
  }

  /**
   * Work findFirst
   */
  export type WorkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Works.
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Works.
     */
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
  }

  /**
   * Work findFirstOrThrow
   */
  export type WorkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Work to fetch.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Works.
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Works.
     */
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
  }

  /**
   * Work findMany
   */
  export type WorkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter, which Works to fetch.
     */
    where?: WorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Works to fetch.
     */
    orderBy?: WorkOrderByWithRelationInput | WorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Works.
     */
    cursor?: WorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Works from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Works.
     */
    skip?: number
    distinct?: WorkScalarFieldEnum | WorkScalarFieldEnum[]
  }

  /**
   * Work create
   */
  export type WorkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * The data needed to create a Work.
     */
    data: XOR<WorkCreateInput, WorkUncheckedCreateInput>
  }

  /**
   * Work createMany
   */
  export type WorkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Works.
     */
    data: WorkCreateManyInput | WorkCreateManyInput[]
  }

  /**
   * Work createManyAndReturn
   */
  export type WorkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * The data used to create many Works.
     */
    data: WorkCreateManyInput | WorkCreateManyInput[]
  }

  /**
   * Work update
   */
  export type WorkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * The data needed to update a Work.
     */
    data: XOR<WorkUpdateInput, WorkUncheckedUpdateInput>
    /**
     * Choose, which Work to update.
     */
    where: WorkWhereUniqueInput
  }

  /**
   * Work updateMany
   */
  export type WorkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Works.
     */
    data: XOR<WorkUpdateManyMutationInput, WorkUncheckedUpdateManyInput>
    /**
     * Filter which Works to update
     */
    where?: WorkWhereInput
    /**
     * Limit how many Works to update.
     */
    limit?: number
  }

  /**
   * Work updateManyAndReturn
   */
  export type WorkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * The data used to update Works.
     */
    data: XOR<WorkUpdateManyMutationInput, WorkUncheckedUpdateManyInput>
    /**
     * Filter which Works to update
     */
    where?: WorkWhereInput
    /**
     * Limit how many Works to update.
     */
    limit?: number
  }

  /**
   * Work upsert
   */
  export type WorkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * The filter to search for the Work to update in case it exists.
     */
    where: WorkWhereUniqueInput
    /**
     * In case the Work found by the `where` argument doesn't exist, create a new Work with this data.
     */
    create: XOR<WorkCreateInput, WorkUncheckedCreateInput>
    /**
     * In case the Work was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkUpdateInput, WorkUncheckedUpdateInput>
  }

  /**
   * Work delete
   */
  export type WorkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
    /**
     * Filter which Work to delete.
     */
    where: WorkWhereUniqueInput
  }

  /**
   * Work deleteMany
   */
  export type WorkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Works to delete
     */
    where?: WorkWhereInput
    /**
     * Limit how many Works to delete.
     */
    limit?: number
  }

  /**
   * Work.authors
   */
  export type Work$authorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    where?: AuthorWorkWhereInput
    orderBy?: AuthorWorkOrderByWithRelationInput | AuthorWorkOrderByWithRelationInput[]
    cursor?: AuthorWorkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthorWorkScalarFieldEnum | AuthorWorkScalarFieldEnum[]
  }

  /**
   * Work.userInteractions
   */
  export type Work$userInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    where?: UserInteractionWhereInput
    orderBy?: UserInteractionOrderByWithRelationInput | UserInteractionOrderByWithRelationInput[]
    cursor?: UserInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInteractionScalarFieldEnum | UserInteractionScalarFieldEnum[]
  }

  /**
   * Work.recommendationScores
   */
  export type Work$recommendationScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    where?: RecommendationScoreWhereInput
    orderBy?: RecommendationScoreOrderByWithRelationInput | RecommendationScoreOrderByWithRelationInput[]
    cursor?: RecommendationScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecommendationScoreScalarFieldEnum | RecommendationScoreScalarFieldEnum[]
  }

  /**
   * Work.sourceWorkSimilarities
   */
  export type Work$sourceWorkSimilaritiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    where?: WorkSimilarityWhereInput
    orderBy?: WorkSimilarityOrderByWithRelationInput | WorkSimilarityOrderByWithRelationInput[]
    cursor?: WorkSimilarityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkSimilarityScalarFieldEnum | WorkSimilarityScalarFieldEnum[]
  }

  /**
   * Work.targetWorkSimilarities
   */
  export type Work$targetWorkSimilaritiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    where?: WorkSimilarityWhereInput
    orderBy?: WorkSimilarityOrderByWithRelationInput | WorkSimilarityOrderByWithRelationInput[]
    cursor?: WorkSimilarityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkSimilarityScalarFieldEnum | WorkSimilarityScalarFieldEnum[]
  }

  /**
   * Work without action
   */
  export type WorkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Work
     */
    select?: WorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Work
     */
    omit?: WorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkInclude<ExtArgs> | null
  }


  /**
   * Model AuthorWork
   */

  export type AggregateAuthorWork = {
    _count: AuthorWorkCountAggregateOutputType | null
    _avg: AuthorWorkAvgAggregateOutputType | null
    _sum: AuthorWorkSumAggregateOutputType | null
    _min: AuthorWorkMinAggregateOutputType | null
    _max: AuthorWorkMaxAggregateOutputType | null
  }

  export type AuthorWorkAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
    workId: number | null
  }

  export type AuthorWorkSumAggregateOutputType = {
    id: number | null
    authorId: number | null
    workId: number | null
  }

  export type AuthorWorkMinAggregateOutputType = {
    id: number | null
    authorId: number | null
    workId: number | null
    role: string | null
  }

  export type AuthorWorkMaxAggregateOutputType = {
    id: number | null
    authorId: number | null
    workId: number | null
    role: string | null
  }

  export type AuthorWorkCountAggregateOutputType = {
    id: number
    authorId: number
    workId: number
    role: number
    _all: number
  }


  export type AuthorWorkAvgAggregateInputType = {
    id?: true
    authorId?: true
    workId?: true
  }

  export type AuthorWorkSumAggregateInputType = {
    id?: true
    authorId?: true
    workId?: true
  }

  export type AuthorWorkMinAggregateInputType = {
    id?: true
    authorId?: true
    workId?: true
    role?: true
  }

  export type AuthorWorkMaxAggregateInputType = {
    id?: true
    authorId?: true
    workId?: true
    role?: true
  }

  export type AuthorWorkCountAggregateInputType = {
    id?: true
    authorId?: true
    workId?: true
    role?: true
    _all?: true
  }

  export type AuthorWorkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthorWork to aggregate.
     */
    where?: AuthorWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorWorks to fetch.
     */
    orderBy?: AuthorWorkOrderByWithRelationInput | AuthorWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorWorks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthorWorks
    **/
    _count?: true | AuthorWorkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthorWorkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthorWorkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorWorkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorWorkMaxAggregateInputType
  }

  export type GetAuthorWorkAggregateType<T extends AuthorWorkAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthorWork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthorWork[P]>
      : GetScalarType<T[P], AggregateAuthorWork[P]>
  }




  export type AuthorWorkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWorkWhereInput
    orderBy?: AuthorWorkOrderByWithAggregationInput | AuthorWorkOrderByWithAggregationInput[]
    by: AuthorWorkScalarFieldEnum[] | AuthorWorkScalarFieldEnum
    having?: AuthorWorkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorWorkCountAggregateInputType | true
    _avg?: AuthorWorkAvgAggregateInputType
    _sum?: AuthorWorkSumAggregateInputType
    _min?: AuthorWorkMinAggregateInputType
    _max?: AuthorWorkMaxAggregateInputType
  }

  export type AuthorWorkGroupByOutputType = {
    id: number
    authorId: number
    workId: number
    role: string | null
    _count: AuthorWorkCountAggregateOutputType | null
    _avg: AuthorWorkAvgAggregateOutputType | null
    _sum: AuthorWorkSumAggregateOutputType | null
    _min: AuthorWorkMinAggregateOutputType | null
    _max: AuthorWorkMaxAggregateOutputType | null
  }

  type GetAuthorWorkGroupByPayload<T extends AuthorWorkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorWorkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorWorkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorWorkGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorWorkGroupByOutputType[P]>
        }
      >
    >


  export type AuthorWorkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    workId?: boolean
    role?: boolean
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authorWork"]>

  export type AuthorWorkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    workId?: boolean
    role?: boolean
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authorWork"]>

  export type AuthorWorkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    workId?: boolean
    role?: boolean
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authorWork"]>

  export type AuthorWorkSelectScalar = {
    id?: boolean
    authorId?: boolean
    workId?: boolean
    role?: boolean
  }

  export type AuthorWorkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authorId" | "workId" | "role", ExtArgs["result"]["authorWork"]>
  export type AuthorWorkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }
  export type AuthorWorkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }
  export type AuthorWorkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }

  export type $AuthorWorkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthorWork"
    objects: {
      author: Prisma.$AuthorPayload<ExtArgs>
      work: Prisma.$WorkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      authorId: number
      workId: number
      role: string | null
    }, ExtArgs["result"]["authorWork"]>
    composites: {}
  }

  type AuthorWorkGetPayload<S extends boolean | null | undefined | AuthorWorkDefaultArgs> = $Result.GetResult<Prisma.$AuthorWorkPayload, S>

  type AuthorWorkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorWorkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorWorkCountAggregateInputType | true
    }

  export interface AuthorWorkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthorWork'], meta: { name: 'AuthorWork' } }
    /**
     * Find zero or one AuthorWork that matches the filter.
     * @param {AuthorWorkFindUniqueArgs} args - Arguments to find a AuthorWork
     * @example
     * // Get one AuthorWork
     * const authorWork = await prisma.authorWork.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorWorkFindUniqueArgs>(args: SelectSubset<T, AuthorWorkFindUniqueArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthorWork that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorWorkFindUniqueOrThrowArgs} args - Arguments to find a AuthorWork
     * @example
     * // Get one AuthorWork
     * const authorWork = await prisma.authorWork.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorWorkFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorWorkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthorWork that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkFindFirstArgs} args - Arguments to find a AuthorWork
     * @example
     * // Get one AuthorWork
     * const authorWork = await prisma.authorWork.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorWorkFindFirstArgs>(args?: SelectSubset<T, AuthorWorkFindFirstArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthorWork that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkFindFirstOrThrowArgs} args - Arguments to find a AuthorWork
     * @example
     * // Get one AuthorWork
     * const authorWork = await prisma.authorWork.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorWorkFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorWorkFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthorWorks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthorWorks
     * const authorWorks = await prisma.authorWork.findMany()
     * 
     * // Get first 10 AuthorWorks
     * const authorWorks = await prisma.authorWork.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorWorkWithIdOnly = await prisma.authorWork.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorWorkFindManyArgs>(args?: SelectSubset<T, AuthorWorkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthorWork.
     * @param {AuthorWorkCreateArgs} args - Arguments to create a AuthorWork.
     * @example
     * // Create one AuthorWork
     * const AuthorWork = await prisma.authorWork.create({
     *   data: {
     *     // ... data to create a AuthorWork
     *   }
     * })
     * 
     */
    create<T extends AuthorWorkCreateArgs>(args: SelectSubset<T, AuthorWorkCreateArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthorWorks.
     * @param {AuthorWorkCreateManyArgs} args - Arguments to create many AuthorWorks.
     * @example
     * // Create many AuthorWorks
     * const authorWork = await prisma.authorWork.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorWorkCreateManyArgs>(args?: SelectSubset<T, AuthorWorkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthorWorks and returns the data saved in the database.
     * @param {AuthorWorkCreateManyAndReturnArgs} args - Arguments to create many AuthorWorks.
     * @example
     * // Create many AuthorWorks
     * const authorWork = await prisma.authorWork.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthorWorks and only return the `id`
     * const authorWorkWithIdOnly = await prisma.authorWork.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthorWorkCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthorWorkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthorWork.
     * @param {AuthorWorkDeleteArgs} args - Arguments to delete one AuthorWork.
     * @example
     * // Delete one AuthorWork
     * const AuthorWork = await prisma.authorWork.delete({
     *   where: {
     *     // ... filter to delete one AuthorWork
     *   }
     * })
     * 
     */
    delete<T extends AuthorWorkDeleteArgs>(args: SelectSubset<T, AuthorWorkDeleteArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthorWork.
     * @param {AuthorWorkUpdateArgs} args - Arguments to update one AuthorWork.
     * @example
     * // Update one AuthorWork
     * const authorWork = await prisma.authorWork.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorWorkUpdateArgs>(args: SelectSubset<T, AuthorWorkUpdateArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthorWorks.
     * @param {AuthorWorkDeleteManyArgs} args - Arguments to filter AuthorWorks to delete.
     * @example
     * // Delete a few AuthorWorks
     * const { count } = await prisma.authorWork.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorWorkDeleteManyArgs>(args?: SelectSubset<T, AuthorWorkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthorWorks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthorWorks
     * const authorWork = await prisma.authorWork.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorWorkUpdateManyArgs>(args: SelectSubset<T, AuthorWorkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthorWorks and returns the data updated in the database.
     * @param {AuthorWorkUpdateManyAndReturnArgs} args - Arguments to update many AuthorWorks.
     * @example
     * // Update many AuthorWorks
     * const authorWork = await prisma.authorWork.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthorWorks and only return the `id`
     * const authorWorkWithIdOnly = await prisma.authorWork.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthorWorkUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthorWorkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthorWork.
     * @param {AuthorWorkUpsertArgs} args - Arguments to update or create a AuthorWork.
     * @example
     * // Update or create a AuthorWork
     * const authorWork = await prisma.authorWork.upsert({
     *   create: {
     *     // ... data to create a AuthorWork
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthorWork we want to update
     *   }
     * })
     */
    upsert<T extends AuthorWorkUpsertArgs>(args: SelectSubset<T, AuthorWorkUpsertArgs<ExtArgs>>): Prisma__AuthorWorkClient<$Result.GetResult<Prisma.$AuthorWorkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthorWorks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkCountArgs} args - Arguments to filter AuthorWorks to count.
     * @example
     * // Count the number of AuthorWorks
     * const count = await prisma.authorWork.count({
     *   where: {
     *     // ... the filter for the AuthorWorks we want to count
     *   }
     * })
    **/
    count<T extends AuthorWorkCountArgs>(
      args?: Subset<T, AuthorWorkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorWorkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthorWork.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorWorkAggregateArgs>(args: Subset<T, AuthorWorkAggregateArgs>): Prisma.PrismaPromise<GetAuthorWorkAggregateType<T>>

    /**
     * Group by AuthorWork.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorWorkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorWorkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorWorkGroupByArgs['orderBy'] }
        : { orderBy?: AuthorWorkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorWorkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorWorkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthorWork model
   */
  readonly fields: AuthorWorkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthorWork.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorWorkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends AuthorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthorDefaultArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    work<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthorWork model
   */
  interface AuthorWorkFieldRefs {
    readonly id: FieldRef<"AuthorWork", 'Int'>
    readonly authorId: FieldRef<"AuthorWork", 'Int'>
    readonly workId: FieldRef<"AuthorWork", 'Int'>
    readonly role: FieldRef<"AuthorWork", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuthorWork findUnique
   */
  export type AuthorWorkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * Filter, which AuthorWork to fetch.
     */
    where: AuthorWorkWhereUniqueInput
  }

  /**
   * AuthorWork findUniqueOrThrow
   */
  export type AuthorWorkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * Filter, which AuthorWork to fetch.
     */
    where: AuthorWorkWhereUniqueInput
  }

  /**
   * AuthorWork findFirst
   */
  export type AuthorWorkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * Filter, which AuthorWork to fetch.
     */
    where?: AuthorWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorWorks to fetch.
     */
    orderBy?: AuthorWorkOrderByWithRelationInput | AuthorWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthorWorks.
     */
    cursor?: AuthorWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorWorks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthorWorks.
     */
    distinct?: AuthorWorkScalarFieldEnum | AuthorWorkScalarFieldEnum[]
  }

  /**
   * AuthorWork findFirstOrThrow
   */
  export type AuthorWorkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * Filter, which AuthorWork to fetch.
     */
    where?: AuthorWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorWorks to fetch.
     */
    orderBy?: AuthorWorkOrderByWithRelationInput | AuthorWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthorWorks.
     */
    cursor?: AuthorWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorWorks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthorWorks.
     */
    distinct?: AuthorWorkScalarFieldEnum | AuthorWorkScalarFieldEnum[]
  }

  /**
   * AuthorWork findMany
   */
  export type AuthorWorkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * Filter, which AuthorWorks to fetch.
     */
    where?: AuthorWorkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorWorks to fetch.
     */
    orderBy?: AuthorWorkOrderByWithRelationInput | AuthorWorkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthorWorks.
     */
    cursor?: AuthorWorkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorWorks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorWorks.
     */
    skip?: number
    distinct?: AuthorWorkScalarFieldEnum | AuthorWorkScalarFieldEnum[]
  }

  /**
   * AuthorWork create
   */
  export type AuthorWorkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthorWork.
     */
    data: XOR<AuthorWorkCreateInput, AuthorWorkUncheckedCreateInput>
  }

  /**
   * AuthorWork createMany
   */
  export type AuthorWorkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthorWorks.
     */
    data: AuthorWorkCreateManyInput | AuthorWorkCreateManyInput[]
  }

  /**
   * AuthorWork createManyAndReturn
   */
  export type AuthorWorkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * The data used to create many AuthorWorks.
     */
    data: AuthorWorkCreateManyInput | AuthorWorkCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthorWork update
   */
  export type AuthorWorkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthorWork.
     */
    data: XOR<AuthorWorkUpdateInput, AuthorWorkUncheckedUpdateInput>
    /**
     * Choose, which AuthorWork to update.
     */
    where: AuthorWorkWhereUniqueInput
  }

  /**
   * AuthorWork updateMany
   */
  export type AuthorWorkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthorWorks.
     */
    data: XOR<AuthorWorkUpdateManyMutationInput, AuthorWorkUncheckedUpdateManyInput>
    /**
     * Filter which AuthorWorks to update
     */
    where?: AuthorWorkWhereInput
    /**
     * Limit how many AuthorWorks to update.
     */
    limit?: number
  }

  /**
   * AuthorWork updateManyAndReturn
   */
  export type AuthorWorkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * The data used to update AuthorWorks.
     */
    data: XOR<AuthorWorkUpdateManyMutationInput, AuthorWorkUncheckedUpdateManyInput>
    /**
     * Filter which AuthorWorks to update
     */
    where?: AuthorWorkWhereInput
    /**
     * Limit how many AuthorWorks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthorWork upsert
   */
  export type AuthorWorkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthorWork to update in case it exists.
     */
    where: AuthorWorkWhereUniqueInput
    /**
     * In case the AuthorWork found by the `where` argument doesn't exist, create a new AuthorWork with this data.
     */
    create: XOR<AuthorWorkCreateInput, AuthorWorkUncheckedCreateInput>
    /**
     * In case the AuthorWork was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorWorkUpdateInput, AuthorWorkUncheckedUpdateInput>
  }

  /**
   * AuthorWork delete
   */
  export type AuthorWorkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
    /**
     * Filter which AuthorWork to delete.
     */
    where: AuthorWorkWhereUniqueInput
  }

  /**
   * AuthorWork deleteMany
   */
  export type AuthorWorkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthorWorks to delete
     */
    where?: AuthorWorkWhereInput
    /**
     * Limit how many AuthorWorks to delete.
     */
    limit?: number
  }

  /**
   * AuthorWork without action
   */
  export type AuthorWorkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorWork
     */
    select?: AuthorWorkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorWork
     */
    omit?: AuthorWorkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorWorkInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    status: $Enums.UserStatus | null
    emailVerified: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    status: $Enums.UserStatus | null
    emailVerified: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    firstName: number
    lastName: number
    email: number
    password: number
    status: number
    emailVerified: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    status?: true
    emailVerified?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    status?: true
    emailVerified?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    status?: true
    emailVerified?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    firstName: string
    lastName: string
    email: string
    password: string
    status: $Enums.UserStatus
    emailVerified: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    emailVerified?: boolean
    interactions?: boolean | User$interactionsArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    recommendationScores?: boolean | User$recommendationScoresArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    emailVerified?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    status?: boolean
    emailVerified?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "email" | "password" | "status" | "emailVerified", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interactions?: boolean | User$interactionsArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    recommendationScores?: boolean | User$recommendationScoresArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      interactions: Prisma.$UserInteractionPayload<ExtArgs>[]
      profile: Prisma.$UserProfilePayload<ExtArgs> | null
      recommendationScores: Prisma.$RecommendationScorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      firstName: string
      lastName: string
      email: string
      password: string
      status: $Enums.UserStatus
      emailVerified: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interactions<T extends User$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recommendationScores<T extends User$recommendationScoresArgs<ExtArgs> = {}>(args?: Subset<T, User$recommendationScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.interactions
   */
  export type User$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    where?: UserInteractionWhereInput
    orderBy?: UserInteractionOrderByWithRelationInput | UserInteractionOrderByWithRelationInput[]
    cursor?: UserInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInteractionScalarFieldEnum | UserInteractionScalarFieldEnum[]
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * User.recommendationScores
   */
  export type User$recommendationScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    where?: RecommendationScoreWhereInput
    orderBy?: RecommendationScoreOrderByWithRelationInput | RecommendationScoreOrderByWithRelationInput[]
    cursor?: RecommendationScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecommendationScoreScalarFieldEnum | RecommendationScoreScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    totalLikes: number | null
    totalDislikes: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
    totalLikes: number | null
    totalDislikes: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    subjectPreferences: string | null
    placePreferences: string | null
    timePreferences: string | null
    peoplePreferences: string | null
    languagePreferences: string | null
    preferredPublishEra: string | null
    dislikedSubjects: string | null
    dislikedPlaces: string | null
    dislikedAuthors: string | null
    totalLikes: number | null
    totalDislikes: number | null
    lastInteractionAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    subjectPreferences: string | null
    placePreferences: string | null
    timePreferences: string | null
    peoplePreferences: string | null
    languagePreferences: string | null
    preferredPublishEra: string | null
    dislikedSubjects: string | null
    dislikedPlaces: string | null
    dislikedAuthors: string | null
    totalLikes: number | null
    totalDislikes: number | null
    lastInteractionAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    subjectPreferences: number
    placePreferences: number
    timePreferences: number
    peoplePreferences: number
    languagePreferences: number
    preferredPublishEra: number
    dislikedSubjects: number
    dislikedPlaces: number
    dislikedAuthors: number
    totalLikes: number
    totalDislikes: number
    lastInteractionAt: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    id?: true
    userId?: true
    totalLikes?: true
    totalDislikes?: true
  }

  export type UserProfileSumAggregateInputType = {
    id?: true
    userId?: true
    totalLikes?: true
    totalDislikes?: true
  }

  export type UserProfileMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectPreferences?: true
    placePreferences?: true
    timePreferences?: true
    peoplePreferences?: true
    languagePreferences?: true
    preferredPublishEra?: true
    dislikedSubjects?: true
    dislikedPlaces?: true
    dislikedAuthors?: true
    totalLikes?: true
    totalDislikes?: true
    lastInteractionAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectPreferences?: true
    placePreferences?: true
    timePreferences?: true
    peoplePreferences?: true
    languagePreferences?: true
    preferredPublishEra?: true
    dislikedSubjects?: true
    dislikedPlaces?: true
    dislikedAuthors?: true
    totalLikes?: true
    totalDislikes?: true
    lastInteractionAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    subjectPreferences?: true
    placePreferences?: true
    timePreferences?: true
    peoplePreferences?: true
    languagePreferences?: true
    preferredPublishEra?: true
    dislikedSubjects?: true
    dislikedPlaces?: true
    dislikedAuthors?: true
    totalLikes?: true
    totalDislikes?: true
    lastInteractionAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    subjectPreferences: string | null
    placePreferences: string | null
    timePreferences: string | null
    peoplePreferences: string | null
    languagePreferences: string | null
    preferredPublishEra: string | null
    dislikedSubjects: string | null
    dislikedPlaces: string | null
    dislikedAuthors: string | null
    totalLikes: number
    totalDislikes: number
    lastInteractionAt: Date | null
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectPreferences?: boolean
    placePreferences?: boolean
    timePreferences?: boolean
    peoplePreferences?: boolean
    languagePreferences?: boolean
    preferredPublishEra?: boolean
    dislikedSubjects?: boolean
    dislikedPlaces?: boolean
    dislikedAuthors?: boolean
    totalLikes?: boolean
    totalDislikes?: boolean
    lastInteractionAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectPreferences?: boolean
    placePreferences?: boolean
    timePreferences?: boolean
    peoplePreferences?: boolean
    languagePreferences?: boolean
    preferredPublishEra?: boolean
    dislikedSubjects?: boolean
    dislikedPlaces?: boolean
    dislikedAuthors?: boolean
    totalLikes?: boolean
    totalDislikes?: boolean
    lastInteractionAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectPreferences?: boolean
    placePreferences?: boolean
    timePreferences?: boolean
    peoplePreferences?: boolean
    languagePreferences?: boolean
    preferredPublishEra?: boolean
    dislikedSubjects?: boolean
    dislikedPlaces?: boolean
    dislikedAuthors?: boolean
    totalLikes?: boolean
    totalDislikes?: boolean
    lastInteractionAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    subjectPreferences?: boolean
    placePreferences?: boolean
    timePreferences?: boolean
    peoplePreferences?: boolean
    languagePreferences?: boolean
    preferredPublishEra?: boolean
    dislikedSubjects?: boolean
    dislikedPlaces?: boolean
    dislikedAuthors?: boolean
    totalLikes?: boolean
    totalDislikes?: boolean
    lastInteractionAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId" | "subjectPreferences" | "placePreferences" | "timePreferences" | "peoplePreferences" | "languagePreferences" | "preferredPublishEra" | "dislikedSubjects" | "dislikedPlaces" | "dislikedAuthors" | "totalLikes" | "totalDislikes" | "lastInteractionAt", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      userId: number
      subjectPreferences: string | null
      placePreferences: string | null
      timePreferences: string | null
      peoplePreferences: string | null
      languagePreferences: string | null
      preferredPublishEra: string | null
      dislikedSubjects: string | null
      dislikedPlaces: string | null
      dislikedAuthors: string | null
      totalLikes: number
      totalDislikes: number
      lastInteractionAt: Date | null
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'Int'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
    readonly userId: FieldRef<"UserProfile", 'Int'>
    readonly subjectPreferences: FieldRef<"UserProfile", 'String'>
    readonly placePreferences: FieldRef<"UserProfile", 'String'>
    readonly timePreferences: FieldRef<"UserProfile", 'String'>
    readonly peoplePreferences: FieldRef<"UserProfile", 'String'>
    readonly languagePreferences: FieldRef<"UserProfile", 'String'>
    readonly preferredPublishEra: FieldRef<"UserProfile", 'String'>
    readonly dislikedSubjects: FieldRef<"UserProfile", 'String'>
    readonly dislikedPlaces: FieldRef<"UserProfile", 'String'>
    readonly dislikedAuthors: FieldRef<"UserProfile", 'String'>
    readonly totalLikes: FieldRef<"UserProfile", 'Int'>
    readonly totalDislikes: FieldRef<"UserProfile", 'Int'>
    readonly lastInteractionAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model UserInteraction
   */

  export type AggregateUserInteraction = {
    _count: UserInteractionCountAggregateOutputType | null
    _avg: UserInteractionAvgAggregateOutputType | null
    _sum: UserInteractionSumAggregateOutputType | null
    _min: UserInteractionMinAggregateOutputType | null
    _max: UserInteractionMaxAggregateOutputType | null
  }

  export type UserInteractionAvgAggregateOutputType = {
    workId: number | null
    userId: number | null
  }

  export type UserInteractionSumAggregateOutputType = {
    workId: number | null
    userId: number | null
  }

  export type UserInteractionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    workId: number | null
    userId: number | null
    liked: boolean | null
  }

  export type UserInteractionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    workId: number | null
    userId: number | null
    liked: boolean | null
  }

  export type UserInteractionCountAggregateOutputType = {
    id: number
    createdAt: number
    workId: number
    userId: number
    liked: number
    _all: number
  }


  export type UserInteractionAvgAggregateInputType = {
    workId?: true
    userId?: true
  }

  export type UserInteractionSumAggregateInputType = {
    workId?: true
    userId?: true
  }

  export type UserInteractionMinAggregateInputType = {
    id?: true
    createdAt?: true
    workId?: true
    userId?: true
    liked?: true
  }

  export type UserInteractionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    workId?: true
    userId?: true
    liked?: true
  }

  export type UserInteractionCountAggregateInputType = {
    id?: true
    createdAt?: true
    workId?: true
    userId?: true
    liked?: true
    _all?: true
  }

  export type UserInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInteraction to aggregate.
     */
    where?: UserInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: UserInteractionOrderByWithRelationInput | UserInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInteractions
    **/
    _count?: true | UserInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserInteractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserInteractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInteractionMaxAggregateInputType
  }

  export type GetUserInteractionAggregateType<T extends UserInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInteraction[P]>
      : GetScalarType<T[P], AggregateUserInteraction[P]>
  }




  export type UserInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInteractionWhereInput
    orderBy?: UserInteractionOrderByWithAggregationInput | UserInteractionOrderByWithAggregationInput[]
    by: UserInteractionScalarFieldEnum[] | UserInteractionScalarFieldEnum
    having?: UserInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInteractionCountAggregateInputType | true
    _avg?: UserInteractionAvgAggregateInputType
    _sum?: UserInteractionSumAggregateInputType
    _min?: UserInteractionMinAggregateInputType
    _max?: UserInteractionMaxAggregateInputType
  }

  export type UserInteractionGroupByOutputType = {
    id: string
    createdAt: Date
    workId: number
    userId: number
    liked: boolean
    _count: UserInteractionCountAggregateOutputType | null
    _avg: UserInteractionAvgAggregateOutputType | null
    _sum: UserInteractionSumAggregateOutputType | null
    _min: UserInteractionMinAggregateOutputType | null
    _max: UserInteractionMaxAggregateOutputType | null
  }

  type GetUserInteractionGroupByPayload<T extends UserInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], UserInteractionGroupByOutputType[P]>
        }
      >
    >


  export type UserInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    workId?: boolean
    userId?: boolean
    liked?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInteraction"]>

  export type UserInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    workId?: boolean
    userId?: boolean
    liked?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInteraction"]>

  export type UserInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    workId?: boolean
    userId?: boolean
    liked?: boolean
    work?: boolean | WorkDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInteraction"]>

  export type UserInteractionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    workId?: boolean
    userId?: boolean
    liked?: boolean
  }

  export type UserInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "workId" | "userId" | "liked", ExtArgs["result"]["userInteraction"]>
  export type UserInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    work?: boolean | WorkDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInteraction"
    objects: {
      work: Prisma.$WorkPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      workId: number
      userId: number
      liked: boolean
    }, ExtArgs["result"]["userInteraction"]>
    composites: {}
  }

  type UserInteractionGetPayload<S extends boolean | null | undefined | UserInteractionDefaultArgs> = $Result.GetResult<Prisma.$UserInteractionPayload, S>

  type UserInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInteractionCountAggregateInputType | true
    }

  export interface UserInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInteraction'], meta: { name: 'UserInteraction' } }
    /**
     * Find zero or one UserInteraction that matches the filter.
     * @param {UserInteractionFindUniqueArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInteractionFindUniqueArgs>(args: SelectSubset<T, UserInteractionFindUniqueArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInteractionFindUniqueOrThrowArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionFindFirstArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInteractionFindFirstArgs>(args?: SelectSubset<T, UserInteractionFindFirstArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionFindFirstOrThrowArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInteractions
     * const userInteractions = await prisma.userInteraction.findMany()
     * 
     * // Get first 10 UserInteractions
     * const userInteractions = await prisma.userInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userInteractionWithIdOnly = await prisma.userInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserInteractionFindManyArgs>(args?: SelectSubset<T, UserInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInteraction.
     * @param {UserInteractionCreateArgs} args - Arguments to create a UserInteraction.
     * @example
     * // Create one UserInteraction
     * const UserInteraction = await prisma.userInteraction.create({
     *   data: {
     *     // ... data to create a UserInteraction
     *   }
     * })
     * 
     */
    create<T extends UserInteractionCreateArgs>(args: SelectSubset<T, UserInteractionCreateArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInteractions.
     * @param {UserInteractionCreateManyArgs} args - Arguments to create many UserInteractions.
     * @example
     * // Create many UserInteractions
     * const userInteraction = await prisma.userInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInteractionCreateManyArgs>(args?: SelectSubset<T, UserInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInteractions and returns the data saved in the database.
     * @param {UserInteractionCreateManyAndReturnArgs} args - Arguments to create many UserInteractions.
     * @example
     * // Create many UserInteractions
     * const userInteraction = await prisma.userInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInteractions and only return the `id`
     * const userInteractionWithIdOnly = await prisma.userInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInteraction.
     * @param {UserInteractionDeleteArgs} args - Arguments to delete one UserInteraction.
     * @example
     * // Delete one UserInteraction
     * const UserInteraction = await prisma.userInteraction.delete({
     *   where: {
     *     // ... filter to delete one UserInteraction
     *   }
     * })
     * 
     */
    delete<T extends UserInteractionDeleteArgs>(args: SelectSubset<T, UserInteractionDeleteArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInteraction.
     * @param {UserInteractionUpdateArgs} args - Arguments to update one UserInteraction.
     * @example
     * // Update one UserInteraction
     * const userInteraction = await prisma.userInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInteractionUpdateArgs>(args: SelectSubset<T, UserInteractionUpdateArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInteractions.
     * @param {UserInteractionDeleteManyArgs} args - Arguments to filter UserInteractions to delete.
     * @example
     * // Delete a few UserInteractions
     * const { count } = await prisma.userInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInteractionDeleteManyArgs>(args?: SelectSubset<T, UserInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInteractions
     * const userInteraction = await prisma.userInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInteractionUpdateManyArgs>(args: SelectSubset<T, UserInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInteractions and returns the data updated in the database.
     * @param {UserInteractionUpdateManyAndReturnArgs} args - Arguments to update many UserInteractions.
     * @example
     * // Update many UserInteractions
     * const userInteraction = await prisma.userInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInteractions and only return the `id`
     * const userInteractionWithIdOnly = await prisma.userInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInteraction.
     * @param {UserInteractionUpsertArgs} args - Arguments to update or create a UserInteraction.
     * @example
     * // Update or create a UserInteraction
     * const userInteraction = await prisma.userInteraction.upsert({
     *   create: {
     *     // ... data to create a UserInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInteraction we want to update
     *   }
     * })
     */
    upsert<T extends UserInteractionUpsertArgs>(args: SelectSubset<T, UserInteractionUpsertArgs<ExtArgs>>): Prisma__UserInteractionClient<$Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionCountArgs} args - Arguments to filter UserInteractions to count.
     * @example
     * // Count the number of UserInteractions
     * const count = await prisma.userInteraction.count({
     *   where: {
     *     // ... the filter for the UserInteractions we want to count
     *   }
     * })
    **/
    count<T extends UserInteractionCountArgs>(
      args?: Subset<T, UserInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserInteractionAggregateArgs>(args: Subset<T, UserInteractionAggregateArgs>): Prisma.PrismaPromise<GetUserInteractionAggregateType<T>>

    /**
     * Group by UserInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInteractionGroupByArgs['orderBy'] }
        : { orderBy?: UserInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInteraction model
   */
  readonly fields: UserInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    work<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserInteraction model
   */
  interface UserInteractionFieldRefs {
    readonly id: FieldRef<"UserInteraction", 'String'>
    readonly createdAt: FieldRef<"UserInteraction", 'DateTime'>
    readonly workId: FieldRef<"UserInteraction", 'Int'>
    readonly userId: FieldRef<"UserInteraction", 'Int'>
    readonly liked: FieldRef<"UserInteraction", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserInteraction findUnique
   */
  export type UserInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * Filter, which UserInteraction to fetch.
     */
    where: UserInteractionWhereUniqueInput
  }

  /**
   * UserInteraction findUniqueOrThrow
   */
  export type UserInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * Filter, which UserInteraction to fetch.
     */
    where: UserInteractionWhereUniqueInput
  }

  /**
   * UserInteraction findFirst
   */
  export type UserInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * Filter, which UserInteraction to fetch.
     */
    where?: UserInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: UserInteractionOrderByWithRelationInput | UserInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInteractions.
     */
    cursor?: UserInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInteractions.
     */
    distinct?: UserInteractionScalarFieldEnum | UserInteractionScalarFieldEnum[]
  }

  /**
   * UserInteraction findFirstOrThrow
   */
  export type UserInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * Filter, which UserInteraction to fetch.
     */
    where?: UserInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: UserInteractionOrderByWithRelationInput | UserInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInteractions.
     */
    cursor?: UserInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInteractions.
     */
    distinct?: UserInteractionScalarFieldEnum | UserInteractionScalarFieldEnum[]
  }

  /**
   * UserInteraction findMany
   */
  export type UserInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * Filter, which UserInteractions to fetch.
     */
    where?: UserInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: UserInteractionOrderByWithRelationInput | UserInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInteractions.
     */
    cursor?: UserInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInteractions.
     */
    skip?: number
    distinct?: UserInteractionScalarFieldEnum | UserInteractionScalarFieldEnum[]
  }

  /**
   * UserInteraction create
   */
  export type UserInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInteraction.
     */
    data: XOR<UserInteractionCreateInput, UserInteractionUncheckedCreateInput>
  }

  /**
   * UserInteraction createMany
   */
  export type UserInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInteractions.
     */
    data: UserInteractionCreateManyInput | UserInteractionCreateManyInput[]
  }

  /**
   * UserInteraction createManyAndReturn
   */
  export type UserInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many UserInteractions.
     */
    data: UserInteractionCreateManyInput | UserInteractionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInteraction update
   */
  export type UserInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInteraction.
     */
    data: XOR<UserInteractionUpdateInput, UserInteractionUncheckedUpdateInput>
    /**
     * Choose, which UserInteraction to update.
     */
    where: UserInteractionWhereUniqueInput
  }

  /**
   * UserInteraction updateMany
   */
  export type UserInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInteractions.
     */
    data: XOR<UserInteractionUpdateManyMutationInput, UserInteractionUncheckedUpdateManyInput>
    /**
     * Filter which UserInteractions to update
     */
    where?: UserInteractionWhereInput
    /**
     * Limit how many UserInteractions to update.
     */
    limit?: number
  }

  /**
   * UserInteraction updateManyAndReturn
   */
  export type UserInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * The data used to update UserInteractions.
     */
    data: XOR<UserInteractionUpdateManyMutationInput, UserInteractionUncheckedUpdateManyInput>
    /**
     * Filter which UserInteractions to update
     */
    where?: UserInteractionWhereInput
    /**
     * Limit how many UserInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInteraction upsert
   */
  export type UserInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInteraction to update in case it exists.
     */
    where: UserInteractionWhereUniqueInput
    /**
     * In case the UserInteraction found by the `where` argument doesn't exist, create a new UserInteraction with this data.
     */
    create: XOR<UserInteractionCreateInput, UserInteractionUncheckedCreateInput>
    /**
     * In case the UserInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInteractionUpdateInput, UserInteractionUncheckedUpdateInput>
  }

  /**
   * UserInteraction delete
   */
  export type UserInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
    /**
     * Filter which UserInteraction to delete.
     */
    where: UserInteractionWhereUniqueInput
  }

  /**
   * UserInteraction deleteMany
   */
  export type UserInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInteractions to delete
     */
    where?: UserInteractionWhereInput
    /**
     * Limit how many UserInteractions to delete.
     */
    limit?: number
  }

  /**
   * UserInteraction without action
   */
  export type UserInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: UserInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: UserInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInteractionInclude<ExtArgs> | null
  }


  /**
   * Model RecommendationScore
   */

  export type AggregateRecommendationScore = {
    _count: RecommendationScoreCountAggregateOutputType | null
    _avg: RecommendationScoreAvgAggregateOutputType | null
    _sum: RecommendationScoreSumAggregateOutputType | null
    _min: RecommendationScoreMinAggregateOutputType | null
    _max: RecommendationScoreMaxAggregateOutputType | null
  }

  export type RecommendationScoreAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    workId: number | null
    contentScore: number | null
    collaborativeScore: number | null
    noveltyBonus: number | null
    negativeMultiplier: number | null
    finalScore: number | null
  }

  export type RecommendationScoreSumAggregateOutputType = {
    id: number | null
    userId: number | null
    workId: number | null
    contentScore: number | null
    collaborativeScore: number | null
    noveltyBonus: number | null
    negativeMultiplier: number | null
    finalScore: number | null
  }

  export type RecommendationScoreMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    workId: number | null
    contentScore: number | null
    collaborativeScore: number | null
    noveltyBonus: number | null
    negativeMultiplier: number | null
    finalScore: number | null
    reasons: string | null
  }

  export type RecommendationScoreMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    workId: number | null
    contentScore: number | null
    collaborativeScore: number | null
    noveltyBonus: number | null
    negativeMultiplier: number | null
    finalScore: number | null
    reasons: string | null
  }

  export type RecommendationScoreCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    workId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: number
    _all: number
  }


  export type RecommendationScoreAvgAggregateInputType = {
    id?: true
    userId?: true
    workId?: true
    contentScore?: true
    collaborativeScore?: true
    noveltyBonus?: true
    negativeMultiplier?: true
    finalScore?: true
  }

  export type RecommendationScoreSumAggregateInputType = {
    id?: true
    userId?: true
    workId?: true
    contentScore?: true
    collaborativeScore?: true
    noveltyBonus?: true
    negativeMultiplier?: true
    finalScore?: true
  }

  export type RecommendationScoreMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workId?: true
    contentScore?: true
    collaborativeScore?: true
    noveltyBonus?: true
    negativeMultiplier?: true
    finalScore?: true
    reasons?: true
  }

  export type RecommendationScoreMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workId?: true
    contentScore?: true
    collaborativeScore?: true
    noveltyBonus?: true
    negativeMultiplier?: true
    finalScore?: true
    reasons?: true
  }

  export type RecommendationScoreCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workId?: true
    contentScore?: true
    collaborativeScore?: true
    noveltyBonus?: true
    negativeMultiplier?: true
    finalScore?: true
    reasons?: true
    _all?: true
  }

  export type RecommendationScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecommendationScore to aggregate.
     */
    where?: RecommendationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecommendationScores to fetch.
     */
    orderBy?: RecommendationScoreOrderByWithRelationInput | RecommendationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecommendationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecommendationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecommendationScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecommendationScores
    **/
    _count?: true | RecommendationScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecommendationScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecommendationScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecommendationScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecommendationScoreMaxAggregateInputType
  }

  export type GetRecommendationScoreAggregateType<T extends RecommendationScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateRecommendationScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecommendationScore[P]>
      : GetScalarType<T[P], AggregateRecommendationScore[P]>
  }




  export type RecommendationScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecommendationScoreWhereInput
    orderBy?: RecommendationScoreOrderByWithAggregationInput | RecommendationScoreOrderByWithAggregationInput[]
    by: RecommendationScoreScalarFieldEnum[] | RecommendationScoreScalarFieldEnum
    having?: RecommendationScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecommendationScoreCountAggregateInputType | true
    _avg?: RecommendationScoreAvgAggregateInputType
    _sum?: RecommendationScoreSumAggregateInputType
    _min?: RecommendationScoreMinAggregateInputType
    _max?: RecommendationScoreMaxAggregateInputType
  }

  export type RecommendationScoreGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    workId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
    _count: RecommendationScoreCountAggregateOutputType | null
    _avg: RecommendationScoreAvgAggregateOutputType | null
    _sum: RecommendationScoreSumAggregateOutputType | null
    _min: RecommendationScoreMinAggregateOutputType | null
    _max: RecommendationScoreMaxAggregateOutputType | null
  }

  type GetRecommendationScoreGroupByPayload<T extends RecommendationScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecommendationScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecommendationScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecommendationScoreGroupByOutputType[P]>
            : GetScalarType<T[P], RecommendationScoreGroupByOutputType[P]>
        }
      >
    >


  export type RecommendationScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workId?: boolean
    contentScore?: boolean
    collaborativeScore?: boolean
    noveltyBonus?: boolean
    negativeMultiplier?: boolean
    finalScore?: boolean
    reasons?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendationScore"]>

  export type RecommendationScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workId?: boolean
    contentScore?: boolean
    collaborativeScore?: boolean
    noveltyBonus?: boolean
    negativeMultiplier?: boolean
    finalScore?: boolean
    reasons?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendationScore"]>

  export type RecommendationScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workId?: boolean
    contentScore?: boolean
    collaborativeScore?: boolean
    noveltyBonus?: boolean
    negativeMultiplier?: boolean
    finalScore?: boolean
    reasons?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recommendationScore"]>

  export type RecommendationScoreSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workId?: boolean
    contentScore?: boolean
    collaborativeScore?: boolean
    noveltyBonus?: boolean
    negativeMultiplier?: boolean
    finalScore?: boolean
    reasons?: boolean
  }

  export type RecommendationScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId" | "workId" | "contentScore" | "collaborativeScore" | "noveltyBonus" | "negativeMultiplier" | "finalScore" | "reasons", ExtArgs["result"]["recommendationScore"]>
  export type RecommendationScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }
  export type RecommendationScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }
  export type RecommendationScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    work?: boolean | WorkDefaultArgs<ExtArgs>
  }

  export type $RecommendationScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecommendationScore"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      work: Prisma.$WorkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      userId: number
      workId: number
      contentScore: number
      collaborativeScore: number
      noveltyBonus: number
      negativeMultiplier: number
      finalScore: number
      reasons: string
    }, ExtArgs["result"]["recommendationScore"]>
    composites: {}
  }

  type RecommendationScoreGetPayload<S extends boolean | null | undefined | RecommendationScoreDefaultArgs> = $Result.GetResult<Prisma.$RecommendationScorePayload, S>

  type RecommendationScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecommendationScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecommendationScoreCountAggregateInputType | true
    }

  export interface RecommendationScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecommendationScore'], meta: { name: 'RecommendationScore' } }
    /**
     * Find zero or one RecommendationScore that matches the filter.
     * @param {RecommendationScoreFindUniqueArgs} args - Arguments to find a RecommendationScore
     * @example
     * // Get one RecommendationScore
     * const recommendationScore = await prisma.recommendationScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecommendationScoreFindUniqueArgs>(args: SelectSubset<T, RecommendationScoreFindUniqueArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecommendationScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecommendationScoreFindUniqueOrThrowArgs} args - Arguments to find a RecommendationScore
     * @example
     * // Get one RecommendationScore
     * const recommendationScore = await prisma.recommendationScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecommendationScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, RecommendationScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecommendationScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreFindFirstArgs} args - Arguments to find a RecommendationScore
     * @example
     * // Get one RecommendationScore
     * const recommendationScore = await prisma.recommendationScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecommendationScoreFindFirstArgs>(args?: SelectSubset<T, RecommendationScoreFindFirstArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecommendationScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreFindFirstOrThrowArgs} args - Arguments to find a RecommendationScore
     * @example
     * // Get one RecommendationScore
     * const recommendationScore = await prisma.recommendationScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecommendationScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, RecommendationScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecommendationScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecommendationScores
     * const recommendationScores = await prisma.recommendationScore.findMany()
     * 
     * // Get first 10 RecommendationScores
     * const recommendationScores = await prisma.recommendationScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recommendationScoreWithIdOnly = await prisma.recommendationScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecommendationScoreFindManyArgs>(args?: SelectSubset<T, RecommendationScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecommendationScore.
     * @param {RecommendationScoreCreateArgs} args - Arguments to create a RecommendationScore.
     * @example
     * // Create one RecommendationScore
     * const RecommendationScore = await prisma.recommendationScore.create({
     *   data: {
     *     // ... data to create a RecommendationScore
     *   }
     * })
     * 
     */
    create<T extends RecommendationScoreCreateArgs>(args: SelectSubset<T, RecommendationScoreCreateArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecommendationScores.
     * @param {RecommendationScoreCreateManyArgs} args - Arguments to create many RecommendationScores.
     * @example
     * // Create many RecommendationScores
     * const recommendationScore = await prisma.recommendationScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecommendationScoreCreateManyArgs>(args?: SelectSubset<T, RecommendationScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecommendationScores and returns the data saved in the database.
     * @param {RecommendationScoreCreateManyAndReturnArgs} args - Arguments to create many RecommendationScores.
     * @example
     * // Create many RecommendationScores
     * const recommendationScore = await prisma.recommendationScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecommendationScores and only return the `id`
     * const recommendationScoreWithIdOnly = await prisma.recommendationScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecommendationScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, RecommendationScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecommendationScore.
     * @param {RecommendationScoreDeleteArgs} args - Arguments to delete one RecommendationScore.
     * @example
     * // Delete one RecommendationScore
     * const RecommendationScore = await prisma.recommendationScore.delete({
     *   where: {
     *     // ... filter to delete one RecommendationScore
     *   }
     * })
     * 
     */
    delete<T extends RecommendationScoreDeleteArgs>(args: SelectSubset<T, RecommendationScoreDeleteArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecommendationScore.
     * @param {RecommendationScoreUpdateArgs} args - Arguments to update one RecommendationScore.
     * @example
     * // Update one RecommendationScore
     * const recommendationScore = await prisma.recommendationScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecommendationScoreUpdateArgs>(args: SelectSubset<T, RecommendationScoreUpdateArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecommendationScores.
     * @param {RecommendationScoreDeleteManyArgs} args - Arguments to filter RecommendationScores to delete.
     * @example
     * // Delete a few RecommendationScores
     * const { count } = await prisma.recommendationScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecommendationScoreDeleteManyArgs>(args?: SelectSubset<T, RecommendationScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecommendationScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecommendationScores
     * const recommendationScore = await prisma.recommendationScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecommendationScoreUpdateManyArgs>(args: SelectSubset<T, RecommendationScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecommendationScores and returns the data updated in the database.
     * @param {RecommendationScoreUpdateManyAndReturnArgs} args - Arguments to update many RecommendationScores.
     * @example
     * // Update many RecommendationScores
     * const recommendationScore = await prisma.recommendationScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecommendationScores and only return the `id`
     * const recommendationScoreWithIdOnly = await prisma.recommendationScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecommendationScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, RecommendationScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecommendationScore.
     * @param {RecommendationScoreUpsertArgs} args - Arguments to update or create a RecommendationScore.
     * @example
     * // Update or create a RecommendationScore
     * const recommendationScore = await prisma.recommendationScore.upsert({
     *   create: {
     *     // ... data to create a RecommendationScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecommendationScore we want to update
     *   }
     * })
     */
    upsert<T extends RecommendationScoreUpsertArgs>(args: SelectSubset<T, RecommendationScoreUpsertArgs<ExtArgs>>): Prisma__RecommendationScoreClient<$Result.GetResult<Prisma.$RecommendationScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecommendationScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreCountArgs} args - Arguments to filter RecommendationScores to count.
     * @example
     * // Count the number of RecommendationScores
     * const count = await prisma.recommendationScore.count({
     *   where: {
     *     // ... the filter for the RecommendationScores we want to count
     *   }
     * })
    **/
    count<T extends RecommendationScoreCountArgs>(
      args?: Subset<T, RecommendationScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecommendationScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecommendationScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecommendationScoreAggregateArgs>(args: Subset<T, RecommendationScoreAggregateArgs>): Prisma.PrismaPromise<GetRecommendationScoreAggregateType<T>>

    /**
     * Group by RecommendationScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecommendationScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecommendationScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecommendationScoreGroupByArgs['orderBy'] }
        : { orderBy?: RecommendationScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecommendationScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecommendationScore model
   */
  readonly fields: RecommendationScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecommendationScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecommendationScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    work<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecommendationScore model
   */
  interface RecommendationScoreFieldRefs {
    readonly id: FieldRef<"RecommendationScore", 'Int'>
    readonly createdAt: FieldRef<"RecommendationScore", 'DateTime'>
    readonly updatedAt: FieldRef<"RecommendationScore", 'DateTime'>
    readonly userId: FieldRef<"RecommendationScore", 'Int'>
    readonly workId: FieldRef<"RecommendationScore", 'Int'>
    readonly contentScore: FieldRef<"RecommendationScore", 'Float'>
    readonly collaborativeScore: FieldRef<"RecommendationScore", 'Float'>
    readonly noveltyBonus: FieldRef<"RecommendationScore", 'Float'>
    readonly negativeMultiplier: FieldRef<"RecommendationScore", 'Float'>
    readonly finalScore: FieldRef<"RecommendationScore", 'Float'>
    readonly reasons: FieldRef<"RecommendationScore", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RecommendationScore findUnique
   */
  export type RecommendationScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * Filter, which RecommendationScore to fetch.
     */
    where: RecommendationScoreWhereUniqueInput
  }

  /**
   * RecommendationScore findUniqueOrThrow
   */
  export type RecommendationScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * Filter, which RecommendationScore to fetch.
     */
    where: RecommendationScoreWhereUniqueInput
  }

  /**
   * RecommendationScore findFirst
   */
  export type RecommendationScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * Filter, which RecommendationScore to fetch.
     */
    where?: RecommendationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecommendationScores to fetch.
     */
    orderBy?: RecommendationScoreOrderByWithRelationInput | RecommendationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecommendationScores.
     */
    cursor?: RecommendationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecommendationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecommendationScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecommendationScores.
     */
    distinct?: RecommendationScoreScalarFieldEnum | RecommendationScoreScalarFieldEnum[]
  }

  /**
   * RecommendationScore findFirstOrThrow
   */
  export type RecommendationScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * Filter, which RecommendationScore to fetch.
     */
    where?: RecommendationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecommendationScores to fetch.
     */
    orderBy?: RecommendationScoreOrderByWithRelationInput | RecommendationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecommendationScores.
     */
    cursor?: RecommendationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecommendationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecommendationScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecommendationScores.
     */
    distinct?: RecommendationScoreScalarFieldEnum | RecommendationScoreScalarFieldEnum[]
  }

  /**
   * RecommendationScore findMany
   */
  export type RecommendationScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * Filter, which RecommendationScores to fetch.
     */
    where?: RecommendationScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecommendationScores to fetch.
     */
    orderBy?: RecommendationScoreOrderByWithRelationInput | RecommendationScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecommendationScores.
     */
    cursor?: RecommendationScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecommendationScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecommendationScores.
     */
    skip?: number
    distinct?: RecommendationScoreScalarFieldEnum | RecommendationScoreScalarFieldEnum[]
  }

  /**
   * RecommendationScore create
   */
  export type RecommendationScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a RecommendationScore.
     */
    data: XOR<RecommendationScoreCreateInput, RecommendationScoreUncheckedCreateInput>
  }

  /**
   * RecommendationScore createMany
   */
  export type RecommendationScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecommendationScores.
     */
    data: RecommendationScoreCreateManyInput | RecommendationScoreCreateManyInput[]
  }

  /**
   * RecommendationScore createManyAndReturn
   */
  export type RecommendationScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * The data used to create many RecommendationScores.
     */
    data: RecommendationScoreCreateManyInput | RecommendationScoreCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecommendationScore update
   */
  export type RecommendationScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a RecommendationScore.
     */
    data: XOR<RecommendationScoreUpdateInput, RecommendationScoreUncheckedUpdateInput>
    /**
     * Choose, which RecommendationScore to update.
     */
    where: RecommendationScoreWhereUniqueInput
  }

  /**
   * RecommendationScore updateMany
   */
  export type RecommendationScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecommendationScores.
     */
    data: XOR<RecommendationScoreUpdateManyMutationInput, RecommendationScoreUncheckedUpdateManyInput>
    /**
     * Filter which RecommendationScores to update
     */
    where?: RecommendationScoreWhereInput
    /**
     * Limit how many RecommendationScores to update.
     */
    limit?: number
  }

  /**
   * RecommendationScore updateManyAndReturn
   */
  export type RecommendationScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * The data used to update RecommendationScores.
     */
    data: XOR<RecommendationScoreUpdateManyMutationInput, RecommendationScoreUncheckedUpdateManyInput>
    /**
     * Filter which RecommendationScores to update
     */
    where?: RecommendationScoreWhereInput
    /**
     * Limit how many RecommendationScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecommendationScore upsert
   */
  export type RecommendationScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the RecommendationScore to update in case it exists.
     */
    where: RecommendationScoreWhereUniqueInput
    /**
     * In case the RecommendationScore found by the `where` argument doesn't exist, create a new RecommendationScore with this data.
     */
    create: XOR<RecommendationScoreCreateInput, RecommendationScoreUncheckedCreateInput>
    /**
     * In case the RecommendationScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecommendationScoreUpdateInput, RecommendationScoreUncheckedUpdateInput>
  }

  /**
   * RecommendationScore delete
   */
  export type RecommendationScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
    /**
     * Filter which RecommendationScore to delete.
     */
    where: RecommendationScoreWhereUniqueInput
  }

  /**
   * RecommendationScore deleteMany
   */
  export type RecommendationScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecommendationScores to delete
     */
    where?: RecommendationScoreWhereInput
    /**
     * Limit how many RecommendationScores to delete.
     */
    limit?: number
  }

  /**
   * RecommendationScore without action
   */
  export type RecommendationScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecommendationScore
     */
    select?: RecommendationScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecommendationScore
     */
    omit?: RecommendationScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecommendationScoreInclude<ExtArgs> | null
  }


  /**
   * Model WorkSimilarity
   */

  export type AggregateWorkSimilarity = {
    _count: WorkSimilarityCountAggregateOutputType | null
    _avg: WorkSimilarityAvgAggregateOutputType | null
    _sum: WorkSimilaritySumAggregateOutputType | null
    _min: WorkSimilarityMinAggregateOutputType | null
    _max: WorkSimilarityMaxAggregateOutputType | null
  }

  export type WorkSimilarityAvgAggregateOutputType = {
    id: number | null
    sourceWorkId: number | null
    targetWorkId: number | null
    similarity: number | null
  }

  export type WorkSimilaritySumAggregateOutputType = {
    id: number | null
    sourceWorkId: number | null
    targetWorkId: number | null
    similarity: number | null
  }

  export type WorkSimilarityMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    sourceWorkId: number | null
    targetWorkId: number | null
    similarity: number | null
    similarityType: string | null
  }

  export type WorkSimilarityMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    sourceWorkId: number | null
    targetWorkId: number | null
    similarity: number | null
    similarityType: string | null
  }

  export type WorkSimilarityCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    sourceWorkId: number
    targetWorkId: number
    similarity: number
    similarityType: number
    _all: number
  }


  export type WorkSimilarityAvgAggregateInputType = {
    id?: true
    sourceWorkId?: true
    targetWorkId?: true
    similarity?: true
  }

  export type WorkSimilaritySumAggregateInputType = {
    id?: true
    sourceWorkId?: true
    targetWorkId?: true
    similarity?: true
  }

  export type WorkSimilarityMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    sourceWorkId?: true
    targetWorkId?: true
    similarity?: true
    similarityType?: true
  }

  export type WorkSimilarityMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    sourceWorkId?: true
    targetWorkId?: true
    similarity?: true
    similarityType?: true
  }

  export type WorkSimilarityCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    sourceWorkId?: true
    targetWorkId?: true
    similarity?: true
    similarityType?: true
    _all?: true
  }

  export type WorkSimilarityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkSimilarity to aggregate.
     */
    where?: WorkSimilarityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSimilarities to fetch.
     */
    orderBy?: WorkSimilarityOrderByWithRelationInput | WorkSimilarityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkSimilarityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSimilarities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSimilarities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkSimilarities
    **/
    _count?: true | WorkSimilarityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkSimilarityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkSimilaritySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkSimilarityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkSimilarityMaxAggregateInputType
  }

  export type GetWorkSimilarityAggregateType<T extends WorkSimilarityAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkSimilarity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkSimilarity[P]>
      : GetScalarType<T[P], AggregateWorkSimilarity[P]>
  }




  export type WorkSimilarityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkSimilarityWhereInput
    orderBy?: WorkSimilarityOrderByWithAggregationInput | WorkSimilarityOrderByWithAggregationInput[]
    by: WorkSimilarityScalarFieldEnum[] | WorkSimilarityScalarFieldEnum
    having?: WorkSimilarityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkSimilarityCountAggregateInputType | true
    _avg?: WorkSimilarityAvgAggregateInputType
    _sum?: WorkSimilaritySumAggregateInputType
    _min?: WorkSimilarityMinAggregateInputType
    _max?: WorkSimilarityMaxAggregateInputType
  }

  export type WorkSimilarityGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    sourceWorkId: number
    targetWorkId: number
    similarity: number
    similarityType: string
    _count: WorkSimilarityCountAggregateOutputType | null
    _avg: WorkSimilarityAvgAggregateOutputType | null
    _sum: WorkSimilaritySumAggregateOutputType | null
    _min: WorkSimilarityMinAggregateOutputType | null
    _max: WorkSimilarityMaxAggregateOutputType | null
  }

  type GetWorkSimilarityGroupByPayload<T extends WorkSimilarityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkSimilarityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkSimilarityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkSimilarityGroupByOutputType[P]>
            : GetScalarType<T[P], WorkSimilarityGroupByOutputType[P]>
        }
      >
    >


  export type WorkSimilaritySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceWorkId?: boolean
    targetWorkId?: boolean
    similarity?: boolean
    similarityType?: boolean
    sourceWork?: boolean | WorkDefaultArgs<ExtArgs>
    targetWork?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workSimilarity"]>

  export type WorkSimilaritySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceWorkId?: boolean
    targetWorkId?: boolean
    similarity?: boolean
    similarityType?: boolean
    sourceWork?: boolean | WorkDefaultArgs<ExtArgs>
    targetWork?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workSimilarity"]>

  export type WorkSimilaritySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceWorkId?: boolean
    targetWorkId?: boolean
    similarity?: boolean
    similarityType?: boolean
    sourceWork?: boolean | WorkDefaultArgs<ExtArgs>
    targetWork?: boolean | WorkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workSimilarity"]>

  export type WorkSimilaritySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sourceWorkId?: boolean
    targetWorkId?: boolean
    similarity?: boolean
    similarityType?: boolean
  }

  export type WorkSimilarityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "sourceWorkId" | "targetWorkId" | "similarity" | "similarityType", ExtArgs["result"]["workSimilarity"]>
  export type WorkSimilarityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceWork?: boolean | WorkDefaultArgs<ExtArgs>
    targetWork?: boolean | WorkDefaultArgs<ExtArgs>
  }
  export type WorkSimilarityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceWork?: boolean | WorkDefaultArgs<ExtArgs>
    targetWork?: boolean | WorkDefaultArgs<ExtArgs>
  }
  export type WorkSimilarityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sourceWork?: boolean | WorkDefaultArgs<ExtArgs>
    targetWork?: boolean | WorkDefaultArgs<ExtArgs>
  }

  export type $WorkSimilarityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkSimilarity"
    objects: {
      sourceWork: Prisma.$WorkPayload<ExtArgs>
      targetWork: Prisma.$WorkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      sourceWorkId: number
      targetWorkId: number
      similarity: number
      similarityType: string
    }, ExtArgs["result"]["workSimilarity"]>
    composites: {}
  }

  type WorkSimilarityGetPayload<S extends boolean | null | undefined | WorkSimilarityDefaultArgs> = $Result.GetResult<Prisma.$WorkSimilarityPayload, S>

  type WorkSimilarityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkSimilarityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkSimilarityCountAggregateInputType | true
    }

  export interface WorkSimilarityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkSimilarity'], meta: { name: 'WorkSimilarity' } }
    /**
     * Find zero or one WorkSimilarity that matches the filter.
     * @param {WorkSimilarityFindUniqueArgs} args - Arguments to find a WorkSimilarity
     * @example
     * // Get one WorkSimilarity
     * const workSimilarity = await prisma.workSimilarity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkSimilarityFindUniqueArgs>(args: SelectSubset<T, WorkSimilarityFindUniqueArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkSimilarity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkSimilarityFindUniqueOrThrowArgs} args - Arguments to find a WorkSimilarity
     * @example
     * // Get one WorkSimilarity
     * const workSimilarity = await prisma.workSimilarity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkSimilarityFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkSimilarityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkSimilarity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityFindFirstArgs} args - Arguments to find a WorkSimilarity
     * @example
     * // Get one WorkSimilarity
     * const workSimilarity = await prisma.workSimilarity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkSimilarityFindFirstArgs>(args?: SelectSubset<T, WorkSimilarityFindFirstArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkSimilarity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityFindFirstOrThrowArgs} args - Arguments to find a WorkSimilarity
     * @example
     * // Get one WorkSimilarity
     * const workSimilarity = await prisma.workSimilarity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkSimilarityFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkSimilarityFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkSimilarities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkSimilarities
     * const workSimilarities = await prisma.workSimilarity.findMany()
     * 
     * // Get first 10 WorkSimilarities
     * const workSimilarities = await prisma.workSimilarity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workSimilarityWithIdOnly = await prisma.workSimilarity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkSimilarityFindManyArgs>(args?: SelectSubset<T, WorkSimilarityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkSimilarity.
     * @param {WorkSimilarityCreateArgs} args - Arguments to create a WorkSimilarity.
     * @example
     * // Create one WorkSimilarity
     * const WorkSimilarity = await prisma.workSimilarity.create({
     *   data: {
     *     // ... data to create a WorkSimilarity
     *   }
     * })
     * 
     */
    create<T extends WorkSimilarityCreateArgs>(args: SelectSubset<T, WorkSimilarityCreateArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkSimilarities.
     * @param {WorkSimilarityCreateManyArgs} args - Arguments to create many WorkSimilarities.
     * @example
     * // Create many WorkSimilarities
     * const workSimilarity = await prisma.workSimilarity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkSimilarityCreateManyArgs>(args?: SelectSubset<T, WorkSimilarityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkSimilarities and returns the data saved in the database.
     * @param {WorkSimilarityCreateManyAndReturnArgs} args - Arguments to create many WorkSimilarities.
     * @example
     * // Create many WorkSimilarities
     * const workSimilarity = await prisma.workSimilarity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkSimilarities and only return the `id`
     * const workSimilarityWithIdOnly = await prisma.workSimilarity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkSimilarityCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkSimilarityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkSimilarity.
     * @param {WorkSimilarityDeleteArgs} args - Arguments to delete one WorkSimilarity.
     * @example
     * // Delete one WorkSimilarity
     * const WorkSimilarity = await prisma.workSimilarity.delete({
     *   where: {
     *     // ... filter to delete one WorkSimilarity
     *   }
     * })
     * 
     */
    delete<T extends WorkSimilarityDeleteArgs>(args: SelectSubset<T, WorkSimilarityDeleteArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkSimilarity.
     * @param {WorkSimilarityUpdateArgs} args - Arguments to update one WorkSimilarity.
     * @example
     * // Update one WorkSimilarity
     * const workSimilarity = await prisma.workSimilarity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkSimilarityUpdateArgs>(args: SelectSubset<T, WorkSimilarityUpdateArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkSimilarities.
     * @param {WorkSimilarityDeleteManyArgs} args - Arguments to filter WorkSimilarities to delete.
     * @example
     * // Delete a few WorkSimilarities
     * const { count } = await prisma.workSimilarity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkSimilarityDeleteManyArgs>(args?: SelectSubset<T, WorkSimilarityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkSimilarities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkSimilarities
     * const workSimilarity = await prisma.workSimilarity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkSimilarityUpdateManyArgs>(args: SelectSubset<T, WorkSimilarityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkSimilarities and returns the data updated in the database.
     * @param {WorkSimilarityUpdateManyAndReturnArgs} args - Arguments to update many WorkSimilarities.
     * @example
     * // Update many WorkSimilarities
     * const workSimilarity = await prisma.workSimilarity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkSimilarities and only return the `id`
     * const workSimilarityWithIdOnly = await prisma.workSimilarity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkSimilarityUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkSimilarityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkSimilarity.
     * @param {WorkSimilarityUpsertArgs} args - Arguments to update or create a WorkSimilarity.
     * @example
     * // Update or create a WorkSimilarity
     * const workSimilarity = await prisma.workSimilarity.upsert({
     *   create: {
     *     // ... data to create a WorkSimilarity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkSimilarity we want to update
     *   }
     * })
     */
    upsert<T extends WorkSimilarityUpsertArgs>(args: SelectSubset<T, WorkSimilarityUpsertArgs<ExtArgs>>): Prisma__WorkSimilarityClient<$Result.GetResult<Prisma.$WorkSimilarityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkSimilarities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityCountArgs} args - Arguments to filter WorkSimilarities to count.
     * @example
     * // Count the number of WorkSimilarities
     * const count = await prisma.workSimilarity.count({
     *   where: {
     *     // ... the filter for the WorkSimilarities we want to count
     *   }
     * })
    **/
    count<T extends WorkSimilarityCountArgs>(
      args?: Subset<T, WorkSimilarityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkSimilarityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkSimilarity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkSimilarityAggregateArgs>(args: Subset<T, WorkSimilarityAggregateArgs>): Prisma.PrismaPromise<GetWorkSimilarityAggregateType<T>>

    /**
     * Group by WorkSimilarity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkSimilarityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkSimilarityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkSimilarityGroupByArgs['orderBy'] }
        : { orderBy?: WorkSimilarityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkSimilarityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkSimilarityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkSimilarity model
   */
  readonly fields: WorkSimilarityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkSimilarity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkSimilarityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sourceWork<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    targetWork<T extends WorkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkDefaultArgs<ExtArgs>>): Prisma__WorkClient<$Result.GetResult<Prisma.$WorkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkSimilarity model
   */
  interface WorkSimilarityFieldRefs {
    readonly id: FieldRef<"WorkSimilarity", 'Int'>
    readonly createdAt: FieldRef<"WorkSimilarity", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkSimilarity", 'DateTime'>
    readonly sourceWorkId: FieldRef<"WorkSimilarity", 'Int'>
    readonly targetWorkId: FieldRef<"WorkSimilarity", 'Int'>
    readonly similarity: FieldRef<"WorkSimilarity", 'Float'>
    readonly similarityType: FieldRef<"WorkSimilarity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkSimilarity findUnique
   */
  export type WorkSimilarityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * Filter, which WorkSimilarity to fetch.
     */
    where: WorkSimilarityWhereUniqueInput
  }

  /**
   * WorkSimilarity findUniqueOrThrow
   */
  export type WorkSimilarityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * Filter, which WorkSimilarity to fetch.
     */
    where: WorkSimilarityWhereUniqueInput
  }

  /**
   * WorkSimilarity findFirst
   */
  export type WorkSimilarityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * Filter, which WorkSimilarity to fetch.
     */
    where?: WorkSimilarityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSimilarities to fetch.
     */
    orderBy?: WorkSimilarityOrderByWithRelationInput | WorkSimilarityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkSimilarities.
     */
    cursor?: WorkSimilarityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSimilarities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSimilarities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkSimilarities.
     */
    distinct?: WorkSimilarityScalarFieldEnum | WorkSimilarityScalarFieldEnum[]
  }

  /**
   * WorkSimilarity findFirstOrThrow
   */
  export type WorkSimilarityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * Filter, which WorkSimilarity to fetch.
     */
    where?: WorkSimilarityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSimilarities to fetch.
     */
    orderBy?: WorkSimilarityOrderByWithRelationInput | WorkSimilarityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkSimilarities.
     */
    cursor?: WorkSimilarityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSimilarities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSimilarities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkSimilarities.
     */
    distinct?: WorkSimilarityScalarFieldEnum | WorkSimilarityScalarFieldEnum[]
  }

  /**
   * WorkSimilarity findMany
   */
  export type WorkSimilarityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * Filter, which WorkSimilarities to fetch.
     */
    where?: WorkSimilarityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkSimilarities to fetch.
     */
    orderBy?: WorkSimilarityOrderByWithRelationInput | WorkSimilarityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkSimilarities.
     */
    cursor?: WorkSimilarityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkSimilarities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkSimilarities.
     */
    skip?: number
    distinct?: WorkSimilarityScalarFieldEnum | WorkSimilarityScalarFieldEnum[]
  }

  /**
   * WorkSimilarity create
   */
  export type WorkSimilarityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkSimilarity.
     */
    data: XOR<WorkSimilarityCreateInput, WorkSimilarityUncheckedCreateInput>
  }

  /**
   * WorkSimilarity createMany
   */
  export type WorkSimilarityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkSimilarities.
     */
    data: WorkSimilarityCreateManyInput | WorkSimilarityCreateManyInput[]
  }

  /**
   * WorkSimilarity createManyAndReturn
   */
  export type WorkSimilarityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * The data used to create many WorkSimilarities.
     */
    data: WorkSimilarityCreateManyInput | WorkSimilarityCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkSimilarity update
   */
  export type WorkSimilarityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkSimilarity.
     */
    data: XOR<WorkSimilarityUpdateInput, WorkSimilarityUncheckedUpdateInput>
    /**
     * Choose, which WorkSimilarity to update.
     */
    where: WorkSimilarityWhereUniqueInput
  }

  /**
   * WorkSimilarity updateMany
   */
  export type WorkSimilarityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkSimilarities.
     */
    data: XOR<WorkSimilarityUpdateManyMutationInput, WorkSimilarityUncheckedUpdateManyInput>
    /**
     * Filter which WorkSimilarities to update
     */
    where?: WorkSimilarityWhereInput
    /**
     * Limit how many WorkSimilarities to update.
     */
    limit?: number
  }

  /**
   * WorkSimilarity updateManyAndReturn
   */
  export type WorkSimilarityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * The data used to update WorkSimilarities.
     */
    data: XOR<WorkSimilarityUpdateManyMutationInput, WorkSimilarityUncheckedUpdateManyInput>
    /**
     * Filter which WorkSimilarities to update
     */
    where?: WorkSimilarityWhereInput
    /**
     * Limit how many WorkSimilarities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkSimilarity upsert
   */
  export type WorkSimilarityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkSimilarity to update in case it exists.
     */
    where: WorkSimilarityWhereUniqueInput
    /**
     * In case the WorkSimilarity found by the `where` argument doesn't exist, create a new WorkSimilarity with this data.
     */
    create: XOR<WorkSimilarityCreateInput, WorkSimilarityUncheckedCreateInput>
    /**
     * In case the WorkSimilarity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkSimilarityUpdateInput, WorkSimilarityUncheckedUpdateInput>
  }

  /**
   * WorkSimilarity delete
   */
  export type WorkSimilarityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
    /**
     * Filter which WorkSimilarity to delete.
     */
    where: WorkSimilarityWhereUniqueInput
  }

  /**
   * WorkSimilarity deleteMany
   */
  export type WorkSimilarityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkSimilarities to delete
     */
    where?: WorkSimilarityWhereInput
    /**
     * Limit how many WorkSimilarities to delete.
     */
    limit?: number
  }

  /**
   * WorkSimilarity without action
   */
  export type WorkSimilarityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkSimilarity
     */
    select?: WorkSimilaritySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkSimilarity
     */
    omit?: WorkSimilarityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkSimilarityInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AuthorScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    openLibraryId: 'openLibraryId',
    name: 'name',
    personalName: 'personalName',
    birthDate: 'birthDate',
    deathDate: 'deathDate',
    bio: 'bio',
    alternateNames: 'alternateNames',
    location: 'location',
    easternOrder: 'easternOrder',
    wikipedia: 'wikipedia',
    links: 'links'
  };

  export type AuthorScalarFieldEnum = (typeof AuthorScalarFieldEnum)[keyof typeof AuthorScalarFieldEnum]


  export const WorkScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    openLibraryId: 'openLibraryId',
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    firstPublishDate: 'firstPublishDate',
    firstSentence: 'firstSentence',
    subjects: 'subjects',
    subjectPlaces: 'subjectPlaces',
    subjectTimes: 'subjectTimes',
    subjectPeople: 'subjectPeople',
    originalLanguages: 'originalLanguages',
    otherTitles: 'otherTitles'
  };

  export type WorkScalarFieldEnum = (typeof WorkScalarFieldEnum)[keyof typeof WorkScalarFieldEnum]


  export const AuthorWorkScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    workId: 'workId',
    role: 'role'
  };

  export type AuthorWorkScalarFieldEnum = (typeof AuthorWorkScalarFieldEnum)[keyof typeof AuthorWorkScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    status: 'status',
    emailVerified: 'emailVerified'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    subjectPreferences: 'subjectPreferences',
    placePreferences: 'placePreferences',
    timePreferences: 'timePreferences',
    peoplePreferences: 'peoplePreferences',
    languagePreferences: 'languagePreferences',
    preferredPublishEra: 'preferredPublishEra',
    dislikedSubjects: 'dislikedSubjects',
    dislikedPlaces: 'dislikedPlaces',
    dislikedAuthors: 'dislikedAuthors',
    totalLikes: 'totalLikes',
    totalDislikes: 'totalDislikes',
    lastInteractionAt: 'lastInteractionAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const UserInteractionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    workId: 'workId',
    userId: 'userId',
    liked: 'liked'
  };

  export type UserInteractionScalarFieldEnum = (typeof UserInteractionScalarFieldEnum)[keyof typeof UserInteractionScalarFieldEnum]


  export const RecommendationScoreScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    workId: 'workId',
    contentScore: 'contentScore',
    collaborativeScore: 'collaborativeScore',
    noveltyBonus: 'noveltyBonus',
    negativeMultiplier: 'negativeMultiplier',
    finalScore: 'finalScore',
    reasons: 'reasons'
  };

  export type RecommendationScoreScalarFieldEnum = (typeof RecommendationScoreScalarFieldEnum)[keyof typeof RecommendationScoreScalarFieldEnum]


  export const WorkSimilarityScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sourceWorkId: 'sourceWorkId',
    targetWorkId: 'targetWorkId',
    similarity: 'similarity',
    similarityType: 'similarityType'
  };

  export type WorkSimilarityScalarFieldEnum = (typeof WorkSimilarityScalarFieldEnum)[keyof typeof WorkSimilarityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AuthorWhereInput = {
    AND?: AuthorWhereInput | AuthorWhereInput[]
    OR?: AuthorWhereInput[]
    NOT?: AuthorWhereInput | AuthorWhereInput[]
    id?: IntFilter<"Author"> | number
    createdAt?: DateTimeFilter<"Author"> | Date | string
    updatedAt?: DateTimeFilter<"Author"> | Date | string
    openLibraryId?: StringNullableFilter<"Author"> | string | null
    name?: StringFilter<"Author"> | string
    personalName?: StringNullableFilter<"Author"> | string | null
    birthDate?: StringNullableFilter<"Author"> | string | null
    deathDate?: StringNullableFilter<"Author"> | string | null
    bio?: StringNullableFilter<"Author"> | string | null
    alternateNames?: StringNullableFilter<"Author"> | string | null
    location?: StringNullableFilter<"Author"> | string | null
    easternOrder?: BoolNullableFilter<"Author"> | boolean | null
    wikipedia?: StringNullableFilter<"Author"> | string | null
    links?: StringNullableFilter<"Author"> | string | null
    works?: AuthorWorkListRelationFilter
  }

  export type AuthorOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrderInput | SortOrder
    name?: SortOrder
    personalName?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    alternateNames?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    easternOrder?: SortOrderInput | SortOrder
    wikipedia?: SortOrderInput | SortOrder
    links?: SortOrderInput | SortOrder
    works?: AuthorWorkOrderByRelationAggregateInput
  }

  export type AuthorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    openLibraryId?: string
    AND?: AuthorWhereInput | AuthorWhereInput[]
    OR?: AuthorWhereInput[]
    NOT?: AuthorWhereInput | AuthorWhereInput[]
    createdAt?: DateTimeFilter<"Author"> | Date | string
    updatedAt?: DateTimeFilter<"Author"> | Date | string
    name?: StringFilter<"Author"> | string
    personalName?: StringNullableFilter<"Author"> | string | null
    birthDate?: StringNullableFilter<"Author"> | string | null
    deathDate?: StringNullableFilter<"Author"> | string | null
    bio?: StringNullableFilter<"Author"> | string | null
    alternateNames?: StringNullableFilter<"Author"> | string | null
    location?: StringNullableFilter<"Author"> | string | null
    easternOrder?: BoolNullableFilter<"Author"> | boolean | null
    wikipedia?: StringNullableFilter<"Author"> | string | null
    links?: StringNullableFilter<"Author"> | string | null
    works?: AuthorWorkListRelationFilter
  }, "id" | "openLibraryId">

  export type AuthorOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrderInput | SortOrder
    name?: SortOrder
    personalName?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    alternateNames?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    easternOrder?: SortOrderInput | SortOrder
    wikipedia?: SortOrderInput | SortOrder
    links?: SortOrderInput | SortOrder
    _count?: AuthorCountOrderByAggregateInput
    _avg?: AuthorAvgOrderByAggregateInput
    _max?: AuthorMaxOrderByAggregateInput
    _min?: AuthorMinOrderByAggregateInput
    _sum?: AuthorSumOrderByAggregateInput
  }

  export type AuthorScalarWhereWithAggregatesInput = {
    AND?: AuthorScalarWhereWithAggregatesInput | AuthorScalarWhereWithAggregatesInput[]
    OR?: AuthorScalarWhereWithAggregatesInput[]
    NOT?: AuthorScalarWhereWithAggregatesInput | AuthorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Author"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Author"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Author"> | Date | string
    openLibraryId?: StringNullableWithAggregatesFilter<"Author"> | string | null
    name?: StringWithAggregatesFilter<"Author"> | string
    personalName?: StringNullableWithAggregatesFilter<"Author"> | string | null
    birthDate?: StringNullableWithAggregatesFilter<"Author"> | string | null
    deathDate?: StringNullableWithAggregatesFilter<"Author"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Author"> | string | null
    alternateNames?: StringNullableWithAggregatesFilter<"Author"> | string | null
    location?: StringNullableWithAggregatesFilter<"Author"> | string | null
    easternOrder?: BoolNullableWithAggregatesFilter<"Author"> | boolean | null
    wikipedia?: StringNullableWithAggregatesFilter<"Author"> | string | null
    links?: StringNullableWithAggregatesFilter<"Author"> | string | null
  }

  export type WorkWhereInput = {
    AND?: WorkWhereInput | WorkWhereInput[]
    OR?: WorkWhereInput[]
    NOT?: WorkWhereInput | WorkWhereInput[]
    id?: IntFilter<"Work"> | number
    createdAt?: DateTimeFilter<"Work"> | Date | string
    updatedAt?: DateTimeFilter<"Work"> | Date | string
    openLibraryId?: StringNullableFilter<"Work"> | string | null
    title?: StringFilter<"Work"> | string
    subtitle?: StringNullableFilter<"Work"> | string | null
    description?: StringNullableFilter<"Work"> | string | null
    firstPublishDate?: StringNullableFilter<"Work"> | string | null
    firstSentence?: StringNullableFilter<"Work"> | string | null
    subjects?: StringNullableFilter<"Work"> | string | null
    subjectPlaces?: StringNullableFilter<"Work"> | string | null
    subjectTimes?: StringNullableFilter<"Work"> | string | null
    subjectPeople?: StringNullableFilter<"Work"> | string | null
    originalLanguages?: StringNullableFilter<"Work"> | string | null
    otherTitles?: StringNullableFilter<"Work"> | string | null
    authors?: AuthorWorkListRelationFilter
    userInteractions?: UserInteractionListRelationFilter
    recommendationScores?: RecommendationScoreListRelationFilter
    sourceWorkSimilarities?: WorkSimilarityListRelationFilter
    targetWorkSimilarities?: WorkSimilarityListRelationFilter
  }

  export type WorkOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrderInput | SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    firstPublishDate?: SortOrderInput | SortOrder
    firstSentence?: SortOrderInput | SortOrder
    subjects?: SortOrderInput | SortOrder
    subjectPlaces?: SortOrderInput | SortOrder
    subjectTimes?: SortOrderInput | SortOrder
    subjectPeople?: SortOrderInput | SortOrder
    originalLanguages?: SortOrderInput | SortOrder
    otherTitles?: SortOrderInput | SortOrder
    authors?: AuthorWorkOrderByRelationAggregateInput
    userInteractions?: UserInteractionOrderByRelationAggregateInput
    recommendationScores?: RecommendationScoreOrderByRelationAggregateInput
    sourceWorkSimilarities?: WorkSimilarityOrderByRelationAggregateInput
    targetWorkSimilarities?: WorkSimilarityOrderByRelationAggregateInput
  }

  export type WorkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    openLibraryId?: string
    AND?: WorkWhereInput | WorkWhereInput[]
    OR?: WorkWhereInput[]
    NOT?: WorkWhereInput | WorkWhereInput[]
    createdAt?: DateTimeFilter<"Work"> | Date | string
    updatedAt?: DateTimeFilter<"Work"> | Date | string
    title?: StringFilter<"Work"> | string
    subtitle?: StringNullableFilter<"Work"> | string | null
    description?: StringNullableFilter<"Work"> | string | null
    firstPublishDate?: StringNullableFilter<"Work"> | string | null
    firstSentence?: StringNullableFilter<"Work"> | string | null
    subjects?: StringNullableFilter<"Work"> | string | null
    subjectPlaces?: StringNullableFilter<"Work"> | string | null
    subjectTimes?: StringNullableFilter<"Work"> | string | null
    subjectPeople?: StringNullableFilter<"Work"> | string | null
    originalLanguages?: StringNullableFilter<"Work"> | string | null
    otherTitles?: StringNullableFilter<"Work"> | string | null
    authors?: AuthorWorkListRelationFilter
    userInteractions?: UserInteractionListRelationFilter
    recommendationScores?: RecommendationScoreListRelationFilter
    sourceWorkSimilarities?: WorkSimilarityListRelationFilter
    targetWorkSimilarities?: WorkSimilarityListRelationFilter
  }, "id" | "openLibraryId">

  export type WorkOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrderInput | SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    firstPublishDate?: SortOrderInput | SortOrder
    firstSentence?: SortOrderInput | SortOrder
    subjects?: SortOrderInput | SortOrder
    subjectPlaces?: SortOrderInput | SortOrder
    subjectTimes?: SortOrderInput | SortOrder
    subjectPeople?: SortOrderInput | SortOrder
    originalLanguages?: SortOrderInput | SortOrder
    otherTitles?: SortOrderInput | SortOrder
    _count?: WorkCountOrderByAggregateInput
    _avg?: WorkAvgOrderByAggregateInput
    _max?: WorkMaxOrderByAggregateInput
    _min?: WorkMinOrderByAggregateInput
    _sum?: WorkSumOrderByAggregateInput
  }

  export type WorkScalarWhereWithAggregatesInput = {
    AND?: WorkScalarWhereWithAggregatesInput | WorkScalarWhereWithAggregatesInput[]
    OR?: WorkScalarWhereWithAggregatesInput[]
    NOT?: WorkScalarWhereWithAggregatesInput | WorkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Work"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Work"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Work"> | Date | string
    openLibraryId?: StringNullableWithAggregatesFilter<"Work"> | string | null
    title?: StringWithAggregatesFilter<"Work"> | string
    subtitle?: StringNullableWithAggregatesFilter<"Work"> | string | null
    description?: StringNullableWithAggregatesFilter<"Work"> | string | null
    firstPublishDate?: StringNullableWithAggregatesFilter<"Work"> | string | null
    firstSentence?: StringNullableWithAggregatesFilter<"Work"> | string | null
    subjects?: StringNullableWithAggregatesFilter<"Work"> | string | null
    subjectPlaces?: StringNullableWithAggregatesFilter<"Work"> | string | null
    subjectTimes?: StringNullableWithAggregatesFilter<"Work"> | string | null
    subjectPeople?: StringNullableWithAggregatesFilter<"Work"> | string | null
    originalLanguages?: StringNullableWithAggregatesFilter<"Work"> | string | null
    otherTitles?: StringNullableWithAggregatesFilter<"Work"> | string | null
  }

  export type AuthorWorkWhereInput = {
    AND?: AuthorWorkWhereInput | AuthorWorkWhereInput[]
    OR?: AuthorWorkWhereInput[]
    NOT?: AuthorWorkWhereInput | AuthorWorkWhereInput[]
    id?: IntFilter<"AuthorWork"> | number
    authorId?: IntFilter<"AuthorWork"> | number
    workId?: IntFilter<"AuthorWork"> | number
    role?: StringNullableFilter<"AuthorWork"> | string | null
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
  }

  export type AuthorWorkOrderByWithRelationInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
    role?: SortOrderInput | SortOrder
    author?: AuthorOrderByWithRelationInput
    work?: WorkOrderByWithRelationInput
  }

  export type AuthorWorkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    authorId_workId?: AuthorWorkAuthorIdWorkIdCompoundUniqueInput
    AND?: AuthorWorkWhereInput | AuthorWorkWhereInput[]
    OR?: AuthorWorkWhereInput[]
    NOT?: AuthorWorkWhereInput | AuthorWorkWhereInput[]
    authorId?: IntFilter<"AuthorWork"> | number
    workId?: IntFilter<"AuthorWork"> | number
    role?: StringNullableFilter<"AuthorWork"> | string | null
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
  }, "id" | "authorId_workId">

  export type AuthorWorkOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
    role?: SortOrderInput | SortOrder
    _count?: AuthorWorkCountOrderByAggregateInput
    _avg?: AuthorWorkAvgOrderByAggregateInput
    _max?: AuthorWorkMaxOrderByAggregateInput
    _min?: AuthorWorkMinOrderByAggregateInput
    _sum?: AuthorWorkSumOrderByAggregateInput
  }

  export type AuthorWorkScalarWhereWithAggregatesInput = {
    AND?: AuthorWorkScalarWhereWithAggregatesInput | AuthorWorkScalarWhereWithAggregatesInput[]
    OR?: AuthorWorkScalarWhereWithAggregatesInput[]
    NOT?: AuthorWorkScalarWhereWithAggregatesInput | AuthorWorkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuthorWork"> | number
    authorId?: IntWithAggregatesFilter<"AuthorWork"> | number
    workId?: IntWithAggregatesFilter<"AuthorWork"> | number
    role?: StringNullableWithAggregatesFilter<"AuthorWork"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    emailVerified?: BoolFilter<"User"> | boolean
    interactions?: UserInteractionListRelationFilter
    profile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    recommendationScores?: RecommendationScoreListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    interactions?: UserInteractionOrderByRelationAggregateInput
    profile?: UserProfileOrderByWithRelationInput
    recommendationScores?: RecommendationScoreOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    emailVerified?: BoolFilter<"User"> | boolean
    interactions?: UserInteractionListRelationFilter
    profile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
    recommendationScores?: RecommendationScoreListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: IntFilter<"UserProfile"> | number
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    userId?: IntFilter<"UserProfile"> | number
    subjectPreferences?: StringNullableFilter<"UserProfile"> | string | null
    placePreferences?: StringNullableFilter<"UserProfile"> | string | null
    timePreferences?: StringNullableFilter<"UserProfile"> | string | null
    peoplePreferences?: StringNullableFilter<"UserProfile"> | string | null
    languagePreferences?: StringNullableFilter<"UserProfile"> | string | null
    preferredPublishEra?: StringNullableFilter<"UserProfile"> | string | null
    dislikedSubjects?: StringNullableFilter<"UserProfile"> | string | null
    dislikedPlaces?: StringNullableFilter<"UserProfile"> | string | null
    dislikedAuthors?: StringNullableFilter<"UserProfile"> | string | null
    totalLikes?: IntFilter<"UserProfile"> | number
    totalDislikes?: IntFilter<"UserProfile"> | number
    lastInteractionAt?: DateTimeNullableFilter<"UserProfile"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectPreferences?: SortOrderInput | SortOrder
    placePreferences?: SortOrderInput | SortOrder
    timePreferences?: SortOrderInput | SortOrder
    peoplePreferences?: SortOrderInput | SortOrder
    languagePreferences?: SortOrderInput | SortOrder
    preferredPublishEra?: SortOrderInput | SortOrder
    dislikedSubjects?: SortOrderInput | SortOrder
    dislikedPlaces?: SortOrderInput | SortOrder
    dislikedAuthors?: SortOrderInput | SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
    lastInteractionAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    subjectPreferences?: StringNullableFilter<"UserProfile"> | string | null
    placePreferences?: StringNullableFilter<"UserProfile"> | string | null
    timePreferences?: StringNullableFilter<"UserProfile"> | string | null
    peoplePreferences?: StringNullableFilter<"UserProfile"> | string | null
    languagePreferences?: StringNullableFilter<"UserProfile"> | string | null
    preferredPublishEra?: StringNullableFilter<"UserProfile"> | string | null
    dislikedSubjects?: StringNullableFilter<"UserProfile"> | string | null
    dislikedPlaces?: StringNullableFilter<"UserProfile"> | string | null
    dislikedAuthors?: StringNullableFilter<"UserProfile"> | string | null
    totalLikes?: IntFilter<"UserProfile"> | number
    totalDislikes?: IntFilter<"UserProfile"> | number
    lastInteractionAt?: DateTimeNullableFilter<"UserProfile"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectPreferences?: SortOrderInput | SortOrder
    placePreferences?: SortOrderInput | SortOrder
    timePreferences?: SortOrderInput | SortOrder
    peoplePreferences?: SortOrderInput | SortOrder
    languagePreferences?: SortOrderInput | SortOrder
    preferredPublishEra?: SortOrderInput | SortOrder
    dislikedSubjects?: SortOrderInput | SortOrder
    dislikedPlaces?: SortOrderInput | SortOrder
    dislikedAuthors?: SortOrderInput | SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
    lastInteractionAt?: SortOrderInput | SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserProfile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    userId?: IntWithAggregatesFilter<"UserProfile"> | number
    subjectPreferences?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    placePreferences?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    timePreferences?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    peoplePreferences?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    languagePreferences?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    preferredPublishEra?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    dislikedSubjects?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    dislikedPlaces?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    dislikedAuthors?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    totalLikes?: IntWithAggregatesFilter<"UserProfile"> | number
    totalDislikes?: IntWithAggregatesFilter<"UserProfile"> | number
    lastInteractionAt?: DateTimeNullableWithAggregatesFilter<"UserProfile"> | Date | string | null
  }

  export type UserInteractionWhereInput = {
    AND?: UserInteractionWhereInput | UserInteractionWhereInput[]
    OR?: UserInteractionWhereInput[]
    NOT?: UserInteractionWhereInput | UserInteractionWhereInput[]
    id?: StringFilter<"UserInteraction"> | string
    createdAt?: DateTimeFilter<"UserInteraction"> | Date | string
    workId?: IntFilter<"UserInteraction"> | number
    userId?: IntFilter<"UserInteraction"> | number
    liked?: BoolFilter<"UserInteraction"> | boolean
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserInteractionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    workId?: SortOrder
    userId?: SortOrder
    liked?: SortOrder
    work?: WorkOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserInteractionWhereInput | UserInteractionWhereInput[]
    OR?: UserInteractionWhereInput[]
    NOT?: UserInteractionWhereInput | UserInteractionWhereInput[]
    createdAt?: DateTimeFilter<"UserInteraction"> | Date | string
    workId?: IntFilter<"UserInteraction"> | number
    userId?: IntFilter<"UserInteraction"> | number
    liked?: BoolFilter<"UserInteraction"> | boolean
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    workId?: SortOrder
    userId?: SortOrder
    liked?: SortOrder
    _count?: UserInteractionCountOrderByAggregateInput
    _avg?: UserInteractionAvgOrderByAggregateInput
    _max?: UserInteractionMaxOrderByAggregateInput
    _min?: UserInteractionMinOrderByAggregateInput
    _sum?: UserInteractionSumOrderByAggregateInput
  }

  export type UserInteractionScalarWhereWithAggregatesInput = {
    AND?: UserInteractionScalarWhereWithAggregatesInput | UserInteractionScalarWhereWithAggregatesInput[]
    OR?: UserInteractionScalarWhereWithAggregatesInput[]
    NOT?: UserInteractionScalarWhereWithAggregatesInput | UserInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserInteraction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserInteraction"> | Date | string
    workId?: IntWithAggregatesFilter<"UserInteraction"> | number
    userId?: IntWithAggregatesFilter<"UserInteraction"> | number
    liked?: BoolWithAggregatesFilter<"UserInteraction"> | boolean
  }

  export type RecommendationScoreWhereInput = {
    AND?: RecommendationScoreWhereInput | RecommendationScoreWhereInput[]
    OR?: RecommendationScoreWhereInput[]
    NOT?: RecommendationScoreWhereInput | RecommendationScoreWhereInput[]
    id?: IntFilter<"RecommendationScore"> | number
    createdAt?: DateTimeFilter<"RecommendationScore"> | Date | string
    updatedAt?: DateTimeFilter<"RecommendationScore"> | Date | string
    userId?: IntFilter<"RecommendationScore"> | number
    workId?: IntFilter<"RecommendationScore"> | number
    contentScore?: FloatFilter<"RecommendationScore"> | number
    collaborativeScore?: FloatFilter<"RecommendationScore"> | number
    noveltyBonus?: FloatFilter<"RecommendationScore"> | number
    negativeMultiplier?: FloatFilter<"RecommendationScore"> | number
    finalScore?: FloatFilter<"RecommendationScore"> | number
    reasons?: StringFilter<"RecommendationScore"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
  }

  export type RecommendationScoreOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
    reasons?: SortOrder
    user?: UserOrderByWithRelationInput
    work?: WorkOrderByWithRelationInput
  }

  export type RecommendationScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    unique_user_work_recommendation?: RecommendationScoreUnique_user_work_recommendationCompoundUniqueInput
    AND?: RecommendationScoreWhereInput | RecommendationScoreWhereInput[]
    OR?: RecommendationScoreWhereInput[]
    NOT?: RecommendationScoreWhereInput | RecommendationScoreWhereInput[]
    createdAt?: DateTimeFilter<"RecommendationScore"> | Date | string
    updatedAt?: DateTimeFilter<"RecommendationScore"> | Date | string
    userId?: IntFilter<"RecommendationScore"> | number
    workId?: IntFilter<"RecommendationScore"> | number
    contentScore?: FloatFilter<"RecommendationScore"> | number
    collaborativeScore?: FloatFilter<"RecommendationScore"> | number
    noveltyBonus?: FloatFilter<"RecommendationScore"> | number
    negativeMultiplier?: FloatFilter<"RecommendationScore"> | number
    finalScore?: FloatFilter<"RecommendationScore"> | number
    reasons?: StringFilter<"RecommendationScore"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    work?: XOR<WorkScalarRelationFilter, WorkWhereInput>
  }, "id" | "unique_user_work_recommendation">

  export type RecommendationScoreOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
    reasons?: SortOrder
    _count?: RecommendationScoreCountOrderByAggregateInput
    _avg?: RecommendationScoreAvgOrderByAggregateInput
    _max?: RecommendationScoreMaxOrderByAggregateInput
    _min?: RecommendationScoreMinOrderByAggregateInput
    _sum?: RecommendationScoreSumOrderByAggregateInput
  }

  export type RecommendationScoreScalarWhereWithAggregatesInput = {
    AND?: RecommendationScoreScalarWhereWithAggregatesInput | RecommendationScoreScalarWhereWithAggregatesInput[]
    OR?: RecommendationScoreScalarWhereWithAggregatesInput[]
    NOT?: RecommendationScoreScalarWhereWithAggregatesInput | RecommendationScoreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RecommendationScore"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RecommendationScore"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecommendationScore"> | Date | string
    userId?: IntWithAggregatesFilter<"RecommendationScore"> | number
    workId?: IntWithAggregatesFilter<"RecommendationScore"> | number
    contentScore?: FloatWithAggregatesFilter<"RecommendationScore"> | number
    collaborativeScore?: FloatWithAggregatesFilter<"RecommendationScore"> | number
    noveltyBonus?: FloatWithAggregatesFilter<"RecommendationScore"> | number
    negativeMultiplier?: FloatWithAggregatesFilter<"RecommendationScore"> | number
    finalScore?: FloatWithAggregatesFilter<"RecommendationScore"> | number
    reasons?: StringWithAggregatesFilter<"RecommendationScore"> | string
  }

  export type WorkSimilarityWhereInput = {
    AND?: WorkSimilarityWhereInput | WorkSimilarityWhereInput[]
    OR?: WorkSimilarityWhereInput[]
    NOT?: WorkSimilarityWhereInput | WorkSimilarityWhereInput[]
    id?: IntFilter<"WorkSimilarity"> | number
    createdAt?: DateTimeFilter<"WorkSimilarity"> | Date | string
    updatedAt?: DateTimeFilter<"WorkSimilarity"> | Date | string
    sourceWorkId?: IntFilter<"WorkSimilarity"> | number
    targetWorkId?: IntFilter<"WorkSimilarity"> | number
    similarity?: FloatFilter<"WorkSimilarity"> | number
    similarityType?: StringFilter<"WorkSimilarity"> | string
    sourceWork?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    targetWork?: XOR<WorkScalarRelationFilter, WorkWhereInput>
  }

  export type WorkSimilarityOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
    similarityType?: SortOrder
    sourceWork?: WorkOrderByWithRelationInput
    targetWork?: WorkOrderByWithRelationInput
  }

  export type WorkSimilarityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    unique_work_similarity?: WorkSimilarityUnique_work_similarityCompoundUniqueInput
    AND?: WorkSimilarityWhereInput | WorkSimilarityWhereInput[]
    OR?: WorkSimilarityWhereInput[]
    NOT?: WorkSimilarityWhereInput | WorkSimilarityWhereInput[]
    createdAt?: DateTimeFilter<"WorkSimilarity"> | Date | string
    updatedAt?: DateTimeFilter<"WorkSimilarity"> | Date | string
    sourceWorkId?: IntFilter<"WorkSimilarity"> | number
    targetWorkId?: IntFilter<"WorkSimilarity"> | number
    similarity?: FloatFilter<"WorkSimilarity"> | number
    similarityType?: StringFilter<"WorkSimilarity"> | string
    sourceWork?: XOR<WorkScalarRelationFilter, WorkWhereInput>
    targetWork?: XOR<WorkScalarRelationFilter, WorkWhereInput>
  }, "id" | "unique_work_similarity">

  export type WorkSimilarityOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
    similarityType?: SortOrder
    _count?: WorkSimilarityCountOrderByAggregateInput
    _avg?: WorkSimilarityAvgOrderByAggregateInput
    _max?: WorkSimilarityMaxOrderByAggregateInput
    _min?: WorkSimilarityMinOrderByAggregateInput
    _sum?: WorkSimilaritySumOrderByAggregateInput
  }

  export type WorkSimilarityScalarWhereWithAggregatesInput = {
    AND?: WorkSimilarityScalarWhereWithAggregatesInput | WorkSimilarityScalarWhereWithAggregatesInput[]
    OR?: WorkSimilarityScalarWhereWithAggregatesInput[]
    NOT?: WorkSimilarityScalarWhereWithAggregatesInput | WorkSimilarityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WorkSimilarity"> | number
    createdAt?: DateTimeWithAggregatesFilter<"WorkSimilarity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkSimilarity"> | Date | string
    sourceWorkId?: IntWithAggregatesFilter<"WorkSimilarity"> | number
    targetWorkId?: IntWithAggregatesFilter<"WorkSimilarity"> | number
    similarity?: FloatWithAggregatesFilter<"WorkSimilarity"> | number
    similarityType?: StringWithAggregatesFilter<"WorkSimilarity"> | string
  }

  export type AuthorCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    name: string
    personalName?: string | null
    birthDate?: string | null
    deathDate?: string | null
    bio?: string | null
    alternateNames?: string | null
    location?: string | null
    easternOrder?: boolean | null
    wikipedia?: string | null
    links?: string | null
    works?: AuthorWorkCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    name: string
    personalName?: string | null
    birthDate?: string | null
    deathDate?: string | null
    bio?: string | null
    alternateNames?: string | null
    location?: string | null
    easternOrder?: boolean | null
    wikipedia?: string | null
    links?: string | null
    works?: AuthorWorkUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    personalName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    deathDate?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    alternateNames?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    easternOrder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    wikipedia?: NullableStringFieldUpdateOperationsInput | string | null
    links?: NullableStringFieldUpdateOperationsInput | string | null
    works?: AuthorWorkUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    personalName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    deathDate?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    alternateNames?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    easternOrder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    wikipedia?: NullableStringFieldUpdateOperationsInput | string | null
    links?: NullableStringFieldUpdateOperationsInput | string | null
    works?: AuthorWorkUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    name: string
    personalName?: string | null
    birthDate?: string | null
    deathDate?: string | null
    bio?: string | null
    alternateNames?: string | null
    location?: string | null
    easternOrder?: boolean | null
    wikipedia?: string | null
    links?: string | null
  }

  export type AuthorUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    personalName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    deathDate?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    alternateNames?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    easternOrder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    wikipedia?: NullableStringFieldUpdateOperationsInput | string | null
    links?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    personalName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    deathDate?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    alternateNames?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    easternOrder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    wikipedia?: NullableStringFieldUpdateOperationsInput | string | null
    links?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkUncheckedCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionUncheckedCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUncheckedUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUncheckedUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
  }

  export type WorkUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorWorkCreateInput = {
    role?: string | null
    author: AuthorCreateNestedOneWithoutWorksInput
    work: WorkCreateNestedOneWithoutAuthorsInput
  }

  export type AuthorWorkUncheckedCreateInput = {
    id?: number
    authorId: number
    workId: number
    role?: string | null
  }

  export type AuthorWorkUpdateInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    author?: AuthorUpdateOneRequiredWithoutWorksNestedInput
    work?: WorkUpdateOneRequiredWithoutAuthorsNestedInput
  }

  export type AuthorWorkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorWorkCreateManyInput = {
    id?: number
    authorId: number
    workId: number
    role?: string | null
  }

  export type AuthorWorkUpdateManyMutationInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorWorkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    interactions?: UserInteractionCreateNestedManyWithoutUserInput
    profile?: UserProfileCreateNestedOneWithoutUserInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    interactions?: UserInteractionUncheckedCreateNestedManyWithoutUserInput
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    interactions?: UserInteractionUpdateManyWithoutUserNestedInput
    profile?: UserProfileUpdateOneWithoutUserNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    interactions?: UserInteractionUncheckedUpdateManyWithoutUserNestedInput
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserProfileCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectPreferences?: string | null
    placePreferences?: string | null
    timePreferences?: string | null
    peoplePreferences?: string | null
    languagePreferences?: string | null
    preferredPublishEra?: string | null
    dislikedSubjects?: string | null
    dislikedPlaces?: string | null
    dislikedAuthors?: string | null
    totalLikes?: number
    totalDislikes?: number
    lastInteractionAt?: Date | string | null
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type UserProfileUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    subjectPreferences?: string | null
    placePreferences?: string | null
    timePreferences?: string | null
    peoplePreferences?: string | null
    languagePreferences?: string | null
    preferredPublishEra?: string | null
    dislikedSubjects?: string | null
    dislikedPlaces?: string | null
    dislikedAuthors?: string | null
    totalLikes?: number
    totalDislikes?: number
    lastInteractionAt?: Date | string | null
  }

  export type UserProfileUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    placePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    peoplePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    languagePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredPublishEra?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedSubjects?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedAuthors?: NullableStringFieldUpdateOperationsInput | string | null
    totalLikes?: IntFieldUpdateOperationsInput | number
    totalDislikes?: IntFieldUpdateOperationsInput | number
    lastInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    subjectPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    placePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    peoplePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    languagePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredPublishEra?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedSubjects?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedAuthors?: NullableStringFieldUpdateOperationsInput | string | null
    totalLikes?: IntFieldUpdateOperationsInput | number
    totalDislikes?: IntFieldUpdateOperationsInput | number
    lastInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProfileCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    subjectPreferences?: string | null
    placePreferences?: string | null
    timePreferences?: string | null
    peoplePreferences?: string | null
    languagePreferences?: string | null
    preferredPublishEra?: string | null
    dislikedSubjects?: string | null
    dislikedPlaces?: string | null
    dislikedAuthors?: string | null
    totalLikes?: number
    totalDislikes?: number
    lastInteractionAt?: Date | string | null
  }

  export type UserProfileUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    placePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    peoplePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    languagePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredPublishEra?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedSubjects?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedAuthors?: NullableStringFieldUpdateOperationsInput | string | null
    totalLikes?: IntFieldUpdateOperationsInput | number
    totalDislikes?: IntFieldUpdateOperationsInput | number
    lastInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    subjectPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    placePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    peoplePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    languagePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredPublishEra?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedSubjects?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedAuthors?: NullableStringFieldUpdateOperationsInput | string | null
    totalLikes?: IntFieldUpdateOperationsInput | number
    totalDislikes?: IntFieldUpdateOperationsInput | number
    lastInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserInteractionCreateInput = {
    id?: string
    createdAt?: Date | string
    liked: boolean
    work: WorkCreateNestedOneWithoutUserInteractionsInput
    user: UserCreateNestedOneWithoutInteractionsInput
  }

  export type UserInteractionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    workId: number
    userId: number
    liked: boolean
  }

  export type UserInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liked?: BoolFieldUpdateOperationsInput | boolean
    work?: WorkUpdateOneRequiredWithoutUserInteractionsNestedInput
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type UserInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserInteractionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    workId: number
    userId: number
    liked: boolean
  }

  export type UserInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecommendationScoreCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
    user: UserCreateNestedOneWithoutRecommendationScoresInput
    work: WorkCreateNestedOneWithoutRecommendationScoresInput
  }

  export type RecommendationScoreUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    workId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
  }

  export type RecommendationScoreUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutRecommendationScoresNestedInput
    work?: WorkUpdateOneRequiredWithoutRecommendationScoresNestedInput
  }

  export type RecommendationScoreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }

  export type RecommendationScoreCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    workId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
  }

  export type RecommendationScoreUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }

  export type RecommendationScoreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    similarity: number
    similarityType: string
    sourceWork: WorkCreateNestedOneWithoutSourceWorkSimilaritiesInput
    targetWork: WorkCreateNestedOneWithoutTargetWorkSimilaritiesInput
  }

  export type WorkSimilarityUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceWorkId: number
    targetWorkId: number
    similarity: number
    similarityType: string
  }

  export type WorkSimilarityUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
    sourceWork?: WorkUpdateOneRequiredWithoutSourceWorkSimilaritiesNestedInput
    targetWork?: WorkUpdateOneRequiredWithoutTargetWorkSimilaritiesNestedInput
  }

  export type WorkSimilarityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceWorkId?: IntFieldUpdateOperationsInput | number
    targetWorkId?: IntFieldUpdateOperationsInput | number
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceWorkId: number
    targetWorkId: number
    similarity: number
    similarityType: string
  }

  export type WorkSimilarityUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceWorkId?: IntFieldUpdateOperationsInput | number
    targetWorkId?: IntFieldUpdateOperationsInput | number
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type AuthorWorkListRelationFilter = {
    every?: AuthorWorkWhereInput
    some?: AuthorWorkWhereInput
    none?: AuthorWorkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthorWorkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthorCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrder
    name?: SortOrder
    personalName?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    bio?: SortOrder
    alternateNames?: SortOrder
    location?: SortOrder
    easternOrder?: SortOrder
    wikipedia?: SortOrder
    links?: SortOrder
  }

  export type AuthorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuthorMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrder
    name?: SortOrder
    personalName?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    bio?: SortOrder
    alternateNames?: SortOrder
    location?: SortOrder
    easternOrder?: SortOrder
    wikipedia?: SortOrder
    links?: SortOrder
  }

  export type AuthorMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrder
    name?: SortOrder
    personalName?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    bio?: SortOrder
    alternateNames?: SortOrder
    location?: SortOrder
    easternOrder?: SortOrder
    wikipedia?: SortOrder
    links?: SortOrder
  }

  export type AuthorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UserInteractionListRelationFilter = {
    every?: UserInteractionWhereInput
    some?: UserInteractionWhereInput
    none?: UserInteractionWhereInput
  }

  export type RecommendationScoreListRelationFilter = {
    every?: RecommendationScoreWhereInput
    some?: RecommendationScoreWhereInput
    none?: RecommendationScoreWhereInput
  }

  export type WorkSimilarityListRelationFilter = {
    every?: WorkSimilarityWhereInput
    some?: WorkSimilarityWhereInput
    none?: WorkSimilarityWhereInput
  }

  export type UserInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecommendationScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkSimilarityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    firstPublishDate?: SortOrder
    firstSentence?: SortOrder
    subjects?: SortOrder
    subjectPlaces?: SortOrder
    subjectTimes?: SortOrder
    subjectPeople?: SortOrder
    originalLanguages?: SortOrder
    otherTitles?: SortOrder
  }

  export type WorkAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WorkMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    firstPublishDate?: SortOrder
    firstSentence?: SortOrder
    subjects?: SortOrder
    subjectPlaces?: SortOrder
    subjectTimes?: SortOrder
    subjectPeople?: SortOrder
    originalLanguages?: SortOrder
    otherTitles?: SortOrder
  }

  export type WorkMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    openLibraryId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    description?: SortOrder
    firstPublishDate?: SortOrder
    firstSentence?: SortOrder
    subjects?: SortOrder
    subjectPlaces?: SortOrder
    subjectTimes?: SortOrder
    subjectPeople?: SortOrder
    originalLanguages?: SortOrder
    otherTitles?: SortOrder
  }

  export type WorkSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuthorScalarRelationFilter = {
    is?: AuthorWhereInput
    isNot?: AuthorWhereInput
  }

  export type WorkScalarRelationFilter = {
    is?: WorkWhereInput
    isNot?: WorkWhereInput
  }

  export type AuthorWorkAuthorIdWorkIdCompoundUniqueInput = {
    authorId: number
    workId: number
  }

  export type AuthorWorkCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
    role?: SortOrder
  }

  export type AuthorWorkAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
  }

  export type AuthorWorkMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
    role?: SortOrder
  }

  export type AuthorWorkMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
    role?: SortOrder
  }

  export type AuthorWorkSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    workId?: SortOrder
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[]
    notIn?: $Enums.UserStatus[]
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    status?: SortOrder
    emailVerified?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[]
    notIn?: $Enums.UserStatus[]
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectPreferences?: SortOrder
    placePreferences?: SortOrder
    timePreferences?: SortOrder
    peoplePreferences?: SortOrder
    languagePreferences?: SortOrder
    preferredPublishEra?: SortOrder
    dislikedSubjects?: SortOrder
    dislikedPlaces?: SortOrder
    dislikedAuthors?: SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
    lastInteractionAt?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectPreferences?: SortOrder
    placePreferences?: SortOrder
    timePreferences?: SortOrder
    peoplePreferences?: SortOrder
    languagePreferences?: SortOrder
    preferredPublishEra?: SortOrder
    dislikedSubjects?: SortOrder
    dislikedPlaces?: SortOrder
    dislikedAuthors?: SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
    lastInteractionAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    subjectPreferences?: SortOrder
    placePreferences?: SortOrder
    timePreferences?: SortOrder
    peoplePreferences?: SortOrder
    languagePreferences?: SortOrder
    preferredPublishEra?: SortOrder
    dislikedSubjects?: SortOrder
    dislikedPlaces?: SortOrder
    dislikedAuthors?: SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
    lastInteractionAt?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalLikes?: SortOrder
    totalDislikes?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    workId?: SortOrder
    userId?: SortOrder
    liked?: SortOrder
  }

  export type UserInteractionAvgOrderByAggregateInput = {
    workId?: SortOrder
    userId?: SortOrder
  }

  export type UserInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    workId?: SortOrder
    userId?: SortOrder
    liked?: SortOrder
  }

  export type UserInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    workId?: SortOrder
    userId?: SortOrder
    liked?: SortOrder
  }

  export type UserInteractionSumOrderByAggregateInput = {
    workId?: SortOrder
    userId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RecommendationScoreUnique_user_work_recommendationCompoundUniqueInput = {
    userId: number
    workId: number
  }

  export type RecommendationScoreCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
    reasons?: SortOrder
  }

  export type RecommendationScoreAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
  }

  export type RecommendationScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
    reasons?: SortOrder
  }

  export type RecommendationScoreMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
    reasons?: SortOrder
  }

  export type RecommendationScoreSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    workId?: SortOrder
    contentScore?: SortOrder
    collaborativeScore?: SortOrder
    noveltyBonus?: SortOrder
    negativeMultiplier?: SortOrder
    finalScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type WorkSimilarityUnique_work_similarityCompoundUniqueInput = {
    sourceWorkId: number
    targetWorkId: number
    similarityType: string
  }

  export type WorkSimilarityCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
    similarityType?: SortOrder
  }

  export type WorkSimilarityAvgOrderByAggregateInput = {
    id?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
  }

  export type WorkSimilarityMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
    similarityType?: SortOrder
  }

  export type WorkSimilarityMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
    similarityType?: SortOrder
  }

  export type WorkSimilaritySumOrderByAggregateInput = {
    id?: SortOrder
    sourceWorkId?: SortOrder
    targetWorkId?: SortOrder
    similarity?: SortOrder
  }

  export type AuthorWorkCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AuthorWorkCreateWithoutAuthorInput, AuthorWorkUncheckedCreateWithoutAuthorInput> | AuthorWorkCreateWithoutAuthorInput[] | AuthorWorkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutAuthorInput | AuthorWorkCreateOrConnectWithoutAuthorInput[]
    createMany?: AuthorWorkCreateManyAuthorInputEnvelope
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
  }

  export type AuthorWorkUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AuthorWorkCreateWithoutAuthorInput, AuthorWorkUncheckedCreateWithoutAuthorInput> | AuthorWorkCreateWithoutAuthorInput[] | AuthorWorkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutAuthorInput | AuthorWorkCreateOrConnectWithoutAuthorInput[]
    createMany?: AuthorWorkCreateManyAuthorInputEnvelope
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type AuthorWorkUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AuthorWorkCreateWithoutAuthorInput, AuthorWorkUncheckedCreateWithoutAuthorInput> | AuthorWorkCreateWithoutAuthorInput[] | AuthorWorkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutAuthorInput | AuthorWorkCreateOrConnectWithoutAuthorInput[]
    upsert?: AuthorWorkUpsertWithWhereUniqueWithoutAuthorInput | AuthorWorkUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AuthorWorkCreateManyAuthorInputEnvelope
    set?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    disconnect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    delete?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    update?: AuthorWorkUpdateWithWhereUniqueWithoutAuthorInput | AuthorWorkUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AuthorWorkUpdateManyWithWhereWithoutAuthorInput | AuthorWorkUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AuthorWorkScalarWhereInput | AuthorWorkScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AuthorWorkUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AuthorWorkCreateWithoutAuthorInput, AuthorWorkUncheckedCreateWithoutAuthorInput> | AuthorWorkCreateWithoutAuthorInput[] | AuthorWorkUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutAuthorInput | AuthorWorkCreateOrConnectWithoutAuthorInput[]
    upsert?: AuthorWorkUpsertWithWhereUniqueWithoutAuthorInput | AuthorWorkUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AuthorWorkCreateManyAuthorInputEnvelope
    set?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    disconnect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    delete?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    update?: AuthorWorkUpdateWithWhereUniqueWithoutAuthorInput | AuthorWorkUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AuthorWorkUpdateManyWithWhereWithoutAuthorInput | AuthorWorkUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AuthorWorkScalarWhereInput | AuthorWorkScalarWhereInput[]
  }

  export type AuthorWorkCreateNestedManyWithoutWorkInput = {
    create?: XOR<AuthorWorkCreateWithoutWorkInput, AuthorWorkUncheckedCreateWithoutWorkInput> | AuthorWorkCreateWithoutWorkInput[] | AuthorWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutWorkInput | AuthorWorkCreateOrConnectWithoutWorkInput[]
    createMany?: AuthorWorkCreateManyWorkInputEnvelope
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
  }

  export type UserInteractionCreateNestedManyWithoutWorkInput = {
    create?: XOR<UserInteractionCreateWithoutWorkInput, UserInteractionUncheckedCreateWithoutWorkInput> | UserInteractionCreateWithoutWorkInput[] | UserInteractionUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutWorkInput | UserInteractionCreateOrConnectWithoutWorkInput[]
    createMany?: UserInteractionCreateManyWorkInputEnvelope
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
  }

  export type RecommendationScoreCreateNestedManyWithoutWorkInput = {
    create?: XOR<RecommendationScoreCreateWithoutWorkInput, RecommendationScoreUncheckedCreateWithoutWorkInput> | RecommendationScoreCreateWithoutWorkInput[] | RecommendationScoreUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutWorkInput | RecommendationScoreCreateOrConnectWithoutWorkInput[]
    createMany?: RecommendationScoreCreateManyWorkInputEnvelope
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
  }

  export type WorkSimilarityCreateNestedManyWithoutSourceWorkInput = {
    create?: XOR<WorkSimilarityCreateWithoutSourceWorkInput, WorkSimilarityUncheckedCreateWithoutSourceWorkInput> | WorkSimilarityCreateWithoutSourceWorkInput[] | WorkSimilarityUncheckedCreateWithoutSourceWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutSourceWorkInput | WorkSimilarityCreateOrConnectWithoutSourceWorkInput[]
    createMany?: WorkSimilarityCreateManySourceWorkInputEnvelope
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
  }

  export type WorkSimilarityCreateNestedManyWithoutTargetWorkInput = {
    create?: XOR<WorkSimilarityCreateWithoutTargetWorkInput, WorkSimilarityUncheckedCreateWithoutTargetWorkInput> | WorkSimilarityCreateWithoutTargetWorkInput[] | WorkSimilarityUncheckedCreateWithoutTargetWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutTargetWorkInput | WorkSimilarityCreateOrConnectWithoutTargetWorkInput[]
    createMany?: WorkSimilarityCreateManyTargetWorkInputEnvelope
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
  }

  export type AuthorWorkUncheckedCreateNestedManyWithoutWorkInput = {
    create?: XOR<AuthorWorkCreateWithoutWorkInput, AuthorWorkUncheckedCreateWithoutWorkInput> | AuthorWorkCreateWithoutWorkInput[] | AuthorWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutWorkInput | AuthorWorkCreateOrConnectWithoutWorkInput[]
    createMany?: AuthorWorkCreateManyWorkInputEnvelope
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
  }

  export type UserInteractionUncheckedCreateNestedManyWithoutWorkInput = {
    create?: XOR<UserInteractionCreateWithoutWorkInput, UserInteractionUncheckedCreateWithoutWorkInput> | UserInteractionCreateWithoutWorkInput[] | UserInteractionUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutWorkInput | UserInteractionCreateOrConnectWithoutWorkInput[]
    createMany?: UserInteractionCreateManyWorkInputEnvelope
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
  }

  export type RecommendationScoreUncheckedCreateNestedManyWithoutWorkInput = {
    create?: XOR<RecommendationScoreCreateWithoutWorkInput, RecommendationScoreUncheckedCreateWithoutWorkInput> | RecommendationScoreCreateWithoutWorkInput[] | RecommendationScoreUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutWorkInput | RecommendationScoreCreateOrConnectWithoutWorkInput[]
    createMany?: RecommendationScoreCreateManyWorkInputEnvelope
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
  }

  export type WorkSimilarityUncheckedCreateNestedManyWithoutSourceWorkInput = {
    create?: XOR<WorkSimilarityCreateWithoutSourceWorkInput, WorkSimilarityUncheckedCreateWithoutSourceWorkInput> | WorkSimilarityCreateWithoutSourceWorkInput[] | WorkSimilarityUncheckedCreateWithoutSourceWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutSourceWorkInput | WorkSimilarityCreateOrConnectWithoutSourceWorkInput[]
    createMany?: WorkSimilarityCreateManySourceWorkInputEnvelope
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
  }

  export type WorkSimilarityUncheckedCreateNestedManyWithoutTargetWorkInput = {
    create?: XOR<WorkSimilarityCreateWithoutTargetWorkInput, WorkSimilarityUncheckedCreateWithoutTargetWorkInput> | WorkSimilarityCreateWithoutTargetWorkInput[] | WorkSimilarityUncheckedCreateWithoutTargetWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutTargetWorkInput | WorkSimilarityCreateOrConnectWithoutTargetWorkInput[]
    createMany?: WorkSimilarityCreateManyTargetWorkInputEnvelope
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
  }

  export type AuthorWorkUpdateManyWithoutWorkNestedInput = {
    create?: XOR<AuthorWorkCreateWithoutWorkInput, AuthorWorkUncheckedCreateWithoutWorkInput> | AuthorWorkCreateWithoutWorkInput[] | AuthorWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutWorkInput | AuthorWorkCreateOrConnectWithoutWorkInput[]
    upsert?: AuthorWorkUpsertWithWhereUniqueWithoutWorkInput | AuthorWorkUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: AuthorWorkCreateManyWorkInputEnvelope
    set?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    disconnect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    delete?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    update?: AuthorWorkUpdateWithWhereUniqueWithoutWorkInput | AuthorWorkUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: AuthorWorkUpdateManyWithWhereWithoutWorkInput | AuthorWorkUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: AuthorWorkScalarWhereInput | AuthorWorkScalarWhereInput[]
  }

  export type UserInteractionUpdateManyWithoutWorkNestedInput = {
    create?: XOR<UserInteractionCreateWithoutWorkInput, UserInteractionUncheckedCreateWithoutWorkInput> | UserInteractionCreateWithoutWorkInput[] | UserInteractionUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutWorkInput | UserInteractionCreateOrConnectWithoutWorkInput[]
    upsert?: UserInteractionUpsertWithWhereUniqueWithoutWorkInput | UserInteractionUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: UserInteractionCreateManyWorkInputEnvelope
    set?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    disconnect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    delete?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    update?: UserInteractionUpdateWithWhereUniqueWithoutWorkInput | UserInteractionUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: UserInteractionUpdateManyWithWhereWithoutWorkInput | UserInteractionUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: UserInteractionScalarWhereInput | UserInteractionScalarWhereInput[]
  }

  export type RecommendationScoreUpdateManyWithoutWorkNestedInput = {
    create?: XOR<RecommendationScoreCreateWithoutWorkInput, RecommendationScoreUncheckedCreateWithoutWorkInput> | RecommendationScoreCreateWithoutWorkInput[] | RecommendationScoreUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutWorkInput | RecommendationScoreCreateOrConnectWithoutWorkInput[]
    upsert?: RecommendationScoreUpsertWithWhereUniqueWithoutWorkInput | RecommendationScoreUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: RecommendationScoreCreateManyWorkInputEnvelope
    set?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    disconnect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    delete?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    update?: RecommendationScoreUpdateWithWhereUniqueWithoutWorkInput | RecommendationScoreUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: RecommendationScoreUpdateManyWithWhereWithoutWorkInput | RecommendationScoreUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: RecommendationScoreScalarWhereInput | RecommendationScoreScalarWhereInput[]
  }

  export type WorkSimilarityUpdateManyWithoutSourceWorkNestedInput = {
    create?: XOR<WorkSimilarityCreateWithoutSourceWorkInput, WorkSimilarityUncheckedCreateWithoutSourceWorkInput> | WorkSimilarityCreateWithoutSourceWorkInput[] | WorkSimilarityUncheckedCreateWithoutSourceWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutSourceWorkInput | WorkSimilarityCreateOrConnectWithoutSourceWorkInput[]
    upsert?: WorkSimilarityUpsertWithWhereUniqueWithoutSourceWorkInput | WorkSimilarityUpsertWithWhereUniqueWithoutSourceWorkInput[]
    createMany?: WorkSimilarityCreateManySourceWorkInputEnvelope
    set?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    disconnect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    delete?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    update?: WorkSimilarityUpdateWithWhereUniqueWithoutSourceWorkInput | WorkSimilarityUpdateWithWhereUniqueWithoutSourceWorkInput[]
    updateMany?: WorkSimilarityUpdateManyWithWhereWithoutSourceWorkInput | WorkSimilarityUpdateManyWithWhereWithoutSourceWorkInput[]
    deleteMany?: WorkSimilarityScalarWhereInput | WorkSimilarityScalarWhereInput[]
  }

  export type WorkSimilarityUpdateManyWithoutTargetWorkNestedInput = {
    create?: XOR<WorkSimilarityCreateWithoutTargetWorkInput, WorkSimilarityUncheckedCreateWithoutTargetWorkInput> | WorkSimilarityCreateWithoutTargetWorkInput[] | WorkSimilarityUncheckedCreateWithoutTargetWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutTargetWorkInput | WorkSimilarityCreateOrConnectWithoutTargetWorkInput[]
    upsert?: WorkSimilarityUpsertWithWhereUniqueWithoutTargetWorkInput | WorkSimilarityUpsertWithWhereUniqueWithoutTargetWorkInput[]
    createMany?: WorkSimilarityCreateManyTargetWorkInputEnvelope
    set?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    disconnect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    delete?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    update?: WorkSimilarityUpdateWithWhereUniqueWithoutTargetWorkInput | WorkSimilarityUpdateWithWhereUniqueWithoutTargetWorkInput[]
    updateMany?: WorkSimilarityUpdateManyWithWhereWithoutTargetWorkInput | WorkSimilarityUpdateManyWithWhereWithoutTargetWorkInput[]
    deleteMany?: WorkSimilarityScalarWhereInput | WorkSimilarityScalarWhereInput[]
  }

  export type AuthorWorkUncheckedUpdateManyWithoutWorkNestedInput = {
    create?: XOR<AuthorWorkCreateWithoutWorkInput, AuthorWorkUncheckedCreateWithoutWorkInput> | AuthorWorkCreateWithoutWorkInput[] | AuthorWorkUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: AuthorWorkCreateOrConnectWithoutWorkInput | AuthorWorkCreateOrConnectWithoutWorkInput[]
    upsert?: AuthorWorkUpsertWithWhereUniqueWithoutWorkInput | AuthorWorkUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: AuthorWorkCreateManyWorkInputEnvelope
    set?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    disconnect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    delete?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    connect?: AuthorWorkWhereUniqueInput | AuthorWorkWhereUniqueInput[]
    update?: AuthorWorkUpdateWithWhereUniqueWithoutWorkInput | AuthorWorkUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: AuthorWorkUpdateManyWithWhereWithoutWorkInput | AuthorWorkUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: AuthorWorkScalarWhereInput | AuthorWorkScalarWhereInput[]
  }

  export type UserInteractionUncheckedUpdateManyWithoutWorkNestedInput = {
    create?: XOR<UserInteractionCreateWithoutWorkInput, UserInteractionUncheckedCreateWithoutWorkInput> | UserInteractionCreateWithoutWorkInput[] | UserInteractionUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutWorkInput | UserInteractionCreateOrConnectWithoutWorkInput[]
    upsert?: UserInteractionUpsertWithWhereUniqueWithoutWorkInput | UserInteractionUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: UserInteractionCreateManyWorkInputEnvelope
    set?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    disconnect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    delete?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    update?: UserInteractionUpdateWithWhereUniqueWithoutWorkInput | UserInteractionUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: UserInteractionUpdateManyWithWhereWithoutWorkInput | UserInteractionUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: UserInteractionScalarWhereInput | UserInteractionScalarWhereInput[]
  }

  export type RecommendationScoreUncheckedUpdateManyWithoutWorkNestedInput = {
    create?: XOR<RecommendationScoreCreateWithoutWorkInput, RecommendationScoreUncheckedCreateWithoutWorkInput> | RecommendationScoreCreateWithoutWorkInput[] | RecommendationScoreUncheckedCreateWithoutWorkInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutWorkInput | RecommendationScoreCreateOrConnectWithoutWorkInput[]
    upsert?: RecommendationScoreUpsertWithWhereUniqueWithoutWorkInput | RecommendationScoreUpsertWithWhereUniqueWithoutWorkInput[]
    createMany?: RecommendationScoreCreateManyWorkInputEnvelope
    set?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    disconnect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    delete?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    update?: RecommendationScoreUpdateWithWhereUniqueWithoutWorkInput | RecommendationScoreUpdateWithWhereUniqueWithoutWorkInput[]
    updateMany?: RecommendationScoreUpdateManyWithWhereWithoutWorkInput | RecommendationScoreUpdateManyWithWhereWithoutWorkInput[]
    deleteMany?: RecommendationScoreScalarWhereInput | RecommendationScoreScalarWhereInput[]
  }

  export type WorkSimilarityUncheckedUpdateManyWithoutSourceWorkNestedInput = {
    create?: XOR<WorkSimilarityCreateWithoutSourceWorkInput, WorkSimilarityUncheckedCreateWithoutSourceWorkInput> | WorkSimilarityCreateWithoutSourceWorkInput[] | WorkSimilarityUncheckedCreateWithoutSourceWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutSourceWorkInput | WorkSimilarityCreateOrConnectWithoutSourceWorkInput[]
    upsert?: WorkSimilarityUpsertWithWhereUniqueWithoutSourceWorkInput | WorkSimilarityUpsertWithWhereUniqueWithoutSourceWorkInput[]
    createMany?: WorkSimilarityCreateManySourceWorkInputEnvelope
    set?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    disconnect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    delete?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    update?: WorkSimilarityUpdateWithWhereUniqueWithoutSourceWorkInput | WorkSimilarityUpdateWithWhereUniqueWithoutSourceWorkInput[]
    updateMany?: WorkSimilarityUpdateManyWithWhereWithoutSourceWorkInput | WorkSimilarityUpdateManyWithWhereWithoutSourceWorkInput[]
    deleteMany?: WorkSimilarityScalarWhereInput | WorkSimilarityScalarWhereInput[]
  }

  export type WorkSimilarityUncheckedUpdateManyWithoutTargetWorkNestedInput = {
    create?: XOR<WorkSimilarityCreateWithoutTargetWorkInput, WorkSimilarityUncheckedCreateWithoutTargetWorkInput> | WorkSimilarityCreateWithoutTargetWorkInput[] | WorkSimilarityUncheckedCreateWithoutTargetWorkInput[]
    connectOrCreate?: WorkSimilarityCreateOrConnectWithoutTargetWorkInput | WorkSimilarityCreateOrConnectWithoutTargetWorkInput[]
    upsert?: WorkSimilarityUpsertWithWhereUniqueWithoutTargetWorkInput | WorkSimilarityUpsertWithWhereUniqueWithoutTargetWorkInput[]
    createMany?: WorkSimilarityCreateManyTargetWorkInputEnvelope
    set?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    disconnect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    delete?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    connect?: WorkSimilarityWhereUniqueInput | WorkSimilarityWhereUniqueInput[]
    update?: WorkSimilarityUpdateWithWhereUniqueWithoutTargetWorkInput | WorkSimilarityUpdateWithWhereUniqueWithoutTargetWorkInput[]
    updateMany?: WorkSimilarityUpdateManyWithWhereWithoutTargetWorkInput | WorkSimilarityUpdateManyWithWhereWithoutTargetWorkInput[]
    deleteMany?: WorkSimilarityScalarWhereInput | WorkSimilarityScalarWhereInput[]
  }

  export type AuthorCreateNestedOneWithoutWorksInput = {
    create?: XOR<AuthorCreateWithoutWorksInput, AuthorUncheckedCreateWithoutWorksInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutWorksInput
    connect?: AuthorWhereUniqueInput
  }

  export type WorkCreateNestedOneWithoutAuthorsInput = {
    create?: XOR<WorkCreateWithoutAuthorsInput, WorkUncheckedCreateWithoutAuthorsInput>
    connectOrCreate?: WorkCreateOrConnectWithoutAuthorsInput
    connect?: WorkWhereUniqueInput
  }

  export type AuthorUpdateOneRequiredWithoutWorksNestedInput = {
    create?: XOR<AuthorCreateWithoutWorksInput, AuthorUncheckedCreateWithoutWorksInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutWorksInput
    upsert?: AuthorUpsertWithoutWorksInput
    connect?: AuthorWhereUniqueInput
    update?: XOR<XOR<AuthorUpdateToOneWithWhereWithoutWorksInput, AuthorUpdateWithoutWorksInput>, AuthorUncheckedUpdateWithoutWorksInput>
  }

  export type WorkUpdateOneRequiredWithoutAuthorsNestedInput = {
    create?: XOR<WorkCreateWithoutAuthorsInput, WorkUncheckedCreateWithoutAuthorsInput>
    connectOrCreate?: WorkCreateOrConnectWithoutAuthorsInput
    upsert?: WorkUpsertWithoutAuthorsInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutAuthorsInput, WorkUpdateWithoutAuthorsInput>, WorkUncheckedUpdateWithoutAuthorsInput>
  }

  export type UserInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInteractionCreateWithoutUserInput, UserInteractionUncheckedCreateWithoutUserInput> | UserInteractionCreateWithoutUserInput[] | UserInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutUserInput | UserInteractionCreateOrConnectWithoutUserInput[]
    createMany?: UserInteractionCreateManyUserInputEnvelope
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
  }

  export type UserProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type RecommendationScoreCreateNestedManyWithoutUserInput = {
    create?: XOR<RecommendationScoreCreateWithoutUserInput, RecommendationScoreUncheckedCreateWithoutUserInput> | RecommendationScoreCreateWithoutUserInput[] | RecommendationScoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutUserInput | RecommendationScoreCreateOrConnectWithoutUserInput[]
    createMany?: RecommendationScoreCreateManyUserInputEnvelope
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
  }

  export type UserInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInteractionCreateWithoutUserInput, UserInteractionUncheckedCreateWithoutUserInput> | UserInteractionCreateWithoutUserInput[] | UserInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutUserInput | UserInteractionCreateOrConnectWithoutUserInput[]
    createMany?: UserInteractionCreateManyUserInputEnvelope
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
  }

  export type UserProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type RecommendationScoreUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecommendationScoreCreateWithoutUserInput, RecommendationScoreUncheckedCreateWithoutUserInput> | RecommendationScoreCreateWithoutUserInput[] | RecommendationScoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutUserInput | RecommendationScoreCreateOrConnectWithoutUserInput[]
    createMany?: RecommendationScoreCreateManyUserInputEnvelope
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInteractionCreateWithoutUserInput, UserInteractionUncheckedCreateWithoutUserInput> | UserInteractionCreateWithoutUserInput[] | UserInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutUserInput | UserInteractionCreateOrConnectWithoutUserInput[]
    upsert?: UserInteractionUpsertWithWhereUniqueWithoutUserInput | UserInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInteractionCreateManyUserInputEnvelope
    set?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    disconnect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    delete?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    update?: UserInteractionUpdateWithWhereUniqueWithoutUserInput | UserInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInteractionUpdateManyWithWhereWithoutUserInput | UserInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInteractionScalarWhereInput | UserInteractionScalarWhereInput[]
  }

  export type UserProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type RecommendationScoreUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecommendationScoreCreateWithoutUserInput, RecommendationScoreUncheckedCreateWithoutUserInput> | RecommendationScoreCreateWithoutUserInput[] | RecommendationScoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutUserInput | RecommendationScoreCreateOrConnectWithoutUserInput[]
    upsert?: RecommendationScoreUpsertWithWhereUniqueWithoutUserInput | RecommendationScoreUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecommendationScoreCreateManyUserInputEnvelope
    set?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    disconnect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    delete?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    update?: RecommendationScoreUpdateWithWhereUniqueWithoutUserInput | RecommendationScoreUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecommendationScoreUpdateManyWithWhereWithoutUserInput | RecommendationScoreUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecommendationScoreScalarWhereInput | RecommendationScoreScalarWhereInput[]
  }

  export type UserInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInteractionCreateWithoutUserInput, UserInteractionUncheckedCreateWithoutUserInput> | UserInteractionCreateWithoutUserInput[] | UserInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInteractionCreateOrConnectWithoutUserInput | UserInteractionCreateOrConnectWithoutUserInput[]
    upsert?: UserInteractionUpsertWithWhereUniqueWithoutUserInput | UserInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInteractionCreateManyUserInputEnvelope
    set?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    disconnect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    delete?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    connect?: UserInteractionWhereUniqueInput | UserInteractionWhereUniqueInput[]
    update?: UserInteractionUpdateWithWhereUniqueWithoutUserInput | UserInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInteractionUpdateManyWithWhereWithoutUserInput | UserInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInteractionScalarWhereInput | UserInteractionScalarWhereInput[]
  }

  export type UserProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type RecommendationScoreUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecommendationScoreCreateWithoutUserInput, RecommendationScoreUncheckedCreateWithoutUserInput> | RecommendationScoreCreateWithoutUserInput[] | RecommendationScoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecommendationScoreCreateOrConnectWithoutUserInput | RecommendationScoreCreateOrConnectWithoutUserInput[]
    upsert?: RecommendationScoreUpsertWithWhereUniqueWithoutUserInput | RecommendationScoreUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecommendationScoreCreateManyUserInputEnvelope
    set?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    disconnect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    delete?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    connect?: RecommendationScoreWhereUniqueInput | RecommendationScoreWhereUniqueInput[]
    update?: RecommendationScoreUpdateWithWhereUniqueWithoutUserInput | RecommendationScoreUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecommendationScoreUpdateManyWithWhereWithoutUserInput | RecommendationScoreUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecommendationScoreScalarWhereInput | RecommendationScoreScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type WorkCreateNestedOneWithoutUserInteractionsInput = {
    create?: XOR<WorkCreateWithoutUserInteractionsInput, WorkUncheckedCreateWithoutUserInteractionsInput>
    connectOrCreate?: WorkCreateOrConnectWithoutUserInteractionsInput
    connect?: WorkWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkUpdateOneRequiredWithoutUserInteractionsNestedInput = {
    create?: XOR<WorkCreateWithoutUserInteractionsInput, WorkUncheckedCreateWithoutUserInteractionsInput>
    connectOrCreate?: WorkCreateOrConnectWithoutUserInteractionsInput
    upsert?: WorkUpsertWithoutUserInteractionsInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutUserInteractionsInput, WorkUpdateWithoutUserInteractionsInput>, WorkUncheckedUpdateWithoutUserInteractionsInput>
  }

  export type UserUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInteractionsInput
    upsert?: UserUpsertWithoutInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInteractionsInput, UserUpdateWithoutInteractionsInput>, UserUncheckedUpdateWithoutInteractionsInput>
  }

  export type UserCreateNestedOneWithoutRecommendationScoresInput = {
    create?: XOR<UserCreateWithoutRecommendationScoresInput, UserUncheckedCreateWithoutRecommendationScoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecommendationScoresInput
    connect?: UserWhereUniqueInput
  }

  export type WorkCreateNestedOneWithoutRecommendationScoresInput = {
    create?: XOR<WorkCreateWithoutRecommendationScoresInput, WorkUncheckedCreateWithoutRecommendationScoresInput>
    connectOrCreate?: WorkCreateOrConnectWithoutRecommendationScoresInput
    connect?: WorkWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRecommendationScoresNestedInput = {
    create?: XOR<UserCreateWithoutRecommendationScoresInput, UserUncheckedCreateWithoutRecommendationScoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecommendationScoresInput
    upsert?: UserUpsertWithoutRecommendationScoresInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecommendationScoresInput, UserUpdateWithoutRecommendationScoresInput>, UserUncheckedUpdateWithoutRecommendationScoresInput>
  }

  export type WorkUpdateOneRequiredWithoutRecommendationScoresNestedInput = {
    create?: XOR<WorkCreateWithoutRecommendationScoresInput, WorkUncheckedCreateWithoutRecommendationScoresInput>
    connectOrCreate?: WorkCreateOrConnectWithoutRecommendationScoresInput
    upsert?: WorkUpsertWithoutRecommendationScoresInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutRecommendationScoresInput, WorkUpdateWithoutRecommendationScoresInput>, WorkUncheckedUpdateWithoutRecommendationScoresInput>
  }

  export type WorkCreateNestedOneWithoutSourceWorkSimilaritiesInput = {
    create?: XOR<WorkCreateWithoutSourceWorkSimilaritiesInput, WorkUncheckedCreateWithoutSourceWorkSimilaritiesInput>
    connectOrCreate?: WorkCreateOrConnectWithoutSourceWorkSimilaritiesInput
    connect?: WorkWhereUniqueInput
  }

  export type WorkCreateNestedOneWithoutTargetWorkSimilaritiesInput = {
    create?: XOR<WorkCreateWithoutTargetWorkSimilaritiesInput, WorkUncheckedCreateWithoutTargetWorkSimilaritiesInput>
    connectOrCreate?: WorkCreateOrConnectWithoutTargetWorkSimilaritiesInput
    connect?: WorkWhereUniqueInput
  }

  export type WorkUpdateOneRequiredWithoutSourceWorkSimilaritiesNestedInput = {
    create?: XOR<WorkCreateWithoutSourceWorkSimilaritiesInput, WorkUncheckedCreateWithoutSourceWorkSimilaritiesInput>
    connectOrCreate?: WorkCreateOrConnectWithoutSourceWorkSimilaritiesInput
    upsert?: WorkUpsertWithoutSourceWorkSimilaritiesInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutSourceWorkSimilaritiesInput, WorkUpdateWithoutSourceWorkSimilaritiesInput>, WorkUncheckedUpdateWithoutSourceWorkSimilaritiesInput>
  }

  export type WorkUpdateOneRequiredWithoutTargetWorkSimilaritiesNestedInput = {
    create?: XOR<WorkCreateWithoutTargetWorkSimilaritiesInput, WorkUncheckedCreateWithoutTargetWorkSimilaritiesInput>
    connectOrCreate?: WorkCreateOrConnectWithoutTargetWorkSimilaritiesInput
    upsert?: WorkUpsertWithoutTargetWorkSimilaritiesInput
    connect?: WorkWhereUniqueInput
    update?: XOR<XOR<WorkUpdateToOneWithWhereWithoutTargetWorkSimilaritiesInput, WorkUpdateWithoutTargetWorkSimilaritiesInput>, WorkUncheckedUpdateWithoutTargetWorkSimilaritiesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[]
    notIn?: $Enums.UserStatus[]
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[]
    notIn?: $Enums.UserStatus[]
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AuthorWorkCreateWithoutAuthorInput = {
    role?: string | null
    work: WorkCreateNestedOneWithoutAuthorsInput
  }

  export type AuthorWorkUncheckedCreateWithoutAuthorInput = {
    id?: number
    workId: number
    role?: string | null
  }

  export type AuthorWorkCreateOrConnectWithoutAuthorInput = {
    where: AuthorWorkWhereUniqueInput
    create: XOR<AuthorWorkCreateWithoutAuthorInput, AuthorWorkUncheckedCreateWithoutAuthorInput>
  }

  export type AuthorWorkCreateManyAuthorInputEnvelope = {
    data: AuthorWorkCreateManyAuthorInput | AuthorWorkCreateManyAuthorInput[]
  }

  export type AuthorWorkUpsertWithWhereUniqueWithoutAuthorInput = {
    where: AuthorWorkWhereUniqueInput
    update: XOR<AuthorWorkUpdateWithoutAuthorInput, AuthorWorkUncheckedUpdateWithoutAuthorInput>
    create: XOR<AuthorWorkCreateWithoutAuthorInput, AuthorWorkUncheckedCreateWithoutAuthorInput>
  }

  export type AuthorWorkUpdateWithWhereUniqueWithoutAuthorInput = {
    where: AuthorWorkWhereUniqueInput
    data: XOR<AuthorWorkUpdateWithoutAuthorInput, AuthorWorkUncheckedUpdateWithoutAuthorInput>
  }

  export type AuthorWorkUpdateManyWithWhereWithoutAuthorInput = {
    where: AuthorWorkScalarWhereInput
    data: XOR<AuthorWorkUpdateManyMutationInput, AuthorWorkUncheckedUpdateManyWithoutAuthorInput>
  }

  export type AuthorWorkScalarWhereInput = {
    AND?: AuthorWorkScalarWhereInput | AuthorWorkScalarWhereInput[]
    OR?: AuthorWorkScalarWhereInput[]
    NOT?: AuthorWorkScalarWhereInput | AuthorWorkScalarWhereInput[]
    id?: IntFilter<"AuthorWork"> | number
    authorId?: IntFilter<"AuthorWork"> | number
    workId?: IntFilter<"AuthorWork"> | number
    role?: StringNullableFilter<"AuthorWork"> | string | null
  }

  export type AuthorWorkCreateWithoutWorkInput = {
    role?: string | null
    author: AuthorCreateNestedOneWithoutWorksInput
  }

  export type AuthorWorkUncheckedCreateWithoutWorkInput = {
    id?: number
    authorId: number
    role?: string | null
  }

  export type AuthorWorkCreateOrConnectWithoutWorkInput = {
    where: AuthorWorkWhereUniqueInput
    create: XOR<AuthorWorkCreateWithoutWorkInput, AuthorWorkUncheckedCreateWithoutWorkInput>
  }

  export type AuthorWorkCreateManyWorkInputEnvelope = {
    data: AuthorWorkCreateManyWorkInput | AuthorWorkCreateManyWorkInput[]
  }

  export type UserInteractionCreateWithoutWorkInput = {
    id?: string
    createdAt?: Date | string
    liked: boolean
    user: UserCreateNestedOneWithoutInteractionsInput
  }

  export type UserInteractionUncheckedCreateWithoutWorkInput = {
    id?: string
    createdAt?: Date | string
    userId: number
    liked: boolean
  }

  export type UserInteractionCreateOrConnectWithoutWorkInput = {
    where: UserInteractionWhereUniqueInput
    create: XOR<UserInteractionCreateWithoutWorkInput, UserInteractionUncheckedCreateWithoutWorkInput>
  }

  export type UserInteractionCreateManyWorkInputEnvelope = {
    data: UserInteractionCreateManyWorkInput | UserInteractionCreateManyWorkInput[]
  }

  export type RecommendationScoreCreateWithoutWorkInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
    user: UserCreateNestedOneWithoutRecommendationScoresInput
  }

  export type RecommendationScoreUncheckedCreateWithoutWorkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
  }

  export type RecommendationScoreCreateOrConnectWithoutWorkInput = {
    where: RecommendationScoreWhereUniqueInput
    create: XOR<RecommendationScoreCreateWithoutWorkInput, RecommendationScoreUncheckedCreateWithoutWorkInput>
  }

  export type RecommendationScoreCreateManyWorkInputEnvelope = {
    data: RecommendationScoreCreateManyWorkInput | RecommendationScoreCreateManyWorkInput[]
  }

  export type WorkSimilarityCreateWithoutSourceWorkInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    similarity: number
    similarityType: string
    targetWork: WorkCreateNestedOneWithoutTargetWorkSimilaritiesInput
  }

  export type WorkSimilarityUncheckedCreateWithoutSourceWorkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    targetWorkId: number
    similarity: number
    similarityType: string
  }

  export type WorkSimilarityCreateOrConnectWithoutSourceWorkInput = {
    where: WorkSimilarityWhereUniqueInput
    create: XOR<WorkSimilarityCreateWithoutSourceWorkInput, WorkSimilarityUncheckedCreateWithoutSourceWorkInput>
  }

  export type WorkSimilarityCreateManySourceWorkInputEnvelope = {
    data: WorkSimilarityCreateManySourceWorkInput | WorkSimilarityCreateManySourceWorkInput[]
  }

  export type WorkSimilarityCreateWithoutTargetWorkInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    similarity: number
    similarityType: string
    sourceWork: WorkCreateNestedOneWithoutSourceWorkSimilaritiesInput
  }

  export type WorkSimilarityUncheckedCreateWithoutTargetWorkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceWorkId: number
    similarity: number
    similarityType: string
  }

  export type WorkSimilarityCreateOrConnectWithoutTargetWorkInput = {
    where: WorkSimilarityWhereUniqueInput
    create: XOR<WorkSimilarityCreateWithoutTargetWorkInput, WorkSimilarityUncheckedCreateWithoutTargetWorkInput>
  }

  export type WorkSimilarityCreateManyTargetWorkInputEnvelope = {
    data: WorkSimilarityCreateManyTargetWorkInput | WorkSimilarityCreateManyTargetWorkInput[]
  }

  export type AuthorWorkUpsertWithWhereUniqueWithoutWorkInput = {
    where: AuthorWorkWhereUniqueInput
    update: XOR<AuthorWorkUpdateWithoutWorkInput, AuthorWorkUncheckedUpdateWithoutWorkInput>
    create: XOR<AuthorWorkCreateWithoutWorkInput, AuthorWorkUncheckedCreateWithoutWorkInput>
  }

  export type AuthorWorkUpdateWithWhereUniqueWithoutWorkInput = {
    where: AuthorWorkWhereUniqueInput
    data: XOR<AuthorWorkUpdateWithoutWorkInput, AuthorWorkUncheckedUpdateWithoutWorkInput>
  }

  export type AuthorWorkUpdateManyWithWhereWithoutWorkInput = {
    where: AuthorWorkScalarWhereInput
    data: XOR<AuthorWorkUpdateManyMutationInput, AuthorWorkUncheckedUpdateManyWithoutWorkInput>
  }

  export type UserInteractionUpsertWithWhereUniqueWithoutWorkInput = {
    where: UserInteractionWhereUniqueInput
    update: XOR<UserInteractionUpdateWithoutWorkInput, UserInteractionUncheckedUpdateWithoutWorkInput>
    create: XOR<UserInteractionCreateWithoutWorkInput, UserInteractionUncheckedCreateWithoutWorkInput>
  }

  export type UserInteractionUpdateWithWhereUniqueWithoutWorkInput = {
    where: UserInteractionWhereUniqueInput
    data: XOR<UserInteractionUpdateWithoutWorkInput, UserInteractionUncheckedUpdateWithoutWorkInput>
  }

  export type UserInteractionUpdateManyWithWhereWithoutWorkInput = {
    where: UserInteractionScalarWhereInput
    data: XOR<UserInteractionUpdateManyMutationInput, UserInteractionUncheckedUpdateManyWithoutWorkInput>
  }

  export type UserInteractionScalarWhereInput = {
    AND?: UserInteractionScalarWhereInput | UserInteractionScalarWhereInput[]
    OR?: UserInteractionScalarWhereInput[]
    NOT?: UserInteractionScalarWhereInput | UserInteractionScalarWhereInput[]
    id?: StringFilter<"UserInteraction"> | string
    createdAt?: DateTimeFilter<"UserInteraction"> | Date | string
    workId?: IntFilter<"UserInteraction"> | number
    userId?: IntFilter<"UserInteraction"> | number
    liked?: BoolFilter<"UserInteraction"> | boolean
  }

  export type RecommendationScoreUpsertWithWhereUniqueWithoutWorkInput = {
    where: RecommendationScoreWhereUniqueInput
    update: XOR<RecommendationScoreUpdateWithoutWorkInput, RecommendationScoreUncheckedUpdateWithoutWorkInput>
    create: XOR<RecommendationScoreCreateWithoutWorkInput, RecommendationScoreUncheckedCreateWithoutWorkInput>
  }

  export type RecommendationScoreUpdateWithWhereUniqueWithoutWorkInput = {
    where: RecommendationScoreWhereUniqueInput
    data: XOR<RecommendationScoreUpdateWithoutWorkInput, RecommendationScoreUncheckedUpdateWithoutWorkInput>
  }

  export type RecommendationScoreUpdateManyWithWhereWithoutWorkInput = {
    where: RecommendationScoreScalarWhereInput
    data: XOR<RecommendationScoreUpdateManyMutationInput, RecommendationScoreUncheckedUpdateManyWithoutWorkInput>
  }

  export type RecommendationScoreScalarWhereInput = {
    AND?: RecommendationScoreScalarWhereInput | RecommendationScoreScalarWhereInput[]
    OR?: RecommendationScoreScalarWhereInput[]
    NOT?: RecommendationScoreScalarWhereInput | RecommendationScoreScalarWhereInput[]
    id?: IntFilter<"RecommendationScore"> | number
    createdAt?: DateTimeFilter<"RecommendationScore"> | Date | string
    updatedAt?: DateTimeFilter<"RecommendationScore"> | Date | string
    userId?: IntFilter<"RecommendationScore"> | number
    workId?: IntFilter<"RecommendationScore"> | number
    contentScore?: FloatFilter<"RecommendationScore"> | number
    collaborativeScore?: FloatFilter<"RecommendationScore"> | number
    noveltyBonus?: FloatFilter<"RecommendationScore"> | number
    negativeMultiplier?: FloatFilter<"RecommendationScore"> | number
    finalScore?: FloatFilter<"RecommendationScore"> | number
    reasons?: StringFilter<"RecommendationScore"> | string
  }

  export type WorkSimilarityUpsertWithWhereUniqueWithoutSourceWorkInput = {
    where: WorkSimilarityWhereUniqueInput
    update: XOR<WorkSimilarityUpdateWithoutSourceWorkInput, WorkSimilarityUncheckedUpdateWithoutSourceWorkInput>
    create: XOR<WorkSimilarityCreateWithoutSourceWorkInput, WorkSimilarityUncheckedCreateWithoutSourceWorkInput>
  }

  export type WorkSimilarityUpdateWithWhereUniqueWithoutSourceWorkInput = {
    where: WorkSimilarityWhereUniqueInput
    data: XOR<WorkSimilarityUpdateWithoutSourceWorkInput, WorkSimilarityUncheckedUpdateWithoutSourceWorkInput>
  }

  export type WorkSimilarityUpdateManyWithWhereWithoutSourceWorkInput = {
    where: WorkSimilarityScalarWhereInput
    data: XOR<WorkSimilarityUpdateManyMutationInput, WorkSimilarityUncheckedUpdateManyWithoutSourceWorkInput>
  }

  export type WorkSimilarityScalarWhereInput = {
    AND?: WorkSimilarityScalarWhereInput | WorkSimilarityScalarWhereInput[]
    OR?: WorkSimilarityScalarWhereInput[]
    NOT?: WorkSimilarityScalarWhereInput | WorkSimilarityScalarWhereInput[]
    id?: IntFilter<"WorkSimilarity"> | number
    createdAt?: DateTimeFilter<"WorkSimilarity"> | Date | string
    updatedAt?: DateTimeFilter<"WorkSimilarity"> | Date | string
    sourceWorkId?: IntFilter<"WorkSimilarity"> | number
    targetWorkId?: IntFilter<"WorkSimilarity"> | number
    similarity?: FloatFilter<"WorkSimilarity"> | number
    similarityType?: StringFilter<"WorkSimilarity"> | string
  }

  export type WorkSimilarityUpsertWithWhereUniqueWithoutTargetWorkInput = {
    where: WorkSimilarityWhereUniqueInput
    update: XOR<WorkSimilarityUpdateWithoutTargetWorkInput, WorkSimilarityUncheckedUpdateWithoutTargetWorkInput>
    create: XOR<WorkSimilarityCreateWithoutTargetWorkInput, WorkSimilarityUncheckedCreateWithoutTargetWorkInput>
  }

  export type WorkSimilarityUpdateWithWhereUniqueWithoutTargetWorkInput = {
    where: WorkSimilarityWhereUniqueInput
    data: XOR<WorkSimilarityUpdateWithoutTargetWorkInput, WorkSimilarityUncheckedUpdateWithoutTargetWorkInput>
  }

  export type WorkSimilarityUpdateManyWithWhereWithoutTargetWorkInput = {
    where: WorkSimilarityScalarWhereInput
    data: XOR<WorkSimilarityUpdateManyMutationInput, WorkSimilarityUncheckedUpdateManyWithoutTargetWorkInput>
  }

  export type AuthorCreateWithoutWorksInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    name: string
    personalName?: string | null
    birthDate?: string | null
    deathDate?: string | null
    bio?: string | null
    alternateNames?: string | null
    location?: string | null
    easternOrder?: boolean | null
    wikipedia?: string | null
    links?: string | null
  }

  export type AuthorUncheckedCreateWithoutWorksInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    name: string
    personalName?: string | null
    birthDate?: string | null
    deathDate?: string | null
    bio?: string | null
    alternateNames?: string | null
    location?: string | null
    easternOrder?: boolean | null
    wikipedia?: string | null
    links?: string | null
  }

  export type AuthorCreateOrConnectWithoutWorksInput = {
    where: AuthorWhereUniqueInput
    create: XOR<AuthorCreateWithoutWorksInput, AuthorUncheckedCreateWithoutWorksInput>
  }

  export type WorkCreateWithoutAuthorsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    userInteractions?: UserInteractionCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkUncheckedCreateWithoutAuthorsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    userInteractions?: UserInteractionUncheckedCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkCreateOrConnectWithoutAuthorsInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutAuthorsInput, WorkUncheckedCreateWithoutAuthorsInput>
  }

  export type AuthorUpsertWithoutWorksInput = {
    update: XOR<AuthorUpdateWithoutWorksInput, AuthorUncheckedUpdateWithoutWorksInput>
    create: XOR<AuthorCreateWithoutWorksInput, AuthorUncheckedCreateWithoutWorksInput>
    where?: AuthorWhereInput
  }

  export type AuthorUpdateToOneWithWhereWithoutWorksInput = {
    where?: AuthorWhereInput
    data: XOR<AuthorUpdateWithoutWorksInput, AuthorUncheckedUpdateWithoutWorksInput>
  }

  export type AuthorUpdateWithoutWorksInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    personalName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    deathDate?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    alternateNames?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    easternOrder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    wikipedia?: NullableStringFieldUpdateOperationsInput | string | null
    links?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorUncheckedUpdateWithoutWorksInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    personalName?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableStringFieldUpdateOperationsInput | string | null
    deathDate?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    alternateNames?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    easternOrder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    wikipedia?: NullableStringFieldUpdateOperationsInput | string | null
    links?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkUpsertWithoutAuthorsInput = {
    update: XOR<WorkUpdateWithoutAuthorsInput, WorkUncheckedUpdateWithoutAuthorsInput>
    create: XOR<WorkCreateWithoutAuthorsInput, WorkUncheckedCreateWithoutAuthorsInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutAuthorsInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutAuthorsInput, WorkUncheckedUpdateWithoutAuthorsInput>
  }

  export type WorkUpdateWithoutAuthorsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    userInteractions?: UserInteractionUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutAuthorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    userInteractions?: UserInteractionUncheckedUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutTargetWorkNestedInput
  }

  export type UserInteractionCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    liked: boolean
    work: WorkCreateNestedOneWithoutUserInteractionsInput
  }

  export type UserInteractionUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    workId: number
    liked: boolean
  }

  export type UserInteractionCreateOrConnectWithoutUserInput = {
    where: UserInteractionWhereUniqueInput
    create: XOR<UserInteractionCreateWithoutUserInput, UserInteractionUncheckedCreateWithoutUserInput>
  }

  export type UserInteractionCreateManyUserInputEnvelope = {
    data: UserInteractionCreateManyUserInput | UserInteractionCreateManyUserInput[]
  }

  export type UserProfileCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectPreferences?: string | null
    placePreferences?: string | null
    timePreferences?: string | null
    peoplePreferences?: string | null
    languagePreferences?: string | null
    preferredPublishEra?: string | null
    dislikedSubjects?: string | null
    dislikedPlaces?: string | null
    dislikedAuthors?: string | null
    totalLikes?: number
    totalDislikes?: number
    lastInteractionAt?: Date | string | null
  }

  export type UserProfileUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectPreferences?: string | null
    placePreferences?: string | null
    timePreferences?: string | null
    peoplePreferences?: string | null
    languagePreferences?: string | null
    preferredPublishEra?: string | null
    dislikedSubjects?: string | null
    dislikedPlaces?: string | null
    dislikedAuthors?: string | null
    totalLikes?: number
    totalDislikes?: number
    lastInteractionAt?: Date | string | null
  }

  export type UserProfileCreateOrConnectWithoutUserInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
  }

  export type RecommendationScoreCreateWithoutUserInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
    work: WorkCreateNestedOneWithoutRecommendationScoresInput
  }

  export type RecommendationScoreUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
  }

  export type RecommendationScoreCreateOrConnectWithoutUserInput = {
    where: RecommendationScoreWhereUniqueInput
    create: XOR<RecommendationScoreCreateWithoutUserInput, RecommendationScoreUncheckedCreateWithoutUserInput>
  }

  export type RecommendationScoreCreateManyUserInputEnvelope = {
    data: RecommendationScoreCreateManyUserInput | RecommendationScoreCreateManyUserInput[]
  }

  export type UserInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserInteractionWhereUniqueInput
    update: XOR<UserInteractionUpdateWithoutUserInput, UserInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<UserInteractionCreateWithoutUserInput, UserInteractionUncheckedCreateWithoutUserInput>
  }

  export type UserInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserInteractionWhereUniqueInput
    data: XOR<UserInteractionUpdateWithoutUserInput, UserInteractionUncheckedUpdateWithoutUserInput>
  }

  export type UserInteractionUpdateManyWithWhereWithoutUserInput = {
    where: UserInteractionScalarWhereInput
    data: XOR<UserInteractionUpdateManyMutationInput, UserInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserProfileUpsertWithoutUserInput = {
    update: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    placePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    peoplePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    languagePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredPublishEra?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedSubjects?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedAuthors?: NullableStringFieldUpdateOperationsInput | string | null
    totalLikes?: IntFieldUpdateOperationsInput | number
    totalDislikes?: IntFieldUpdateOperationsInput | number
    lastInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    placePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    peoplePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    languagePreferences?: NullableStringFieldUpdateOperationsInput | string | null
    preferredPublishEra?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedSubjects?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    dislikedAuthors?: NullableStringFieldUpdateOperationsInput | string | null
    totalLikes?: IntFieldUpdateOperationsInput | number
    totalDislikes?: IntFieldUpdateOperationsInput | number
    lastInteractionAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RecommendationScoreUpsertWithWhereUniqueWithoutUserInput = {
    where: RecommendationScoreWhereUniqueInput
    update: XOR<RecommendationScoreUpdateWithoutUserInput, RecommendationScoreUncheckedUpdateWithoutUserInput>
    create: XOR<RecommendationScoreCreateWithoutUserInput, RecommendationScoreUncheckedCreateWithoutUserInput>
  }

  export type RecommendationScoreUpdateWithWhereUniqueWithoutUserInput = {
    where: RecommendationScoreWhereUniqueInput
    data: XOR<RecommendationScoreUpdateWithoutUserInput, RecommendationScoreUncheckedUpdateWithoutUserInput>
  }

  export type RecommendationScoreUpdateManyWithWhereWithoutUserInput = {
    where: RecommendationScoreScalarWhereInput
    data: XOR<RecommendationScoreUpdateManyMutationInput, RecommendationScoreUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutProfileInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    interactions?: UserInteractionCreateNestedManyWithoutUserInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    interactions?: UserInteractionUncheckedCreateNestedManyWithoutUserInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    interactions?: UserInteractionUpdateManyWithoutUserNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    interactions?: UserInteractionUncheckedUpdateManyWithoutUserNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkCreateWithoutUserInteractionsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkUncheckedCreateWithoutUserInteractionsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkUncheckedCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkCreateOrConnectWithoutUserInteractionsInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutUserInteractionsInput, WorkUncheckedCreateWithoutUserInteractionsInput>
  }

  export type UserCreateWithoutInteractionsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    profile?: UserProfileCreateNestedOneWithoutUserInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInteractionsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
  }

  export type WorkUpsertWithoutUserInteractionsInput = {
    update: XOR<WorkUpdateWithoutUserInteractionsInput, WorkUncheckedUpdateWithoutUserInteractionsInput>
    create: XOR<WorkCreateWithoutUserInteractionsInput, WorkUncheckedCreateWithoutUserInteractionsInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutUserInteractionsInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutUserInteractionsInput, WorkUncheckedUpdateWithoutUserInteractionsInput>
  }

  export type WorkUpdateWithoutUserInteractionsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutUserInteractionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUncheckedUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutTargetWorkNestedInput
  }

  export type UserUpsertWithoutInteractionsInput = {
    update: XOR<UserUpdateWithoutInteractionsInput, UserUncheckedUpdateWithoutInteractionsInput>
    create: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInteractionsInput, UserUncheckedUpdateWithoutInteractionsInput>
  }

  export type UserUpdateWithoutInteractionsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    profile?: UserProfileUpdateOneWithoutUserNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInteractionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRecommendationScoresInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    interactions?: UserInteractionCreateNestedManyWithoutUserInput
    profile?: UserProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecommendationScoresInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    email: string
    password: string
    status?: $Enums.UserStatus
    emailVerified?: boolean
    interactions?: UserInteractionUncheckedCreateNestedManyWithoutUserInput
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecommendationScoresInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecommendationScoresInput, UserUncheckedCreateWithoutRecommendationScoresInput>
  }

  export type WorkCreateWithoutRecommendationScoresInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkUncheckedCreateWithoutRecommendationScoresInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkUncheckedCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionUncheckedCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutSourceWorkInput
    targetWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkCreateOrConnectWithoutRecommendationScoresInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutRecommendationScoresInput, WorkUncheckedCreateWithoutRecommendationScoresInput>
  }

  export type UserUpsertWithoutRecommendationScoresInput = {
    update: XOR<UserUpdateWithoutRecommendationScoresInput, UserUncheckedUpdateWithoutRecommendationScoresInput>
    create: XOR<UserCreateWithoutRecommendationScoresInput, UserUncheckedCreateWithoutRecommendationScoresInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecommendationScoresInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecommendationScoresInput, UserUncheckedUpdateWithoutRecommendationScoresInput>
  }

  export type UserUpdateWithoutRecommendationScoresInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    interactions?: UserInteractionUpdateManyWithoutUserNestedInput
    profile?: UserProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecommendationScoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    interactions?: UserInteractionUncheckedUpdateManyWithoutUserNestedInput
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type WorkUpsertWithoutRecommendationScoresInput = {
    update: XOR<WorkUpdateWithoutRecommendationScoresInput, WorkUncheckedUpdateWithoutRecommendationScoresInput>
    create: XOR<WorkCreateWithoutRecommendationScoresInput, WorkUncheckedCreateWithoutRecommendationScoresInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutRecommendationScoresInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutRecommendationScoresInput, WorkUncheckedUpdateWithoutRecommendationScoresInput>
  }

  export type WorkUpdateWithoutRecommendationScoresInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutRecommendationScoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUncheckedUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUncheckedUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutSourceWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkCreateWithoutSourceWorkSimilaritiesInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutWorkInput
    targetWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkUncheckedCreateWithoutSourceWorkSimilaritiesInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkUncheckedCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionUncheckedCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutWorkInput
    targetWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutTargetWorkInput
  }

  export type WorkCreateOrConnectWithoutSourceWorkSimilaritiesInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutSourceWorkSimilaritiesInput, WorkUncheckedCreateWithoutSourceWorkSimilaritiesInput>
  }

  export type WorkCreateWithoutTargetWorkSimilaritiesInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityCreateNestedManyWithoutSourceWorkInput
  }

  export type WorkUncheckedCreateWithoutTargetWorkSimilaritiesInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    openLibraryId?: string | null
    title: string
    subtitle?: string | null
    description?: string | null
    firstPublishDate?: string | null
    firstSentence?: string | null
    subjects?: string | null
    subjectPlaces?: string | null
    subjectTimes?: string | null
    subjectPeople?: string | null
    originalLanguages?: string | null
    otherTitles?: string | null
    authors?: AuthorWorkUncheckedCreateNestedManyWithoutWorkInput
    userInteractions?: UserInteractionUncheckedCreateNestedManyWithoutWorkInput
    recommendationScores?: RecommendationScoreUncheckedCreateNestedManyWithoutWorkInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedCreateNestedManyWithoutSourceWorkInput
  }

  export type WorkCreateOrConnectWithoutTargetWorkSimilaritiesInput = {
    where: WorkWhereUniqueInput
    create: XOR<WorkCreateWithoutTargetWorkSimilaritiesInput, WorkUncheckedCreateWithoutTargetWorkSimilaritiesInput>
  }

  export type WorkUpsertWithoutSourceWorkSimilaritiesInput = {
    update: XOR<WorkUpdateWithoutSourceWorkSimilaritiesInput, WorkUncheckedUpdateWithoutSourceWorkSimilaritiesInput>
    create: XOR<WorkCreateWithoutSourceWorkSimilaritiesInput, WorkUncheckedCreateWithoutSourceWorkSimilaritiesInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutSourceWorkSimilaritiesInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutSourceWorkSimilaritiesInput, WorkUncheckedUpdateWithoutSourceWorkSimilaritiesInput>
  }

  export type WorkUpdateWithoutSourceWorkSimilaritiesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutSourceWorkSimilaritiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUncheckedUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUncheckedUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutWorkNestedInput
    targetWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutTargetWorkNestedInput
  }

  export type WorkUpsertWithoutTargetWorkSimilaritiesInput = {
    update: XOR<WorkUpdateWithoutTargetWorkSimilaritiesInput, WorkUncheckedUpdateWithoutTargetWorkSimilaritiesInput>
    create: XOR<WorkCreateWithoutTargetWorkSimilaritiesInput, WorkUncheckedCreateWithoutTargetWorkSimilaritiesInput>
    where?: WorkWhereInput
  }

  export type WorkUpdateToOneWithWhereWithoutTargetWorkSimilaritiesInput = {
    where?: WorkWhereInput
    data: XOR<WorkUpdateWithoutTargetWorkSimilaritiesInput, WorkUncheckedUpdateWithoutTargetWorkSimilaritiesInput>
  }

  export type WorkUpdateWithoutTargetWorkSimilaritiesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUpdateManyWithoutSourceWorkNestedInput
  }

  export type WorkUncheckedUpdateWithoutTargetWorkSimilaritiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    openLibraryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firstPublishDate?: NullableStringFieldUpdateOperationsInput | string | null
    firstSentence?: NullableStringFieldUpdateOperationsInput | string | null
    subjects?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPlaces?: NullableStringFieldUpdateOperationsInput | string | null
    subjectTimes?: NullableStringFieldUpdateOperationsInput | string | null
    subjectPeople?: NullableStringFieldUpdateOperationsInput | string | null
    originalLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    otherTitles?: NullableStringFieldUpdateOperationsInput | string | null
    authors?: AuthorWorkUncheckedUpdateManyWithoutWorkNestedInput
    userInteractions?: UserInteractionUncheckedUpdateManyWithoutWorkNestedInput
    recommendationScores?: RecommendationScoreUncheckedUpdateManyWithoutWorkNestedInput
    sourceWorkSimilarities?: WorkSimilarityUncheckedUpdateManyWithoutSourceWorkNestedInput
  }

  export type AuthorWorkCreateManyAuthorInput = {
    id?: number
    workId: number
    role?: string | null
  }

  export type AuthorWorkUpdateWithoutAuthorInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    work?: WorkUpdateOneRequiredWithoutAuthorsNestedInput
  }

  export type AuthorWorkUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorWorkUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    workId?: IntFieldUpdateOperationsInput | number
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorWorkCreateManyWorkInput = {
    id?: number
    authorId: number
    role?: string | null
  }

  export type UserInteractionCreateManyWorkInput = {
    id?: string
    createdAt?: Date | string
    userId: number
    liked: boolean
  }

  export type RecommendationScoreCreateManyWorkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
  }

  export type WorkSimilarityCreateManySourceWorkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    targetWorkId: number
    similarity: number
    similarityType: string
  }

  export type WorkSimilarityCreateManyTargetWorkInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sourceWorkId: number
    similarity: number
    similarityType: string
  }

  export type AuthorWorkUpdateWithoutWorkInput = {
    role?: NullableStringFieldUpdateOperationsInput | string | null
    author?: AuthorUpdateOneRequiredWithoutWorksNestedInput
  }

  export type AuthorWorkUncheckedUpdateWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorWorkUncheckedUpdateManyWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    role?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInteractionUpdateWithoutWorkInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liked?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type UserInteractionUncheckedUpdateWithoutWorkInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserInteractionUncheckedUpdateManyWithoutWorkInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecommendationScoreUpdateWithoutWorkInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutRecommendationScoresNestedInput
  }

  export type RecommendationScoreUncheckedUpdateWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }

  export type RecommendationScoreUncheckedUpdateManyWithoutWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityUpdateWithoutSourceWorkInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
    targetWork?: WorkUpdateOneRequiredWithoutTargetWorkSimilaritiesNestedInput
  }

  export type WorkSimilarityUncheckedUpdateWithoutSourceWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetWorkId?: IntFieldUpdateOperationsInput | number
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityUncheckedUpdateManyWithoutSourceWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targetWorkId?: IntFieldUpdateOperationsInput | number
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityUpdateWithoutTargetWorkInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
    sourceWork?: WorkUpdateOneRequiredWithoutSourceWorkSimilaritiesNestedInput
  }

  export type WorkSimilarityUncheckedUpdateWithoutTargetWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceWorkId?: IntFieldUpdateOperationsInput | number
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type WorkSimilarityUncheckedUpdateManyWithoutTargetWorkInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceWorkId?: IntFieldUpdateOperationsInput | number
    similarity?: FloatFieldUpdateOperationsInput | number
    similarityType?: StringFieldUpdateOperationsInput | string
  }

  export type UserInteractionCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    workId: number
    liked: boolean
  }

  export type RecommendationScoreCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workId: number
    contentScore: number
    collaborativeScore: number
    noveltyBonus: number
    negativeMultiplier: number
    finalScore: number
    reasons: string
  }

  export type UserInteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    liked?: BoolFieldUpdateOperationsInput | boolean
    work?: WorkUpdateOneRequiredWithoutUserInteractionsNestedInput
  }

  export type UserInteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workId?: IntFieldUpdateOperationsInput | number
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workId?: IntFieldUpdateOperationsInput | number
    liked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RecommendationScoreUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
    work?: WorkUpdateOneRequiredWithoutRecommendationScoresNestedInput
  }

  export type RecommendationScoreUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workId?: IntFieldUpdateOperationsInput | number
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }

  export type RecommendationScoreUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workId?: IntFieldUpdateOperationsInput | number
    contentScore?: FloatFieldUpdateOperationsInput | number
    collaborativeScore?: FloatFieldUpdateOperationsInput | number
    noveltyBonus?: FloatFieldUpdateOperationsInput | number
    negativeMultiplier?: FloatFieldUpdateOperationsInput | number
    finalScore?: FloatFieldUpdateOperationsInput | number
    reasons?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}