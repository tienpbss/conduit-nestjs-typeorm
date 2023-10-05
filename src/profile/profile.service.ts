import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(userId: null | string, username: string) {
    const currentUser = userId
      ? await this.userRepository.findOne({
          where: { id: userId },
          relations: {
            followings: true,
          },
        })
      : null;
    const profile = await this.userRepository.findOne({
      where: {
        username,
      },
      select: {
        username: true,
        bio: true,
        image: true,
      },
    });
    const following = !!(
      currentUser &&
      currentUser.followings.filter((u) => u.username === profile.username)
        .length > 0
    );
    return { profile: { ...profile, following } };
  }

  async follow(userId: string, username: string) {
    const currentUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        followings: true,
      },
    });
    const profile = await this.userRepository.findOne({
      where: {
        username,
      },
      // select: {
      //   username: true,
      //   bio: true,
      //   image: true,
      // },
    });
    currentUser.followings.push(profile);
    await this.userRepository.save(currentUser);
    return {
      profile: {
        username: profile.username,
        bio: profile.bio,
        image: profile.image,
        following: true,
      },
    };
  }

  async unFollow(userId: string, username: string) {
    const currentUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        followings: true,
      },
    });
    const profile = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    currentUser.followings = currentUser.followings.filter(
      (f) => f.username != username,
    );
    await this.userRepository.save(currentUser);
    return {
      profile: {
        username: profile.username,
        bio: profile.bio,
        image: profile.image,
        following: false,
      },
    };
  }
}
