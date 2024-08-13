import { Palette } from 'node-vibrant/lib/color';
import Vibrant from 'node-vibrant';

const OPACITY = 0.6;

export const getImageColor = async (imageURL: string) => {
  let gradientStyle = '';

  const palette: Palette = await Vibrant.from(imageURL).getPalette();

  if (palette && palette.Vibrant && palette.Muted) {
    const startColor = palette.LightVibrant ? palette.Muted.getRgb() : palette.Vibrant.getRgb();
    const endColor = palette.DarkVibrant ? palette.DarkVibrant.getRgb() : palette.Muted.getRgb();

    gradientStyle = `linear-gradient(to bottom, rgba(${startColor.join(', ')}, ${OPACITY}), rgba(${endColor.join(', ')}, ${OPACITY}))`;
  }

  return gradientStyle;
};
