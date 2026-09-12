import {Composition} from 'remotion';
import {AppMotion} from './AppMotion';

export const RemotionRoot = () => (
  <Composition
    id="IgorAppMotion"
    component={AppMotion}
    durationInFrames={540}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{}}
  />
);
