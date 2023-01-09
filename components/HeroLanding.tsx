import { IconBrandGithub } from '@tabler/icons';
import NewTabLink from './base/NewTabLink';
import AppNavbar from './AppNavbar';
import EditForm from './EditForm';

export default function HeroLanding() {
  return (
    <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto bg-white min-h-screen">
      <AppNavbar />
      <div className="sm:max-w-xl mt-20 mb-10 text-center mx-auto sm:px-0 px-2.5">
        <div className="flex items-center justify-center mx-auto">
          <NewTabLink
            className="flex items-center px-4 py-2 text-base rounded-full gap-x-2 bg-black/5 hover:bg-black/10"
            href="https://github.com/tuanphungcz/StacksAirdropper"
          >
            <span className="p-1 text-xs text-white uppercase bg-black rounded-full">
              <IconBrandGithub className="w-4 h-4" />
            </span>{' '}
            Star on Github
          </NewTabLink>
        </div>

        <h1 className="mt-5 text-5xl font-extrabold leading-tight text-black sm:text-6xl sm:leading-tight font-display">
          StacksAirdropper
          <br />
        </h1>
        <p className="mt-5 text-2xl text-gray-600">
          Input your Stacks address and get free Stacks airdrop!
        </p>
        <EditForm />
      </div>
    </div>
  );
}
