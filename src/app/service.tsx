import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const createUser = (user_id: string) => {
  const response = apiClient.post("/users", {
    user_id,
  });
  return response;
};

const createChannel = (
  channel_url: string,
  creator_user_id: string,
  chatmate_user_id: string,
) => {
  const response = apiClient.post("/channels", {
    channel_url,
    creator_user_id,
    chatmate_user_id,
  });
  return response;
};

const updateUser = (
  user_id: string,
  nickname?: string,
  profile_url?: string,
) => {
  const response = apiClient.patch("/users", {
    user_id,
    nickname,
    profile_url,
  });
  return response;
};

const Service = {
  createUser,
  createChannel,
  updateUser,
};

export default Service;
