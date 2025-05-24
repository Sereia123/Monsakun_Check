export const A = '女の子が6人います';
export const B = '女の子が？人います';
export const C = '女の子は男の子より？人おおいです';
export const D = '男の子が４人います';
export const E = '男の子が６人います';
export const F = '男の子と女の子があわせて？人います';

export const question = ['「４＋？＝６」でけいさんできる', '「ちがいはいくつ」のおはなしをつくろう'];

type DropArea = 'dropRed' | 'dropGreen' | 'dropYellow';

export const correctAnswers: Record<DropArea, string> = {
  'dropRed': D,
  'dropGreen': E,
  'dropYellow': F,
};

export const changeConstraint = 'オブジェクト';