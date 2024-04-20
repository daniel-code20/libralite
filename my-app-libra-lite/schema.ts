import { list } from "@keystone-6/core";
import type { Lists } from ".keystone/types";
import {
  BookConfigList,
  UserConfigList,
  AuthorConfigList,
  BuyConfigList,
  CategoryConfigList,
  PublisherConfigList,
  ReservationConfigList,
  ReviewConfigList,
} from "./lists/";

export const lists: Lists = {
  Book: list(BookConfigList),

  User: list(UserConfigList),

  Author: list(AuthorConfigList),

  Buy: list(BuyConfigList),

  Category: list(CategoryConfigList),

  Publisher: list(PublisherConfigList),

  Reservation: list(ReservationConfigList),

  Review: list(ReviewConfigList),
};
