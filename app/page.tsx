
"use client"
import React, { useState, useEffect } from 'react';
import { IconUserPlus, IconUserMinus, IconPhoneCall, IconWorld, IconTrash, IconAt, IconStar  } from '@tabler/icons-react';
import { Card, Text, Grid, Group, Flex, Image, Center, Button } from '@mantine/core';
import axios from 'axios';


function HomePage() {
  const [user, setUser] = useState([]);
  const [followStatus, setFollowStatus] = useState({});

  const handleToggleFollow = (userId) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId],
    }));
  };

  const names1 = async (username) => {
    const res1 = await fetch(`https://api.dicebear.com/7.x/initials/svg?seed=${username}`).then((response) => {
      return response.url;
    });
    return res1;
  };

  const names = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    setUser(await res.json());
  };

  useEffect(() => {
    names();
  }, []);

  useEffect(() => {
    const fetchAvatars = async () => {
      const updatedUser = await Promise.all(
        user.map(async (data) => {
          const avatarUrl = await names1(data?.name);
          return { ...data, avatarUrl };
        })
      );
      setUser(updatedUser);
    };

    fetchAvatars();
  }, [user]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser((prevUser) => prevUser.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div>
      <Flex wrap="wrap" gap="md" justify="flex-start" m={20}>
        {user.map((data) => {
          return (
            <Grid key={data.id} gutter={{ base: 10, xs: 5, md: 'xl', xl: 50 }} style={{ width: '24%' }}>
              <Grid.Col span={{ base: 12, md: 12, lg: 12, sm: 12 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Center>
                    <Image
                      radius="50%"
                      w="120px"
                      h="120px"
                      fit="contain"
                      src={data.avatarUrl}
                      alt="user-images"
                    />
                  </Center>
                  <Text size="lg" align="center" mt={20} fw={500}>
                    {data.name}
                    {followStatus[data.id] && <IconStar color="#000" size={16} />} {/* Conditionally render the StarIcon */}
                  </Text>
                  <Text size="md" c="dimmed" mt={5}>
                    <IconAt color="gray" size={16} /> {data.email}
                  </Text>
                  <Text size="md" c="dimmed" mt={5}>
                    <IconPhoneCall color="gray" size={16} /> {data.phone}
                  </Text>
                  <Text size="md" c="dimmed" mt={5}>
                    <IconWorld color="gray" size={16} /> {data.website}
                  </Text>
                  <Group justify="center">
                    {followStatus[data.id] ? (
                      <Button
                        variant="default"
                        mt={15}
                        onClick={() => handleToggleFollow(data.id)}
                        leftSection={<IconUserMinus color="#000" size={16} />}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        variant="filled"
                        mt={15}
                        onClick={() => handleToggleFollow(data.id)}
                        leftSection={<IconUserPlus color="#fff" size={16} />}
                      >
                        Follow
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      mt={15}
                      onClick={() => onDelete(data.id)}
                      leftSection={<IconTrash color="#228be6" size={16} />}
                    >
                      Delete
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          );
        })}
      </Flex>
    </div>
  );
}

export default HomePage;
