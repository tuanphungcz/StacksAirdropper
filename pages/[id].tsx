import Container from 'components/base/Container';
import NewTabLink from 'components/base/NewTabLink';
import ProfileCard from 'components/ProfileCard';
import { fetchProfile } from 'lib/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Stacks() {
  const {
    query: { id }
  } = useRouter();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (id?.length > 0 && !profile) {
      console.log('fetching profile', id);

      fetchProfile(id).then(({ profile }: any) => {
        console.log(profile);
        setProfile(profile);
      });
    }
  }, [id, profile]);

  if (!profile) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-32">
      <Container>
        <ProfileCard profile={profile} />
        <div className="text-center">
          <NewTabLink href="/">
            <div className="px-4 py-2 mt-4 inline-flex text-xs text-gray-400 transition hover:text-gray-500 rounded-xl hover:bg-gray-200">
              Powered by StacksAirdropper
            </div>
          </NewTabLink>
        </div>
      </Container>
    </div>
  );
}
