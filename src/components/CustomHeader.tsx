import { useState } from "react";
import Icon, { IconTypes, IconColors } from "@sendbird/uikit-react/ui/Icon";
import IconButton from "@sendbird/uikit-react/ui/IconButton";
import ChannelListHeader from "@sendbird/uikit-react/ChannelList/components/ChannelListHeader";

import EditUserProfile from "@sendbird/uikit-react/EditUserProfile";
import { useChannelListContext } from "@sendbird/uikit-react/ChannelList/context";

const CreateChannelIcon = (props: any) => {
  return (
    <div>
      <IconButton
        height="32px"
        width="32px"
        onClick={props?.onClickCreateChannel}
      >
        <Icon
          type={IconTypes.CREATE}
          fillColor={IconColors.PRIMARY}
          height="24px"
          width="24px"
        />
      </IconButton>
    </div>
  );
};

export default ({
  onClickCreateChannel,
}: {
  onClickCreateChannel: () => void;
}) => {
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const state = useChannelListContext();
  return (
    <div>
      <ChannelListHeader
        renderIconButton={() => (
          <CreateChannelIcon onClickCreateChannel={onClickCreateChannel} />
        )}
        onEdit={() => setShowProfileEdit(true)}
      />
      {showProfileEdit && (
        <EditUserProfile
          onCancel={() => setShowProfileEdit(false)}
          onEditProfile={(user) => {
            setShowProfileEdit(false);
            state.onProfileEditSuccess
              ? state.onProfileEditSuccess(user)
              : null;
          }}
        />
      )}
    </div>
  );
};
