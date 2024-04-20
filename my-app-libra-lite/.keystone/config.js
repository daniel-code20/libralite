"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");

// lists/BookConfigList.ts
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var BookConfigList = {
  fields: {
    title: (0, import_fields.text)({ validation: { isRequired: true } }),
    edition: (0, import_fields.integer)({ validation: { isRequired: true }, defaultValue: 1 }),
    author: (0, import_fields.relationship)({ ref: "Author.books", many: false }),
    quantity: (0, import_fields.integer)({ defaultValue: 0 }),
    price: (0, import_fields.integer)({ defaultValue: 0 }),
    image: (0, import_fields.image)({ storage: "my_local_images" })
  },
  access: import_access.allowAll
};

// lists/UserConfigList.ts
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var UserConfigList = {
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    email: (0, import_fields2.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields2.password)({ validation: { isRequired: true } }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    }),
    role: (0, import_fields2.select)({
      options: [
        { label: "Cliente", value: "CLIENT" },
        { label: "Administrador", value: "ADMIN" }
      ],
      defaultValue: "CLIENT",
      ui: {
        displayMode: "segmented-control"
      }
    })
  },
  access: import_access2.allowAll
};

// lists/ReservationConfigList.ts
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var ReservationConfigList = {
  fields: {
    book: (0, import_fields3.relationship)({ ref: "Book" }),
    user: (0, import_fields3.relationship)({ ref: "User" }),
    status: (0, import_fields3.select)({
      options: [
        { label: "Pendiente", value: "PENDING" },
        { label: "Confirmada", value: "CONFIRMED" },
        { label: "Cancelada", value: "CANCELLED" }
      ],
      defaultValue: "PENDING",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    reservationDate: (0, import_fields3.timestamp)({ defaultValue: { kind: "now" } })
  },
  access: import_access3.allowAll
};

// lists/BuyConfigList.ts
var import_fields4 = require("@keystone-6/core/fields");
var import_access4 = require("@keystone-6/core/access");
var BuyConfigList = {
  fields: {
    book: (0, import_fields4.relationship)({ ref: "Book" }),
    user: (0, import_fields4.relationship)({ ref: "User" }),
    quantity: (0, import_fields4.integer)(),
    price: (0, import_fields4.integer)(),
    purchaseDate: (0, import_fields4.timestamp)({ defaultValue: { kind: "now" } })
  },
  access: import_access4.allowAll
};

// lists/ReviewConfigList.ts
var import_fields5 = require("@keystone-6/core/fields");
var import_access5 = require("@keystone-6/core/access");
var ReviewConfigList = {
  fields: {
    book: (0, import_fields5.relationship)({ ref: "Book" }),
    user: (0, import_fields5.relationship)({ ref: "User" }),
    rating: (0, import_fields5.integer)({ defaultValue: 0 }),
    comment: (0, import_fields5.text)()
  },
  access: import_access5.allowAll
};

// lists/AuthorConfigList.ts
var import_fields6 = require("@keystone-6/core/fields");
var import_access6 = require("@keystone-6/core/access");
var AuthorConfigList = {
  fields: {
    name: (0, import_fields6.text)(),
    biography: (0, import_fields6.text)(),
    books: (0, import_fields6.relationship)({ ref: "Book.author", many: true })
  },
  access: import_access6.allowAll
};

// lists/CategoryConfigList.ts
var import_fields7 = require("@keystone-6/core/fields");
var import_access7 = require("@keystone-6/core/access");
var CategoryConfigList = {
  fields: {
    name: (0, import_fields7.text)(),
    description: (0, import_fields7.text)()
  },
  access: import_access7.allowAll
};

// lists/PublisherConfigList.ts
var import_fields8 = require("@keystone-6/core/fields");
var import_access8 = require("@keystone-6/core/access");
var PublisherConfigList = {
  fields: {
    name: (0, import_fields8.text)(),
    address: (0, import_fields8.text)(),
    contact: (0, import_fields8.text)()
  },
  access: import_access8.allowAll
};

// schema.ts
var lists = {
  Book: (0, import_core.list)(BookConfigList),
  User: (0, import_core.list)(UserConfigList),
  Author: (0, import_core.list)(AuthorConfigList),
  Buy: (0, import_core.list)(BuyConfigList),
  Category: (0, import_core.list)(CategoryConfigList),
  Publisher: (0, import_core.list)(PublisherConfigList),
  Reservation: (0, import_core.list)(ReservationConfigList),
  Review: (0, import_core.list)(ReviewConfigList)
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var {
  // The S3 Bucket Name used to store assets
  S3_BUCKET_NAME: bucketName = "keystone-test",
  // The region of the S3 bucket
  S3_REGION: region = "ap-southeast-2",
  // The Access Key ID and Secret that has read/write access to the S3 bucket
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  // The base URL to serve assets from
  ASSET_BASE_URL: baseUrl = "http://localhost:3000"
} = process.env;
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    server: {
      cors: { origin: ["http://localhost:5173"], credentials: true },
      port: 3e3
    },
    storage: {
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: "local",
        // This store is used for the image field type
        type: "image",
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) => `${baseUrl}/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: "/images"
        },
        // Set serverRoute to null if you don't want a route to be created in Keystone
        // serverRoute: null
        storagePath: "public/images"
      }
    }
  })
);
//# sourceMappingURL=config.js.map
