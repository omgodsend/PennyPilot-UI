import { NativeSelect, rem, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconCurrencyDollar, IconCurrencyEuro, IconCurrencyDollarCanadian, IconCurrencyPound, IconCurrencyDollarAustralian } from '@tabler/icons-react';
import { useState } from 'react';


const data = [{ value: 'usd', label: '🇺🇸 USD', icon: <IconCurrencyDollar /> },
{ value: 'eur', label: '🇪🇺 EUR', icon: <IconCurrencyEuro /> },
{ value: 'cad', label: '🇨🇦 CAD', icon: <IconCurrencyDollarCanadian /> },
{ value: 'gbp', label: '🇬🇧 GBP', icon: <IconCurrencyPound /> },
{ value: 'aud', label: '🇦🇺 AUD', icon: <IconCurrencyDollarAustralian /> },
];

interface CurrencyInputProps {
    form: UseFormReturnType<any>;
    onCurrencyChange: (arg:string) => void
  }
  
  export function CurrencyInput({ form, onCurrencyChange }: CurrencyInputProps) {
    const [currencyIcon, setCurrencyIcon] = useState<React.ReactElement>(<IconCurrencyDollar />);
    
    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCurrency = data.find((item) => item.value === event.currentTarget.value);

      if (selectedCurrency) {
        setCurrencyIcon(selectedCurrency.icon);
        onCurrencyChange(selectedCurrency.value);
      }
    };
  
    return (
      <TextInput
      style={{width: '300px'}}
      mt={'lg'}
      mb={'lg'}
        type="number"
        placeholder="10000"
        label="Net Worth"
        leftSection={currencyIcon}

        rightSection={
          <NativeSelect
            data={data}
            onChange={handleCurrencyChange}
            styles={{
              input: {
                fontWeight: 500,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: rem(100),
                marginRight: rem(-2),
              },
            }}
          />
        }
        {...form.getInputProps('networth')}
      />
    );
  }

