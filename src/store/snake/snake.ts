import type { Module } from 'vuex';

import { FIELD_SIZE, TOTAL_SQUARES } from '@/store/common';
import { COORDS_MAP } from '@/misc/constants';

export interface SnakeState {
    location: [number, number][];
    totalSquares: number;
    lineSize: number;
    fieldSize: number;
    squareSize: number;
    direction: 'left' | 'right' | 'up' | 'down';
}

const calcNewLocation = (payload: SnakeState['location'], lineSize: SnakeState['lineSize']) =>
    payload.reduce((r, [x, y], i) => {
        if (x === lineSize) r[i][COORDS_MAP['x']] = 0;
        if (x < 0) r[i][COORDS_MAP['x']] = lineSize - 1;

        if (y >= lineSize) r[i][COORDS_MAP['y']] = 0;
        if (y < 0) r[i][COORDS_MAP['y']] = lineSize - 1;

        return r;
    }, payload);

export const snake: Module<SnakeState, any> = {
    namespaced: true,
    state: () => ({
        location: [[0, 0]],
        totalSquares: TOTAL_SQUARES,
        lineSize: Math.sqrt(TOTAL_SQUARES),
        fieldSize: FIELD_SIZE,
        squareSize: FIELD_SIZE / Math.sqrt(TOTAL_SQUARES),
        direction: 'up'
    }),
    mutations: {
        setLocation: (state, payload) => { state.location = payload; },
        setDirection: (state, payload) => { state.direction = payload; }
    },
    actions: {
        setLocation: (ctx, payload: SnakeState['location']) => {
            ctx.commit('setLocation', calcNewLocation(payload, ctx.state.lineSize));
        },
        setDirection: (ctx, payload) => ctx.commit('setDirection', payload)
    }
};
