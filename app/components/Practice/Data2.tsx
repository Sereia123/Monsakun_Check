export const A = 'りんごが４こあります';
export const B = 'りんごが２こあります';
export const C = 'リンゴがあわせて６こあります';
export const D = 'リンゴが？こあります';
export const E = 'りんごが３こあります';
export const F = 'りんごが２こ多くあります';

export const question = ['「４＋？＝６」でけいさんできる', '「ちがいはいくつ」のおはなしをつくろう'];

type DropArea = 'dropRed' | 'dropGreen' | 'dropYellow';

export const correctAnswers: Record<DropArea, string> = {
  'dropRed': D,
  'dropGreen': E,
  'dropYellow': F,
};

export const changeConstraint = '物語';