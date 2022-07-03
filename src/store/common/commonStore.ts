import type { Module } from 'vuex';

import { COORDS_MAP } from '@/misc/constants';
import { getRandom } from '@/misc/utils';
import type { SnakeState } from '@/store/snake';

export interface CommonState {}

interface GetCoordinateProps {
    coordinateType: keyof typeof COORDS_MAP;
    lineSize: number;
    snakeLocation: SnakeState['location'];
}

const getCoordinate = ({ coordinateType, lineSize, snakeLocation }: GetCoordinateProps) => {
    let result = 0;

    do {
        result = getRandom(0, lineSize - 1);
    } while(snakeLocation.some((snakeCoords) => snakeCoords[COORDS_MAP[coordinateType]] === result));

    return result;
}

export const commonStore: Module<CommonState, any> = {
    namespaced: true,
    actions: {
        rerenderFeed: ctx => {
            const { lineSize, location: snakeLocation } = ctx.rootState.snake;

            ctx.commit(
                'feed/setLocation',
                [[
                    getCoordinate({ snakeLocation, coordinateType: 'x', lineSize }),
                    getCoordinate({ snakeLocation, coordinateType: 'y', lineSize })
                ]],
                { root: true }
            );
        },
    }
};
