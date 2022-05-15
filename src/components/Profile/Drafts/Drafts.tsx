import React, { FC, memo, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { IPost } from '../../../models/IPost';
import Card from '../../UI/NewsCard/Card';
import ProfileService from '../../../api/ProfileService';
import { EModal } from '../../../models/EModal';

interface ProfileDraftsProps {
  token: string;
  handleOpenModal: (id: string, type: EModal, optional: any) => () => void;
}

const ProfileDrafts: FC<ProfileDraftsProps> = ({ token, handleOpenModal }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const initialRequest = async () => {
    const response = await ProfileService.getDrafts(token);
    if (response.data) {
      setPosts(response.data);
    }
  };

  useEffect(() => {
    initialRequest();
  }, []);
  return (
    <Stack direction='column' alignItems='center' spacing={5}>
      {posts?.map((post: IPost, index) => (
        <Card
          key={`${index}_${post.id}`}
          handleOpenModal={handleOpenModal}
          post={post}
        />
      ))}
    </Stack>
  );
};

export default memo(ProfileDrafts);
