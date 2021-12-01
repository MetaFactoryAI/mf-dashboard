import getDistributions from "@/utils/distributions";
import Profile from "@/components/profile";

export async function getStaticProps() {
  const distributions = await getDistributions();

  return {
    props: { distributions },
  };
}

export default Profile;
