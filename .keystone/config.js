"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");

// lists/BookConfigList.ts
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var BookConfigList = {
  fields: {
    title: (0, import_fields.text)({ validation: { isRequired: true } }),
    description: (0, import_fields.text)({ validation: { isRequired: true } }),
    edition: (0, import_fields.integer)({ validation: { isRequired: true }, defaultValue: 1 }),
    author: (0, import_fields.relationship)({ ref: "Author.books", many: false }),
    gender: (0, import_fields.relationship)({ ref: "Gender.books", many: false }),
    quantity: (0, import_fields.integer)({ defaultValue: 0 }),
    price: (0, import_fields.integer)({ defaultValue: 0 }),
    image: (0, import_fields.relationship)({ ref: "Image", many: true }),
    compras: (0, import_fields.relationship)({ ref: "Buy.libro", many: true }),
    publisher: (0, import_fields.relationship)({ ref: "Publisher.books", many: false }),
    reservations: (0, import_fields.relationship)({ ref: "Reservation.book", many: true })
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
    }),
    compras: (0, import_fields2.relationship)({ ref: "Buy.cliente", many: true }),
    reservations: (0, import_fields2.relationship)({ ref: "Reservation.user", many: true })
  },
  access: import_access2.allowAll
};

// lists/ReservationConfigList.ts
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var ReservationConfigList = {
  fields: {
    book: (0, import_fields3.relationship)({ ref: "Book.reservations" }),
    user: (0, import_fields3.relationship)({ ref: "User.reservations" }),
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
    reservationDate: (0, import_fields3.timestamp)({ defaultValue: { kind: "now" } }),
    sucursal: (0, import_fields3.relationship)({ ref: "Sucursal", many: false }),
    cantidad: (0, import_fields3.integer)({
      defaultValue: 1,
      validation: { isRequired: true, min: 1 }
    })
  },
  access: import_access3.allowAll
};

// lists/BuyConfigList.ts
var import_fields4 = require("@keystone-6/core/fields");
var import_access4 = require("@keystone-6/core/access");
var BuyConfigList = {
  fields: {
    cliente: (0, import_fields4.relationship)({
      ref: "User.compras",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineCreate: { fields: ["name", "email"] },
        inlineEdit: { fields: ["name", "email"] }
      }
    }),
    libro: (0, import_fields4.relationship)({
      ref: "Book.compras",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["title", "author"],
        inlineCreate: { fields: ["title", "author"] },
        inlineEdit: { fields: ["title", "author"] }
      }
    }),
    fechaCompra: (0, import_fields4.timestamp)({
      defaultValue: { kind: "now" },
      validation: { isRequired: true }
    }),
    cantidad: (0, import_fields4.integer)({
      defaultValue: 1,
      validation: { isRequired: true, min: 1 }
    }),
    estadoEnvio: (0, import_fields4.select)({
      options: [
        { label: "Pendiente", value: "PENDIENTE" },
        { label: "En Proceso", value: "EN_PROCESO" },
        { label: "Enviado", value: "ENVIADO" },
        { label: "Entregado", value: "ENTREGADO" }
      ],
      defaultValue: "PENDIENTE",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    direccionEnvio: (0, import_fields4.text)({
      validation: { isRequired: true }
    }),
    codigoPostal: (0, import_fields4.text)({
      validation: { isRequired: true }
    }),
    ciudad: (0, import_fields4.text)({
      validation: { isRequired: true }
    }),
    telefono: (0, import_fields4.text)({
      validation: { isRequired: true }
    })
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

// lists/GenderConfigList.ts
var import_fields7 = require("@keystone-6/core/fields");
var import_access7 = require("@keystone-6/core/access");
var GenderConfigList = {
  fields: {
    name: (0, import_fields7.text)(),
    books: (0, import_fields7.relationship)({ ref: "Book.gender", many: true }),
    image: (0, import_fields7.relationship)({ ref: "Image", many: true })
  },
  access: import_access7.allowAll
};

// lists/PublisherConfigList.ts
var import_fields8 = require("@keystone-6/core/fields");
var import_access8 = require("@keystone-6/core/access");
var PublisherConfigList = {
  fields: {
    name: (0, import_fields8.text)({ validation: { isRequired: true } }),
    address: (0, import_fields8.text)(),
    contact: (0, import_fields8.text)(),
    books: (0, import_fields8.relationship)({ ref: "Book.publisher", many: true })
  },
  access: import_access8.allowAll
};

// lists/SucursalConfigList.ts
var import_fields9 = require("@keystone-6/core/fields");
var import_access9 = require("@keystone-6/core/access");
var SucursalConfigList = {
  fields: {
    name: (0, import_fields9.text)({ validation: { isRequired: true } }),
    address: (0, import_fields9.text)({ validation: { isRequired: true } }),
    city: (0, import_fields9.text)({ validation: { isRequired: true } }),
    postal: (0, import_fields9.text)({ validation: { isRequired: true } })
  },
  access: import_access9.allowAll
};

// schema.ts
var lists = {
  Book: (0, import_core.list)(BookConfigList),
  User: (0, import_core.list)(UserConfigList),
  Author: (0, import_core.list)(AuthorConfigList),
  Buy: (0, import_core.list)(BuyConfigList),
  Gender: (0, import_core.list)(GenderConfigList),
  Publisher: (0, import_core.list)(PublisherConfigList),
  Reservation: (0, import_core.list)(ReservationConfigList),
  Review: (0, import_core.list)(ReviewConfigList),
  Sucursal: (0, import_core.list)(SucursalConfigList)
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
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_PUBLIC_URL || "DATABASE_URL_TO_REPLACE"
    },
    lists,
    session,
    server: {
      cors: { origin: "*", credentials: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] },
      port: 3e3,
      maxFileSize: 200 * 1024 * 1024
    },
    storage: {
      my_s3_files: {
        kind: "s3",
        type: "file",
        bucketName: process.env.S3_BUCKET_NAME || "libralite",
        region: process.env.S3_REGION || "us-east-2",
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "S3_ACCESS_KEY_ID",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "S3_SECRET_ACCESS_KEY",
        signed: { expiry: 5e3 }
      }
    }
  })
);
//# sourceMappingURL=config.js.map
