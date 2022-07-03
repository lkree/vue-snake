import { COORDS_MAP } from '@/misc/constants';

export const getSquareCss = (
    { locations, squareSize }: { locations: [number, number][], squareSize: number }, styles: {} = {}
) => locations.map(location => ({
    position: 'absolute',
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    background: 'red',
    left: `${squareSize * location[COORDS_MAP.x]}px`,
    top: `${squareSize * location[COORDS_MAP.y]}px`,
    ...styles
}));
