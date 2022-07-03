import type { Module } from 'vuex';

import { LINE_SIZE, FIELD_SIZE } from '@/store/common';

export interface SettingsState {
    fieldSize: number;
    totalSquares: number;
    lineSize: number;
    squareSize: number;
    snakeSpeed: number;
}

const recalculateSizes = (fieldSize: string | number, lineSize: string | number) => ({
    fieldSize: Math.round(+fieldSize),
    totalSquares: Math.round(+lineSize) ** 2,
    lineSize: +lineSize,
    squareSize: Math.round(+fieldSize) / +lineSize,
});

export const settings: Module<SettingsState, any> = {
    namespaced: true,
    state: () => ({
        ...recalculateSizes(FIELD_SIZE, LINE_SIZE),
        snakeSpeed: 1000
    }),
    mutations: {
        setSizes: (state, payload) => { Object.assign(state, payload); },
        setSpeed: (state, payload) => { state.snakeSpeed = payload; },
    },
    actions: {
        changeLineSize: (ctx, payload) => ctx.commit('setSizes', recalculateSizes(ctx.state.totalSquares, payload)),
        changeFieldSize: (ctx, payload) => ctx.commit('setSizes', recalculateSizes(payload, ctx.state.lineSize)),
        changeSpeed: (ctx, payload) => ctx.commit('setSpeed', +Math.round(payload))
    }
};
