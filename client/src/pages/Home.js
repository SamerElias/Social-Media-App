import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { 
    loading,
    data
  } = useQuery(FETCH_POSTS_QUERY);

  if(loading){
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    if(data && data.getPosts){
      const posts = data.getPosts;
      return (
        <div>
        <Grid columns={3}>
          <Grid.Row className='page-title'>
            <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
            {loading ? (
              <h1>loading posts..</h1>
            ) : (
              posts && posts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post}/>
                </Grid.Column>
              ))
            )}
          </Grid.Row>
        </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <h1>No data available</h1>
        </div>
      )
    }
  }
}


