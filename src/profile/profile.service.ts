import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ProfileRO } from './profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(
    userId: null | string,
    username: string,
  ): Promise<ProfileRO> {
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
    const following = await this.checkFollow(userId, username);
    return { profile: { ...profile, following } };
  }

  async follow(userId: string, username: string): Promise<ProfileRO> {
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

  async unFollow(userId: string, username: string): Promise<ProfileRO> {
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

  async checkFollow(userId: string, username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        followings: true,
      },
    });
    const isFollowing: boolean =
      !!user &&
      user.followings.filter((u) => u.username === username).length > 0;
    return isFollowing;
  }
}
