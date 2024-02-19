"use client";
import { User } from "../Utils/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/userSlice";
import {
  Card,
  Text,
  Button,
  Group,
  Avatar,
  Space,
  Anchor,
  HoverCard,
  Center,
  Flex,
} from "@mantine/core";

interface props {
  userDetails: User;
}

const UserCard: React.FC<props> = (props) => {
  // State for follow button toggle
  const [followToggle, setFollowToggle] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Destructure user details
  const { name, username, email, website, phone } = props.userDetails;

  //Toggle Follow Status
  const handleFollow = () => {
    setFollowToggle(!followToggle);
  };

  // Delete User
  const handleDelete = () => {
    dispatch(removeUser(username));
  };

  return (
    <>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Center>
          {/* <Grid justify="center" align="center">
            <GridCol justify="center" align="center"> */}
          {/* <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> */}
          <Flex justify="center" align="center" direction="column">
            {/* User Avatar */}
            <HoverCard closeDelay={1000}>
              <HoverCard.Target>
                <Avatar
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                  alt="it's me"
                  radius="120"
                  size="120"
                />
              </HoverCard.Target>
              <HoverCard.Dropdown bg="#02132b">
                <Text size="xs" color="#EBF3FE">
                  {name}
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>

            <Space h="md" />

            {/* User Name */}
            <Flex gap="sm" align="center">
              <Text size="lg" fw={700}>
                {name}
              </Text>
              {followToggle && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-star"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1.75"
                  stroke="#313c52"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
              )}
            </Flex>
          </Flex>
          {/* </GridCol>
          </Grid> */}
        </Center>

        {/* User Email */}
        <Group>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-at"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="#6c7a91"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
          </svg>
          <Anchor href={`mailto:${email}`} size="md" c="dimmed">
            {email}
          </Anchor>
        </Group>
        <Space h="6" />

        {/* User Phone */}
        <Group>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-phone-call"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="#6c7a91"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            <path d="M15 7a2 2 0 0 1 2 2" />
            <path d="M15 3a6 6 0 0 1 6 6" />
          </svg>
          <Anchor href={`tel:${phone}`} size="md" c="dimmed">
            {phone}
          </Anchor>
        </Group>

        <Space h="6" />

        {/* Website */}
        <Group>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-world"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="#6c7a91"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M3.6 9h16.8" />
            <path d="M3.6 15h16.8" />
            <path d="M11.5 3a17 17 0 0 0 0 18" />
            <path d="M12.5 3a17 17 0 0 1 0 18" />
          </svg>
          <Anchor href={website} size="md" c="dimmed">
            {website}
          </Anchor>
        </Group>

        <Space h="6" />

        {/* Follow Button */}
        <Group justify="space-between" grow gap="xs">
          <Button
            variant={followToggle ? "outline" : "filled"}
            size="md"
            onClick={handleFollow}
            leftSection={
              followToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-minus"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" />
                  <path d="M16 19h6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-plus"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M16 19h6" />
                  <path d="M19 16v6" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                </svg>
              )
            }
          >
            {followToggle ? "Unfollow" : "Follow"}
          </Button>

          {/* Delete Button */}
          <Button
            variant="default"
            size="md"
            onClick={handleDelete}
            leftSection={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            }
          >
            Delete
          </Button>
        </Group>
      </Card>
    </>
  );
};
export default UserCard;
