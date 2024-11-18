import getProfile from "@/utils/actions/getProfile";
import { Text } from "@chakra-ui/react";

export default async function Profile() {
  const profiles = await getProfile();
  return (
    <div>
      <h1>Profile</h1>
      <Text>{JSON.stringify(profiles)}</Text>
    </div>
  );
}
