import type { Module } from 'vuex';

import type { SettingsState } from '@/store/settings';
import type { SnakeState } from '@/store/snake';
import { COORDS_MAP } from '@/misc/constants';
import type { FeedState } from '@/store/feed';
import { getRandom } from '@/misc/utils';

export interface CommonState {}

interface GetCoordinateProps {
    lineSize: number;
    snakeLocation: SnakeState['location'];
}

const getCoordinates = ({ lineSize, snakeLocation }: GetCoordinateProps) => {
    let x = 0;
    let y = 0;

    do {
        x = getRandom(0, lineSize - 1);
        y = getRandom(0, lineSize - 1);
    } while(snakeLocation.some((snakeCoords) => snakeCoords[COORDS_MAP['x']] === x && snakeCoords[COORDS_MAP['y']] === y));

    return [x, y];
};

const isIntersects = (location: [number, number], locations: SnakeState['location']) => locations.some(
    ([x, y]) => location[COORDS_MAP['x']] === x && location[COORDS_MAP['y']] === y
);

const isSnakeIntersectsItself = (coords: SnakeState['location']) => Object.values(coords.reduce(
    (r, c) => { r[c.toString()] = (r[c.toString()] ?? 0) + 1; return r; },
    {} as Record<string, number>
)).some(v => v >= 2);

export const commonStore: Module<CommonState, any> = {
    namespaced: true,
    actions: {
        rerenderFeed: ctx => {
            const { location: snakeLocation } = ctx.rootState.snake;
            const { lineSize } = ctx.rootState.settings;

            ctx.commit(
                'feed/setLocation',
                [getCoordinates({ snakeLocation, lineSize })],
                { root: true }
            );
        },
        moveSnake: (ctx) => {
            const { totalSquares } = ctx.rootState.settings as SettingsState;
            const {
                direction: snakeDirection,
                prevDirection: snakePrevDirection,
                wasDirectionChanged
            } = ctx.rootState.snake as SnakeState;
            const { location: feedLocation } = ctx.rootState.feed as FeedState;
            let { location: snakeLocation, } = ctx.rootState.snake as SnakeState;
            let addX = 0;
            let addY = 0;

            if (wasDirectionChanged && snakeDirection !== snakePrevDirection) {
                if (
                    snakeDirection === 'up' && snakePrevDirection === 'down' ||
                    snakeDirection === 'down' && snakePrevDirection === 'up' ||
                    snakeDirection === 'left' && snakePrevDirection === 'right' ||
                    snakeDirection === 'right' && snakePrevDirection === 'left'
                ) {
                    snakeLocation = snakeLocation.reverse();
                    ctx.commit('snake/setWasDirectionChanged', false, { root: true });
                }
            }


            switch (snakeDirection) {
                case 'up': addY = -1; break;
                case 'down': addY = 1; break;
                case 'right': addX = 1; break;
                case 'left': addX = -1; break;
            }

            let newCoords: [number, number][];

            if (snakeLocation.length === 1) newCoords = [[snakeLocation[0][0] + addX, snakeLocation[0][1] + addY]];
            else newCoords = [[snakeLocation[0][0] + addX, snakeLocation[0][1] + addY], ...snakeLocation.slice(0, -1)];

            const wasIntersect = isIntersects(feedLocation[0], newCoords);

            if (wasIntersect) newCoords.push(snakeLocation[snakeLocation.length - 1]);

            if (newCoords.length === totalSquares) return ctx.dispatch('phase/setWin', {}, { root: true });
            if (isSnakeIntersectsItself(newCoords)) return ctx.dispatch('phase/setEnd', {}, { root: true });

            ctx.dispatch('snake/setLocation', newCoords, { root: true });
            if (wasIntersect) ctx.dispatch('rerenderFeed');
        }
    }
};
