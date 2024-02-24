'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Group, Text, Button, Grid, Avatar } from '@mantine/core'; 

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    }

    fetchData();
  }, []);

  const generateAvatarUrl = (username: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
  };

  const handleDelete = (userId:any) => {
    try {
      setUsers(prevUsers => prevUsers.filter((user:any) => user.id !== userId));
      console.log(`User with ID ${userId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleToggleFollow = (userId: any) => {
    if (followedUsers.includes(userId)) {
      setFollowedUsers(followedUsers.filter((id: any) => id !== userId));
    } else {
      setFollowedUsers([...followedUsers, userId]);
    }
  };

  const isFollowed = (userId: any) => followedUsers.includes(userId);

  return (
    <div style={{ padding: "20px" }}>
      <Grid>
        {users.map((user: any, index: any) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }} style={{ marginBottom: '10px' }}>
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <div style={{ textAlign: 'center' }}>
                <Avatar
                  src={generateAvatarUrl(user.name)}
                  radius="50%"
                  alt={user.name}
                  style={{ width: '120px', height: '120px', margin: 'auto' }}
                />
                <Text style={{ fontWeight: '500' }} size="lg" mt="sm">{user.name}
                  {followedUsers.includes(user.id) && (
                    <span className="text">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                      </svg>
                    </span>
                  )}
                </Text>

              </div>
              <Text size="md" mt="xs" style={{ color: 'gray' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-at" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
                </svg>
                <a href={`mailto:${user.email}`} style={{ textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'} onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}>{user.email}</a>
              </Text>
              <Text size="md" mt="xs" style={{ color: 'gray' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  <path d="M15 7a2 2 0 0 1 2 2" />
                  <path d="M15 3a6 6 0 0 1 6 6" />
                </svg>
                <a href={`tel:${user.phone}`} style={{ textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'} onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}>{user.phone}</a>
              </Text>
              <Text size="md" mt="xs" style={{ color: 'gray' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M3.6 9h16.8" />
                  <path d="M3.6 15h16.8" />
                  <path d="M11.5 3a17 17 0 0 0 0 18" />
                  <path d="M12.5 3a17 17 0 0 1 0 18" />
                </svg>
                <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'} onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}>{user.website}</a>
              </Text>

              <Group mt="md" align="center">
                {isFollowed(user.id) ?
                  <Button variant="outline" className='btn' radius="sm" style={{ width: '140px', borderColor: 'black', color: 'black', textAlign: "center", }} onClick={() => handleToggleFollow(user.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-minus" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" />
                      <path d="M16 19h6" />
                    </svg> &nbsp; Unfollow
                  </Button> :
                  <Button radius="sm" style={{ width: '140px', }} onClick={() => handleToggleFollow(user.id)}>

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />Follow
                    </svg> &nbsp; Follow
                  </Button>
                }


                <Button variant="outline" radius="sm" style={{ width: '140px' }} onClick={() => handleDelete(user.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg> &nbsp; Delete
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
