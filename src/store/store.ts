import { createStore } from 'vuex';

import type { CommonState } from '@/store/common/commonStore';
import { commonStore } from '@/store/common/commonStore';
import type { FeedState } from '@/store/feed';
import type { SnakeState } from './snake';
import { feed } from '@/store/feed';
import { snake } from './snake';

export interface Store {
    snake: SnakeState;
    feed: FeedState;
    commonStore: CommonState;
}

export const store = createStore<Store>({ modules: { snake, feed, commonStore } });
