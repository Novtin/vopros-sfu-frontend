import { useEffect, useRef, useState } from 'react';
import { CodeInputProps } from './component.props';

export const CodeInput = ({ onComplete }: CodeInputProps) => {
  const length = 6;
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(new Array(length).fill('')).slice(0, length);
    setCode(newCode);

    inputsRef.current[newCode.findIndex(v => !v)]?.focus();
  };

  useEffect(() => {
    const joinedCode = code.join('');
    if (joinedCode.length === length && !code.includes('')) {
      onComplete?.(joinedCode);
    }
  }, [code, onComplete]);

  return (
    <div className="flex gap-2 justify-center">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={el => (inputsRef.current[index] = el)}
          type="text"
          value={digit}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          maxLength={1}
          className="w-12 h-12 bg-base-grey-01 border-2 border-base-orange-01 text-base-grey-09 text-center text-lg font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-base-orange-03"
        />
      ))}
    </div>
  );
};
