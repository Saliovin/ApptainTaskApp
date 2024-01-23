import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createUser = async ({ user_id }: { user_id: string }) => {
  return await prisma.users.create({
    data: {
      user_id: user_id,
    },
  });
};

const createChannel = async ({
  channel_url,
  creator_user_id,
  chatmate_user_id,
}: {
  channel_url: string;
  creator_user_id: string;
  chatmate_user_id: string;
}) => {
  return await prisma.channels.create({
    data: {
      channel_url,
      creator_user_id,
      chatmate_user_id,
    },
  });
};

const updateUser = async ({
  user_id,
  nickname,
  profile_url,
}: {
  user_id: string;
  nickname?: string;
  profile_url?: string;
}) => {
  return await prisma.users.update({
    where: {
      user_id,
    },
    data: {
      nickname,
      profile_url,
    },
  });
};

export default { createUser, createChannel, updateUser };
