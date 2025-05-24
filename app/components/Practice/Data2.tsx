export const A = 'りんごが５こあります';
export const B = 'りんごが３こあります';
export const C = 'リンゴを？こもらいました';
export const D = 'リンゴが２こあります';
export const E = 'りんごを５こもらいました';
export const F = 'りんごが？こあります';

export const question = ['「２＋？＝５」でけいさんできる', '「ふえるといくつ」のおはなしをつくろう'];

type DropArea = 'dropRed' | 'dropGreen' | 'dropYellow';

export const correctAnswers: Record<DropArea, string> = {
  'dropRed': D,
  'dropGreen': C,
  'dropYellow': A,
};

export const changeConstraint = '計算式';