import { list } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  BookConfigList,
  UserConfigList,
  AuthorConfigList,
  BuyConfigList,
  GenderConfigList,
  PublisherConfigList,
  ReservationConfigList,
  ReviewConfigList,
  SucursalConfigList,
} from "./lists/";

export const lists: Lists = {
  Book: list(BookConfigList),

  User: list(UserConfigList),

  Author: list(AuthorConfigList),

  Buy: list(BuyConfigList),

  Gender: list(GenderConfigList),

  Publisher: list(PublisherConfigList),

  Reservation: list(ReservationConfigList),

  Review: list(ReviewConfigList),

  Sucursal: list(SucursalConfigList),

};
