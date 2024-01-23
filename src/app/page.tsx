"use client";

import "@sendbird/uikit-react/dist/index.css";
import { useEffect, useState } from "react";
import { ChannelList, SendBirdProvider } from "@sendbird/uikit-react";
import Channel from "@sendbird/uikit-react/Channel";
import CustomHeader from "@/components/CustomHeader";
import CreateChannel from "@sendbird/uikit-react/CreateChannel";
import uuidv4 from "./utils";
import service from "./service";

import type { User } from "@sendbird/chat";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

export default function Home() {
  const [channelUrl, setChannelUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleProfileEditSuccess = (user: User) => {
    service.updateUser(user.userId, user.nickname, user.profileUrl);
  };
  const handleChannelCreate = (channel: GroupChannel) => {
    if (channel.memberCount == 2) {
      const chatmate = channel.members.at(-1);
      service.createChannel(
        channel.url,
        userId,
        chatmate ? chatmate.userId : "",
      );
    }
    setShowModal(false);
  };

  useEffect(() => {
    const user_id = uuidv4();
    setUserId(user_id);
    service.createUser(user_id);
  }, []);
  return (
    <SendBirdProvider
      appId="8056AAA9-9594-4FE3-90AA-218173F46E42"
      userId={userId}
    >
      <div className="App flex">
        <ChannelList
          onChannelSelect={(channel) =>
            setChannelUrl(channel ? channel.url : "")
          }
          onProfileEditSuccess={handleProfileEditSuccess}
          renderHeader={() => (
            <CustomHeader onClickCreateChannel={() => setShowModal(true)} />
          )}
        />
        {showModal && (
          <CreateChannel
            onCreateChannel={handleChannelCreate}
            onCancel={() => setShowModal(false)}
          />
        )}
        <Channel channelUrl={channelUrl} />
      </div>
    </SendBirdProvider>
  );
}
