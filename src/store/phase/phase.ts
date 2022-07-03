import type { Module } from 'vuex';

export interface PhaseState {
    phase: 'end' | 'game' | 'start' | 'win';
}

export const phase: Module<PhaseState, any> = {
    namespaced: true,
    state: () => ({
        phase: 'start'
    }),
    mutations: {
        setPhase: (state, payload) => { state.phase = payload; }
    },
    getters: {
        isWin: state => state.phase === 'win'
    },
    actions: {
        setStart: ctx => ctx.commit('setPhase', 'start'),
        setEnd: ctx => ctx.commit('setPhase', 'end'),
        setGame: ctx => ctx.commit('setPhase', 'game'),
        setWin: ctx => ctx.commit('setPhase', 'win')
    }
};
