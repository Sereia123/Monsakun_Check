type CheckBoxProps = {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  isCheckable: boolean;
};

export default function CheckBox(
  { selectedOption, setSelectedOption, isCheckable}: CheckBoxProps
) {
  const options = ['オブジェクト', '物語', '計算式', '数量', '構造']
  return(
    <div className="ml-4 w-[300px] border border-dashed border-gray-400 p-7 rounded-xl -translate-x-4">
      <p className="font-bold mb-6 text-2xl">修正した制約を選ぼう！</p>

      {options.map((option) => (  //５つの制約表示
        <label key={option} className="flex items-center gap-3 ml-3 mb-2 text-2xl">
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={!isCheckable}
          />
          {option}
        </label>
      ))}
    </div>
  )
  
}