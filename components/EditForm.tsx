import { PrimaryButton } from 'components/base/Button';
import Card from 'components/base/Card';
import { Input } from 'components/base/Form';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Container from './base/Container';

const INITIAL_PROFILE = {
  bitcoinWalletAddress: ''
};

export default function EditForm() {
  const { register, handleSubmit, control, formState, reset } = useForm({
    defaultValues: INITIAL_PROFILE
  });

  const submit = async values => {
    console.log('success', values);
    toast.success('Profile saved successfully');
  };

  useEffect(() => {}, [reset]);

  return (
    <>
      <Container>
        <div className=" space-y-8 pt-16 mb-32">
          <form onSubmit={handleSubmit(submit)} className="w-full space-y-8">
            <Card className="bg-white sm:rounded">
              <div className="p-8 mt-5 border-b md:mt-0 md:col-span-2 grid grid-1 gap-4">
                {defaultBaseInputs.map((input: any) => (
                  <Input
                    {...input}
                    name={input.id}
                    register={register}
                    control={control}
                    key={input.id}
                    error={formState?.errors[input.id]}
                  />
                ))}
              </div>

              <div className="flex justify-end p-8 space-x-4">
                <PrimaryButton type="submit">Claim airdrop</PrimaryButton>
              </div>
            </Card>
          </form>
        </div>
      </Container>
    </>
  );
}

const defaultBaseInputs = [
  {
    id: 'bitcoinWalletAddress',
    label: 'Bitcoin wallet address',
    component: Input,
    placeholder: ''
  }
];
