import Vibrant from 'node-vibrant';
import { Palette } from 'node-vibrant/lib/color';

export const getImageColor = async (imageURL: string) => {
  let gradientStyle = '';

  const palette: Palette = await Vibrant.from(imageURL).getPalette();

  if (palette && palette.Vibrant && palette.Muted) {
    const startColor = palette.LightVibrant ? palette.Muted.getRgb() : palette.Vibrant.getRgb();
    const endColor = palette.DarkVibrant ? palette.DarkVibrant.getRgb() : palette.Muted.getRgb();

    gradientStyle = `linear-gradient(to bottom, rgb(${startColor.join(', ')}), rgb(${endColor.join(', ')}))`;
  }

  return gradientStyle;
};
