import { createStore } from 'vuex';

import type { CommonState } from './common/commonStore';
import { commonStore } from './common/commonStore';
import type { SettingsState } from './settings';
import type { PhaseState } from './phase';
import type { SnakeState } from './snake';
import type { FeedState } from './feed';
import { settings } from './settings';
import { snake } from './snake';
import { phase } from './phase';
import { feed } from './feed';

export interface Store {
    snake: SnakeState;
    feed: FeedState;
    commonStore: CommonState;
    phase: PhaseState;
    settings: SettingsState;
}

export const store = createStore<Store>({ modules: { snake, feed, commonStore, phase, settings } });
