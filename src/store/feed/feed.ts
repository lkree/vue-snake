import type { Module } from 'vuex';

export interface FeedState {
    location: [number, number][];
}

export const feed: Module<FeedState, any> = {
    namespaced: true,
    state: () => ({
        location: [[0, 0]]
    }),
    mutations: {
        setLocation: (state, payload) => { state.location = payload; },
    },
    actions: {
        setLocation: (ctx, payload) => { ctx.commit('setLocation', payload); }
    }
};
