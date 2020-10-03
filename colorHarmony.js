function calculateColorHarmony(h, s, l) {
  // Calculating Complimentary hue
  const compH = rotateAngle(h, 180);

  // Calculating Split Complimentary hues
  const sp1H = rotateAngle(compH, 30);
  const sp2H = rotateAngle(compH, -30);

  // Calculating Analogous hues
  const an1H = rotateAngle(h, 30);
  const an2H = rotateAngle(h, -30);

  // Calculate Triadic hues
  const tr1H = rotateAngle(h, 120);
  const tr2H = rotateAngle(h, -120);

  // Calculate tetradic hues
  const te1H = rotateAngle(h, 90);
  const te2H = compH;
  const te3H = rotateAngle(h, -90);

  return {
    primary: [],
    complimentary: [RGBtoHex.apply(null, HSLtoRGB(compH, s, l))],
    splitComplimentary: [
      RGBtoHex.apply(null, HSLtoRGB(sp1H, s, l)),
      RGBtoHex.apply(null, HSLtoRGB(sp2H, s, l)),
    ],
    analogous: [
      RGBtoHex.apply(null, HSLtoRGB(an1H, s, l)),
      RGBtoHex.apply(null, HSLtoRGB(an2H, s, l)),
    ],
    triadic: [
      RGBtoHex.apply(null, HSLtoRGB(tr1H, s, l)),
      RGBtoHex.apply(null, HSLtoRGB(tr2H, s, l)),
    ],
    tetradic: [
      RGBtoHex.apply(null, HSLtoRGB(te1H, s, l)),
      RGBtoHex.apply(null, HSLtoRGB(te2H, s, l)),
      RGBtoHex.apply(null, HSLtoRGB(te3H, s, l)),
    ],
  };
}

function getColorHarmony(hexcode) {
  let primaryColorRGB = HEXtoRGB(hexcode);
  let primaryColorHSL, colorHarmony;

  if (primaryColorRGB) {
    primaryColorHSL = RGBtoHSL.apply(null, primaryColorRGB);
    colorHarmony = calculateColorHarmony.apply(null, primaryColorHSL);
  }
  colorHarmony.primary = [hexcode];
  return colorHarmony;
}
