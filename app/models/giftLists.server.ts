import type { User, GiftList } from "@prisma/client";

import { prisma } from "~/db.server";

export type { GiftList } from "@prisma/client";

export function getGiftList({
  id,
  userId,
}: Pick<GiftList, "id"> & {
  userId: User["id"];
}) {
  return prisma.giftList.findFirst({
    select: { id: true, name: true, gifts: { include: {gift: true}} },
    where: { id, userId },
  });
}

export function getGiftListItems({ userId }: { userId: User["id"] }) {
  return prisma.giftList.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createGiftList({
  name,
  userId,
}: Pick<GiftList, "name"> & {
  userId: User["id"];
}) {
  return prisma.giftList.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteGiftList({
  id,
  userId,
}: Pick<GiftList, "id"> & { userId: User["id"] }) {
  return prisma.giftList.deleteMany({
    where: { id, userId },
  });
}
