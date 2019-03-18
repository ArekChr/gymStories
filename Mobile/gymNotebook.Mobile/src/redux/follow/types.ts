import { Profile, ProfileBasic } from "../profile/types";

export enum FollowActionTypes {
    FETCH_FOLLOWERS_REQ = '@follow/FETCH_FOLLOWERS_REQ',
    FETCH_FOLLOWERS_SUC = '@follow/FETCH_FOLLOWERS_REQ',
    FETCH_FOLLOWING_REQ = '@follow/FETCH_FOLLOWING_REQ',
    FETCH_FOLLOWING_SUC = '@follow/FETCH_FOLLOWING_SUC',
    FOLLOW_REQ = '@follow/FOLLOW_REQ',
    FOLLOW_SUC = '@follow/FOLLOW_SUC',
    UNFOLLOW_REQ = '@follow/UNFOLLOW_REQ',
    UNFOLLOW_SUC = '@follow/UNFOLLOW_SUC',
    FETCH_MYFOLLOWERS_REQ = "@follow/FETCH_MYFOLLOWERS_REQ",
    FETCH_MYFOLLOWERS_SUC = "@follow/FETCH_MYFOLLOWERS_SUC",
    FETCH_MYFOLLOWING_REQ = "@follow/FETCH_MYFOLLOWING_REQ",
    FETCH_MYFOLLOWING_SUC = "@follow/FETCH_MYFOLLOWING_SUC",
    FETCH_FOLLOWS_REQ = "@follow/FETCH_FOLLOWS_REQ",
    FETCH_FOLLOWING_PROFILES_REQ = "@follow/FETCH_FOLLOWING_PROFILES_REQ",
    FETCH_FOLLOWING_PROFILES_SUC = "@follow/FETCH_FOLLOWING_PROFILES_SUC",
    FETCH_FOLLOWERS_PROFILES_SUC = "@follow/FETCH_FOLLOWERS_PROFILES_SUC",
    FETCH_FOLLOWERS_PROFILES_REQ = "@follow/FETCH_FOLLOWERS_PROFILES_REQ"
}

export interface Follow {
    [key: string]: boolean
}

export interface FollowState {
    loading: boolean
    userFollowers: Follow[]
    userFollowing: Follow[]
    myFollowingIds: Follow[]
    myFollowersIds: Follow[]
    myFollowingProfiles: ProfileBasic[]
    myFollowersProfiles: ProfileBasic[]
    loadingMyFollowing: boolean
    loadingMyFollowers: boolean
}
