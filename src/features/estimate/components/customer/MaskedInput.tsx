import { Input } from '@/components/ui/input';
import { MaskInput } from 'maska';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    mask: string | string[];
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
    ({ mask, onChange, value, ...rest }, forwardedRef) => {
        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(forwardedRef, () => inputRef.current!);

        useEffect(() => {
            if (!inputRef.current) return;

            const maskInstance = new MaskInput(inputRef.current, {
                mask,
                onMaska: () => {
                    // Notificar a react-hook-form del cambio
                    if (onChange && inputRef.current) {
                        onChange({
                            target: inputRef.current,
                            currentTarget: inputRef.current,
                        } as React.ChangeEvent<HTMLInputElement>);
                    }
                },
            });

            return () => maskInstance.destroy();
        }, [mask, onChange]);

        useEffect(() => {
            if (!inputRef.current) return;
            const next = value ?? '';
            if (inputRef.current.value !== String(next)) {
                inputRef.current.value = String(next);
            }
        }, [value]);

        return (
            <Input
                ref={inputRef}
                value={value ?? ''} 
                onChange={onChange}
                {...rest}
            />
        );
    }
);

MaskedInput.displayName = 'MaskedInput';
