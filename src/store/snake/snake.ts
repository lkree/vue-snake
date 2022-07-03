import type { Module } from 'vuex';

import { COORDS_MAP } from '@/misc/constants';

type Directions = 'left' | 'right' | 'up' | 'down';

export interface SnakeState {
    location: [number, number][];
    direction: Directions;
    prevDirection: Directions;
    wasDirectionChanged: boolean;
}

const calcNewLocation = (payload: SnakeState['location'], lineSize: number) =>
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
        direction: 'up',
        prevDirection: 'up',
        wasDirectionChanged: false
    }),
    mutations: {
        setLocation: (state, payload) => { state.location = payload; },
        setDirection: (state, payload) => { state.direction = payload; },
        setPrevDirection: (state, payload) => { state.prevDirection = payload; },
        setWasDirectionChanged: (state, payload) => { state.wasDirectionChanged = payload }
    },
    actions: {
        setLocation: (ctx, payload: SnakeState['location']) => {
            ctx.commit('setLocation', calcNewLocation(payload, ctx.rootState.settings.lineSize));
        },
        setDirection: (ctx, payload) => {
            const wasDirectionChanged = payload !== ctx.state.direction;

            if (wasDirectionChanged) ctx.commit('setPrevDirection', ctx.state.direction);
            ctx.commit('setDirection', payload);
            ctx.commit('setWasDirectionChanged', wasDirectionChanged);
        }
    }
};
