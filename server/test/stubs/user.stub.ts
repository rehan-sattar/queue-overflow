import { User } from 'src/api/users/users.entity';

export const createUserStub = (): User => {
  return {
    email: 'user@gmail.com',
    password: '243232aeD#@$@#@#@$!#@$',
    id: 1,
    username: 'rehansattar',
    bio: 'Some bio',
    githubHandle: 'rehan-sattar',
    website: 'http://rehansattar.dev',
    profilePhoto: 'http://somephoto.com',
    location: 'some Location',
    twitterHandle: 'Rehan_Sattar@26',
    createdAt: new Date('2022-06-14T07:47:52.050Z'),
    updatedAt: new Date('2022-06-14T07:47:52.050Z'),
  };
};
