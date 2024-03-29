import { useState, useEffect } from 'react';
import { openContractCall } from '@stacks/connect';
import {
  uintCV,
  stringUtf8CV,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  callReadOnlyFunction
} from '@stacks/transactions';
import ProfileCard from 'components/ProfileCard';
import Card from 'components/base/Card';
import { PrimaryButton } from 'components/base/Button';
import { Input, TextArea } from 'components/base/Form';
import NewTabLink from 'components/base/NewTabLink';
import Container from 'components/base/Container';
import {
  userSession,
  truncateUrl,
  useInterval,
  mapResultsFromTx,
  getNetworkConfig,
  appDetails,
  ONE_MILLION,
  profile
} from 'lib';
import { IconExternalLink } from '@tabler/icons';
import toast from 'react-hot-toast';
import AppNavbar from 'components/AppNavbar';

const { network, explorerUrl, contractAddress } = getNetworkConfig();

export default function Coffee() {
  const [txs, setTxs] = useState([]);
  const [supporters, setSupporters] = useState(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(3);
  const [message, setMessage] = useState('');

  const handleMessageChange = e => setMessage(e.target.value);
  const handleNameChange = e => setName(e.target.value);
  const handlePriceChange = e => setPrice(Math.floor(e.target.value));

  const getCoffeeMessages = async () => {
    // https://docs.hiro.so/api#tag/Accounts/operation/get_account_transactions
    console.log('fetching transactions ...');
    const res = await fetch(
      `${network.coreApiUrl}/extended/v1/address/${contractAddress}.coffee/transactions`
    );
    const result = await res.json();

    console.log('results:', result.results);

    const mappedTxs = mapResultsFromTx(result.results);
    setTxs(mappedTxs);
  };

  const getSupporterCounter = async () => {
    const userAddress = userSession.loadUserData().profile.stxAddress.testnet;

    const counter: any = await callReadOnlyFunction({
      contractAddress,
      contractName: 'coffee',
      functionName: 'get-index',
      network,
      functionArgs: [],
      senderAddress: userAddress
    });

    const parsedValue = parseInt(counter?.value?.value);
    setSupporters(parsedValue);
  };

  useEffect(() => {
    getCoffeeMessages();
    getSupporterCounter();
  }, []);

  useInterval(() => {
    getCoffeeMessages();
    getSupporterCounter();
  }, 60 * 1000);

  const handleSubmit = async e => {
    e.preventDefault();

    const functionArgs = [
      stringUtf8CV(message),
      stringUtf8CV(name),
      uintCV(price * ONE_MILLION)
    ];

    const postConditionAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const postConditionCode = FungibleConditionCode.LessEqual;
    const postConditionAmount = price * ONE_MILLION;

    const postConditions = [
      makeStandardSTXPostCondition(
        postConditionAddress,
        postConditionCode,
        postConditionAmount
      )
    ];

    const options = {
      contractAddress,
      contractName: 'coffee',
      functionName: 'buy-coffee',
      functionArgs,
      network,
      postConditions,
      appDetails,
      onFinish: data => {
        toast.success('Thank you for a coffee');
        setTxs([
          {
            id: data.txId,
            timestamp: null,
            sender: null,
            name,
            amount: price,
            message,
            txStatus: 'pending'
          },
          ...txs
        ]);
      }
    };

    await openContractCall(options);
  };

  return (
    <>
      <AppNavbar />
      <Container>
        <div className="mx-auto mt-8">
          <div className="text-lg font-medium leading-6 text-gray-900 flex space-x-2">
            <div>Buy me a coffee app</div>
            <NewTabLink href={''}>
              <IconExternalLink />
            </NewTabLink>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            This is a fullstack demo buy me a coffee app to demonstrate XYZ
          </div>
        </div>
        <div className="md:flex gap-4 justify-center pt-8 max-w mb-16">
          <div className="flex flex-col gap-4">
            <ProfileCard profile={profile} />
            <Card>
              <div className="p-8">
                <div className="font-semibold text-base text-zinc-800">
                  Recent supporters {supporters && `(${supporters})`}
                </div>
                {txs?.map(tx => (
                  <div
                    key={tx.id}
                    className="flex border-b last:border-b-0 py-4 space-x-4 items-start"
                  >
                    <div className="text-4xl w-12 h-12 flex justify-center items-center">
                      {([1, 3, 5].includes(tx.amount) && '☕️') || '🔥'}
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div className=" text-sm text-zinc-600">
                          <span className="font-semibold">{tx?.name || 'Someone'}</span>{' '}
                          bought <span className="font-semibold">{tx.amount}</span>{' '}
                          coffee(s)
                        </div>
                        <NewTabLink
                          href={`${explorerUrl}/txid/${tx.id}`}
                          className={`text-xs hover:underline cursor-pointer ${
                            tx.txStatus === 'pending'
                              ? 'text-orange-500'
                              : 'text-zinc-600'
                          }`}
                        >
                          {tx.txStatus === 'success' ? '🚀' : '⌛'} {truncateUrl(tx.id)}
                        </NewTabLink>
                      </div>
                      <div className="text-xs mt-1 text-zinc-600">
                        {tx?.timestamp ? (
                          new Date(tx?.timestamp * 1000).toLocaleString()
                        ) : (
                          <div className="text-orange-500">Transaction is pending</div>
                        )}
                      </div>
                      {tx?.message && (
                        <div className="border mt-4 border-blue-300 rounded w-fit bg-blue-50 px-4 py-2 text-sm text-zinc-600 flex space-x-2">
                          <span className="text-lg">💬</span> <span>{tx.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-4 sm:mt-0">
            <Card>
              <div className="p-8 items-center text-center mx-auto w-full">
                <div className="flex justify-between">
                  <div className="font-semibold text-lg mb-4 text-left">
                    Buy <span className="font-bold text-blue-500">Tuan</span> a coffee with Ӿ
                  </div>

                  <div>
                    <div className="ml-2 rounded-lg capitalize inline-flex bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                      {process.env.NEXT_PUBLIC_NETWORK || 'testnet'}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex space-x-4   items-center bg-blue-50 border-blue-200 border rounded p-4">
                    <div className="text-4xl">☕️</div>
                    <div className="text-xl text-blue-500 font-bold">x</div>

                    <SelectItem setPrice={setPrice} price={price} currentValue={1} />
                    <SelectItem setPrice={setPrice} price={price} currentValue={3} />
                    <SelectItem setPrice={setPrice} price={price} currentValue={5} />

                    <div className="w-10">
                      <Input type="number" value={price} onChange={handlePriceChange} />
                    </div>
                  </div>

                  <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Name or @twitter (optional)"
                    label="Name"
                  />
                  <TextArea
                    value={message}
                    rows={6}
                    onChange={handleMessageChange}
                    placeholder="Thank you for the support. Feel free to leave a comment below. It could be anything – appreciation, information or even humor ... (optional)"
                    label="Message"
                  />
                  <PrimaryButton type="submit">Support with Ӿ{price}</PrimaryButton>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

const SelectItem = ({ price, currentValue, setPrice }) => (
  <div
    className={`font-semibold  flex items-center border justify-center w-8 h-8 rounded-full cursor-pointer ${
      price == currentValue
        ? 'bg-blue-500 text-white'
        : 'text-blue-500 bg-white border-blue-100'
    }`}
    onClick={() => setPrice(currentValue)}
  >
    {currentValue}
  </div>
);
